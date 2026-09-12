import { useState, useEffect } from 'react';
import { Navbar } from './components/common/Navbar';
import { Footer } from './components/common/Footer';
import { CodeModal } from './components/common/CodeModal';
import { LandingPage } from './components/pages/LandingPage';
import { Dashboard } from './components/pages/Dashboard';
import { CollectionView } from './components/pages/CollectionView';
import { ComplexityPage } from './components/pages/ComplexityPage';
import { LearningPage } from './components/pages/LearningPage';
import { BenchmarkPage } from './components/pages/BenchmarkPage';
import { ArchitecturePage } from './components/pages/ArchitecturePage';
import { AboutPage } from './components/pages/AboutPage';
import { ContactPage } from './components/pages/ContactPage';
import type { OperationHistoryItem } from './types/collections';

export function App() {
  const [currentTab, setCurrentTab] = useState<string>('landing');
  const [codeModalOpen, setCodeModalOpen] = useState<boolean>(false);
  const [codeCollection, setCodeCollection] = useState<string>('ArrayList');
  const [history, setHistory] = useState<OperationHistoryItem[]>([]);

  useEffect(() => {
    document.documentElement.classList.add('dark');
  }, []);

  const handleOpenCodeViewer = (colId?: string) => {
    const target = colId || (['arraylist', 'linkedlist', 'hashmap', 'treemap', 'priorityqueue'].includes(currentTab) ? currentTab : 'arraylist');
    const formatted = target.charAt(0).toUpperCase() + target.slice(1);
    setCodeCollection(formatted);
    setCodeModalOpen(true);
  };

  const isCollectionTab = ['arraylist', 'linkedlist', 'hashmap', 'treemap', 'priorityqueue'].includes(currentTab);

  return (
    <div className="min-h-screen flex flex-col bg-[#080D18] text-white font-sans selection:bg-[#FF6B00]/30 selection:text-orange-200">
      <Navbar
        currentTab={currentTab}
        onSelectTab={(tabId: string) => setCurrentTab(tabId)}
        onOpenCodeViewer={(id) => handleOpenCodeViewer(id)}
      />

      <main className="flex-1 w-full bg-[#080D18]">
        {(currentTab === 'landing' || currentTab === 'home') && (
          <LandingPage
            onSelectTab={(id: string) => setCurrentTab(id)}
            onOpenCodeViewer={(id) => handleOpenCodeViewer(id)}
          />
        )}

        {currentTab === 'dashboard' && (
          <Dashboard
            onSelectCollection={(id) => setCurrentTab(id)}
            onOpenCodeViewer={(id) => handleOpenCodeViewer(id)}
          />
        )}

        {isCollectionTab && (
          <div className="max-w-[1400px] mx-auto p-4 sm:p-6 lg:p-8">
            <CollectionView
              collectionId={currentTab}
              history={history}
              setHistory={setHistory}
            />
          </div>
        )}

        {currentTab === 'learning' && (
          <div className="max-w-[1400px] mx-auto p-4 sm:p-6 lg:p-8">
            <LearningPage />
          </div>
        )}
        {currentTab === 'complexity' && (
          <div className="max-w-[1400px] mx-auto p-4 sm:p-6 lg:p-8">
            <ComplexityPage />
          </div>
        )}
        {currentTab === 'benchmark' && (
          <div className="max-w-[1400px] mx-auto p-4 sm:p-6 lg:p-8">
            <BenchmarkPage />
          </div>
        )}
        {currentTab === 'architecture' && (
          <div className="max-w-[1400px] mx-auto p-4 sm:p-6 lg:p-8">
            <ArchitecturePage />
          </div>
        )}
        {currentTab === 'about' && (
          <div className="max-w-[1400px] mx-auto p-4 sm:p-6 lg:p-8">
            <AboutPage />
          </div>
        )}
        {currentTab === 'contact' && (
          <div className="max-w-[1400px] mx-auto p-4 sm:p-6 lg:p-8">
            <ContactPage />
          </div>
        )}
      </main>

      <Footer
        onSelectTab={(id: string) => setCurrentTab(id)}
        onOpenCodeViewer={(id) => handleOpenCodeViewer(id)}
      />

      <CodeModal
        isOpen={codeModalOpen}
        onClose={() => setCodeModalOpen(false)}
        collectionName={codeCollection}
      />
    </div>
  );
}

export default App;
