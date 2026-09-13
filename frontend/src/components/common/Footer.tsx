import React, { useState } from 'react';
import { Box, Code2, ExternalLink, Mail, Globe, Share2, Check } from 'lucide-react';

interface FooterProps {
  onSelectTab: (tabId: string) => void;
  onOpenCodeViewer: (colId?: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onSelectTab, onOpenCodeViewer }) => {
  const [copied, setCopied] = useState<boolean>(false);

  const handleShare = async () => {
    const shareData = {
      title: 'CollectionLab',
      text: 'Interactive Custom Java Data Structures Visualizer',
      url: window.location.origin
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch (err) {
        // User cancelled or share failed silently
      }
    } else {
      try {
        await navigator.clipboard.writeText(window.location.origin);
        setCopied(true);
        setTimeout(() => setCopied(false), 2500);
      } catch (err) {
        console.error('Share failed:', err);
      }
    }
  };

  return (
    <footer className="bg-[#080D18] border-t border-white/10 text-[#A7B3C7] text-xs font-sans mt-6 transition-colors">
      <div className="max-w-[1400px] mx-auto px-6 py-6 grid grid-cols-1 md:grid-cols-4 gap-6 items-center">
        
        {/* Brand Column */}
        <div className="space-y-2 md:col-span-2">
          <button
            type="button"
            onClick={() => onSelectTab('home')}
            aria-label="Go to CollectionLab home"
            className="flex items-center gap-2.5 cursor-pointer text-left bg-transparent border-0 p-0 focus:outline-none group"
          >
            <div className="p-2 bg-[#84CC16] rounded-xl text-black shadow-md shadow-lime-500/20 group-hover:scale-105 transition-transform">
              <Box className="w-4 h-4 stroke-[2.5]" />
            </div>
            <span className="font-extrabold text-base tracking-tight text-white">
              Collection<span className="text-[#84CC16]">Lab</span>
            </span>
          </button>
          <p className="text-[#A7B3C7] text-[11px] leading-relaxed max-w-md font-sans">
            Custom Java Collections Visualizer implementing core data structures strictly from scratch without standard <code className="text-[#84CC16] font-mono">java.util</code> collections.
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
              <button onClick={() => onSelectTab('learning')} className="hover:text-[#84CC16] transition-colors cursor-pointer">
                Interactive Learning
              </button>
            </li>
            <li>
              <button onClick={() => onSelectTab('benchmark')} className="hover:text-[#84CC16] transition-colors cursor-pointer">
                JVM Benchmark Suite
              </button>
            </li>
            <li>
              <button onClick={() => onOpenCodeViewer('arraylist')} className="hover:text-[#84CC16] flex items-center gap-1 transition-colors cursor-pointer">
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
            type="button"
            onClick={() => onSelectTab('contact')}
            aria-label="Contact developer"
            className="inline-flex items-center gap-2 px-3 py-1 bg-[#84CC16]/15 hover:bg-[#84CC16]/25 text-[#84CC16] border border-[#84CC16]/30 rounded-xl text-xs font-sans font-semibold transition-colors cursor-pointer"
          >
            <Mail className="w-3.5 h-3.5" />
            <span>Contact Developer</span>
          </button>

          {/* Social / Connect Action Buttons */}
          <div className="flex items-center gap-2 pt-1 relative">
            {/* GitHub */}
            <a
              href="https://github.com/PavankumarPolamuri/Collection-Lab"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Open CollectionLab GitHub repository"
              title="Open CollectionLab GitHub repository"
              className="p-1.5 bg-[#10182A] border border-white/10 hover:border-[#84CC16]/50 text-[#A7B3C7] hover:text-white rounded-lg transition-all cursor-pointer inline-flex items-center justify-center"
            >
              <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
              </svg>
            </a>

            {/* Deployed Website / Globe */}
            <a
              href="https://collectionlab-frontend.onrender.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Open CollectionLab website"
              title="Open CollectionLab website"
              className="p-1.5 bg-[#10182A] border border-white/10 hover:border-[#84CC16]/50 text-[#A7B3C7] hover:text-white rounded-lg transition-all cursor-pointer inline-flex items-center justify-center"
            >
              <Globe className="w-3.5 h-3.5" />
            </a>

            {/* Share Button */}
            <button
              type="button"
              onClick={handleShare}
              aria-label="Share CollectionLab"
              title="Share CollectionLab"
              className="p-1.5 bg-[#10182A] border border-white/10 hover:border-[#84CC16]/50 text-[#A7B3C7] hover:text-white rounded-lg transition-all cursor-pointer inline-flex items-center justify-center relative"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-[#10C98B]" /> : <Share2 className="w-3.5 h-3.5" />}
            </button>

            {copied && (
              <span className="text-[10px] font-mono text-[#10C98B] bg-[#10C98B]/10 px-2 py-0.5 rounded border border-[#10C98B]/30 animate-in fade-in">
                Link copied!
              </span>
            )}
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
