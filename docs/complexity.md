# Big-O Complexity Reference

| Operation | CustomArrayList | CustomLinkedList | CustomHashMap | CustomTreeMap | CustomPriorityQueue |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Access (Get)** | O(1) | O(n) | N/A | N/A | O(1) (peek) |
| **Search (Contains)** | O(n) | O(n) | O(1) average | O(log n) average | O(n) |
| **Insert (Prepend)** | O(n) | O(1) | N/A | N/A | N/A |
| **Insert (Append)** | O(1) amortized | O(1) | O(1) average | O(log n) average | O(log n) offer |
| **Delete** | O(n) | O(1) node | O(1) average | O(log n) average | O(log n) poll |
| **Space** | O(n) | O(n) | O(n) | O(n) | O(n) |

---

## Detailed Notes

### 1. Amortized Complexity
Appending to `CustomArrayList` takes O(1) time for most insertions, but O(n) when capacity is reached and dynamic resizing occurs. Summed over N elements, total time is O(n), giving an **O(1) amortized** cost per addition.

### 2. Hash Collisions & Load Factor
`CustomHashMap` maintains an empirical load factor threshold of 0.75. When size exceeds `capacity * loadFactor`, the bucket table doubles and entries are rehashed, maintaining short separate chaining linked lists for **O(1) average** operation time.

### 3. Binary Search Tree vs Red-Black Tree
Java's standard `java.util.TreeMap` uses a Red-Black Tree. CollectionLab uses a Binary Search Tree (BST) for educational visual simplicity, yielding **O(log n) average** time and **O(n) worst-case** time for unbalanced insertion sequences.
