const fs = require('fs');
const path = require('path');

// ─── HELPERS ────────────────────────────────────────────────────────────────
function badge(level) {
    const map = { Easy: '#22c55e', Medium: '#f59e0b', Hard: '#ef4444' };
    return `<span class="badge" style="background:${map[level]}">${level}</span>`;
}
function codeFence(lang, code) {
    return `<pre><code class="language-${lang}">${escHtml(code)}</code></pre>`;
}
function escHtml(s) {
    return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}
function card(q) {
    let html = `<div class="card ${q.type}">
    <div class="card-header">
      ${badge(q.level)}
      <span class="tag tag-${q.type}">${q.type === 'conceptual' ? '💡 Conceptual' : '💻 Coding'}</span>
    </div>
    <h3 class="question">${q.q}</h3>
    <div class="answer"><strong>Answer:</strong> ${q.a}</div>`;
    if (q.code) html += codeFence(q.lang || 'java', q.code);
    html += `</div>`;
    return html;
}
function section(id, icon, title, questions) {
    const levels = ['Easy', 'Medium', 'Hard'];
    let inner = '';
    for (const lvl of levels) {
        const qs = questions.filter(q => q.level === lvl);
        if (!qs.length) continue;
        inner += `<div class="level-group">
      <h3 class="level-title level-${lvl.toLowerCase()}">${lvl}</h3>
      <div class="cards-grid">${qs.map(card).join('')}</div>
    </div>`;
    }
    return `<section id="${id}" class="topic-section">
    <div class="section-header"><span class="section-icon">${icon}</span><h2>${title}</h2></div>
    ${inner}
  </section>`;
}

// ─── DATA ───────────────────────────────────────────────────────────────────
const topics = [];

// 1. DSA
topics.push({
    id: 'dsa', icon: '🧮', title: 'Data Structures & Algorithms', questions: [
        {
            level: 'Easy', type: 'conceptual', q: 'What is the time complexity of binary search?',
            a: 'O(log n) — each step halves the search space.'
        },
        {
            level: 'Easy', type: 'conceptual', q: 'Difference between Stack and Queue?',
            a: 'Stack is LIFO (Last In First Out); Queue is FIFO (First In First Out).'
        },
        {
            level: 'Easy', type: 'coding', q: 'Implement a stack using two queues.',
            a: 'Use two queues; for push O(1), for pop dequeue all but last element.',
            lang: 'java', code: `class StackUsingQueues {
    Queue<Integer> q1 = new LinkedList<>(), q2 = new LinkedList<>();
    void push(int x) { q1.add(x); }
    int pop() {
        while (q1.size() > 1) q2.add(q1.poll());
        int top = q1.poll();
        Queue<Integer> tmp = q1; q1 = q2; q2 = tmp;
        return top;
    }
}` },
        {
            level: 'Medium', type: 'conceptual', q: 'Explain how a HashMap works internally in Java.',
            a: 'HashMap uses array of buckets (linked list / tree). Key hashCode determines bucket index. Chain or tree handles collisions. Load factor 0.75 triggers resize.'
        },
        {
            level: 'Medium', type: 'coding', q: 'Find the longest substring without repeating characters.',
            a: 'Sliding window with a HashSet — O(n) time, O(k) space (k = charset size).',
            lang: 'java', code: `int lengthOfLongestSubstring(String s) {
    Set<Character> set = new HashSet<>();
    int l = 0, max = 0;
    for (int r = 0; r < s.length(); r++) {
        while (set.contains(s.charAt(r))) set.remove(s.charAt(l++));
        set.add(s.charAt(r));
        max = Math.max(max, r - l + 1);
    }
    return max;
}` },
        {
            level: 'Medium', type: 'coding', q: 'Detect a cycle in a linked list (Floyd\'s algorithm).',
            a: 'Use slow and fast pointers. If they meet, a cycle exists.',
            lang: 'java', code: `boolean hasCycle(ListNode head) {
    ListNode slow = head, fast = head;
    while (fast != null && fast.next != null) {
        slow = slow.next; fast = fast.next.next;
        if (slow == fast) return true;
    }
    return false;
}` },
        {
            level: 'Hard', type: 'conceptual', q: 'What is amortized complexity? Give an example.',
            a: 'Average cost per operation over a sequence. ArrayList.add() is O(1) amortized — doubling happens rarely enough to average out.'
        },
        {
            level: 'Hard', type: 'coding', q: 'Implement LRU Cache (O(1) get & put).',
            a: 'Use a HashMap + Doubly Linked List. Head = MRU, Tail = LRU.',
            lang: 'java', code: `class LRUCache {
    int cap; Map<Integer,Node> map = new HashMap<>();
    Node head = new Node(0,0), tail = new Node(0,0);
    LRUCache(int cap) { this.cap=cap; head.next=tail; tail.prev=head; }
    public int get(int key) {
        if (!map.containsKey(key)) return -1;
        Node n = map.get(key); remove(n); insert(n); return n.val;
    }
    public void put(int key, int val) {
        if (map.containsKey(key)) remove(map.get(key));
        Node n = new Node(key,val); insert(n); map.put(key,n);
        if (map.size()>cap) { Node lru=tail.prev; remove(lru); map.remove(lru.key); }
    }
    void remove(Node n){ n.prev.next=n.next; n.next.prev=n.prev; }
    void insert(Node n){ n.next=head.next; n.prev=head; head.next.prev=n; head.next=n; }
    class Node{ int key,val; Node prev,next; Node(int k,int v){key=k;val=v;} }
}` },
    ]
});

