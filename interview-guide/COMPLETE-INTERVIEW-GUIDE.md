# 🚀 Complete Backend Developer Interview Preparation Guide

> **Author:** Pavan Sai Vatrapu | **Date:** March 2026
> **Goal:** Crack any Backend/Software Engineer interview with confidence

---

## 📚 Guide Structure

This guide is organized into **8 parts** covering all your skills. Each topic has questions segregated into **🟢 Easy**, **🟡 Medium**, and **🔴 Hard** levels.

| # | File | Topics Covered |
|---|------|----------------|
| 1 | [01-java-python.md](./01-java-python.md) | Core Java, J2EE, Python |
| 2 | [02-frameworks.md](./02-frameworks.md) | Spring Boot, Jetty, Quartz Scheduler |
| 3 | [03-apis-microservices.md](./03-apis-microservices.md) | RESTful APIs, Microservices, Distributed Systems |
| 4 | [04-databases.md](./04-databases.md) | Elasticsearch, MongoDB, Redis, PostgreSQL |
| 5 | [05-devops.md](./05-devops.md) | Docker, Kubernetes, Git, CI/CD, Linux |
| 6 | [06-kafka-security-networking.md](./06-kafka-security-networking.md) | Kafka, Security, Cryptography, PQC, Networking |
| 7 | [07-architecture-systemdesign.md](./07-architecture-systemdesign.md) | System Design, Scalable/HA Architecture, Performance |
| 8 | [08-dsa.md](./08-dsa.md) | Data Structures & Algorithms |
| 9 | [09-aws-gcp.md](./09-aws-gcp.md) | AWS, GCP Cloud Services |

---

## 🎯 Preparation Strategy

### Phase 1: Foundation (Week 1-2)
- Master **Core Java**, **Python**, **DSA** basics
- Revise **SQL/NoSQL** database concepts
- Practice **Easy** level questions from all topics

### Phase 2: Intermediate (Week 3-4)
- Deep dive into **Spring Boot**, **Microservices**, **REST APIs**
- Study **Docker**, **Kubernetes**, **CI/CD**
- Practice **Medium** level questions

### Phase 3: Advanced (Week 5-6)
- Focus on **System Design**, **Distributed Systems**, **Architecture**
- Deep dive into **Security**, **Kafka**, **Cloud (AWS/GCP)**
- Practice **Hard** level questions

### Phase 4: Mock Interviews (Week 7-8)
- Combine topics for mock rounds
- Time yourself on system design problems
- Review and revise weak areas

---

> 💡 **Tip:** For each question, don't just memorize — understand the *why* behind the answer. Interviewers value depth of understanding over rote answers.
# Part 1: Core Java, J2EE & Python

---

## 📘 CORE JAVA

### 🟢 Easy (Fundamentals)

**Q1. What are the 4 pillars of OOP in Java?**
**A:** Encapsulation (data hiding via access modifiers), Inheritance (code reuse via `extends`), Polymorphism (method overloading/overriding), Abstraction (hiding complexity via abstract classes/interfaces).

**Q2. What is the difference between `==` and `.equals()`?**
**A:** `==` compares reference (memory address). `.equals()` compares content/value. For Strings: `new String("a") == new String("a")` → `false`, but `.equals()` → `true`.

**Q3. What is the difference between `String`, `StringBuilder`, and `StringBuffer`?**
**A:** `String` is immutable. `StringBuilder` is mutable, not thread-safe (faster). `StringBuffer` is mutable, thread-safe (synchronized, slower).

**Q4. What is the difference between `ArrayList` and `LinkedList`?**
**A:** `ArrayList` uses dynamic array (O(1) random access, O(n) insert/delete). `LinkedList` uses doubly-linked list (O(n) access, O(1) insert/delete at known position).

**Q5. What are access modifiers in Java?**
**A:** `private` (same class), `default` (same package), `protected` (same package + subclass), `public` (everywhere).

**Q6. What is the difference between `final`, `finally`, and `finalize()`?**
**A:** `final` — keyword to make variable constant, method non-overridable, class non-inheritable. `finally` — block that always executes after try-catch. `finalize()` — method called by GC before destroying an object (deprecated since Java 9).

**Q7. What is autoboxing and unboxing?**
**A:** Autoboxing: automatic conversion of primitive → wrapper (`int` → `Integer`). Unboxing: wrapper → primitive (`Integer` → `int`).

**Q8. What is the difference between `HashMap` and `Hashtable`?**
**A:** `HashMap` is not synchronized, allows one null key. `Hashtable` is synchronized, doesn't allow null keys/values. Prefer `ConcurrentHashMap` over `Hashtable`.

**Q9. What is method overloading vs overriding?**
**A:** Overloading: same method name, different parameters (compile-time polymorphism). Overriding: subclass redefines parent method with same signature (runtime polymorphism).

**Q10. What are checked vs unchecked exceptions?**
**A:** Checked: compile-time enforced (`IOException`, `SQLException`). Unchecked: runtime exceptions (`NullPointerException`, `ArrayIndexOutOfBoundsException`).

---

### 🟡 Medium (Intermediate)

**Q11. Explain the Java Memory Model (Stack vs Heap).**
**A:** Stack stores local variables, method calls, primitives (per thread). Heap stores objects and class instances (shared across threads). Stack is LIFO, faster. Heap is managed by GC.

**Q12. How does `HashMap` work internally?**
**A:** Uses array of buckets. `hashCode()` determines bucket index. On collision, uses linked list (Java 7) or balanced tree (Java 8+ when bucket > 8 entries). `equals()` used for key comparison within bucket. Load factor 0.75 triggers resize.

**Q13. What is the Java Collections framework hierarchy?**
**A:** `Collection` → `List` (ArrayList, LinkedList), `Set` (HashSet, TreeSet, LinkedHashSet), `Queue` (PriorityQueue, Deque). Separately: `Map` (HashMap, TreeMap, LinkedHashMap, ConcurrentHashMap).

**Q14. Explain `volatile` keyword.**
**A:** Ensures visibility of variable changes across threads. Reads/writes go directly to main memory, not thread cache. Doesn't guarantee atomicity — use `AtomicInteger` or `synchronized` for that.

**Q15. What is the difference between `Comparable` and `Comparator`?**
**A:** `Comparable` — natural ordering, implemented by the class itself (`compareTo()`). `Comparator` — external, custom ordering (`compare()`), allows multiple sort strategies.

**Q16. Explain Java 8 Streams API with examples.**
**A:** Streams enable functional-style operations on collections. Pipeline: source → intermediate ops (filter, map, sorted) → terminal op (collect, forEach, reduce). Example: `list.stream().filter(x -> x > 5).map(x -> x * 2).collect(Collectors.toList())`. Streams are lazy and don't modify the source.

**Q17. What are functional interfaces? Name key ones.**
**A:** Interface with exactly one abstract method, annotated `@FunctionalInterface`. Key ones: `Predicate<T>` (test), `Function<T,R>` (apply), `Consumer<T>` (accept), `Supplier<T>` (get), `Runnable`, `Callable<V>`.

