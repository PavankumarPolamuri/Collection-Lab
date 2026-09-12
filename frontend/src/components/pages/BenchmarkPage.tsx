import React, { useState } from 'react';
import { Zap, Play, AlertCircle, CheckCircle2 } from 'lucide-react';
import { api } from '../../services/api';
import type { BenchmarkResult } from '../../types/collections';

export const BenchmarkPage: React.FC = () => {
  const [structure, setStructure] = useState<string>('HASH_MAP');
  const [elementCount, setElementCount] = useState<number>(50000);
  const [result, setResult] = useState<BenchmarkResult | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleRunBenchmark = async () => {
    setLoading(true);
    setErrorMsg(null);
    try {
      const res = await api.runBenchmark(structure, 'INSERT', elementCount);
      setResult(res);
    } catch (err: any) {
      setErrorMsg(`Benchmark failed: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8 py-2 max-w-4xl mx-auto">
      <div className="space-y-2 border-b border-slate-200 dark:border-slate-800 pb-4">
        <h1 className="section-heading text-slate-900 dark:text-white flex items-center gap-2">
          <Zap className="w-5 h-5 text-amber-500" />
          Real JVM Execution Timing Benchmark
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 font-sans font-normal">
          Measures real execution time of custom scratch implementations vs standard JDK collections under high load.
        </p>
      </div>

      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-6 shadow-sm dark:shadow-xl space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-sans font-semibold text-slate-600 dark:text-slate-400 mb-1.5 uppercase tracking-wider">
              Target Data Structure
            </label>
            <select
              value={structure}
              onChange={(e) => setStructure(e.target.value)}
              className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-2.5 text-sm text-slate-900 dark:text-white font-mono font-normal focus:outline-none focus:border-indigo-500"
            >
              <option value="HASH_MAP">Custom HashMap (Separate Chaining)</option>
              <option value="ARRAY_LIST">Custom ArrayList (Dynamic Array)</option>
              <option value="TREE_MAP">Custom TreeMap (Binary Search Tree)</option>
              <option value="PRIORITY_QUEUE">Custom PriorityQueue (Min-Heap)</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-sans font-semibold text-slate-600 dark:text-slate-400 mb-1.5 uppercase tracking-wider">
              Element Count (N Insertions)
            </label>
            <select
              value={elementCount}
              onChange={(e) => setElementCount(parseInt(e.target.value))}
              className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-2.5 text-sm text-slate-900 dark:text-white font-mono font-normal focus:outline-none focus:border-indigo-500"
            >
              <option value={10000}>10,000 Elements</option>
              <option value={50000}>50,000 Elements</option>
              <option value={100000}>100,000 Elements</option>
            </select>
          </div>
        </div>

        <button
          onClick={handleRunBenchmark}
          disabled={loading}
          className="flex items-center justify-center gap-2 w-full py-3 bg-amber-600 hover:bg-amber-500 text-white rounded-xl font-sans font-semibold shadow-lg shadow-amber-600/20 transition-all text-sm disabled:opacity-50"
        >
          {loading ? (
            <span className="animate-pulse font-mono font-medium">Measuring local JVM execution time...</span>
          ) : (
            <>
              <Play className="w-4 h-4" /> Run Live JVM Benchmark Test
            </>
          )}
        </button>
      </div>

      {errorMsg && (
        <div className="p-4 bg-rose-500/10 border border-rose-500/30 rounded-xl text-xs font-mono font-normal text-rose-600 dark:text-rose-300">
          {errorMsg}
        </div>
      )}

      {result && (
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-6 shadow-sm dark:shadow-xl space-y-6 animate-fade-in font-mono font-normal">
          <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-4">
            <div>
              <h3 className="card-title text-slate-900 dark:text-white flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                Benchmark Results: {result.structure} ({result.elementCount.toLocaleString()} elements)
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 font-sans font-normal mt-1">Measured using System.nanoTime() on Spring Boot backend</p>
            </div>
            <span className="px-3 py-1 bg-amber-100 dark:bg-amber-500/10 text-amber-800 dark:text-amber-300 border border-amber-200 dark:border-amber-500/30 rounded text-xs font-mono font-medium">
              Live JVM Measurement
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="p-5 bg-slate-50 dark:bg-slate-950 border border-indigo-200 dark:border-indigo-500/40 rounded-xl space-y-2">
              <span className="text-xs text-slate-500 dark:text-slate-400 font-bold uppercase">CollectionLab Custom Implementation</span>
              <div className="text-3xl font-extrabold text-indigo-600 dark:text-indigo-300">{result.customTimeMs} <span className="text-sm font-normal text-slate-500 dark:text-slate-400">ms</span></div>
              <span className="text-[11px] text-slate-500 block">Written strictly from scratch without java.util</span>
            </div>

            <div className="p-5 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl space-y-2">
              <span className="text-xs text-slate-500 dark:text-slate-400 font-bold uppercase">Standard JDK java.util Reference</span>
              <div className="text-3xl font-extrabold text-emerald-600 dark:text-emerald-400">{result.jdkTimeMs} <span className="text-sm font-normal text-slate-500 dark:text-slate-400">ms</span></div>
              <span className="text-[11px] text-slate-500 block">Educational comparison baseline only</span>
            </div>
          </div>

          <div className="p-4 bg-slate-50 dark:bg-slate-950/80 border border-slate-200 dark:border-slate-800 rounded-xl flex items-start gap-3 text-xs text-slate-600 dark:text-slate-400 font-sans">
            <AlertCircle className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
            <span><strong>Disclaimer:</strong> {result.disclaimer}</span>
          </div>
        </div>
      )}
    </div>
  );
};