// 2. Java
topics.push({
    id: 'java', icon: '☕', title: 'Java – Core & J2EE', questions: [
        {
            level: 'Easy', type: 'conceptual', q: 'What is the difference between JDK, JRE, and JVM?',
            a: 'JVM executes bytecode; JRE = JVM + libraries; JDK = JRE + dev tools (javac, jar).'
        },
        {
            level: 'Easy', type: 'conceptual', q: 'What are the four OOP pillars in Java?',
            a: 'Encapsulation, Inheritance, Polymorphism, Abstraction.'
        },
        {
            level: 'Easy', type: 'coding', q: 'Show method overloading vs. overriding.',
            lang: 'java', a: 'Overloading = same name, different params (compile-time). Overriding = subclass re-implements parent method (runtime).',
            code: `class Animal { String speak() { return "..."; } }
class Dog extends Animal {
    @Override String speak() { return "Woof"; }     // overriding
    String speak(int times) { return "Woof".repeat(times); } // overloading
}` },
        {
            level: 'Medium', type: 'conceptual', q: 'Explain Java Memory Model: Heap vs Stack.',
            a: 'Stack stores method frames & local primitives (thread-local). Heap stores objects (shared). GC reclaims heap. Metaspace holds class metadata (Java 8+).'
        },
        {
            level: 'Medium', type: 'coding', q: 'Demonstrate a custom functional interface with lambda.',
            lang: 'java', a: 'Functional interface has exactly one abstract method; used with lambdas/method refs.',
            code: `@FunctionalInterface
interface Transformer<T, R> { R transform(T input); }

Transformer<String, Integer> len = String::length;
System.out.println(len.transform("hello")); // 5` },
        {
            level: 'Medium', type: 'conceptual', q: 'What is the difference between synchronized method and synchronized block?',
            a: 'Synchronized method locks the whole object (or class for static). Synchronized block allows locking only a specific critical section reducing contention.'
        },
        {
            level: 'Hard', type: 'conceptual', q: 'Explain Java\'s happens-before relationship and volatile.',
            a: 'Happens-before guarantees memory visibility. volatile ensures reads/writes go to main memory, preventing reordering. Not sufficient for compound actions like i++.'
        },
        {
            level: 'Hard', type: 'coding', q: 'Implement a thread-safe Singleton using double-checked locking.',
            lang: 'java', a: 'volatile + double-check ensures the instance is fully constructed before being visible to other threads.',
            code: `public class Singleton {
    private static volatile Singleton instance;
    private Singleton() {}
    public static Singleton getInstance() {
        if (instance == null) {
            synchronized (Singleton.class) {
                if (instance == null) instance = new Singleton();
            }
        }
        return instance;
    }
}` },
    ]
});

// 3. Python
topics.push({
    id: 'python', icon: '🐍', title: 'Python', questions: [
        {
            level: 'Easy', type: 'conceptual', q: 'What are Python\'s mutable vs immutable types?',
            a: 'Immutable: int, float, str, tuple, frozenset. Mutable: list, dict, set. Immutable objects cannot be changed after creation.'
        },
        {
            level: 'Easy', type: 'coding', q: 'Write a list comprehension with filtering.',
            lang: 'python', a: 'List comprehensions are concise and faster than equivalent for-loops.',
            code: `# Squares of even numbers
evens_sq = [x**2 for x in range(20) if x % 2 == 0]
print(evens_sq)  # [0, 4, 16, 36, ...]` },
        {
            level: 'Medium', type: 'conceptual', q: 'Explain Python\'s GIL and its impact on multi-threading.',
            a: 'Global Interpreter Lock allows only one thread to execute Python bytecode at a time. For CPU-bound tasks use multiprocessing; for I/O-bound tasks threading still works well.'
        },
        {
            level: 'Medium', type: 'coding', q: 'Implement a decorator that measures function execution time.',
            lang: 'python', a: 'Decorators wrap a function to add behaviour without modifying its source.',
            code: `import time, functools
def timer(fn):
    @functools.wraps(fn)
    def wrapper(*args, **kwargs):
        start = time.perf_counter()
        result = fn(*args, **kwargs)
        print(f"{fn.__name__} took {time.perf_counter()-start:.4f}s")
        return result
    return wrapper

@timer
def heavy(): time.sleep(0.5)` },
        {
            level: 'Hard', type: 'coding', q: 'Implement an async HTTP fetcher using asyncio + aiohttp.',
            lang: 'python', a: 'asyncio event loop + aiohttp for non-blocking concurrent HTTP requests.',
            code: `import asyncio, aiohttp
async def fetch(session, url):
    async with session.get(url) as r: return await r.text()
async def main(urls):
    async with aiohttp.ClientSession() as s:
        return await asyncio.gather(*[fetch(s,u) for u in urls])
# asyncio.run(main(["https://api.example.com/1","https://api.example.com/2"]))` },
    ]
});