**Q18. Explain the `synchronized` keyword and its types.**
**A:** Ensures only one thread accesses a block/method at a time. Types: synchronized method (locks on `this`/class), synchronized block (locks on specific object). Intrinsic lock (monitor) is used.

**Q19. What is the difference between `Thread` and `ExecutorService`?**
**A:** `Thread` creates/manages threads manually. `ExecutorService` is a thread pool framework — manages lifecycle, reuses threads, supports scheduling. Use `Executors.newFixedThreadPool(n)` for production code.

**Q20. Explain Garbage Collection in Java.**
**A:** Automatic memory management. GC identifies unreachable objects and reclaims memory. Generations: Young Gen (Eden + Survivor spaces) → Old Gen. GC algorithms: Serial, Parallel, G1 (default Java 9+), ZGC, Shenandoah.

---

### 🔴 Hard (Advanced)

**Q21. Explain the Java Memory Model (JMM) and happens-before relationship.**
**A:** JMM defines how threads interact through memory. Happens-before guarantees: unlock → lock on same monitor, volatile write → read, thread start → first action, last action → thread join. Without these, JVM/CPU may reorder instructions.

**Q22. How does ConcurrentHashMap achieve thread safety without locking the entire map?**
**A:** Java 8+: Uses CAS (Compare-And-Swap) operations + synchronized blocks on individual bins (first node of each bucket). No segment-level locking. Read operations are generally lock-free. `computeIfAbsent()`, `merge()` are atomic.

**Q23. Explain class loading mechanism and custom ClassLoaders.**
**A:** Bootstrap (core Java) → Extension → Application ClassLoader. Delegation model: child delegates to parent first. Custom ClassLoader: extend `ClassLoader`, override `findClass()`. Use cases: hot-reloading, plugin systems, isolation.

**Q24. What are the differences between G1, ZGC, and Shenandoah GC?**
**A:** G1: Region-based, default since Java 9, pause targets via `-XX:MaxGCPauseMillis`. ZGC: Ultra-low latency (<10ms pauses), concurrent, colored pointers + load barriers. Shenandoah: Concurrent compaction, no generational design (until recent versions), similar goals to ZGC.

**Q25. Explain `CompletableFuture` and reactive programming patterns.**
**A:** `CompletableFuture` supports non-blocking async programming. Chaining: `supplyAsync() → thenApply() → thenAccept()`. Combining: `thenCombine()`, `allOf()`, `anyOf()`. Error handling: `exceptionally()`, `handle()`. Foundation for reactive patterns.

**Q26. What is the Fork/Join framework?**
**A:** Work-stealing algorithm-based framework for parallel divide-and-conquer tasks. `ForkJoinPool` manages threads. Extend `RecursiveTask<V>` (returns result) or `RecursiveAction` (void). Each task splits until small enough, then joins results.

**Q27. Explain Java module system (JPMS, Java 9+).**
**A:** `module-info.java` declares: `requires` (dependencies), `exports` (public packages), `provides/uses` (services). Strong encapsulation — even public classes are hidden unless exported. Benefits: smaller runtime image, startup improvement, compile-time dependency checking.

**Q28. How do you diagnose and fix memory leaks in Java?**
**A:** Tools: JVisualVM, JProfiler, Eclipse MAT. Steps: heap dump (`jmap`), analyze retained size, find GC roots. Common causes: static collections, unclosed resources, listeners not deregistered, ThreadLocal not cleaned, String.intern() abuse.

---

## 📘 J2EE / JAKARTA EE

### 🟢 Easy

**Q1. What is J2EE (Jakarta EE)?**
**A:** Enterprise Java platform providing APIs for building large-scale, distributed, multi-tier applications. Key specs: Servlets, JSP, EJB, JPA, JMS, JAX-RS, CDI.

**Q2. What is a Servlet and its lifecycle?**
**A:** Server-side Java program handling HTTP requests. Lifecycle: `init()` → `service()` (doGet/doPost) → `destroy()`. Container (Tomcat/Jetty) manages lifecycle.

**Q3. What is the difference between `doGet()` and `doPost()`?**
**A:** `doGet()` — data in URL, idempotent, cacheable, limited length. `doPost()` — data in body, non-idempotent, not cached, no size limit.

### 🟡 Medium

**Q4. Explain JPA and its relationship with Hibernate.**
**A:** JPA is a specification (interface) for ORM. Hibernate is the most popular implementation. JPA defines `@Entity`, `@Table`, `EntityManager`, JPQL. You code to JPA API, swap implementations without changing code.

**Q5. What is CDI (Contexts and Dependency Injection)?**
**A:** Standard DI framework for Jakarta EE. Scopes: `@RequestScoped`, `@SessionScoped`, `@ApplicationScoped`. Qualifiers: `@Named`, custom qualifiers. Producers, interceptors, decorators.

### 🔴 Hard

**Q6. Explain the difference between JTA (distributed) transactions and local transactions.**
**A:** Local: single resource (one DB). JTA: spans multiple resources (DB + JMS) using 2-Phase Commit. Transaction Manager coordinates prepare → commit across resource managers. XA protocol used. Performance overhead but ensures ACID across systems.

---

## 📘 PYTHON

### 🟢 Easy

**Q1. What are Python's key features?**
**A:** Interpreted, dynamically typed, indentation-based syntax, rich standard library, supports OOP/functional, automatic memory management (reference counting + GC).

**Q2. What is the difference between a list and a tuple?**
**A:** List is mutable (`[]`), tuple is immutable (`()`). Tuples are hashable (can be dict keys), faster, and use less memory.

**Q3. What are `*args` and `**kwargs`?**
**A:** `*args` — variable positional arguments (tuple). `**kwargs` — variable keyword arguments (dict). Used for flexible function signatures.

**Q4. What is a list comprehension?**
**A:** Concise way to create lists: `[x**2 for x in range(10) if x % 2 == 0]`. Faster than equivalent for-loop. Also dict/set comprehensions exist.

**Q5. What is the difference between `is` and `==`?**
**A:** `is` checks identity (same object in memory). `==` checks equality (same value). `a = [1,2]; b = [1,2]` → `a == b` is True, `a is b` is False.

### 🟡 Medium

**Q6. Explain Python's GIL (Global Interpreter Lock).**
**A:** Mutex that allows only one thread to execute Python bytecode at a time (CPython). CPU-bound → use `multiprocessing`. IO-bound → threading still beneficial. `asyncio` for concurrent IO.

**Q7. What are decorators in Python?**
**A:** Functions that modify/extend behavior of other functions without changing their code. Use `@decorator` syntax. Common: `@property`, `@staticmethod`, `@classmethod`, `@functools.lru_cache`.

**Q8. Explain generators and `yield`.**
**A:** Generator functions use `yield` to produce values lazily (one at a time). Memory efficient for large datasets. `yield` pauses function state. Generator expressions: `(x**2 for x in range(10))`.

