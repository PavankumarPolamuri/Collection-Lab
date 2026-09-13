import React from 'react';
import type { BSTState, BSTNodeDto, OperationResponse } from '../../types/collections';
import { GitFork } from 'lucide-react';

interface BSTVisualizerProps {
  state: BSTState;
  lastResponse?: OperationResponse | null;
}

export const BSTVisualizer: React.FC<BSTVisualizerProps> = ({ state }) => {
  const root = state?.root;
  const lastTraversal = state?.lastTraversal || [];

  const renderTree = (node: BSTNodeDto | null, depth: number = 0): React.ReactNode => {
    if (!node) return null;

    return (
      <div className="flex flex-col items-center">
        <div className="px-4 py-2 bg-indigo-600/20 border border-indigo-500 rounded-xl font-mono text-xs font-bold text-indigo-300 shadow-md shadow-indigo-500/10 mb-2">
          {String(node.key)}
        </div>
        {(node.left || node.right) && (
          <div className="flex gap-6 pt-2 relative border-t border-slate-700/50">
            <div className="flex flex-col items-center">
              <span className="text-[9px] font-mono text-slate-500 mb-1">L</span>
              {renderTree(node.left, depth + 1)}
            </div>
            <div className="flex flex-col items-center">
              <span className="text-[9px] font-mono text-slate-500 mb-1">R</span>
              {renderTree(node.right, depth + 1)}
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm dark:shadow-xl space-y-6">
      {/* Metrics Row */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-4">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-indigo-500/10 text-indigo-500 rounded-xl">
            <GitFork className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
              Binary Search Tree (BST)
              <span className="text-[10px] font-mono font-medium px-2 py-0.5 bg-indigo-500/10 text-indigo-400 rounded-md border border-indigo-500/20">
                Left &lt; Root &lt; Right
              </span>
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 font-sans">
              Ordered tree hierarchy supporting O(log n) lookup, insert, and delete
            </p>
          </div>
        </div>

        <div className="flex items-center gap-4 text-xs font-mono">
          <div className="bg-slate-100 dark:bg-slate-950 px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-800">
            <span className="text-slate-400">Node Count: </span>
            <span className="font-bold text-indigo-400">{state?.size ?? 0}</span>
          </div>
        </div>
      </div>

      {/* Tree Diagram Container */}
      <div className="min-h-[240px] bg-slate-50 dark:bg-slate-950/60 rounded-xl p-6 border border-slate-200 dark:border-slate-800 flex items-center justify-center overflow-x-auto">
        {!root ? (
          <div className="text-center py-12 text-slate-400 font-mono text-xs">
            BST is empty. Use INSERT to build the binary tree.
          </div>
        ) : (
          renderTree(root)
        )}
      </div>

      {/* Traversal Output Bar */}
      {lastTraversal.length > 0 && (
        <div className="p-4 bg-slate-100 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl font-mono text-xs space-y-1">
          <span className="text-slate-400 uppercase text-[10px] tracking-wider block">Last Traversal Result:</span>
          <div className="flex flex-wrap gap-2 text-indigo-300 font-semibold pt-1">
            {lastTraversal.map((val, idx) => (
              <span key={idx} className="px-2 py-0.5 bg-indigo-500/10 rounded border border-indigo-500/20">
                {String(val)}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
