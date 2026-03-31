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
