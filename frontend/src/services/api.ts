import type {
  ArrayListState,
  LinkedListState,
  HashMapState,
  TreeMapState,
  PriorityQueueState,
  OperationResponse,
  BenchmarkResult,
  SourceCodeResponse
} from '../types/collections';

const rawBaseUrl = import.meta.env.VITE_API_BASE_URL || '/api';
const API_BASE_URL = rawBaseUrl.endsWith('/') ? rawBaseUrl.slice(0, -1) : rawBaseUrl;

async function handleResponse<T>(response: Response): Promise<T> {
  const data = await response.json();
  if (!response.ok) {
    const errorMsg = data.errorMessage || data.message || `HTTP ${response.status}: ${response.statusText}`;
    throw new Error(errorMsg);
  }
  return data as T;
}

export const api = {
  // ArrayList APIs
  getArrayListState: async (): Promise<ArrayListState> => {
    const res = await fetch(`${API_BASE_URL}/arraylist`);
    return handleResponse<ArrayListState>(res);
  },
  addArrayList: async (value: string): Promise<OperationResponse<ArrayListState>> => {
    const res = await fetch(`${API_BASE_URL}/arraylist/add`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ value })
    });
    return handleResponse<OperationResponse<ArrayListState>>(res);
  },
  addAtArrayList: async (index: number, value: string): Promise<OperationResponse<ArrayListState>> => {
    const res = await fetch(`${API_BASE_URL}/arraylist/add-at`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ index, value })
    });
    return handleResponse<OperationResponse<ArrayListState>>(res);
  },
  getArrayListItem: async (index: number): Promise<OperationResponse<ArrayListState>> => {
    const res = await fetch(`${API_BASE_URL}/arraylist/${index}`);
    return handleResponse<OperationResponse<ArrayListState>>(res);
  },
  setArrayListItem: async (index: number, value: string): Promise<OperationResponse<ArrayListState>> => {
    const res = await fetch(`${API_BASE_URL}/arraylist/${index}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ value })
    });
    return handleResponse<OperationResponse<ArrayListState>>(res);
  },
  removeArrayListItem: async (index: number): Promise<OperationResponse<ArrayListState>> => {
    const res = await fetch(`${API_BASE_URL}/arraylist/${index}`, { method: 'DELETE' });
    return handleResponse<OperationResponse<ArrayListState>>(res);
  },
  clearArrayList: async (): Promise<OperationResponse<ArrayListState>> => {
    const res = await fetch(`${API_BASE_URL}/arraylist`, { method: 'DELETE' });
    return handleResponse<OperationResponse<ArrayListState>>(res);
  },
  containsArrayList: async (value: string): Promise<OperationResponse<ArrayListState>> => {
    const res = await fetch(`${API_BASE_URL}/arraylist/contains`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ value })
    });
    return handleResponse<OperationResponse<ArrayListState>>(res);
  },
  indexOfArrayList: async (value: string): Promise<OperationResponse<ArrayListState>> => {
    const res = await fetch(`${API_BASE_URL}/arraylist/index-of`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ value })
    });
    return handleResponse<OperationResponse<ArrayListState>>(res);
  },
  removeValueArrayList: async (value: string): Promise<OperationResponse<ArrayListState>> => {
    const res = await fetch(`${API_BASE_URL}/arraylist/remove-value`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ value })
    });
    return handleResponse<OperationResponse<ArrayListState>>(res);
  },

  // LinkedList APIs
  getLinkedListState: async (): Promise<LinkedListState> => {
    const res = await fetch(`${API_BASE_URL}/linkedlist`);
    return handleResponse<LinkedListState>(res);
  },
  addFirstLinkedList: async (value: string): Promise<OperationResponse<LinkedListState>> => {
    const res = await fetch(`${API_BASE_URL}/linkedlist/add-first`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ value })
    });
    return handleResponse<OperationResponse<LinkedListState>>(res);
  },
  addLastLinkedList: async (value: string): Promise<OperationResponse<LinkedListState>> => {
    const res = await fetch(`${API_BASE_URL}/linkedlist/add-last`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ value })
    });
    return handleResponse<OperationResponse<LinkedListState>>(res);
  },
  addAtLinkedList: async (index: number, value: string): Promise<OperationResponse<LinkedListState>> => {
    const res = await fetch(`${API_BASE_URL}/linkedlist/add-at`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ index, value })
    });
    return handleResponse<OperationResponse<LinkedListState>>(res);
  },
  getLinkedListNode: async (index: number): Promise<OperationResponse<LinkedListState>> => {
    const res = await fetch(`${API_BASE_URL}/linkedlist/${index}`);
    return handleResponse<OperationResponse<LinkedListState>>(res);
  },
  setLinkedListNode: async (index: number, value: string): Promise<OperationResponse<LinkedListState>> => {
    const res = await fetch(`${API_BASE_URL}/linkedlist/${index}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ value })
    });
    return handleResponse<OperationResponse<LinkedListState>>(res);
  },
  removeFirstLinkedList: async (): Promise<OperationResponse<LinkedListState>> => {
    const res = await fetch(`${API_BASE_URL}/linkedlist/first`, { method: 'DELETE' });
    return handleResponse<OperationResponse<LinkedListState>>(res);
  },
  removeLastLinkedList: async (): Promise<OperationResponse<LinkedListState>> => {
    const res = await fetch(`${API_BASE_URL}/linkedlist/last`, { method: 'DELETE' });
    return handleResponse<OperationResponse<LinkedListState>>(res);
  },
  removeLinkedListNode: async (index: number): Promise<OperationResponse<LinkedListState>> => {
    const res = await fetch(`${API_BASE_URL}/linkedlist/${index}`, { method: 'DELETE' });
    return handleResponse<OperationResponse<LinkedListState>>(res);
  },
  clearLinkedList: async (): Promise<OperationResponse<LinkedListState>> => {
    const res = await fetch(`${API_BASE_URL}/linkedlist`, { method: 'DELETE' });
    return handleResponse<OperationResponse<LinkedListState>>(res);
  },
  containsLinkedList: async (value: string): Promise<OperationResponse<LinkedListState>> => {
    const res = await fetch(`${API_BASE_URL}/linkedlist/contains`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ value })
    });
    return handleResponse<OperationResponse<LinkedListState>>(res);
  },
  indexOfLinkedList: async (value: string): Promise<OperationResponse<LinkedListState>> => {
    const res = await fetch(`${API_BASE_URL}/linkedlist/index-of`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ value })
    });
    return handleResponse<OperationResponse<LinkedListState>>(res);
  },
  removeValueLinkedList: async (value: string): Promise<OperationResponse<LinkedListState>> => {
    const res = await fetch(`${API_BASE_URL}/linkedlist/remove-value`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ value })
    });
    return handleResponse<OperationResponse<LinkedListState>>(res);
  },

  // HashMap APIs
  getHashMapState: async (): Promise<HashMapState> => {
    const res = await fetch(`${API_BASE_URL}/hashmap/state`);
    return handleResponse<HashMapState>(res);
  },
  putHashMap: async (key: string, value: string): Promise<OperationResponse<HashMapState>> => {
    const res = await fetch(`${API_BASE_URL}/hashmap/put`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ key, value })
    });
    return handleResponse<OperationResponse<HashMapState>>(res);
  },
  getHashMapValue: async (key: string): Promise<OperationResponse<HashMapState>> => {
    const res = await fetch(`${API_BASE_URL}/hashmap/${encodeURIComponent(key)}`);
    return handleResponse<OperationResponse<HashMapState>>(res);
  },
  containsKeyHashMap: async (key: string): Promise<OperationResponse<HashMapState>> => {
    const res = await fetch(`${API_BASE_URL}/hashmap/contains-key`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ key })
    });
    return handleResponse<OperationResponse<HashMapState>>(res);
  },
  containsValueHashMap: async (value: string): Promise<OperationResponse<HashMapState>> => {
    const res = await fetch(`${API_BASE_URL}/hashmap/contains-value`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ value })
    });
    return handleResponse<OperationResponse<HashMapState>>(res);
  },
  removeHashMapKey: async (key: string): Promise<OperationResponse<HashMapState>> => {
    const res = await fetch(`${API_BASE_URL}/hashmap/${encodeURIComponent(key)}`, { method: 'DELETE' });
    return handleResponse<OperationResponse<HashMapState>>(res);
  },
  clearHashMap: async (): Promise<OperationResponse<HashMapState>> => {
    const res = await fetch(`${API_BASE_URL}/hashmap`, { method: 'DELETE' });
    return handleResponse<OperationResponse<HashMapState>>(res);
  },

  // TreeMap APIs
  getTreeMapState: async (): Promise<TreeMapState> => {
    const res = await fetch(`${API_BASE_URL}/treemap/state`);
    return handleResponse<TreeMapState>(res);
  },
  putTreeMap: async (key: string, value: string): Promise<OperationResponse<TreeMapState>> => {
    const res = await fetch(`${API_BASE_URL}/treemap/put`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ key, value })
    });
    return handleResponse<OperationResponse<TreeMapState>>(res);
  },
  getTreeMapValue: async (key: string): Promise<OperationResponse<TreeMapState>> => {
    const res = await fetch(`${API_BASE_URL}/treemap/${encodeURIComponent(key)}`);
    return handleResponse<OperationResponse<TreeMapState>>(res);
  },
  containsKeyTreeMap: async (key: string): Promise<OperationResponse<TreeMapState>> => {
    const res = await fetch(`${API_BASE_URL}/treemap/contains-key`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ key })
    });
    return handleResponse<OperationResponse<TreeMapState>>(res);
  },
  getFirstKeyTreeMap: async (): Promise<OperationResponse<TreeMapState>> => {
    const res = await fetch(`${API_BASE_URL}/treemap/first-key`);
    return handleResponse<OperationResponse<TreeMapState>>(res);
  },
  getLastKeyTreeMap: async (): Promise<OperationResponse<TreeMapState>> => {
    const res = await fetch(`${API_BASE_URL}/treemap/last-key`);
    return handleResponse<OperationResponse<TreeMapState>>(res);
  },
  removeTreeMapKey: async (key: string): Promise<OperationResponse<TreeMapState>> => {
    const res = await fetch(`${API_BASE_URL}/treemap/${encodeURIComponent(key)}`, { method: 'DELETE' });
    return handleResponse<OperationResponse<TreeMapState>>(res);
  },
  getTreeMapTraversal: async (type: 'inorder' | 'preorder' | 'postorder'): Promise<OperationResponse<TreeMapState>> => {
    const res = await fetch(`${API_BASE_URL}/treemap/traversal?type=${type}`);
    return handleResponse<OperationResponse<TreeMapState>>(res);
  },
  clearTreeMap: async (): Promise<OperationResponse<TreeMapState>> => {
    const res = await fetch(`${API_BASE_URL}/treemap`, { method: 'DELETE' });
    return handleResponse<OperationResponse<TreeMapState>>(res);
  },

  // PriorityQueue APIs
  getPriorityQueueState: async (): Promise<PriorityQueueState> => {
    const res = await fetch(`${API_BASE_URL}/priorityqueue/state`);
    return handleResponse<PriorityQueueState>(res);
  },
  offerPriorityQueue: async (value: string): Promise<OperationResponse<PriorityQueueState>> => {
    const res = await fetch(`${API_BASE_URL}/priorityqueue/offer`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ value })
    });
    return handleResponse<OperationResponse<PriorityQueueState>>(res);
  },
  peekPriorityQueue: async (): Promise<OperationResponse<PriorityQueueState>> => {
    const res = await fetch(`${API_BASE_URL}/priorityqueue/peek`);
    return handleResponse<OperationResponse<PriorityQueueState>>(res);
  },
  pollPriorityQueue: async (): Promise<OperationResponse<PriorityQueueState>> => {
    const res = await fetch(`${API_BASE_URL}/priorityqueue/poll`, { method: 'POST' });
    return handleResponse<OperationResponse<PriorityQueueState>>(res);
  },
  clearPriorityQueue: async (): Promise<OperationResponse<PriorityQueueState>> => {
    const res = await fetch(`${API_BASE_URL}/priorityqueue`, { method: 'DELETE' });
    return handleResponse<OperationResponse<PriorityQueueState>>(res);
  },

  // Code Viewer & Benchmark APIs
  getSourceCode: async (collectionName: string): Promise<SourceCodeResponse> => {
    const res = await fetch(`${API_BASE_URL}/code/${collectionName}`);
    return handleResponse<SourceCodeResponse>(res);
  },
  runBenchmark: async (structure: string, operation: string, elementCount: number): Promise<BenchmarkResult> => {
    const res = await fetch(`${API_BASE_URL}/benchmark/run`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ structure, operation, elementCount })
    });
    return handleResponse<BenchmarkResult>(res);
  }
};