// 4. REST & Microservices
topics.push({
    id: 'apis', icon: '🌐', title: 'RESTful APIs & Microservices', questions: [
        {
            level: 'Easy', type: 'conceptual', q: 'What are the REST constraints / principles?',
            a: 'Client-Server, Stateless, Cacheable, Uniform Interface, Layered System, Code-on-Demand (optional).'
        },
        {
            level: 'Easy', type: 'conceptual', q: 'HTTP status codes: 200 vs 201 vs 204 vs 400 vs 401 vs 403 vs 404 vs 429 vs 500?',
            a: '200 OK, 201 Created, 204 No Content, 400 Bad Request, 401 Unauthorized, 403 Forbidden, 404 Not Found, 429 Too Many Requests, 500 Server Error.'
        },
        {
            level: 'Medium', type: 'conceptual', q: 'Explain the Circuit Breaker pattern in microservices.',
            a: 'Monitors failures; after a threshold opens the circuit (fails fast). After timeout, moves to half-open to probe recovery. Prevents cascade failures. Resilience4j & Hystrix implement this.'
        },
        {
            level: 'Medium', type: 'coding', q: 'Spring Boot REST endpoint with request validation.',
            lang: 'java', a: 'Use @Valid with Bean Validation annotations on the DTO.',
            code: `@RestController @RequestMapping("/users")
public class UserController {
    @PostMapping
    public ResponseEntity<User> create(@Valid @RequestBody UserDto dto) {
        return ResponseEntity.status(201).body(service.create(dto));
    }
}

record UserDto(
    @NotBlank String name,
    @Email String email,
    @Min(18) int age) {}` },
        {
            level: 'Hard', type: 'conceptual', q: 'SAGA pattern: choreography vs orchestration.',
            a: 'Choreography: services emit events, others react — decoupled but hard to trace. Orchestration: a central saga orchestrator commands each step — easier to trace but coupling. Both compensate on failure via undo transactions.'
        },
    ]
});

// 5. Spring Boot
topics.push({
    id: 'spring', icon: '🍃', title: 'Spring Boot & Frameworks', questions: [
        {
            level: 'Easy', type: 'conceptual', q: 'What is auto-configuration in Spring Boot?',
            a: 'Spring Boot reads META-INF/spring/org.springframework.boot.autoconfigure.AutoConfiguration.imports and conditionally creates beans based on classpath and properties (@ConditionalOnClass, etc.).'
        },
        {
            level: 'Medium', type: 'coding', q: 'Create a custom Spring Boot starter with auto-configuration.',
            lang: 'java', a: 'Define a @Configuration class and register it in META-INF/spring/ file.',
            code: `@Configuration
@ConditionalOnProperty(prefix="audit", name="enabled", havingValue="true")
public class AuditAutoConfiguration {
    @Bean
    public AuditService auditService() { return new AuditService(); }
}
// resources/META-INF/spring/
// org.springframework.boot.autoconfigure.AutoConfiguration.imports
// → com.example.AuditAutoConfiguration` },
        {
            level: 'Hard', type: 'coding', q: 'Implement Quartz Scheduler job triggered via cron.',
            lang: 'java', a: 'Implement Job, configure JobDetail + CronTrigger beans.',
            code: `@Component
public class ReportJob implements Job {
    @Override public void execute(JobExecutionContext ctx) {
        System.out.println("Running report: " + LocalDateTime.now());
    }
}
@Configuration
public class QuartzConfig {
    @Bean JobDetail reportJobDetail() {
        return JobBuilder.newJob(ReportJob.class)
            .withIdentity("reportJob").storeDurably().build();
    }
    @Bean Trigger reportTrigger(JobDetail d) {
        return TriggerBuilder.newTrigger().forJob(d)
            .withSchedule(CronScheduleBuilder.cronSchedule("0 0 8 * * ?")).build();
    }
}` },
    ]
});

