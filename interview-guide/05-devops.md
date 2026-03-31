# Part 5: DevOps — Docker, Kubernetes, Git, CI/CD & Linux

---

## 📘 DOCKER

### 🟢 Easy

**Q1. What is Docker?**
**A:** Platform for containerizing applications — packaging code + dependencies into portable, lightweight containers. Uses OS-level virtualization (shares host kernel). Key: consistent environment across dev/test/prod.

**Q2. What is the difference between an image and a container?**
**A:** Image = read-only template (blueprint). Container = running instance of an image. Image is built once (`docker build`), container runs many times (`docker run`). Images have layers (each Dockerfile instruction = layer).

**Q3. What is a Dockerfile? Show a basic example.**
**A:**
```dockerfile
FROM openjdk:17-slim
WORKDIR /app
COPY target/app.jar app.jar
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "app.jar"]
```

**Q4. What is Docker Compose?**
**A:** Tool for defining multi-container apps in a YAML file. `docker-compose.yml` defines services, networks, volumes. `docker-compose up` starts everything. Use for local dev environments (app + DB + cache).

**Q5. What is the difference between `CMD` and `ENTRYPOINT`?**
**A:** `ENTRYPOINT` — sets the main executable (hard to override). `CMD` — default arguments (easily overridden). Best practice: `ENTRYPOINT` for the command, `CMD` for default args. Together: `ENTRYPOINT ["java", "-jar"]` + `CMD ["app.jar"]`.

### 🟡 Medium

**Q6. How do you optimize Docker image size?**
**A:** Multi-stage builds (build in one stage, copy artifacts to slim final stage). Use small base images (`alpine`, `slim`). Minimize layers (combine RUN commands). `.dockerignore` file. Don't install unnecessary packages. Remove caches (`apt-get clean`).

**Q7. Explain Docker networking modes.**
**A:** `bridge` (default, isolated network per host), `host` (share host network, no isolation), `none` (no networking), `overlay` (multi-host, Swarm/K8s). Custom bridge networks for service-to-service communication via container names.

**Q8. How do you manage secrets and configs in Docker?**
**A:** Docker secrets (Swarm mode), environment variables (not for sensitive data in production), bind-mount config files, Docker config objects. Best practice: use orchestrator's secret management (K8s Secrets, Vault).

**Q9. What are Docker volumes and bind mounts?**
**A:** Volumes: managed by Docker, persist across container restarts, `docker volume create`. Bind mounts: map host directory to container, useful for dev. tmpfs: in-memory, ephemeral. Named volumes preferred for production.

### 🔴 Hard

**Q10. Design a multi-stage Docker build for a Java microservice.**
**A:**
```dockerfile
# Stage 1: Build
FROM maven:3.9-eclipse-temurin-17 AS builder
WORKDIR /build
COPY pom.xml .
RUN mvn dependency:go-offline          # Cache deps
COPY src ./src
RUN mvn package -DskipTests

# Stage 2: Runtime
FROM eclipse-temurin:17-jre-alpine
RUN addgroup -S app && adduser -S app -G app
USER app
COPY --from=builder /build/target/*.jar /app/app.jar
EXPOSE 8080
HEALTHCHECK CMD wget -qO- http://localhost:8080/actuator/health || exit 1
ENTRYPOINT ["java", "-XX:+UseG1GC", "-jar", "/app/app.jar"]
```
Non-root user, health check, optimized JVM flags, minimal base image.

**Q11. How does Docker container isolation work under the hood?**
**A:** Linux namespaces: PID (process isolation), NET (network isolation), MNT (filesystem), UTS (hostname), IPC, USER. Cgroups: CPU/memory limits. Union filesystem (OverlayFS): layered image storage. seccomp: system call filtering. AppArmor/SELinux for mandatory access control.

---

## 📘 KUBERNETES

### 🟢 Easy

**Q1. What is Kubernetes (K8s)?**
**A:** Container orchestration platform. Automates deployment, scaling, and management of containerized apps. Key features: self-healing, horizontal scaling, rolling updates, service discovery, load balancing.

**Q2. What are Pods, Deployments, and Services?**
**A:** Pod: smallest deployable unit, one or more containers sharing network/storage. Deployment: manages ReplicaSets, ensures desired pod count, rolling updates. Service: stable network endpoint for accessing pods (ClusterIP, NodePort, LoadBalancer).

**Q3. What is a Namespace?**
**A:** Virtual cluster within a physical cluster. Isolates resources logically. Default namespaces: `default`, `kube-system`, `kube-public`. Use for environment separation (dev/staging) or team isolation and resource quotas.

**Q4. What is `kubectl`? Name common commands.**
**A:** CLI for Kubernetes. `kubectl get pods/services/deployments`, `kubectl apply -f manifest.yaml`, `kubectl describe pod <name>`, `kubectl logs <pod>`, `kubectl exec -it <pod> -- bash`, `kubectl scale deployment <name> --replicas=3`.

### 🟡 Medium

**Q5. Explain Kubernetes architecture.**
**A:** Control Plane: API Server (gateway), etcd (key-value store), Scheduler (assigns pods to nodes), Controller Manager (reconciliation loops). Worker Nodes: kubelet (agent), kube-proxy (networking), container runtime (containerd). Communication via API Server.

**Q6. What are ConfigMaps and Secrets?**
**A:** ConfigMap: non-sensitive config (key-value pairs, files). Secret: sensitive data (base64 encoded, not encrypted by default). Both can be mounted as volumes or env vars. Use external secret managers (Vault, AWS Secrets Manager) for production.

