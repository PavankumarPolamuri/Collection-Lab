import React from 'react';
import type { TrieState, TrieNodeDto, OperationResponse } from '../../types/collections';
import { Network } from 'lucide-react';

interface TrieVisualizerProps {
  state: TrieState;
  lastResponse?: OperationResponse | null;
}

export const TrieVisualizer: React.FC<TrieVisualizerProps> = ({ state }) => {
  const root = state?.root;

  const renderTrieNode = (node: TrieNodeDto | null): React.ReactNode => {
    if (!node) return null;
    const childrenKeys = Object.keys(node.children || {});

    return (
      <div className="flex flex-col items-center">
        <div
          className={`px-3 py-1.5 rounded-xl border font-mono text-xs font-bold flex items-center gap-1.5 shadow-sm ${
            node.isEndOfWord
              ? 'bg-emerald-500/20 border-emerald-500 text-emerald-300'
              : 'bg-indigo-500/10 border-indigo-500/40 text-indigo-300'
          }`}
        >
          <span>{node.ch === 'ROOT' || !node.ch ? 'ROOT' : node.ch}</span>
          {node.isEndOfWord && (
            <span className="text-[9px] px-1.5 py-0.2 bg-emerald-500 text-slate-950 font-black rounded uppercase">
              END
            </span>
          )}
        </div>

        {childrenKeys.length > 0 && (
          <div className="flex gap-4 pt-3 relative border-t border-slate-700/40 mt-1">
            {childrenKeys.map((k) => (
              <div key={k} className="flex flex-col items-center">
                {renderTrieNode(node.children[k])}
              </div>
            ))}
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
            <Network className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
              Custom Trie
              <span className="text-[10px] font-mono font-medium px-2 py-0.5 bg-indigo-500/10 text-indigo-400 rounded-md border border-indigo-500/20">
                Prefix Tree
              </span>
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 font-sans">
              Character tree for fast O(L) word lookup and prefix autocomplete search
            </p>
          </div>
        </div>

        <div className="flex items-center gap-4 text-xs font-mono">
          <div className="bg-slate-100 dark:bg-slate-950 px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-800">
            <span className="text-slate-400">Total Words: </span>
            <span className="font-bold text-indigo-400">{state?.wordCount ?? 0}</span>
          </div>
        </div>
      </div>

      {/* Trie Tree Canvas */}
      <div className="min-h-[240px] bg-slate-50 dark:bg-slate-950/60 rounded-xl p-6 border border-slate-200 dark:border-slate-800 flex items-center justify-center overflow-x-auto">
        {!root || (Object.keys(root.children || {}).length === 0 && !root.isEndOfWord) ? (
          <div className="text-center py-12 text-slate-400 font-mono text-xs">
            Trie is empty. Insert words to visualize character branches.
          </div>
        ) : (
          renderTrieNode(root)
        )}
      </div>
    </div>
  );
};
