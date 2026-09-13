import React from 'react';
import type { HashSetState, OperationResponse } from '../../types/collections';
import { Hash } from 'lucide-react';

interface HashSetVisualizerProps {
  state: HashSetState;
  lastResponse?: OperationResponse | null;
}

export const HashSetVisualizer: React.FC<HashSetVisualizerProps> = ({ state }) => {
  const buckets = state?.buckets || [];

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm dark:shadow-xl space-y-6">
      {/* Metrics Row */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-4">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-emerald-500/10 text-emerald-500 rounded-xl">
            <Hash className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
              Custom HashSet
              <span className="text-[10px] font-mono font-medium px-2 py-0.5 bg-emerald-500/10 text-emerald-400 rounded-md border border-emerald-500/20">
                Unique Bucket Array
              </span>
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 font-sans">
              Separate chaining hash table for set uniqueness guarantees
            </p>
          </div>
        </div>

        <div className="flex items-center gap-4 text-xs font-mono">
          <div className="bg-slate-100 dark:bg-slate-950 px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-800">
            <span className="text-slate-400">Size: </span>
            <span className="font-bold text-emerald-400">{state?.size ?? 0}</span>
          </div>
          <div className="bg-slate-100 dark:bg-slate-950 px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-800">
            <span className="text-slate-400">Capacity: </span>
            <span className="font-bold text-indigo-400">{state?.capacity ?? 8}</span>
          </div>
        </div>
      </div>

      {/* Bucket Grid Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {buckets.map((bucket) => {
          const elements = bucket.elements || [];
          return (
            <div
              key={bucket.index}
              className="bg-slate-50 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800 rounded-xl p-4 space-y-3"
            >
              <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-2">
                <span className="text-xs font-mono font-semibold text-slate-400">Bucket #{bucket.index}</span>
                <span className="text-[10px] font-mono px-2 py-0.5 bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-md">
                  {elements.length} items
                </span>
              </div>

              <div className="space-y-2 min-h-[60px]">
                {elements.length === 0 ? (
                  <div className="text-[11px] font-mono text-slate-400 italic pt-3 text-center">Empty</div>
                ) : (
                  elements.map((item, idx) => (
                    <div
                      key={idx}
                      className="px-3 py-2 bg-white dark:bg-slate-900 border border-emerald-500/30 rounded-lg text-xs font-mono font-semibold text-emerald-300 flex items-center justify-between"
                    >
                      <span>{String(item)}</span>
                      <span className="text-[9px] text-slate-400">Hash Match</span>
                    </div>
                  ))
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
