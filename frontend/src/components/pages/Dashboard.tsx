import React from 'react';
import {
  Layers, GitCommit, Grid, GitFork, ArrowUp10, ArrowRight, CheckCircle2, Code2,
  RefreshCcw, ArrowLeftRight, ListFilter, Hash, Network, GitBranch
} from 'lucide-react';

interface DashboardProps {
  onSelectCollection: (colId: string) => void;
  onOpenCodeViewer: (colId: string) => void;
}

export const Dashboard: React.FC<DashboardProps> = ({ onSelectCollection, onOpenCodeViewer }) => {
  const collections = [
    { id: 'arraylist', name: 'Custom ArrayList', type: 'Dynamic Array', complexity: 'O(1) amortized', description: 'Dynamic resizing, 0-indexed element access, shift-left removal, shift-right insertion.', icon: Layers, iconBg: 'bg-[#84CC16] text-black font-extrabold', btnBg: 'bg-[#84CC16] hover:bg-[#65A30D] text-black font-extrabold' },
    { id: 'linkedlist', name: 'Custom LinkedList', type: 'Doubly Linked List', complexity: 'O(1) head/tail', description: 'Bi-directional nodes with data, next, and prev references. HEAD and TAIL pointers.', icon: GitCommit, iconBg: 'bg-[#10C98B] text-black font-extrabold', btnBg: 'bg-[#10C98B] hover:bg-[#0E9F6E] text-black font-extrabold' },
    { id: 'circularlinkedlist', name: 'Circular LinkedList', type: 'Circular Linked Loop', complexity: 'O(1) head/tail', description: 'Linked node sequence where the tail node next reference loops back to head.', icon: RefreshCcw, iconBg: 'bg-[#06B6D4] text-black font-extrabold', btnBg: 'bg-[#06B6D4] hover:bg-[#0891B2] text-black font-extrabold' },
    { id: 'stack', name: 'Custom Stack', type: 'LIFO Vertical Stack', complexity: 'O(1) push/pop', description: 'Last-In First-Out data structure with PUSH, POP, and PEEK operations at TOP.', icon: Layers, iconBg: 'bg-[#3B82F6] text-white font-extrabold', btnBg: 'bg-[#3B82F6] hover:bg-[#2563EB] text-white font-extrabold' },
    { id: 'queue', name: 'Custom Queue', type: 'FIFO Queue', complexity: 'O(1) enqueue/dequeue', description: 'First-In First-Out line structure with FRONT and REAR pointers.', icon: ListFilter, iconBg: 'bg-[#8B5CF6] text-white font-extrabold', btnBg: 'bg-[#8B5CF6] hover:bg-[#7C3AED] text-white font-extrabold' },
    { id: 'deque', name: 'Custom Deque', type: 'Double-Ended Queue', complexity: 'O(1) ends', description: 'Insertion and removal from both FIRST and LAST ends of the queue.', icon: ArrowLeftRight, iconBg: 'bg-[#D946EF] text-white font-extrabold', btnBg: 'bg-[#D946EF] hover:bg-[#C026D3] text-white font-extrabold' },
    { id: 'priorityqueue', name: 'Custom PriorityQueue', type: 'Binary Min-Heap Array', complexity: 'O(log n) offer/poll', description: 'Complete binary min-heap stored in array with sift-up and sift-down element ordering.', icon: ArrowUp10, iconBg: 'bg-[#F97316] text-black font-extrabold', btnBg: 'bg-[#F97316] hover:bg-[#EA580C] text-black font-extrabold' },
    { id: 'hashmap', name: 'Custom HashMap', type: 'Separate Chaining Hash Table', complexity: 'O(1) average', description: 'Bucket array, hash function, linked list entry collision resolution, dynamic load factor rehashing.', icon: Grid, iconBg: 'bg-[#EC4899] text-white font-extrabold', btnBg: 'bg-[#EC4899] hover:bg-[#DB2777] text-white font-extrabold' },
    { id: 'hashset', name: 'Custom HashSet', type: 'Unique Bucket Table', complexity: 'O(1) average', description: 'Hash bucket array ensuring distinct set element uniqueness without duplicates.', icon: Hash, iconBg: 'bg-[#F43F5E] text-white font-extrabold', btnBg: 'bg-[#F43F5E] hover:bg-[#E11D48] text-white font-extrabold' },
    { id: 'treemap', name: 'Custom TreeMap', type: 'Binary Search Tree (BST)', complexity: 'O(log n) average', description: 'Strict left < node < right ordering, 3-case node deletion algorithms, and in-order traversals.', icon: GitFork, iconBg: 'bg-[#F59E0B] text-black font-extrabold', btnBg: 'bg-[#F59E0B] hover:bg-[#D97706] text-black font-extrabold' },
    { id: 'bst', name: 'Binary Search Tree', type: 'BST Node Hierarchy', complexity: 'O(log n) average', description: 'Ordered binary tree hierarchy supporting insert, search, delete, and traversals.', icon: GitFork, iconBg: 'bg-[#6366F1] text-white font-extrabold', btnBg: 'bg-[#6366F1] hover:bg-[#4F46E5] text-white font-extrabold' },
    { id: 'heap', name: 'Custom Min Heap', type: 'Binary Min-Heap Tree', complexity: 'O(log n) insert/extract', description: 'Binary min-heap parent \u2264 child tree structure with underlying array mapping.', icon: ArrowUp10, iconBg: 'bg-[#14B8A6] text-black font-extrabold', btnBg: 'bg-[#14B8A6] hover:bg-[#0D9488] text-black font-extrabold' },
    { id: 'trie', name: 'Custom Trie', type: 'Prefix Tree', complexity: 'O(L) word search', description: 'Character node prefix tree for fast word lookup, deletion, and autocomplete search.', icon: Network, iconBg: 'bg-[#0EA5E9] text-black font-extrabold', btnBg: 'bg-[#0EA5E9] hover:bg-[#0284C7] text-black font-extrabold' },
    { id: 'graph', name: 'Custom Graph', type: 'Adjacency List Graph', complexity: 'O(V + E) traversals', description: 'Undirected vertex and edge graph supporting BFS and DFS traversal algorithms.', icon: Network, iconBg: 'bg-[#EF4444] text-white font-extrabold', btnBg: 'bg-[#EF4444] hover:bg-[#DC2626] text-white font-extrabold' },
    { id: 'disjointset', name: 'Disjoint Set (Union-Find)', type: 'Union-Find Forest', complexity: 'O(\u03b1(n)) amortized', description: 'Forest of trees tracking disjoint sets using Rank optimization and Path Compression.', icon: GitBranch, iconBg: 'bg-[#10B981] text-black font-extrabold', btnBg: 'bg-[#10B981] hover:bg-[#059669] text-black font-extrabold' }
  ];

  return (
    <div className="space-y-8 py-6 max-w-[1400px] mx-auto px-4 sm:px-8">
      <div className="bg-white dark:bg-slate-900 border border-[#DCE6F2] dark:border-slate-800 rounded-2xl p-6 shadow-xs flex flex-wrap items-center justify-between gap-4">
        <div className="space-y-1">
          <h1 className="section-heading text-[#0F172A] dark:text-white flex items-center gap-2">
            CollectionLab Dashboard
          </h1>
          <p className="text-xs sm:text-sm text-[#475569] dark:text-slate-400 font-sans font-normal">
            Explore 15 custom Java data structures with live REST state transitions, algorithms, and Big-O performance.
          </p>
        </div>

        <div className="flex items-center gap-2 font-mono font-medium text-xs text-[#10B981] bg-[#ECFDF5] dark:bg-emerald-950/40 px-3.5 py-1.5 rounded-xl border border-[#A7F3D0] dark:border-emerald-800">
          <CheckCircle2 className="w-4 h-4" />
          <span>Real Spring Boot Backend Connected (15 Collections)</span>
        </div>
      </div>

      <div className="space-y-4">
        <h2 className="text-xs font-mono font-medium text-[#475569] dark:text-slate-400 uppercase tracking-wider">
          Available Scratch Collection Visualizers ({collections.length})
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {collections.map((col) => {
            const Icon = col.icon;
            return (
              <div
                key={col.id}
                className="bg-white dark:bg-slate-900 border border-[#DCE6F2] dark:border-slate-800 hover:border-[#84CC16]/40 rounded-2xl p-5 shadow-xs flex flex-col justify-between space-y-4 transition-all hover:-translate-y-0.5"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className={`p-2.5 rounded-xl ${col.iconBg}`}>
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
                    className="flex items-center gap-1 text-xs text-[#475569] hover:text-[#84CC16] dark:text-slate-400 dark:hover:text-lime-400 font-mono font-medium transition-colors cursor-pointer"
                  >
                    <Code2 className="w-3.5 h-3.5" /> Source
                  </button>

                  <button
                    onClick={() => onSelectCollection(col.id)}
                    className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs sm:text-[13px] font-sans font-extrabold shadow-xs transition-all cursor-pointer ${col.btnBg}`}
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
