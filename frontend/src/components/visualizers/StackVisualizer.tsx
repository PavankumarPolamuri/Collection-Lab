import React from 'react';
import type { StackState, OperationResponse } from '../../types/collections';
import { ArrowLeft, Layers } from 'lucide-react';

interface StackVisualizerProps {
  state: StackState;
  lastResponse?: OperationResponse | null;
}

export const StackVisualizer: React.FC<StackVisualizerProps> = ({ state }) => {
  const elements = state?.elements || [];

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm dark:shadow-xl space-y-6">
      {/* Metrics Row */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-4">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-indigo-500/10 text-indigo-500 rounded-xl">
            <Layers className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
              Custom Stack
              <span className="text-[10px] font-mono font-medium px-2 py-0.5 bg-indigo-500/10 text-indigo-400 rounded-md border border-indigo-500/20">
                LIFO Structure
              </span>
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 font-sans">
              Last-In, First-Out Push/Pop sequence
            </p>
          </div>
        </div>

        <div className="flex items-center gap-4 text-xs font-mono">
          <div className="bg-slate-100 dark:bg-slate-950 px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-800">
            <span className="text-slate-400">Size: </span>
            <span className="font-bold text-indigo-400">{state?.size ?? 0}</span>
          </div>
          <div className="bg-slate-100 dark:bg-slate-950 px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-800">
            <span className="text-slate-400">TOP Value: </span>
            <span className="font-bold text-emerald-400">{state?.topValue !== null && state?.topValue !== undefined ? String(state.topValue) : 'EMPTY'}</span>
          </div>
          <div className="bg-slate-100 dark:bg-slate-950 px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-800">
            <span className="text-slate-400">Status: </span>
            <span className={`font-bold ${state?.isEmpty ? 'text-amber-400' : 'text-emerald-400'}`}>
              {state?.isEmpty ? 'EMPTY' : 'NOT EMPTY'}
            </span>
          </div>
        </div>
      </div>

      {/* Stack Vertical Visualization */}
      <div className="min-h-[220px] bg-slate-50 dark:bg-slate-950/60 rounded-xl p-6 border border-slate-200 dark:border-slate-800 flex flex-col-reverse items-center justify-start gap-2 relative">
        {elements.length === 0 ? (
          <div className="text-center py-12 text-slate-400 font-mono text-xs">
            Stack is currently empty. Use PUSH to add elements to the TOP.
          </div>
        ) : (
          elements.map((item, idx) => {
            const isTop = idx === elements.length - 1;
            return (
              <div
                key={idx}
                className={`w-full max-w-sm px-6 py-3 rounded-xl border font-mono text-sm font-semibold flex items-center justify-between transition-all duration-300 ${
                  isTop
                    ? 'bg-indigo-600/20 border-indigo-500 text-indigo-300 shadow-lg shadow-indigo-500/10 scale-102'
                    : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-200'
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className="text-xs text-slate-400 font-normal">[Idx {idx}]</span>
                  <span>{String(item)}</span>
                </div>
                {isTop && (
                  <span className="text-xs font-bold font-mono px-2 py-0.5 bg-indigo-500 text-white rounded-md flex items-center gap-1">
                    <ArrowLeft className="w-3 h-3" /> TOP
                  </span>
                )}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};
