# CollectionLab — Custom Java Collections Visualizer

A full-stack, developer-tool style web application that implements core Java collection data structures strictly from scratch — without relying on standard `java.util` collections — and provides real-time step-by-step internal state visualizers, algorithm execution tracing, performance benchmarking, source code viewing, and interactive learning modes.

---

## Resume Description

> **CollectionLab — Custom Java Collections Visualizer | Java, Spring Boot, React, TypeScript, JUnit 5**
>
> Developed a full-stack interactive platform implementing ArrayList, LinkedList, HashMap, TreeMap, and PriorityQueue from scratch without relying on Java collection implementations. Built REST APIs with Spring Boot and an interactive React/TypeScript interface to visualize dynamic resizing, linked-node manipulation, hash collision handling, rehashing, BST operations, and binary-heap algorithms. Added Big-O analysis, step-by-step operation visualization, source-code viewing, operation history, and comprehensive JUnit 5 testing.

---

## 🚀 Key Features

1. **Scratch Java Data Structures (No `java.util`)**:
   - `CustomArrayList<T>`: Primitive `Object[]` dynamic array with capacity expansion (2x) and element shifting.
   - `CustomLinkedList<T>`: Doubly-linked `Node<T>` memory chain maintaining `head`, `tail`, and bi-directional pointers.
   - `CustomHashMap<K,V>`: Bucket array with separate chaining linked list entry nodes, hash calculation, load factor tracking (0.75), dynamic bucket array resizing, and entry rehashing.
   - `CustomTreeMap<K,V>`: Binary Search Tree (BST) supporting leaf/1-child/2-child node deletions, min/max keys, in-order/pre-order/post-order traversals, and comparison path step tracking.
   - `CustomPriorityQueue<T>`: Array-backed Binary Min-Heap with index arithmetic (`parent`, `left`, `right`), `siftUp`, and `siftDown` algorithm steps.

2. **Real-Time Step-by-Step Algorithm Tracing**:
   - Captures every operation's algorithmic decisions (`Hash calculation`, `Bucket index`, `Collision detected`, `Sift-up parent swap`, `BST comparison path`).

3. **Live Source Code Viewer**:
   - Modal and tabs that read the actual Java backend source code directly from `Custom{Collection}.java` files.

4. **JVM Performance Benchmarking**:
   - Live timing tests (`System.nanoTime()`) measuring custom scratch collections against standard JDK reference collections on 10,000, 50,000, and 100,000 element datasets.

5. **Interactive Learning Mode**:
   - Step-by-step visual walkthrough guides explaining HashMap separate chaining, ArrayList resizing, TreeMap BST rules, and PriorityQueue min-heap sifting.

---

## 🛠️ Technology Stack

- **Backend**: Java 17+, Spring Boot 3.2.3, Spring Web, JUnit 5, SLF4J, Bean Validation, Maven 3.9
- **Frontend**: React 18, TypeScript 5, Vite 5, Tailwind CSS 4, Lucide React Icons
- **Testing**: 36 comprehensive JUnit 5 unit tests (100% pass rate)

---

## 📁 Project Structure

```
CollectionLab/
├── backend/
│   ├── pom.xml
│   └── src/
│       ├── main/java/com/collectionlab/
│       │   ├── CollectionLabApplication.java
│       │   ├── collections/
│       │   │   ├── CustomArrayList.java
│       │   │   ├── CustomLinkedList.java
│       │   │   ├── CustomHashMap.java
│       │   │   ├── CustomTreeMap.java
│       │   │   └── CustomPriorityQueue.java
│       │   ├── controller/ (ArrayList, LinkedList, HashMap, TreeMap, PriorityQueue, CodeViewer, Benchmark)
│       │   ├── dto/ (OperationResponse, OperationRequest, ArrayListStateDto, HashMapStateDto, etc.)
│       │   ├── service/ (CollectionService manager)
│       │   ├── exception/ (GlobalExceptionHandler)
│       │   └── util/ (SourceCodeReader)
│       └── test/java/com/collectionlab/
│           ├── CustomArrayListTest.java
│           ├── CustomLinkedListTest.java
│           ├── CustomHashMapTest.java
│           ├── CustomTreeMapTest.java
│           └── CustomPriorityQueueTest.java
├── frontend/
│   ├── package.json
│   ├── vite.config.ts
│   └── src/
│       ├── components/ (Visualizers, ControlPanels, StepsPanel, HistoryPanel, CodeModal)
│       ├── pages/ (LandingPage, Dashboard, CollectionView, ComplexityPage, LearningPage, BenchmarkPage, ArchitecturePage, AboutPage)
│       ├── services/ (api.ts)
│       ├── types/ (collections.ts)
│       ├── App.tsx
│       └── main.tsx
├── docs/ (architecture.md, data-structures.md, complexity.md, api.md, testing.md)
└── README.md
```