**Q9. What are Python's magic/dunder methods?**
**A:** Special methods with double underscores. `__init__` (constructor), `__str__`/`__repr__` (string representation), `__eq__`/`__hash__` (comparison), `__enter__`/`__exit__` (context managers), `__getitem__` (indexing).

### 🔴 Hard

**Q10. Explain Python's MRO (Method Resolution Order) and metaclasses.**
**A:** MRO uses C3 linearization to determine method lookup order in multiple inheritance. Check with `ClassName.__mro__`. Metaclasses are "classes of classes" — define how classes are created. `type` is the default metaclass. Custom metaclass: `class Meta(type): def __new__(...)`.

**Q11. How does Python memory management work internally?**
**A:** Private heap managed by memory manager. Reference counting (primary) + cyclic GC (for reference cycles). Memory pools (pymalloc) for small objects (<512 bytes). `sys.getrefcount()`, `gc.collect()`, `weakref` for breaking cycles.

**Q12. Explain `asyncio` and the event loop.**
**A:** Single-threaded concurrency using coroutines (`async def`, `await`). Event loop schedules tasks, handles IO callbacks. `asyncio.gather()` for concurrent tasks. `aiohttp` for async HTTP. Not suitable for CPU-bound work (use ProcessPoolExecutor).
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
# Part 3: RESTful APIs, Microservices & Distributed Systems

---

## 📘 RESTful APIs

### 🟢 Easy

**Q1. What is REST and its key principles?**
**A:** REpresentational State Transfer — architectural style for APIs. Principles: Stateless, Client-Server, Cacheable, Uniform Interface (resource-based URIs, standard HTTP methods), Layered System, Code on Demand (optional).

**Q2. What are HTTP methods and their proper use?**
**A:** `GET` (read, idempotent), `POST` (create), `PUT` (full update, idempotent), `PATCH` (partial update), `DELETE` (remove, idempotent). `OPTIONS` (check allowed methods), `HEAD` (metadata only).

**Q3. What are HTTP status codes? Name common ones.**
**A:** `200 OK`, `201 Created`, `204 No Content`, `301 Moved`, `400 Bad Request`, `401 Unauthorized`, `403 Forbidden`, `404 Not Found`, `409 Conflict`, `422 Unprocessable Entity`, `429 Too Many Requests`, `500 Internal Server Error`, `503 Service Unavailable`.

**Q4. What is the difference between PUT and PATCH?**
**A:** PUT replaces the entire resource (must send all fields). PATCH updates only specified fields. PUT is idempotent, PATCH semantics depend on implementation but typically is also idempotent.

**Q5. What is REST vs SOAP?**
**A:** REST: lightweight, JSON/XML, HTTP-based, flexible. SOAP: protocol-based, XML only, WSDL contract, WS-Security built-in, heavier but with enterprise features (transactions, reliability).

### 🟡 Medium

**Q6. How do you design pagination, filtering, and sorting in REST?**
**A:** Pagination: `GET /users?page=1&size=20` or cursor-based `?after=abc123`. Filtering: `?status=active&role=admin`. Sorting: `?sort=name,asc&sort=date,desc`. Return metadata: `totalPages`, `totalElements`, `currentPage`.

**Q7. What is HATEOAS?**
**A:** Hypermedia As The Engine Of Application State. REST maturity level 3 — responses include links to related actions/resources. Example: `"links": [{"rel": "self", "href": "/orders/1"}, {"rel": "cancel", "href": "/orders/1/cancel"}]`. Clients discover actions dynamically.

**Q8. How do you version a REST API?**
**A:** URI versioning: `/api/v1/users`. Header: `Accept: application/vnd.api.v1+json`. Query param: `?version=1`. Best practice: URI versioning for simplicity, header versioning for flexibility.

**Q9. How do you handle API security?**
**A:** HTTPS always. Authentication: JWT, OAuth 2.0, API keys. Rate limiting (429 responses). Input validation. CORS configuration. Request signing for sensitive APIs. OWASP API Security Top 10 compliance.

**Q10. Explain idempotency and how to ensure it.**
**A:** Same request produces same result regardless of repetitions. GET, PUT, DELETE are naturally idempotent. POST isn't — use idempotency keys: client sends unique `Idempotency-Key` header, server checks if already processed.

### 🔴 Hard

**Q11. Design a rate limiting system for an API.**
**A:** Algorithms: Token Bucket (steady rate + bursts), Sliding Window (precise counts), Fixed Window (simplest). Implementation: Redis counter with TTL per client IP/API key. Headers: `X-RateLimit-Limit`, `X-RateLimit-Remaining`, `X-RateLimit-Reset`. Distributed: use Redis + Lua scripts for atomicity.

**Q12. How do you design an API gateway?**
**A:** Responsibilities: routing, auth, rate limiting, load balancing, caching, request transformation, circuit breaking, logging. Tools: Kong, AWS API Gateway, Spring Cloud Gateway. Patterns: Backend for Frontend (BFF), API composition.

---

## 📘 MICROSERVICES ARCHITECTURE

### 🟢 Easy

**Q1. What are microservices?**
**A:** Architectural style where an app is composed of small, independent, loosely-coupled services. Each service owns its data, deploys independently, communicates via APIs/messaging. Contrast with monolith.

**Q2. What are advantages and disadvantages of microservices?**
**A:** Pros: independent deployment, tech diversity, scalability per service, fault isolation, team autonomy. Cons: distributed complexity, network latency, data consistency challenges, operational overhead, debugging difficulty.

**Q3. What is service discovery?**
**A:** Mechanism for services to find each other dynamically. Server-side: load balancer routes (AWS ALB). Client-side: service registry (Eureka, Consul). DNS-based: Kubernetes Services. Services register on startup, deregister on shutdown.

**Q4. What is an API Gateway in microservices?**
**A:** Single entry point for all client requests. Routes to appropriate services, handles cross-cutting concerns (auth, logging, rate limiting). Examples: Kong, Spring Cloud Gateway, AWS API Gateway. Avoids clients needing to know all service addresses.

### 🟡 Medium

**Q5. Explain the Saga pattern for distributed transactions.**
**A:** Manages multi-service transactions without 2PC. Choreography: each service publishes events, others react. Orchestration: central coordinator directs steps. Each step has a compensating action for rollback. Example: Order → Payment → Inventory, if inventory fails → refund payment → cancel order.

**Q6. What is the Circuit Breaker pattern?**
**A:** Prevents cascading failures. States: Closed (normal), Open (stop calling, fail fast), Half-Open (test with limited requests). Libraries: Resilience4j, Hystrix (deprecated). Configure: failure threshold, wait duration, success threshold for recovery.

**Q7. How do you handle inter-service communication?**
**A:** Synchronous: REST/HTTP, gRPC (better performance, contract-first). Asynchronous: message queues (Kafka, RabbitMQ), event-driven. Choose sync for queries needing immediate response, async for commands and eventual consistency.

**Q8. Explain the Strangler Fig pattern.**
**A:** Migration strategy from monolith to microservices. Gradually replace monolith functionality: route specific URLs/features to new microservice while the rest still hits the monolith. Over time, monolith "strangled" as more routes are migrated.

