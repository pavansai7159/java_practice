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