// 6. Databases
topics.push({
    id: 'db', icon: '🗄️', title: 'Databases – Elasticsearch, MongoDB, Redis', questions: [
        {
            level: 'Easy', type: 'conceptual', q: 'What is an inverted index in Elasticsearch?',
            a: 'Maps terms to the list of documents containing them, enabling full-text search in O(1) to O(log n) per term.'
        },
        {
            level: 'Easy', type: 'conceptual', q: 'What is Redis used for?',
            a: 'In-memory key-value store used for caching, session management, pub/sub, rate limiting, leaderboards, and distributed locks.'
        },
        {
            level: 'Medium', type: 'coding', q: 'Elasticsearch query: full-text search with filter.',
            lang: 'json', a: 'bool query combines must (full-text) + filter (exact) clauses efficiently.',
            code: `{
  "query": {
    "bool": {
      "must":   [{ "match": { "title": "spring boot" } }],
      "filter": [{ "term":  { "status": "published" } },
                 { "range": { "date": { "gte": "2024-01-01" } } }]
    }
  }
}` },
        {
            level: 'Medium', type: 'coding', q: 'Redis distributed lock implementation in Java.',
            lang: 'java', a: 'Use SET NX PX (set if not exists with expiry) for atomic lock acquisition.',
            code: `// Jedis example
boolean acquireLock(Jedis j, String key, String token, long ttlMs) {
    return "OK".equals(j.set(key, token, SetParams.setParams().nx().px(ttlMs)));
}
void releaseLock(Jedis j, String key, String token) {
    String script = "if redis.call('get',KEYS[1])==ARGV[1] then return redis.call('del',KEYS[1]) else return 0 end";
    j.eval(script, 1, key, token);
}` },
        {
            level: 'Hard', type: 'conceptual', q: 'Explain MongoDB\'s WiredTiger storage engine and write concern.',
            a: 'WiredTiger uses MVCC, document-level locking, and compression. Write concern (w:1, w:majority, j:true) controls durability: majority ensures replication to most nodes before ack.'
        },
    ]
});

// 7. DevOps
topics.push({
    id: 'devops', icon: '🐳', title: 'DevOps – Docker, Kubernetes, CI/CD', questions: [
        {
            level: 'Easy', type: 'conceptual', q: 'What is the difference between Docker image and container?',
            a: 'Image is a read-only template (layered filesystem). Container is a running instance of an image with a writable layer on top.'
        },
        {
            level: 'Easy', type: 'coding', q: 'Multi-stage Dockerfile for a Java Spring Boot app.',
            lang: 'dockerfile', a: 'Multi-stage builds keep the final image lean by discarding build tools.',
            code: `# Build stage
FROM maven:3.9-eclipse-temurin-21 AS build
WORKDIR /app
COPY pom.xml . && RUN mvn dependency:go-offline
COPY src ./src
RUN mvn package -DskipTests

# Runtime stage
FROM eclipse-temurin:21-jre
WORKDIR /app
COPY --from=build /app/target/*.jar app.jar
EXPOSE 8080
ENTRYPOINT ["java","-jar","app.jar"]` },
        {
            level: 'Medium', type: 'coding', q: 'Kubernetes Deployment + HPA manifest.',
            lang: 'yaml', a: 'HPA scales pods based on CPU utilization automatically.',
            code: `apiVersion: apps/v1
kind: Deployment
metadata: { name: api-service }
spec:
  replicas: 2
  selector: { matchLabels: { app: api } }
  template:
    metadata: { labels: { app: api } }
    spec:
      containers:
      - name: api
        image: myrepo/api:latest
        ports: [{ containerPort: 8080 }]
        resources:
          requests: { cpu: "250m", memory: "256Mi" }
          limits:   { cpu: "500m", memory: "512Mi" }
---
apiVersion: autoscaling/v2
kind: HorizontalPodAutoscaler
metadata: { name: api-hpa }
spec:
  scaleTargetRef: { apiVersion: apps/v1, kind: Deployment, name: api-service }
  minReplicas: 2
  maxReplicas: 10
  metrics:
  - type: Resource
    resource: { name: cpu, target: { type: Utilization, averageUtilization: 70 } }` },
        {
            level: 'Medium', type: 'conceptual', q: 'Explain Kubernetes liveness vs readiness vs startup probes.',
            a: 'Liveness: restarts container if unhealthy. Readiness: removes pod from Service LB if not ready. Startup: delays liveness checks for slow-starting containers.'
        },
        {
            level: 'Hard', type: 'coding', q: 'GitHub Actions CI/CD pipeline for a Spring Boot app.',
            lang: 'yaml', a: 'Push → test → build Docker → push to registry → deploy to K8s.',
            code: `name: CI/CD Pipeline
on: push: branches: [main]
jobs:
  build-deploy:
    runs-on: ubuntu-latest
    steps:
    - uses: actions/checkout@v4
    - uses: actions/setup-java@v4
      with: { java-version: '21', distribution: temurin }
    - run: mvn test
    - name: Build & Push Docker
      run: |
        echo \${{ secrets.REGISTRY_PASSWORD }} | docker login -u \${{ secrets.REGISTRY_USER }} --password-stdin
        docker build -t myrepo/api:\${{ github.sha }} .
        docker push myrepo/api:\${{ github.sha }}
    - name: Deploy to K8s
      run: kubectl set image deployment/api-service api=myrepo/api:\${{ github.sha }}` },
    ]
});

