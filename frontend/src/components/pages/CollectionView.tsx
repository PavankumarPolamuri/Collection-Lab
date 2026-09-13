import React, { useEffect, useState } from 'react';
import type { CollectionType, OperationResponse, OperationHistoryItem } from '../../types/collections';
import { api } from '../../services/api';

// Visualizers
import { ArrayListVisualizer } from '../visualizers/ArrayListVisualizer';
import { LinkedListVisualizer } from '../visualizers/LinkedListVisualizer';
import { HashMapVisualizer } from '../visualizers/HashMapVisualizer';
import { TreeMapVisualizer } from '../visualizers/TreeMapVisualizer';
import { PriorityQueueVisualizer } from '../visualizers/PriorityQueueVisualizer';
import { StackVisualizer } from '../visualizers/StackVisualizer';
import { QueueVisualizer } from '../visualizers/QueueVisualizer';
import { DequeVisualizer } from '../visualizers/DequeVisualizer';
import { HashSetVisualizer } from '../visualizers/HashSetVisualizer';
import { BSTVisualizer } from '../visualizers/BSTVisualizer';
import { HeapVisualizer } from '../visualizers/HeapVisualizer';
import { TrieVisualizer } from '../visualizers/TrieVisualizer';
import { GraphVisualizer } from '../visualizers/GraphVisualizer';
import { DisjointSetVisualizer } from '../visualizers/DisjointSetVisualizer';
import { CircularLinkedListVisualizer } from '../visualizers/CircularLinkedListVisualizer';

import { ControlPanel } from '../panels/ControlPanel';
import { StepsPanel } from '../panels/StepsPanel';
import { HistoryPanel } from '../panels/HistoryPanel';

interface CollectionViewProps {
  collectionId: string;
  history: OperationHistoryItem[];
  setHistory: React.Dispatch<React.SetStateAction<OperationHistoryItem[]>>;
}

