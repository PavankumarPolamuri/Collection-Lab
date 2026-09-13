import type {
  ArrayListState,
  LinkedListState,
  HashMapState,
  TreeMapState,
  PriorityQueueState,
  StackState,
  QueueState,
  DequeState,
  HashSetState,
  BSTState,
  HeapState,
  TrieState,
  GraphState,
  DisjointSetState,
  CircularLinkedListState,
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
  if (response.status === 204) {
    if (!response.ok) throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    return {} as T;
  }

  const text = await response.text();
  const trimmedText = text ? text.trim() : '';

  if (!trimmedText) {
    if (!response.ok) throw new Error(`Server error (HTTP ${response.status}: ${response.statusText})`);
    return {} as T;
  }

  const contentType = response.headers.get('content-type') || '';
  const isJsonContentType = contentType.includes('application/json');
  const looksLikeJson = (trimmedText.startsWith('{') && trimmedText.endsWith('}')) ||
                        (trimmedText.startsWith('[') && trimmedText.endsWith(']'));

  let data: any = null;
  if (isJsonContentType || looksLikeJson) {
    try {
      data = JSON.parse(trimmedText);
    } catch (parseError) {
      if (!response.ok) throw new Error(`Server returned error status ${response.status}: ${response.statusText}`);
      throw new Error(`Invalid JSON response received from server (HTTP ${response.status})`);
    }
  } else {
    if (!response.ok) {
      if (response.status === 504 || response.status === 502) {
        throw new Error(`Backend server is unavailable (HTTP ${response.status}). Please ensure Spring Boot is running on port 8080.`);
      }
      throw new Error(`Server error (HTTP ${response.status}: ${response.statusText})`);
    }
    return trimmedText as unknown as T;
  }

  if (!response.ok) {
    const errorMsg = data?.errorMessage || data?.message || data?.error || `HTTP ${response.status}: ${response.statusText}`;
    throw new Error(errorMsg);
  }

  return data as T;
}

