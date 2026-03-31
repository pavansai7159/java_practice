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
