import React, { useEffect, useState } from 'react';
import type { CollectionType, OperationResponse, OperationHistoryItem } from '../../types/collections';
import { api } from '../../services/api';
import { ArrayListVisualizer } from '../visualizers/ArrayListVisualizer';
import { LinkedListVisualizer } from '../visualizers/LinkedListVisualizer';
import { HashMapVisualizer } from '../visualizers/HashMapVisualizer';
import { TreeMapVisualizer } from '../visualizers/TreeMapVisualizer';
import { PriorityQueueVisualizer } from '../visualizers/PriorityQueueVisualizer';
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
    const clean = id.toLowerCase().replace(/[^a-z]/g, '');
    if (clean === 'linkedlist') return 'LINKED_LIST';
    if (clean === 'hashmap') return 'HASH_MAP';
    if (clean === 'treemap') return 'TREE_MAP';
    if (clean === 'priorityqueue') return 'PRIORITY_QUEUE';
    return 'ARRAY_LIST';
  };

  const collectionType: CollectionType = normalizeCollectionType(collectionId);

  const [stateData, setStateData] = useState<any>(null);
  const [lastResponse, setLastResponse] = useState<OperationResponse | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // Fetch initial state on load / collectionId switch
  const fetchState = async () => {
    setLoading(true);
    setErrorMsg(null);
    try {
      if (collectionId === 'arraylist') {
        const data = await api.getArrayListState();
        setStateData(data);
      } else if (collectionId === 'linkedlist') {
        const data = await api.getLinkedListState();
        setStateData(data);
      } else if (collectionId === 'hashmap') {
        const data = await api.getHashMapState();
        setStateData(data);
      } else if (collectionId === 'treemap') {
        const data = await api.getTreeMapState();
        setStateData(data);
      } else if (collectionId === 'priorityqueue') {
        const data = await api.getPriorityQueueState();
        setStateData(data);
      }
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

  const handleExecuteOperation = async (op: string, params: { value?: string; key?: string; index?: number; type?: string }) => {
    setLoading(true);
    setErrorMsg(null);
    try {
      let res: OperationResponse | null = null;

      const targetValue = (params.value !== undefined && params.value !== '') ? params.value : '10';
      const targetKey = (params.key !== undefined && params.key !== '') ? params.key : 'Key1';
      const targetIndex = (params.index !== undefined && !isNaN(params.index)) ? params.index : 0;

      if (collectionId === 'arraylist') {
        if (op === 'ADD') res = await api.addArrayList(targetValue);
        else if (op === 'ADD_AT') res = await api.addAtArrayList(targetIndex, targetValue);
        else if (op === 'GET') res = await api.getArrayListItem(targetIndex);
        else if (op === 'SET') res = await api.setArrayListItem(targetIndex, targetValue);
        else if (op === 'CONTAINS') res = await api.containsArrayList(targetValue);
        else if (op === 'INDEX_OF') res = await api.indexOfArrayList(targetValue);
        else if (op === 'REMOVE') res = await api.removeArrayListItem(targetIndex);
        else if (op === 'REMOVE_BY_VALUE') res = await api.removeValueArrayList(targetValue);
      } else if (collectionId === 'linkedlist') {
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
      } else if (collectionId === 'hashmap') {
        if (op === 'PUT') res = await api.putHashMap(targetKey, targetValue);
        else if (op === 'GET') res = await api.getHashMapValue(targetKey);
        else if (op === 'CONTAINS_KEY') res = await api.containsKeyHashMap(targetKey);
        else if (op === 'CONTAINS_VALUE') res = await api.containsValueHashMap(targetValue);
        else if (op === 'REMOVE') res = await api.removeHashMapKey(targetKey);
      } else if (collectionId === 'treemap') {
        if (op === 'PUT') res = await api.putTreeMap(targetKey, targetValue);
        else if (op === 'GET') res = await api.getTreeMapValue(targetKey);
        else if (op === 'CONTAINS_KEY') res = await api.containsKeyTreeMap(targetKey);
        else if (op === 'FIRST_KEY') res = await api.getFirstKeyTreeMap();
        else if (op === 'LAST_KEY') res = await api.getLastKeyTreeMap();
        else if (op === 'REMOVE') res = await api.removeTreeMapKey(targetKey);
        else if (op === 'TRAVERSAL') res = await api.getTreeMapTraversal((params.type as any) || 'inorder');
      } else if (collectionId === 'priorityqueue') {
        if (op === 'OFFER') res = await api.offerPriorityQueue(targetValue);
        else if (op === 'PEEK') res = await api.peekPriorityQueue();
        else if (op === 'POLL') res = await api.pollPriorityQueue();
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
      if (collectionId === 'arraylist') res = await api.clearArrayList();
      else if (collectionId === 'linkedlist') res = await api.clearLinkedList();
      else if (collectionId === 'hashmap') res = await api.clearHashMap();
      else if (collectionId === 'treemap') res = await api.clearTreeMap();
      else if (collectionId === 'priorityqueue') res = await api.clearPriorityQueue();

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

  return (
    <div className="space-y-6 py-2">
      {/* Error Alert */}
      {errorMsg && (
        <div className="p-4 bg-rose-500/10 border border-rose-500/30 rounded-xl text-xs font-mono text-rose-300 flex items-center justify-between">
          <span>{errorMsg}</span>
          <button onClick={() => setErrorMsg(null)} className="text-slate-400 hover:text-white">Dismiss</button>
        </div>
      )}

      {/* Primary Collection Visualizer Widget */}
      {stateData && (
        <>
          {collectionId === 'arraylist' && <ArrayListVisualizer state={stateData} lastResponse={lastResponse} />}
          {collectionId === 'linkedlist' && <LinkedListVisualizer state={stateData} lastResponse={lastResponse} />}
          {collectionId === 'hashmap' && <HashMapVisualizer state={stateData} lastResponse={lastResponse} />}
          {collectionId === 'treemap' && <TreeMapVisualizer state={stateData} lastResponse={lastResponse} />}
          {collectionId === 'priorityqueue' && <PriorityQueueVisualizer state={stateData} lastResponse={lastResponse} />}
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

      {/* History Session Log */}
      <HistoryPanel history={history} onClearHistory={() => setHistory([])} />
    </div>
  );
};
