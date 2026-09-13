import React from 'react';
import type { DisjointSetState, OperationResponse } from '../../types/collections';
import { GitBranch } from 'lucide-react';

interface DisjointSetVisualizerProps {
  state: DisjointSetState;
  lastResponse?: OperationResponse | null;
}

export const DisjointSetVisualizer: React.FC<DisjointSetVisualizerProps> = ({ state }) => {
  const nodes = state?.nodes || [];

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm dark:shadow-xl space-y-6">
      {/* Metrics Row */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-4">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-emerald-500/10 text-emerald-500 rounded-xl">
            <GitBranch className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
              Disjoint Set (Union-Find)
              <span className="text-[10px] font-mono font-medium px-2 py-0.5 bg-emerald-500/10 text-emerald-400 rounded-md border border-emerald-500/20">
                Union by Rank & Path Compression
              </span>
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 font-sans">
              Forest of trees tracking non-overlapping partitions in O(&alpha;(n)) time
            </p>
          </div>
        </div>

        <div className="flex items-center gap-4 text-xs font-mono">
          <div className="bg-slate-100 dark:bg-slate-950 px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-800">
            <span className="text-slate-400">Total Elements: </span>
            <span className="font-bold text-emerald-400">{state?.elementCount ?? 0}</span>
          </div>
          <div className="bg-slate-100 dark:bg-slate-950 px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-800">
            <span className="text-slate-400">Disjoint Sets: </span>
            <span className="font-bold text-indigo-400">{state?.setCount ?? 0}</span>
          </div>
        </div>
      </div>

      {/* Nodes Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {nodes.length === 0 ? (
          <div className="col-span-full text-center py-12 text-slate-400 font-mono text-xs">
            Disjoint Set is empty. Use MAKE SET or UNION to build partitions.
          </div>
        ) : (
          nodes.map((node) => {
            const isRoot = node.element === node.parent;
            return (
              <div
                key={node.element}
                className={`bg-slate-50 dark:bg-slate-950/60 border rounded-xl p-4 space-y-2 transition-all ${
                  isRoot
                    ? 'border-emerald-500 bg-emerald-500/5 shadow-sm'
                    : 'border-slate-200 dark:border-slate-800'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-sm font-mono font-bold text-slate-800 dark:text-slate-200">
                    Elem: {node.element}
                  </span>
                  {isRoot && (
                    <span className="text-[9px] font-mono px-2 py-0.5 bg-emerald-500 text-slate-950 font-black rounded uppercase">
                      ROOT
                    </span>
                  )}
                </div>

                <div className="text-xs font-mono text-slate-400 flex items-center justify-between pt-1 border-t border-slate-200 dark:border-slate-800">
                  <span>Parent: <strong className="text-indigo-400">{node.parent}</strong></span>
                  <span>Rank: <strong className="text-amber-400">{node.rank}</strong></span>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};
