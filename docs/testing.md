# Testing Strategy & Verification Report

CollectionLab includes a comprehensive JUnit 5 test suite verifying correctness, boundary conditions, edge cases, exceptions, resizing, collisions, deletions, and heap ordering across all custom collection data structures.

---

## Backend Test Suites (`src/test/java/com/collectionlab/`)

### 1. `CustomArrayListTest` (9 Tests)
- Initial empty capacity state
- Append & dynamic resizing from initial capacity to 2x capacity
- Insert at middle index with element right-shifting
- Element set & get index operations
- Element removal with left-shifting
- Linear `contains()` search
- `clear()` state reset
- Iterator traversal validation
- IndexOutOfBoundsException handling

### 2. `CustomLinkedListTest` (7 Tests)
- Empty doubly linked list state
- `addFirst()` and `addLast()` node linking
- Middle index insertion
- Head, tail, and middle node removals
- `contains()` search & iterator walk
- `clear()` reset of HEAD/TAIL references
- NoSuchElementException & IndexOutOfBoundsException validation

### 3. `CustomHashMapTest` (7 Tests)
- Initial capacity & load factor setup
- Key-value insertion & retrieval
- Value updates on duplicate key insertion
- Controlled separate chaining collision handling
- Dynamic capacity expansion & entry rehashing when threshold exceeded
- Key-value pair removal
- `clear()` reset

### 4. `CustomTreeMapTest` (7 Tests)
- Initial empty BST state
- BST ordering validation & min/max key retrieval
- Strictly sorted In-order, Pre-order, and Post-order tree traversals
- Leaf node deletion (0 children)
- Single child node deletion (1 child)
- Two children node deletion using in-order successor replacement
- `clear()` BST root reset

### 5. `CustomPriorityQueueTest` (6 Tests)
- Initial empty min-heap state
- `offer()` sift-up algorithm validation (root is minimum element)
- `poll()` sift-down algorithm returning elements in strictly ascending priority order
- Heap array auto-resizing
- Duplicate element handling
- `clear()` heap array reset

---

## Running Unit Tests

```bash
cd backend
mvn test
```

All 36 unit tests execute cleanly in under 1 second.