export const api = {
  // 1. ArrayList APIs
  getArrayListState: async (): Promise<ArrayListState> => handleResponse<ArrayListState>(await safeFetch(`${API_BASE_URL}/arraylist`)),
  addArrayList: async (value: string): Promise<OperationResponse<ArrayListState>> => handleResponse(await safeFetch(`${API_BASE_URL}/arraylist/add`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ value }) })),
  addAtArrayList: async (index: number, value: string): Promise<OperationResponse<ArrayListState>> => handleResponse(await safeFetch(`${API_BASE_URL}/arraylist/add-at`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ index, value }) })),
  getArrayListItem: async (index: number): Promise<OperationResponse<ArrayListState>> => handleResponse(await safeFetch(`${API_BASE_URL}/arraylist/${index}`)),
  setArrayListItem: async (index: number, value: string): Promise<OperationResponse<ArrayListState>> => handleResponse(await safeFetch(`${API_BASE_URL}/arraylist/${index}`, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ value }) })),
  removeArrayListItem: async (index: number): Promise<OperationResponse<ArrayListState>> => handleResponse(await safeFetch(`${API_BASE_URL}/arraylist/${index}`, { method: 'DELETE' })),
  clearArrayList: async (): Promise<OperationResponse<ArrayListState>> => handleResponse(await safeFetch(`${API_BASE_URL}/arraylist`, { method: 'DELETE' })),
  containsArrayList: async (value: string): Promise<OperationResponse<ArrayListState>> => handleResponse(await safeFetch(`${API_BASE_URL}/arraylist/contains`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ value }) })),
  indexOfArrayList: async (value: string): Promise<OperationResponse<ArrayListState>> => handleResponse(await safeFetch(`${API_BASE_URL}/arraylist/index-of`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ value }) })),
  removeValueArrayList: async (value: string): Promise<OperationResponse<ArrayListState>> => handleResponse(await safeFetch(`${API_BASE_URL}/arraylist/remove-value`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ value }) })),

  // 2. LinkedList APIs
  getLinkedListState: async (): Promise<LinkedListState> => handleResponse<LinkedListState>(await safeFetch(`${API_BASE_URL}/linkedlist`)),
  addFirstLinkedList: async (value: string): Promise<OperationResponse<LinkedListState>> => handleResponse(await safeFetch(`${API_BASE_URL}/linkedlist/add-first`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ value }) })),
  addLastLinkedList: async (value: string): Promise<OperationResponse<LinkedListState>> => handleResponse(await safeFetch(`${API_BASE_URL}/linkedlist/add-last`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ value }) })),
  addAtLinkedList: async (index: number, value: string): Promise<OperationResponse<LinkedListState>> => handleResponse(await safeFetch(`${API_BASE_URL}/linkedlist/add-at`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ index, value }) })),
  getLinkedListNode: async (index: number): Promise<OperationResponse<LinkedListState>> => handleResponse(await safeFetch(`${API_BASE_URL}/linkedlist/${index}`)),
  setLinkedListNode: async (index: number, value: string): Promise<OperationResponse<LinkedListState>> => handleResponse(await safeFetch(`${API_BASE_URL}/linkedlist/${index}`, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ value }) })),
  removeFirstLinkedList: async (): Promise<OperationResponse<LinkedListState>> => handleResponse(await safeFetch(`${API_BASE_URL}/linkedlist/first`, { method: 'DELETE' })),
  removeLastLinkedList: async (): Promise<OperationResponse<LinkedListState>> => handleResponse(await safeFetch(`${API_BASE_URL}/linkedlist/last`, { method: 'DELETE' })),
  removeLinkedListNode: async (index: number): Promise<OperationResponse<LinkedListState>> => handleResponse(await safeFetch(`${API_BASE_URL}/linkedlist/${index}`, { method: 'DELETE' })),
  clearLinkedList: async (): Promise<OperationResponse<LinkedListState>> => handleResponse(await safeFetch(`${API_BASE_URL}/linkedlist`, { method: 'DELETE' })),
  containsLinkedList: async (value: string): Promise<OperationResponse<LinkedListState>> => handleResponse(await safeFetch(`${API_BASE_URL}/linkedlist/contains`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ value }) })),
  indexOfLinkedList: async (value: string): Promise<OperationResponse<LinkedListState>> => handleResponse(await safeFetch(`${API_BASE_URL}/linkedlist/index-of`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ value }) })),
  removeValueLinkedList: async (value: string): Promise<OperationResponse<LinkedListState>> => handleResponse(await safeFetch(`${API_BASE_URL}/linkedlist/remove-value`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ value }) })),

  // 3. HashMap APIs
  getHashMapState: async (): Promise<HashMapState> => handleResponse<HashMapState>(await safeFetch(`${API_BASE_URL}/hashmap`)),
  putHashMap: async (key: string, value: string): Promise<OperationResponse<HashMapState>> => handleResponse(await safeFetch(`${API_BASE_URL}/hashmap/put`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ key, value }) })),
  getHashMapValue: async (key: string): Promise<OperationResponse<HashMapState>> => handleResponse(await safeFetch(`${API_BASE_URL}/hashmap/${encodeURIComponent(key)}`)),
  containsKeyHashMap: async (key: string): Promise<OperationResponse<HashMapState>> => handleResponse(await safeFetch(`${API_BASE_URL}/hashmap/contains-key`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ key }) })),
  containsValueHashMap: async (value: string): Promise<OperationResponse<HashMapState>> => handleResponse(await safeFetch(`${API_BASE_URL}/hashmap/contains-value`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ value }) })),
  removeHashMapKey: async (key: string): Promise<OperationResponse<HashMapState>> => handleResponse(await safeFetch(`${API_BASE_URL}/hashmap/${encodeURIComponent(key)}`, { method: 'DELETE' })),
  clearHashMap: async (): Promise<OperationResponse<HashMapState>> => handleResponse(await safeFetch(`${API_BASE_URL}/hashmap`, { method: 'DELETE' })),

  // 4. TreeMap APIs
  getTreeMapState: async (): Promise<TreeMapState> => handleResponse<TreeMapState>(await safeFetch(`${API_BASE_URL}/treemap`)),
  putTreeMap: async (key: string, value: string): Promise<OperationResponse<TreeMapState>> => handleResponse(await safeFetch(`${API_BASE_URL}/treemap/put`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ key, value }) })),
  getTreeMapValue: async (key: string): Promise<OperationResponse<TreeMapState>> => handleResponse(await safeFetch(`${API_BASE_URL}/treemap/${encodeURIComponent(key)}`)),
  containsKeyTreeMap: async (key: string): Promise<OperationResponse<TreeMapState>> => handleResponse(await safeFetch(`${API_BASE_URL}/treemap/contains-key`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ key }) })),
  getFirstKeyTreeMap: async (): Promise<OperationResponse<TreeMapState>> => handleResponse(await safeFetch(`${API_BASE_URL}/treemap/first-key`)),
  getLastKeyTreeMap: async (): Promise<OperationResponse<TreeMapState>> => handleResponse(await safeFetch(`${API_BASE_URL}/treemap/last-key`)),
  removeTreeMapKey: async (key: string): Promise<OperationResponse<TreeMapState>> => handleResponse(await safeFetch(`${API_BASE_URL}/treemap/${encodeURIComponent(key)}`, { method: 'DELETE' })),
  getTreeMapTraversal: async (type: string): Promise<OperationResponse<TreeMapState>> => handleResponse(await safeFetch(`${API_BASE_URL}/treemap/traversal?type=${type}`)),
  clearTreeMap: async (): Promise<OperationResponse<TreeMapState>> => handleResponse(await safeFetch(`${API_BASE_URL}/treemap`, { method: 'DELETE' })),

  // 5. PriorityQueue APIs
  getPriorityQueueState: async (): Promise<PriorityQueueState> => handleResponse<PriorityQueueState>(await safeFetch(`${API_BASE_URL}/priorityqueue`)),
  offerPriorityQueue: async (value: string): Promise<OperationResponse<PriorityQueueState>> => handleResponse(await safeFetch(`${API_BASE_URL}/priorityqueue/offer`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ value }) })),
  peekPriorityQueue: async (): Promise<OperationResponse<PriorityQueueState>> => handleResponse(await safeFetch(`${API_BASE_URL}/priorityqueue/peek`)),
  pollPriorityQueue: async (): Promise<OperationResponse<PriorityQueueState>> => handleResponse(await safeFetch(`${API_BASE_URL}/priorityqueue/poll`, { method: 'POST' })),
  clearPriorityQueue: async (): Promise<OperationResponse<PriorityQueueState>> => handleResponse(await safeFetch(`${API_BASE_URL}/priorityqueue`, { method: 'DELETE' })),

  // 6. Stack APIs
  getStackState: async (): Promise<StackState> => handleResponse<StackState>(await safeFetch(`${API_BASE_URL}/stack`)),
  pushStack: async (value: string): Promise<OperationResponse<StackState>> => handleResponse(await safeFetch(`${API_BASE_URL}/stack/push`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ value }) })),
  popStack: async (): Promise<OperationResponse<StackState>> => handleResponse(await safeFetch(`${API_BASE_URL}/stack/pop`, { method: 'POST' })),
  peekStack: async (): Promise<OperationResponse<StackState>> => handleResponse(await safeFetch(`${API_BASE_URL}/stack/peek`)),
  clearStack: async (): Promise<OperationResponse<StackState>> => handleResponse(await safeFetch(`${API_BASE_URL}/stack`, { method: 'DELETE' })),

  // 7. Queue APIs
  getQueueState: async (): Promise<QueueState> => handleResponse<QueueState>(await safeFetch(`${API_BASE_URL}/queue`)),
  enqueueQueue: async (value: string): Promise<OperationResponse<QueueState>> => handleResponse(await safeFetch(`${API_BASE_URL}/queue/enqueue`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ value }) })),
  dequeueQueue: async (): Promise<OperationResponse<QueueState>> => handleResponse(await safeFetch(`${API_BASE_URL}/queue/dequeue`, { method: 'POST' })),
  peekQueue: async (): Promise<OperationResponse<QueueState>> => handleResponse(await safeFetch(`${API_BASE_URL}/queue/peek`)),
  clearQueue: async (): Promise<OperationResponse<QueueState>> => handleResponse(await safeFetch(`${API_BASE_URL}/queue`, { method: 'DELETE' })),

  // 8. Deque APIs
  getDequeState: async (): Promise<DequeState> => handleResponse<DequeState>(await safeFetch(`${API_BASE_URL}/deque`)),
  addFirstDeque: async (value: string): Promise<OperationResponse<DequeState>> => handleResponse(await safeFetch(`${API_BASE_URL}/deque/add-first`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ value }) })),
  addLastDeque: async (value: string): Promise<OperationResponse<DequeState>> => handleResponse(await safeFetch(`${API_BASE_URL}/deque/add-last`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ value }) })),
  removeFirstDeque: async (): Promise<OperationResponse<DequeState>> => handleResponse(await safeFetch(`${API_BASE_URL}/deque/first`, { method: 'DELETE' })),
  removeLastDeque: async (): Promise<OperationResponse<DequeState>> => handleResponse(await safeFetch(`${API_BASE_URL}/deque/last`, { method: 'DELETE' })),
  peekFirstDeque: async (): Promise<OperationResponse<DequeState>> => handleResponse(await safeFetch(`${API_BASE_URL}/deque/peek-first`)),
  peekLastDeque: async (): Promise<OperationResponse<DequeState>> => handleResponse(await safeFetch(`${API_BASE_URL}/deque/peek-last`)),
  clearDeque: async (): Promise<OperationResponse<DequeState>> => handleResponse(await safeFetch(`${API_BASE_URL}/deque`, { method: 'DELETE' })),

  // 9. HashSet APIs
  getHashSetState: async (): Promise<HashSetState> => handleResponse<HashSetState>(await safeFetch(`${API_BASE_URL}/hashset`)),
  addHashSet: async (value: string): Promise<OperationResponse<HashSetState>> => handleResponse(await safeFetch(`${API_BASE_URL}/hashset/add`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ value }) })),
  removeHashSet: async (value: string): Promise<OperationResponse<HashSetState>> => handleResponse(await safeFetch(`${API_BASE_URL}/hashset/remove`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ value }) })),
  containsHashSet: async (value: string): Promise<OperationResponse<HashSetState>> => handleResponse(await safeFetch(`${API_BASE_URL}/hashset/contains`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ value }) })),
  clearHashSet: async (): Promise<OperationResponse<HashSetState>> => handleResponse(await safeFetch(`${API_BASE_URL}/hashset`, { method: 'DELETE' })),

  // 10. BST APIs
  getBSTState: async (): Promise<BSTState> => handleResponse<BSTState>(await safeFetch(`${API_BASE_URL}/bst`)),
  insertBST: async (value: string): Promise<OperationResponse<BSTState>> => handleResponse(await safeFetch(`${API_BASE_URL}/bst/insert`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ value }) })),
  searchBST: async (value: string): Promise<OperationResponse<BSTState>> => handleResponse(await safeFetch(`${API_BASE_URL}/bst/search`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ value }) })),
  deleteBST: async (key: string): Promise<OperationResponse<BSTState>> => handleResponse(await safeFetch(`${API_BASE_URL}/bst/${encodeURIComponent(key)}`, { method: 'DELETE' })),
  getBSTTraversal: async (type: string): Promise<OperationResponse<BSTState>> => handleResponse(await safeFetch(`${API_BASE_URL}/bst/traversal?type=${type}`)),
  clearBST: async (): Promise<OperationResponse<BSTState>> => handleResponse(await safeFetch(`${API_BASE_URL}/bst`, { method: 'DELETE' })),

  // 11. Heap APIs
  getHeapState: async (): Promise<HeapState> => handleResponse<HeapState>(await safeFetch(`${API_BASE_URL}/heap`)),
  insertHeap: async (value: string): Promise<OperationResponse<HeapState>> => handleResponse(await safeFetch(`${API_BASE_URL}/heap/insert`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ value }) })),
  extractMinHeap: async (): Promise<OperationResponse<HeapState>> => handleResponse(await safeFetch(`${API_BASE_URL}/heap/extract-min`, { method: 'POST' })),
  peekHeap: async (): Promise<OperationResponse<HeapState>> => handleResponse(await safeFetch(`${API_BASE_URL}/heap/peek`)),
  clearHeap: async (): Promise<OperationResponse<HeapState>> => handleResponse(await safeFetch(`${API_BASE_URL}/heap`, { method: 'DELETE' })),

  // 12. Trie APIs
  getTrieState: async (): Promise<TrieState> => handleResponse<TrieState>(await safeFetch(`${API_BASE_URL}/trie`)),
  insertTrie: async (value: string): Promise<OperationResponse<TrieState>> => handleResponse(await safeFetch(`${API_BASE_URL}/trie/insert`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ value }) })),
  searchTrie: async (value: string): Promise<OperationResponse<TrieState>> => handleResponse(await safeFetch(`${API_BASE_URL}/trie/search`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ value }) })),
  startsWithTrie: async (value: string): Promise<OperationResponse<TrieState>> => handleResponse(await safeFetch(`${API_BASE_URL}/trie/starts-with`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ value }) })),
  deleteTrie: async (value: string): Promise<OperationResponse<TrieState>> => handleResponse(await safeFetch(`${API_BASE_URL}/trie/delete`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ value }) })),
  clearTrie: async (): Promise<OperationResponse<TrieState>> => handleResponse(await safeFetch(`${API_BASE_URL}/trie`, { method: 'DELETE' })),

  // 13. Graph APIs
  getGraphState: async (): Promise<GraphState> => handleResponse<GraphState>(await safeFetch(`${API_BASE_URL}/graph`)),
  addVertexGraph: async (value: string): Promise<OperationResponse<GraphState>> => handleResponse(await safeFetch(`${API_BASE_URL}/graph/add-vertex`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ value }) })),
  addEdgeGraph: async (from: string, to: string): Promise<OperationResponse<GraphState>> => handleResponse(await safeFetch(`${API_BASE_URL}/graph/add-edge`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ from, to }) })),
  removeEdgeGraph: async (from: string, to: string): Promise<OperationResponse<GraphState>> => handleResponse(await safeFetch(`${API_BASE_URL}/graph/remove-edge`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ from, to }) })),
  removeVertexGraph: async (label: string): Promise<OperationResponse<GraphState>> => handleResponse(await safeFetch(`${API_BASE_URL}/graph/vertex/${encodeURIComponent(label)}`, { method: 'DELETE' })),
  bfsGraph: async (start?: string): Promise<OperationResponse<GraphState>> => handleResponse(await safeFetch(`${API_BASE_URL}/graph/bfs${start ? '?start=' + encodeURIComponent(start) : ''}`)),
  dfsGraph: async (start?: string): Promise<OperationResponse<GraphState>> => handleResponse(await safeFetch(`${API_BASE_URL}/graph/dfs${start ? '?start=' + encodeURIComponent(start) : ''}`)),
  clearGraph: async (): Promise<OperationResponse<GraphState>> => handleResponse(await safeFetch(`${API_BASE_URL}/graph`, { method: 'DELETE' })),

  // 14. Disjoint Set APIs
  getDisjointSetState: async (): Promise<DisjointSetState> => handleResponse<DisjointSetState>(await safeFetch(`${API_BASE_URL}/disjoint-set`)),
  makeSetDisjointSet: async (value: string): Promise<OperationResponse<DisjointSetState>> => handleResponse(await safeFetch(`${API_BASE_URL}/disjoint-set/make-set`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ value }) })),
  findDisjointSet: async (value: string): Promise<OperationResponse<DisjointSetState>> => handleResponse(await safeFetch(`${API_BASE_URL}/disjoint-set/find`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ value }) })),
  unionDisjointSet: async (elementA: string, elementB: string): Promise<OperationResponse<DisjointSetState>> => handleResponse(await safeFetch(`${API_BASE_URL}/disjoint-set/union`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ elementA, elementB }) })),
  connectedDisjointSet: async (elementA: string, elementB: string): Promise<OperationResponse<DisjointSetState>> => handleResponse(await safeFetch(`${API_BASE_URL}/disjoint-set/connected`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ elementA, elementB }) })),
  clearDisjointSet: async (): Promise<OperationResponse<DisjointSetState>> => handleResponse(await safeFetch(`${API_BASE_URL}/disjoint-set`, { method: 'DELETE' })),

  // 15. Circular LinkedList APIs
  getCircularLinkedListState: async (): Promise<CircularLinkedListState> => handleResponse<CircularLinkedListState>(await safeFetch(`${API_BASE_URL}/circular-linked-list`)),
  addFirstCircularLinkedList: async (value: string): Promise<OperationResponse<CircularLinkedListState>> => handleResponse(await safeFetch(`${API_BASE_URL}/circular-linked-list/add-first`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ value }) })),
  addLastCircularLinkedList: async (value: string): Promise<OperationResponse<CircularLinkedListState>> => handleResponse(await safeFetch(`${API_BASE_URL}/circular-linked-list/add-last`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ value }) })),
  addAtCircularLinkedList: async (index: number, value: string): Promise<OperationResponse<CircularLinkedListState>> => handleResponse(await safeFetch(`${API_BASE_URL}/circular-linked-list/add-at`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ index, value }) })),
  getCircularLinkedListNode: async (index: number): Promise<OperationResponse<CircularLinkedListState>> => handleResponse(await safeFetch(`${API_BASE_URL}/circular-linked-list/${index}`)),
  setCircularLinkedListNode: async (index: number, value: string): Promise<OperationResponse<CircularLinkedListState>> => handleResponse(await safeFetch(`${API_BASE_URL}/circular-linked-list/${index}`, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ value }) })),
  removeFirstCircularLinkedList: async (): Promise<OperationResponse<CircularLinkedListState>> => handleResponse(await safeFetch(`${API_BASE_URL}/circular-linked-list/first`, { method: 'DELETE' })),
  removeLastCircularLinkedList: async (): Promise<OperationResponse<CircularLinkedListState>> => handleResponse(await safeFetch(`${API_BASE_URL}/circular-linked-list/last`, { method: 'DELETE' })),
  removeCircularLinkedListNode: async (index: number): Promise<OperationResponse<CircularLinkedListState>> => handleResponse(await safeFetch(`${API_BASE_URL}/circular-linked-list/${index}`, { method: 'DELETE' })),
  containsCircularLinkedList: async (value: string): Promise<OperationResponse<CircularLinkedListState>> => handleResponse(await safeFetch(`${API_BASE_URL}/circular-linked-list/contains`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ value }) })),
  clearCircularLinkedList: async (): Promise<OperationResponse<CircularLinkedListState>> => handleResponse(await safeFetch(`${API_BASE_URL}/circular-linked-list`, { method: 'DELETE' })),

  // Common Source Code & Benchmark APIs
  getSourceCode: async (collectionName: string): Promise<SourceCodeResponse> => handleResponse<SourceCodeResponse>(await safeFetch(`${API_BASE_URL}/code/${collectionName}`)),
  runBenchmark: async (structure: string, operation: string, elementCount: number): Promise<BenchmarkResult> => handleResponse<BenchmarkResult>(await safeFetch(`${API_BASE_URL}/benchmark/run`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ structure, operation, elementCount }) }))
};