---

## 📊 Big-O Complexity Matrix

| Operation | CustomArrayList | CustomLinkedList | CustomHashMap | CustomTreeMap | CustomPriorityQueue |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Access (Get)** | O(1) | O(n) | N/A | N/A | O(1) (peek) |
| **Search (Contains)** | O(n) | O(n) | O(1) average | O(log n) average | O(n) |
| **Insert (Prepend)** | O(n) | O(1) | N/A | N/A | N/A |
| **Insert (Append)** | O(1) amortized | O(1) | O(1) average | O(log n) average | O(log n) offer |
| **Delete** | O(n) | O(1) node | O(1) average | O(log n) average | O(log n) poll |
| **Space** | O(n) | O(n) | O(n) | O(n) | O(n) |

---

## ⏱️ 5–10 Minute Interview Demo Flow

Use this script during a technical interview demo:

1. **Dashboard Overview (30s)**: Open Dashboard, explain project goal: implementing five Java collection data structures from scratch without `java.util`.
2. **ArrayList Visualizer (1m)**: Add elements until capacity (8) is reached. Show dynamic resizing banner (`8 -> 16`), explain element copying and O(1) amortized time.
3. **HashMap Visualizer (2m)**: Insert key-value pairs (`Java: 90`, `Spring: 85`). Point out hash calculation, bucket index formula, separate chaining linked nodes, and load-factor threshold rehashing.
4. **TreeMap Visualizer (2m)**: Insert numerical keys (`50`, `30`, `70`, `20`, `40`, `60`, `80`). Highlight BST comparison path (`65 > 50 -> go right`). Run In-order traversal to show strictly sorted output (`20 -> 30 -> 40 -> 50 -> 60 -> 70 -> 80`). Delete node `50` to demonstrate two-children deletion using in-order successor `60`.
5. **PriorityQueue Visualizer (1.5m)**: Offer values (`30`, `10`, `20`, `5`). Show sift-up path restoring min-root (`5`). Execute poll to demonstrate sift-down algorithm.
6. **Live Source Code Viewer & Unit Tests (1m)**: Click "View Source Code" to display real Java source code (`CustomHashMap.java`). Mention 36 passing JUnit 5 tests.

---

## 💻 How to Run Locally

### Prerequisites
- Java 17+ JDK installed
- Apache Maven (or Maven wrapper)
- Node.js v18+ & npm

### 1. Run Spring Boot Backend
```bash
cd backend
mvn spring-boot:run
```
The backend server will start on `http://localhost:8080`.

### 2. Run React Frontend
```bash
cd frontend
npm install
npm run dev
```
Open your browser at `http://localhost:5173`.

### 3. Run JUnit 5 Backend Unit Tests
```bash
cd backend
mvn test
```

---

## ⚠️ Important JDK Comparison Disclaimer
- `CustomArrayList`: Dynamic array educational implementation.
- `CustomLinkedList`: Doubly linked list educational implementation.
- `CustomHashMap`: Hash table with separate chaining.
- `CustomTreeMap`: Basic Binary Search Tree (BST) implementation. *(Standard JDK `java.util.TreeMap` uses a self-balancing Red-Black Tree)*.
- `CustomPriorityQueue`: Binary min-heap array implementation.