// 8. Kafka
topics.push({
    id: 'kafka', icon: '📨', title: 'Apache Kafka', questions: [
        {
            level: 'Easy', type: 'conceptual', q: 'What are Kafka topics, partitions, and offsets?',
            a: 'Topic = logical stream. Partition = ordered, immutable log (enables parallelism). Offset = unique message position within a partition.'
        },
        {
            level: 'Medium', type: 'coding', q: 'Kafka producer/consumer in Java (Spring Kafka).',
            lang: 'java', a: '@KafkaListener auto-commits offset after successful processing.',
            code: `// Producer
@Component public class OrderProducer {
    @Autowired KafkaTemplate<String,String> kafka;
    public void send(String order) {
        kafka.send("orders", UUID.randomUUID().toString(), order);
    }
}
// Consumer
@Component public class OrderConsumer {
    @KafkaListener(topics="orders", groupId="order-group")
    public void consume(String msg, @Header(KafkaHeaders.RECEIVED_PARTITION) int part) {
        System.out.printf("Partition %d: %s%n", part, msg);
    }
}` },
        {
            level: 'Hard', type: 'conceptual', q: 'Explain exactly-once semantics in Kafka.',
            a: 'Requires idempotent producer (enable.idempotence=true) + transactional producer + read-process-write in one transaction. Consumer must use isolation.level=read_committed.'
        },
    ]
});

// 9. Security
topics.push({
    id: 'security', icon: '🔐', title: 'Security – Crypto, PQC, RBAC', questions: [
        {
            level: 'Easy', type: 'conceptual', q: 'Symmetric vs Asymmetric encryption?',
            a: 'Symmetric: same key encrypt/decrypt (AES). Fast, used for bulk data. Asymmetric: public/private key pair (RSA, EC). Slower, used for key exchange & signatures.'
        },
        {
            level: 'Medium', type: 'coding', q: 'AES-256-GCM encryption in Java.',
            lang: 'java', a: 'GCM mode provides authenticated encryption (confidentiality + integrity + authenticity).',
            code: `byte[] encrypt(byte[] plain, SecretKey key) throws Exception {
    byte[] iv = new byte[12]; new SecureRandom().nextBytes(iv);
    Cipher c = Cipher.getInstance("AES/GCM/NoPadding");
    c.init(Cipher.ENCRYPT_MODE, key, new GCMParameterSpec(128, iv));
    byte[] ciphertext = c.doFinal(plain);
    ByteBuffer buf = ByteBuffer.allocate(12 + ciphertext.length);
    buf.put(iv); buf.put(ciphertext);
    return buf.array();
}` },
        {
            level: 'Medium', type: 'conceptual', q: 'Explain RBAC and how it differs from ABAC.',
            a: 'RBAC assigns permissions to roles, roles to users. Simple and auditable. ABAC uses attributes (user, resource, env) for fine-grained policies. ABAC is more flexible but complex.'
        },
        {
            level: 'Hard', type: 'conceptual', q: 'What is Post-Quantum Cryptography (PQC)? What NIST algorithms were standardised?',
            a: 'PQC algorithms resist attacks by quantum computers (Shor\'s & Grover\'s). NIST 2024 standards: ML-KEM (CRYSTALS-Kyber) for KEM, ML-DSA (CRYSTALS-Dilithium) & SLH-DSA (SPHINCS+) for signatures. Java 21+ includes experimental PQC support.'
        },
        {
            level: 'Hard', type: 'coding', q: 'Secure API: JWT validation with RS256.',
            lang: 'java', a: 'Use public key to verify JWT signature — private key never leaves auth server.',
            code: `// Using java-jwt (Auth0)
RSAPublicKey pub = loadPublicKey(); // from cert/JWKS
DecodedJWT jwt = JWT.require(Algorithm.RSA256(pub, null))
    .withIssuer("https://auth.example.com")
    .build()
    .verify(token);
String userId = jwt.getSubject();` },
    ]
});

