import React from 'react';
import { BarChart2, Info } from 'lucide-react';

export const ComplexityPage: React.FC = () => {
  const complexityData = [
    {
      name: 'Custom ArrayList',
      access: 'O(1)',
      search: 'O(n)',
      insertHead: 'O(n)',
      insertTail: 'O(1) amortized',
      delete: 'O(n)',
      space: 'O(n)',
      note: 'Resizes array by 2x when capacity limit is reached.'
    },
    {
      name: 'Custom LinkedList',
      access: 'O(n)',
      search: 'O(n)',
      insertHead: 'O(1)',
      insertTail: 'O(1)',
      delete: 'O(1) node pointer',
      space: 'O(n)',
      note: 'Doubly-linked nodes with prev & next pointers.'
    },
    {
      name: 'Custom HashMap',
      access: 'N/A',
      search: 'O(1) avg / O(n) worst',
      insertHead: 'O(1) avg / O(n) worst',
      insertTail: 'O(1) avg',
      delete: 'O(1) avg / O(n) worst',
      space: 'O(n)',
      note: 'Separate chaining linked lists. Rehashes on load factor threshold (0.75).'
    },
    {
      name: 'Custom TreeMap',
      access: 'N/A',
      search: 'O(log n) avg / O(n) worst',
      insertHead: 'O(log n) avg',
      insertTail: 'O(log n) avg',
      delete: 'O(log n) avg / O(n) worst',
      space: 'O(n)',
      note: 'Binary Search Tree. Left < Node < Right ordering.'
    },
    {
      name: 'Custom PriorityQueue',
      access: 'O(1) (peek root)',
      search: 'O(n)',
      insertHead: 'O(log n) (offer)',
      insertTail: 'O(log n)',
      delete: 'O(log n) (poll min)',
      space: 'O(n)',
      note: 'Binary min-heap array. Sift-up on offer, sift-down on poll.'
    }
  ];

  return (
    <div className="space-y-8 py-2">
      {/* Header */}
      <div className="space-y-2 border-b border-slate-200 dark:border-slate-800 pb-4">
        <h1 className="section-heading text-slate-900 dark:text-white flex items-center gap-2">
          <BarChart2 className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
          Big-O Complexity Matrix & Algorithm Analysis
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 font-sans font-normal">
          Empirical and theoretical Big-O time and space complexity comparison across all custom collection implementations.
        </p>
      </div>

      {/* Comparison Table */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden shadow-sm dark:shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse font-mono text-xs">
            <thead>
              <tr className="bg-slate-50 dark:bg-slate-950 border-b border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 font-mono font-medium uppercase text-[10px] tracking-wider">
                <th className="p-4">Data Structure</th>
                <th className="p-4">Access (Get)</th>
                <th className="p-4">Search (Contains)</th>
                <th className="p-4">Insert (Prepend / Offer)</th>
                <th className="p-4">Insert (Append / Put)</th>
                <th className="p-4">Delete (Remove / Poll)</th>
                <th className="p-4">Space</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 dark:divide-slate-800/80 text-slate-800 dark:text-slate-200 font-mono font-normal">
              {complexityData.map((row, idx) => (
                <tr key={idx} className="hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors">
                  <td className="p-4 flex flex-col">
                    <span className="card-title text-slate-900 dark:text-white">{row.name}</span>
                    <span className="text-[10px] text-slate-500 font-normal font-mono mt-0.5">{row.note}</span>
                  </td>
                  <td className="p-4 text-indigo-600 dark:text-indigo-300 font-mono font-medium">{row.access}</td>
                  <td className="p-4 text-slate-600 dark:text-slate-300 font-mono font-normal">{row.search}</td>
                  <td className="p-4 text-emerald-600 dark:text-emerald-400 font-mono font-medium">{row.insertHead}</td>
                  <td className="p-4 text-emerald-600 dark:text-emerald-400 font-mono font-medium">{row.insertTail}</td>
                  <td className="p-4 text-rose-600 dark:text-rose-400 font-mono font-medium">{row.delete}</td>
                  <td className="p-4 text-amber-600 dark:text-amber-400 font-mono font-medium">{row.space}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Educational Explanations Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 text-xs">
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5 space-y-2 shadow-sm">
          <h3 className="card-title text-indigo-600 dark:text-indigo-300 flex items-center gap-2">
            <Info className="w-4 h-4" /> Amortized Time Complexity
          </h3>
          <p className="text-slate-600 dark:text-slate-400 leading-relaxed font-sans font-normal text-xs sm:text-sm">
            An <code className="font-mono">ArrayList.add()</code> operation takes <strong className="font-mono font-medium text-slate-900 dark:text-white">O(1)</strong> time for most inserts, but occasionally takes <strong className="font-mono font-medium text-slate-900 dark:text-white">O(n)</strong> when the internal array fills up and requires allocating a new array and copying elements. Averaged over N insertions, the cost per insertion is <strong className="font-mono font-medium text-slate-900 dark:text-white">O(1) amortized</strong>.
          </p>
        </div>

        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5 space-y-2 shadow-sm">
          <h3 className="card-title text-emerald-600 dark:text-emerald-300 flex items-center gap-2">
            <Info className="w-4 h-4" /> Separate Chaining & Load Factor
          </h3>
          <p className="text-slate-600 dark:text-slate-400 leading-relaxed font-sans font-normal text-xs sm:text-sm">
            <code className="font-mono">CustomHashMap</code> resolves bucket index collisions using <strong className="font-sans font-semibold text-slate-900 dark:text-white">Separate Chaining</strong>. Maintaining a default load factor threshold of <strong className="font-mono font-medium text-slate-900 dark:text-white">0.75</strong> guarantees that bucket chain lengths remain small on average, keeping <code className="font-mono">put()</code> and <code className="font-mono">get()</code> at <strong className="font-mono font-medium text-slate-900 dark:text-white">O(1) average time</strong>.
          </p>
        </div>
      </div>
    </div>
  );
};
