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

const rawBaseUrl = (import.meta.env.VITE_API_BASE_URL || '/api').trim();
let cleanBase = rawBaseUrl.endsWith('/') ? rawBaseUrl.slice(0, -1) : rawBaseUrl;
if (cleanBase.startsWith('http') && !cleanBase.endsWith('/api')) {
  cleanBase += '/api';
}
const API_BASE_URL = cleanBase;

async function safeFetch(input: RequestInfo | URL, init?: RequestInit): Promise<Response> {
  try {
    return await fetch(input, init);
  } catch (err: any) {
    if (err.name === 'TypeError' || err.message?.includes('fetch') || err.message?.includes('NetworkError')) {
      throw new Error('Backend server is unreachable. Please ensure the Spring Boot backend is running on port 8080.');
    }
    throw err;
  }
}

async function handleResponse<T>(response: Response): Promise<T> {
  // 1. Handle HTTP 204 No Content
  if (response.status === 204) {
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }
    return {} as T;
  }

  // 2. Read body as text first to safely inspect content before parsing
  const text = await response.text();
  const trimmedText = text ? text.trim() : '';

  // 3. Handle empty body
  if (!trimmedText) {
    if (!response.ok) {
      throw new Error(`Server error (HTTP ${response.status}: ${response.statusText})`);
    }
    return {} as T;
  }

  // 4. Inspect Content-Type & JSON structure
  const contentType = response.headers.get('content-type') || '';
  const isJsonContentType = contentType.includes('application/json');
  const looksLikeJson = (trimmedText.startsWith('{') && trimmedText.endsWith('}')) ||
                        (trimmedText.startsWith('[') && trimmedText.endsWith(']'));

  let data: any = null;
  if (isJsonContentType || looksLikeJson) {
    try {
      data = JSON.parse(trimmedText);
    } catch (parseError) {
      if (!response.ok) {
        throw new Error(`Server returned error status ${response.status}: ${response.statusText}`);
      }
      throw new Error(`Invalid JSON response received from server (HTTP ${response.status})`);
    }
  } else {
    // Non-JSON response (e.g. HTML proxy error / 504 Gateway Timeout when backend is offline)
    if (!response.ok) {
      if (response.status === 504 || response.status === 502) {
        throw new Error(`Backend server is unavailable (HTTP ${response.status}). Please ensure Spring Boot is running on port 8080.`);
      }
      throw new Error(`Server error (HTTP ${response.status}: ${response.statusText})`);
    }
    return trimmedText as unknown as T;
  }

  // 5. Verify HTTP ok status with parsed JSON error data if any
  if (!response.ok) {
    const errorMsg = data?.errorMessage || data?.message || data?.error || `HTTP ${response.status}: ${response.statusText}`;
    throw new Error(errorMsg);
  }

  return data as T;
}

