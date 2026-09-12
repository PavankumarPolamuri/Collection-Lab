import React from 'react';
import type { HashMapState, OperationResponse } from '../../types/collections';
import { Grid, AlertTriangle, ArrowRight } from 'lucide-react';

interface HashMapVisualizerProps {
  state: HashMapState;
  lastResponse: OperationResponse<HashMapState> | null;
}

export const HashMapVisualizer: React.FC<HashMapVisualizerProps> = ({ state, lastResponse }) => {
  const { buckets, size, capacity, loadFactor, threshold } = state;

  const isResized = lastResponse?.internalDetails?.resized;
  const lastHash = lastResponse?.internalDetails?.hash;
  const lastIndex = lastResponse?.internalDetails?.bucketIndex;
  const lastKey = lastResponse?.internalDetails?.key;
  const isCollision = lastResponse?.internalDetails?.isCollision;

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-6 shadow-sm dark:shadow-xl space-y-6">
      {/* Header Info */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-4">
        <div>
          <h2 className="card-title text-slate-900 dark:text-white flex items-center gap-2">
            <Grid className="w-5 h-5 text-purple-600 dark:text-purple-400" />
            Custom HashMap Visualizer (Separate Chaining)
          </h2>
          <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">
            Bucket array table with hash computation, separate chaining node collision handling, and dynamic threshold rehashing.
          </p>
        </div>

        <div className="flex items-center gap-3 font-mono text-xs">
          <div className="px-3 py-1.5 bg-slate-100 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg">
            <span className="text-slate-500 dark:text-slate-400">Size:</span> <strong className="text-purple-600 dark:text-purple-400 text-sm">{size}</strong>
          </div>
          <div className="px-3 py-1.5 bg-slate-100 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg">
            <span className="text-slate-500 dark:text-slate-400">Capacity:</span> <strong className="text-indigo-600 dark:text-indigo-400 text-sm">{capacity}</strong>
          </div>
          <div className="px-3 py-1.5 bg-slate-100 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg">
            <span className="text-slate-500 dark:text-slate-400">Threshold:</span> <strong className="text-amber-600 dark:text-amber-400 text-sm">{size}/{threshold}</strong>
          </div>
          <div className="px-3 py-1.5 bg-slate-100 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg">
            <span className="text-slate-500 dark:text-slate-400">Load Factor:</span> <strong className="text-slate-700 dark:text-slate-300 text-sm">{loadFactor}</strong>
          </div>
        </div>
      </div>

      {/* Resize Notification Banner */}
      {isResized && (
        <div className="p-4 bg-amber-50 dark:bg-amber-500/10 border border-amber-300 dark:border-amber-500/30 rounded-xl flex items-center justify-between text-xs font-mono text-amber-800 dark:text-amber-300 animate-pulse">
          <div className="flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-amber-600 dark:text-amber-400" />
            <span>LOAD FACTOR THRESHOLD REACHED! Rehashing entries into larger bucket table...</span>
          </div>
          <div className="flex items-center gap-2 font-bold bg-amber-100 dark:bg-amber-950/60 px-3 py-1 rounded border border-amber-300 dark:border-amber-500/40">
            <span>Capacity: {lastResponse?.internalDetails?.oldCapacity}</span>
            <ArrowRight className="w-3.5 h-3.5" />
            <span className="text-emerald-600 dark:text-emerald-400">{lastResponse?.internalDetails?.newCapacity}</span>
          </div>
        </div>
      )}

      {/* Operation Metrics Breakdown Card */}
      {lastResponse && lastResponse.structure === 'HASH_MAP' && lastKey && (
        <div className="p-4 bg-slate-50 dark:bg-slate-950/80 border border-slate-200 dark:border-slate-800 rounded-xl grid grid-cols-2 sm:grid-cols-4 gap-4 font-mono text-xs">
          <div>
            <span className="text-slate-500 dark:text-slate-400 block text-[10px] uppercase">Target Key</span>
            <span className="text-indigo-600 dark:text-indigo-300 font-bold text-sm truncate block">{String(lastKey)}</span>
          </div>
          <div>
            <span className="text-slate-500 dark:text-slate-400 block text-[10px] uppercase">Calculated Hash</span>
            <span className="text-amber-600 dark:text-amber-400 font-bold text-sm truncate block">{lastHash ?? 'N/A'}</span>
          </div>
          <div>
            <span className="text-slate-500 dark:text-slate-400 block text-[10px] uppercase">Bucket Index</span>
            <span className="text-purple-600 dark:text-purple-400 font-bold text-sm block">[{lastIndex ?? 'N/A'}]</span>
          </div>
          <div>
            <span className="text-slate-500 dark:text-slate-400 block text-[10px] uppercase">Collision Status</span>
            {isCollision ? (
              <span className="px-2 py-0.5 bg-rose-100 dark:bg-rose-500/20 text-rose-700 dark:text-rose-300 border border-rose-300 dark:border-rose-500/40 rounded text-[11px] font-bold">
                YES (Separate Chain)
              </span>
            ) : (
              <span className="px-2 py-0.5 bg-emerald-100 dark:bg-emerald-500/20 text-emerald-700 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-500/40 rounded text-[11px] font-bold">
                NO (Direct Slot)
              </span>
            )}
          </div>
        </div>
      )}

      {/* Bucket Array Table & Separate Chaining Linked Lists */}
      <div className="space-y-3">
        <div className="text-xs font-mono font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-wider">
          Bucket Table & Separate Chaining Entry Linked Lists
        </div>

        <div className="space-y-2 max-h-[420px] overflow-y-auto pr-1">
          {buckets.map((bucket) => {
            const isTargetBucket = lastIndex === bucket.index;
            const hasEntries = bucket.entries.length > 0;

            return (
              <div
                key={bucket.index}
                className={`p-3 rounded-xl border flex flex-col sm:flex-row sm:items-center gap-3 transition-all ${
                  isTargetBucket
                    ? 'border-purple-500/60 bg-purple-50 dark:bg-purple-500/10 shadow-md shadow-purple-500/10'
                    : 'border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/60'
                }`}
              >
                {/* Bucket Index Header */}
                <div className="flex items-center gap-2 w-28 shrink-0 font-mono text-xs">
                  <span className="w-8 h-8 bg-slate-200 dark:bg-slate-800 text-slate-800 dark:text-slate-300 rounded-lg flex items-center justify-center font-bold border border-slate-300 dark:border-slate-700">
                    {bucket.index}
                  </span>
                  <span className="text-slate-500 dark:text-slate-400 text-[10px]">
                    {hasEntries ? `${bucket.entries.length} entry` : 'empty'}
                  </span>
                </div>

                {/* Separate Chaining Entries */}
                <div className="flex-1 overflow-x-auto py-1">
                  {hasEntries ? (
                    <div className="flex items-center gap-2 min-w-max">
                      {bucket.entries.map((entry, eIdx) => (
                        <React.Fragment key={eIdx}>
                          <div className="px-3 py-2 bg-white dark:bg-slate-900 border border-purple-200 dark:border-purple-500/30 rounded-lg font-mono text-xs flex items-center gap-2 shadow-sm">
                            <span className="text-indigo-600 dark:text-indigo-300 font-bold">{String(entry.key)}</span>
                            <span className="text-slate-400">:</span>
                            <span className="text-amber-600 dark:text-amber-300 font-bold">{String(entry.value)}</span>
                            <span className="text-[9px] text-slate-500 dark:text-slate-500 font-normal ml-1">
                              (h: {entry.hash})
                            </span>
                          </div>
                          {eIdx < bucket.entries.length - 1 && (
                            <ArrowRight className="w-4 h-4 text-purple-500 dark:text-purple-400 shrink-0 animate-pulse" />
                          )}
                        </React.Fragment>
                      ))}
                    </div>
                  ) : (
                    <span className="text-xs text-slate-400 dark:text-slate-600 font-mono italic">
                      [null] — Bucket slot empty
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Footer Info Legend */}
      <div className="flex flex-wrap items-center gap-6 pt-2 border-t border-slate-200 dark:border-slate-800/80 text-xs font-mono text-slate-600 dark:text-slate-400">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-purple-100 dark:bg-purple-500/30 border border-purple-500 rounded"></div>
          <span>Active Operation Bucket</span>
        </div>
        <div className="flex items-center gap-2">
          <ArrowRight className="w-3.5 h-3.5 text-purple-500 dark:text-purple-400" />
          <span>Separate Chaining Link (`next` Entry Pointer)</span>
        </div>
      </div>
    </div>
  );
};