**Q9. What is the CQRS pattern?**
**A:** Command Query Responsibility Segregation — separate read and write models. Write side: optimized for data modification. Read side: denormalized views optimized for queries. Often combined with Event Sourcing. Use when read/write patterns differ significantly.

### 🔴 Hard

**Q10. How do you implement distributed tracing in microservices?**
**A:** Propagate correlation/trace IDs across services via headers. Tools: OpenTelemetry (standard), Jaeger, Zipkin. Each service creates spans within a trace. Traces show full request path, latency per service. Spring Cloud Sleuth auto-instruments. Essential for debugging production issues.

**Q11. Design a microservice decomposition strategy for an e-commerce platform.**
**A:** Decompose by business domain (DDD bounded contexts): User Service, Product Catalog, Order Service, Payment Service, Inventory Service, Notification Service, Shipping Service. Each owns its DB. Communication: sync for queries (gRPC), async for events (Kafka). Shared concerns: API Gateway, Auth Service, Config Service.

**Q12. How do you handle data consistency across microservices?**
**A:** Embrace eventual consistency. Patterns: Saga (distributed transactions), Outbox Pattern (reliable event publishing — write event to outbox table, separate process publishes to Kafka), Change Data Capture (Debezium reads DB log), Event Sourcing. Two-phase commit only as last resort (performance impact).

---

## 📘 DISTRIBUTED SYSTEMS

### 🟢 Easy

**Q1. What is a distributed system?**
**A:** System where components on different networked computers communicate and coordinate to achieve a common goal. Examples: microservices, distributed databases, CDNs.

**Q2. What is the CAP theorem?**
**A:** In a network partition, you can guarantee only 2 of 3: Consistency (all nodes see same data), Availability (every request gets a response), Partition tolerance (system works despite network splits). CP: MongoDB (strongly consistent). AP: Cassandra (always available).

**Q3. What is eventual consistency?**
**A:** System guarantees that if no new updates occur, all replicas will converge to the same value. Trades immediate consistency for availability and performance. Examples: DNS, social media feeds, shopping cart.

### 🟡 Medium

**Q4. Explain the difference between leader election algorithms.**
**A:** Bully algorithm: highest-priority node becomes leader. Raft: term-based voting, majority wins, heartbeats for detection. Paxos: consensus protocol, proposer-acceptor-learner model. ZooKeeper uses ZAB (similar to Raft). Leader handles writes, followers replicate.

**Q5. What is consistent hashing and why is it important?**
**A:** Distributes data across nodes using a hash ring. When a node is added/removed, only K/N keys need redistribution (vs all keys in modular hashing). Virtual nodes for even distribution. Used in: DynamoDB, Cassandra, CDNs, load balancers.

**Q6. Explain idempotency in distributed systems.**
**A:** Operations that produce the same result regardless of how many times they're applied. Critical because network retries cause duplicate messages. Implement via: unique request IDs, deduplication tables, naturally idempotent operations (SET vs INCREMENT).

### 🔴 Hard

**Q7. Explain the Raft consensus algorithm.**
**A:** Leader election: candidates request votes, majority wins. Log replication: leader appends entries, replicates to followers, commits on majority acknowledgment. Safety: committed entries never lost. Term numbers prevent stale leaders. Heartbeats maintain leadership.

**Q8. What are vector clocks and how do they solve ordering?**
**A:** Each node maintains a vector of logical clocks (one per node). On local event: increment own counter. On send: attach vector. On receive: merge (take max of each entry) + increment own. Determines causality: V1 < V2 if all entries ≤ and at least one <. Concurrent events have incomparable vectors.

**Q9. Design a distributed rate limiter.**
**A:** Challenges: consistency across nodes, low latency. Approaches: 1) Centralized Redis + Lua (simple, single point of failure). 2) Local rate limiting + gossip protocol sync. 3) Sliding window with Redis Sorted Sets. 4) Token bucket with periodic sync. Trade-off: strict accuracy vs performance.
# Part 4: Databases — Elasticsearch, MongoDB, Redis & PostgreSQL

---

## 📘 ELASTICSEARCH

### 🟢 Easy

**Q1. What is Elasticsearch?**
**A:** Distributed search and analytics engine built on Apache Lucene. Stores JSON documents, supports full-text search, aggregations, near real-time indexing. Used for log analytics (ELK stack), search features, monitoring.

**Q2. What is an index, document, and mapping in ES?**
**A:** Index = database (logical namespace). Document = row (JSON object). Mapping = schema (field types, analyzers). Mapping can be dynamic (auto-detected) or explicit.

**Q3. What is the difference between `match` and `term` queries?**
**A:** `match` — analyzed query (tokenized, lowercased), used for full-text search. `term` — exact match, no analysis, used for keyword fields, IDs, enums.

### 🟡 Medium

**Q4. How does Elasticsearch indexing work internally?**
**A:** Document → analyzed (tokenized, filtered) → inverted index created (term → document IDs). Segments are immutable. New docs go to in-memory buffer → segment. Refresh (default 1s) makes segments searchable. Merge process consolidates segments.

**Q5. Explain shards and replicas.**
**A:** Primary shards: distribute data horizontally (set at index creation, default 1). Replica shards: copies of primaries for HA and read throughput. Primary handles writes, replicas serve reads. Rebalanced across nodes by cluster.

**Q6. How do you optimize Elasticsearch performance?**
**A:** Proper mapping (avoid dynamic), bulk indexing, adjust refresh interval for heavy writes, use `doc_values` for aggregations, filter context (cacheable) vs query context (scored), avoid deep pagination (use `search_after`), right shard sizing (10-50GB per shard).

### 🔴 Hard

**Q7. How does the Elasticsearch scoring algorithm work?**
**A:** Default: BM25 (replaced TF-IDF in ES 5+). Factors: term frequency (how often term appears in doc), inverse document frequency (rarity of term across index), field length normalization. Boost specific fields/queries. `explain: true` to debug scoring.

**Q8. Design an autocomplete/suggestion system using ES.**
**A:** Use `completion` field type with `suggest` API for prefix-based. For fuzzy: `search_as_you_type` field. For "did you mean": `phrase` suggester. Edge n-gram tokenizer for partial matching. Weigh by popularity. Index: separate suggestions index updated async.

---

## 📘 MONGODB

### 🟢 Easy

**Q1. What is MongoDB?**
**A:** NoSQL document database storing BSON (binary JSON) documents. Schema-flexible, horizontally scalable. Collections (≈ tables), Documents (≈ rows). Supports rich queries, aggregation, indexing.

**Q2. When would you use MongoDB vs a relational DB?**
**A:** MongoDB: flexible schema, nested/hierarchical data, high write throughput, horizontal scaling needed. Relational: complex joins, ACID transactions, strict schema, complex relationships.

**Q3. What are basic CRUD operations in MongoDB?**
**A:** `insertOne()` / `insertMany()`, `find()` / `findOne()`, `updateOne()` / `updateMany()`, `deleteOne()` / `deleteMany()`. Filter with query operators: `$eq`, `$gt`, `$in`, `$regex`.

