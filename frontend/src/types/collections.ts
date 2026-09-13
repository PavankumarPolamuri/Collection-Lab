export type CollectionType =
  | 'ARRAY_LIST'
  | 'LINKED_LIST'
  | 'HASH_MAP'
  | 'TREE_MAP'
  | 'PRIORITY_QUEUE'
  | 'STACK'
  | 'QUEUE'
  | 'DEQUE'
  | 'HASH_SET'
  | 'BST'
  | 'HEAP'
  | 'TRIE'
  | 'GRAPH'
  | 'DISJOINT_SET'
  | 'CIRCULAR_LINKED_LIST';

// 1. ArrayList
export interface ArrayListState {
  elements: (string | number | null)[];
  size: number;
  capacity: number;
}

// 2. LinkedList
export interface LinkedListNode {
  index: number;
  data: string | number;
  hasPrev: boolean;
  hasNext: boolean;
}

export interface LinkedListState {
  nodes: LinkedListNode[];
  size: number;
  headData: string | number | null;
  tailData: string | number | null;
}

// 3. HashMap
export interface HashMapEntry {
  key: string;
  value: string;
  hash: number;
}

export interface HashMapBucket {
  index: number;
  entries: HashMapEntry[];
}

export interface HashMapState {
  buckets: HashMapBucket[];
  size: number;
  capacity: number;
  loadFactor: number;
  threshold: number;
}

// 4. TreeMap
export interface TreeNodeDto {
  key: string;
  value: string;
  left: TreeNodeDto | null;
  right: TreeNodeDto | null;
}

export interface TreeMapState {
  root: TreeNodeDto | null;
  size: number;
  firstKey: string | null;
  lastKey: string | null;
  inorderTraversal: string[];
}

// 5. PriorityQueue
export interface PriorityQueueState {
  heapArray: (string | number)[];
  size: number;
  capacity: number;
  minRoot: string | number | null;
}

// 6. Stack
export interface StackState {
  elements: (string | number)[];
  size: number;
  topValue: string | number | null;
  isEmpty: boolean;
}

// 7. Queue
export interface QueueState {
  elements: (string | number)[];
  size: number;
  frontValue: string | number | null;
  rearValue: string | number | null;
  isEmpty: boolean;
}

// 8. Deque
export interface DequeState {
  elements: (string | number)[];
  size: number;
  firstValue: string | number | null;
  lastValue: string | number | null;
  isEmpty: boolean;
}

// 9. HashSet
export interface HashSetBucket {
  index: number;
  elements: (string | number)[];
}

export interface HashSetState {
  buckets: HashSetBucket[];
  size: number;
  capacity: number;
}

// 10. BST
export interface BSTNodeDto {
  key: string | number;
  left: BSTNodeDto | null;
  right: BSTNodeDto | null;
}

export interface BSTState {
  root: BSTNodeDto | null;
  size: number;
  lastTraversal: (string | number)[];
}

// 11. Heap
export interface HeapState {
  heapArray: (string | number)[];
  size: number;
  minRoot: string | number | null;
}

// 12. Trie
export interface TrieNodeDto {
  ch: string;
  isEndOfWord: boolean;
  children: Record<string, TrieNodeDto>;
}

export interface TrieState {
  root: TrieNodeDto | null;
  wordCount: number;
}

// 13. Graph
export interface GraphState {
  vertices: string[];
  adjacencyList: Record<string, string[]>;
  vertexCount: number;
  edgeCount: number;
  lastTraversal?: string[];
}

// 14. Disjoint Set
export interface DisjointSetNode {
  element: string;
  parent: string;
  rank: number;
}

export interface DisjointSetState {
  nodes: DisjointSetNode[];
  elementCount: number;
  setCount: number;
}

// 15. Circular LinkedList
export interface CircularLinkedListNode {
  index: number;
  data: string | number;
  isHead: boolean;
  isTail: boolean;
  nextIndex: number;
}

export interface CircularLinkedListState {
  nodes: CircularLinkedListNode[];
  size: number;
  headData: string | number | null;
  tailData: string | number | null;
}

export interface OperationResponse<T = any> {
  structure: CollectionType;
  operation: string;
  success: boolean;
  input: any;
  complexity: string;
  steps: string[];
  previousState: T;
  newState: T;
  internalDetails?: Record<string, any>;
  errorMessage?: string;
}

export interface OperationHistoryItem {
  id: string;
  timestamp: string;
  structure: CollectionType;
  operation: string;
  success: boolean;
  complexity: string;
  input: string;
  steps: string[];
  errorMessage?: string;
}

export interface BenchmarkResult {
  structure: string;
  operation: string;
  elementCount: number;
  customTimeMs: number;
  jdkTimeMs: number;
  disclaimer: string;
}

export interface SourceCodeResponse {
  collection: string;
  className: string;
  code: string;
}