// 10. AWS
topics.push({
    id: 'aws', icon: '☁️', title: 'AWS', questions: [
        {
            level: 'Easy', type: 'conceptual', q: 'What is the difference between EC2, ECS, and EKS?',
            a: 'EC2: raw VMs. ECS: managed container service (AWS-native orchestration). EKS: managed Kubernetes. ECS is simpler; EKS gives full K8s ecosystem.'
        },
        {
            level: 'Easy', type: 'conceptual', q: 'Explain S3 storage classes.',
            a: 'Standard (frequent access), Infrequent Access, One-Zone-IA, Glacier (archival), Glacier Deep Archive, Intelligent-Tiering (auto-moves between tiers).'
        },
        {
            level: 'Medium', type: 'coding', q: 'AWS Lambda function with SQS trigger (Java).',
            lang: 'java', a: 'Lambda polls SQS; batch processing with partial failure support.',
            code: `public class OrderHandler implements RequestHandler<SQSEvent, SQSBatchResponse> {
    public SQSBatchResponse handleRequest(SQSEvent event, Context ctx) {
        List<SQSBatchResponse.BatchItemFailure> failures = new ArrayList<>();
        for (SQSEvent.SQSMessage msg : event.getRecords()) {
            try { processOrder(msg.getBody()); }
            catch (Exception e) {
                failures.add(SQSBatchResponse.BatchItemFailure.builder()
                    .withItemIdentifier(msg.getMessageId()).build());
            }
        }
        return SQSBatchResponse.builder().withBatchItemFailures(failures).build();
    }
}` },
        {
            level: 'Medium', type: 'conceptual', q: 'What is VPC and explain public vs private subnets?',
            a: 'VPC is an isolated network. Public subnet has a route to Internet Gateway (IGW). Private subnet routes outbound via NAT Gateway. Databases/internal services live in private subnets.'
        },
        {
            level: 'Hard', type: 'conceptual', q: 'Explain AWS IAM: roles, policies, and the principle of least privilege.',
            a: 'IAM policies (JSON) define Allow/Deny on actions/resources. Roles are assumed by services/users (no long-term credentials). Least privilege: grant only required permissions. Use SCPs in AWS Organizations to enforce org-wide guardrails.'
        },
    ]
});

// 11. GCP
topics.push({
    id: 'gcp', icon: '🌤️', title: 'Google Cloud Platform (GCP)', questions: [
        {
            level: 'Easy', type: 'conceptual', q: 'GCP equivalent of AWS S3, EC2, and Lambda?',
            a: 'Cloud Storage = S3. Compute Engine = EC2. Cloud Functions / Cloud Run = Lambda.'
        },
        {
            level: 'Medium', type: 'coding', q: 'Deploy a containerised app to Cloud Run via gcloud CLI.',
            lang: 'bash', a: 'Cloud Run auto-scales to zero; pay only when handling requests.',
            code: `# Build and push
gcloud builds submit --tag gcr.io/PROJECT_ID/api-service

# Deploy
gcloud run deploy api-service \\
  --image gcr.io/PROJECT_ID/api-service \\
  --platform managed \\
  --region us-central1 \\
  --allow-unauthenticated \\
  --min-instances 1 \\
  --max-instances 100` },
        {
            level: 'Medium', type: 'conceptual', q: 'Explain GKE Autopilot vs Standard.',
            a: 'Standard: you manage node pools, scaling, upgrades. Autopilot: Google manages nodes; you only define workloads. Autopilot bills per pod resource request, not per node. Better for most teams.'
        },
        {
            level: 'Hard', type: 'conceptual', q: 'Explain BigQuery\'s columnar storage and slot-based compute model.',
            a: 'BigQuery stores data in Capacitor columnar format (per column). Queries use Dremel execution tree with distributed SQL processing. Slots = units of compute (CPU+RAM). On-demand pricing bills per TB scanned; reservations provide guaranteed slots.'
        },
    ]
});

// 12. Networking & Architecture
topics.push({
    id: 'arch', icon: '🏗️', title: 'Networking & System Architecture', questions: [
        {
            level: 'Easy', type: 'conceptual', q: 'HTTP/2 advantages over HTTP/1.1?',
            a: 'Multiplexing (multiple requests over one TCP connection), header compression (HPACK), server push, binary framing, stream prioritization — massively reduces latency.'
        },
        {
            level: 'Medium', type: 'conceptual', q: 'What is the CAP theorem?',
            a: 'A distributed system can guarantee only 2 of: Consistency (all nodes see same data), Availability (every request gets a response), Partition Tolerance (survives network splits). In practice P is unavoidable, so choose CP or AP.'
        },
        {
            level: 'Medium', type: 'conceptual', q: 'How would you design a rate limiter?',
            a: 'Token Bucket (burst-friendly) or Sliding Window Counter in Redis. Store count per user per window. Atomic INCR + EXPIRY. Distribute via Redis Cluster for scale. Return 429 on breach.'
        },
        {
            level: 'Hard', type: 'conceptual', q: 'Describe the design of a URL shortener at 10M req/day scale.',
            a: 'Write: base62 encode incremental ID (or hash). Store in Redis + DB. Read: Redis cache lookup (99% hits) → DB fallback. CDN at edge. Partitioned DB by range. Analytics via async Kafka → ClickHouse pipeline. 99.99% HA with multi-region active-active.'
        },
    ]
});

// ─── BUILD HTML ──────────────────────────────────────────────────────────────
const tocItems = topics.map(t =>
    `<li><a href="#${t.id}">${t.icon} ${t.title}</a></li>`).join('');

const sectionsHtml = topics.map(t => section(t.id, t.icon, t.title, t.questions)).join('');