### 🟡 Medium

**Q4. Explain MongoDB indexing strategies.**
**A:** Single field, Compound (multi-field, order matters), Multikey (arrays), Text (full-text search), Geospatial (2d/2dsphere), Hashed (for sharding). Use `explain()` to analyze. Avoid: too many indexes (write overhead), index fields with low cardinality.

**Q5. What is the MongoDB aggregation pipeline?**
**A:** Multi-stage data processing: `$match` (filter) → `$group` (aggregate) → `$project` (reshape) → `$sort` → `$limit`. Also: `$lookup` (join), `$unwind` (flatten arrays), `$facet` (parallel pipelines). Order matters for performance — filter early.

**Q6. How does MongoDB replication work?**
**A:** Replica Set: primary + secondaries. Primary handles writes, oplog (operations log) replicated to secondaries. Automatic failover via election. Read preference: primary, primaryPreferred, secondary, nearest. Write concern: `w: "majority"` for durability.

### 🔴 Hard

**Q7. Explain MongoDB sharding architecture.**
**A:** Horizontal partitioning. Components: mongos (router), config servers (metadata), shard (data). Shard key determines data distribution. Range-based vs hashed sharding. Chunk migration for balance. Choose shard key with high cardinality, even distribution. Bad shard key → hot partitions.

**Q8. How do MongoDB transactions work and what are their limitations?**
**A:** Multi-document ACID transactions (since 4.0 for replica sets, 4.2 for sharded). Start session → startTransaction → operations → commitTransaction. 60s default timeout. Performance impact: holds locks, oplog entries. Best practice: design documents to minimize need for multi-doc transactions.

---

## 📘 REDIS

### 🟢 Easy

**Q1. What is Redis?**
**A:** In-memory data structure store. Used as cache, session store, message broker, rate limiter. Data types: String, List, Set, Sorted Set, Hash, Stream, Bitmap, HyperLogLog. Sub-millisecond latency.

**Q2. What are common Redis use cases?**
**A:** Caching (most common), session management, rate limiting, leaderboards (sorted sets), pub/sub messaging, distributed locks, real-time analytics, job queues.

**Q3. What is the difference between Redis and Memcached?**
**A:** Redis: rich data types, persistence (RDB/AOF), replication, clustering, Lua scripting. Memcached: simple key-value, multi-threaded (better per-node throughput), simpler. Redis is more versatile; Memcached for simple caching at scale.

### 🟡 Medium

**Q4. Explain Redis persistence options.**
**A:** RDB (point-in-time snapshots): periodic dump to disk, fast recovery, potential data loss. AOF (Append Only File): logs every write, more durable, larger files, slower restart. Hybrid (RDB+AOF): both enabled, AOF for durability, RDB for fast restart. `appendfsync`: always/everysec/no.

**Q5. How do Redis Sorted Sets work and where are they used?**
**A:** Elements with scores, ordered by score. O(log N) add/remove. Commands: `ZADD`, `ZRANK`, `ZRANGE`, `ZRANGEBYSCORE`. Use cases: leaderboards, priority queues, time-series (score = timestamp), rate limiting (sliding window).

**Q6. Explain Redis pub/sub vs Streams.**
**A:** Pub/Sub: fire-and-forget, no persistence, missed if subscriber is offline. Streams: persistent, consumer groups (like Kafka), acknowledgment, replay from any point. Use Streams for reliable messaging, Pub/Sub for real-time notifications where loss is acceptable.

### 🔴 Hard

**Q7. How does Redis Cluster work?**
**A:** 16,384 hash slots distributed across master nodes. Key → CRC16 → slot → node. Each master has replica(s) for failover. Gossip protocol for cluster state. Multi-key operations only within same slot (use hash tags: `{user}:profile`, `{user}:settings`). Automatic resharding.

**Q8. Explain the Redlock algorithm for distributed locking.**
**A:** Acquire lock on N/2+1 Redis instances (odd number, minimum 5). Steps: 1) Get current time. 2) Try to acquire lock on each instance with TTL. 3) Lock acquired if majority succeed within drift time. 4) Lock validity = TTL - elapsed. 5) If failed, unlock all. Controversial — see Martin Kleppmann's critique.

---

## 📘 POSTGRESQL

### 🟢 Easy

**Q1. What is PostgreSQL?**
**A:** Open-source, advanced relational database. ACID compliant, supports JSON/JSONB, full-text search, extensions (PostGIS, pgvector), CTEs, window functions. Known for correctness and extensibility.

**Q2. What are indexes and their types in PostgreSQL?**
**A:** B-tree (default, range queries), Hash (equality only), GiST (geometric, full-text), GIN (arrays, JSONB, full-text), BRIN (large sequential data). Create: `CREATE INDEX idx_name ON table(column)`.

**Q3. What is the difference between `WHERE` and `HAVING`?**
**A:** `WHERE` filters rows before grouping. `HAVING` filters groups after `GROUP BY`. Example: `SELECT dept, COUNT(*) FROM emp WHERE salary > 50000 GROUP BY dept HAVING COUNT(*) > 5`.

### 🟡 Medium

**Q4. Explain PostgreSQL MVCC.**
**A:** Multi-Version Concurrency Control — each transaction sees a snapshot of data. Writes create new row versions (xmin/xmax system columns). Readers never block writers and vice versa. VACUUM cleans dead tuples. Enables high concurrency without read locks.

**Q5. How do you optimize slow queries in PostgreSQL?**
**A:** `EXPLAIN ANALYZE` to see query plan. Check: seq scans (add indexes), high cost estimates, incorrect row estimates (run `ANALYZE`). Use covering indexes, partial indexes, index-only scans. Connection pooling (PgBouncer). Partitioning for large tables.

### 🔴 Hard

**Q6. Explain PostgreSQL partitioning strategies.**
**A:** Range (date ranges), List (categories), Hash (even distribution). Declarative partitioning (PG 10+). Partition pruning eliminates irrelevant partitions. Sub-partitioning supported. Benefits: faster queries on large tables, easier data management (drop old partitions), parallel scans.
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
# Part 6: Apache Kafka, Security & Networking

---

## 📘 APACHE KAFKA

### 🟢 Easy

**Q1. What is Apache Kafka?**
**A:** Distributed event streaming platform. Publish-subscribe messaging with high throughput, durability, and scalability. Use cases: event-driven microservices, log aggregation, real-time analytics, data pipelines.

**Q2. What are topics, partitions, and offsets?**
**A:** Topic: named category/feed for messages. Partition: ordered, immutable log within a topic (unit of parallelism). Offset: unique sequential ID for each record within a partition. Consumers track their offset position.

**Q3. What are producers and consumers?**
**A:** Producer: publishes records to topics. Choose partition via key hash or round-robin. Consumer: reads records from topics. Consumer group: set of consumers sharing the work — each partition assigned to one consumer in the group.

**Q4. What is a consumer group?**
**A:** Set of consumers that cooperatively consume from a topic. Each partition is consumed by exactly one consumer in the group. Multiple groups can independently consume the same topic. Enables parallel processing and load balancing.

