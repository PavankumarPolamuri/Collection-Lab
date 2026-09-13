import React from 'react';
import type { CircularLinkedListState, OperationResponse } from '../../types/collections';
import { RefreshCcw, ArrowRight } from 'lucide-react';

interface CircularLinkedListVisualizerProps {
  state: CircularLinkedListState;
  lastResponse?: OperationResponse | null;
}

export const CircularLinkedListVisualizer: React.FC<CircularLinkedListVisualizerProps> = ({ state }) => {
  const nodes = state?.nodes || [];

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm dark:shadow-xl space-y-6">
      {/* Metrics Row */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-4">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-indigo-500/10 text-indigo-500 rounded-xl">
            <RefreshCcw className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
              Circular LinkedList
              <span className="text-[10px] font-mono font-medium px-2 py-0.5 bg-indigo-500/10 text-indigo-400 rounded-md border border-indigo-500/20">
                TAIL &rarr; HEAD Circular Loop
              </span>
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 font-sans">
              Linked node sequence where tail node next reference loops back to head
            </p>
          </div>
        </div>

        <div className="flex items-center gap-4 text-xs font-mono">
          <div className="bg-slate-100 dark:bg-slate-950 px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-800">
            <span className="text-slate-400">Size: </span>
            <span className="font-bold text-indigo-400">{state?.size ?? 0}</span>
          </div>
          <div className="bg-slate-100 dark:bg-slate-950 px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-800">
            <span className="text-slate-400">HEAD: </span>
            <span className="font-bold text-emerald-400">{state?.headData !== null && state?.headData !== undefined ? String(state.headData) : 'NULL'}</span>
          </div>
          <div className="bg-slate-100 dark:bg-slate-950 px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-800">
            <span className="text-slate-400">TAIL: </span>
            <span className="font-bold text-purple-400">{state?.tailData !== null && state?.tailData !== undefined ? String(state.tailData) : 'NULL'}</span>
          </div>
        </div>
      </div>

      {/* Nodes Row with Circular Return Link */}
      <div className="space-y-4">
        <div className="min-h-[160px] bg-slate-50 dark:bg-slate-950/60 rounded-xl p-6 border border-slate-200 dark:border-slate-800 flex items-center justify-start overflow-x-auto gap-3">
          {nodes.length === 0 ? (
            <div className="w-full text-center py-8 text-slate-400 font-mono text-xs">
              Circular LinkedList is empty. Use ADD FIRST or ADD LAST to insert nodes.
            </div>
          ) : (
            nodes.map((node) => (
              <div key={node.index} className="flex items-center shrink-0">
                <div
                  className={`min-w-[110px] p-4 rounded-xl border font-mono text-center relative transition-all duration-300 ${
                    node.isHead
                      ? 'bg-emerald-500/20 border-emerald-500 text-emerald-300 font-bold'
                      : node.isTail
                      ? 'bg-purple-500/20 border-purple-500 text-purple-300 font-bold'
                      : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-200'
                  }`}
                >
                  <div className="text-[10px] text-slate-400 mb-1">Node #{node.index}</div>
                  <div className="text-sm">{String(node.data)}</div>
                  <div className="text-[9px] text-indigo-400 font-mono mt-1">&rarr; Next: Idx {node.nextIndex}</div>

                  {node.isHead && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-2 py-0.5 bg-emerald-500 text-slate-950 text-[9px] font-extrabold rounded-md uppercase tracking-wider">
                      HEAD
                    </div>
                  )}
                  {node.isTail && (
                    <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 px-2 py-0.5 bg-purple-500 text-white text-[9px] font-extrabold rounded-md uppercase tracking-wider">
                      TAIL
                    </div>
                  )}
                </div>
                <ArrowRight className="w-4 h-4 text-slate-400 mx-1.5 shrink-0" />
              </div>
            ))
          )}
        </div>

        {nodes.length > 0 && (
          <div className="p-3 bg-indigo-500/10 border border-indigo-500/30 rounded-xl text-xs font-mono text-indigo-300 flex items-center justify-center gap-2">
            <RefreshCcw className="w-4 h-4 animate-spin-slow" />
            <span>Circular Guarantee: TAIL (Node #{nodes.length - 1}) next pointer loops back to HEAD (Node #0)</span>
          </div>
        )}
      </div>
    </div>
  );
};
