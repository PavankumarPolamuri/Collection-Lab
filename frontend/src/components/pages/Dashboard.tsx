import React from 'react';
import { Layers, GitCommit, Grid, GitFork, ArrowUp10, ArrowRight, CheckCircle2, Code2 } from 'lucide-react';

interface DashboardProps {
  onSelectCollection: (colId: string) => void;
  onOpenCodeViewer: (colId: string) => void;
}

export const Dashboard: React.FC<DashboardProps> = ({ onSelectCollection, onOpenCodeViewer }) => {
  const collections = [
    {
      id: 'arraylist',
      name: 'Custom ArrayList',
      type: 'Dynamic Array',
      complexity: 'O(1) amortized',
      description: 'Dynamic resizing, 0-indexed element access, shift-left removal, shift-right insertion.',
      icon: Layers,
      color: 'text-blue-600 bg-blue-50 dark:bg-blue-950/40 border-blue-200 dark:border-blue-800'
    },
    {
      id: 'linkedlist',
      name: 'Custom LinkedList',
      type: 'Doubly Linked List',
      complexity: 'O(1) head/tail',
      description: 'Bi-directional nodes with data, next, and prev references. HEAD and TAIL pointers.',
      icon: GitCommit,
      color: 'text-emerald-600 bg-emerald-50 dark:bg-emerald-950/40 border-emerald-200 dark:border-emerald-800'
    },
    {
      id: 'hashmap',
      name: 'Custom HashMap',
      type: 'Separate Chaining Hash Table',
      complexity: 'O(1) average',
      description: 'Bucket array, hash function, linked list entry collision resolution, dynamic load factor rehashing.',
      icon: Grid,
      color: 'text-purple-600 bg-purple-50 dark:bg-purple-950/40 border-purple-200 dark:border-purple-800'
    },
    {
      id: 'treemap',
      name: 'Custom TreeMap',
      type: 'Binary Search Tree (BST)',
      complexity: 'O(log n) average',
      description: 'Strict left < node < right ordering, 3-case node deletion algorithms, and in-order traversals.',
      icon: GitFork,
      color: 'text-amber-600 bg-amber-50 dark:bg-amber-950/40 border-amber-200 dark:border-amber-800'
    },
    {
      id: 'priorityqueue',
      name: 'Custom PriorityQueue',
      type: 'Binary Min-Heap',
      complexity: 'O(log n) offer/poll',
      description: 'Complete binary min-heap stored in array with sift-up and sift-down element ordering.',
      icon: ArrowUp10,
      color: 'text-pink-600 bg-pink-50 dark:bg-pink-950/40 border-pink-200 dark:border-pink-800'
    }
  ];

  return (
    <div className="space-y-8 py-6 max-w-[1400px] mx-auto px-4 sm:px-8">
      {/* Top Banner */}
      <div className="bg-white dark:bg-slate-900 border border-[#DCE6F2] dark:border-slate-800 rounded-2xl p-6 shadow-xs flex flex-wrap items-center justify-between gap-4">
        <div className="space-y-1">
          <h1 className="section-heading text-[#0F172A] dark:text-white flex items-center gap-2">
            CollectionLab Dashboard
          </h1>
          <p className="text-xs sm:text-sm text-[#475569] dark:text-slate-400 font-sans font-normal">
            Select a custom Java collection to inspect internal state transitions, algorithms, and Big-O performance.
          </p>
        </div>

        <div className="flex items-center gap-2 font-mono font-medium text-xs text-[#10B981] bg-[#ECFDF5] dark:bg-emerald-950/40 px-3.5 py-1.5 rounded-xl border border-[#A7F3D0] dark:border-emerald-800">
          <CheckCircle2 className="w-4 h-4" />
          <span>Real Spring Boot Backend Connected</span>
        </div>
      </div>

      {/* Grid of 5 Data Structures */}
      <div className="space-y-4">
        <h2 className="text-xs font-mono font-medium text-[#475569] dark:text-slate-400 uppercase tracking-wider">
          Available Scratch Collection Visualizers
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {collections.map((col) => {
            const Icon = col.icon;
            return (
              <div
                key={col.id}
                className="bg-white dark:bg-slate-900 border border-[#DCE6F2] dark:border-slate-800 hover:border-blue-300 dark:hover:border-slate-700 rounded-2xl p-5 shadow-xs flex flex-col justify-between space-y-4 transition-all hover:-translate-y-0.5"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className={`p-2.5 rounded-xl border ${col.color}`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="text-[10px] font-mono font-medium text-[#D97706] bg-[#FFFBEB] dark:bg-amber-950/40 border border-[#FDE68A] dark:border-amber-800 px-2.5 py-0.5 rounded-full">
                      {col.complexity}
                    </span>
                  </div>

                  <div>
                    <h3 className="card-title text-[#0F172A] dark:text-white">{col.name}</h3>
                    <span className="text-xs text-[#475569] dark:text-slate-400 font-mono font-normal block mt-0.5">{col.type}</span>
                  </div>

                  <p className="text-xs sm:text-sm text-[#475569] dark:text-slate-300 leading-relaxed font-sans font-normal">
                    {col.description}
                  </p>
                </div>

                <div className="pt-3 border-t border-[#DCE6F2] dark:border-slate-800 flex items-center justify-between">
                  <button
                    onClick={() => onOpenCodeViewer(col.id)}
                    className="flex items-center gap-1 text-xs text-[#475569] hover:text-[#FF6B00] dark:text-slate-400 dark:hover:text-orange-400 font-mono font-medium transition-colors"
                  >
                    <Code2 className="w-3.5 h-3.5" /> Source
                  </button>

                  <button
                    onClick={() => onSelectCollection(col.id)}
                    className="flex items-center gap-1.5 px-3.5 py-1.5 bg-[#FF6B00] hover:bg-[#EA580C] text-white rounded-xl text-xs sm:text-[13px] font-sans font-semibold shadow-xs transition-all"
                  >
                    <span>Launch Visualizer</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
