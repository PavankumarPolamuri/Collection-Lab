import React from 'react';
import type { HeapState, OperationResponse } from '../../types/collections';
import { ArrowUp10 } from 'lucide-react';

interface HeapVisualizerProps {
  state: HeapState;
  lastResponse?: OperationResponse | null;
}

export const HeapVisualizer: React.FC<HeapVisualizerProps> = ({ state }) => {
  const heapArr = state?.heapArray || [];

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm dark:shadow-xl space-y-6">
      {/* Metrics Row */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-4">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-amber-500/10 text-amber-500 rounded-xl">
            <ArrowUp10 className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
              Binary Min-Heap
              <span className="text-[10px] font-mono font-medium px-2 py-0.5 bg-amber-500/10 text-amber-400 rounded-md border border-amber-500/20">
                Complete Binary Tree
              </span>
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 font-sans">
              Parent &le; Children invariant stored in sequential array representation
            </p>
          </div>
        </div>

        <div className="flex items-center gap-4 text-xs font-mono">
          <div className="bg-slate-100 dark:bg-slate-950 px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-800">
            <span className="text-slate-400">Size: </span>
            <span className="font-bold text-amber-400">{state?.size ?? 0}</span>
          </div>
          <div className="bg-slate-100 dark:bg-slate-950 px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-800">
            <span className="text-slate-400">Min Root: </span>
            <span className="font-bold text-emerald-400">{state?.minRoot !== null && state?.minRoot !== undefined ? String(state.minRoot) : 'EMPTY'}</span>
          </div>
        </div>
      </div>

      {/* Heap Array Visual Representation */}
      <div className="space-y-3">
        <h3 className="text-xs font-mono font-semibold text-slate-400 uppercase tracking-wider">
          Underlying Array Representation
        </h3>
        <div className="min-h-[120px] bg-slate-50 dark:bg-slate-950/60 rounded-xl p-6 border border-slate-200 dark:border-slate-800 flex items-center justify-start overflow-x-auto gap-3">
          {heapArr.length === 0 ? (
            <div className="w-full text-center py-6 text-slate-400 font-mono text-xs">
              Heap is empty. Use INSERT to add elements.
            </div>
          ) : (
            heapArr.map((item, idx) => {
              const isRoot = idx === 0;
              return (
                <div
                  key={idx}
                  className={`min-w-[90px] p-4 rounded-xl border font-mono text-center relative transition-all duration-300 ${
                    isRoot
                      ? 'bg-amber-500/20 border-amber-500 text-amber-300 font-bold'
                      : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-200'
                  }`}
                >
                  <div className="text-[10px] text-slate-400 mb-1">Idx {idx}</div>
                  <div className="text-sm">{String(item)}</div>
                  {isRoot && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-2 py-0.5 bg-amber-500 text-slate-950 text-[9px] font-extrabold rounded-md uppercase tracking-wider">
                      ROOT MIN
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
};
