import React from 'react';
import { ListOrdered, CheckCircle2, AlertCircle, Clock } from 'lucide-react';
import type { OperationResponse } from '../../types/collections';

interface StepsPanelProps {
  lastResponse: OperationResponse | null;
}

export const StepsPanel: React.FC<StepsPanelProps> = ({ lastResponse }) => {
  if (!lastResponse) {
    return (
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-sm dark:shadow-xl transition-colors">
        <h3 className="text-xs font-mono font-medium tracking-wider uppercase text-slate-500 dark:text-slate-400 flex items-center gap-2 mb-3">
          <ListOrdered className="w-4 h-4 text-blue-600 dark:text-blue-400" />
          Algorithm Execution Tracing
        </h3>
        <p className="text-xs text-slate-500 italic py-6 text-center font-mono font-normal">
          Execute any collection operation to trace internal state changes step-by-step.
        </p>
      </div>
    );
  }

  const { operation, success, complexity, steps, errorMessage, internalDetails } = lastResponse;

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-sm dark:shadow-xl space-y-4 transition-colors">
      <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-3">
        <div className="flex items-center gap-2">
          <h3 className="text-xs font-mono font-medium tracking-wider uppercase text-slate-700 dark:text-slate-300 flex items-center gap-2">
            <ListOrdered className="w-4 h-4 text-blue-600 dark:text-blue-400" />
            Execution Trace: <span className="text-blue-600 dark:text-blue-400 font-mono font-medium">{operation}</span>
          </h3>
          {success ? (
            <span className="px-2 py-0.5 bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-500/30 rounded-lg text-[10px] font-mono font-medium flex items-center gap-1">
              <CheckCircle2 className="w-3 h-3" /> SUCCESS
            </span>
          ) : (
            <span className="px-2 py-0.5 bg-rose-50 dark:bg-rose-500/10 text-rose-600 dark:text-rose-400 border border-rose-200 dark:border-rose-500/30 rounded-lg text-[10px] font-mono font-medium flex items-center gap-1">
              <AlertCircle className="w-3 h-3" /> FAILED
            </span>
          )}
        </div>

        <div className="flex items-center gap-1.5 px-2.5 py-1 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl text-xs font-mono font-medium text-amber-600 dark:text-amber-400">
          <Clock className="w-3.5 h-3.5" />
          <span>Big-O: {complexity}</span>
        </div>
      </div>

      {errorMessage && (
        <div className="p-3 bg-rose-50 dark:bg-rose-500/10 border border-rose-200 dark:border-rose-500/30 rounded-xl text-xs text-rose-600 dark:text-rose-300 font-mono">
          <strong>Error:</strong> {errorMessage}
        </div>
      )}

      {/* Step List */}
      <div className="space-y-2 max-h-60 overflow-y-auto pr-1">
        {steps && steps.length > 0 ? (
          steps.map((step, idx) => (
            <div
              key={idx}
              className="flex items-start gap-3 p-2.5 bg-slate-50 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800/80 rounded-xl text-xs font-mono text-slate-800 dark:text-slate-300 transition-all hover:border-blue-400"
            >
              <span className="w-5 h-5 bg-blue-50 dark:bg-blue-500/10 border border-blue-200 dark:border-blue-500/30 text-blue-600 dark:text-blue-400 rounded-lg flex items-center justify-center shrink-0 font-bold text-[10px]">
                {idx + 1}
              </span>
              <span className="leading-relaxed">{step}</span>
            </div>
          ))
        ) : (
          <div className="text-xs text-slate-500 italic py-2 font-mono">No step logs recorded.</div>
        )}
      </div>

      {/* Internal Details summary */}
      {internalDetails && Object.keys(internalDetails).length > 0 && (
        <div className="pt-2 border-t border-slate-200 dark:border-slate-800">
          <span className="text-[10px] font-mono text-slate-400 uppercase font-bold tracking-wider block mb-1">
            Internal State Metrics
          </span>
          <div className="flex flex-wrap gap-2 text-xs font-mono">
            {Object.entries(internalDetails).map(([k, v]) => (
              <span key={k} className="px-2 py-1 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 rounded-lg">
                <span className="text-slate-400">{k}:</span> <strong className="text-blue-600 dark:text-blue-300">{String(v)}</strong>
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
