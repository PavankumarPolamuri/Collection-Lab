import React from 'react';
import type { LinkedListState, OperationResponse } from '../../types/collections';
import { GitCommit, ArrowLeftRight } from 'lucide-react';

interface LinkedListVisualizerProps {
  state: LinkedListState;
  lastResponse: OperationResponse<LinkedListState> | null;
}

export const LinkedListVisualizer: React.FC<LinkedListVisualizerProps> = ({ state, lastResponse }) => {
  const { nodes, size, headData, tailData } = state;

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-6 shadow-sm dark:shadow-xl space-y-6">
      {/* Header Info */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-4">
        <div>
          <h2 className="card-title text-slate-900 dark:text-white flex items-center gap-2">
            <GitCommit className="w-5 h-5 text-violet-600 dark:text-violet-400" />
            Custom LinkedList Visualizer
          </h2>
          <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">
            Doubly linked list with Node references (`data`, `next`, `prev`), HEAD, and TAIL pointers.
          </p>
        </div>

        <div className="flex items-center gap-3 font-mono text-xs">
          <div className="px-3 py-1.5 bg-slate-100 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg">
            <span className="text-slate-500 dark:text-slate-400">Size:</span> <strong className="text-violet-600 dark:text-violet-400 text-sm">{size}</strong>
          </div>
          <div className="px-3 py-1.5 bg-slate-100 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg">
            <span className="text-slate-500 dark:text-slate-400">HEAD:</span> <strong className="text-emerald-600 dark:text-emerald-400 text-sm">{headData !== null ? String(headData) : 'null'}</strong>
          </div>
          <div className="px-3 py-1.5 bg-slate-100 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg">
            <span className="text-slate-500 dark:text-slate-400">TAIL:</span> <strong className="text-amber-600 dark:text-amber-400 text-sm">{tailData !== null ? String(tailData) : 'null'}</strong>
          </div>
        </div>
      </div>

      {/* Nodes Chain Visualization */}
      <div className="space-y-3">
        <div className="text-xs font-mono font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-wider">
          Doubly-Linked Node Memory Chain
        </div>

        {size === 0 ? (
          <div className="py-12 border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-xl text-center font-mono text-xs text-slate-500 dark:text-slate-400 bg-slate-50 dark:bg-slate-950/40">
            [HEAD: null] ⇄ [TAIL: null] — CustomLinkedList is currently empty.
          </div>
        ) : (
          <div className="overflow-x-auto pb-6">
            <div className="flex items-center gap-3 min-w-max pt-4">
              {nodes.map((node, idx) => {
                const isHead = idx === 0;
                const isTail = idx === nodes.length - 1;
                const isAccessed = (lastResponse?.operation === 'GET' || lastResponse?.operation === 'SET') && lastResponse?.internalDetails?.index === idx;

                return (
                  <React.Fragment key={idx}>
                    <div className="flex flex-col items-center relative">
                      <div className="absolute -top-7 flex gap-1 font-mono text-[10px] font-bold">
                        {isHead && (
                          <span className="px-2 py-0.5 bg-emerald-100 dark:bg-emerald-500/20 text-emerald-700 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-500/40 rounded-full">
                            HEAD
                          </span>
                        )}
                        {isTail && (
                          <span className="px-2 py-0.5 bg-amber-100 dark:bg-amber-500/20 text-amber-700 dark:text-amber-300 border border-amber-300 dark:border-amber-500/40 rounded-full">
                            TAIL
                          </span>
                        )}
                      </div>

                      <div
                        className={`w-36 bg-slate-50 dark:bg-slate-950 border-2 rounded-xl p-3 shadow-md font-mono transition-all duration-300 ${
                          isAccessed
                            ? 'border-amber-400 bg-amber-50 dark:bg-amber-500/10 scale-105 shadow-amber-500/20'
                            : 'border-violet-200 dark:border-violet-500/40 hover:border-violet-400 dark:hover:border-violet-400'
                        }`}
                      >
                        <div className="text-center pb-2 border-b border-slate-200 dark:border-slate-800">
                          <span className="text-[10px] text-slate-500 dark:text-slate-400 block">Node [{node.index}]</span>
                          <strong className="text-sm text-violet-900 dark:text-violet-200 truncate block px-1">
                            {String(node.data)}
                          </strong>
                        </div>

                        <div className="flex items-center justify-between text-[10px] text-slate-500 dark:text-slate-400 pt-2 font-mono">
                          <span className={node.hasPrev ? 'text-emerald-600 dark:text-emerald-400' : 'text-slate-400 dark:text-slate-600'}>
                            prev: {node.hasPrev ? 'Node' : 'null'}
                          </span>
                          <span className={node.hasNext ? 'text-emerald-600 dark:text-emerald-400' : 'text-slate-400 dark:text-slate-600'}>
                            next: {node.hasNext ? 'Node' : 'null'}
                          </span>
                        </div>
                      </div>
                    </div>

                    {node.hasNext && (
                      <div className="flex flex-col items-center justify-center text-slate-400 dark:text-slate-500 px-1">
                        <ArrowLeftRight className="w-5 h-5 text-indigo-500 dark:text-indigo-400 animate-pulse" />
                        <span className="text-[9px] font-mono text-slate-400 dark:text-slate-500">2-Way Pointer</span>
                      </div>
                    )}
                  </React.Fragment>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* Footer Info Legend */}
      <div className="flex flex-wrap items-center gap-6 pt-2 border-t border-slate-200 dark:border-slate-800/80 text-xs font-mono text-slate-600 dark:text-slate-400">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-emerald-100 dark:bg-emerald-500/30 border border-emerald-500 rounded-full"></div>
          <span>HEAD Node</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-amber-100 dark:bg-amber-500/30 border border-amber-500 rounded-full"></div>
          <span>TAIL Node</span>
        </div>
        <div className="flex items-center gap-2">
          <ArrowLeftRight className="w-3.5 h-3.5 text-indigo-500 dark:text-indigo-400" />
          <span>Bi-directional Pointers (`prev` & `next`)</span>
        </div>
      </div>
    </div>
  );
};
