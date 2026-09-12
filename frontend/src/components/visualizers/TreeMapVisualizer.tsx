import React from 'react';
import type { TreeMapState, TreeNodeDto, OperationResponse } from '../../types/collections';
import { GitFork, ArrowRight, CheckCircle2 } from 'lucide-react';

interface TreeMapVisualizerProps {
  state: TreeMapState;
  lastResponse: OperationResponse<TreeMapState> | null;
}

export const TreeMapVisualizer: React.FC<TreeMapVisualizerProps> = ({ state, lastResponse }) => {
  const { root, size, firstKey, lastKey, inorderTraversal } = state;

  const traversalResult = lastResponse?.internalDetails?.result || inorderTraversal;

  // Recursive Tree Node Renderer
  const renderTreeNode = (node: TreeNodeDto | null, depth: number = 0): React.ReactNode => {
    if (!node) return null;

    const isRoot = depth === 0;

    return (
      <div className="flex flex-col items-center">
        {/* Node Card */}
        <div className="flex flex-col items-center group relative">
          <div
            className={`px-4 py-2 bg-slate-50 dark:bg-slate-950 border-2 rounded-xl font-mono text-center shadow-lg transition-all duration-300 ${
              isRoot
                ? 'border-orange-500 text-orange-900 dark:text-orange-200 bg-orange-50 dark:bg-orange-500/10'
                : 'border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 hover:border-orange-400 dark:hover:border-orange-400'
            }`}
          >
            <span className="text-[10px] text-slate-500 dark:text-slate-400 block uppercase font-bold">
              {isRoot ? 'ROOT' : 'NODE'}
            </span>
            <span className="text-sm font-bold text-slate-900 dark:text-white block">{String(node.key)}</span>
            {node.value && (
              <span className="text-[10px] text-amber-600 dark:text-amber-300 block font-normal">val: {String(node.value)}</span>
            )}
          </div>
        </div>

        {/* Children Branches */}
        {(node.left || node.right) && (
          <div className="flex items-start justify-center gap-6 sm:gap-12 pt-4 relative">
            <div className="absolute top-0 left-1/4 right-1/4 h-[2px] bg-slate-300 dark:bg-slate-700"></div>

            <div className="flex flex-col items-center relative">
              <div className="w-[1px] h-4 bg-slate-300 dark:bg-slate-700 mb-1"></div>
              <span className="text-[9px] font-mono text-slate-500 dark:text-slate-400 mb-1">&lt; left</span>
              {node.left ? (
                renderTreeNode(node.left, depth + 1)
              ) : (
                <div className="px-2 py-1 bg-slate-100 dark:bg-slate-950/40 border border-slate-200 dark:border-slate-800/60 rounded text-[10px] text-slate-400 dark:text-slate-600 font-mono">
                  null
                </div>
              )}
            </div>

            <div className="flex flex-col items-center relative">
              <div className="w-[1px] h-4 bg-slate-300 dark:bg-slate-700 mb-1"></div>
              <span className="text-[9px] font-mono text-slate-500 dark:text-slate-400 mb-1">right &gt;</span>
              {node.right ? (
                renderTreeNode(node.right, depth + 1)
              ) : (
                <div className="px-2 py-1 bg-slate-100 dark:bg-slate-950/40 border border-slate-200 dark:border-slate-800/60 rounded text-[10px] text-slate-400 dark:text-slate-600 font-mono">
                  null
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-6 shadow-sm dark:shadow-xl space-y-6">
      {/* Header Info */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-4">
        <div>
          <h2 className="card-title text-slate-900 dark:text-white flex items-center gap-2">
            <GitFork className="w-5 h-5 text-orange-600 dark:text-orange-400" />
            Custom TreeMap Visualizer (Binary Search Tree)
          </h2>
          <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">
            Standard BST rule: <code className="text-orange-600 dark:text-orange-300 font-mono">left &lt; node &lt; right</code>. Supports tree traversals and 3-case node deletions.
          </p>
        </div>

        <div className="flex items-center gap-3 font-mono text-xs">
          <div className="px-3 py-1.5 bg-slate-100 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg">
            <span className="text-slate-500 dark:text-slate-400">Size:</span> <strong className="text-orange-600 dark:text-orange-400 text-sm">{size}</strong>
          </div>
          <div className="px-3 py-1.5 bg-slate-100 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg">
            <span className="text-slate-500 dark:text-slate-400">Min (firstKey):</span> <strong className="text-emerald-600 dark:text-emerald-400 text-sm">{firstKey !== null ? String(firstKey) : 'null'}</strong>
          </div>
          <div className="px-3 py-1.5 bg-slate-100 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg">
            <span className="text-slate-500 dark:text-slate-400">Max (lastKey):</span> <strong className="text-amber-600 dark:text-amber-400 text-sm">{lastKey !== null ? String(lastKey) : 'null'}</strong>
          </div>
        </div>
      </div>

      {/* Traversal Sequence Banner */}
      {traversalResult && traversalResult.length > 0 && (
        <div className="p-4 bg-orange-50/50 dark:bg-slate-950 border border-orange-200 dark:border-orange-500/30 rounded-xl space-y-1 font-mono text-xs">
          <div className="flex items-center justify-between">
            <span className="text-slate-700 dark:text-slate-400 text-[10px] uppercase font-bold flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-orange-600 dark:text-orange-400" />
              {lastResponse?.operation.includes('TRAVERSAL') ? lastResponse.operation : 'Sorted In-order Traversal Sequence'}
            </span>
            <span className="text-emerald-600 dark:text-emerald-400 text-[10px]">Strictly Sorted Order</span>
          </div>
          <div className="flex flex-wrap items-center gap-2 pt-1 font-bold text-sm text-orange-900 dark:text-orange-200">
            {traversalResult.map((key: any, idx: number) => (
              <React.Fragment key={idx}>
                <span className="px-2.5 py-1 bg-orange-100 dark:bg-orange-500/10 border border-orange-300 dark:border-orange-500/30 rounded">
                  {String(key)}
                </span>
                {idx < traversalResult.length - 1 && (
                  <ArrowRight className="w-3.5 h-3.5 text-slate-400 dark:text-slate-600" />
                )}
              </React.Fragment>
            ))}
          </div>
        </div>
      )}

      {/* Tree Structure Graph Display */}
      <div className="space-y-3">
        <div className="text-xs font-mono font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-wider">
          Binary Search Tree Hierarchy
        </div>

        {root ? (
          <div className="overflow-x-auto py-6 flex justify-center min-w-max">
            {renderTreeNode(root)}
          </div>
        ) : (
          <div className="py-12 border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-xl text-center font-mono text-xs text-slate-500 dark:text-slate-400 bg-slate-50 dark:bg-slate-950/40">
            [ROOT: null] — CustomTreeMap is currently empty.
          </div>
        )}
      </div>

      {/* Note / Disclaimer Footer */}
      <div className="pt-3 border-t border-slate-200 dark:border-slate-800 text-[11px] font-mono text-slate-600 dark:text-slate-400">
        <strong className="text-amber-600 dark:text-amber-400">Interview Distinction:</strong> Standard JDK <code className="text-orange-600 dark:text-orange-300">java.util.TreeMap</code> uses a self-balancing Red-Black Tree to ensure guaranteed O(log n) height balance. CollectionLab uses a Binary Search Tree (BST) for clear educational visual tracing.
      </div>
    </div>
  );
};