const html = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8"/>
<meta name="viewport" content="width=device-width,initial-scale=1"/>
<title>Tech Interview Masterguide 2025</title>
<link rel="preconnect" href="https://fonts.googleapis.com"/>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;900&family=JetBrains+Mono:wght@400;600&family=Space+Grotesk:wght@600;700;800&display=swap" rel="stylesheet"/>
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/styles/tokyo-night-dark.min.css"/>
<style>
*,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
:root{
  --bg:#0a0e1a;--surface:#111827;--surface2:#1a2235;--border:#1e2d4a;
  --text:#e2e8f0;--muted:#8892a4;
  --accent:#6366f1;--accent2:#8b5cf6;--accent3:#06b6d4;
  --green:#22c55e;--amber:#f59e0b;--red:#ef4444;
  --font:'Inter',sans-serif;--mono:'JetBrains Mono',monospace;--head:'Space Grotesk',sans-serif;
}
html{scroll-behavior:smooth}
body{font-family:var(--font);background:var(--bg);color:var(--text);line-height:1.6;min-height:100vh}

/* Scrollbar */
::-webkit-scrollbar{width:6px;height:6px}
::-webkit-scrollbar-track{background:var(--bg)}
::-webkit-scrollbar-thumb{background:var(--border);border-radius:3px}

