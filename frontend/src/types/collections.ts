export type CollectionType = 'ARRAY_LIST' | 'LINKED_LIST' | 'HASH_MAP' | 'TREE_MAP' | 'PRIORITY_QUEUE';

export interface ArrayListState {
  elements: (string | number | null)[];
  size: number;
  capacity: number;
}

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

export interface PriorityQueueState {
  heapArray: (string | number)[];
  size: number;
  capacity: number;
  minRoot: string | number | null;
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
