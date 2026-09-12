import React from 'react';
import {
  LayoutDashboard,
  Layers,
  GitCommit,
  Grid,
  GitFork,
  ArrowUp10,
  BookOpen,
  BarChart2,
  Zap,
  Network,
  Info
} from 'lucide-react';

interface SidebarProps {
  currentTab: string;
  setCurrentTab: (tab: string) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ currentTab, setCurrentTab }) => {
  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, category: 'OVERVIEW' },
    { id: 'arraylist', label: 'ArrayList', icon: Layers, category: 'COLLECTIONS' },
    { id: 'linkedlist', label: 'LinkedList', icon: GitCommit, category: 'COLLECTIONS' },
    { id: 'hashmap', label: 'HashMap', icon: Grid, category: 'COLLECTIONS' },
    { id: 'treemap', label: 'TreeMap', icon: GitFork, category: 'COLLECTIONS' },
    { id: 'priorityqueue', label: 'PriorityQueue', icon: ArrowUp10, category: 'COLLECTIONS' },
    { id: 'learning', label: 'Interactive Learning', icon: BookOpen, category: 'TOOLS' },
    { id: 'complexity', label: 'Complexity Matrix', icon: BarChart2, category: 'TOOLS' },
    { id: 'benchmark', label: 'JVM Benchmark', icon: Zap, category: 'TOOLS' },
    { id: 'architecture', label: 'Architecture', icon: Network, category: 'SYSTEM' },
    { id: 'about', label: 'About CollectionLab', icon: Info, category: 'SYSTEM' },
  ];

  const categories = ['OVERVIEW', 'COLLECTIONS', 'TOOLS', 'SYSTEM'];

  return (
    <aside className="w-64 border-r border-[#DCE6F2] dark:border-slate-800 bg-white dark:bg-slate-900 p-4 flex flex-col justify-between shrink-0 hidden md:block transition-colors">
      <div className="space-y-6">
        {categories.map((cat) => (
          <div key={cat}>
            <div className="text-[10px] font-sans font-semibold tracking-wider text-[#475569] dark:text-slate-400 mb-2 px-3">
              {cat}
            </div>
            <div className="space-y-1">
              {navItems
                .filter((item) => item.category === cat)
                .map((item) => {
                  const Icon = item.icon;
                  const isActive = currentTab === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => setCurrentTab(item.id)}
                      className={`w-full flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-sans transition-all duration-150 ${
                        isActive
                          ? 'bg-[#FFEDD5] text-[#FF6B00] dark:bg-orange-950/40 dark:text-orange-400 font-semibold border border-[#FED7AA] dark:border-orange-800'
                          : 'text-[#475569] dark:text-slate-300 hover:text-[#0F172A] hover:bg-slate-50 dark:hover:bg-slate-800 font-medium'
                      }`}
                    >
                      <Icon className={`w-4 h-4 ${isActive ? 'text-[#FF6B00] dark:text-orange-400' : 'text-[#475569] dark:text-slate-400'}`} />
                      <span>{item.label}</span>
                    </button>
                  );
                })}
            </div>
          </div>
        ))}
      </div>

      <div className="pt-4 border-t border-[#DCE6F2] dark:border-slate-800 text-[11px] text-[#475569] dark:text-slate-400 font-mono font-normal text-center">
        CollectionLab v1.0 • Java 17+
      </div>
    </aside>
  );
};