### 🟡 Medium

**Q5. Explain Kafka's architecture.**
**A:** Broker cluster (servers storing data), ZooKeeper/KRaft (metadata management), Topics divided into partitions, Partitions replicated across brokers (leader + followers). Leader handles reads/writes, followers replicate. ISR (In-Sync Replicas) for durability.

**Q6. What are Kafka delivery guarantees?**
**A:** At-most-once: might lose messages (commit offset before processing). At-least-once: might duplicate (process, then commit). Exactly-once: idempotent producer (`enable.idempotence=true`) + transactional consumer. EOS requires: idempotent producer + transactions + `read_committed` isolation.

**Q7. How does Kafka handle message ordering?**
**A:** Ordering guaranteed only within a partition. Use message key to route related messages to same partition. If ordering across partitions needed, use single partition (limits throughput) or sequence numbers at application level.

**Q8. What is Kafka Connect?**
**A:** Framework for connecting Kafka with external systems. Source connectors: import data (DB → Kafka via Debezium). Sink connectors: export data (Kafka → Elasticsearch). Distributed mode for scalability. Schema Registry for schema evolution.

### 🔴 Hard

**Q9. How do you tune Kafka for high throughput?**
**A:** Producer: `batch.size` (larger), `linger.ms` (wait to batch), `compression.type` (snappy/lz4), `acks=1` (trade durability). Consumer: `fetch.min.bytes`, `max.poll.records`. Broker: partition count, `num.io.threads`, `num.network.threads`, page cache optimization. OS: XFS filesystem, disable swap.

**Q10. Explain Kafka Streams and its processing guarantees.**
**A:** Client library for stream processing. Concepts: KStream (record stream), KTable (changelog stream), GlobalKTable. Operations: map, filter, groupBy, aggregate, join, windowing. Exactly-once via `processing.guarantee=exactly_once_v2`. State stores backed by changelog topics. Fault-tolerant with standby replicas.

**Q11. How do you handle schema evolution in Kafka?**
**A:** Schema Registry (Confluent). Schemas registered per topic (Avro/Protobuf/JSON Schema). Compatibility modes: BACKWARD (new schema reads old data), FORWARD (old schema reads new data), FULL (both), NONE. Serialize with schema ID. Prevents breaking changes.

---

## 📘 SECURITY

### 🟢 Easy

**Q1. What is encryption? Symmetric vs Asymmetric?**
**A:** Encryption converts plaintext to ciphertext. Symmetric: same key for encrypt/decrypt (AES, ChaCha20) — fast, for data at rest. Asymmetric: public/private key pair (RSA, ECC) — slower, for key exchange and digital signatures.

**Q2. What is RBAC?**
**A:** Role-Based Access Control. Users assigned roles, roles have permissions. Example: `ADMIN` can read/write/delete, `USER` can read/write, `VIEWER` can read only. Implemented via Spring Security `@PreAuthorize("hasRole('ADMIN')")`.

**Q3. What is HTTPS and TLS?**
**A:** HTTPS = HTTP over TLS. TLS handshake: client hello → server certificate → key exchange → encrypted session. Provides: confidentiality (encryption), integrity (MAC), authentication (certificates). Always use TLS 1.2+.

**Q4. What is the difference between authentication and authorization?**
**A:** Authentication: "Who are you?" (verify identity — password, token, biometrics). Authorization: "What can you do?" (permissions — RBAC, ABAC). Authentication always comes first.

### 🟡 Medium

**Q5. Explain OAuth 2.0 and its grant types.**
**A:** Authorization framework. Roles: Resource Owner (user), Client (app), Authorization Server, Resource Server. Grant types: Authorization Code (web apps, most secure), Client Credentials (service-to-service), Refresh Token. PKCE for mobile/SPA apps.

**Q6. What is JWT and how does it work?**
**A:** JSON Web Token: `header.payload.signature` (Base64URL encoded). Header: algorithm (HS256/RS256). Payload: claims (sub, exp, iat, custom). Signature: HMAC or RSA. Stateless authentication — server validates without DB lookup. Store in HttpOnly cookies, not localStorage.

**Q7. What are common API security vulnerabilities (OWASP)?**
**A:** Broken Object Level Authorization (IDOR), Broken Authentication, Excessive Data Exposure, Lack of Rate Limiting, Broken Function Level Authorization, Mass Assignment, Security Misconfiguration, Injection, Improper Asset Management, Insufficient Logging.

**Q8. Explain secure API design principles.**
**A:** HTTPS everywhere. Input validation (whitelist, not blacklist). Parameterized queries (prevent SQL injection). Rate limiting. Authentication + authorization on every endpoint. CORS configuration. Security headers (CSP, X-Frame-Options). Audit logging. Principle of least privilege.

### 🔴 Hard

