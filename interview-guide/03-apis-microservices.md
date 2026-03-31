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
