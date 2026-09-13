import React, { useState } from 'react';
import {
  List, Link as LinkIcon, Hash, GitFork, Layers, Code2,
  Sparkles, ArrowRight, ChevronUp, RefreshCcw, ArrowLeftRight, ListFilter, Network, GitBranch
} from 'lucide-react';

interface LandingPageProps {
  onSelectTab: (tabId: string) => void;
  onOpenCodeViewer: (colId?: string) => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ onSelectTab, onOpenCodeViewer }) => {
  const [showAll, setShowAll] = useState<boolean>(false);

  const collections = [
    {
      id: 'arraylist',
      name: 'ArrayList',
      description: 'Dynamic array with automatic capacity expansion.',
      icon: List,
      cardBg: 'bg-[#10182A]',
      borderColor: 'border-[#F59E0B]/30 hover:border-[#F59E0B]',
      glowClass: 'hover:glow-arraylist',
      iconBg: 'bg-[#F59E0B] text-black font-extrabold',
      btnBg: 'bg-[#F59E0B] hover:bg-[#D97706] text-black font-extrabold shadow-amber-500/20',
      bullets: [{ label: 'Access', value: 'O(1)' }, { label: 'Search', value: 'O(n)' }, { label: 'Insert', value: 'O(1)*' }]
    },
    {
      id: 'linkedlist',
      name: 'LinkedList',
      description: 'Doubly linked list with efficient insertions and deletions.',
      icon: LinkIcon,
      cardBg: 'bg-[#10182A]',
      borderColor: 'border-[#10C98B]/30 hover:border-[#10C98B]',
      glowClass: 'hover:glow-linkedlist',
      iconBg: 'bg-[#10C98B] text-black font-extrabold',
      btnBg: 'bg-[#10C98B] hover:bg-[#0E9F6E] text-black font-extrabold shadow-emerald-500/20',
      bullets: [{ label: 'Access', value: 'O(n)' }, { label: 'Insert', value: 'O(1)' }, { label: 'Delete', value: 'O(1)' }]
    },
    {
      id: 'circularlinkedlist',
      name: 'Circular LinkedList',
      description: 'Linked node sequence looping tail node back to head.',
      icon: RefreshCcw,
      cardBg: 'bg-[#10182A]',
      borderColor: 'border-[#06B6D4]/30 hover:border-[#06B6D4]',
      glowClass: 'hover:glow-linkedlist',
      iconBg: 'bg-[#06B6D4] text-black font-extrabold',
      btnBg: 'bg-[#06B6D4] hover:bg-[#0891B2] text-black font-extrabold shadow-cyan-500/20',
      bullets: [{ label: 'Head/Tail', value: 'O(1)' }, { label: 'Search', value: 'O(n)' }, { label: 'Loop', value: 'Circular' }]
    },
    {
      id: 'stack',
      name: 'Stack',
      description: 'LIFO vertical structure supporting push, pop, and peek.',
      icon: Layers,
      cardBg: 'bg-[#10182A]',
      borderColor: 'border-[#3B82F6]/30 hover:border-[#3B82F6]',
      glowClass: 'hover:glow-linkedlist',
      iconBg: 'bg-[#3B82F6] text-white font-extrabold',
      btnBg: 'bg-[#3B82F6] hover:bg-[#2563EB] text-white font-extrabold shadow-blue-500/20',
      bullets: [{ label: 'Push', value: 'O(1)' }, { label: 'Pop', value: 'O(1)' }, { label: 'Peek', value: 'O(1)' }]
    },
    {
      id: 'queue',
      name: 'Queue',
      description: 'FIFO line structure with front and rear pointers.',
      icon: ListFilter,
      cardBg: 'bg-[#10182A]',
      borderColor: 'border-[#8B5CF6]/30 hover:border-[#8B5CF6]',
      glowClass: 'hover:glow-arraylist',
      iconBg: 'bg-[#8B5CF6] text-white font-extrabold',
      btnBg: 'bg-[#8B5CF6] hover:bg-[#7C3AED] text-white font-extrabold shadow-violet-500/20',
      bullets: [{ label: 'Enqueue', value: 'O(1)' }, { label: 'Dequeue', value: 'O(1)' }, { label: 'Peek', value: 'O(1)' }]
    },
    {
      id: 'deque',
      name: 'Deque',
      description: 'Double-ended queue with insertion/removal at both ends.',
      icon: ArrowLeftRight,
      cardBg: 'bg-[#10182A]',
      borderColor: 'border-[#D946EF]/30 hover:border-[#D946EF]',
      glowClass: 'hover:glow-hashmap',
      iconBg: 'bg-[#D946EF] text-white font-extrabold',
      btnBg: 'bg-[#D946EF] hover:bg-[#C026D3] text-white font-extrabold shadow-fuchsia-500/20',
      bullets: [{ label: 'Add First/Last', value: 'O(1)' }, { label: 'Remove First/Last', value: 'O(1)' }]
    },
    {
      id: 'hashmap',
      name: 'HashMap',
      description: 'Hash table with collision handling and resizing.',
      icon: Hash,
      cardBg: 'bg-[#10182A]',
      borderColor: 'border-[#EC4899]/30 hover:border-[#EC4899]',
      glowClass: 'hover:glow-hashmap',
      iconBg: 'bg-[#EC4899] text-white font-extrabold',
      btnBg: 'bg-[#EC4899] hover:bg-[#DB2777] text-white font-extrabold shadow-pink-500/20',
      bullets: [{ label: 'Put/Get', value: 'O(1)' }, { label: 'Contains', value: 'O(1)' }, { label: 'Worst', value: 'O(n)' }]
    },
    {
      id: 'hashset',
      name: 'HashSet',
      description: 'Hash table bucket array ensuring distinct set uniqueness.',
      icon: Hash,
      cardBg: 'bg-[#10182A]',
      borderColor: 'border-[#F43F5E]/30 hover:border-[#F43F5E]',
      glowClass: 'hover:glow-linkedlist',
      iconBg: 'bg-[#F43F5E] text-white font-extrabold',
      btnBg: 'bg-[#F43F5E] hover:bg-[#E11D48] text-white font-extrabold shadow-rose-500/20',
      bullets: [{ label: 'Add', value: 'O(1)' }, { label: 'Remove', value: 'O(1)' }, { label: 'Contains', value: 'O(1)' }]
    },
    {
      id: 'priorityqueue',
      name: 'PriorityQueue',
      description: 'Binary heap for priority-based element retrieval.',
      icon: Layers,
      cardBg: 'bg-[#10182A]',
      borderColor: 'border-[#F97316]/30 hover:border-[#F97316]',
      glowClass: 'hover:glow-priorityqueue',
      iconBg: 'bg-[#F97316] text-black font-extrabold',
      btnBg: 'bg-[#F97316] hover:bg-[#EA580C] text-black font-extrabold shadow-orange-500/20',
      bullets: [{ label: 'Offer', value: 'O(log n)' }, { label: 'Poll', value: 'O(log n)' }, { label: 'Peek', value: 'O(1)' }]
    },
    {
      id: 'treemap',
      name: 'TreeMap',
      description: 'Self-balancing BST (Red-Black Tree) with sorted keys.',
      icon: GitFork,
      cardBg: 'bg-[#10182A]',
      borderColor: 'border-[#84CC16]/30 hover:border-[#84CC16]',
      glowClass: 'hover:glow-treemap',
      iconBg: 'bg-[#84CC16] text-black font-extrabold',
      btnBg: 'bg-[#84CC16] hover:bg-[#65A30D] text-black font-extrabold shadow-lime-500/20',
      bullets: [{ label: 'Search', value: 'O(log n)' }, { label: 'Insert', value: 'O(log n)' }, { label: 'Delete', value: 'O(log n)' }]
    },
    {
      id: 'bst',
      name: 'Binary Search Tree',
      description: 'Ordered binary tree hierarchy supporting traversals.',
      icon: GitFork,
      cardBg: 'bg-[#10182A]',
      borderColor: 'border-[#6366F1]/30 hover:border-[#6366F1]',
      glowClass: 'hover:glow-treemap',
      iconBg: 'bg-[#6366F1] text-white font-extrabold',
      btnBg: 'bg-[#6366F1] hover:bg-[#4F46E5] text-white font-extrabold shadow-indigo-500/20',
      bullets: [{ label: 'Insert', value: 'O(log n)' }, { label: 'Search', value: 'O(log n)' }, { label: 'Delete', value: 'O(log n)' }]
    },
    {
      id: 'heap',
      name: 'Min Heap',
      description: 'Complete binary min-heap stored in array.',
      icon: Layers,
      cardBg: 'bg-[#10182A]',
      borderColor: 'border-[#14B8A6]/30 hover:border-[#14B8A6]',
      glowClass: 'hover:glow-priorityqueue',
      iconBg: 'bg-[#14B8A6] text-black font-extrabold',
      btnBg: 'bg-[#14B8A6] hover:bg-[#0D9488] text-black font-extrabold shadow-teal-500/20',
      bullets: [{ label: 'Insert', value: 'O(log n)' }, { label: 'Extract', value: 'O(log n)' }, { label: 'Peek', value: 'O(1)' }]
    },
    {
      id: 'trie',
      name: 'Trie',
      description: 'Prefix tree for fast string search and autocomplete.',
      icon: Network,
      cardBg: 'bg-[#10182A]',
      borderColor: 'border-[#0EA5E9]/30 hover:border-[#0EA5E9]',
      glowClass: 'hover:glow-hashmap',
      iconBg: 'bg-[#0EA5E9] text-black font-extrabold',
      btnBg: 'bg-[#0EA5E9] hover:bg-[#0284C7] text-black font-extrabold shadow-sky-500/20',
      bullets: [{ label: 'Insert', value: 'O(L)' }, { label: 'Search', value: 'O(L)' }, { label: 'Prefix', value: 'O(L)' }]
    },
    {
      id: 'graph',
      name: 'Graph',
      description: 'Adjacency list vertex & edge model with BFS and DFS.',
      icon: Network,
      cardBg: 'bg-[#10182A]',
      borderColor: 'border-[#EF4444]/30 hover:border-[#EF4444]',
      glowClass: 'hover:glow-arraylist',
      iconBg: 'bg-[#EF4444] text-white font-extrabold',
      btnBg: 'bg-[#EF4444] hover:bg-[#DC2626] text-white font-extrabold shadow-red-500/20',
      bullets: [{ label: 'BFS', value: 'O(V+E)' }, { label: 'DFS', value: 'O(V+E)' }, { label: 'Edges', value: 'Adjacency' }]
    },
    {
      id: 'disjointset',
      name: 'Disjoint Set',
      description: 'Union-Find forest with path compression optimization.',
      icon: GitBranch,
      cardBg: 'bg-[#10182A]',
      borderColor: 'border-[#10B981]/30 hover:border-[#10B981]',
      glowClass: 'hover:glow-linkedlist',
      iconBg: 'bg-[#10B981] text-black font-extrabold',
      btnBg: 'bg-[#10B981] hover:bg-[#059669] text-black font-extrabold shadow-emerald-500/20',
      bullets: [{ label: 'Find', value: 'O(α(n))' }, { label: 'Union', value: 'O(α(n))' }, { label: 'Optimized', value: 'Rank' }]
    }
  ];

  const visibleCollections = showAll ? collections : collections.slice(0, 4);

  return (
    <div className="bg-[#080D18] py-3 max-w-[1400px] mx-auto px-4 sm:px-6 space-y-8">
      {/* HERO SECTION */}
      <section className="relative overflow-hidden bg-[#0D1424] border border-white/10 rounded-2xl p-6 lg:p-8 shadow-2xl flex items-center min-h-[280px]">
        <div className="absolute -top-20 -right-20 w-80 h-80 bg-[#F59E0B]/15 rounded-full blur-3xl pointer-events-none animate-pulse"></div>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center w-full relative z-10">
          <div className="lg:col-span-8 space-y-3 text-left">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 bg-[#F59E0B]/10 border border-[#F59E0B]/30 rounded-full text-xs font-mono font-medium text-[#F59E0B]">
              <Sparkles className="w-3.5 h-3.5 text-[#F59E0B]" />
              <span>CollectionLab • 15 Custom DSA Collections</span>
            </div>

            <h1 className="font-heading font-black text-2xl sm:text-3xl lg:text-4xl text-white tracking-tight leading-tight">
              Interactive Custom <span className="text-[#F59E0B]">Java Data Structures</span> Visualizer
            </h1>

            <p className="text-xs sm:text-sm text-[#A7B3C7] font-sans font-normal leading-relaxed max-w-2xl">
              Visualize, debug, and learn real Java collection data structures with step-by-step trace execution, REST state transitions, and Big-O performance analysis.
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={() => onSelectTab('arraylist')}
                className="flex items-center gap-2 px-5 py-2.5 bg-[#F59E0B] hover:bg-[#D97706] text-black font-extrabold rounded-full text-xs sm:text-sm shadow-lg shadow-amber-500/25 transition-all cursor-pointer"
              >
                <span>Launch Collection Visualizers</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => onOpenCodeViewer('ArrayList')}
                className="flex items-center gap-2 px-5 py-2.5 bg-[#10182A] hover:bg-[#121C30] text-white border border-white/10 rounded-full text-xs sm:text-sm font-semibold transition-all cursor-pointer"
              >
                <Code2 className="w-4 h-4 text-[#F59E0B]" />
                <span>View Real Source Code</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* COLLECTIONS GRID */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xs font-mono font-bold text-[#A7B3C7] uppercase tracking-wider">
            Featured Data Structure Visualizers ({visibleCollections.length} / {collections.length})
          </h2>
          <span className="text-xs font-mono text-[#F59E0B] bg-[#F59E0B]/10 px-2.5 py-0.5 rounded-full border border-[#F59E0B]/30">
            Real Spring Boot Backend
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-5">
          {visibleCollections.map((col) => {
            const Icon = col.icon;
            return (
              <div
                key={col.id}
                className={`${col.cardBg} border ${col.borderColor} ${col.glowClass} rounded-2xl p-5 shadow-xl transition-all duration-300 relative flex flex-col justify-between space-y-4`}
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className={`p-2.5 rounded-xl ${col.iconBg}`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <div className="flex gap-1.5 flex-wrap">
                      {col.bullets.map((b, idx) => (
                        <span key={idx} className="text-[10px] font-mono px-2 py-0.5 bg-black/30 text-amber-300 rounded border border-white/10">
                          {b.label}: <strong>{b.value}</strong>
                        </span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="font-heading font-bold text-base text-white">{col.name}</h3>
                    <p className="text-xs text-[#A7B3C7] font-sans mt-1 leading-relaxed">{col.description}</p>
                  </div>
                </div>

                <div className="pt-3 border-t border-white/10 flex items-center justify-between">
                  <button
                    onClick={() => onOpenCodeViewer(col.name)}
                    className="text-xs text-[#A7B3C7] hover:text-[#F59E0B] font-mono flex items-center gap-1 cursor-pointer transition-colors"
                  >
                    <Code2 className="w-3.5 h-3.5" /> Code
                  </button>

                  <button
                    onClick={() => onSelectTab(col.id)}
                    className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${col.btnBg}`}
                  >
                    <span>Launch</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* EXPLORE COLLECTIONS / SHOW LESS TOGGLE BUTTON */}
        <div className="flex justify-center pt-4">
          {!showAll ? (
            <button
              onClick={() => setShowAll(true)}
              className="flex items-center gap-2.5 px-7 py-3.5 bg-[#F59E0B] hover:bg-[#D97706] text-black font-extrabold rounded-full text-sm shadow-xl shadow-amber-500/25 transition-all cursor-pointer hover:scale-105"
            >
              <span>Explore Collections &rarr;</span>
            </button>
          ) : (
            <button
              onClick={() => setShowAll(false)}
              className="flex items-center gap-2.5 px-7 py-3.5 bg-[#10182A] hover:bg-[#121C30] text-slate-200 border border-white/20 rounded-full text-sm font-bold shadow-xl transition-all cursor-pointer hover:scale-105"
            >
              <span>Show Less &uarr;</span>
              <ChevronUp className="w-4 h-4 text-[#F59E0B]" />
            </button>
          )}
        </div>
      </section>
    </div>
  );
};