export const api = {
  // ArrayList APIs
  getArrayListState: async (): Promise<ArrayListState> => {
    const res = await safeFetch(`${API_BASE_URL}/arraylist`);
    return handleResponse<ArrayListState>(res);
  },
  addArrayList: async (value: string): Promise<OperationResponse<ArrayListState>> => {
    const res = await safeFetch(`${API_BASE_URL}/arraylist/add`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ value })
    });
    return handleResponse<OperationResponse<ArrayListState>>(res);
  },
  addAtArrayList: async (index: number, value: string): Promise<OperationResponse<ArrayListState>> => {
    const res = await safeFetch(`${API_BASE_URL}/arraylist/add-at`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ index, value })
    });
    return handleResponse<OperationResponse<ArrayListState>>(res);
  },
  getArrayListItem: async (index: number): Promise<OperationResponse<ArrayListState>> => {
    const res = await safeFetch(`${API_BASE_URL}/arraylist/${index}`);
    return handleResponse<OperationResponse<ArrayListState>>(res);
  },
  setArrayListItem: async (index: number, value: string): Promise<OperationResponse<ArrayListState>> => {
    const res = await safeFetch(`${API_BASE_URL}/arraylist/${index}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ value })
    });
    return handleResponse<OperationResponse<ArrayListState>>(res);
  },
  removeArrayListItem: async (index: number): Promise<OperationResponse<ArrayListState>> => {
    const res = await safeFetch(`${API_BASE_URL}/arraylist/${index}`, { method: 'DELETE' });
    return handleResponse<OperationResponse<ArrayListState>>(res);
  },
  clearArrayList: async (): Promise<OperationResponse<ArrayListState>> => {
    const res = await safeFetch(`${API_BASE_URL}/arraylist`, { method: 'DELETE' });
    return handleResponse<OperationResponse<ArrayListState>>(res);
  },
  containsArrayList: async (value: string): Promise<OperationResponse<ArrayListState>> => {
    const res = await safeFetch(`${API_BASE_URL}/arraylist/contains`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ value })
    });
    return handleResponse<OperationResponse<ArrayListState>>(res);
  },
  indexOfArrayList: async (value: string): Promise<OperationResponse<ArrayListState>> => {
    const res = await safeFetch(`${API_BASE_URL}/arraylist/index-of`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ value })
    });
    return handleResponse<OperationResponse<ArrayListState>>(res);
  },
  removeValueArrayList: async (value: string): Promise<OperationResponse<ArrayListState>> => {
    const res = await safeFetch(`${API_BASE_URL}/arraylist/remove-value`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ value })
    });
    return handleResponse<OperationResponse<ArrayListState>>(res);
  },

  // LinkedList APIs
  getLinkedListState: async (): Promise<LinkedListState> => {
    const res = await safeFetch(`${API_BASE_URL}/linkedlist`);
    return handleResponse<LinkedListState>(res);
  },
  addFirstLinkedList: async (value: string): Promise<OperationResponse<LinkedListState>> => {
    const res = await safeFetch(`${API_BASE_URL}/linkedlist/add-first`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ value })
    });
    return handleResponse<OperationResponse<LinkedListState>>(res);
  },
  addLastLinkedList: async (value: string): Promise<OperationResponse<LinkedListState>> => {
    const res = await safeFetch(`${API_BASE_URL}/linkedlist/add-last`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ value })
    });
    return handleResponse<OperationResponse<LinkedListState>>(res);
  },
  addAtLinkedList: async (index: number, value: string): Promise<OperationResponse<LinkedListState>> => {
    const res = await safeFetch(`${API_BASE_URL}/linkedlist/add-at`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ index, value })
    });
    return handleResponse<OperationResponse<LinkedListState>>(res);
  },
  getLinkedListNode: async (index: number): Promise<OperationResponse<LinkedListState>> => {
    const res = await safeFetch(`${API_BASE_URL}/linkedlist/${index}`);
    return handleResponse<OperationResponse<LinkedListState>>(res);
  },
  setLinkedListNode: async (index: number, value: string): Promise<OperationResponse<LinkedListState>> => {
    const res = await safeFetch(`${API_BASE_URL}/linkedlist/${index}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ value })
    });
    return handleResponse<OperationResponse<LinkedListState>>(res);
  },
  removeFirstLinkedList: async (): Promise<OperationResponse<LinkedListState>> => {
    const res = await safeFetch(`${API_BASE_URL}/linkedlist/first`, { method: 'DELETE' });
    return handleResponse<OperationResponse<LinkedListState>>(res);
  },
  removeLastLinkedList: async (): Promise<OperationResponse<LinkedListState>> => {
    const res = await safeFetch(`${API_BASE_URL}/linkedlist/last`, { method: 'DELETE' });
    return handleResponse<OperationResponse<LinkedListState>>(res);
  },
  removeLinkedListNode: async (index: number): Promise<OperationResponse<LinkedListState>> => {
    const res = await safeFetch(`${API_BASE_URL}/linkedlist/${index}`, { method: 'DELETE' });
    return handleResponse<OperationResponse<LinkedListState>>(res);
  },
  clearLinkedList: async (): Promise<OperationResponse<LinkedListState>> => {
    const res = await safeFetch(`${API_BASE_URL}/linkedlist`, { method: 'DELETE' });
    return handleResponse<OperationResponse<LinkedListState>>(res);
  },
  containsLinkedList: async (value: string): Promise<OperationResponse<LinkedListState>> => {
    const res = await safeFetch(`${API_BASE_URL}/linkedlist/contains`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ value })
    });
    return handleResponse<OperationResponse<LinkedListState>>(res);
  },
  indexOfLinkedList: async (value: string): Promise<OperationResponse<LinkedListState>> => {
    const res = await safeFetch(`${API_BASE_URL}/linkedlist/index-of`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ value })
    });
    return handleResponse<OperationResponse<LinkedListState>>(res);
  },
  removeValueLinkedList: async (value: string): Promise<OperationResponse<LinkedListState>> => {
    const res = await safeFetch(`${API_BASE_URL}/linkedlist/remove-value`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ value })
    });
    return handleResponse<OperationResponse<LinkedListState>>(res);
  },

  // HashMap APIs
  getHashMapState: async (): Promise<HashMapState> => {
    const res = await safeFetch(`${API_BASE_URL}/hashmap/state`);
    return handleResponse<HashMapState>(res);
  },
  putHashMap: async (key: string, value: string): Promise<OperationResponse<HashMapState>> => {
    const res = await safeFetch(`${API_BASE_URL}/hashmap/put`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ key, value })
    });
    return handleResponse<OperationResponse<HashMapState>>(res);
  },
  getHashMapValue: async (key: string): Promise<OperationResponse<HashMapState>> => {
    const res = await safeFetch(`${API_BASE_URL}/hashmap/${encodeURIComponent(key)}`);
    return handleResponse<OperationResponse<HashMapState>>(res);
  },
  containsKeyHashMap: async (key: string): Promise<OperationResponse<HashMapState>> => {
    const res = await safeFetch(`${API_BASE_URL}/hashmap/contains-key`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ key })
    });
    return handleResponse<OperationResponse<HashMapState>>(res);
  },
  containsValueHashMap: async (value: string): Promise<OperationResponse<HashMapState>> => {
    const res = await safeFetch(`${API_BASE_URL}/hashmap/contains-value`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ value })
    });
    return handleResponse<OperationResponse<HashMapState>>(res);
  },
  removeHashMapKey: async (key: string): Promise<OperationResponse<HashMapState>> => {
    const res = await safeFetch(`${API_BASE_URL}/hashmap/${encodeURIComponent(key)}`, { method: 'DELETE' });
    return handleResponse<OperationResponse<HashMapState>>(res);
  },
  clearHashMap: async (): Promise<OperationResponse<HashMapState>> => {
    const res = await safeFetch(`${API_BASE_URL}/hashmap`, { method: 'DELETE' });
    return handleResponse<OperationResponse<HashMapState>>(res);
  },

  // TreeMap APIs
  getTreeMapState: async (): Promise<TreeMapState> => {
    const res = await safeFetch(`${API_BASE_URL}/treemap/state`);
    return handleResponse<TreeMapState>(res);
  },
  putTreeMap: async (key: string, value: string): Promise<OperationResponse<TreeMapState>> => {
    const res = await safeFetch(`${API_BASE_URL}/treemap/put`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ key, value })
    });
    return handleResponse<OperationResponse<TreeMapState>>(res);
  },
  getTreeMapValue: async (key: string): Promise<OperationResponse<TreeMapState>> => {
    const res = await safeFetch(`${API_BASE_URL}/treemap/${encodeURIComponent(key)}`);
    return handleResponse<OperationResponse<TreeMapState>>(res);
  },
  containsKeyTreeMap: async (key: string): Promise<OperationResponse<TreeMapState>> => {
    const res = await safeFetch(`${API_BASE_URL}/treemap/contains-key`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ key })
    });
    return handleResponse<OperationResponse<TreeMapState>>(res);
  },
  getFirstKeyTreeMap: async (): Promise<OperationResponse<TreeMapState>> => {
    const res = await safeFetch(`${API_BASE_URL}/treemap/first-key`);
    return handleResponse<OperationResponse<TreeMapState>>(res);
  },
  getLastKeyTreeMap: async (): Promise<OperationResponse<TreeMapState>> => {
    const res = await safeFetch(`${API_BASE_URL}/treemap/last-key`);
    return handleResponse<OperationResponse<TreeMapState>>(res);
  },
  removeTreeMapKey: async (key: string): Promise<OperationResponse<TreeMapState>> => {
    const res = await safeFetch(`${API_BASE_URL}/treemap/${encodeURIComponent(key)}`, { method: 'DELETE' });
    return handleResponse<OperationResponse<TreeMapState>>(res);
  },
  getTreeMapTraversal: async (type: 'inorder' | 'preorder' | 'postorder'): Promise<OperationResponse<TreeMapState>> => {
    const res = await safeFetch(`${API_BASE_URL}/treemap/traversal?type=${type}`);
    return handleResponse<OperationResponse<TreeMapState>>(res);
  },
  clearTreeMap: async (): Promise<OperationResponse<TreeMapState>> => {
    const res = await safeFetch(`${API_BASE_URL}/treemap`, { method: 'DELETE' });
    return handleResponse<OperationResponse<TreeMapState>>(res);
  },

  // PriorityQueue APIs
  getPriorityQueueState: async (): Promise<PriorityQueueState> => {
    const res = await safeFetch(`${API_BASE_URL}/priorityqueue/state`);
    return handleResponse<PriorityQueueState>(res);
  },
  offerPriorityQueue: async (value: string): Promise<OperationResponse<PriorityQueueState>> => {
    const res = await safeFetch(`${API_BASE_URL}/priorityqueue/offer`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ value })
    });
    return handleResponse<OperationResponse<PriorityQueueState>>(res);
  },
  peekPriorityQueue: async (): Promise<OperationResponse<PriorityQueueState>> => {
    const res = await safeFetch(`${API_BASE_URL}/priorityqueue/peek`);
    return handleResponse<OperationResponse<PriorityQueueState>>(res);
  },
  pollPriorityQueue: async (): Promise<OperationResponse<PriorityQueueState>> => {
    const res = await safeFetch(`${API_BASE_URL}/priorityqueue/poll`, { method: 'POST' });
    return handleResponse<OperationResponse<PriorityQueueState>>(res);
  },
  clearPriorityQueue: async (): Promise<OperationResponse<PriorityQueueState>> => {
    const res = await safeFetch(`${API_BASE_URL}/priorityqueue`, { method: 'DELETE' });
    return handleResponse<OperationResponse<PriorityQueueState>>(res);
  },

  // Code Viewer & Benchmark APIs
  getSourceCode: async (collectionName: string): Promise<SourceCodeResponse> => {
    const res = await safeFetch(`${API_BASE_URL}/code/${collectionName}`);
    return handleResponse<SourceCodeResponse>(res);
  },
  runBenchmark: async (structure: string, operation: string, elementCount: number): Promise<BenchmarkResult> => {
    const res = await safeFetch(`${API_BASE_URL}/benchmark/run`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ structure, operation, elementCount })
    });
    return handleResponse<BenchmarkResult>(res);
  }
};
