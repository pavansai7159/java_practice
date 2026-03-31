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
