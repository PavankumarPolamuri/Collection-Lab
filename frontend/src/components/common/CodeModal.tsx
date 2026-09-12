import React, { useEffect, useState } from 'react';
import { X, Copy, Check, FileCode, ExternalLink } from 'lucide-react';
import { api } from '../../services/api';

interface CodeModalProps {
  isOpen: boolean;
  onClose: () => void;
  collectionName: string;
}

export const CodeModal: React.FC<CodeModalProps> = ({ isOpen, onClose, collectionName }) => {
  const [code, setCode] = useState<string>('Loading source code from backend...');
  const [className, setClassName] = useState<string>('');
  const [copied, setCopied] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    if (isOpen && collectionName) {
      setLoading(true);
      api.getSourceCode(collectionName)
        .then((res) => {
          setCode(res.code);
          setClassName(res.className);
        })
        .catch((err) => {
          setCode(`// Error fetching source code: ${err.message}`);
        })
        .finally(() => setLoading(false));
    }
  }, [isOpen, collectionName]);

  if (!isOpen) return null;

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-slate-900 border border-slate-700 rounded-xl w-full max-w-4xl max-h-[85vh] flex flex-col shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-950">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-indigo-600/20 text-indigo-400 rounded-lg">
              <FileCode className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-mono font-medium text-white flex items-center gap-2">
                {className || `Custom${collectionName}.java`}
              </h3>
              <p className="text-xs text-slate-400 font-sans font-normal">
                Real backend source implementation from project repository
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopy}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg text-xs font-sans font-semibold border border-slate-700 transition-colors"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copied!' : 'Copy Code'}</span>
            </button>
            <button
              onClick={onClose}
              className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Code Content */}
        <div className="p-6 overflow-y-auto font-mono font-normal text-xs sm:text-sm bg-slate-950/80 leading-relaxed text-slate-200">
          {loading ? (
            <div className="py-12 text-center text-slate-500 animate-pulse font-mono font-normal">
              Loading source file from Spring Boot backend...
            </div>
          ) : (
            <pre className="whitespace-pre overflow-x-auto font-mono font-normal">
              <code>{code}</code>
            </pre>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-3 border-t border-slate-800 bg-slate-900 flex items-center justify-between text-xs text-slate-400">
          <span className="flex items-center gap-1.5 font-mono font-normal text-[11px]">
            <ExternalLink className="w-3.5 h-3.5 text-indigo-400" />
            No java.util collections used. Standard scratch implementation.
          </span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg font-sans font-semibold text-xs transition-colors"
          >
            Close Viewer
          </button>
        </div>
      </div>
    </div>
  );
};
