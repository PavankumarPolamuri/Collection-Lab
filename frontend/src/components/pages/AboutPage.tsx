import React from 'react';
import { Info, ShieldAlert, FileText } from 'lucide-react';

export const AboutPage: React.FC = () => {
  return (
    <div className="space-y-8 py-2 max-w-4xl mx-auto text-xs sm:text-sm font-sans font-normal">
      <div className="space-y-2 border-b border-slate-200 dark:border-slate-800 pb-4">
        <h1 className="section-heading text-slate-900 dark:text-white flex items-center gap-2">
          <Info className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
          About CollectionLab
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 font-sans font-normal">
          A serious software engineering project designed for technical demonstration during Java / Spring Boot / SDE interviews.
        </p>
      </div>

      <div className="space-y-6">
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-6 space-y-3 shadow-sm dark:shadow-lg">
          <h2 className="card-title text-slate-900 dark:text-white">What is CollectionLab?</h2>
          <p className="text-slate-700 dark:text-slate-300 leading-relaxed font-sans font-normal">
            CollectionLab is a full-stack, developer-tool style interactive laboratory built with Spring Boot, Java 17+, React, TypeScript, and Tailwind CSS. It implements five core Java collections (<code className="text-blue-600 dark:text-indigo-300 font-mono font-normal">CustomArrayList</code>, <code className="text-blue-600 dark:text-indigo-300 font-mono font-normal">CustomLinkedList</code>, <code className="text-blue-600 dark:text-indigo-300 font-mono font-normal">CustomHashMap</code>, <code className="text-blue-600 dark:text-indigo-300 font-mono font-normal">CustomTreeMap</code>, and <code className="text-blue-600 dark:text-indigo-300 font-mono font-normal">CustomPriorityQueue</code>) completely from scratch using primitive arrays, custom node classes, separate chaining linked lists, binary search tree nodes, and heap arrays.
          </p>
        </div>

        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-6 space-y-3 shadow-sm dark:shadow-lg">
          <h2 className="card-title text-slate-900 dark:text-white flex items-center gap-2">
            <ShieldAlert className="w-4 h-4 text-amber-500" />
            Why Not Rely on Java's Built-in Collections?
          </h2>
          <p className="text-slate-700 dark:text-slate-300 leading-relaxed font-sans font-normal">
            Most college or beginner projects simply call <code className="text-blue-600 dark:text-indigo-300 font-mono font-normal">java.util.HashMap</code> or <code className="text-blue-600 dark:text-indigo-300 font-mono font-normal">java.util.ArrayList</code> behind an API endpoint. In contrast, CollectionLab writes the data structures manually. This demonstrates mastery over fundamental CS concepts: dynamic array memory expansion, pointer manipulation, hash code bit-mixing, separate chaining collision resolution, BST node deletions, and min-heap sift-up/down arithmetic.
          </p>
        </div>

        <div className="bg-blue-50/50 dark:bg-indigo-950/40 border border-blue-200 dark:border-indigo-500/30 rounded-xl p-6 space-y-3 shadow-sm dark:shadow-lg">
          <h2 className="card-title text-blue-700 dark:text-indigo-300 flex items-center gap-2">
            <FileText className="w-4 h-4" /> Recommended Resume Description
          </h2>
          <div className="p-4 bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg text-slate-800 dark:text-slate-200 text-xs sm:text-sm leading-relaxed font-sans font-normal select-all shadow-sm">
            "CollectionLab — Custom Java Collections Visualizer | Java, Spring Boot, React, TypeScript, JUnit 5<br /><br />
            Developed a full-stack interactive platform implementing ArrayList, LinkedList, HashMap, TreeMap, and PriorityQueue from scratch without relying on Java collection implementations. Built REST APIs with Spring Boot and an interactive React/TypeScript interface to visualize dynamic resizing, linked-node manipulation, hash collision handling, rehashing, BST operations, and binary-heap algorithms. Added Big-O analysis, step-by-step operation visualization, source-code viewing, operation history, and comprehensive JUnit 5 testing."
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-6 space-y-3 shadow-sm dark:shadow-lg">
          <h2 className="card-title text-slate-900 dark:text-white">Technology Stack Summary</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 font-mono font-normal text-xs pt-2">
            <div className="p-3 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg">
              <strong className="text-blue-600 dark:text-indigo-400 block mb-1 font-mono font-medium">Backend Stack:</strong>
              <ul className="space-y-1 text-slate-700 dark:text-slate-300 font-mono font-normal">
                <li>• Java 17+ JDK</li>
                <li>• Spring Boot 3 & Spring Web</li>
                <li>• JUnit 5 Test Suite (36+ tests)</li>
                <li>• Bean Validation & SLF4J</li>
              </ul>
            </div>
            <div className="p-3 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg">
              <strong className="text-emerald-600 dark:text-emerald-400 block mb-1 font-mono font-medium">Frontend Stack:</strong>
              <ul className="space-y-1 text-slate-700 dark:text-slate-300 font-mono font-normal">
                <li>• React 18 & TypeScript</li>
                <li>• Vite Build Tool</li>
                <li>• Tailwind CSS & Lucide Icons</li>
                <li>• Live Code & State Visualizers</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
