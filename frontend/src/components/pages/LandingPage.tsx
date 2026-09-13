import React from 'react';
import {
  List, Link as LinkIcon, Hash, GitFork, Layers, Code2,
  Sparkles, ArrowRight, RefreshCcw, ArrowLeftRight, ListFilter, Network, GitBranch
} from 'lucide-react';

interface LandingPageProps {
  onSelectTab: (tabId: string) => void;
  onOpenCodeViewer: (colId?: string) => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ onSelectTab, onOpenCodeViewer }) => {

  const collections = [
    {
      id: 'arraylist',
      name: 'ArrayList',
      description: 'Dynamic array with automatic capacity expansion.',
      icon: List,
      cardBg: 'bg-[#10182A]',
      borderColor: 'border-[#FF6B00]/30 hover:border-[#FF6B00]',
      glowClass: 'hover:glow-arraylist',
      iconBg: 'bg-[#FF6B00] text-white',
      btnBg: 'bg-[#FF6B00] hover:bg-[#EA580C] text-white shadow-orange-500/20',
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
      iconBg: 'bg-[#10C98B] text-white',
      btnBg: 'bg-[#10C98B] hover:bg-emerald-600 text-white shadow-emerald-500/20',
      bullets: [{ label: 'Access', value: 'O(n)' }, { label: 'Insert', value: 'O(1)' }, { label: 'Delete', value: 'O(1)' }]
    },
    {
      id: 'circularlinkedlist',
      name: 'Circular LinkedList',
      description: 'Linked node sequence looping tail node back to head.',
      icon: RefreshCcw,
      cardBg: 'bg-[#10182A]',
      borderColor: 'border-[#6366F1]/30 hover:border-[#6366F1]',
      glowClass: 'hover:glow-linkedlist',
      iconBg: 'bg-[#6366F1] text-white',
      btnBg: 'bg-[#6366F1] hover:bg-indigo-600 text-white shadow-indigo-500/20',
      bullets: [{ label: 'Head/Tail', value: 'O(1)' }, { label: 'Search', value: 'O(n)' }, { label: 'Loop', value: 'Circular' }]
    },
    {
      id: 'stack',
      name: 'Stack',
      description: 'LIFO vertical structure supporting push, pop, and peek.',
      icon: Layers,
      cardBg: 'bg-[#10182A]',
      borderColor: 'border-[#6366F1]/30 hover:border-[#6366F1]',
      glowClass: 'hover:glow-linkedlist',
      iconBg: 'bg-[#6366F1] text-white',
      btnBg: 'bg-[#6366F1] hover:bg-indigo-600 text-white shadow-indigo-500/20',
      bullets: [{ label: 'Push', value: 'O(1)' }, { label: 'Pop', value: 'O(1)' }, { label: 'Peek', value: 'O(1)' }]
    },
    {
      id: 'queue',
      name: 'Queue',
      description: 'FIFO line structure with front and rear pointers.',
      icon: ListFilter,
      cardBg: 'bg-[#10182A]',
      borderColor: 'border-[#3B82F6]/30 hover:border-[#3B82F6]',
      glowClass: 'hover:glow-arraylist',
      iconBg: 'bg-[#3B82F6] text-white',
      btnBg: 'bg-[#3B82F6] hover:bg-blue-600 text-white shadow-blue-500/20',
      bullets: [{ label: 'Enqueue', value: 'O(1)' }, { label: 'Dequeue', value: 'O(1)' }, { label: 'Peek', value: 'O(1)' }]
    },
    {
      id: 'deque',
      name: 'Deque',
      description: 'Double-ended queue with insertion/removal at both ends.',
      icon: ArrowLeftRight,
      cardBg: 'bg-[#10182A]',
      borderColor: 'border-[#8B5CF6]/30 hover:border-[#8B5CF6]',
      glowClass: 'hover:glow-hashmap',
      iconBg: 'bg-[#8B5CF6] text-white',
      btnBg: 'bg-[#8B5CF6] hover:bg-purple-600 text-white shadow-purple-500/20',
      bullets: [{ label: 'Add First/Last', value: 'O(1)' }, { label: 'Remove First/Last', value: 'O(1)' }]
    },
    {
      id: 'priorityqueue',
      name: 'PriorityQueue',
      description: 'Binary heap for priority-based element retrieval.',
      icon: Layers,
      cardBg: 'bg-[#10182A]',
      borderColor: 'border-[#EC4899]/30 hover:border-[#EC4899]',
      glowClass: 'hover:glow-priorityqueue',
      iconBg: 'bg-[#EC4899] text-white',
      btnBg: 'bg-[#EC4899] hover:bg-pink-600 text-white shadow-pink-500/20',
      bullets: [{ label: 'Offer', value: 'O(log n)' }, { label: 'Poll', value: 'O(log n)' }, { label: 'Peek', value: 'O(1)' }]
    },
    {
      id: 'hashmap',
      name: 'HashMap',
      description: 'Hash table with collision handling and resizing.',
      icon: Hash,
      cardBg: 'bg-[#10182A]',
      borderColor: 'border-[#7C3AED]/30 hover:border-[#7C3AED]',
      glowClass: 'hover:glow-hashmap',
      iconBg: 'bg-[#7C3AED] text-white',
      btnBg: 'bg-[#7C3AED] hover:bg-purple-700 text-white shadow-purple-500/20',
      bullets: [{ label: 'Put/Get', value: 'O(1)' }, { label: 'Contains', value: 'O(1)' }, { label: 'Worst', value: 'O(n)' }]
    },
    {
      id: 'hashset',
      name: 'HashSet',
      description: 'Hash table bucket array ensuring distinct set uniqueness.',
      icon: Hash,
      cardBg: 'bg-[#10182A]',
      borderColor: 'border-[#10C98B]/30 hover:border-[#10C98B]',
      glowClass: 'hover:glow-linkedlist',
      iconBg: 'bg-[#10C98B] text-white',
      btnBg: 'bg-[#10C98B] hover:bg-emerald-600 text-white shadow-emerald-500/20',
      bullets: [{ label: 'Add', value: 'O(1)' }, { label: 'Remove', value: 'O(1)' }, { label: 'Contains', value: 'O(1)' }]
    },
    {
      id: 'treemap',
      name: 'TreeMap',
      description: 'Self-balancing BST (Red-Black Tree) with sorted keys.',
      icon: GitFork,
      cardBg: 'bg-[#10182A]',
      borderColor: 'border-[#F59E0B]/30 hover:border-[#F59E0B]',
      glowClass: 'hover:glow-treemap',
      iconBg: 'bg-[#F59E0B] text-white',
      btnBg: 'bg-[#F59E0B] hover:bg-amber-600 text-white shadow-amber-500/20',
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
      iconBg: 'bg-[#6366F1] text-white',
      btnBg: 'bg-[#6366F1] hover:bg-indigo-600 text-white shadow-indigo-500/20',
      bullets: [{ label: 'Insert', value: 'O(log n)' }, { label: 'Search', value: 'O(log n)' }, { label: 'Delete', value: 'O(log n)' }]
    },
    {
      id: 'heap',
      name: 'Min Heap',
      description: 'Complete binary min-heap stored in array.',
      icon: Layers,
      cardBg: 'bg-[#10182A]',
      borderColor: 'border-[#F59E0B]/30 hover:border-[#F59E0B]',
      glowClass: 'hover:glow-priorityqueue',
      iconBg: 'bg-[#F59E0B] text-white',
      btnBg: 'bg-[#F59E0B] hover:bg-amber-600 text-white shadow-amber-500/20',
      bullets: [{ label: 'Insert', value: 'O(log n)' }, { label: 'Extract', value: 'O(log n)' }, { label: 'Peek', value: 'O(1)' }]
    },
    {
      id: 'trie',
      name: 'Trie',
      description: 'Prefix tree for fast string search and autocomplete.',
      icon: Network,
      cardBg: 'bg-[#10182A]',
      borderColor: 'border-[#6366F1]/30 hover:border-[#6366F1]',
      glowClass: 'hover:glow-hashmap',
      iconBg: 'bg-[#6366F1] text-white',
      btnBg: 'bg-[#6366F1] hover:bg-indigo-600 text-white shadow-indigo-500/20',
      bullets: [{ label: 'Insert', value: 'O(L)' }, { label: 'Search', value: 'O(L)' }, { label: 'Prefix', value: 'O(L)' }]
    },
    {
      id: 'graph',
      name: 'Graph',
      description: 'Adjacency list vertex & edge model with BFS and DFS.',
      icon: Network,
      cardBg: 'bg-[#10182A]',
      borderColor: 'border-[#0EA5E9]/30 hover:border-[#0EA5E9]',
      glowClass: 'hover:glow-arraylist',
      iconBg: 'bg-[#0EA5E9] text-white',
      btnBg: 'bg-[#0EA5E9] hover:bg-sky-600 text-white shadow-sky-500/20',
      bullets: [{ label: 'BFS', value: 'O(V+E)' }, { label: 'DFS', value: 'O(V+E)' }, { label: 'Edges', value: 'Adjacency' }]
    },
    {
      id: 'disjointset',
      name: 'Disjoint Set',
      description: 'Union-Find forest with path compression optimization.',
      icon: GitBranch,
      cardBg: 'bg-[#10182A]',
      borderColor: 'border-[#10C98B]/30 hover:border-[#10C98B]',
      glowClass: 'hover:glow-linkedlist',
      iconBg: 'bg-[#10C98B] text-white',
      btnBg: 'bg-[#10C98B] hover:bg-emerald-600 text-white shadow-emerald-500/20',
      bullets: [{ label: 'Find', value: 'O(α(n))' }, { label: 'Union', value: 'O(α(n))' }, { label: 'Optimized', value: 'Rank' }]
    }
  ];

  return (
    <div className="bg-[#080D18] py-3 max-w-[1400px] mx-auto px-4 sm:px-6 space-y-8">
      {/* HERO SECTION */}
      <section className="relative overflow-hidden bg-[#0D1424] border border-white/10 rounded-2xl p-6 lg:p-8 shadow-2xl flex items-center min-h-[280px]">
        <div className="absolute -top-20 -right-20 w-80 h-80 bg-[#FF6B00]/15 rounded-full blur-3xl pointer-events-none animate-pulse"></div>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center w-full relative z-10">
          <div className="lg:col-span-8 space-y-3 text-left">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 bg-[#FF6B00]/10 border border-[#FF6B00]/30 rounded-full text-xs font-mono font-medium text-[#FF6B00]">
              <Sparkles className="w-3.5 h-3.5 text-[#FF6B00]" />
              <span>CollectionLab • 15 Custom DSA Collections</span>
            </div>

            <h1 className="font-heading font-black text-2xl sm:text-3xl lg:text-4xl text-white tracking-tight leading-tight">
              Interactive Custom <span className="text-[#FF6B00]">Java Data Structures</span> Visualizer
            </h1>

            <p className="text-xs sm:text-sm text-[#A7B3C7] font-sans font-normal leading-relaxed max-w-2xl">
              Visualize, debug, and learn real Java collection data structures with step-by-step trace execution, REST state transitions, and Big-O performance analysis.
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={() => onSelectTab('arraylist')}
                className="flex items-center gap-2 px-5 py-2.5 bg-[#FF6B00] hover:bg-[#EA580C] text-white rounded-full text-xs sm:text-sm font-bold shadow-lg shadow-orange-500/25 transition-all cursor-pointer"
              >
                <span>Launch Collection Visualizers</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => onOpenCodeViewer('ArrayList')}
                className="flex items-center gap-2 px-5 py-2.5 bg-[#10182A] hover:bg-[#121C30] text-white border border-white/10 rounded-full text-xs sm:text-sm font-semibold transition-all cursor-pointer"
              >
                <Code2 className="w-4 h-4 text-[#FF6B00]" />
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
            Featured 15 Data Structure Visualizers
          </h2>
          <span className="text-xs font-mono text-[#FF6B00] bg-[#FF6B00]/10 px-2.5 py-0.5 rounded-full border border-[#FF6B00]/30">
            Real Spring Boot Backend
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {collections.map((col) => {
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
                    <div className="flex gap-1.5">
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
                    className="text-xs text-[#A7B3C7] hover:text-[#FF6B00] font-mono flex items-center gap-1 cursor-pointer transition-colors"
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
      </section>
    </div>
  );
};
