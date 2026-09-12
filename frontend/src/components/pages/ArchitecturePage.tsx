import React from 'react';
import { Network, ArrowDown } from 'lucide-react';

export const ArchitecturePage: React.FC = () => {
  const layers = [
    {
      name: 'React + TypeScript Frontend',
      tech: 'React 18, TypeScript, Vite, Tailwind CSS, Lucide Icons',
      desc: 'Renders dynamic visualizers, index grids, linked-node chains, SVG BST hierarchy, and interactive control panels.'
    },
    {
      name: 'API Client Service Layer',
      tech: 'Fetch API, Typed async DTO promises',
      desc: 'Handles JSON requests to /api/{collection} and converts response snapshots into visual state updates.'
    },
    {
      name: 'Spring Boot REST Controllers',
      tech: 'Spring Web 3, @RestController, @CrossOrigin, @ControllerAdvice',
      desc: 'Receives HTTP POST/GET/DELETE operations, delegates execution to CollectionService, and catches exceptions globally.'
    },
    {
      name: 'Service Layer & Session Manager',
      tech: 'Spring @Service',
      desc: 'Maintains active instances of scratch collections and converts raw nodes/buckets into state DTO snapshots.'
    },
    {
      name: 'Custom Scratch Data Structures',
      tech: 'Java 17 primitive arrays, node classes, hashing, BST pointers, heap math',
      desc: 'Pure Java implementations written strictly from scratch without java.util collections.'
    },
    {
      name: 'Operation Result & Algorithmic Tracing',
      tech: 'OperationResponse<S> DTO',
      desc: 'Returns step logs, previousState, newState, complexity ratings, and internal state metrics back to the frontend.'
    }
  ];

  return (
    <div className="space-y-8 py-2 max-w-4xl mx-auto">
      <div className="space-y-2 border-b border-slate-200 dark:border-slate-800 pb-4">
        <h1 className="section-heading text-slate-900 dark:text-white flex items-center gap-2">
          <Network className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
          Full-Stack Project Architecture
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 font-sans font-normal">
          End-to-end data flow representation from user UI actions down to scratch Java algorithms.
        </p>
      </div>

      <div className="space-y-3">
        {layers.map((layer, idx) => (
          <React.Fragment key={idx}>
            <div className="p-5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl space-y-2 shadow-sm dark:shadow-lg transition-all hover:border-slate-300 dark:hover:border-slate-700">
              <div className="flex items-center justify-between">
                <span className="card-title text-indigo-600 dark:text-indigo-400 flex items-center gap-2">
                  <span className="w-6 h-6 bg-indigo-100 dark:bg-indigo-500/10 text-indigo-700 dark:text-indigo-400 rounded-full flex items-center justify-center text-xs font-mono font-medium">
                    {idx + 1}
                  </span>
                  {layer.name}
                </span>
                <span className="text-[10px] font-mono font-medium text-slate-600 dark:text-slate-400 bg-slate-100 dark:bg-slate-950 px-2.5 py-1 rounded border border-slate-200 dark:border-slate-800">
                  {layer.tech}
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 font-sans font-normal leading-relaxed pl-8">
                {layer.desc}
              </p>
            </div>

            {idx < layers.length - 1 && (
              <div className="flex justify-center text-indigo-600 dark:text-indigo-400">
                <ArrowDown className="w-5 h-5 animate-pulse" />
              </div>
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};
