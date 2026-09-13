import React, { useState } from 'react';
import { Plus, Search, Trash2, RotateCcw, ArrowDownUp, RefreshCw, Key, Hash, Edit3 } from 'lucide-react';
import type { CollectionType } from '../../types/collections';

interface ControlPanelProps {
  collectionType: CollectionType;
  onExecute: (operation: string, params: { value?: string; key?: string; index?: number; type?: string }) => void;
  onReset: () => void;
  loading?: boolean;
}

export const ControlPanel: React.FC<ControlPanelProps> = ({
  collectionType,
  onExecute,
  onReset,
  loading = false
}) => {
  const [value, setValue] = useState<string>('10');
  const [key, setKey] = useState<string>('Java');
  const [index, setIndex] = useState<number>(0);
  const [traversalType, setTraversalType] = useState<'inorder' | 'preorder' | 'postorder'>('inorder');

  const handleSubmit = (e: React.FormEvent, op: string) => {
    e.preventDefault();
    if (loading) return;
    const finalValue = value.trim() !== '' ? value.trim() : '10';
    const finalKey = key.trim() !== '' ? key.trim() : 'Key1';
    onExecute(op, { value: finalValue, key: finalKey, index: index >= 0 ? index : 0, type: traversalType });
  };

  const normalizedType = collectionType ? collectionType.toUpperCase().replace('-', '_') : 'ARRAY_LIST';
  const isArrayList = normalizedType === 'ARRAY_LIST' || normalizedType === 'ARRAYLIST';
  const isLinkedList = normalizedType === 'LINKED_LIST' || normalizedType === 'LINKEDLIST';
  const isHashMap = normalizedType === 'HASH_MAP' || normalizedType === 'HASHMAP';
  const isTreeMap = normalizedType === 'TREE_MAP' || normalizedType === 'TREEMAP';
  const isPriorityQueue = normalizedType === 'PRIORITY_QUEUE' || normalizedType === 'PRIORITYQUEUE';

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-sm dark:shadow-xl space-y-4 transition-colors">
      <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-3">
        <h3 className="text-xs font-mono font-medium tracking-wider uppercase text-slate-500 dark:text-slate-400 flex items-center gap-2">
          <ArrowDownUp className="w-4 h-4 text-blue-600 dark:text-blue-400" />
          Operation Controls
        </h3>
        <button
          onClick={onReset}
          className="flex items-center gap-1.5 px-3.5 py-1.5 bg-rose-50 dark:bg-rose-500/10 hover:bg-rose-100 dark:hover:bg-rose-500/20 text-rose-600 dark:text-rose-400 border border-rose-200 dark:border-rose-500/30 rounded-xl text-xs font-sans font-semibold transition-colors"
          title="Reset this collection to empty state"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Reset Collection</span>
        </button>
      </div>

      {/* ARRAY LIST CONTROLS */}
      {isArrayList && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-medium text-slate-400 mb-1">Value / New Value</label>
              <input
                type="text"
                value={value}
                onChange={(e) => setValue(e.target.value)}
                className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-700 rounded-xl px-3.5 py-2 text-sm text-slate-900 dark:text-white font-mono focus:outline-none focus:border-blue-500 transition-colors"
                placeholder="Enter value..."
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-400 mb-1">Index (For Insert / Get / Edit / Remove)</label>
              <input
                type="number"
                value={index}
                onChange={(e) => setIndex(parseInt(e.target.value) || 0)}
                min="0"
                className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-700 rounded-xl px-3.5 py-2 text-sm text-slate-900 dark:text-white font-mono focus:outline-none focus:border-blue-500 transition-colors"
              />
            </div>
          </div>

          <div className="flex flex-wrap gap-2 pt-2">
            <button
              type="button"
              onClick={(e) => handleSubmit(e, 'ADD')}
              disabled={loading}
              className="flex items-center gap-1.5 px-3.5 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-xs font-semibold shadow-md shadow-indigo-600/20 transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Plus className="w-3.5 h-3.5" /> Add (Append)
            </button>
            <button
              type="button"
              onClick={(e) => handleSubmit(e, 'ADD_AT')}
              disabled={loading}
              className="flex items-center gap-1.5 px-3.5 py-2 bg-slate-800 hover:bg-slate-700 text-indigo-300 border border-indigo-500/30 rounded-lg text-xs font-semibold transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Insert At Index
            </button>
            <button
              type="button"
              onClick={(e) => handleSubmit(e, 'GET')}
              disabled={loading}
              className="flex items-center gap-1.5 px-3.5 py-2 bg-slate-800 hover:bg-slate-700 text-amber-300 border border-amber-500/30 rounded-lg text-xs font-semibold transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Search className="w-3.5 h-3.5" /> Get At Index
            </button>
            <button
              type="button"
              onClick={(e) => handleSubmit(e, 'SET')}
              disabled={loading}
              className="flex items-center gap-1.5 px-3.5 py-2 bg-slate-800 hover:bg-slate-700 text-emerald-300 border border-emerald-500/30 rounded-lg text-xs font-semibold transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
              title="Replace element at index with new value"
            >
              <Edit3 className="w-3.5 h-3.5" /> Edit / Update
            </button>
            <button
              type="button"
              onClick={(e) => handleSubmit(e, 'CONTAINS')}
              disabled={loading}
              className="flex items-center gap-1.5 px-3.5 py-2 bg-slate-800 hover:bg-slate-700 text-sky-300 border border-sky-500/30 rounded-lg text-xs font-semibold transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Search className="w-3.5 h-3.5" /> Contains Value
            </button>
            <button
              type="button"
              onClick={(e) => handleSubmit(e, 'INDEX_OF')}
              disabled={loading}
              className="flex items-center gap-1.5 px-3.5 py-2 bg-slate-800 hover:bg-slate-700 text-purple-300 border border-purple-500/30 rounded-lg text-xs font-semibold transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Index Of Value
            </button>
            <button
              type="button"
              onClick={(e) => handleSubmit(e, 'REMOVE')}
              disabled={loading}
              className="flex items-center gap-1.5 px-3.5 py-2 bg-slate-800 hover:bg-slate-700 text-rose-400 border border-rose-500/30 rounded-lg text-xs font-semibold transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Trash2 className="w-3.5 h-3.5" /> Remove At Index
            </button>
            <button
              type="button"
              onClick={(e) => handleSubmit(e, 'REMOVE_BY_VALUE')}
              disabled={loading}
              className="flex items-center gap-1.5 px-3.5 py-2 bg-slate-800 hover:bg-slate-700 text-rose-300 border border-rose-500/30 rounded-lg text-xs font-semibold transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Trash2 className="w-3.5 h-3.5" /> Remove By Value
            </button>
          </div>
        </div>
      )}

      {/* LINKED LIST CONTROLS */}
      {isLinkedList && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-medium text-slate-400 mb-1">Node Data</label>
              <input
                type="text"
                value={value}
                onChange={(e) => setValue(e.target.value)}
                className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-700 rounded-xl px-3.5 py-2 text-sm text-slate-900 dark:text-white font-mono focus:outline-none focus:border-blue-500 transition-colors"
                placeholder="Enter node data..."
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-400 mb-1">Index (For Add / Get / Set / Remove)</label>
              <input
                type="number"
                value={index}
                onChange={(e) => setIndex(parseInt(e.target.value) || 0)}
                min="0"
                className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-700 rounded-xl px-3.5 py-2 text-sm text-slate-900 dark:text-white font-mono focus:outline-none focus:border-blue-500 transition-colors"
              />
            </div>
          </div>

          <div className="flex flex-wrap gap-2 pt-2">
            <button
              type="button"
              onClick={(e) => handleSubmit(e, 'ADD_FIRST')}
              disabled={loading}
              className="flex items-center gap-1.5 px-3.5 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-xs font-semibold transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Plus className="w-3.5 h-3.5" /> Add First (HEAD)
            </button>
            <button
              type="button"
              onClick={(e) => handleSubmit(e, 'ADD_LAST')}
              disabled={loading}
              className="flex items-center gap-1.5 px-3.5 py-2 bg-violet-600 hover:bg-violet-500 text-white rounded-lg text-xs font-semibold transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Plus className="w-3.5 h-3.5" /> Add Last (TAIL)
            </button>
            <button
              type="button"
              onClick={(e) => handleSubmit(e, 'ADD_AT')}
              disabled={loading}
              className="flex items-center gap-1.5 px-3.5 py-2 bg-slate-800 hover:bg-slate-700 text-indigo-300 border border-indigo-500/30 rounded-lg text-xs font-semibold transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Insert At Index
            </button>

            <button
              type="button"
              onClick={(e) => handleSubmit(e, 'GET')}
              disabled={loading}
              className="flex items-center gap-1.5 px-3.5 py-2 bg-slate-800 hover:bg-slate-700 text-amber-300 border border-amber-500/30 rounded-lg text-xs font-semibold transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Search className="w-3.5 h-3.5" /> Get At Index
            </button>
            <button
              type="button"
              onClick={(e) => handleSubmit(e, 'SET')}
              disabled={loading}
              className="flex items-center gap-1.5 px-3.5 py-2 bg-slate-800 hover:bg-slate-700 text-emerald-300 border border-emerald-500/30 rounded-lg text-xs font-semibold transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Set At Index
            </button>
            <button
              type="button"
              onClick={(e) => handleSubmit(e, 'CONTAINS')}
              disabled={loading}
              className="flex items-center gap-1.5 px-3.5 py-2 bg-slate-800 hover:bg-slate-700 text-sky-300 border border-sky-500/30 rounded-lg text-xs font-semibold transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Search className="w-3.5 h-3.5" /> Contains Value
            </button>
            <button
              type="button"
              onClick={(e) => handleSubmit(e, 'INDEX_OF')}
              disabled={loading}
              className="flex items-center gap-1.5 px-3.5 py-2 bg-slate-800 hover:bg-slate-700 text-purple-300 border border-purple-500/30 rounded-lg text-xs font-semibold transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Index Of Value
            </button>

            <button
              type="button"
              onClick={(e) => handleSubmit(e, 'REMOVE_FIRST')}
              disabled={loading}
              className="flex items-center gap-1.5 px-3.5 py-2 bg-slate-800 hover:bg-slate-700 text-rose-400 border border-rose-500/30 rounded-lg text-xs font-semibold transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Trash2 className="w-3.5 h-3.5" /> Remove First
            </button>
            <button
              type="button"
              onClick={(e) => handleSubmit(e, 'REMOVE_LAST')}
              disabled={loading}
              className="flex items-center gap-1.5 px-3.5 py-2 bg-slate-800 hover:bg-slate-700 text-rose-400 border border-rose-500/30 rounded-lg text-xs font-semibold transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Trash2 className="w-3.5 h-3.5" /> Remove Last
            </button>
            <button
              type="button"
              onClick={(e) => handleSubmit(e, 'REMOVE')}
              disabled={loading}
              className="flex items-center gap-1.5 px-3.5 py-2 bg-slate-800 hover:bg-slate-700 text-rose-400 border border-rose-500/30 rounded-lg text-xs font-semibold transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Remove At Index
            </button>
            <button
              type="button"
              onClick={(e) => handleSubmit(e, 'REMOVE_BY_VALUE')}
              disabled={loading}
              className="flex items-center gap-1.5 px-3.5 py-2 bg-slate-800 hover:bg-slate-700 text-rose-300 border border-rose-500/30 rounded-lg text-xs font-semibold transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Trash2 className="w-3.5 h-3.5" /> Remove By Value
            </button>
          </div>
        </div>
      )}

      {/* HASH MAP CONTROLS */}
      {isHashMap && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-medium text-slate-400 mb-1 flex items-center gap-1">
                <Key className="w-3 h-3 text-indigo-400" /> Key
              </label>
              <input
                type="text"
                value={key}
                onChange={(e) => setKey(e.target.value)}
                className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-700 rounded-xl px-3.5 py-2 text-sm text-slate-900 dark:text-white font-mono focus:outline-none focus:border-blue-500 transition-colors"
                placeholder="Enter key (e.g. Java)..."
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-400 mb-1 flex items-center gap-1">
                <Hash className="w-3 h-3 text-amber-400" /> Value
              </label>
              <input
                type="text"
                value={value}
                onChange={(e) => setValue(e.target.value)}
                className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-700 rounded-xl px-3.5 py-2 text-sm text-slate-900 dark:text-white font-mono focus:outline-none focus:border-blue-500 transition-colors"
                placeholder="Enter value (e.g. 95)..."
              />
            </div>
          </div>

          <div className="flex flex-wrap gap-2 pt-2">
            <button
              type="button"
              onClick={(e) => handleSubmit(e, 'PUT')}
              disabled={loading}
              className="flex items-center gap-1.5 px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-xs font-semibold shadow-md shadow-emerald-600/20 transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Plus className="w-3.5 h-3.5" /> PUT (Insert / Update)
            </button>
            <button
              type="button"
              onClick={(e) => handleSubmit(e, 'GET')}
              disabled={loading}
              className="flex items-center gap-1.5 px-3.5 py-2 bg-slate-800 hover:bg-slate-700 text-amber-300 border border-amber-500/30 rounded-lg text-xs font-semibold transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Search className="w-3.5 h-3.5" /> GET Value
            </button>
            <button
              type="button"
              onClick={(e) => handleSubmit(e, 'CONTAINS_KEY')}
              disabled={loading}
              className="flex items-center gap-1.5 px-3.5 py-2 bg-slate-800 hover:bg-slate-700 text-sky-300 border border-sky-500/30 rounded-lg text-xs font-semibold transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Search className="w-3.5 h-3.5" /> Contains Key
            </button>
            <button
              type="button"
              onClick={(e) => handleSubmit(e, 'CONTAINS_VALUE')}
              disabled={loading}
              className="flex items-center gap-1.5 px-3.5 py-2 bg-slate-800 hover:bg-slate-700 text-purple-300 border border-purple-500/30 rounded-lg text-xs font-semibold transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Search className="w-3.5 h-3.5" /> Contains Value
            </button>
            <button
              type="button"
              onClick={(e) => handleSubmit(e, 'REMOVE')}
              disabled={loading}
              className="flex items-center gap-1.5 px-3.5 py-2 bg-slate-800 hover:bg-slate-700 text-rose-400 border border-rose-500/30 rounded-lg text-xs font-semibold transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Trash2 className="w-3.5 h-3.5" /> REMOVE Key
            </button>
          </div>
        </div>
      )}

      {/* TREE MAP CONTROLS */}
      {isTreeMap && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-medium text-slate-400 mb-1">BST Key (Comparable)</label>
              <input
                type="text"
                value={key}
                onChange={(e) => setKey(e.target.value)}
                className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white font-mono focus:outline-none focus:border-indigo-500"
                placeholder="Enter key (e.g. 50)..."
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-400 mb-1">Value</label>
              <input
                type="text"
                value={value}
                onChange={(e) => setValue(e.target.value)}
                className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white font-mono focus:outline-none focus:border-indigo-500"
                placeholder="Enter value..."
              />
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2 pt-2">
            <button
              type="button"
              onClick={(e) => handleSubmit(e, 'PUT')}
              disabled={loading}
              className="flex items-center gap-1.5 px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-xs font-semibold shadow-md shadow-indigo-600/20 transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Plus className="w-3.5 h-3.5" /> PUT Node
            </button>
            <button
              type="button"
              onClick={(e) => handleSubmit(e, 'GET')}
              disabled={loading}
              className="flex items-center gap-1.5 px-3.5 py-2 bg-slate-800 hover:bg-slate-700 text-amber-300 border border-amber-500/30 rounded-lg text-xs font-semibold transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Search className="w-3.5 h-3.5" /> GET Node
            </button>
            <button
              type="button"
              onClick={(e) => handleSubmit(e, 'CONTAINS_KEY')}
              disabled={loading}
              className="flex items-center gap-1.5 px-3.5 py-2 bg-slate-800 hover:bg-slate-700 text-sky-300 border border-sky-500/30 rounded-lg text-xs font-semibold transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Search className="w-3.5 h-3.5" /> Contains Key
            </button>
            <button
              type="button"
              onClick={(e) => handleSubmit(e, 'FIRST_KEY')}
              disabled={loading}
              className="flex items-center gap-1.5 px-3.5 py-2 bg-slate-800 hover:bg-slate-700 text-emerald-300 border border-emerald-500/30 rounded-lg text-xs font-semibold transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
            >
              First Key (Min)
            </button>
            <button
              type="button"
              onClick={(e) => handleSubmit(e, 'LAST_KEY')}
              disabled={loading}
              className="flex items-center gap-1.5 px-3.5 py-2 bg-slate-800 hover:bg-slate-700 text-amber-300 border border-amber-500/30 rounded-lg text-xs font-semibold transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Last Key (Max)
            </button>
            <button
              type="button"
              onClick={(e) => handleSubmit(e, 'REMOVE')}
              disabled={loading}
              className="flex items-center gap-1.5 px-3.5 py-2 bg-slate-800 hover:bg-slate-700 text-rose-400 border border-rose-500/30 rounded-lg text-xs font-semibold transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Trash2 className="w-3.5 h-3.5" /> REMOVE Node
            </button>

            <div className="h-6 w-[1px] bg-slate-700 mx-1 hidden sm:block"></div>

            <select
              value={traversalType}
              onChange={(e: any) => setTraversalType(e.target.value)}
              className="bg-slate-950 border border-slate-700 text-slate-300 rounded-lg px-3 py-2 text-xs font-mono focus:outline-none"
            >
              <option value="inorder">In-order (LNR)</option>
              <option value="preorder">Pre-order (NLR)</option>
              <option value="postorder">Post-order (LRN)</option>
            </select>
            <button
              type="button"
              onClick={(e) => handleSubmit(e, 'TRAVERSAL')}
              disabled={loading}
              className="flex items-center gap-1.5 px-3.5 py-2 bg-slate-800 hover:bg-slate-700 text-sky-300 border border-sky-500/30 rounded-lg text-xs font-semibold transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <RefreshCw className="w-3.5 h-3.5" /> Run Traversal
            </button>
          </div>
        </div>
      )}

      {/* PRIORITY QUEUE CONTROLS */}
      {isPriorityQueue && (
        <div className="space-y-4">
          <div>
            <label className="block text-xs font-medium text-slate-400 mb-1">Element Value (Min-Heap)</label>
            <input
              type="text"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white font-mono focus:outline-none focus:border-indigo-500"
              placeholder="Enter numeric or comparable value (e.g. 10)..."
            />
          </div>

          <div className="flex flex-wrap gap-2 pt-2">
            <button
              type="button"
              onClick={(e) => handleSubmit(e, 'OFFER')}
              disabled={loading}
              className="flex items-center gap-1.5 px-4 py-2 bg-amber-600 hover:bg-amber-500 text-white rounded-lg text-xs font-semibold shadow-md shadow-amber-600/20 transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Plus className="w-3.5 h-3.5" /> OFFER (Insert & Sift Up)
            </button>
            <button
              type="button"
              onClick={(e) => handleSubmit(e, 'PEEK')}
              disabled={loading}
              className="flex items-center gap-1.5 px-3.5 py-2 bg-slate-800 hover:bg-slate-700 text-indigo-300 border border-indigo-500/30 rounded-lg text-xs font-semibold transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Search className="w-3.5 h-3.5" /> PEEK (Read Min Root)
            </button>
            <button
              type="button"
              onClick={(e) => handleSubmit(e, 'POLL')}
              disabled={loading}
              className="flex items-center gap-1.5 px-3.5 py-2 bg-slate-800 hover:bg-slate-700 text-rose-400 border border-rose-500/30 rounded-lg text-xs font-semibold transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Trash2 className="w-3.5 h-3.5" /> POLL (Extract Min & Sift Down)
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
