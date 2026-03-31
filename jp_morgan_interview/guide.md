# JP Morgan Experienced Software Engineer - Interview Guide

Congratulations on clearing the Hackerrank round! This guide is specifically tailored to the JPMC interview process for an Experienced Full Stack/Backend Engineer role. JPMC focuses heavily on **Core Java/Spring Boot**, **System Design (HLD & LLD)**, **Microservices**, and **Database Optimization**.

---

## 1. Data Structures and Algorithms (DSA)
JPMC generally focuses on arrays, strings, hash maps, linked lists, and trees. They look for clean code and edge-case handling rather than extremely tricky competitive programming questions.

### Easy
**Question:** Valid Anagram
*Description:* Given two strings `s` and `t`, return `true` if `t` is an anagram of `s`, and `false` otherwise.
```java
public boolean isAnagram(String s, String t) {
    if (s.length() != t.length()) return false;
    int[] store = new int[26];
    for (int i = 0; i < s.length(); i++) {
        store[s.charAt(i) - 'a']++;
        store[t.charAt(i) - 'a']--;
    }
    for (int n : store) if (n != 0) return false;
    return true;
}
```

### Medium (Highly Asked)
**Question:** LRU Cache
*Description:* Design a data structure that follows the constraints of a Least Recently Used (LRU) cache using `O(1)` time complexity.
```java
class LRUCache {
    class Node { int key, val; Node prev, next; Node(int k, int v) { key = k; val = v; } }
    Node head = new Node(-1, -1), tail = new Node(-1, -1);
    Map<Integer, Node> map = new HashMap<>();
    int capacity;
    
    public LRUCache(int capacity) {
        this.capacity = capacity;
        head.next = tail; tail.prev = head;
    }
    
    private void add(Node node) {
        Node next = head.next; head.next = node; node.prev = head; node.next = next; next.prev = node;
    }
    
    private void remove(Node node) {
        Node prev = node.prev, next = node.next; prev.next = next; next.prev = prev;
    }
    
    public int get(int key) {
        if (!map.containsKey(key)) return -1;
        Node node = map.get(key);
        remove(node); add(node);
        return node.val;
    }
    
    public void put(int key, int value) {
        if (map.containsKey(key)) remove(map.get(key));
        Node node = new Node(key, value);
        map.put(key, node); add(node);
        if (map.size() > capacity) {
            Node lru = tail.prev; remove(lru); map.remove(lru.key);
        }
    }
}
```

### Hard
**Question:** Merge K Sorted Lists
*Description:* You are given an array of `k` linked-lists `lists`, each linked-list is sorted in ascending order. Merge all the linked-lists into one sorted linked-list and return it.
```java
public ListNode mergeKLists(ListNode[] lists) {
    PriorityQueue<ListNode> pq = new PriorityQueue<>((a, b) -> a.val - b.val);
    for (ListNode node : lists) {
        if (node != null) pq.add(node);
    }
    ListNode dummy = new ListNode(0);
    ListNode tail = dummy;
    while (!pq.isEmpty()) {
        tail.next = pq.poll();
        tail = tail.next;
        if (tail.next != null) pq.add(tail.next);
    }
    return dummy.next;
}
```

---

## 2. System Design (HLD & LLD)
JPMC interviewers expect you to drive the design discussion. Always clarify requirements first, estimate scale, lay out high-level design, and then deep dive into components.

### Easy
**Question:** Design a URL Shortener (e.g., Bit.ly)
- **Focus:** Hashing, Base62 Encoding, Database Indexing, Caching (Redis).
- **Key aspects:** Handling millions of reads/writes. How do you avoid hash collisions? (Use an auto-incrementing DB ID and convert to Base62).

### Medium
**Question:** Design an ATM / Point of Sale (POS) System (LLD)
- **Focus:** Object-Oriented Design (OOD), State Design Pattern (e.g., `HasCardState`, `EnterPinState`).
- **Key aspects:** Ensuring ACID properties, managing distributed transactions, idempotency (what happens if the network drops after money is dispensed?).

### Hard
**Question:** Design a Fraud Detection System for Credit Card Transactions (HLD)
- **Focus:** Streaming pipelines, real-time processing.
- **Architecture:** API Gateway -> Kafka -> Flink/Spark Streaming (Rule Engine) -> Cassandra/Elasticsearch (for fast reads/writes of user history).
- **Key aspects:** Latency requirements (<100ms), how to handle peak loads (Black Friday), asynchronous processing.

---

## 3. Java & Spring Boot (Core Backend)

### Easy
**Question:** What is the difference between `@Controller` and `@RestController` in Spring?
- **Answer:** `@RestController` is a combination of `@Controller` and `@ResponseBody`. It automatically serializes the returned object into JSON/XML, bypassing the view resolution process used by `@Controller`.

### Medium
**Question:** How does the internal working of `ConcurrentHashMap` differ in Java 8 compared to Java 7?
- **Answer:** Java 7 used Segment-based locking (default 16 segments). Java 8 removed segments and uses CAS (Compare-And-Swap) operations and synchronized blocks only on the first node (head) of a bucket. It also converts linked lists to balanced trees (Red-Black trees) when a bucket has 8 or more elements for faster `O(log n)` lookups.

