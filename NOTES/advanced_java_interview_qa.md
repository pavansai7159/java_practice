# ☕ Advanced Java & Concurrency Interview Guide

An aesthetically formatted, comprehensive Q&A guide covering advanced Java concepts, multithreading, and the core internal workings of essential data structures.

---

## 💡 Question 1: Java 8 Stream API
**Question:** *Explain Java 8 Stream API. Write a stream pipeline to filter transactions above $10,000, group by currency, and sum amounts per currency.*

### 📝 Answer
The Java Stream API enables functional-style operations on collections of elements, allowing for pipelines of transformations. It operates on memory structures and is evaluated **lazily**—meaning computation on the source data only happens when a terminal operation is invoked.

**Code Example:**
```java
Map<String, Double> highValueSumsByCurrency = transactions.stream()
    // 1. Intermediate Operation (Filter): Keep only transactions > $10,000
    .filter(t -> t.getAmount() > 10000)
    // 2. Terminal Operation (Collect): Group by currency and summarize the amount
    .collect(Collectors.groupingBy(
        Transaction::getCurrency, 
        Collectors.summingDouble(Transaction::getAmount)
    ));
```

---

## 💡 Question 2: HashMap Internal Working
**Question:** *Explain HashMap internal working: hashing, collision resolution (chaining vs open addressing), load factor, and why HashMap is not thread-safe.*

### 📝 Answer
`HashMap` stores data in an array of "Buckets" (Nodes). When you insert a key-value pair, it calls `hashCode()` on the key, applies a secondary hash function to prevent bad hashing, and then uses a bitwise AND operation `(n - 1) & hash` to find the array index.

*   **Collision Resolution:** A collision occurs when two different keys generate the same index. Java handles this through **Chaining**, creating a linked list at that bucket. To protect against worst-case scenarios `(O(N))`, Java 8+ automatically converts the linked list into a **Red-Black Tree** `(O(log N))` once a bucket exceeds 8 nodes. (Note: Open addressing is an alternative strategy where it probes for the next empty array index, but Java uses Chaining).
*   **Load Factor:** Defines when the map should resize. The default is `0.75`. If the map is 75% full, it automatically doubles the array capacity and **rehashes** all existing elements.
*   **Not Thread-Safe:** In multithreaded environments, simultaneous resizing (rehashing) could historically corrupt the map, causing circular linked lists resulting in internal infinite loops (Pre-Java 8). Today, it mostly causes data loss or throws a `ConcurrentModificationException`.

---

## 💡 Question 3: The `volatile` Keyword
**Question:** *What is the volatile keyword? Explain happens-before relationship and how volatile prevents visibility issues in multithreaded order processing.*

### 📝 Answer
`volatile` forces every read of a variable to fetch straight from **Main Memory (RAM)**, and every write to go straight to RAM, bypassing local CPU caches (L1/L2).

*   **Happens-Before Relationship:** A write to a `volatile` variable establishes a "happens-before" relationship to any subsequent read. This JVM guarantee ensures that any memory writes made prior to updating the volatile block are visible to the thread making the read.
*   **Visibility Issues:** In multithreaded order processing, if Thread A flags an order's `boolean isProcessed = true`, without `volatile` Thread B might falsely read `false` off its own stale CPU cache and double-process an order. `volatile` guarantees immediate visibility across all threads.

---

## 💡 Question 4: ExecutorService & ThreadPoolExecutor Tuning
**Question:** *Explain ExecutorService, ThreadPoolExecutor, and how to properly tune thread pool size for I/O-bound vs CPU-bound tasks in a trading system.*

### 📝 Answer
`ExecutorService` abstracts away raw `Thread` creation by managing a pool of worker threads. You submit tasks, and the pool executes them. `ThreadPoolExecutor` is the core configurable implementation backing it.

**Tuning Pool Size in a Trading System:**
*   **CPU-Bound Tasks (e.g., complex quantitative math):** You want the pool size identical to your logical CPU cores to maximize throughput while avoiding context-switching overhead.
    *   *Formula:* `Runtime.getRuntime().availableProcessors()`
