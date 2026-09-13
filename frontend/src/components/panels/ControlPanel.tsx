import React, { useState } from 'react';
import { Plus, Search, Trash2, RotateCcw, ArrowDownUp, RefreshCw, Key, Hash, Edit3, Network } from 'lucide-react';
import type { CollectionType } from '../../types/collections';

interface ControlPanelProps {
  collectionType: CollectionType;
  onExecute: (operation: string, params: { value?: string; key?: string; index?: number; type?: string; from?: string; to?: string; elementA?: string; elementB?: string }) => void;
  onReset: () => void;
  loading?: boolean;
}

export const ControlPanel: React.FC<ControlPanelProps> = ({
  collectionType,
  onExecute,
  onReset,
  loading = false
}) => {
  const [value, setValue] = useState<string>('');
  const [key, setKey] = useState<string>('');
  const [index, setIndex] = useState<number>(0);
  const [from, setFrom] = useState<string>('');
  const [to, setTo] = useState<string>('');
  const [elementA, setElementA] = useState<string>('');
  const [elementB, setElementB] = useState<string>('');
  const [traversalType, setTraversalType] = useState<'inorder' | 'preorder' | 'postorder'>('inorder');
  const [validationError, setValidationError] = useState<string | null>(null);

  const normalizedType = collectionType ? String(collectionType).toUpperCase().replace(/-/g, '_') : 'ARRAY_LIST';
  const isArrayList = normalizedType === 'ARRAY_LIST' || normalizedType === 'ARRAYLIST';
  const isLinkedList = normalizedType === 'LINKED_LIST' || normalizedType === 'LINKEDLIST';
  const isHashMap = normalizedType === 'HASH_MAP' || normalizedType === 'HASHMAP';
  const isTreeMap = normalizedType === 'TREE_MAP' || normalizedType === 'TREEMAP';
  const isPriorityQueue = normalizedType === 'PRIORITY_QUEUE' || normalizedType === 'PRIORITYQUEUE';
  const isStack = normalizedType === 'STACK';
  const isQueue = normalizedType === 'QUEUE';
  const isDeque = normalizedType === 'DEQUE';
  const isHashSet = normalizedType === 'HASH_SET' || normalizedType === 'HASHSET';
  const isBST = normalizedType === 'BST';
  const isHeap = normalizedType === 'HEAP' || normalizedType === 'MIN_HEAP';
  const isTrie = normalizedType === 'TRIE';
  const isGraph = normalizedType === 'GRAPH';
  const isDisjointSet = normalizedType === 'DISJOINT_SET' || normalizedType === 'UNION_FIND';
  const isCircularLinkedList = normalizedType === 'CIRCULAR_LINKED_LIST' || normalizedType === 'CIRCULARLINKEDLIST';

  const clearError = () => { if (validationError) setValidationError(null); };

  const executeOp = (op: string) => {
    if (loading) return;
    const valTrim = value.trim();
    const keyTrim = key.trim();
    const fromTrim = from.trim();
    const toTrim = to.trim();
    const elemATrim = elementA.trim();
    const elemBTrim = elementB.trim();

    // Validation per collection operation
    if (isArrayList || isLinkedList || isCircularLinkedList) {
      if (['ADD', 'ADD_FIRST', 'ADD_LAST', 'CONTAINS', 'INDEX_OF', 'REMOVE_BY_VALUE', 'SEARCH'].includes(op)) {
        if (!valTrim) { setValidationError('Please enter a value.'); return; }
      } else if (['ADD_AT', 'SET', 'EDIT'].includes(op)) {
        if (index < 0 || isNaN(index)) { setValidationError('Invalid index.'); return; }
        if (!valTrim) { setValidationError('Please enter a value.'); return; }
      } else if (['GET', 'REMOVE'].includes(op)) {
        if (index < 0 || isNaN(index)) { setValidationError('Invalid index.'); return; }
      }
    } else if (isStack) {
      if (op === 'PUSH' && !valTrim) { setValidationError('Please enter a value to push.'); return; }
    } else if (isQueue) {
      if (op === 'ENQUEUE' && !valTrim) { setValidationError('Please enter a value to enqueue.'); return; }
    } else if (isDeque) {
      if (['ADD_FIRST', 'ADD_LAST'].includes(op) && !valTrim) { setValidationError('Please enter a value.'); return; }
    } else if (isHashSet) {
      if (['ADD', 'REMOVE', 'CONTAINS'].includes(op) && !valTrim) { setValidationError('Please enter an element value.'); return; }
    } else if (isBST) {
      if (['INSERT', 'SEARCH', 'DELETE'].includes(op) && !keyTrim && !valTrim) { setValidationError('Please enter a key/value.'); return; }
    } else if (isHeap) {
      if (op === 'INSERT' && !valTrim) { setValidationError('Please enter a value.'); return; }
    } else if (isTrie) {
      if (['INSERT', 'SEARCH', 'DELETE', 'STARTS_WITH'].includes(op) && !valTrim) { setValidationError('Please enter a word/prefix.'); return; }
    } else if (isGraph) {
      if (['ADD_VERTEX', 'REMOVE_VERTEX'].includes(op) && !valTrim) { setValidationError('Please enter a vertex name.'); return; }
      if (['ADD_EDGE', 'REMOVE_EDGE'].includes(op) && (!fromTrim || !toTrim)) { setValidationError('Please enter both From and To vertices.'); return; }
    } else if (isDisjointSet) {
      if (['MAKE_SET', 'FIND'].includes(op) && !elemATrim && !valTrim) { setValidationError('Please enter an element name.'); return; }
      if (['UNION', 'CONNECTED'].includes(op) && (!elemATrim || !elemBTrim)) { setValidationError('Please enter both Element A and Element B.'); return; }
    }

    setValidationError(null);
    onExecute(op, {
      value: valTrim,
      key: keyTrim || valTrim,
      index,
      type: traversalType,
      from: fromTrim,
      to: toTrim,
      elementA: elemATrim || valTrim,
      elementB: elemBTrim
    });

    if (['ADD', 'ADD_FIRST', 'ADD_LAST', 'PUSH', 'ENQUEUE', 'OFFER', 'INSERT', 'MAKE_SET', 'ADD_VERTEX'].includes(op)) {
      setValue('');
    }
  };

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-sm dark:shadow-xl space-y-4 transition-colors">
      <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-3">
        <h3 className="text-xs font-mono font-medium tracking-wider uppercase text-slate-500 dark:text-slate-400 flex items-center gap-2">
          <ArrowDownUp className="w-4 h-4 text-blue-600 dark:text-blue-400" />
          Operation Controls
        </h3>
        <button
          type="button"
          onClick={onReset}
          className="flex items-center gap-1.5 px-3.5 py-1.5 bg-rose-50 dark:bg-rose-500/10 hover:bg-rose-100 dark:hover:bg-rose-500/20 text-rose-600 dark:text-rose-400 border border-rose-200 dark:border-rose-500/30 rounded-xl text-xs font-sans font-semibold transition-colors cursor-pointer"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Reset Collection</span>
        </button>
      </div>

      {validationError && (
        <div className="p-3 bg-rose-500/10 border border-rose-500/30 rounded-xl text-xs font-mono text-rose-400 flex items-center gap-2">
          <span>⚠️ {validationError}</span>
        </div>
      )}

      {/* 1. ARRAYLIST */}
      {isArrayList && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-medium text-slate-400 mb-1">Element / Value</label>
              <input type="text" value={value} onChange={(e) => { setValue(e.target.value); clearError(); }} className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-700 rounded-xl px-3.5 py-2 text-sm text-slate-900 dark:text-white font-mono focus:outline-none focus:border-indigo-500" placeholder="Enter value (e.g. 10)..." autoFocus />
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-400 mb-1">Index (0-based)</label>
              <input type="number" value={index} onChange={(e) => { setIndex(parseInt(e.target.value) || 0); clearError(); }} min="0" className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-700 rounded-xl px-3.5 py-2 text-sm text-slate-900 dark:text-white font-mono focus:outline-none focus:border-indigo-500" />
            </div>
          </div>
          <div className="flex flex-wrap gap-2 pt-1">
            <button type="button" onClick={() => executeOp('ADD')} disabled={loading} className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 cursor-pointer disabled:opacity-50"><Plus className="w-3.5 h-3.5" /> ADD</button>
            <button type="button" onClick={() => executeOp('ADD_AT')} disabled={loading} className="px-3.5 py-2 bg-slate-800 text-indigo-300 border border-indigo-500/30 rounded-lg text-xs font-semibold flex items-center gap-1.5 cursor-pointer">Insert At Index</button>
            <button type="button" onClick={() => executeOp('GET')} disabled={loading} className="px-3.5 py-2 bg-slate-800 text-amber-300 border border-amber-500/30 rounded-lg text-xs font-semibold flex items-center gap-1.5 cursor-pointer"><Search className="w-3.5 h-3.5" /> Get At Index</button>
            <button type="button" onClick={() => executeOp('SET')} disabled={loading} className="px-3.5 py-2 bg-slate-800 text-emerald-300 border border-emerald-500/30 rounded-lg text-xs font-semibold flex items-center gap-1.5 cursor-pointer"><Edit3 className="w-3.5 h-3.5" /> Edit / Set</button>
            <button type="button" onClick={() => executeOp('CONTAINS')} disabled={loading} className="px-3.5 py-2 bg-slate-800 text-sky-300 border border-sky-500/30 rounded-lg text-xs font-semibold flex items-center gap-1.5 cursor-pointer"><Search className="w-3.5 h-3.5" /> Contains Value</button>
            <button type="button" onClick={() => executeOp('INDEX_OF')} disabled={loading} className="px-3.5 py-2 bg-slate-800 text-purple-300 border border-purple-500/30 rounded-lg text-xs font-semibold cursor-pointer">Index Of</button>
            <button type="button" onClick={() => executeOp('REMOVE')} disabled={loading} className="px-3.5 py-2 bg-slate-800 text-rose-400 border border-rose-500/30 rounded-lg text-xs font-semibold flex items-center gap-1.5 cursor-pointer"><Trash2 className="w-3.5 h-3.5" /> Remove At Index</button>
            <button type="button" onClick={() => executeOp('REMOVE_BY_VALUE')} disabled={loading} className="px-3.5 py-2 bg-slate-800 text-rose-300 border border-rose-500/30 rounded-lg text-xs font-semibold flex items-center gap-1.5 cursor-pointer"><Trash2 className="w-3.5 h-3.5" /> Remove By Value</button>
          </div>
        </div>
      )}

      {/* 2. LINKED LIST */}
      {isLinkedList && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-medium text-slate-400 mb-1">Node Data</label>
              <input type="text" value={value} onChange={(e) => { setValue(e.target.value); clearError(); }} className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-700 rounded-xl px-3.5 py-2 text-sm text-slate-900 dark:text-white font-mono focus:outline-none focus:border-blue-500" placeholder="Node data..." />
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-400 mb-1">Index</label>
              <input type="number" value={index} onChange={(e) => { setIndex(parseInt(e.target.value) || 0); clearError(); }} min="0" className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-700 rounded-xl px-3.5 py-2 text-sm text-slate-900 dark:text-white font-mono focus:outline-none focus:border-blue-500" />
            </div>
          </div>
          <div className="flex flex-wrap gap-2 pt-1">
            <button type="button" onClick={() => executeOp('ADD_FIRST')} disabled={loading} className="px-3.5 py-2 bg-indigo-600 text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 cursor-pointer"><Plus className="w-3.5 h-3.5" /> Add First (HEAD)</button>
            <button type="button" onClick={() => executeOp('ADD_LAST')} disabled={loading} className="px-3.5 py-2 bg-violet-600 text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 cursor-pointer"><Plus className="w-3.5 h-3.5" /> Add Last (TAIL)</button>
            <button type="button" onClick={() => executeOp('ADD_AT')} disabled={loading} className="px-3.5 py-2 bg-slate-800 text-indigo-300 border border-indigo-500/30 rounded-lg text-xs font-semibold cursor-pointer">Insert At Index</button>
            <button type="button" onClick={() => executeOp('GET')} disabled={loading} className="px-3.5 py-2 bg-slate-800 text-amber-300 border border-amber-500/30 rounded-lg text-xs font-semibold cursor-pointer">Get At Index</button>
            <button type="button" onClick={() => executeOp('SET')} disabled={loading} className="px-3.5 py-2 bg-slate-800 text-emerald-300 border border-emerald-500/30 rounded-lg text-xs font-semibold cursor-pointer">Set At Index</button>
            <button type="button" onClick={() => executeOp('CONTAINS')} disabled={loading} className="px-3.5 py-2 bg-slate-800 text-sky-300 border border-sky-500/30 rounded-lg text-xs font-semibold cursor-pointer">Contains Value</button>
            <button type="button" onClick={() => executeOp('REMOVE_FIRST')} disabled={loading} className="px-3.5 py-2 bg-slate-800 text-rose-400 border border-rose-500/30 rounded-lg text-xs font-semibold cursor-pointer"><Trash2 className="w-3.5 h-3.5" /> Remove First</button>
            <button type="button" onClick={() => executeOp('REMOVE_LAST')} disabled={loading} className="px-3.5 py-2 bg-slate-800 text-rose-400 border border-rose-500/30 rounded-lg text-xs font-semibold cursor-pointer"><Trash2 className="w-3.5 h-3.5" /> Remove Last</button>
            <button type="button" onClick={() => executeOp('REMOVE')} disabled={loading} className="px-3.5 py-2 bg-slate-800 text-rose-400 border border-rose-500/30 rounded-lg text-xs font-semibold cursor-pointer">Remove At Index</button>
            <button type="button" onClick={() => executeOp('REMOVE_BY_VALUE')} disabled={loading} className="px-3.5 py-2 bg-slate-800 text-rose-300 border border-rose-500/30 rounded-lg text-xs font-semibold cursor-pointer">Remove By Value</button>
          </div>
        </div>
      )}

      {/* 3. HASH MAP */}
      {isHashMap && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-medium text-slate-400 mb-1 flex items-center gap-1"><Key className="w-3 h-3 text-indigo-400" /> Key</label>
              <input type="text" value={key} onChange={(e) => { setKey(e.target.value); clearError(); }} className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-700 rounded-xl px-3.5 py-2 text-sm text-slate-900 dark:text-white font-mono focus:outline-none focus:border-blue-500" placeholder="Key..." />
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-400 mb-1 flex items-center gap-1"><Hash className="w-3 h-3 text-amber-400" /> Value</label>
              <input type="text" value={value} onChange={(e) => { setValue(e.target.value); clearError(); }} className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-700 rounded-xl px-3.5 py-2 text-sm text-slate-900 dark:text-white font-mono focus:outline-none focus:border-blue-500" placeholder="Value..." />
            </div>
          </div>
          <div className="flex flex-wrap gap-2 pt-1">
            <button type="button" onClick={() => executeOp('PUT')} disabled={loading} className="px-4 py-2 bg-emerald-600 text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 cursor-pointer"><Plus className="w-3.5 h-3.5" /> PUT (Insert/Update)</button>
            <button type="button" onClick={() => executeOp('GET')} disabled={loading} className="px-3.5 py-2 bg-slate-800 text-amber-300 border border-amber-500/30 rounded-lg text-xs font-semibold cursor-pointer"><Search className="w-3.5 h-3.5" /> GET Value</button>
            <button type="button" onClick={() => executeOp('CONTAINS_KEY')} disabled={loading} className="px-3.5 py-2 bg-slate-800 text-sky-300 border border-sky-500/30 rounded-lg text-xs font-semibold cursor-pointer">Contains Key</button>
            <button type="button" onClick={() => executeOp('CONTAINS_VALUE')} disabled={loading} className="px-3.5 py-2 bg-slate-800 text-purple-300 border border-purple-500/30 rounded-lg text-xs font-semibold cursor-pointer">Contains Value</button>
            <button type="button" onClick={() => executeOp('REMOVE')} disabled={loading} className="px-3.5 py-2 bg-slate-800 text-rose-400 border border-rose-500/30 rounded-lg text-xs font-semibold cursor-pointer"><Trash2 className="w-3.5 h-3.5" /> REMOVE Key</button>
          </div>
        </div>
      )}

      {/* 4. TREE MAP */}
      {isTreeMap && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-medium text-slate-400 mb-1">BST Key</label>
              <input type="text" value={key} onChange={(e) => { setKey(e.target.value); clearError(); }} className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-700 rounded-xl px-3.5 py-2 text-sm text-slate-900 dark:text-white font-mono focus:outline-none focus:border-indigo-500" placeholder="Key (e.g. 50)..." />
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-400 mb-1">Value</label>
              <input type="text" value={value} onChange={(e) => { setValue(e.target.value); clearError(); }} className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-700 rounded-xl px-3.5 py-2 text-sm text-slate-900 dark:text-white font-mono focus:outline-none focus:border-indigo-500" placeholder="Value..." />
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-2 pt-1">
            <button type="button" onClick={() => executeOp('PUT')} disabled={loading} className="px-4 py-2 bg-indigo-600 text-white rounded-lg text-xs font-semibold cursor-pointer"><Plus className="w-3.5 h-3.5" /> PUT Node</button>
            <button type="button" onClick={() => executeOp('GET')} disabled={loading} className="px-3.5 py-2 bg-slate-800 text-amber-300 border border-amber-500/30 rounded-lg text-xs font-semibold cursor-pointer">GET Node</button>
            <button type="button" onClick={() => executeOp('CONTAINS_KEY')} disabled={loading} className="px-3.5 py-2 bg-slate-800 text-sky-300 border border-sky-500/30 rounded-lg text-xs font-semibold cursor-pointer">Contains Key</button>
            <button type="button" onClick={() => executeOp('FIRST_KEY')} disabled={loading} className="px-3.5 py-2 bg-slate-800 text-emerald-300 border border-emerald-500/30 rounded-lg text-xs font-semibold cursor-pointer">First Key (Min)</button>
            <button type="button" onClick={() => executeOp('LAST_KEY')} disabled={loading} className="px-3.5 py-2 bg-slate-800 text-amber-300 border border-amber-500/30 rounded-lg text-xs font-semibold cursor-pointer">Last Key (Max)</button>
            <button type="button" onClick={() => executeOp('REMOVE')} disabled={loading} className="px-3.5 py-2 bg-slate-800 text-rose-400 border border-rose-500/30 rounded-lg text-xs font-semibold cursor-pointer"><Trash2 className="w-3.5 h-3.5" /> REMOVE Node</button>
            <select value={traversalType} onChange={(e: any) => setTraversalType(e.target.value)} className="bg-slate-950 border border-slate-700 text-slate-300 rounded-lg px-3 py-2 text-xs font-mono">
              <option value="inorder">In-order (LNR)</option>
              <option value="preorder">Pre-order (NLR)</option>
              <option value="postorder">Post-order (LRN)</option>
            </select>
            <button type="button" onClick={() => executeOp('TRAVERSAL')} disabled={loading} className="px-3.5 py-2 bg-slate-800 text-sky-300 border border-sky-500/30 rounded-lg text-xs font-semibold cursor-pointer"><RefreshCw className="w-3.5 h-3.5" /> Run Traversal</button>
          </div>
        </div>
      )}

      {/* 5. PRIORITY QUEUE */}
      {isPriorityQueue && (
        <div className="space-y-4">
          <div>
            <label className="block text-xs font-medium text-slate-400 mb-1">Element Value (Min-Heap)</label>
            <input type="text" value={value} onChange={(e) => { setValue(e.target.value); clearError(); }} className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-700 rounded-xl px-3.5 py-2 text-sm text-slate-900 dark:text-white font-mono focus:outline-none focus:border-indigo-500" placeholder="Enter value (e.g. 10)..." />
          </div>
          <div className="flex flex-wrap gap-2 pt-1">
            <button type="button" onClick={() => executeOp('OFFER')} disabled={loading} className="px-4 py-2 bg-amber-600 text-white rounded-lg text-xs font-semibold cursor-pointer"><Plus className="w-3.5 h-3.5" /> OFFER (Insert & Sift Up)</button>
            <button type="button" onClick={() => executeOp('PEEK')} disabled={loading} className="px-3.5 py-2 bg-slate-800 text-indigo-300 border border-indigo-500/30 rounded-lg text-xs font-semibold cursor-pointer"><Search className="w-3.5 h-3.5" /> PEEK (Root Min)</button>
            <button type="button" onClick={() => executeOp('POLL')} disabled={loading} className="px-3.5 py-2 bg-slate-800 text-rose-400 border border-rose-500/30 rounded-lg text-xs font-semibold cursor-pointer"><Trash2 className="w-3.5 h-3.5" /> POLL (Extract Min)</button>
          </div>
        </div>
      )}

      {/* 6. STACK */}
      {isStack && (
        <div className="space-y-4">
          <div>
            <label className="block text-xs font-medium text-slate-400 mb-1">Stack Element</label>
            <input type="text" value={value} onChange={(e) => { setValue(e.target.value); clearError(); }} className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-700 rounded-xl px-3.5 py-2 text-sm text-slate-900 dark:text-white font-mono focus:outline-none focus:border-indigo-500" placeholder="Enter value to push..." autoFocus />
          </div>
          <div className="flex flex-wrap gap-2 pt-1">
            <button type="button" onClick={() => executeOp('PUSH')} disabled={loading} className="px-4 py-2 bg-indigo-600 text-white rounded-lg text-xs font-semibold cursor-pointer flex items-center gap-1.5"><Plus className="w-3.5 h-3.5" /> PUSH</button>
            <button type="button" onClick={() => executeOp('POP')} disabled={loading} className="px-3.5 py-2 bg-slate-800 text-rose-400 border border-rose-500/30 rounded-lg text-xs font-semibold cursor-pointer flex items-center gap-1.5"><Trash2 className="w-3.5 h-3.5" /> POP</button>
            <button type="button" onClick={() => executeOp('PEEK')} disabled={loading} className="px-3.5 py-2 bg-slate-800 text-amber-300 border border-amber-500/30 rounded-lg text-xs font-semibold cursor-pointer flex items-center gap-1.5"><Search className="w-3.5 h-3.5" /> PEEK (Top)</button>
          </div>
        </div>
      )}

      {/* 7. QUEUE */}
      {isQueue && (
        <div className="space-y-4">
          <div>
            <label className="block text-xs font-medium text-slate-400 mb-1">Queue Element</label>
            <input type="text" value={value} onChange={(e) => { setValue(e.target.value); clearError(); }} className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-700 rounded-xl px-3.5 py-2 text-sm text-slate-900 dark:text-white font-mono focus:outline-none focus:border-indigo-500" placeholder="Enter value to enqueue..." autoFocus />
          </div>
          <div className="flex flex-wrap gap-2 pt-1">
            <button type="button" onClick={() => executeOp('ENQUEUE')} disabled={loading} className="px-4 py-2 bg-indigo-600 text-white rounded-lg text-xs font-semibold cursor-pointer flex items-center gap-1.5"><Plus className="w-3.5 h-3.5" /> ENQUEUE</button>
            <button type="button" onClick={() => executeOp('DEQUEUE')} disabled={loading} className="px-3.5 py-2 bg-slate-800 text-rose-400 border border-rose-500/30 rounded-lg text-xs font-semibold cursor-pointer flex items-center gap-1.5"><Trash2 className="w-3.5 h-3.5" /> DEQUEUE</button>
            <button type="button" onClick={() => executeOp('PEEK')} disabled={loading} className="px-3.5 py-2 bg-slate-800 text-amber-300 border border-amber-500/30 rounded-lg text-xs font-semibold cursor-pointer flex items-center gap-1.5"><Search className="w-3.5 h-3.5" /> PEEK (Front)</button>
          </div>
        </div>
      )}

      {/* 8. DEQUE */}
      {isDeque && (
        <div className="space-y-4">
          <div>
            <label className="block text-xs font-medium text-slate-400 mb-1">Deque Element</label>
            <input type="text" value={value} onChange={(e) => { setValue(e.target.value); clearError(); }} className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-700 rounded-xl px-3.5 py-2 text-sm text-slate-900 dark:text-white font-mono focus:outline-none focus:border-indigo-500" placeholder="Enter value..." autoFocus />
          </div>
          <div className="flex flex-wrap gap-2 pt-1">
            <button type="button" onClick={() => executeOp('ADD_FIRST')} disabled={loading} className="px-3.5 py-2 bg-indigo-600 text-white rounded-lg text-xs font-semibold cursor-pointer"><Plus className="w-3.5 h-3.5" /> ADD FIRST</button>
            <button type="button" onClick={() => executeOp('ADD_LAST')} disabled={loading} className="px-3.5 py-2 bg-violet-600 text-white rounded-lg text-xs font-semibold cursor-pointer"><Plus className="w-3.5 h-3.5" /> ADD LAST</button>
            <button type="button" onClick={() => executeOp('REMOVE_FIRST')} disabled={loading} className="px-3.5 py-2 bg-slate-800 text-rose-400 border border-rose-500/30 rounded-lg text-xs font-semibold cursor-pointer"><Trash2 className="w-3.5 h-3.5" /> REMOVE FIRST</button>
            <button type="button" onClick={() => executeOp('REMOVE_LAST')} disabled={loading} className="px-3.5 py-2 bg-slate-800 text-rose-400 border border-rose-500/30 rounded-lg text-xs font-semibold cursor-pointer"><Trash2 className="w-3.5 h-3.5" /> REMOVE LAST</button>
            <button type="button" onClick={() => executeOp('PEEK_FIRST')} disabled={loading} className="px-3.5 py-2 bg-slate-800 text-amber-300 border border-amber-500/30 rounded-lg text-xs font-semibold cursor-pointer">PEEK FIRST</button>
            <button type="button" onClick={() => executeOp('PEEK_LAST')} disabled={loading} className="px-3.5 py-2 bg-slate-800 text-amber-300 border border-amber-500/30 rounded-lg text-xs font-semibold cursor-pointer">PEEK LAST</button>
          </div>
        </div>
      )}

      {/* 9. HASH SET */}
      {isHashSet && (
        <div className="space-y-4">
          <div>
            <label className="block text-xs font-medium text-slate-400 mb-1">Set Element Value</label>
            <input type="text" value={value} onChange={(e) => { setValue(e.target.value); clearError(); }} className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-700 rounded-xl px-3.5 py-2 text-sm text-slate-900 dark:text-white font-mono focus:outline-none focus:border-indigo-500" placeholder="Enter element..." autoFocus />
          </div>
          <div className="flex flex-wrap gap-2 pt-1">
            <button type="button" onClick={() => executeOp('ADD')} disabled={loading} className="px-4 py-2 bg-emerald-600 text-white rounded-lg text-xs font-semibold cursor-pointer flex items-center gap-1.5"><Plus className="w-3.5 h-3.5" /> ADD</button>
            <button type="button" onClick={() => executeOp('REMOVE')} disabled={loading} className="px-3.5 py-2 bg-slate-800 text-rose-400 border border-rose-500/30 rounded-lg text-xs font-semibold cursor-pointer flex items-center gap-1.5"><Trash2 className="w-3.5 h-3.5" /> REMOVE</button>
            <button type="button" onClick={() => executeOp('CONTAINS')} disabled={loading} className="px-3.5 py-2 bg-slate-800 text-sky-300 border border-sky-500/30 rounded-lg text-xs font-semibold cursor-pointer flex items-center gap-1.5"><Search className="w-3.5 h-3.5" /> CONTAINS</button>
          </div>
        </div>
      )}

      {/* 10. BST */}
      {isBST && (
        <div className="space-y-4">
          <div>
            <label className="block text-xs font-medium text-slate-400 mb-1">BST Node Key (Comparable)</label>
            <input type="text" value={value} onChange={(e) => { setValue(e.target.value); clearError(); }} className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-700 rounded-xl px-3.5 py-2 text-sm text-slate-900 dark:text-white font-mono focus:outline-none focus:border-indigo-500" placeholder="Enter key (e.g. 50)..." autoFocus />
          </div>
          <div className="flex flex-wrap items-center gap-2 pt-1">
            <button type="button" onClick={() => executeOp('INSERT')} disabled={loading} className="px-4 py-2 bg-indigo-600 text-white rounded-lg text-xs font-semibold cursor-pointer flex items-center gap-1.5"><Plus className="w-3.5 h-3.5" /> INSERT</button>
            <button type="button" onClick={() => executeOp('SEARCH')} disabled={loading} className="px-3.5 py-2 bg-slate-800 text-sky-300 border border-sky-500/30 rounded-lg text-xs font-semibold cursor-pointer flex items-center gap-1.5"><Search className="w-3.5 h-3.5" /> SEARCH</button>
            <button type="button" onClick={() => executeOp('DELETE')} disabled={loading} className="px-3.5 py-2 bg-slate-800 text-rose-400 border border-rose-500/30 rounded-lg text-xs font-semibold cursor-pointer flex items-center gap-1.5"><Trash2 className="w-3.5 h-3.5" /> DELETE</button>
            <select value={traversalType} onChange={(e: any) => setTraversalType(e.target.value)} className="bg-slate-950 border border-slate-700 text-slate-300 rounded-lg px-3 py-2 text-xs font-mono">
              <option value="inorder">In-Order</option>
              <option value="preorder">Pre-Order</option>
              <option value="postorder">Post-Order</option>
            </select>
            <button type="button" onClick={() => executeOp('TRAVERSAL')} disabled={loading} className="px-3.5 py-2 bg-slate-800 text-amber-300 border border-amber-500/30 rounded-lg text-xs font-semibold cursor-pointer flex items-center gap-1.5"><RefreshCw className="w-3.5 h-3.5" /> TRAVERSAL</button>
          </div>
        </div>
      )}

      {/* 11. HEAP */}
      {isHeap && (
        <div className="space-y-4">
          <div>
            <label className="block text-xs font-medium text-slate-400 mb-1">Heap Value (Min-Heap)</label>
            <input type="text" value={value} onChange={(e) => { setValue(e.target.value); clearError(); }} className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-700 rounded-xl px-3.5 py-2 text-sm text-slate-900 dark:text-white font-mono focus:outline-none focus:border-indigo-500" placeholder="Enter value (e.g. 10)..." autoFocus />
          </div>
          <div className="flex flex-wrap gap-2 pt-1">
            <button type="button" onClick={() => executeOp('INSERT')} disabled={loading} className="px-4 py-2 bg-amber-600 text-white rounded-lg text-xs font-semibold cursor-pointer flex items-center gap-1.5"><Plus className="w-3.5 h-3.5" /> INSERT</button>
            <button type="button" onClick={() => executeOp('EXTRACT_MIN')} disabled={loading} className="px-3.5 py-2 bg-slate-800 text-rose-400 border border-rose-500/30 rounded-lg text-xs font-semibold cursor-pointer flex items-center gap-1.5"><Trash2 className="w-3.5 h-3.5" /> EXTRACT MIN</button>
            <button type="button" onClick={() => executeOp('PEEK')} disabled={loading} className="px-3.5 py-2 bg-slate-800 text-indigo-300 border border-indigo-500/30 rounded-lg text-xs font-semibold cursor-pointer flex items-center gap-1.5"><Search className="w-3.5 h-3.5" /> PEEK (Min Root)</button>
          </div>
        </div>
      )}

      {/* 12. TRIE */}
      {isTrie && (
        <div className="space-y-4">
          <div>
            <label className="block text-xs font-medium text-slate-400 mb-1">Word / Prefix</label>
            <input type="text" value={value} onChange={(e) => { setValue(e.target.value); clearError(); }} className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-700 rounded-xl px-3.5 py-2 text-sm text-slate-900 dark:text-white font-mono focus:outline-none focus:border-indigo-500" placeholder="Enter word (e.g. java, app)..." autoFocus />
          </div>
          <div className="flex flex-wrap gap-2 pt-1">
            <button type="button" onClick={() => executeOp('INSERT')} disabled={loading} className="px-4 py-2 bg-indigo-600 text-white rounded-lg text-xs font-semibold cursor-pointer flex items-center gap-1.5"><Plus className="w-3.5 h-3.5" /> INSERT Word</button>
            <button type="button" onClick={() => executeOp('SEARCH')} disabled={loading} className="px-3.5 py-2 bg-slate-800 text-sky-300 border border-sky-500/30 rounded-lg text-xs font-semibold cursor-pointer flex items-center gap-1.5"><Search className="w-3.5 h-3.5" /> SEARCH Word</button>
            <button type="button" onClick={() => executeOp('STARTS_WITH')} disabled={loading} className="px-3.5 py-2 bg-slate-800 text-purple-300 border border-purple-500/30 rounded-lg text-xs font-semibold cursor-pointer flex items-center gap-1.5"><Search className="w-3.5 h-3.5" /> PREFIX Search</button>
            <button type="button" onClick={() => executeOp('DELETE')} disabled={loading} className="px-3.5 py-2 bg-slate-800 text-rose-400 border border-rose-500/30 rounded-lg text-xs font-semibold cursor-pointer flex items-center gap-1.5"><Trash2 className="w-3.5 h-3.5" /> DELETE Word</button>
          </div>
        </div>
      )}

      {/* 13. GRAPH */}
      {isGraph && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="block text-xs font-medium text-slate-400 mb-1">Vertex Name / Start</label>
              <input type="text" value={value} onChange={(e) => { setValue(e.target.value); clearError(); }} className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-700 rounded-xl px-3.5 py-2 text-sm text-slate-900 dark:text-white font-mono focus:outline-none focus:border-indigo-500" placeholder="Vertex (e.g. A)..." />
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-400 mb-1">Edge From</label>
              <input type="text" value={from} onChange={(e) => { setFrom(e.target.value); clearError(); }} className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-700 rounded-xl px-3.5 py-2 text-sm text-slate-900 dark:text-white font-mono focus:outline-none focus:border-indigo-500" placeholder="From (e.g. A)..." />
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-400 mb-1">Edge To</label>
              <input type="text" value={to} onChange={(e) => { setTo(e.target.value); clearError(); }} className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-700 rounded-xl px-3.5 py-2 text-sm text-slate-900 dark:text-white font-mono focus:outline-none focus:border-indigo-500" placeholder="To (e.g. B)..." />
            </div>
          </div>
          <div className="flex flex-wrap gap-2 pt-1">
            <button type="button" onClick={() => executeOp('ADD_VERTEX')} disabled={loading} className="px-3.5 py-2 bg-indigo-600 text-white rounded-lg text-xs font-semibold cursor-pointer"><Plus className="w-3.5 h-3.5" /> Add Vertex</button>
            <button type="button" onClick={() => executeOp('ADD_EDGE')} disabled={loading} className="px-3.5 py-2 bg-emerald-600 text-white rounded-lg text-xs font-semibold cursor-pointer"><Plus className="w-3.5 h-3.5" /> Add Edge</button>
            <button type="button" onClick={() => executeOp('REMOVE_EDGE')} disabled={loading} className="px-3.5 py-2 bg-slate-800 text-rose-400 border border-rose-500/30 rounded-lg text-xs font-semibold cursor-pointer"><Trash2 className="w-3.5 h-3.5" /> Remove Edge</button>
            <button type="button" onClick={() => executeOp('REMOVE_VERTEX')} disabled={loading} className="px-3.5 py-2 bg-slate-800 text-rose-400 border border-rose-500/30 rounded-lg text-xs font-semibold cursor-pointer"><Trash2 className="w-3.5 h-3.5" /> Remove Vertex</button>
            <button type="button" onClick={() => executeOp('BFS')} disabled={loading} className="px-3.5 py-2 bg-slate-800 text-sky-300 border border-sky-500/30 rounded-lg text-xs font-semibold cursor-pointer flex items-center gap-1.5"><RefreshCw className="w-3.5 h-3.5" /> Run BFS</button>
            <button type="button" onClick={() => executeOp('DFS')} disabled={loading} className="px-3.5 py-2 bg-slate-800 text-amber-300 border border-amber-500/30 rounded-lg text-xs font-semibold cursor-pointer flex items-center gap-1.5"><RefreshCw className="w-3.5 h-3.5" /> Run DFS</button>
          </div>
        </div>
      )}

      {/* 14. DISJOINT SET */}
      {isDisjointSet && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-medium text-slate-400 mb-1">Element / Element A</label>
              <input type="text" value={elementA} onChange={(e) => { setElementA(e.target.value); setValue(e.target.value); clearError(); }} className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-700 rounded-xl px-3.5 py-2 text-sm text-slate-900 dark:text-white font-mono focus:outline-none focus:border-indigo-500" placeholder="Element A (e.g. 1)..." />
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-400 mb-1">Element B (For Union/Connected)</label>
              <input type="text" value={elementB} onChange={(e) => { setElementB(e.target.value); clearError(); }} className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-700 rounded-xl px-3.5 py-2 text-sm text-slate-900 dark:text-white font-mono focus:outline-none focus:border-indigo-500" placeholder="Element B (e.g. 2)..." />
            </div>
          </div>
          <div className="flex flex-wrap gap-2 pt-1">
            <button type="button" onClick={() => executeOp('MAKE_SET')} disabled={loading} className="px-3.5 py-2 bg-indigo-600 text-white rounded-lg text-xs font-semibold cursor-pointer flex items-center gap-1.5"><Plus className="w-3.5 h-3.5" /> MAKE SET</button>
            <button type="button" onClick={() => executeOp('FIND')} disabled={loading} className="px-3.5 py-2 bg-slate-800 text-sky-300 border border-sky-500/30 rounded-lg text-xs font-semibold cursor-pointer flex items-center gap-1.5"><Search className="w-3.5 h-3.5" /> FIND Root</button>
            <button type="button" onClick={() => executeOp('UNION')} disabled={loading} className="px-3.5 py-2 bg-emerald-600 text-white rounded-lg text-xs font-semibold cursor-pointer flex items-center gap-1.5"><Network className="w-3.5 h-3.5" /> UNION</button>
            <button type="button" onClick={() => executeOp('CONNECTED')} disabled={loading} className="px-3.5 py-2 bg-slate-800 text-amber-300 border border-amber-500/30 rounded-lg text-xs font-semibold cursor-pointer flex items-center gap-1.5"><Search className="w-3.5 h-3.5" /> CONNECTED Check</button>
          </div>
        </div>
      )}

      {/* 15. CIRCULAR LINKED LIST */}
      {isCircularLinkedList && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-medium text-slate-400 mb-1">Node Value</label>
              <input type="text" value={value} onChange={(e) => { setValue(e.target.value); clearError(); }} className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-700 rounded-xl px-3.5 py-2 text-sm text-slate-900 dark:text-white font-mono focus:outline-none focus:border-indigo-500" placeholder="Node value..." />
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-400 mb-1">Index</label>
              <input type="number" value={index} onChange={(e) => { setIndex(parseInt(e.target.value) || 0); clearError(); }} min="0" className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-700 rounded-xl px-3.5 py-2 text-sm text-slate-900 dark:text-white font-mono focus:outline-none focus:border-indigo-500" />
            </div>
          </div>
          <div className="flex flex-wrap gap-2 pt-1">
            <button type="button" onClick={() => executeOp('ADD_FIRST')} disabled={loading} className="px-3.5 py-2 bg-indigo-600 text-white rounded-lg text-xs font-semibold cursor-pointer"><Plus className="w-3.5 h-3.5" /> Add First (HEAD)</button>
            <button type="button" onClick={() => executeOp('ADD_LAST')} disabled={loading} className="px-3.5 py-2 bg-violet-600 text-white rounded-lg text-xs font-semibold cursor-pointer"><Plus className="w-3.5 h-3.5" /> Add Last (TAIL)</button>
            <button type="button" onClick={() => executeOp('ADD_AT')} disabled={loading} className="px-3.5 py-2 bg-slate-800 text-indigo-300 border border-indigo-500/30 rounded-lg text-xs font-semibold cursor-pointer">Insert At Index</button>
            <button type="button" onClick={() => executeOp('GET')} disabled={loading} className="px-3.5 py-2 bg-slate-800 text-amber-300 border border-amber-500/30 rounded-lg text-xs font-semibold cursor-pointer">Get At Index</button>
            <button type="button" onClick={() => executeOp('SET')} disabled={loading} className="px-3.5 py-2 bg-slate-800 text-emerald-300 border border-emerald-500/30 rounded-lg text-xs font-semibold cursor-pointer"><Edit3 className="w-3.5 h-3.5" /> Edit / Set</button>
            <button type="button" onClick={() => executeOp('SEARCH')} disabled={loading} className="px-3.5 py-2 bg-slate-800 text-sky-300 border border-sky-500/30 rounded-lg text-xs font-semibold cursor-pointer"><Search className="w-3.5 h-3.5" /> Search Value</button>
            <button type="button" onClick={() => executeOp('REMOVE_FIRST')} disabled={loading} className="px-3.5 py-2 bg-slate-800 text-rose-400 border border-rose-500/30 rounded-lg text-xs font-semibold cursor-pointer"><Trash2 className="w-3.5 h-3.5" /> Remove First</button>
            <button type="button" onClick={() => executeOp('REMOVE_LAST')} disabled={loading} className="px-3.5 py-2 bg-slate-800 text-rose-400 border border-rose-500/30 rounded-lg text-xs font-semibold cursor-pointer"><Trash2 className="w-3.5 h-3.5" /> Remove Last</button>
            <button type="button" onClick={() => executeOp('REMOVE')} disabled={loading} className="px-3.5 py-2 bg-slate-800 text-rose-400 border border-rose-500/30 rounded-lg text-xs font-semibold cursor-pointer">Remove At Index</button>
          </div>
        </div>
      )}
    </div>
  );
};
