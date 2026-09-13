import React from 'react';
import type { GraphState, OperationResponse } from '../../types/collections';
import { Network } from 'lucide-react';

interface GraphVisualizerProps {
  state: GraphState;
  lastResponse?: OperationResponse | null;
}

export const GraphVisualizer: React.FC<GraphVisualizerProps> = ({ state }) => {
  const vertices = state?.vertices || [];
  const adj = state?.adjacencyList || {};
  const lastTraversal = state?.lastTraversal || [];

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm dark:shadow-xl space-y-6">
      {/* Metrics Row */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-4">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-sky-500/10 text-sky-500 rounded-xl">
            <Network className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
              Undirected Graph
              <span className="text-[10px] font-mono font-medium px-2 py-0.5 bg-sky-500/10 text-sky-400 rounded-md border border-sky-500/20">
                Adjacency List Model
              </span>
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 font-sans">
              Vertices and bidirectional edge connections with BFS/DFS traversals
            </p>
          </div>
        </div>

        <div className="flex items-center gap-4 text-xs font-mono">
          <div className="bg-slate-100 dark:bg-slate-950 px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-800">
            <span className="text-slate-400">Vertices: </span>
            <span className="font-bold text-sky-400">{state?.vertexCount ?? 0}</span>
          </div>
          <div className="bg-slate-100 dark:bg-slate-950 px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-800">
            <span className="text-slate-400">Edges: </span>
            <span className="font-bold text-amber-400">{state?.edgeCount ?? 0}</span>
          </div>
        </div>
      </div>

      {/* Adjacency Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {vertices.length === 0 ? (
          <div className="col-span-full text-center py-12 text-slate-400 font-mono text-xs">
            Graph is empty. Use ADD VERTEX and ADD EDGE to build graph.
          </div>
        ) : (
          vertices.map((v) => {
            const neighbors = adj[v] || [];
            const isHighlighted = lastTraversal.includes(v);
            const traversalOrder = lastTraversal.indexOf(v);

            return (
              <div
                key={v}
                className={`bg-slate-50 dark:bg-slate-950/60 border rounded-xl p-4 space-y-3 transition-all ${
                  isHighlighted
                    ? 'border-sky-500 bg-sky-500/5 shadow-md shadow-sky-500/10'
                    : 'border-slate-200 dark:border-slate-800'
                }`}
              >
                <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-2">
                  <div className="flex items-center gap-2">
                    <span className="w-7 h-7 rounded-full bg-sky-500/20 text-sky-400 font-mono font-bold text-xs flex items-center justify-center border border-sky-500/40">
                      {v}
                    </span>
                    <span className="text-xs font-mono font-bold text-slate-800 dark:text-slate-200">
                      Vertex {v}
                    </span>
                  </div>
                  {traversalOrder >= 0 && (
                    <span className="text-[10px] font-mono px-2 py-0.5 bg-amber-500/20 text-amber-400 rounded-full font-bold">
                      Order #{traversalOrder + 1}
                    </span>
                  )}
                </div>

                <div className="space-y-1">
                  <span className="text-[10px] font-mono text-slate-400 uppercase">Adjacent Neighbors ({neighbors.length}):</span>
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {neighbors.length === 0 ? (
                      <span className="text-[11px] font-mono text-slate-400 italic">No connected edges</span>
                    ) : (
                      neighbors.map((n, idx) => (
                        <span key={idx} className="px-2.5 py-1 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-md text-xs font-mono font-semibold text-slate-300">
                          &rarr; {n}
                        </span>
                      ))
                    )}
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Traversal Output Bar */}
      {lastTraversal.length > 0 && (
        <div className="p-4 bg-slate-100 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl font-mono text-xs space-y-1">
          <span className="text-slate-400 uppercase text-[10px] tracking-wider block">Graph Traversal Sequence:</span>
          <div className="flex flex-wrap gap-2 text-sky-300 font-semibold pt-1">
            {lastTraversal.map((val, idx) => (
              <span key={idx} className="px-2.5 py-1 bg-sky-500/10 rounded border border-sky-500/20 flex items-center gap-1">
                <span className="text-slate-400 text-[10px]">{idx + 1}.</span> {val}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