### Hard
**Question:** How would you handle distributed transactions in a Microservices architecture?
- **Answer:** Avoid 2-Phase Commit (2PC) as it's blocking. Use the **Saga Pattern**.
  - **Choreography:** Microservices publish events (e.g., Kafka) and other services listen and act.
  - **Orchestration:** A central Orchestrator service commands other services.
  - Required to implement **Compensating Transactions** to rollback state if a downstream service fails.

---

## 4. Databases (Elasticsearch, MongoDB, Redis)

### Easy
**Question:** When would you use Redis instead of a relational database?
- **Answer:** Session management, caching frequent SQL queries, real-time leaderboards (Sorted Sets), rate limiting, and pub/sub messaging. It's an in-memory datastore with sub-millisecond latency.

### Medium
**Question:** How does Elasticsearch achieve fast full-text search?
- **Answer:** It uses an **Inverted Index**. Instead of storing rows and searching text within them, it tokenizes the text into terms and maps each term to the documents that contain it.

### Hard
**Question:** Explain the concept of CAP Theorem and how MongoDB handles it.
- **Answer:** CAP Theorem states a distributed system can only provide 2 out of 3: Consistency, Availability, Partition Tolerance. In a network partition, MongoDB chooses **CP (Consistency and Partition Tolerance)** by default. If a primary node goes down, it stops accepting writes (sacrificing availability) until a new primary is elected.

---

## 5. Security (Cryptography, RBAC, PQC)
Financial institutions prioritize security above all else.

### Easy
**Question:** What is RBAC (Role-Based Access Control)?
- **Answer:** Access rights are assigned to roles, and users are assigned to those roles. (e.g., `ROLE_ADMIN`, `ROLE_USER`). Usually implemented using Spring Security and JWT.

### Medium
**Question:** Explain how Asymmetric Encryption works in securing APIs.
- **Answer:** Uses a pair of keys: Public and Private. Data encrypted with the public key can only be decrypted by the private key. Used in TLS/SSL handshakes to securely exchange a symmetric session key.

### Hard
**Question:** What is Post-Quantum Cryptography (PQC) and why is it becoming relevant?
- **Answer:** Quantum computers can theoretically crack standard RSA and ECC algorithms using Shor's algorithm. PQC refers to cryptographic algorithms (like lattice-based cryptography) that are thought to be secure against both quantum and classical computers. JPMC is actively researching this to future-proof their data.

---

## 6. Messaging & Streaming (Kafka)

### Easy
**Question:** What is a Kafka Topic and a Partition?
- **Answer:** A topic is a category/feed name to which records are published. A partition is an immutable, ordered sequence of records within a topic that allows Kafka to scale horizontally.

### Medium
**Question:** How do you guarantee exact processing of messages in Kafka (Exactly-Once Semantics)?
- **Answer:** Use Kafka Transactions. Set `enable.idempotence=true` on the producer to avoid duplicates, and `isolation.level=read_committed` on the consumer so it only reads committed transaction data.

### Hard
**Question:** Our Kafka consumer is falling behind and lagging. How do you troubleshoot and fix this?
- **Answer:** 
  1. Increase the number of partitions for the topic and add more consumer instances (up to the number of partitions).
  2. Optimize the consumer's `poll()` loop—process messages concurrently instead of sequentially if order within a partition isn't strictly required.
  3. Tune `fetch.min.bytes` and `max.poll.records`.

---

## 7. Cloud, DevOps & Tools (AWS/Docker/K8s)

### Easy
**Question:** What is the difference between a Docker image and a Docker container?
- **Answer:** An image is a read-only template (like a class in OOP). A container is a runnable instance of an image (like an object).

### Medium
**Question:** Explain what a Kubernetes Deployment and a Service are.
- **Answer:** A **Deployment** manages a set of identical pods, ensuring the specified number are always running (self-healing, scaling, rollouts). A **Service** provides a stable IP address and DNS name to load balance traffic across those dynamic pods.

### Hard
**Question:** Imagine your microservice on EKS (Kubernetes) is randomly dropping connections under high load. How do you debug?
- **Answer:** Check pod memory/CPU usage limits (OOMKilled). Check the readiness and liveness probes—if a pod blocks under load, failing probes might cause K8s to restart it repeatedly. Check Ingress controller logs. Use tools like Prometheus/Grafana to analyze resource spikes.

---

## JPMC specific tips:
1. **Behavioral:** They use the STAR method (Situation, Task, Action, Result). Prepare stories about: resolving production incidents, dealing with difficult team members, and taking ownership of a feature.
2. **Testing:** Always mention writing unit tests (JUnit/Mockito) and integration tests. JPMC loves high code coverage.
3. **Agile:** Mention CI/CD pipelines (Jenkins, GitHub Actions), pull request reviews, and sprint ceremonies.