export const CollectionView: React.FC<CollectionViewProps> = ({
  collectionId,
  history,
  setHistory
}) => {
  const normalizeCollectionType = (id: string): CollectionType => {
    const clean = id.toLowerCase().replaceAll(/[^a-z]/g, '');
    if (clean === 'linkedlist') return 'LINKED_LIST';
    if (clean === 'hashmap') return 'HASH_MAP';
    if (clean === 'treemap') return 'TREE_MAP';
    if (clean === 'priorityqueue') return 'PRIORITY_QUEUE';
    if (clean === 'stack') return 'STACK';
    if (clean === 'queue') return 'QUEUE';
    if (clean === 'deque') return 'DEQUE';
    if (clean === 'hashset') return 'HASH_SET';
    if (clean === 'bst') return 'BST';
    if (clean === 'heap' || clean === 'minheap') return 'HEAP';
    if (clean === 'trie') return 'TRIE';
    if (clean === 'graph') return 'GRAPH';
    if (clean === 'disjointset' || clean === 'unionfind') return 'DISJOINT_SET';
    if (clean === 'circularlinkedlist') return 'CIRCULAR_LINKED_LIST';
    return 'ARRAY_LIST';
  };

  const collectionType: CollectionType = normalizeCollectionType(collectionId);

  const [stateData, setStateData] = useState<any>(null);
  const [lastResponse, setLastResponse] = useState<OperationResponse | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const fetchState = async () => {
    setLoading(true);
    setErrorMsg(null);
    try {
      const cid = collectionId.toLowerCase().replaceAll(/[^a-z]/g, '');
      let data: any = null;
      if (cid === 'arraylist') data = await api.getArrayListState();
      else if (cid === 'linkedlist') data = await api.getLinkedListState();
      else if (cid === 'hashmap') data = await api.getHashMapState();
      else if (cid === 'treemap') data = await api.getTreeMapState();
      else if (cid === 'priorityqueue') data = await api.getPriorityQueueState();
      else if (cid === 'stack') data = await api.getStackState();
      else if (cid === 'queue') data = await api.getQueueState();
      else if (cid === 'deque') data = await api.getDequeState();
      else if (cid === 'hashset') data = await api.getHashSetState();
      else if (cid === 'bst') data = await api.getBSTState();
      else if (cid === 'heap' || cid === 'minheap') data = await api.getHeapState();
      else if (cid === 'trie') data = await api.getTrieState();
      else if (cid === 'graph') data = await api.getGraphState();
      else if (cid === 'disjointset' || cid === 'unionfind') data = await api.getDisjointSetState();
      else if (cid === 'circularlinkedlist') data = await api.getCircularLinkedListState();

      setStateData(data);
    } catch (err: any) {
      setErrorMsg(`Failed to connect to backend REST API: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchState();
    setLastResponse(null);
  }, [collectionId]);

  const addHistoryItem = (res: OperationResponse) => {
    const item: OperationHistoryItem = {
      id: Math.random().toString(36).substring(2, 9),
      timestamp: new Date().toLocaleTimeString(),
      structure: res.structure,
      operation: res.operation,
      success: res.success,
      complexity: res.complexity,
      input: JSON.stringify(res.input ?? 'None'),
      steps: res.steps,
      errorMessage: res.errorMessage
    };
    setHistory((prev) => [item, ...prev]);
  };

  const handleExecuteOperation = async (op: string, params: { value?: string; key?: string; index?: number; type?: string; from?: string; to?: string; elementA?: string; elementB?: string }) => {
    setLoading(true);
    setErrorMsg(null);
    try {
      let res: OperationResponse | null = null;
      const cid = collectionId.toLowerCase().replaceAll(/[^a-z]/g, '');
      const targetValue = params.value ?? '10';
      const targetKey = params.key ?? 'Key1';
      const targetIndex = params.index ?? 0;

      if (cid === 'arraylist') {
        if (op === 'ADD') res = await api.addArrayList(targetValue);
        else if (op === 'ADD_AT') res = await api.addAtArrayList(targetIndex, targetValue);
        else if (op === 'GET') res = await api.getArrayListItem(targetIndex);
        else if (op === 'SET') res = await api.setArrayListItem(targetIndex, targetValue);
        else if (op === 'CONTAINS') res = await api.containsArrayList(targetValue);
        else if (op === 'INDEX_OF') res = await api.indexOfArrayList(targetValue);
        else if (op === 'REMOVE') res = await api.removeArrayListItem(targetIndex);
        else if (op === 'REMOVE_BY_VALUE') res = await api.removeValueArrayList(targetValue);
      } else if (cid === 'linkedlist') {
        if (op === 'ADD_FIRST') res = await api.addFirstLinkedList(targetValue);
        else if (op === 'ADD_LAST') res = await api.addLastLinkedList(targetValue);
        else if (op === 'ADD_AT') res = await api.addAtLinkedList(targetIndex, targetValue);
        else if (op === 'GET') res = await api.getLinkedListNode(targetIndex);
        else if (op === 'SET') res = await api.setLinkedListNode(targetIndex, targetValue);
        else if (op === 'CONTAINS') res = await api.containsLinkedList(targetValue);
        else if (op === 'INDEX_OF') res = await api.indexOfLinkedList(targetValue);
        else if (op === 'REMOVE_FIRST') res = await api.removeFirstLinkedList();
        else if (op === 'REMOVE_LAST') res = await api.removeLastLinkedList();
        else if (op === 'REMOVE') res = await api.removeLinkedListNode(targetIndex);
        else if (op === 'REMOVE_BY_VALUE') res = await api.removeValueLinkedList(targetValue);
      } else if (cid === 'hashmap') {
        if (op === 'PUT') res = await api.putHashMap(targetKey, targetValue);
        else if (op === 'GET') res = await api.getHashMapValue(targetKey);
        else if (op === 'CONTAINS_KEY') res = await api.containsKeyHashMap(targetKey);
        else if (op === 'CONTAINS_VALUE') res = await api.containsValueHashMap(targetValue);
        else if (op === 'REMOVE') res = await api.removeHashMapKey(targetKey);
      } else if (cid === 'treemap') {
        if (op === 'PUT') res = await api.putTreeMap(targetKey, targetValue);
        else if (op === 'GET') res = await api.getTreeMapValue(targetKey);
        else if (op === 'CONTAINS_KEY') res = await api.containsKeyTreeMap(targetKey);
        else if (op === 'FIRST_KEY') res = await api.getFirstKeyTreeMap();
        else if (op === 'LAST_KEY') res = await api.getLastKeyTreeMap();
        else if (op === 'REMOVE') res = await api.removeTreeMapKey(targetKey);
        else if (op === 'TRAVERSAL') res = await api.getTreeMapTraversal(params.type || 'inorder');
      } else if (cid === 'priorityqueue') {
        if (op === 'OFFER') res = await api.offerPriorityQueue(targetValue);
        else if (op === 'PEEK') res = await api.peekPriorityQueue();
        else if (op === 'POLL') res = await api.pollPriorityQueue();
      } else if (cid === 'stack') {
        if (op === 'PUSH') res = await api.pushStack(targetValue);
        else if (op === 'POP') res = await api.popStack();
        else if (op === 'PEEK') res = await api.peekStack();
      } else if (cid === 'queue') {
        if (op === 'ENQUEUE') res = await api.enqueueQueue(targetValue);
        else if (op === 'DEQUEUE') res = await api.dequeueQueue();
        else if (op === 'PEEK') res = await api.peekQueue();
      } else if (cid === 'deque') {
        if (op === 'ADD_FIRST') res = await api.addFirstDeque(targetValue);
        else if (op === 'ADD_LAST') res = await api.addLastDeque(targetValue);
        else if (op === 'REMOVE_FIRST') res = await api.removeFirstDeque();
        else if (op === 'REMOVE_LAST') res = await api.removeLastDeque();
        else if (op === 'PEEK_FIRST') res = await api.peekFirstDeque();
        else if (op === 'PEEK_LAST') res = await api.peekLastDeque();
      } else if (cid === 'hashset') {
        if (op === 'ADD') res = await api.addHashSet(targetValue);
        else if (op === 'REMOVE') res = await api.removeHashSet(targetValue);
        else if (op === 'CONTAINS') res = await api.containsHashSet(targetValue);
      } else if (cid === 'bst') {
        if (op === 'INSERT') res = await api.insertBST(targetValue);
        else if (op === 'SEARCH') res = await api.searchBST(targetValue);
        else if (op === 'DELETE') res = await api.deleteBST(targetValue);
        else if (op === 'TRAVERSAL') res = await api.getBSTTraversal(params.type || 'inorder');
      } else if (cid === 'heap' || cid === 'minheap') {
        if (op === 'INSERT') res = await api.insertHeap(targetValue);
        else if (op === 'EXTRACT_MIN') res = await api.extractMinHeap();
        else if (op === 'PEEK') res = await api.peekHeap();
      } else if (cid === 'trie') {
        if (op === 'INSERT') res = await api.insertTrie(targetValue);
        else if (op === 'SEARCH') res = await api.searchTrie(targetValue);
        else if (op === 'STARTS_WITH') res = await api.startsWithTrie(targetValue);
        else if (op === 'DELETE') res = await api.deleteTrie(targetValue);
      } else if (cid === 'graph') {
        if (op === 'ADD_VERTEX') res = await api.addVertexGraph(targetValue);
        else if (op === 'ADD_EDGE') res = await api.addEdgeGraph(params.from || '', params.to || '');
        else if (op === 'REMOVE_EDGE') res = await api.removeEdgeGraph(params.from || '', params.to || '');
        else if (op === 'REMOVE_VERTEX') res = await api.removeVertexGraph(targetValue);
        else if (op === 'BFS') res = await api.bfsGraph(params.value);
        else if (op === 'DFS') res = await api.dfsGraph(params.value);
      } else if (cid === 'disjointset' || cid === 'unionfind') {
        if (op === 'MAKE_SET') res = await api.makeSetDisjointSet(params.elementA || targetValue);
        else if (op === 'FIND') res = await api.findDisjointSet(params.elementA || targetValue);
        else if (op === 'UNION') res = await api.unionDisjointSet(params.elementA || '', params.elementB || '');
        else if (op === 'CONNECTED') res = await api.connectedDisjointSet(params.elementA || '', params.elementB || '');
      } else if (cid === 'circularlinkedlist') {
        if (op === 'ADD_FIRST') res = await api.addFirstCircularLinkedList(targetValue);
        else if (op === 'ADD_LAST') res = await api.addLastCircularLinkedList(targetValue);
        else if (op === 'ADD_AT') res = await api.addAtCircularLinkedList(targetIndex, targetValue);
        else if (op === 'GET') res = await api.getCircularLinkedListNode(targetIndex);
        else if (op === 'SET' || op === 'EDIT') res = await api.setCircularLinkedListNode(targetIndex, targetValue);
        else if (op === 'REMOVE_FIRST') res = await api.removeFirstCircularLinkedList();
        else if (op === 'REMOVE_LAST') res = await api.removeLastCircularLinkedList();
        else if (op === 'REMOVE') res = await api.removeCircularLinkedListNode(targetIndex);
        else if (op === 'SEARCH' || op === 'CONTAINS') res = await api.containsCircularLinkedList(targetValue);
      }

      if (res) {
        setLastResponse(res);
        setStateData(res.newState);
        addHistoryItem(res);
      }
    } catch (err: any) {
      setErrorMsg(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleResetCollection = async () => {
    setLoading(true);
    try {
      let res: OperationResponse | null = null;
      const cid = collectionId.toLowerCase().replaceAll(/[^a-z]/g, '');
      if (cid === 'arraylist') res = await api.clearArrayList();
      else if (cid === 'linkedlist') res = await api.clearLinkedList();
      else if (cid === 'hashmap') res = await api.clearHashMap();
      else if (cid === 'treemap') res = await api.clearTreeMap();
      else if (cid === 'priorityqueue') res = await api.clearPriorityQueue();
      else if (cid === 'stack') res = await api.clearStack();
      else if (cid === 'queue') res = await api.clearQueue();
      else if (cid === 'deque') res = await api.clearDeque();
      else if (cid === 'hashset') res = await api.clearHashSet();
      else if (cid === 'bst') res = await api.clearBST();
      else if (cid === 'heap' || cid === 'minheap') res = await api.clearHeap();
      else if (cid === 'trie') res = await api.clearTrie();
      else if (cid === 'graph') res = await api.clearGraph();
      else if (cid === 'disjointset' || cid === 'unionfind') res = await api.clearDisjointSet();
      else if (cid === 'circularlinkedlist') res = await api.clearCircularLinkedList();

      if (res) {
        setLastResponse(res);
        setStateData(res.newState);
        addHistoryItem(res);
      }
    } catch (err: any) {
      setErrorMsg(err.message);
    } finally {
      setLoading(false);
    }
  };

  const cid = collectionId.toLowerCase().replaceAll(/[^a-z]/g, '');

  return (
    <div className="space-y-6 py-2">
      {errorMsg && (
        <div className="p-4 bg-rose-500/10 border border-rose-500/30 rounded-xl text-xs font-mono text-rose-300 flex items-center justify-between">
          <span>{errorMsg}</span>
          <button onClick={() => setErrorMsg(null)} className="text-slate-400 hover:text-white cursor-pointer">Dismiss</button>
        </div>
      )}

      {/* Visualizer Widget */}
      {stateData && (
        <>
          {cid === 'arraylist' && <ArrayListVisualizer state={stateData} lastResponse={lastResponse} />}
          {cid === 'linkedlist' && <LinkedListVisualizer state={stateData} lastResponse={lastResponse} />}
          {cid === 'hashmap' && <HashMapVisualizer state={stateData} lastResponse={lastResponse} />}
          {cid === 'treemap' && <TreeMapVisualizer state={stateData} lastResponse={lastResponse} />}
          {cid === 'priorityqueue' && <PriorityQueueVisualizer state={stateData} lastResponse={lastResponse} />}
          {cid === 'stack' && <StackVisualizer state={stateData} lastResponse={lastResponse} />}
          {cid === 'queue' && <QueueVisualizer state={stateData} lastResponse={lastResponse} />}
          {cid === 'deque' && <DequeVisualizer state={stateData} lastResponse={lastResponse} />}
          {cid === 'hashset' && <HashSetVisualizer state={stateData} lastResponse={lastResponse} />}
          {cid === 'bst' && <BSTVisualizer state={stateData} lastResponse={lastResponse} />}
          {(cid === 'heap' || cid === 'minheap') && <HeapVisualizer state={stateData} lastResponse={lastResponse} />}
          {cid === 'trie' && <TrieVisualizer state={stateData} lastResponse={lastResponse} />}
          {cid === 'graph' && <GraphVisualizer state={stateData} lastResponse={lastResponse} />}
          {(cid === 'disjointset' || cid === 'unionfind') && <DisjointSetVisualizer state={stateData} lastResponse={lastResponse} />}
          {cid === 'circularlinkedlist' && <CircularLinkedListVisualizer state={stateData} lastResponse={lastResponse} />}
        </>
      )}

      {/* Grid: Operation Controls & Execution Trace */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ControlPanel
          collectionType={collectionType}
          onExecute={handleExecuteOperation}
          onReset={handleResetCollection}
          loading={loading}
        />
        <StepsPanel lastResponse={lastResponse} />
      </div>

      <HistoryPanel history={history} onClearHistory={() => setHistory([])} />
    </div>
  );
};
