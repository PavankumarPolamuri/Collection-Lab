import React, { useState } from 'react';
import {
  List, Link as LinkIcon, Hash, GitFork, Layers, Code2,
  Sparkles, Cpu, Zap, Activity, BookOpen,
  CheckCircle2, ArrowRight
} from 'lucide-react';

interface LandingPageProps {
  onSelectTab: (tabId: string) => void;
  onOpenCodeViewer: (colId?: string) => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ onSelectTab, onOpenCodeViewer }) => {
  // Interactive demo preview state for ArrayList "See It In Action"
  const [demoOp, setDemoOp] = useState<'insert' | 'delete' | 'search'>('insert');

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
      bulletColor: 'bg-[#FF6B00]',
      bullets: [
        { label: 'Access', value: 'O(1)' },
        { label: 'Search', value: 'O(n)' },
        { label: 'Insert', value: 'O(1)*' }
      ],
      watermark: (
        <div className="absolute right-2 bottom-12 opacity-[0.04] pointer-events-none font-mono text-6xl font-black text-[#FF6B00] select-none">
          [ ]
        </div>
      )
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
      bulletColor: 'bg-[#10C98B]',
      bullets: [
        { label: 'Access', value: 'O(n)' },
        { label: 'Insert', value: 'O(1)' },
        { label: 'Delete', value: 'O(1)' }
      ],
      watermark: (
        <div className="absolute right-2 bottom-12 opacity-[0.04] pointer-events-none font-mono text-6xl font-black text-[#10C98B] select-none">
          ⇄
        </div>
      )
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
      bulletColor: 'bg-[#7C3AED]',
      bullets: [
        { label: 'Put/Get', value: 'O(1)' },
        { label: 'Contains', value: 'O(1)' },
        { label: 'Worst Case', value: 'O(n)' }
      ],
      watermark: (
        <div className="absolute right-2 bottom-12 opacity-[0.04] pointer-events-none font-mono text-6xl font-black text-[#7C3AED] select-none">
          #
        </div>
      )
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
      bulletColor: 'bg-[#F59E0B]',
      bullets: [
        { label: 'Search', value: 'O(log n)' },
        { label: 'Insert', value: 'O(log n)' },
        { label: 'Delete', value: 'O(log n)' }
      ],
      watermark: (
        <div className="absolute right-2 bottom-12 opacity-[0.04] pointer-events-none font-mono text-6xl font-black text-[#F59E0B] select-none">
          Y
        </div>
      )
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
      bulletColor: 'bg-[#EC4899]',
      bullets: [
        { label: 'Offer', value: 'O(log n)' },
        { label: 'Poll', value: 'O(log n)' },
        { label: 'Peek', value: 'O(1)' }
      ],
      watermark: (
        <div className="absolute right-2 bottom-12 opacity-[0.04] pointer-events-none font-mono text-6xl font-black text-[#EC4899] select-none">
          ▲
        </div>
      )
    }
  ];

  return (
    <div className="bg-[#080D18] py-3 max-w-[1400px] mx-auto px-4 sm:px-6 space-y-6">

      {/* ============================================================ */}
      {/* SECTION 1: HERO SECTION                                      */}
      {/* ============================================================ */}
      <section className="relative overflow-hidden bg-[#0D1424] border border-white/10 rounded-2xl p-4 sm:p-6 lg:p-7 shadow-2xl min-h-[300px] max-h-[350px] flex items-center">
        
        {/* Subtle Glow Blobs */}
        <div className="absolute -top-20 -right-20 w-80 h-80 bg-[#FF6B00]/15 rounded-full blur-3xl pointer-events-none animate-pulse"></div>
        <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 lg:gap-6 items-center w-full relative z-10">
          
          {/* HERO LEFT COLUMN */}
          <div className="lg:col-span-7 space-y-2.5 text-left">
            
            {/* Small Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1 bg-[#FF6B00]/10 border border-[#FF6B00]/30 rounded-full text-xs font-mono font-medium text-[#FF6B00]">
              <Sparkles className="w-3.5 h-3.5 text-[#FF6B00]" />
              <span>Learn • Build • Visualize • Grow</span>
            </div>

            {/* Large Heading */}
            <div className="space-y-0.5">
              <h1 className="hero-heading text-white">
                Collection <span className="text-[#FF6B00] orange-text-glow">Lab</span>
              </h1>
              <p className="text-sm sm:text-base font-sans font-medium text-[#A7B3C7]">
                Custom Java Collections Visualizer
              </p>
            </div>

            {/* Paragraph Description */}
            <p className="text-xs sm:text-sm text-[#718096] leading-relaxed max-w-xl font-sans font-normal">
              Explore, analyze and understand custom implementations of Java's core data structures through interactive visualization and real-time algorithm tracing.
            </p>

            {/* Small Information Badges */}
            <div className="flex flex-wrap items-center gap-2 pt-0.5 text-[11px] font-mono font-medium text-[#A7B3C7]">
              <span className="px-2.5 py-0.5 bg-[#10182A] border border-white/10 rounded-md flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3 text-[#FF6B00]" /> 5 Custom Data Structures
              </span>
              <span className="px-2.5 py-0.5 bg-[#10182A] border border-white/10 rounded-md flex items-center gap-1">
                <Code2 className="w-3 h-3 text-[#10C98B]" /> Java 17+
              </span>
              <span className="px-2.5 py-0.5 bg-[#10182A] border border-white/10 rounded-md flex items-center gap-1">
                <Zap className="w-3 h-3 text-[#F59E0B]" /> Interactive Visualizations
              </span>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-1">
              <button
                onClick={() => onSelectTab('arraylist')}
                className="flex items-center gap-2 px-5 py-2 bg-[#FF6B00] hover:bg-[#EA580C] text-white rounded-xl font-sans font-semibold shadow-md shadow-orange-500/20 transition-all text-xs sm:text-sm group cursor-pointer"
              >
                <span>Explore Collections →</span>
              </button>

              <button
                onClick={() => onSelectTab('learning')}
                className="flex items-center gap-2 px-5 py-2 bg-[#10182A] hover:bg-[#121C30] text-white border border-white/10 hover:border-white/20 rounded-xl font-sans font-semibold shadow-xs transition-all text-xs sm:text-sm cursor-pointer"
              >
                <span>Start Learning</span>
              </button>
            </div>

          </div>

          {/* HERO RIGHT COLUMN: IDE CODE ILLUSTRATION + 5 CONNECTED COLLECTIONS */}
          <div className="lg:col-span-5 flex flex-col items-center justify-center relative">
            
            <div className="w-full grid grid-cols-1 sm:grid-cols-12 gap-3 items-center">
              
              {/* IDE Code Editor Window Mockup */}
              <div className="sm:col-span-7 bg-[#10182A] border border-white/10 rounded-xl p-3 shadow-2xl text-left font-mono text-[10px] space-y-1 relative overflow-hidden group">
                
                {/* Header Bar */}
                <div className="flex items-center justify-between border-b border-white/10 pb-1.5 mb-1">
                  <div className="flex items-center gap-1.5">
                    <div className="w-2.5 h-2.5 rounded-full bg-rose-500/90"></div>
                    <div className="w-2.5 h-2.5 rounded-full bg-amber-500/90"></div>
                    <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/90"></div>
                  </div>
                  <span className="text-[9px] text-[#A7B3C7] font-semibold">CollectionLab.java</span>
                </div>

                {/* Code Syntax Highlighted */}
                <div className="text-[#10C98B] font-semibold">// Custom Collections</div>
                <div className="text-[#10C98B] font-semibold">// Better Understanding</div>
                <div className="text-[#10C98B] font-semibold">// Stronger Foundations</div>
                <div className="text-[#A7B3C7] pt-0.5">
                  <span className="text-[#7C3AED] font-semibold">public class</span> <span className="text-[#FF6B00] font-bold">CollectionLab</span> &#123;
                </div>
                <div className="pl-2.5 text-[#718096]">
                  <span className="text-[#7C3AED] font-semibold">public static void</span> <span className="text-blue-400 font-bold">main</span>(String[] args) &#123;
                </div>
                <div className="pl-4.5 text-slate-200">
                  System.out.println(<span className="text-[#F59E0B] font-semibold">"Build. Visualize. Learn."</span>);
                </div>
                <div className="pl-2.5 text-[#718096]">&#125;</div>
                <div className="text-[#A7B3C7]">&#125;</div>
              </div>

              {/* 5 Connected Collection Badges */}
              <div className="sm:col-span-5 space-y-1 font-mono text-[9.5px]">
                
                <div className="p-1.5 bg-[#FF6B00] text-white rounded-lg font-bold shadow-xs text-center flex items-center justify-between px-2.5 border-l-2 border-orange-300">
                  <span>ArrayList</span>
                  <span className="text-[8px] opacity-80">O(1)</span>
                </div>

                <div className="p-1.5 bg-[#10C98B] text-white rounded-lg font-bold shadow-xs text-center flex items-center justify-between px-2.5 border-l-2 border-emerald-300">
                  <span>LinkedList</span>
                  <span className="text-[8px] opacity-80">O(1)</span>
                </div>

                <div className="p-1.5 bg-[#7C3AED] text-white rounded-lg font-bold shadow-xs text-center flex items-center justify-between px-2.5 border-l-2 border-purple-300">
                  <span>HashMap</span>
                  <span className="text-[8px] opacity-80">O(1)</span>
                </div>

                <div className="p-1.5 bg-[#F59E0B] text-white rounded-lg font-bold shadow-xs text-center flex items-center justify-between px-2.5 border-l-2 border-amber-300">
                  <span>TreeMap</span>
                  <span className="text-[8px] opacity-80">O(log n)</span>
                </div>

                <div className="p-1.5 bg-[#EC4899] text-white rounded-lg font-bold shadow-xs text-center flex items-center justify-between px-2.5 border-l-2 border-pink-300">
                  <span>PriorityQueue</span>
                  <span className="text-[8px] opacity-80">O(log n)</span>
                </div>

              </div>

            </div>

            {/* Annotation Strip */}
            <div className="mt-2 flex items-center gap-1.5 text-[10px] font-sans italic text-[#A7B3C7] bg-[#10182A] px-3 py-0.5 rounded-full border border-white/10 shadow-xs">
              <Cpu className="w-3 h-3 text-[#FF6B00]" />
              <span>Same Concepts, Stronger Understanding</span>
            </div>

          </div>

        </div>
      </section>


      {/* ============================================================ */}
      {/* SECTION 2: EXPLORE OUR COLLECTIONS (5 CARDS IN 1 ROW)        */}
      {/* ============================================================ */}
      <section className="space-y-3.5 pt-1">
        
        {/* Centered Heading */}
        <div className="text-center space-y-0.5 max-w-xl mx-auto">
          <h2 className="section-heading text-white">
            Explore Our <span className="text-[#FF6B00]">Collections</span>
          </h2>
          <p className="text-xs text-[#718096] font-sans font-normal">
            Choose a collection to visualize, perform operations, and understand how it works internally.
          </p>
        </div>

        {/* 5 Cards Row Layout */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-3.5">
          {collections.map((col) => {
            const Icon = col.icon;
            return (
              <div
                key={col.id}
                className={`relative border rounded-2xl p-3.5 shadow-md flex flex-col justify-between space-y-3 transition-all duration-300 hover:-translate-y-1.5 ${col.cardBg} ${col.borderColor} ${col.glowClass} overflow-hidden group min-h-[265px]`}
              >
                {col.watermark}

                <div className="space-y-2 relative z-10">
                  
                  {/* Colored Icon Box */}
                  <div className={`w-8.5 h-8.5 rounded-xl flex items-center justify-center shadow-md ${col.iconBg} group-hover:scale-110 transition-transform`}>
                    <Icon className="w-4.5 h-4.5" />
                  </div>

                  {/* Card Title */}
                  <h3 className="card-title text-white">
                    {col.name}
                  </h3>

                  {/* Description */}
                  <p className="text-xs text-[#A7B3C7] leading-relaxed font-sans font-normal min-h-[32px]">
                    {col.description}
                  </p>

                  {/* Divider */}
                  <div className="border-t border-white/10 pt-2 space-y-1">
                    
                    <span className="text-[8.5px] font-mono font-medium text-[#718096] uppercase tracking-wider block">
                      KEY OPERATIONS
                    </span>

                    {/* 3 Operations */}
                    <div className="space-y-1 text-xs font-sans">
                      {col.bullets.map((b, bIdx) => (
                        <div key={bIdx} className="flex items-center justify-between gap-1 text-[10px]">
                          <span className="flex items-center gap-1.5">
                            <span className={`w-1.5 h-1.5 rounded-full ${col.bulletColor} shrink-0`}></span>
                            <strong className="font-medium text-[#A7B3C7]">{b.label}</strong>
                          </span>
                          <span className="font-mono font-bold text-white">{b.value}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Open Visualizer Button (Aligned vertically) */}
                <div className="pt-2 border-t border-white/10 relative z-10">
                  <button
                    onClick={() => onSelectTab(col.id)}
                    className={`w-full py-1.5 px-3 rounded-xl text-[11px] font-bold font-sans flex items-center justify-center gap-1 shadow-md transition-all cursor-pointer ${col.btnBg}`}
                  >
                    <span>Open Visualizer →</span>
                  </button>
                </div>

              </div>
            );
          })}
        </div>
      </section>


      {/* ============================================================ */}
      {/* SECTION 3: PROJECT STATISTICS BAR & QUOTE STATEMENT          */}
      {/* ============================================================ */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-stretch pt-2">
        
        {/* Statistics Bar (8 Cols) */}
        <div className="lg:col-span-8 bg-[#10182A] border border-white/10 rounded-2xl p-4 sm:p-5 flex items-center justify-around flex-wrap gap-4 shadow-xl">
          
          <div className="text-center space-y-0.5 px-3">
            <div className="text-2xl sm:text-3xl font-black text-[#FF6B00] font-mono tracking-tight">5</div>
            <div className="text-xs font-bold text-white">Custom Collections</div>
            <div className="text-[10px] text-[#718096] font-sans">Built from scratch</div>
          </div>

          <div className="hidden sm:block w-px h-10 bg-white/10"></div>

          <div className="text-center space-y-0.5 px-3">
            <div className="text-2xl sm:text-3xl font-black text-[#10C98B] font-mono tracking-tight">50+</div>
            <div className="text-xs font-bold text-white">Operations</div>
            <div className="text-[10px] text-[#718096] font-sans">Visualize and test</div>
          </div>

          <div className="hidden sm:block w-px h-10 bg-white/10"></div>

          <div className="text-center space-y-0.5 px-3">
            <div className="text-2xl sm:text-3xl font-black text-[#7C3AED] font-mono tracking-tight">15+</div>
            <div className="text-xs font-bold text-white">Algorithms</div>
            <div className="text-[10px] text-[#718096] font-sans">Learn step by step</div>
          </div>

          <div className="hidden sm:block w-px h-10 bg-white/10"></div>

          <div className="text-center space-y-0.5 px-3">
            <div className="text-2xl sm:text-3xl font-black text-[#F59E0B] font-mono tracking-tight">100%</div>
            <div className="text-xs font-bold text-white">Custom Built</div>
            <div className="text-[10px] text-[#718096] font-sans">No java.util</div>
          </div>

        </div>

        {/* Quote Statement Card (4 Cols) */}
        <div className="lg:col-span-4 bg-[#121C30] border border-[#FF6B00]/30 rounded-2xl p-4 sm:p-5 flex flex-col justify-between shadow-xl relative overflow-hidden">
          <div className="space-y-1.5">
            <span className="text-[#FF6B00] font-serif text-3xl leading-none">“</span>
            <p className="text-xs sm:text-sm font-semibold text-white italic leading-snug">
              Don't just use data structures. Understand how they work.
            </p>
          </div>
          <div className="text-right pt-2 font-mono text-[10px] text-[#FF6B00] font-bold uppercase tracking-wider">
            — Collection Lab
          </div>
        </div>

      </section>


      {/* ============================================================ */}
      {/* SECTION 4: WHY COLLECTION LAB?                               */}
      {/* ============================================================ */}
      <section className="space-y-3.5 pt-2">
        <div className="text-center space-y-0.5 max-w-xl mx-auto">
          <h2 className="section-heading text-white">
            Why <span className="text-[#FF6B00]">Collection Lab</span>?
          </h2>
          <p className="text-xs text-[#718096] font-sans font-normal">
            A hands-on way to master data structures and algorithms.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          
          <div className="bg-[#10182A] border border-white/10 hover:border-[#FF6B00]/40 rounded-2xl p-4.5 space-y-2 shadow-md transition-all">
            <div className="p-2 bg-[#FF6B00]/15 text-[#FF6B00] rounded-xl w-max">
              <BookOpen className="w-5 h-5" />
            </div>
            <h3 className="card-title text-white">Visual Learning</h3>
            <p className="text-xs text-[#A7B3C7] leading-relaxed font-sans font-normal">
              See how each data structure works step by step with clear memory node diagrams and execution logs.
            </p>
          </div>

          <div className="bg-[#10182A] border border-white/10 hover:border-[#10C98B]/40 rounded-2xl p-4.5 space-y-2 shadow-md transition-all">
            <div className="p-2 bg-[#10C98B]/15 text-[#10C98B] rounded-xl w-max">
              <Code2 className="w-5 h-5" />
            </div>
            <h3 className="card-title text-white">Custom Built</h3>
            <p className="text-xs text-[#A7B3C7] leading-relaxed font-sans font-normal">
              Implemented from scratch in Java without relying on standard java.util collection classes.
            </p>
          </div>

          <div className="bg-[#10182A] border border-white/10 hover:border-[#7C3AED]/40 rounded-2xl p-4.5 space-y-2 shadow-md transition-all">
            <div className="p-2 bg-[#7C3AED]/15 text-[#7C3AED] rounded-xl w-max">
              <Activity className="w-5 h-5" />
            </div>
            <h3 className="card-title text-white">Real-Time Visualization</h3>
            <p className="text-xs text-[#A7B3C7] leading-relaxed font-sans font-normal">
              Watch every insert, delete, search, rehash, and heapify operation happen live in action.
            </p>
          </div>

        </div>
      </section>


      {/* ============================================================ */}
      {/* SECTION 5: SEE IT IN ACTION (INTERACTIVE DEMO PREVIEW)       */}
      {/* ============================================================ */}
      <section className="bg-[#0D1424] border border-white/10 rounded-2xl p-5 space-y-4 shadow-xl">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-white/10 pb-3">
          <div>
            <h2 className="section-heading text-white flex items-center gap-2">
              <span>See It In Action</span>
              <span className="text-xs px-2 py-0.5 bg-[#FF6B00]/20 text-[#FF6B00] rounded-full border border-[#FF6B00]/30 font-mono font-medium">
                ArrayList Demo
              </span>
            </h2>
            <p className="text-xs text-[#718096] font-sans font-normal">
              Try an example operation on ArrayList visualizer preview below.
            </p>
          </div>

          {/* Interactive Toggle Controls */}
          <div className="flex items-center gap-1.5 bg-[#10182A] p-1 rounded-xl border border-white/10 font-mono text-xs">
            <button
              onClick={() => setDemoOp('insert')}
              className={`px-3 py-1 rounded-lg transition-colors cursor-pointer ${
                demoOp === 'insert' ? 'bg-[#FF6B00] text-white font-bold' : 'text-[#A7B3C7] hover:text-white'
              }`}
            >
              insert(25, 2)
            </button>
            <button
              onClick={() => setDemoOp('delete')}
              className={`px-3 py-1 rounded-lg transition-colors cursor-pointer ${
                demoOp === 'delete' ? 'bg-[#FF6B00] text-white font-bold' : 'text-[#A7B3C7] hover:text-white'
              }`}
            >
              remove(1)
            </button>
            <button
              onClick={() => setDemoOp('search')}
              className={`px-3 py-1 rounded-lg transition-colors cursor-pointer ${
                demoOp === 'search' ? 'bg-[#FF6B00] text-white font-bold' : 'text-[#A7B3C7] hover:text-white'
              }`}
            >
              get(4)
            </button>
          </div>
        </div>

        {/* Interactive Array Display & Details */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-center">
          
          {/* Left: Dynamic Array Blocks */}
          <div className="lg:col-span-7 bg-[#10182A] p-4 rounded-xl border border-white/10 space-y-3">
            <div className="text-[10px] font-mono text-[#718096] uppercase tracking-wider flex justify-between">
              <span>Array Memory Buffer (Capacity: 8)</span>
              <span className="text-[#FF6B00]">Size: 6</span>
            </div>

            {/* Array Cells */}
            <div className="flex items-center justify-start gap-2 overflow-x-auto py-2">
              {[
                { idx: 0, val: 10, target: false },
                { idx: 1, val: demoOp === 'delete' ? 25 : 20, target: demoOp === 'delete' },
                { idx: 2, val: demoOp === 'insert' ? 25 : 30, target: demoOp === 'insert' },
                { idx: 3, val: demoOp === 'insert' ? 30 : 40, target: false },
                { idx: 4, val: demoOp === 'insert' ? 40 : 50, target: demoOp === 'search' },
                { idx: 5, val: 50, target: false },
                { idx: 6, val: 'null', empty: true },
                { idx: 7, val: 'null', empty: true }
              ].map((cell, i) => (
                <div key={i} className="flex flex-col items-center shrink-0">
                  <div className="text-[9px] font-mono text-[#718096] mb-1">[{cell.idx}]</div>
                  <div
                    className={`w-11 h-11 rounded-xl flex items-center justify-center font-mono font-bold text-xs border transition-all ${
                      cell.target
                        ? 'bg-[#FF6B00] text-white border-orange-300 shadow-md shadow-orange-500/40 scale-105 animate-pulse'
                        : cell.empty
                        ? 'bg-[#080D18] text-[#718096] border-white/5 border-dashed'
                        : 'bg-[#121C30] text-white border-white/10'
                    }`}
                  >
                    {cell.val}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Operation Meta Card */}
          <div className="lg:col-span-5 bg-[#121C30] p-4 rounded-xl border border-white/10 space-y-2.5 font-sans">
            <div className="flex items-center justify-between border-b border-white/10 pb-2">
              <span className="text-xs text-[#718096]">Operation:</span>
              <span className="font-mono text-xs font-bold text-[#FF6B00] uppercase">
                {demoOp === 'insert' ? 'INSERT' : demoOp === 'delete' ? 'REMOVE' : 'GET ACCESS'}
              </span>
            </div>

            <div className="flex items-center justify-between border-b border-white/10 pb-2">
              <span className="text-xs text-[#718096]">Time Complexity:</span>
              <span className="font-mono text-xs font-bold text-[#10C98B]">
                {demoOp === 'search' ? 'O(1)' : 'O(n)'}
              </span>
            </div>

            <p className="text-xs text-[#A7B3C7] leading-relaxed">
              {demoOp === 'insert' && "Elements starting from index 2 shift right to insert element 25."}
              {demoOp === 'delete' && "Removing element at index 1 shifts remaining elements to the left."}
              {demoOp === 'search' && "Direct O(1) index lookup reads element 40 directly from memory array."}
            </p>

            <button
              onClick={() => onSelectTab('arraylist')}
              className="w-full py-2 bg-[#FF6B00] hover:bg-[#EA580C] text-white rounded-xl font-bold text-xs flex items-center justify-center gap-1.5 transition-all shadow-md shadow-orange-500/20 cursor-pointer"
            >
              <span>Launch Full Visualizer</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

        </div>
      </section>


      {/* ============================================================ */}
      {/* SECTION 6: GITHUB CTA BANNER                                 */}
      {/* ============================================================ */}
      <section className="bg-gradient-to-r from-[#10182A] via-[#121C30] to-[#0D1424] border border-[#FF6B00]/30 rounded-2xl p-5 sm:p-6 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-xl">
        <div className="space-y-1 text-center sm:text-left">
          <h3 className="text-lg font-extrabold text-white">Ready to explore more?</h3>
          <p className="text-xs text-[#A7B3C7]">
            Check out the source code on GitHub and inspect implementation files.
          </p>
        </div>

        <button
          onClick={() => onOpenCodeViewer('arraylist')}
          className="px-5 py-2.5 bg-[#FF6B00] hover:bg-[#EA580C] text-white font-bold rounded-xl text-xs flex items-center gap-2 shadow-md shadow-orange-500/20 transition-all cursor-pointer shrink-0"
        >
          <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
            <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
          </svg>
          <span>View on GitHub →</span>
        </button>
      </section>

    </div>
  );
};

export default LandingPage;
