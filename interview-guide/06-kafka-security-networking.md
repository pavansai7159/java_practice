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
