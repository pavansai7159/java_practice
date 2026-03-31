# Part 2: Frameworks — Spring Boot, Jetty & Quartz Scheduler

---

## 📘 SPRING BOOT

### 🟢 Easy

**Q1. What is Spring Boot and how does it differ from Spring Framework?**
**A:** Spring Boot is an opinionated framework that simplifies Spring app setup with auto-configuration, embedded servers, and starter dependencies. No XML config needed. Spring Framework is the core DI/AOP framework requiring manual setup.

**Q2. What are Spring Boot starters?**
**A:** Pre-packaged dependency descriptors. `spring-boot-starter-web` (web + embedded Tomcat), `spring-boot-starter-data-jpa` (JPA + Hibernate), `spring-boot-starter-security`, `spring-boot-starter-test`.

**Q3. What is `@SpringBootApplication`?**
**A:** Meta-annotation combining: `@Configuration` (Java config), `@EnableAutoConfiguration` (auto-configure beans), `@ComponentScan` (scan current package).

**Q4. What is dependency injection in Spring?**
**A:** IoC container manages object creation and wiring. Types: Constructor injection (preferred), Setter injection, Field injection (`@Autowired`). Constructor injection ensures immutability and testability.

**Q5. What are Spring Bean scopes?**
**A:** `singleton` (default, one per container), `prototype` (new instance per request), `request` (per HTTP request), `session` (per HTTP session), `application`, `websocket`.

**Q6. What is `application.properties` / `application.yml`?**
**A:** Configuration files for Spring Boot. Define server port, DB URL, logging levels, custom properties. YAML supports hierarchical config. Profile-specific: `application-dev.yml`, `application-prod.yml`.

### 🟡 Medium

**Q7. Explain Spring Boot auto-configuration.**
**A:** Conditionally configures beans based on classpath, existing beans, and properties. Uses `@Conditional*` annotations (`@ConditionalOnClass`, `@ConditionalOnMissingBean`). Check `spring.factories` / `AutoConfiguration.imports`. Disable with `@SpringBootApplication(exclude = ...)`.

**Q8. What is Spring AOP and how is it used?**
**A:** Aspect-Oriented Programming for cross-cutting concerns. Key concepts: Aspect (`@Aspect`), Join Point (method execution), Pointcut (expression matching), Advice (`@Before`, `@After`, `@Around`). Uses CGLIB/JDK proxies. Use cases: logging, security, transactions.

**Q9. Explain Spring Boot Actuator.**
**A:** Production-ready features: `/actuator/health`, `/actuator/metrics`, `/actuator/info`, `/actuator/env`. Custom health indicators, custom metrics with Micrometer. Secure sensitive endpoints. Integrates with Prometheus/Grafana.

**Q10. How does `@Transactional` work internally?**
**A:** Spring creates a proxy around the annotated method. Proxy starts transaction before, commits after (or rollbacks on exception). Uses `PlatformTransactionManager`. Propagation levels: REQUIRED, REQUIRES_NEW, NESTED. Isolation levels: READ_COMMITTED, REPEATABLE_READ, SERIALIZABLE.

**Q11. Explain Spring Security authentication flow.**
**A:** Request → `SecurityFilterChain` → `AuthenticationFilter` → `AuthenticationManager` → `AuthenticationProvider` → `UserDetailsService` → returns `Authentication` object → stored in `SecurityContextHolder`. JWT flow: validate token in filter, create auth object.

**Q12. What is Spring Data JPA and how does it reduce boilerplate?**
**A:** Provides repository abstraction. Extend `JpaRepository<Entity, ID>` — get CRUD methods free. Query derivation from method names: `findByNameAndAge()`. Custom queries with `@Query`. Pagination: `Pageable`, `Page<T>`. Specifications for dynamic queries.

### 🔴 Hard

