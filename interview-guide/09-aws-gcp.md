# Part 9: AWS & GCP Cloud Services

---

## 📘 AWS (Amazon Web Services)

### 🟢 Easy

**Q1. What is AWS? Name core services.**
**A:** Cloud computing platform by Amazon. Core services: EC2 (compute), S3 (storage), RDS (managed DB), Lambda (serverless), VPC (networking), IAM (access management), CloudWatch (monitoring), SQS/SNS (messaging), EKS (Kubernetes), Route 53 (DNS).

**Q2. What is EC2 and its instance types?**
**A:** Elastic Compute Cloud — virtual servers. Types: General Purpose (t3, m5), Compute Optimized (c5), Memory Optimized (r5), Storage Optimized (i3), Accelerated (p3 — GPU). Purchase: On-Demand, Reserved (1-3yr discount), Spot (up to 90% discount, interruptible).

**Q3. What is S3? Explain storage classes.**
**A:** Simple Storage Service — object storage with 11-9s durability. Classes: Standard (frequent access), Intelligent-Tiering (auto-moves), Standard-IA (infrequent), Glacier Instant/Flexible/Deep Archive (archival). Features: versioning, lifecycle policies, encryption, cross-region replication.

**Q4. What is IAM?**
**A:** Identity and Access Management. Users, Groups, Roles, Policies (JSON). Principle of least privilege. Roles for EC2/Lambda (no keys needed). Policy: Effect (Allow/Deny), Action (s3:GetObject), Resource (ARN). MFA for root account.

**Q5. What is a VPC?**
**A:** Virtual Private Cloud — isolated network in AWS. Components: subnets (public/private), route tables, internet gateway, NAT gateway, security groups (stateful firewall), NACLs (stateless). Design: public subnet (web servers), private subnet (DB, app servers).

### 🟡 Medium

**Q6. Explain AWS Lambda and serverless architecture.**
**A:** Run code without servers. Triggered by events (API Gateway, S3, SQS, DynamoDB Streams). Pricing: per-request + duration. Limits: 15min timeout, 10GB memory, 250MB package. Cold start issue — use provisioned concurrency. Best for: API backends, event processing, cron jobs.

**Q7. What is the difference between SQS, SNS, and EventBridge?**
**A:** SQS: message queue (point-to-point), pull-based, retention up to 14 days. SNS: pub-sub (fan-out), push-based, topics → subscriptions (email, Lambda, SQS). EventBridge: event bus, rule-based routing, schema registry, integrates with 3rd party SaaS. Use SQS for decoupling, SNS for broadcasting, EventBridge for event-driven architectures.

**Q8. How do you design a high-availability architecture on AWS?**
**A:** Multi-AZ deployment (at minimum). Load balancer (ALB) across AZs. Auto Scaling Groups for EC2. RDS Multi-AZ (automatic failover). S3 (inherently multi-AZ). ElastiCache with replication. Route 53 health checks + failover routing. CloudFront for edge caching.

**Q9. What is AWS EKS and how does it compare to ECS?**
**A:** EKS: managed Kubernetes on AWS. ECS: AWS-native container orchestration. EKS: portability, K8s ecosystem, more complex. ECS: simpler, tighter AWS integration, Fargate (serverless containers). Choose EKS for K8s expertise/portability, ECS for simpler AWS-native deployments.

**Q10. Explain RDS vs DynamoDB — when to use each?**
**A:** RDS: relational (PostgreSQL, MySQL, Aurora), ACID, complex queries, joins. DynamoDB: NoSQL (key-value/document), single-digit ms latency, auto-scaling, unlimited throughput. Use RDS for complex relationships, transactions. Use DynamoDB for simple access patterns, high-scale, predictable performance.

### 🔴 Hard

**Q11. Design a cost-optimized architecture for a microservices app on AWS.**
**A:** Compute: EKS with Spot Instances for non-critical, Reserved for baseline. Serverless: Lambda for event processing, API Gateway for APIs. Storage: S3 lifecycle policies (move to Glacier). DB: Aurora Serverless for variable workloads. Caching: ElastiCache to reduce DB load. CDN: CloudFront. Monitoring: CloudWatch + cost alerts. Reserved capacity for predictable loads.

