import React, { useState } from 'react';
import { BookOpen, ArrowLeft, ArrowRight, RotateCcw } from 'lucide-react';

export const LearningPage: React.FC = () => {
  const [selectedTopic, setSelectedTopic] = useState<'hashmap' | 'arraylist' | 'priorityqueue'>('hashmap');
  const [currentStep, setCurrentStep] = useState<number>(0);

  const guides = {
    hashmap: {
      title: 'How does Custom HashMap Work?',
      subtitle: '8-Step Walkthrough of Hash Computation, Separate Chaining, and Rehashing',
      steps: [
        {
          title: 'Step 1: Receive Key-Value Pair',
          desc: 'The put("Java", 95) method receives the key and value to insert or update in the map.'
        },
        {
          title: 'Step 2: Compute Hash Code',
          desc: 'Calculates key.hashCode() and applies bit-shift XOR bit-mixing h ^ (h >>> 16) for uniform distribution.'
        },
        {
          title: 'Step 3: Calculate Bucket Index',
          desc: 'Computes target bucket index using modulo formula: Math.abs(hash) % capacity.'
        },
        {
          title: 'Step 4: Inspect Target Bucket Chain',
          desc: 'Traverses the entry linked list at table[index] to check if an Entry with identical key already exists.'
        },
        {
          title: 'Step 5: Key Update or Separate Chaining',
          desc: 'If key exists, updates entry value. If key is new and bucket is occupied, prepends new Entry to head of separate chain.'
        },
        {
          title: 'Step 6: Increment Size Counter',
          desc: 'Increments map size count and evaluates current occupancy ratio size / capacity.'
        },
        {
          title: 'Step 7: Evaluate Load Factor Threshold',
          desc: 'Checks if size > (capacity * loadFactor) threshold (e.g. 8 * 0.75 = 6).'
        },
        {
          title: 'Step 8: Double Capacity & Rehash',
          desc: 'If threshold exceeded, allocates new bucket array of 2x capacity and re-calculates bucket index for every existing entry.'
        }
      ]
    },
    arraylist: {
      title: 'How does Custom ArrayList Resizing Work?',
      subtitle: '5-Step Dynamic Array Capacity Expansion Walkthrough',
      steps: [
        {
          title: 'Step 1: Inspect Capacity Limit',
          desc: 'When add(element) is called, checks if current size equals elements.length.'
        },
        {
          title: 'Step 2: Detect Capacity Full',
          desc: 'If size >= capacity, triggers dynamic array expansion event.'
        },
        {
          title: 'Step 3: Allocate Larger Primitive Array',
          desc: 'Calculates new capacity (2x old capacity) and creates Object[] newElements = new Object[newCapacity].'
        },
        {
          title: 'Step 4: Copy Existing Elements',
          desc: 'Iterates through old array and copies all existing references into the new array.'
        },
        {
          title: 'Step 5: Replace Internal Reference & Append',
          desc: 'Replaces internal array reference with new array and appends the new element at elements[size++].'
        }
      ]
    },
    priorityqueue: {
      title: 'How does PriorityQueue Sift Work?',
      subtitle: 'Min-Heap Offer Sift-Up & Poll Sift-Down Walkthrough',
      steps: [
        {
          title: 'Step 1: Offer Element at Array End',
          desc: 'Appends new element at index size in the heap array.'
        },
        {
          title: 'Step 2: Execute Sift-Up Algorithm',
          desc: 'Calculates parent index (i - 1) / 2 and compares element against parent.'
        },
        {
          title: 'Step 3: Swap Upward Until Min-Heap Property Satisfied',
          desc: 'If element < parent, swaps positions and continues moving upward until root or parent is smaller.'
        },
        {
          title: 'Step 4: Poll Root & Move Last Element to Root',
          desc: 'When poll() extracts min root, moves last element from index size-1 to root index 0.'
        },
        {
          title: 'Step 5: Execute Sift-Down Algorithm',
          desc: 'Compares root against left child (2i+1) and right child (2i+2), swapping with the smaller child until heap ordering is restored.'
        }
      ]
    }
  };

  const activeGuide = guides[selectedTopic];
  const maxSteps = activeGuide.steps.length;

  return (
    <div className="space-y-8 py-2 max-w-4xl mx-auto">
      <div className="space-y-2 border-b border-slate-200 dark:border-slate-800 pb-4">
        <h1 className="section-heading text-slate-900 dark:text-white flex items-center gap-2">
          <BookOpen className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
          Interactive Data Structure Learning Walkthroughs
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 font-sans font-normal">
          Step-by-step visual guides explaining core algorithm mechanics.
        </p>
      </div>

      <div className="flex flex-wrap gap-3">
        {(['hashmap', 'arraylist', 'priorityqueue'] as const).map((t) => (
          <button
            key={t}
            onClick={() => {
              setSelectedTopic(t);
              setCurrentStep(0);
            }}
            className={`px-4 py-2 rounded-xl text-xs font-sans font-semibold transition-all ${
              selectedTopic === t
                ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/20'
                : 'bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            {t === 'hashmap' && 'HashMap Separate Chaining'}
            {t === 'arraylist' && 'ArrayList Dynamic Resizing'}
            {t === 'priorityqueue' && 'PriorityQueue Min-Heap Sifting'}
          </button>
        ))}
      </div>

      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-6 shadow-sm dark:shadow-xl space-y-6">
        <div className="border-b border-slate-200 dark:border-slate-800 pb-4">
          <h2 className="card-title text-slate-900 dark:text-white">{activeGuide.title}</h2>
          <p className="text-xs text-slate-600 dark:text-slate-400 font-mono font-normal mt-1">{activeGuide.subtitle}</p>
        </div>

        <div className="bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl p-6 space-y-4 font-mono">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono font-medium text-blue-600 dark:text-indigo-400 bg-blue-50 dark:bg-indigo-500/10 px-3 py-1 rounded border border-blue-200 dark:border-indigo-500/30">
              STEP {currentStep + 1} OF {maxSteps}
            </span>
            <span className="text-xs text-slate-500 font-mono font-normal">Progress: {Math.round(((currentStep + 1) / maxSteps) * 100)}%</span>
          </div>

          <h3 className="card-title text-slate-900 dark:text-white">
            {activeGuide.steps[currentStep].title}
          </h3>

          <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 font-sans font-normal leading-relaxed">
            {activeGuide.steps[currentStep].desc}
          </p>
        </div>

        <div className="flex items-center justify-between pt-2">
          <button
            onClick={() => setCurrentStep(0)}
            className="flex items-center gap-1.5 px-3 py-2 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-lg text-xs font-sans font-semibold transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" /> Restart
          </button>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setCurrentStep(Math.max(0, currentStep - 1))}
              disabled={currentStep === 0}
              className="flex items-center gap-1 px-4 py-2 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 disabled:opacity-40 text-slate-800 dark:text-white rounded-lg text-xs font-sans font-semibold transition-colors"
            >
              <ArrowLeft className="w-4 h-4" /> Previous
            </button>
            <button
              onClick={() => setCurrentStep(Math.min(maxSteps - 1, currentStep + 1))}
              disabled={currentStep === maxSteps - 1}
              className="flex items-center gap-1 px-4 py-2 bg-blue-600 hover:bg-blue-500 disabled:opacity-40 text-white rounded-lg text-xs font-sans font-semibold shadow-md transition-colors"
            >
              Next <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