**Q9. What is Post-Quantum Cryptography (PQC)?**
**A:** Cryptographic algorithms resistant to quantum computer attacks. Quantum threatens: RSA, ECC, DH (Shor's algorithm). NIST PQC standards (2024): ML-KEM (key encapsulation, lattice-based), ML-DSA (signatures, lattice-based), SLH-DSA (hash-based signatures). Migration: crypto agility, hybrid approaches (classical + PQC).

**Q10. Design a secure API authentication system.**
**A:** Registration: hash password (bcrypt/Argon2, never MD5/SHA). Login: verify hash, issue JWT (short-lived access token + long-lived refresh token). Each request: validate JWT signature + expiration. Refresh flow: exchange refresh token for new access token. Token revocation: blacklist or short TTL. MFA for sensitive operations.

**Q11. Explain cryptographic key management best practices.**
**A:** Never hardcode keys. Use HSM (Hardware Security Module) or KMS (AWS KMS, HashiCorp Vault). Key rotation policies. Envelope encryption (encrypt data key with master key). Separate keys per environment. Key access audit trails. Secure key derivation (HKDF, PBKDF2).

---

## 📘 NETWORKING

### 🟢 Easy

**Q1. What is the HTTP request/response lifecycle?**
**A:** DNS resolution → TCP connection (3-way handshake) → TLS handshake (if HTTPS) → HTTP request (method, headers, body) → Server processes → HTTP response (status, headers, body) → Connection close (or keep-alive).

**Q2. What is the client-server architecture?**
**A:** Client sends requests (browser, mobile, API consumer), server processes and responds. Stateless (REST) or stateful (WebSocket). Server handles business logic, data storage, security. Client handles UI, user interaction.

### 🟡 Medium

**Q3. What is HTTP/2 and its improvements over HTTP/1.1?**
**A:** Multiplexing: multiple requests over single TCP connection (no head-of-line blocking). Header compression (HPACK). Server push. Binary framing layer. Stream prioritization. Single connection per host. Result: faster page loads, reduced latency.

**Q4. Explain WebSockets vs HTTP long polling vs SSE.**
**A:** WebSocket: full-duplex, persistent connection, bidirectional. Long polling: client polls, server holds until data available. SSE (Server-Sent Events): server pushes, unidirectional. Use WebSocket for chat/gaming, SSE for live feeds/notifications, long polling as fallback.

### 🔴 Hard

**Q5. How does a CDN work and when should you use one?**
**A:** Content Delivery Network: geographically distributed servers caching content close to users. DNS routes to nearest PoP (Point of Presence). Cache: static assets, API responses (with care). Benefits: reduced latency, DDoS protection, offload origin. Tools: CloudFront, Cloudflare, Akamai.

**Q6. Explain TCP vs UDP and when to use each.**
**A:** TCP: connection-oriented, reliable, ordered, flow control (slow start, congestion avoidance). UDP: connectionless, unreliable, no ordering, low latency. TCP: HTTP, APIs, file transfer. UDP: DNS, video streaming, gaming, VoIP. QUIC (HTTP/3): UDP-based with reliability.
# Part 7: System Design & Architecture

---

## 📘 SYSTEM DESIGN

### 🟢 Easy

**Q1. What is system design and why is it important?**
**A:** Process of defining components, APIs, data flow, and infrastructure for a system that meets functional and non-functional requirements. Important because it validates your ability to think at scale, handle trade-offs, and build real-world systems.

**Q2. What is horizontal vs vertical scaling?**
**A:** Vertical: add more power (CPU/RAM) to one machine — limited, expensive. Horizontal: add more machines — preferred for distributed systems, requires stateless design. Scale out > scale up for web services.

**Q3. What is a load balancer?**
**A:** Distributes traffic across servers. Algorithms: Round Robin, Least Connections, IP Hash, Weighted. L4 (TCP) vs L7 (HTTP). Tools: Nginx, HAProxy, AWS ALB/NLB. Health checks remove unhealthy instances.

**Q4. What is caching? Where can you cache?**
**A:** Store frequently accessed data for faster retrieval. Layers: Client (browser), CDN, API Gateway, Application (Redis/Memcached), Database (query cache). Strategies: Cache-Aside, Write-Through, Write-Behind, Read-Through.

**Q5. What is a message queue and why use it?**
**A:** Async communication between services. Decouples producer/consumer, smooths traffic spikes, enables retry/dead-letter. Tools: Kafka, RabbitMQ, AWS SQS. When: email sending, order processing, notifications.

### 🟡 Medium

**Q6. Design a URL shortener (like bit.ly).**
**A:** **Requirements:** shorten URL, redirect, analytics. **API:** POST /shorten (long_url → short_code), GET /<code> (302 redirect). **Storage:** Key-value (code → URL). **ID generation:** Base62 encoding of auto-increment ID or hash (first 7 chars of MD5). **Scale:** Redis cache for hot URLs, DB partitioned by code range. **Analytics:** async event logging to analytics store.

**Q7. Design a rate limiter.**
**A:** **Algorithms:** Token Bucket (refill tokens at fixed rate), Sliding Window Log (store timestamps), Fixed Window Counter (simple). **Storage:** Redis (INCR + EXPIRE for fixed window, sorted sets for sliding window). **Distributed:** centralized Redis. **HTTP:** 429 status + Retry-After header. Place at API Gateway level.

**Q8. Design a notification system.**
**A:** **Channels:** Push, SMS, Email. **Components:** API → message queue → channel-specific workers → providers (APNS, Firebase, SendGrid, Twilio). **Features:** user preferences, templates, rate limiting, retry with backoff, dedup, scheduling. **Storage:** PostgreSQL (templates, preferences), Kafka (event stream), Redis (dedup, rate limiting).

**Q9. What is database sharding?**
**A:** Horizontal partitioning across multiple databases. Shard key determines placement. Strategies: range-based, hash-based, directory-based. Challenges: cross-shard queries, rebalancing, joins. Solutions: consistent hashing, application-level routing, vitess for MySQL.

**Q10. Explain the CAP theorem with real examples.**
**A:** CP: MongoDB (rejects writes during partition until new leader elected), HBase. AP: Cassandra (always accepts writes, resolves conflicts later), DynamoDB. CA: single-node RDBMS (no partition = no trade-off). In practice, you choose between C and A during partitions.

### 🔴 Hard

**Q11. Design Twitter's news feed system.**
**A:** **Fan-out on write:** on tweet → push to all follower timelines (Redis lists). Fast reads, slow writes for celebrities. **Fan-out on read:** on timeline load → fetch from followed users, merge. Slow reads, fast writes. **Hybrid:** fan-out on write for regular users, fan-out on read for celebrities (>10K followers). **Storage:** Tweets in DB, timelines in Redis, media in S3+CDN. **Scale:** partition by user ID, cache hot timelines.

**Q12. Design a distributed messaging system like WhatsApp.**
**A:** **1:1 messaging:** WebSocket connections → connection server → message queue → recipient's connection server. **Group:** fan-out messages to group members. **Offline:** store in DB, deliver on reconnect. **Components:** Chat servers (WebSocket), presence service, message store (Cassandra for write-heavy), media service (S3), notification service. **Scale:** partition by user ID, consistent hashing for chat servers.

**Q13. Design a search autocomplete system.**
**A:** **Data:** collect search queries, aggregate frequency. **Trie:** build prefix tree with top-K suggestions per node. **Update:** offline MapReduce job rebuilds trie weekly, replicate to serving nodes. **Serving:** in-memory trie, prefix lookup → return precomputed top suggestions. **Scale:** partition trie by first 2 chars, CDN cache for popular prefixes, personalization layer.

---

## 📘 SCALABLE & HIGH AVAILABILITY ARCHITECTURE

### 🟢 Easy

**Q1. What is high availability (HA)?**
**A:** System is operational 99.9%+ of the time. Achieve via: redundancy (multiple instances), failover (automatic switching), no single points of failure, health monitoring. Measured in "nines": 99.9% = 8.76h downtime/year, 99.99% = 52.6min/year.

**Q2. What is a single point of failure (SPOF)?**
**A:** Component whose failure brings down the entire system. Eliminate by: redundant servers, DB replication, multiple load balancers, multi-AZ deployment, redundant network paths.

### 🟡 Medium

**Q3. Explain the 12-Factor App methodology.**
**A:** Best practices for cloud-native apps: 1) Codebase (one repo), 2) Dependencies (explicit), 3) Config (env vars), 4) Backing services (attached resources), 5) Build/release/run (separate stages), 6) Processes (stateless), 7) Port binding, 8) Concurrency (scale via processes), 9) Disposability (fast startup/shutdown), 10) Dev/prod parity, 11) Logs (event streams), 12) Admin processes.

**Q4. How do you design for disaster recovery?**
**A:** RPO (Recovery Point Objective): max data loss tolerance. RTO (Recovery Time Objective): max downtime. Strategies: Backup/Restore (hours), Pilot Light (minutes), Warm Standby (seconds), Multi-site Active-Active (zero). Cross-region replication. Regularly test failover. Runbooks for incidents.

### 🔴 Hard

