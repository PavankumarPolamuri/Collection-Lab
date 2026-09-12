import React from 'react';
import { Box, Code2, ExternalLink, Mail, Globe, Share2 } from 'lucide-react';

interface FooterProps {
  onSelectTab: (tabId: string) => void;
  onOpenCodeViewer: (colId?: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onSelectTab, onOpenCodeViewer }) => {
  return (
    <footer className="bg-[#080D18] border-t border-white/10 text-[#A7B3C7] text-xs font-sans mt-6 transition-colors">
      <div className="max-w-[1400px] mx-auto px-6 py-6 grid grid-cols-1 md:grid-cols-4 gap-6 items-center">
        
        {/* Brand Column */}
        <div className="space-y-2 md:col-span-2">
          <div className="flex items-center gap-2.5">
            <div className="p-2 bg-[#FF6B00] rounded-xl text-white shadow-md shadow-orange-500/20">
              <Box className="w-4 h-4" />
            </div>
            <span className="font-extrabold text-base tracking-tight text-white">
              Collection<span className="text-[#FF6B00]">Lab</span>
            </span>
          </div>
          <p className="text-[#A7B3C7] text-[11px] leading-relaxed max-w-md font-sans">
            Custom Java Collections Visualizer implementing core data structures strictly from scratch without standard <code className="text-[#FF6B00] font-mono">java.util</code> collections.
          </p>
          <div className="flex items-center gap-2 font-mono text-[10px] text-[#10C98B] bg-[#10C98B]/10 px-2.5 py-0.5 rounded-lg border border-[#10C98B]/20 w-max">
            <Code2 className="w-3 h-3" />
            <span>Built with Java • HTML • CSS • JavaScript</span>
          </div>
        </div>

        {/* Learn & Project Column */}
        <div className="space-y-2">
          <h4 className="font-sans font-semibold text-white uppercase tracking-wider text-[10px]">Learn & Project</h4>
          <ul className="space-y-1 text-[11px] font-sans font-normal">
            <li>
              <button onClick={() => onSelectTab('learning')} className="hover:text-[#FF6B00] transition-colors cursor-pointer">
                Interactive Learning
              </button>
            </li>
            <li>
              <button onClick={() => onSelectTab('benchmark')} className="hover:text-[#FF6B00] transition-colors cursor-pointer">
                JVM Benchmark Suite
              </button>
            </li>
            <li>
              <button onClick={() => onOpenCodeViewer('arraylist')} className="hover:text-[#FF6B00] flex items-center gap-1 transition-colors cursor-pointer">
                <span>View Java Source</span>
                <ExternalLink className="w-3 h-3" />
              </button>
            </li>
          </ul>
        </div>

        {/* Connect & Social Column */}
        <div className="space-y-2">
          <h4 className="font-sans font-semibold text-white uppercase tracking-wider text-[10px]">Connect</h4>
          <button
            onClick={() => onSelectTab('contact')}
            className="inline-flex items-center gap-2 px-3 py-1 bg-[#FF6B00]/15 hover:bg-[#FF6B00]/25 text-[#FF6B00] border border-[#FF6B00]/30 rounded-xl text-xs font-sans font-semibold transition-colors cursor-pointer"
          >
            <Mail className="w-3.5 h-3.5" />
            <span>Contact Developer</span>
          </button>

          {/* Social Brand SVGs */}
          <div className="flex items-center gap-2 pt-1">
            <button
              onClick={() => onOpenCodeViewer('arraylist')}
              className="p-1.5 bg-[#10182A] border border-white/10 hover:border-[#FF6B00]/50 text-[#A7B3C7] hover:text-white rounded-lg transition-all cursor-pointer"
              title="GitHub Source"
            >
              <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
              </svg>
            </button>
            <button
              onClick={() => onSelectTab('contact')}
              className="p-1.5 bg-[#10182A] border border-white/10 hover:border-[#FF6B00]/50 text-[#A7B3C7] hover:text-white rounded-lg transition-all cursor-pointer"
              title="LinkedIn Profile"
            >
              <Globe className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => onSelectTab('learning')}
              className="p-1.5 bg-[#10182A] border border-white/10 hover:border-[#FF6B00]/50 text-[#A7B3C7] hover:text-white rounded-lg transition-all cursor-pointer"
              title="Interactive Walkthroughs"
            >
              <Share2 className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

      </div>

      {/* Compact Copyright Bar */}
      <div className="border-t border-white/10 bg-[#0D1424] px-6 py-3">
        <div className="max-w-[1400px] mx-auto flex flex-col sm:flex-row items-center justify-between gap-2 text-[10px] text-[#718096]">
          <span>© 2026 Collection Lab. All rights reserved.</span>
          <span className="font-mono text-[#A7B3C7]">
            Custom Java Collections Laboratory • Spring Boot 3.2 & React 18
          </span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