**Q12. Explain AWS Well-Architected Framework pillars.**
**A:** 1) **Operational Excellence** — automate, IaC, observability. 2) **Security** — IAM, encryption, detective controls. 3) **Reliability** — fault tolerance, recovery, scaling. 4) **Performance Efficiency** — right-sizing, caching, serverless. 5) **Cost Optimization** — right-sizing, reserved, spot, lifecycle. 6) **Sustainability** — efficient resource usage.

**Q13. How do you implement zero-downtime deployments on AWS?**
**A:** Blue/Green: two environments behind ALB, switch target groups. Canary: weighted target groups (10% new → monitor → 100%). Rolling: ECS/EKS rolling update (max surge + max unavailable). CodeDeploy: automated blue/green with auto-rollback on CloudWatch alarms. Database: backward-compatible migrations, expand-contract pattern.

---

## 📘 GCP (Google Cloud Platform)

### 🟢 Easy

**Q1. What is GCP? Name core services.**
**A:** Google's cloud platform. Core: Compute Engine (VMs), GKE (Kubernetes), Cloud Run (serverless containers), Cloud Functions (serverless), Cloud Storage (object), Cloud SQL/Spanner/Firestore (databases), Pub/Sub (messaging), BigQuery (analytics), VPC (networking), IAM.

**Q2. What is GKE and why is it popular?**
**A:** Google Kubernetes Engine — managed K8s built by the creators of Kubernetes. Features: auto-upgrade, auto-repair, auto-scaling (cluster + pod), Autopilot mode (fully managed), integrated logging/monitoring (Cloud Operations), multi-cluster management (Anthos).

**Q3. What is Cloud Storage? Compare storage classes.**
**A:** Object storage (like S3). Classes: Standard (frequent), Nearline (monthly access), Coldline (quarterly), Archive (yearly). Unified API across all classes. Auto-class feature for automatic tiering. 11-9s durability. Lifecycle rules for auto-transition.

### 🟡 Medium

**Q4. What is Cloud Run and how does it differ from Cloud Functions?**
**A:** Cloud Run: serverless containers — any language, any framework, any binary. Scale to zero, pay per request. Cloud Functions: event-triggered functions (lighter, specific runtimes). Use Cloud Run for: containerized apps, full HTTP server control. Functions for: simple event processing, webhooks.

**Q5. Explain Pub/Sub architecture.**
**A:** Fully managed messaging service. Publisher → Topic → Subscription → Subscriber. At-least-once delivery. Push (HTTP endpoint) or Pull (subscriber polls). Ordering with ordering keys. Dead letter topics for failed messages. Massive scale (Google's internal messaging backbone). Compared to Kafka: fully managed, no partitions to manage, but less control.

**Q6. What is BigQuery and when should you use it?**
**A:** Serverless, petabyte-scale data warehouse. SQL queries over massive datasets. Columnar storage. Pricing: storage + queries (pay per TB scanned). Partitioning + clustering for cost/performance. Streaming inserts for real-time. Use for: analytics, BI dashboards, ML (BigQuery ML), ETL pipelines.

**Q7. Compare Cloud SQL vs Cloud Spanner vs Firestore.**
**A:** Cloud SQL: managed MySQL/PostgreSQL, single-region, traditional relational. Spanner: globally distributed relational DB, strong consistency, 99.999% SLA, expensive. Firestore: serverless NoSQL document DB (like Firebase), real-time sync, mobile-friendly. Use: SQL for standard OLTP, Spanner for global-scale transactions, Firestore for mobile/web apps.

### 🔴 Hard

**Q8. Design a microservices architecture on GCP.**
**A:** Containers on GKE (Autopilot for simplicity). API Gateway: Apigee or Cloud Endpoints. Messaging: Pub/Sub for async events. Databases: Cloud SQL (transactional), Firestore (user-facing), BigQuery (analytics). CI/CD: Cloud Build + Artifact Registry + Cloud Deploy. Monitoring: Cloud Operations Suite. Security: Workload Identity, Binary Authorization, VPC Service Controls. Networking: Internal Load Balancer, Cloud Armor (WAF).

**Q9. Compare AWS vs GCP — when to choose which?**
**A:** AWS: widest service catalog, largest market share, most mature, best for enterprise. GCP: best for Kubernetes (GKE), data/analytics (BigQuery), ML (Vertex AI), competitive pricing. GCP advantages: per-second billing, live migration, better managed K8s. AWS advantages: more regions, more services, larger ecosystem. Choose based on team expertise, specific service needs, and existing cloud investment.