*   **I/O-Bound Tasks (e.g., DB calls, REST API calls):** Threads spend most of their time "blocked" waiting on I/O. We need more threads to keep the CPU busy while others wait.
    *   *Formula (Little's Law):* `Cores * (1 + Wait Time / Compute Time)`. Example: 4 cores, waiting 90ms, computing 10ms -> `4 * (1 + 9) = 40` threads.

---

## 💡 Question 5: ConcurrentHashMap
**Question:** *What is ConcurrentHashMap? How does it achieve thread-safety without locking the entire map? Compare to Collections.synchronizedMap().*

### 📝 Answer
`ConcurrentHashMap` is a highly scalable thread-safe map.

*   **Collections.synchronizedMap():** Wraps a standard map and locks the **entire** data structure for every read/write. It becomes incredibly slow under high concurrent traffic.
*   **Lock Striping / Bucket-Level Synchronization:** `ConcurrentHashMap` avoids global locking. It uses Compare-And-Swap (`CAS`) operations to safely insert nodes if a bucket is empty (lock-free). If a collision occurs, it uses a `synchronized` block to lock **only that specific head-node of the bucket list**. This means Thread A can safely write to bucket 5 while Thread B simultaneously writes to bucket 8. Reads are mostly lock-free.

---

## 💡 Question 6: Java Generics & PECS
**Question:** *Explain Java generics: wildcards (?, extends, super), type erasure, and the PECS (Producer Extends, Consumer Super) principle.*

### 📝 Answer
Generics provide compile-time type safety checking. 
*   **Wildcards (`?`):** Means 'unknown type'. 
    *   `? extends Product`: Any class derived from `Product` (Upper bound).
    *   `? super Developer`: Any class that is a super-class of `Developer` (Lower bound).
*   **Type Erasure:** To maintain backward compatibility, the Java compiler "erases" your Generic types (`<T>`) at compilation. `List<String>` and `List<Integer>` both compile down to the exact same bare `List<Object>` class at runtime.
*   **PECS (Producer Extends, Consumer Super):** The golden rule of Java generics.
    *   Use `? extends T` when you expect the collection to **Produce** items (you only read from it). 
    *   Use `? super T` when you expect the collection to **Consume** items (you write into it).

---

## 💡 Question 7: CompletableFuture API
**Question:** *What are CompletableFuture's thenApply, thenCompose, thenCombine, exceptionally, and allOf? Write an example composing 3 async API calls.*

### 📝 Answer
Introduced in Java 8, it is a non-blocking, async architecture allowing you to chain callbacks.
*   `thenApply()`: Transforms a result once complete (like `map`).
*   `thenCompose()`: Flattens the result if your callback returns another Future (like `flatMap`).
*   `thenCombine()`: Combines the asynchronous results of *two* independent Futures.
*   `allOf()`: Spawns X independent Futures and waits for all of them to complete.
*   `exceptionally()`: The async equivalent of a `catch` block.

**Example Composing 3 Async API Calls:**
```java
CompletableFuture<User> userFuture = getUserDataAsync();
CompletableFuture<MarketData> marketFuture = getMarketDataAsync();

userFuture.thenCombine(marketFuture, (user, market) -> {
    return prepareOrder(user, market);
})
.thenCompose(order -> executeTradeAsync(order)) // thenCompose handles the nested Future
.thenApply(receipt -> "Trade Executed: " + receipt.getId())
.exceptionally(ex -> "Trade Failed! Reason: " + ex.getMessage());
```

---

## 💡 Question 8: Comparable vs Comparator
**Question:** *What is the difference between Comparable and Comparator? Sort a list of trade objects first by value descending, then by timestamp ascending.*

### 📝 Answer
*   **Comparable:** Defines the **natural ordering** of an object. To use it, you modify the source code of the class to implement `Comparable<T>` and override the `compareTo()` method. Only ONE default sorting strategy can be declared natively on the object.
*   **Comparator:** Used for **custom external ordering**. You pass a `Comparator` explicitly when sorting, meaning you do not need to modify the underlying Model classes.

**Code Example:**
```java
List<Trade> trades = getTrades();

trades.sort(Comparator.comparing(Trade::getValue).reversed()
            .thenComparing(Trade::getTimestamp));
```

---

## 💡 Question 9: ReentrantLock vs synchronized
**Question:** *Explain ReentrantLock vs synchronized. What are tryLock, lockInterruptibly, and ReadWriteLock? When do you use each?*

### 📝 Answer
`synchronized` is a built-in JVM feature that implicitly grabs an object monitor lock. It is rigid: threads waiting cannot be interrupted or timeout.

`ReentrantLock` gives you explicit object-level control over the locking mechanism.
*   **tryLock(timeout):** Thread attempts to acquire the lock. If it's unavailable, it returns `false` immediately (or after a timeout) instead of freezing indefinitely. Great for preventing deadlocks.
*   **lockInterruptibly():** Thread waits for the lock, but if another thread invokes `interrupt()` on it, it wakes up and throws an exception, allowing graceful termination.
*   **ReadWriteLock:** A specialized locking system allowing an unlimited number of threads to read concurrently, but only one thread to write exclusively. It speeds up data structures where reading happens the majority of the time.

---

## 💡 Question 10: Singleton & Double-Checked Locking
**Question:** *What is the Singleton design pattern? Implement a thread-safe Singleton using double-checked locking. Why is volatile necessary?*

### 📝 Answer
A design pattern guaranteeing only *one* instance of an object exists across the entire JVM lifecycle (e.g., Database Connection Pools).

**Code Example:**
```java
public class SystemConfig {
    // volatile ensures memory write visibility locally to all threads
    private static volatile SystemConfig instance;
    
    private SystemConfig() {} 
    
    public static SystemConfig getInstance() {
        if (instance == null) { // First check: no locking to preserve speed
            synchronized (SystemConfig.class) {
                if (instance == null) { // Second check: handle initialization race conditions
                    instance = new SystemConfig();
                }
            }
        }
        return instance;
    }
}
```

**Why `volatile` is absolutely necessary:**
The JVM instruction `instance = new SystemConfig()` is **not atomic**. It: 
1) Allocates memory, 2) Calls the constructor, 3) Assigns the memory reference to `instance`. 
Compilers/CPUs are allowed to **reorder instructions** to optimize speed (e.g., 1 -> 3 -> 2). If reordered, Thread B might check `instance == null`, see that it's no longer null (because step 3 ran), and return a partially constructed object before step 2 finishes. `volatile` prohibits this instruction reordering, preventing crashes.
