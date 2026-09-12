# REST API Documentation

Base URL: `http://localhost:8080/api`

---

## 1. ArrayList Endpoints (`/api/arraylist`)
- `GET /api/arraylist`: Fetch current ArrayList state.
- `POST /api/arraylist/add`: Append element `{ "value": "10" }`.
- `POST /api/arraylist/add-at`: Insert at index `{ "index": 0, "value": "10" }`.
- `GET /api/arraylist/{index}`: Get element at index.
- `PUT /api/arraylist/{index}`: Update element at index `{ "value": "20" }`.
- `DELETE /api/arraylist/{index}`: Remove element at index.
- `DELETE /api/arraylist`: Clear ArrayList.

---

## 2. LinkedList Endpoints (`/api/linkedlist`)
- `GET /api/linkedlist`: Fetch current LinkedList state.
- `POST /api/linkedlist/add-first`: Insert HEAD node `{ "value": "A" }`.
- `POST /api/linkedlist/add-last`: Insert TAIL node `{ "value": "Z" }`.
- `POST /api/linkedlist/add-at`: Insert node at index `{ "index": 1, "value": "B" }`.
- `GET /api/linkedlist/{index}`: Access node at index.
- `PUT /api/linkedlist/{index}`: Update node at index.
- `DELETE /api/linkedlist/first`: Remove HEAD node.
- `DELETE /api/linkedlist/last`: Remove TAIL node.
- `DELETE /api/linkedlist/{index}`: Remove node at index.
- `DELETE /api/linkedlist`: Clear LinkedList.

---

## 3. HashMap Endpoints (`/api/hashmap`)
- `GET /api/hashmap/state`: Fetch current HashMap bucket state.
- `POST /api/hashmap/put`: Insert or update entry `{ "key": "Java", "value": "95" }`.
- `GET /api/hashmap/{key}`: Fetch value for key.
- `DELETE /api/hashmap/{key}`: Remove entry for key.
- `DELETE /api/hashmap`: Clear HashMap.

---

## 4. TreeMap Endpoints (`/api/treemap`)
- `GET /api/treemap/state`: Fetch current BST state.
- `POST /api/treemap/put`: Insert or update BST node `{ "key": "50", "value": "Root" }`.
- `GET /api/treemap/{key}`: Fetch value for key.
- `DELETE /api/treemap/{key}`: Remove BST node for key (supports 0, 1, 2 children cases).
- `GET /api/treemap/traversal?type=inorder|preorder|postorder`: Run tree traversal.
- `DELETE /api/treemap`: Clear TreeMap.

---

## 5. PriorityQueue Endpoints (`/api/priorityqueue`)
- `GET /api/priorityqueue/state`: Fetch current Min-Heap state.
- `POST /api/priorityqueue/offer`: Insert element & sift up `{ "value": "10" }`.
- `GET /api/priorityqueue/peek`: Read min root element.
- `POST /api/priorityqueue/poll`: Extract min root element & sift down.
- `DELETE /api/priorityqueue`: Clear PriorityQueue.

---

## Standard Operation Response Format
```json
{
  "structure": "HASH_MAP",
  "operation": "PUT",
  "success": true,
  "input": { "key": "Java", "value": "95" },
  "complexity": "O(1) average",
  "steps": [
    "Request to PUT key 'Java', value '95'",
    "Calculated hash code: 2301546",
    "Calculated bucket index: 2",
    "Inserted new Entry into bucket [2]."
  ],
  "previousState": { ... },
  "newState": { ... },
  "internalDetails": {
    "hash": 2301546,
    "bucketIndex": 2,
    "isCollision": false
  },
  "errorMessage": null
}
```
