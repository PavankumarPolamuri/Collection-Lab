import React from 'react';
import type { DequeState, OperationResponse } from '../../types/collections';
import { ArrowLeftRight } from 'lucide-react';

interface DequeVisualizerProps {
  state: DequeState;
  lastResponse?: OperationResponse | null;
}

export const DequeVisualizer: React.FC<DequeVisualizerProps> = ({ state }) => {
  const elements = state?.elements || [];

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm dark:shadow-xl space-y-6">
      {/* Metrics Row */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-4">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-violet-500/10 text-violet-500 rounded-xl">
            <ArrowLeftRight className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
              Custom Deque
              <span className="text-[10px] font-mono font-medium px-2 py-0.5 bg-violet-500/10 text-violet-400 rounded-md border border-violet-500/20">
                Double-Ended Queue
              </span>
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 font-sans">
              Insert and remove at both FRONT and REAR ends
            </p>
          </div>
        </div>

        <div className="flex items-center gap-4 text-xs font-mono">
          <div className="bg-slate-100 dark:bg-slate-950 px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-800">
            <span className="text-slate-400">Size: </span>
            <span className="font-bold text-violet-400">{state?.size ?? 0}</span>
          </div>
          <div className="bg-slate-100 dark:bg-slate-950 px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-800">
            <span className="text-slate-400">FIRST: </span>
            <span className="font-bold text-indigo-400">{state?.firstValue !== null && state?.firstValue !== undefined ? String(state.firstValue) : 'EMPTY'}</span>
          </div>
          <div className="bg-slate-100 dark:bg-slate-950 px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-800">
            <span className="text-slate-400">LAST: </span>
            <span className="font-bold text-pink-400">{state?.lastValue !== null && state?.lastValue !== undefined ? String(state.lastValue) : 'EMPTY'}</span>
          </div>
        </div>
      </div>

      {/* Deque Layout */}
      <div className="min-h-[180px] bg-slate-50 dark:bg-slate-950/60 rounded-xl p-6 border border-slate-200 dark:border-slate-800 flex items-center justify-start overflow-x-auto gap-3">
        {elements.length === 0 ? (
          <div className="w-full text-center py-8 text-slate-400 font-mono text-xs">
            Deque is empty. Use ADD FIRST or ADD LAST to insert elements.
          </div>
        ) : (
          elements.map((item, idx) => {
            const isFirst = idx === 0;
            const isLast = idx === elements.length - 1;
            return (
              <div key={idx} className="flex items-center shrink-0">
                <div
                  className={`min-w-[100px] p-4 rounded-xl border font-mono text-sm text-center font-bold relative transition-all duration-300 ${
                    isFirst
                      ? 'bg-indigo-500/20 border-indigo-500 text-indigo-300'
                      : isLast
                      ? 'bg-pink-500/20 border-pink-500 text-pink-300'
                      : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-200'
                  }`}
                >
                  <div className="text-[10px] text-slate-400 font-normal mb-1">Idx {idx}</div>
                  <div>{String(item)}</div>
                  {isFirst && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-2 py-0.5 bg-indigo-500 text-white text-[9px] font-extrabold rounded-md uppercase tracking-wider">
                      FIRST
                    </div>
                  )}
                  {isLast && (
                    <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 px-2 py-0.5 bg-pink-500 text-white text-[9px] font-extrabold rounded-md uppercase tracking-wider">
                      LAST
                    </div>
                  )}
                </div>
                {idx < elements.length - 1 && (
                  <span className="text-slate-400 font-mono font-bold text-xs mx-1">⇄</span>
                )}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};
