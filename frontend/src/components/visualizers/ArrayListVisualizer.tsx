import React from 'react';
import type { ArrayListState, OperationResponse } from '../../types/collections';
import { Layers, AlertTriangle, ArrowRight } from 'lucide-react';

interface ArrayListVisualizerProps {
  state: ArrayListState;
  lastResponse: OperationResponse<ArrayListState> | null;
}

export const ArrayListVisualizer: React.FC<ArrayListVisualizerProps> = ({ state, lastResponse }) => {
  const { elements, size, capacity } = state;
  const isResized = lastResponse?.internalDetails?.resized;
  const oldCapacity = lastResponse?.internalDetails?.oldCapacity;
  const newCapacity = lastResponse?.internalDetails?.newCapacity;

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm dark:shadow-xl space-y-6 transition-colors">
      {/* Header Info */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-4">
        <div>
          <h2 className="card-title text-slate-900 dark:text-white flex items-center gap-2">
            <Layers className="w-5 h-5 text-blue-600 dark:text-blue-400" />
            Custom ArrayList Visualizer
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Dynamic array implementation with 0-based indexing and automatic capacity expansion.
          </p>
        </div>

        <div className="flex items-center gap-3 font-mono text-xs">
          <div className="px-3 py-1.5 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl">
            <span className="text-slate-500">Size:</span> <strong className="text-blue-600 dark:text-blue-400 text-sm">{size}</strong>
          </div>
          <div className="px-3 py-1.5 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl">
            <span className="text-slate-500">Capacity:</span> <strong className="text-emerald-600 dark:text-emerald-400 text-sm">{capacity}</strong>
          </div>
          <div className="px-3 py-1.5 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl">
            <span className="text-slate-500">Occupancy:</span> <strong className="text-amber-600 dark:text-amber-400 text-sm">{Math.round((size / (capacity || 1)) * 100)}%</strong>
          </div>
        </div>
      </div>

      {/* Resize Notification Banner */}
      {isResized && (
        <div className="p-4 bg-amber-50 dark:bg-amber-500/10 border border-amber-200 dark:border-amber-500/30 rounded-xl flex items-center justify-between text-xs font-mono text-amber-800 dark:text-amber-300 animate-pulse">
          <div className="flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-amber-500" />
            <span>DYNAMIC RESIZING EVENT DETECTED! Capacity exceeded.</span>
          </div>
          <div className="flex items-center gap-2 font-bold bg-amber-100 dark:bg-amber-950/60 px-3 py-1 rounded-lg border border-amber-300 dark:border-amber-500/40">
            <span>Capacity: {oldCapacity}</span>
            <ArrowRight className="w-3.5 h-3.5" />
            <span className="text-emerald-600 dark:text-emerald-400">{newCapacity}</span>
          </div>
        </div>
      )}

      {/* Array Elements Visualization Grid */}
      <div className="space-y-2">
        <div className="text-xs font-mono font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2">
          Internal Dynamic Array Storage (`Object[] elements`)
        </div>

        <div className="overflow-x-auto pb-4">
          <div className="flex gap-2 min-w-max">
            {elements.map((item, idx) => {
              const isFilled = idx < size && item !== null;
              const isLastAdded = lastResponse?.operation === 'ADD' && idx === size - 1;
              const isAccessed = (lastResponse?.operation === 'GET' || lastResponse?.operation === 'SET') && lastResponse?.internalDetails?.index === idx;

              return (
                <div key={idx} className="flex flex-col items-center gap-1.5">
                  <span className="text-[11px] font-mono font-semibold text-slate-400">
                    [{idx}]
                  </span>

                  <div
                    className={`w-16 h-16 rounded-xl flex flex-col items-center justify-center font-mono font-bold text-sm border-2 transition-all duration-300 ${
                      isAccessed
                        ? 'bg-amber-100 dark:bg-amber-500/20 border-amber-400 text-amber-800 dark:text-amber-200 scale-105 shadow-md'
                        : isLastAdded
                        ? 'bg-emerald-100 dark:bg-emerald-500/20 border-emerald-400 text-emerald-800 dark:text-emerald-200 scale-105 shadow-md'
                        : isFilled
                        ? 'bg-blue-50 dark:bg-slate-800/90 border-blue-300 dark:border-blue-500/40 text-blue-900 dark:text-blue-200 shadow-sm'
                        : 'bg-slate-50 dark:bg-slate-950/40 border-slate-200 dark:border-slate-800/60 text-slate-400 dark:text-slate-600 border-dashed'
                    }`}
                  >
                    {isFilled ? (
                      <span className="truncate max-w-[52px] text-center px-1">{String(item)}</span>
                    ) : (
                      <span className="text-xs text-slate-400 dark:text-slate-600 font-normal">empty</span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Footer Info Legend */}
      <div className="flex flex-wrap items-center gap-6 pt-2 border-t border-slate-800/80 text-xs font-mono text-slate-400">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-slate-800 border border-indigo-500/40 rounded"></div>
          <span>Occupied Slot (Size)</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-slate-950 border border-slate-800 border-dashed rounded"></div>
          <span>Allocated Buffer (Capacity)</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-emerald-500/30 border border-emerald-400 rounded"></div>
          <span>Recently Added</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-amber-500/30 border border-amber-400 rounded"></div>
          <span>Accessed / Updated</span>
        </div>
      </div>
    </div>
  );
};
