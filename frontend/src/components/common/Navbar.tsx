import React, { useState, useRef, useEffect } from 'react';
import {
  Box, Home, Layers, BookOpen, BarChart2, Info, Mail, Search,
  ChevronDown, Menu, X, GitCommit, Grid, GitFork, ArrowUp10
} from 'lucide-react';

interface NavbarProps {
  currentTab: string;
  onSelectTab: (tabId: string) => void;
  onOpenCodeViewer: (colId?: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentTab,
  onSelectTab,
  onOpenCodeViewer
}) => {
  const [collectionsOpen, setCollectionsOpen] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [searchOpen, setSearchOpen] = useState<boolean>(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);

  const dropdownRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLDivElement>(null);

  const collections = [
    { id: 'arraylist', name: 'ArrayList', desc: 'Dynamic Array & Resizing', icon: Layers, color: 'text-[#FF6B00] bg-orange-500/10' },
    { id: 'linkedlist', name: 'LinkedList', desc: 'Doubly Linked Node Chain', icon: GitCommit, color: 'text-[#10C98B] bg-emerald-500/10' },
    { id: 'hashmap', name: 'HashMap', desc: 'Separate Chaining & Rehashing', icon: Grid, color: 'text-[#7C3AED] bg-purple-500/10' },
    { id: 'treemap', name: 'TreeMap', desc: 'Binary Search Tree & Traversals', icon: GitFork, color: 'text-[#F59E0B] bg-amber-500/10' },
    { id: 'priorityqueue', name: 'PriorityQueue', desc: 'Binary Min-Heap Array', icon: ArrowUp10, color: 'text-[#EC4899] bg-pink-500/10' }
  ];

  const searchItems = [
    { id: 'arraylist', name: 'ArrayList Visualizer', category: 'Collection' },
    { id: 'linkedlist', name: 'LinkedList Visualizer', category: 'Collection' },
    { id: 'hashmap', name: 'HashMap Visualizer', category: 'Collection' },
    { id: 'treemap', name: 'TreeMap Visualizer', category: 'Collection' },
    { id: 'priorityqueue', name: 'PriorityQueue Visualizer', category: 'Collection' },
    { id: 'learning', name: 'Interactive Learning Walkthroughs', category: 'Guide' },
    { id: 'benchmark', name: 'JVM Performance Benchmark Test', category: 'Tool' },
    { id: 'about', name: 'About & System Architecture', category: 'Info' },
    { id: 'contact', name: 'Contact Developer', category: 'Contact' }
  ];

  const filteredSearch = searchQuery.trim()
    ? searchItems.filter(item => item.name.toLowerCase().includes(searchQuery.toLowerCase()))
    : [];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setCollectionsOpen(false);
      }
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setSearchOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const isCollectionActive = ['arraylist', 'linkedlist', 'hashmap', 'treemap', 'priorityqueue'].includes(currentTab);

  return (
    <header className="sticky top-0 z-50 bg-[#0D1424]/95 backdrop-blur-md border-b border-white/10 transition-colors shadow-lg">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 h-[72px] flex items-center justify-between gap-4">
        
        {/* BRAND LOGO & TITLE */}
        <div
          onClick={() => {
            onSelectTab('home');
            setMobileMenuOpen(false);
          }}
          className="flex items-center gap-3 cursor-pointer group shrink-0"
        >
          <div className="p-2.5 bg-[#FF6B00] rounded-xl text-white shadow-md shadow-orange-500/20 group-hover:scale-105 transition-transform">
            <Box className="w-5 h-5" />
          </div>
          <div>
            <div className="font-heading font-extrabold text-base sm:text-lg tracking-tight text-white flex items-center gap-1 leading-none">
              <span>Collection</span>
              <span className="text-[#FF6B00]">Lab</span>
            </div>
            <span className="text-[10px] text-[#A7B3C7] hidden lg:block mt-0.5 font-sans font-medium">
              Custom Java Collections Visualizer
            </span>
          </div>
        </div>

        {/* DESKTOP NAVIGATION LINKS */}
        <nav className="hidden md:flex items-center gap-1.5 font-sans font-medium text-xs sm:text-sm">
          
          {/* Home */}
          <button
            onClick={() => onSelectTab('home')}
            className={`flex items-center gap-1.5 transition-all ${
              currentTab === 'home' || currentTab === 'landing'
                ? 'text-[#FF6B00] bg-[#FF6B00]/15 font-semibold px-3.5 py-1.5 rounded-full border border-[#FF6B00]/30 shadow-xs'
                : 'text-[#A7B3C7] hover:text-white hover:bg-[#10182A] px-3 py-1.5 rounded-xl'
            }`}
          >
            <Home className="w-4 h-4" />
            <span>Home</span>
          </button>

          {/* Collections Dropdown */}
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setCollectionsOpen(!collectionsOpen)}
              className={`flex items-center gap-1.5 transition-all ${
                isCollectionActive
                  ? 'text-[#FF6B00] bg-[#FF6B00]/15 font-semibold px-3.5 py-1.5 rounded-full border border-[#FF6B00]/30 shadow-xs'
                  : 'text-[#A7B3C7] hover:text-white hover:bg-[#10182A] px-3 py-1.5 rounded-xl'
              }`}
            >
              <Layers className="w-4 h-4" />
              <span>Collections</span>
              <ChevronDown className={`w-3.5 h-3.5 transition-transform ${collectionsOpen ? 'rotate-180' : ''}`} />
            </button>

            {collectionsOpen && (
              <div className="absolute top-full left-0 mt-2 w-64 bg-[#10182A] border border-white/10 rounded-2xl shadow-2xl p-2 z-50 animate-in fade-in slide-in-from-top-2">
                <div className="text-[10px] font-mono font-medium text-[#718096] px-3 py-1 uppercase tracking-wider">
                  Select Visualizer
                </div>
                {collections.map((col) => {
                  const Icon = col.icon;
                  return (
                    <button
                      key={col.id}
                      onClick={() => {
                        onSelectTab(col.id);
                        setCollectionsOpen(false);
                      }}
                      className={`flex items-center gap-3 w-full p-2.5 rounded-xl text-left transition-colors ${
                        currentTab === col.id
                          ? 'bg-orange-500/15 border border-orange-500/30'
                          : 'hover:bg-[#121C30]'
                      }`}
                    >
                      <div className={`p-2 rounded-lg ${col.color}`}>
                        <Icon className="w-4 h-4" />
                      </div>
                      <div>
                        <span className="text-xs font-heading font-bold text-white block">{col.name}</span>
                        <span className="text-[10px] text-[#A7B3C7] font-mono font-normal block">{col.desc}</span>
                      </div>
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          {/* Learning */}
          <button
            onClick={() => onSelectTab('learning')}
            className={`flex items-center gap-1.5 transition-all ${
              currentTab === 'learning'
                ? 'text-[#FF6B00] bg-[#FF6B00]/15 font-bold px-3.5 py-1.5 rounded-full border border-[#FF6B00]/30 shadow-xs'
                : 'text-[#A7B3C7] hover:text-white hover:bg-[#10182A] px-3 py-1.5 rounded-xl'
            }`}
          >
            <BookOpen className="w-4 h-4" />
            <span>Learning</span>
          </button>

          {/* Benchmark */}
          <button
            onClick={() => onSelectTab('benchmark')}
            className={`flex items-center gap-1.5 transition-all ${
              currentTab === 'benchmark'
                ? 'text-[#FF6B00] bg-[#FF6B00]/15 font-bold px-3.5 py-1.5 rounded-full border border-[#FF6B00]/30 shadow-xs'
                : 'text-[#A7B3C7] hover:text-white hover:bg-[#10182A] px-3 py-1.5 rounded-xl'
            }`}
          >
            <BarChart2 className="w-4 h-4" />
            <span>Benchmark</span>
          </button>

          {/* About */}
          <button
            onClick={() => onSelectTab('about')}
            className={`flex items-center gap-1.5 transition-all ${
              currentTab === 'about'
                ? 'text-[#FF6B00] bg-[#FF6B00]/15 font-bold px-3.5 py-1.5 rounded-full border border-[#FF6B00]/30 shadow-xs'
                : 'text-[#A7B3C7] hover:text-white hover:bg-[#10182A] px-3 py-1.5 rounded-xl'
            }`}
          >
            <Info className="w-4 h-4" />
            <span>About</span>
          </button>

          {/* Contact */}
          <button
            onClick={() => onSelectTab('contact')}
            className={`flex items-center gap-1.5 transition-all ${
              currentTab === 'contact'
                ? 'text-[#FF6B00] bg-[#FF6B00]/15 font-bold px-3.5 py-1.5 rounded-full border border-[#FF6B00]/30 shadow-xs'
                : 'text-[#A7B3C7] hover:text-white hover:bg-[#10182A] px-3 py-1.5 rounded-xl'
            }`}
          >
            <Mail className="w-4 h-4" />
            <span>Contact</span>
          </button>
        </nav>

        {/* RIGHT CONTROLS: EXPANDED SEARCH BAR & VIEW SOURCE BUTTON */}
        <div className="flex items-center gap-3">
          
          {/* Expanded Search Input */}
          <div className="relative hidden sm:block" ref={searchRef}>
            <div className="relative">
              <Search className="w-3.5 h-3.5 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#718096]" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setSearchOpen(true);
                }}
                onFocus={() => setSearchOpen(true)}
                placeholder="Search collections..."
                className="w-56 sm:w-64 lg:w-72 xl:w-80 bg-[#10182A] border border-white/10 rounded-full pl-9 pr-4 py-1.5 text-xs text-white placeholder:text-[#718096] focus:outline-none focus:border-[#FF6B00] focus:ring-1 focus:ring-[#FF6B00]/50 transition-all font-sans"
              />
            </div>

            {searchOpen && filteredSearch.length > 0 && (
              <div className="absolute top-full right-0 mt-2 w-72 bg-[#10182A] border border-white/10 rounded-2xl shadow-2xl p-2 z-50">
                <div className="text-[10px] font-mono font-bold text-[#718096] px-3 py-1 uppercase">
                  Search Results ({filteredSearch.length})
                </div>
                {filteredSearch.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => {
                      onSelectTab(item.id);
                      setSearchQuery('');
                      setSearchOpen(false);
                    }}
                    className="flex items-center justify-between w-full px-3 py-2 rounded-xl text-left text-xs hover:bg-[#121C30] transition-colors"
                  >
                    <span className="font-medium text-white">{item.name}</span>
                    <span className="text-[9px] font-mono px-1.5 py-0.5 bg-orange-500/20 text-[#FF6B00] rounded border border-orange-500/30">
                      {item.category}
                    </span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Sunset Orange Pill Button "View Source Code" */}
          <button
            onClick={() => onOpenCodeViewer()}
            className="flex items-center gap-2 px-4 py-2 bg-[#FF6B00] hover:bg-[#EA580C] text-white rounded-full text-xs font-bold shadow-md shadow-orange-500/20 transition-all shrink-0"
            title="Inspect Real Java Backend Source Code"
          >
            <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
              <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
            </svg>
            <span className="hidden sm:inline">View Source Code</span>
          </button>

          {/* Mobile Hamburger Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 md:hidden bg-[#10182A] text-slate-300 rounded-xl border border-white/10"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* MOBILE NAVIGATION DRAWER */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-white/10 bg-[#0D1424] p-4 space-y-3 font-sans animate-in slide-in-from-top">
          <div className="space-y-1">
            <button
              onClick={() => {
                onSelectTab('home');
                setMobileMenuOpen(false);
              }}
              className="w-full text-left px-3 py-2 rounded-lg text-sm font-semibold text-white hover:bg-[#10182A]"
            >
              Home
            </button>

            <div className="px-3 py-1 text-[10px] font-mono font-bold text-[#718096] uppercase">
              Collections
            </div>
            {collections.map(col => (
              <button
                key={col.id}
                onClick={() => {
                  onSelectTab(col.id);
                  setMobileMenuOpen(false);
                }}
                className="w-full text-left px-4 py-2 rounded-lg text-xs text-[#A7B3C7] hover:bg-[#10182A] flex items-center justify-between"
              >
                <span className="font-semibold text-white">{col.name}</span>
                <span className="text-[10px] font-mono text-[#718096]">{col.desc}</span>
              </button>
            ))}

            <button
              onClick={() => {
                onSelectTab('learning');
                setMobileMenuOpen(false);
              }}
              className="w-full text-left px-3 py-2 rounded-lg text-sm font-semibold text-white hover:bg-[#10182A]"
            >
              Learning
            </button>

            <button
              onClick={() => {
                onSelectTab('benchmark');
                setMobileMenuOpen(false);
              }}
              className="w-full text-left px-3 py-2 rounded-lg text-sm font-semibold text-white hover:bg-[#10182A]"
            >
              Benchmark
            </button>

            <button
              onClick={() => {
                onSelectTab('about');
                setMobileMenuOpen(false);
              }}
              className="w-full text-left px-3 py-2 rounded-lg text-sm font-semibold text-white hover:bg-[#10182A]"
            >
              About
            </button>

            <button
              onClick={() => {
                onSelectTab('contact');
                setMobileMenuOpen(false);
              }}
              className="w-full text-left px-3 py-2 rounded-lg text-sm font-semibold text-white hover:bg-[#10182A]"
            >
              Contact
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