/* HERO */
.hero{
  background:linear-gradient(135deg,#0a0e1a 0%,#0f1b38 40%,#1a0a3a 100%);
  padding:80px 40px 60px;text-align:center;position:relative;overflow:hidden;
  border-bottom:1px solid var(--border);
}
.hero::before{
  content:'';position:absolute;inset:0;
  background:radial-gradient(ellipse 80% 60% at 50% 0%,rgba(99,102,241,.25),transparent);
}
.hero-eyebrow{font-family:var(--mono);color:var(--accent3);font-size:.8rem;letter-spacing:.15em;text-transform:uppercase;margin-bottom:16px}
.hero h1{font-family:var(--head);font-size:clamp(2rem,6vw,4rem);font-weight:900;
  background:linear-gradient(135deg,#fff 0%,#a5b4fc 50%,#67e8f9 100%);
  -webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;margin-bottom:16px
}
.hero p{color:var(--muted);max-width:620px;margin:0 auto 32px;font-size:1.05rem}
.pill-row{display:flex;flex-wrap:wrap;gap:10px;justify-content:center}
.pill{background:rgba(99,102,241,.15);border:1px solid rgba(99,102,241,.35);
  color:#a5b4fc;padding:6px 14px;border-radius:999px;font-size:.8rem;font-family:var(--mono)}

/* LAYOUT */
.layout{display:grid;grid-template-columns:280px 1fr;min-height:calc(100vh - 260px)}

/* SIDEBAR */
.sidebar{
  background:var(--surface);border-right:1px solid var(--border);
  padding:28px 0;position:sticky;top:0;height:100vh;overflow-y:auto;
}
.sidebar-title{font-family:var(--mono);font-size:.7rem;letter-spacing:.15em;text-transform:uppercase;
  color:var(--muted);padding:0 24px 12px}
.sidebar nav ul{list-style:none}
.sidebar nav ul a{
  display:flex;align-items:center;gap:10px;padding:9px 24px;
  color:var(--muted);text-decoration:none;font-size:.875rem;font-weight:500;
  transition:all .2s;border-left:3px solid transparent
}
.sidebar nav ul a:hover{color:var(--text);background:var(--surface2);border-left-color:var(--accent)}

/* MAIN */
main{padding:48px 48px 80px;max-width:1100px}

/* SECTION */
.topic-section{margin-bottom:80px;animation:fadeUp .5s ease both}
@keyframes fadeUp{from{opacity:0;transform:translateY(24px)}to{opacity:1;transform:none}}
.section-header{
  display:flex;align-items:center;gap:16px;margin-bottom:32px;padding-bottom:20px;
  border-bottom:2px solid;border-image:linear-gradient(90deg,var(--accent),var(--accent2),transparent) 1
}
.section-icon{font-size:2.2rem}
.section-header h2{
  font-family:var(--head);font-size:1.8rem;font-weight:800;
  background:linear-gradient(90deg,#fff,#a5b4fc);-webkit-background-clip:text;
  -webkit-text-fill-color:transparent;background-clip:text
}

/* LEVEL GROUP */
.level-group{margin-bottom:36px}
.level-title{
  font-family:var(--mono);font-size:.72rem;letter-spacing:.18em;text-transform:uppercase;
  font-weight:600;padding:6px 14px;border-radius:6px;display:inline-block;margin-bottom:20px
}
.level-easy{background:rgba(34,197,94,.15);color:#86efac;border:1px solid rgba(34,197,94,.3)}
.level-medium{background:rgba(245,158,11,.15);color:#fcd34d;border:1px solid rgba(245,158,11,.3)}
.level-hard{background:rgba(239,68,68,.15);color:#fca5a5;border:1px solid rgba(239,68,68,.3)}

/* CARDS */
.cards-grid{display:grid;gap:20px}
.card{
  background:var(--surface);border:1px solid var(--border);border-radius:14px;
  padding:24px;transition:border-color .25s,transform .2s,box-shadow .25s;
  position:relative;overflow:hidden
}
.card::before{
  content:'';position:absolute;inset:0;border-radius:14px;
  background:linear-gradient(135deg,rgba(99,102,241,.07),transparent);pointer-events:none
}
.card:hover{border-color:rgba(99,102,241,.5);transform:translateY(-2px);
  box-shadow:0 8px 32px rgba(99,102,241,.15)}
.card.coding{border-left:3px solid var(--accent2)}
.card.conceptual{border-left:3px solid var(--accent3)}
.card-header{display:flex;gap:10px;align-items:center;margin-bottom:14px}
.badge{padding:3px 10px;border-radius:999px;font-size:.7rem;font-weight:700;color:#fff;font-family:var(--mono)}
.tag{padding:3px 10px;border-radius:999px;font-size:.7rem;font-family:var(--mono);font-weight:600}
.tag-coding{background:rgba(139,92,246,.2);color:#c4b5fd;border:1px solid rgba(139,92,246,.3)}
.tag-conceptual{background:rgba(6,182,212,.2);color:#67e8f9;border:1px solid rgba(6,182,212,.3)}
.question{font-size:1rem;font-weight:600;color:var(--text);margin-bottom:10px;line-height:1.5}
.answer{font-size:.9rem;color:var(--muted);margin-bottom:14px;line-height:1.65}
.answer strong{color:var(--text)}

/* CODE */
pre{border-radius:10px;margin-top:12px;font-size:.82rem;overflow-x:auto;
  border:1px solid rgba(255,255,255,.06)}
code{font-family:var(--mono)}

/* SEARCH */
.search-bar{padding:20px 24px 0}
.search-input{
  width:100%;background:var(--surface2);border:1px solid var(--border);
  border-radius:8px;padding:9px 14px;color:var(--text);font-size:.875rem;
  font-family:var(--font);outline:none;transition:border-color .2s
}
.search-input:focus{border-color:var(--accent)}
.search-input::placeholder{color:var(--muted)}

/* PRINT */
@media print{
  .sidebar{display:none}
  .layout{grid-template-columns:1fr}
  main{padding:20px}
  .card{break-inside:avoid}
  body{background:#fff;color:#111}
  .section-header h2,.question{-webkit-text-fill-color:initial;color:#111}
  .answer{color:#444}
  .hero{background:#fff;color:#111;border:none}
  .hero h1{-webkit-text-fill-color:initial;color:#1e1b4b}
  pre{background:#1a1a2e!important}
}
@media(max-width:900px){
  .layout{grid-template-columns:1fr}
  .sidebar{display:none}
  main{padding:24px}
}
</style>
</head>
<body>
<div class="hero">
  <div class="hero-eyebrow">🚀 Interview Preparation Guide · 2025 Edition</div>
  <h1>Tech Interview Masterguide</h1>
  <p>Comprehensive questions with code snippets — DSA, Cloud, Java, Python, Microservices, Security & more. Organised by topic and difficulty.</p>
  <div class="pill-row">
    ${topics.map(t => `<span class="pill">${t.icon} ${t.title}</span>`).join('')}
  </div>
</div>
<div class="layout">
  <aside class="sidebar">
    <div class="search-bar">
      <input class="search-input" id="search" placeholder="🔍 Search questions…" type="text"/>
    </div>
    <p class="sidebar-title" style="margin-top:20px">Topics</p>
    <nav><ul id="toc">${tocItems}</ul></nav>
  </aside>
  <main id="main">${sectionsHtml}</main>
</div>
<script src="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/highlight.min.js"></script>
<script>
hljs.highlightAll();
const search = document.getElementById('search');
const cards = Array.from(document.querySelectorAll('.card'));
search.addEventListener('input', () => {
  const q = search.value.toLowerCase();
  cards.forEach(c => {
    c.style.display = c.textContent.toLowerCase().includes(q) ? '' : 'none';
  });
});
// Sidebar active
const sections = document.querySelectorAll('.topic-section');
const links = document.querySelectorAll('.sidebar nav a');
const obs = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if(e.isIntersecting){
      links.forEach(l=>l.style.color='');
      const a = document.querySelector('.sidebar nav a[href="#'+e.target.id+'"]');
      if(a){a.style.color='#a5b4fc';a.style.borderLeftColor='#6366f1'}
    }
  });
},{threshold:.2});
sections.forEach(s=>obs.observe(s));
</script>
</body>
</html>`;

fs.writeFileSync(path.join(__dirname, 'index.html'), html, 'utf8');
console.log('✅ Generated interview_imp/index.html');