**Q7. Explain Horizontal Pod Autoscaler (HPA).**
**A:** Automatically scales pods based on metrics. Default: CPU/memory utilization. Custom metrics via Metrics Server or Prometheus adapter. Config: `minReplicas`, `maxReplicas`, `targetCPUUtilizationPercentage`. Checks every 15s by default.

**Q8. What are liveness, readiness, and startup probes?**
**A:** Liveness: is container alive? Restart if fails. Readiness: is container ready for traffic? Remove from Service endpoints if fails. Startup: is app initialized? Disables liveness/readiness until success. Types: HTTP GET, TCP socket, exec command.

**Q9. Explain Kubernetes rolling update and rollback.**
**A:** Rolling update: gradually replaces old pods with new. Config: `maxSurge` (extra pods during update), `maxUnavailable`. `kubectl rollout status` to monitor. Rollback: `kubectl rollout undo deployment/<name>`. Revision history maintained.

### 🔴 Hard

**Q10. How does Kubernetes networking work?**
**A:** Every pod gets unique IP. Pod-to-pod: flat network (CNI plugins: Calico, Flannel, Cilium). Service-to-pod: kube-proxy (iptables/IPVS) routes via virtual IPs. Ingress: HTTP/HTTPS routing (Nginx Ingress, Traefik). Network Policies: firewall rules between pods.

**Q11. Design a production K8s deployment for a microservice.**
**A:** Resource limits + requests, HPA, PodDisruptionBudget, anti-affinity rules (spread across nodes), readiness/liveness probes, ConfigMaps/Secrets, Ingress with TLS, NetworkPolicy, ServiceAccount with minimal RBAC, and pod security context (non-root).

---

## 📘 GIT

### 🟢 Easy

**Q1. What is Git and how does it differ from SVN?**
**A:** Distributed VCS — every developer has full history. SVN is centralized. Git: branching is cheap, works offline, faster. Common commands: `clone`, `add`, `commit`, `push`, `pull`, `branch`, `merge`.

**Q2. What is the difference between `merge` and `rebase`?**
**A:** Merge: creates merge commit, preserves branch history. Rebase: replays commits on top of target branch, linear history. Rule: rebase local branches, merge shared branches. `git rebase -i` for squashing/editing commits.

### 🟡 Medium

**Q3. Explain Git branching strategies.**
**A:** GitFlow: main, develop, feature/*, release/*, hotfix/*. GitHub Flow: main + feature branches, PR-based. Trunk-based: short-lived branches, frequent merges to main. Choose based on team size and release cadence.

**Q4. How do you resolve merge conflicts?**
**A:** Conflicts marked with `<<<<<<<`, `=======`, `>>>>>>>`. Steps: identify conflicting files (`git status`), edit files to resolve, `git add`, `git commit`. Tools: `git mergetool`, IDE merge tools. Prevention: small PRs, frequent merging.

---

## 📘 CI/CD PIPELINES

### 🟢 Easy

**Q1. What is CI/CD?**
**A:** Continuous Integration: merge + build + test automatically on every commit. Continuous Delivery: auto-deploy to staging. Continuous Deployment: auto-deploy to production. Tools: Jenkins, GitHub Actions, GitLab CI, CircleCI.

**Q2. What are the typical stages in a CI/CD pipeline?**
**A:** Source (code checkout) → Build (compile) → Test (unit, integration) → Code Quality (SonarQube, linting) → Security Scan (SAST/DAST) → Package (Docker image) → Deploy (staging → production) → Smoke Tests.

### 🟡 Medium

**Q3. How do you implement blue-green and canary deployments?**
**A:** Blue-Green: two identical environments, switch traffic atomically. Zero downtime. Canary: route small % of traffic to new version, monitor, gradually increase. Both reduce risk. Implement via Kubernetes, load balancers, or service mesh (Istio).

### 🔴 Hard

**Q4. Design a CI/CD pipeline for microservices.**
**A:** Mono-repo: detect changed services, build only affected. Multi-repo: per-service pipelines. Stages: lint → test → build image → push to registry → deploy to dev → integration tests → deploy to staging → performance tests → manual approval → deploy to prod. Use: GitOps (ArgoCD), immutable artifacts, rollback automation, feature flags.

---

## 📘 LINUX

### 🟢 Easy

**Q1. Name essential Linux commands for a developer.**
**A:** File: `ls`, `cd`, `cp`, `mv`, `rm`, `find`, `cat`, `head`, `tail`. Process: `ps`, `top`, `htop`, `kill`. Network: `curl`, `netstat`, `ss`, `ping`. Text: `grep`, `awk`, `sed`, `wc`. System: `df`, `du`, `free`, `uname`.

**Q2. What are file permissions in Linux?**
**A:** `rwx` for user, group, others. `chmod 755` = rwxr-xr-x. `chown user:group file`. Numeric: r=4, w=2, x=1. Special: setuid (4000), setgid (2000), sticky bit (1000).

### 🟡 Medium

**Q3. How do you troubleshoot a Java application on Linux?**
**A:** `jps` (list Java processes), `jstack <pid>` (thread dump), `jmap -heap <pid>` (heap info), `jstat -gcutil <pid>` (GC stats). System: `top -H -p <pid>` (thread CPU), `strace`, `lsof -p <pid>` (open files/sockets). Logs: `tail -f`, `journalctl`.

**Q4. Explain process management: systemd, signals, daemons.**
**A:** systemd: init system, manages services (`systemctl start/stop/status`). Signals: `SIGTERM` (15, graceful stop), `SIGKILL` (9, force), `SIGHUP` (1, reload config). Daemon: background process, detached from terminal, usually managed by systemd.
