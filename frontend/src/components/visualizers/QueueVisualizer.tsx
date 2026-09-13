import React from 'react';
import type { QueueState, OperationResponse } from '../../types/collections';
import { ArrowRight, ListFilter } from 'lucide-react';

interface QueueVisualizerProps {
  state: QueueState;
  lastResponse?: OperationResponse | null;
}

export const QueueVisualizer: React.FC<QueueVisualizerProps> = ({ state }) => {
  const elements = state?.elements || [];

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm dark:shadow-xl space-y-6">
      {/* Metrics Row */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-4">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-blue-500/10 text-blue-500 rounded-xl">
            <ListFilter className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
              Custom Queue
              <span className="text-[10px] font-mono font-medium px-2 py-0.5 bg-blue-500/10 text-blue-400 rounded-md border border-blue-500/20">
                FIFO Structure
              </span>
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 font-sans">
              First-In, First-Out Enqueue/Dequeue sequence
            </p>
          </div>
        </div>

        <div className="flex items-center gap-4 text-xs font-mono">
          <div className="bg-slate-100 dark:bg-slate-950 px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-800">
            <span className="text-slate-400">Size: </span>
            <span className="font-bold text-blue-400">{state?.size ?? 0}</span>
          </div>
          <div className="bg-slate-100 dark:bg-slate-950 px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-800">
            <span className="text-slate-400">FRONT: </span>
            <span className="font-bold text-emerald-400">{state?.frontValue !== null && state?.frontValue !== undefined ? String(state.frontValue) : 'EMPTY'}</span>
          </div>
          <div className="bg-slate-100 dark:bg-slate-950 px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-800">
            <span className="text-slate-400">REAR: </span>
            <span className="font-bold text-purple-400">{state?.rearValue !== null && state?.rearValue !== undefined ? String(state.rearValue) : 'EMPTY'}</span>
          </div>
        </div>
      </div>

      {/* Queue Horizontal Visualization */}
      <div className="min-h-[180px] bg-slate-50 dark:bg-slate-950/60 rounded-xl p-6 border border-slate-200 dark:border-slate-800 flex items-center justify-start overflow-x-auto gap-3">
        {elements.length === 0 ? (
          <div className="w-full text-center py-8 text-slate-400 font-mono text-xs">
            Queue is empty. Use ENQUEUE to add elements at REAR.
          </div>
        ) : (
          elements.map((item, idx) => {
            const isFront = idx === 0;
            const isRear = idx === elements.length - 1;
            return (
              <div key={idx} className="flex items-center shrink-0">
                <div
                  className={`min-w-[100px] p-4 rounded-xl border font-mono text-sm text-center font-bold relative transition-all duration-300 ${
                    isFront
                      ? 'bg-emerald-500/20 border-emerald-500 text-emerald-300'
                      : isRear
                      ? 'bg-purple-500/20 border-purple-500 text-purple-300'
                      : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-200'
                  }`}
                >
                  <div className="text-[10px] text-slate-400 font-normal mb-1">Idx {idx}</div>
                  <div>{String(item)}</div>
                  {isFront && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-2 py-0.5 bg-emerald-500 text-slate-950 text-[9px] font-extrabold rounded-md uppercase tracking-wider">
                      FRONT
                    </div>
                  )}
                  {isRear && (
                    <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 px-2 py-0.5 bg-purple-500 text-white text-[9px] font-extrabold rounded-md uppercase tracking-wider">
                      REAR
                    </div>
                  )}
                </div>
                {idx < elements.length - 1 && (
                  <ArrowRight className="w-4 h-4 text-slate-400 mx-1.5 shrink-0" />
                )}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};