**Q5. Design a globally distributed system with multi-region deployment.**
**A:** Architecture: active-active across regions, global load balancer (latency-based routing). Data: multi-master DB (CockroachDB, Spanner) or per-region primary with cross-region replication. Conflict resolution: last-write-wins, CRDTs, or application-level. Challenges: consistency vs latency (PACELC), data sovereignty, regional failures.

---

## 📘 PERFORMANCE OPTIMIZATION

### 🟡 Medium

**Q1. How do you identify and fix performance bottlenecks?**
**A:** Measure first: APM tools (New Relic, Datadog), profilers (JProfiler, async-profiler). Check: slow DB queries (EXPLAIN ANALYZE), N+1 queries, missing indexes, connection pool exhaustion, memory leaks, GC pauses, thread contention. Optimize: caching, async processing, connection pooling, query optimization, pagination.

**Q2. Explain connection pooling and its importance.**
**A:** Reuse DB connections instead of creating/destroying per request. Config: min/max pool size, idle timeout, connection lifetime. Tools: HikariCP (Spring Boot default, fastest). Too small → connection waits. Too large → DB overload. Rule of thumb: `pool_size = (core_count * 2) + effective_spindle_count`.

### 🔴 Hard

**Q3. How do you design a system to handle 1 million requests per second?**
**A:** Stateless application tier → horizontal scaling behind load balancers. CDN for static content. Read-heavy: Redis cache layer (sub-ms), read replicas. Write-heavy: Kafka for buffering, batch writes. Database: sharding + read replicas. Async processing for non-critical paths. Edge computing. Connection multiplexing. Measure: p99 latency, throughput, error rate.
# Part 8: Data Structures & Algorithms (DSA)

---

## 📘 DATA STRUCTURES

### 🟢 Easy

**Q1. What are the basic data structures? Describe time complexity.**
**A:**
| DS | Access | Search | Insert | Delete |
|----|--------|--------|--------|--------|
| Array | O(1) | O(n) | O(n) | O(n) |
| LinkedList | O(n) | O(n) | O(1) | O(1) |
| Stack/Queue | O(n) | O(n) | O(1) | O(1) |
| HashMap | N/A | O(1)avg | O(1)avg | O(1)avg |
| BST | O(log n) | O(log n) | O(log n) | O(log n) |
| Heap | O(n) | O(n) | O(log n) | O(log n) |

**Q2. Stack vs Queue — difference and use cases.**
**A:** Stack: LIFO. Use: undo operations, expression evaluation, DFS, backtracking. Queue: FIFO. Use: BFS, scheduling, message queues, printer queue. Deque: both ends. Priority Queue: by priority (heap-based).

**Q3. What is a HashMap and how does it handle collisions?**
**A:** Key-value store using hash function. Collisions: Chaining (linked list per bucket), Open Addressing (linear/quadratic probing). Java HashMap: chaining with linked list → tree (>8 elements). Load factor 0.75 → resize to 2x.

**Q4. What is the difference between BFS and DFS?**
**A:** BFS: level-by-level (Queue), shortest path in unweighted graphs. DFS: go deep first (Stack/recursion), topological sort, cycle detection. BFS space: O(width), DFS space: O(height).

**Q5. Explain Big-O notation. What are common complexities?**
**A:** Describes worst-case growth rate. O(1) constant < O(log n) logarithmic < O(n) linear < O(n log n) linearithmic < O(n²) quadratic < O(2ⁿ) exponential. Always analyze worst-case. Drop constants and lower-order terms.

### 🟡 Medium

**Q6. Implement LRU Cache.**
**A:** HashMap + Doubly Linked List. Map stores key → node. DLL maintains access order (most recent at head). Get: move to head. Put: add to head, evict tail if full. O(1) for both operations. Java: extend `LinkedHashMap` with `removeEldestEntry()`.

**Q7. How do you detect a cycle in a linked list?**
**A:** Floyd's Tortoise and Hare: slow pointer (1 step), fast pointer (2 steps). If they meet → cycle exists. To find cycle start: reset one pointer to head, both move 1 step — they meet at cycle start. O(n) time, O(1) space.

**Q8. Explain Binary Search Tree operations and balancing.**
**A:** BST: left < root < right. Operations: insert/search/delete O(h). Unbalanced BST → O(n). Self-balancing: AVL (strict, rotations), Red-Black (relaxed, used in Java TreeMap). Rotations: left, right, left-right, right-left.

**Q9. What are common sorting algorithms and when to use each?**
**A:** Merge Sort: O(n log n) stable, extra space — large datasets. Quick Sort: O(n log n) avg, in-place — general purpose. Heap Sort: O(n log n) in-place — memory constrained. Counting/Radix: O(n+k) — integer keys, known range. Tim Sort: O(n log n) — Java default (hybrid merge+insertion).

**Q10. Explain graph representations and traversal algorithms.**
**A:** Adjacency Matrix: O(V²) space, O(1) edge check. Adjacency List: O(V+E) space, better for sparse graphs. BFS: shortest path (unweighted), level-order. DFS: topological sort, connected components, cycle detection. Dijkstra: shortest path (weighted, positive). Bellman-Ford: handles negative weights.

### 🔴 Hard

**Q11. Explain dynamic programming. Solve the knapsack problem.**
**A:** Break problem into overlapping subproblems, store results (memoization/tabulation). 0/1 Knapsack: `dp[i][w] = max(dp[i-1][w], values[i] + dp[i-1][w-weights[i]])`. Bottom-up: fill 2D table. Space optimization: 1D array (iterate weight backwards). Patterns: strings (LCS, edit distance), sequences, trees, DAGs.

**Q12. When would you use a Trie vs HashMap for string operations?**
**A:** Trie: prefix-based operations (autocomplete, spell check, IP routing). O(L) search where L=string length, prefix search naturally supported. HashMap: exact key lookup only, O(1) average. Trie advantages: prefix matching, sorted iteration, no hash collisions. Trie disadvantage: memory (26 children per node, use compressed trie).

**Q13. Explain the A* algorithm and its applications.**
**A:** Best-first search with heuristic: f(n) = g(n) + h(n). g(n): cost from start. h(n): estimated cost to goal (must be admissible — never overestimate). Open set (priority queue), closed set. Applications: pathfinding (games, maps), robotics, puzzle solving. Degenerates to Dijkstra if h=0, to greedy if g=0.

---

## 📘 COMMON CODING PATTERNS

### 🟡 Medium

**Q14. List the top coding patterns for interviews.**
**A:**
1. **Two Pointers** — sorted arrays, palindrome, container with most water
2. **Sliding Window** — max sum subarray, longest substring without repeats
3. **Binary Search** — sorted array, search space reduction
4. **BFS/DFS** — tree/graph traversal, connected components
5. **Dynamic Programming** — optimal substructure, overlapping subproblems
6. **Backtracking** — permutations, combinations, N-queens
7. **Greedy** — interval scheduling, Huffman coding
8. **Stack/Monotonic Stack** — next greater element, valid parentheses
9. **Heap/Priority Queue** — top K elements, merge K sorted lists
10. **Union-Find** — connected components, detect cycle in undirected graph
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