**Q13. How does Spring Boot handle bean lifecycle and circular dependencies?**
**A:** Lifecycle: instantiation → populate properties → `BeanNameAware` → `BeanFactoryAware` → `@PostConstruct` → `InitializingBean` → custom init → ready. Circular deps: solved with 3-level cache (singletons, early singletons, singleton factories). Constructor injection circular deps fail — redesign needed.

**Q14. Design a custom Spring Boot starter.**
**A:** Steps: 1) Create `autoconfigure` module with `@Configuration` class using `@Conditional*`. 2) Create `starter` module depending on autoconfigure. 3) Register in `META-INF/spring/org.springframework.boot.autoconfigure.AutoConfiguration.imports`. 4) Use `@ConfigurationProperties` for custom config. 5) Publish as Maven artifact.

**Q15. How do you optimize Spring Boot application startup time?**
**A:** Lazy initialization (`spring.main.lazy-initialization=true`), use Spring AOT (Ahead-of-Time) compilation, GraalVM native images, minimize component scanning scope, use `@Indexed` for classpath scanning, virtual threads (Java 21), avoid unnecessary auto-configurations.

---

## 📘 JETTY

### 🟢 Easy

**Q1. What is Jetty?**
**A:** Lightweight, embeddable Java HTTP server and servlet container. Can be embedded directly in applications (no WAR deployment needed). Used by Spring Boot as an alternative to Tomcat.

**Q2. How do you use Jetty with Spring Boot?**
**A:** Exclude Tomcat from `spring-boot-starter-web`, add `spring-boot-starter-jetty`. Spring Boot auto-configures Jetty as the embedded server.

### 🟡 Medium

**Q3. How do you configure Jetty thread pool and connectors?**
**A:** Programmatically: `QueuedThreadPool(maxThreads, minThreads)`, `ServerConnector(server)` with idle timeout, port. In Spring Boot: `server.jetty.threads.max`, `server.jetty.threads.min`, `server.jetty.connection-idle-timeout`.

### 🔴 Hard

**Q4. Compare Jetty vs Tomcat vs Undertow for microservices.**
**A:** Jetty: lightweight, best for async/WebSocket, HTTP/2 native support. Tomcat: mature, widest adoption, good docs. Undertow: non-blocking by default, lowest memory footprint. For microservices, Jetty/Undertow preferred for lower resource usage.

---

## 📘 QUARTZ SCHEDULER

### 🟢 Easy

**Q1. What is Quartz Scheduler?**
**A:** Enterprise-grade job scheduling library for Java. Supports cron expressions, job persistence (JDBC), clustering, misfire handling.

**Q2. What are the core components of Quartz?**
**A:** `Scheduler` (orchestrator), `Job` (task interface, implement `execute()`), `JobDetail` (job metadata), `Trigger` (when to fire — `SimpleTrigger`, `CronTrigger`), `JobStore` (RAM or JDBC).

### 🟡 Medium

**Q3. How does Quartz clustering work?**
**A:** Multiple Quartz instances share a JDBC JobStore. DB uses row-level locking to ensure only one node fires each trigger. Requires: same cluster name, synced clocks, `org.quartz.jobStore.isClustered=true`. Provides failover — if a node dies, another picks up its jobs.

**Q4. Explain Quartz misfire handling strategies.**
**A:** When a trigger misses its fire time: `MISFIRE_INSTRUCTION_FIRE_NOW` (fire immediately), `MISFIRE_INSTRUCTION_DO_NOTHING` (skip, wait for next), `MISFIRE_INSTRUCTION_RESCHEDULE_*` (various reschedule strategies). `misfireThreshold` defines how late is "misfired".

### 🔴 Hard

**Q5. How do you integrate Quartz with Spring Boot for distributed scheduling?**
**A:** Use `spring-boot-starter-quartz`. Configure `SchedulerFactoryBean` with DataSource for JDBC store. Set `spring.quartz.job-store-type=jdbc`, `spring.quartz.properties.org.quartz.jobStore.isClustered=true`. Use `@DisallowConcurrentExecution` for singleton jobs. Initialize tables with Quartz SQL scripts.
