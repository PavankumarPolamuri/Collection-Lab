import React from 'react';
import { History, Trash2, CheckCircle2, XCircle } from 'lucide-react';
import type { OperationHistoryItem } from '../../types/collections';

interface HistoryPanelProps {
  history: OperationHistoryItem[];
  onClearHistory: () => void;
}

export const HistoryPanel: React.FC<HistoryPanelProps> = ({ history, onClearHistory }) => {
  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-sm dark:shadow-xl space-y-4 transition-colors">
      <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-3">
        <h3 className="text-xs font-mono font-medium tracking-wider uppercase text-slate-500 dark:text-slate-400 flex items-center gap-2">
          <History className="w-4 h-4 text-blue-600 dark:text-blue-400" />
          Real Session Operation History ({history.length})
        </h3>
        {history.length > 0 && (
          <button
            onClick={onClearHistory}
            className="flex items-center gap-1 text-xs text-slate-500 hover:text-rose-500 font-sans font-semibold transition-colors"
          >
            <Trash2 className="w-3.5 h-3.5" /> Clear History
          </button>
        )}
      </div>

      {history.length === 0 ? (
        <div className="text-center py-8 text-slate-400 font-mono font-normal text-xs italic">
          No operations yet. Perform an operation on any collection to view real session history here.
        </div>
      ) : (
        <div className="space-y-2 max-h-72 overflow-y-auto pr-1">
          {history.map((item) => (
            <div
              key={item.id}
              className="p-3 bg-slate-50 dark:bg-slate-950/70 border border-slate-200 dark:border-slate-800 rounded-xl space-y-1.5 font-mono font-normal text-xs transition-all hover:border-blue-400"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  {item.success ? (
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                  ) : (
                    <XCircle className="w-3.5 h-3.5 text-rose-500 shrink-0" />
                  )}
                  <span className="font-medium text-slate-900 dark:text-slate-200">{item.structure}</span>
                  <span className="text-blue-600 dark:text-blue-400 font-medium">• {item.operation}</span>
                </div>
                <span className="text-[10px] text-slate-400 font-normal">{item.timestamp}</span>
              </div>

              <div className="flex items-center justify-between text-[11px] text-slate-600 dark:text-slate-400 font-normal">
                <span>Input: <strong className="text-slate-900 dark:text-slate-200 font-medium">{item.input || 'None'}</strong></span>
                <span className="text-amber-600 dark:text-amber-400 font-medium">{item.complexity}</span>
              </div>

              {item.errorMessage && (
                <div className="text-rose-600 dark:text-rose-400 text-[11px] bg-rose-50 dark:bg-rose-500/10 p-1.5 rounded-lg border border-rose-200 dark:border-rose-500/20">
                  {item.errorMessage}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
