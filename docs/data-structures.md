# Data Structures Implementation Guide

CollectionLab implements five core collection data structures completely from scratch.

---

## 1. CustomArrayList<T>
- **Storage**: `Object[] elements`, `int size`, `int capacity`
- **Dynamic Resizing**: Expands by 2x when full, allocating a new array and copying existing references.
- **Operations**:
  - `add(T)`: O(1) amortized
  - `add(int index, T)`: O(n) element right-shifting
  - `get(int index)` / `set(int index, T)`: O(1) array index access
  - `remove(int index)`: O(n) element left-shifting

---

## 2. CustomLinkedList<T>
- **Storage**: Doubly linked `Node<T>` with `data`, `next`, `prev`; `head`, `tail`, `size`
- **Operations**:
  - `addFirst(T)` / `addLast(T)`: O(1) pointer updates
  - `removeFirst()` / `removeLast()`: O(1) pointer updates
  - `get(int index)` / `add(int index, T)` / `remove(int index)`: O(n) sequential node traversal optimized from head or tail.

---

## 3. CustomHashMap<K, V>
- **Storage**: `Entry<K,V>[] table`, `loadFactor` (0.75), `threshold`
- **Entry**: `K key`, `V value`, `int hash`, `Entry<K,V> next`
- **Collision Resolution**: Separate Chaining linked list buckets.
- **Rehashing**: When `size > threshold`, doubles table capacity and recalculates `(hash & (newCap - 1))` for all entries.
- **Operations**:
  - `put(K, V)`: O(1) average / O(n) worst case
  - `get(K)`: O(1) average / O(n) worst case
  - `remove(K)`: O(1) average / O(n) worst case

---

## 4. CustomTreeMap<K, V>
- **Storage**: Binary Search Tree (BST) using `TreeNode<K,V>` with `key`, `value`, `left`, `right`.
- **Ordering**: Enforces `left < node < right` based on `Comparable<K>`.
- **Node Deletions**:
  1. Leaf Node (0 children) -> remove node reference
  2. Single Child (1 child) -> bypass node with its child
  3. Two Children (2 children) -> replace node key/value with in-order successor (minimum node in right subtree) and delete duplicate successor node.
- **Traversals**: In-order (sorted), Pre-order, Post-order.

---

## 5. CustomPriorityQueue<T>
- **Storage**: Array-backed Binary Min-Heap `Object[] heap`, `int size`.
- **Index Arithmetic**:
  - `parent = (index - 1) / 2`
  - `left = 2 * index + 1`
  - `right = 2 * index + 2`
- **Operations**:
  - `offer(T)`: O(log n) appends to end of array and executes `siftUp()`
  - `peek()`: O(1) inspects root at index 0
  - `poll()`: O(log n) extracts root min element, moves last array element to root, and executes `siftDown()`.
