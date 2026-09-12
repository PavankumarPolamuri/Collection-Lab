# CollectionLab Architecture Documentation

## System Overview

CollectionLab is structured as a full-stack developer laboratory featuring a Spring Boot REST backend and a React + TypeScript frontend.

```
React / TypeScript UI
       │
       ▼ (REST API / JSON)
Spring Boot Controllers
       │
       ▼
Collection Service Manager
       │
       ▼
Scratch Data Structure Implementations (Java 17)
       │
       ▼
Operation Response & State Tracing DTOs
```

## Layer Responsibilities

### 1. Backend Layer (`com.collectionlab`)
- **`collections/`**: Scratch implementations of `CustomArrayList`, `CustomLinkedList`, `CustomHashMap`, `CustomTreeMap`, `CustomPriorityQueue`. Does NOT import or wrap any `java.util` collection implementations.
- **`controller/`**: Spring REST endpoints exposing operations and state queries.
- **`service/`**: Maintains in-memory active collection instances and converts raw nodes into `StateDto` JSON representations.
- **`dto/`**: Standard `OperationResponse<S>` payload returning execution steps, Big-O annotations, previous/new state snapshots, and internal metrics.
- **`exception/`**: `@ControllerAdvice` global exception handling returning sanitized JSON error messages.
- **`util/`**: `SourceCodeReader` loading backend `.java` files for the live code viewer.

### 2. Frontend Layer (`frontend/src`)
- **`visualizers/`**: Dedicated interactive visualization components for each data structure.
- **`panels/`**: Operation control forms, algorithm execution trace panels, and real session history logs.
- **`pages/`**: Landing, Dashboard, Collection Workbench, Complexity Matrix, Interactive Learning Guides, JVM Benchmark Runner, Architecture, and About pages.
- **`services/`**: Typed async API client communicating with backend endpoints.

---

## Technical Stack
- **Language**: Java 17+, TypeScript 5
- **Framework**: Spring Boot 3.2.3, React 18, Vite 5, Tailwind CSS 4
- **Testing**: JUnit 5, Mockito
- **Build Tools**: Apache Maven 3.9, Node.js v24, npm 11
