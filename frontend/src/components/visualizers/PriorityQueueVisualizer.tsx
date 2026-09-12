import React from 'react';
import type { PriorityQueueState, OperationResponse } from '../../types/collections';
import { ArrowUp10, Layers, GitFork, ArrowUp, ArrowDown } from 'lucide-react';

interface PriorityQueueVisualizerProps {
  state: PriorityQueueState;
  lastResponse: OperationResponse<PriorityQueueState> | null;
}

export const PriorityQueueVisualizer: React.FC<PriorityQueueVisualizerProps> = ({ state, lastResponse }) => {
  const { heapArray, size, capacity, minRoot } = state;

  const isOffer = lastResponse?.operation === 'OFFER';
  const isPoll = lastResponse?.operation === 'POLL';

  const renderHeapTreeNode = (index: number): React.ReactNode => {
    if (index >= size) return null;

    const leftIndex = 2 * index + 1;
    const rightIndex = 2 * index + 2;
    const isRoot = index === 0;

    return (
      <div className="flex flex-col items-center">
        <div className="flex flex-col items-center">
          <div
            className={`w-12 h-12 rounded-xl flex flex-col items-center justify-center font-mono font-bold text-xs border-2 transition-all duration-300 shadow-md ${
              isRoot
                ? 'bg-pink-100 dark:bg-pink-500/20 border-pink-500 text-pink-900 dark:text-pink-200 scale-105 shadow-pink-500/20'
                : 'bg-slate-50 dark:bg-slate-950 border-slate-200 dark:border-slate-700 text-slate-900 dark:text-slate-200'
            }`}
          >
            <span className="text-[9px] text-slate-500 dark:text-slate-400 block">[{index}]</span>
            <span className="truncate max-w-[40px] px-0.5">{String(heapArray[index])}</span>
          </div>
        </div>

        {(leftIndex < size || rightIndex < size) && (
          <div className="flex items-start justify-center gap-4 sm:gap-8 pt-3 relative">
            <div className="absolute top-0 left-1/4 right-1/4 h-[2px] bg-slate-300 dark:bg-slate-800"></div>

            <div className="flex flex-col items-center">
              <div className="w-[1px] h-3 bg-slate-300 dark:bg-slate-800 mb-1"></div>
              {renderHeapTreeNode(leftIndex)}
            </div>

            <div className="flex flex-col items-center">
              <div className="w-[1px] h-3 bg-slate-300 dark:bg-slate-800 mb-1"></div>
              {renderHeapTreeNode(rightIndex)}
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-6 shadow-sm dark:shadow-xl space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-4">
        <div>
          <h2 className="card-title text-slate-900 dark:text-white flex items-center gap-2">
            <ArrowUp10 className="w-5 h-5 text-pink-600 dark:text-pink-400" />
            Custom PriorityQueue Visualizer (Binary Min-Heap)
          </h2>
          <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">
            Array-backed complete binary tree where parent node is always smaller than or equal to children (`parent = (i - 1) / 2`).
          </p>
        </div>

        <div className="flex items-center gap-3 font-mono text-xs">
          <div className="px-3 py-1.5 bg-slate-100 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg">
            <span className="text-slate-500 dark:text-slate-400">Size:</span> <strong className="text-pink-600 dark:text-pink-400 text-sm">{size}</strong>
          </div>
          <div className="px-3 py-1.5 bg-slate-100 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg">
            <span className="text-slate-500 dark:text-slate-400">Capacity:</span> <strong className="text-indigo-600 dark:text-indigo-400 text-sm">{capacity}</strong>
          </div>
          <div className="px-3 py-1.5 bg-slate-100 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg">
            <span className="text-slate-500 dark:text-slate-400">Min Root (PEEK):</span> <strong className="text-emerald-600 dark:text-emerald-400 text-sm">{minRoot !== null ? String(minRoot) : 'null'}</strong>
          </div>
        </div>
      </div>

      {isOffer && (
        <div className="p-3 bg-pink-50 dark:bg-pink-500/10 border border-pink-200 dark:border-pink-500/30 rounded-xl flex items-center gap-2 font-mono text-xs text-pink-800 dark:text-pink-300">
          <ArrowUp className="w-4 h-4 text-pink-600 dark:text-pink-400 animate-bounce" />
          <span><strong>SIFT-UP ALGORITHM AT WORK:</strong> Element inserted at end and swapped upward to restore min-heap property.</span>
        </div>
      )}
      {isPoll && (
        <div className="p-3 bg-indigo-50 dark:bg-indigo-500/10 border border-indigo-200 dark:border-indigo-500/30 rounded-xl flex items-center gap-2 font-mono text-xs text-indigo-800 dark:text-indigo-300">
          <ArrowDown className="w-4 h-4 text-indigo-600 dark:text-indigo-400 animate-bounce" />
          <span><strong>SIFT-DOWN ALGORITHM AT WORK:</strong> Min root extracted, last element moved to root, sifted downward.</span>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-slate-50 dark:bg-slate-950/70 border border-slate-200 dark:border-slate-800 rounded-xl p-4 space-y-3">
          <div className="flex items-center justify-between text-xs font-mono font-semibold text-slate-600 dark:text-slate-400">
            <span className="flex items-center gap-1.5 uppercase tracking-wider">
              <Layers className="w-4 h-4 text-pink-600 dark:text-pink-400" />
              1. Heap Array Storage (`Object[] heap`)
            </span>
            <span className="text-slate-400 dark:text-slate-500 text-[10px]">parent=(i-1)/2 | left=2i+1 | right=2i+2</span>
          </div>

          <div className="overflow-x-auto pb-2">
            <div className="flex gap-2 min-w-max pt-2">
              {heapArray.map((val, idx) => (
                <div key={idx} className="flex flex-col items-center gap-1">
                  <span className="text-[10px] font-mono text-slate-500 dark:text-slate-400 font-semibold">[{idx}]</span>
                  <div
                    className={`w-14 h-14 rounded-xl flex flex-col items-center justify-center font-mono font-bold text-xs border-2 shadow-sm ${
                      idx === 0
                        ? 'bg-pink-100 dark:bg-pink-500/20 border-pink-500 text-pink-900 dark:text-pink-200'
                        : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-700 text-slate-900 dark:text-slate-200'
                    }`}
                  >
                    <span className="truncate max-w-[44px] px-1">{String(val)}</span>
                  </div>
                </div>
              ))}
              {size === 0 && (
                <div className="py-6 text-center text-xs font-mono text-slate-400 dark:text-slate-600 italic w-full">
                  Heap array is empty.
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="bg-slate-50 dark:bg-slate-950/70 border border-slate-200 dark:border-slate-800 rounded-xl p-4 space-y-3">
          <div className="flex items-center justify-between text-xs font-mono font-semibold text-slate-600 dark:text-slate-400">
            <span className="flex items-center gap-1.5 uppercase tracking-wider">
              <GitFork className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
              2. Complete Binary Heap Tree
            </span>
            <span className="text-pink-600 dark:text-pink-400 text-[10px]">Root is Minimum</span>
          </div>

          {size > 0 ? (
            <div className="overflow-x-auto py-4 flex justify-center min-w-max">
              {renderHeapTreeNode(0)}
            </div>
          ) : (
            <div className="py-10 border border-dashed border-slate-200 dark:border-slate-800/80 rounded-xl text-center font-mono text-xs text-slate-400 dark:text-slate-600 italic">
              Heap tree is empty.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
