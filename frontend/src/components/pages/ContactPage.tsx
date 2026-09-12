import React, { useState } from 'react';
import { Mail, Send, CheckCircle2, User, MessageSquare, AlertCircle } from 'lucide-react';

export const ContactPage: React.FC = () => {
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [message, setMessage] = useState<string>('');
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !message.trim()) {
      setError('Please fill out all required fields before submitting.');
      return;
    }
    setError(null);
    setSubmitted(true);
  };

  return (
    <div className="space-y-8 py-4 max-w-3xl mx-auto">
      <div className="text-center space-y-2 border-b border-slate-200 dark:border-slate-800 pb-6">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-50 dark:bg-blue-500/10 border border-blue-200 dark:border-blue-500/30 rounded-full text-xs font-mono font-medium text-blue-600 dark:text-blue-400">
          <Mail className="w-3.5 h-3.5" />
          <span>Get in Touch</span>
        </div>
        <h1 className="section-heading text-slate-900 dark:text-white">
          Contact Developer & Feedback
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 max-w-xl mx-auto font-sans font-normal">
          Have questions or suggestions regarding Collection Lab's custom Java data structure implementations or visualizers? Send a message below.
        </p>
      </div>

      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 sm:p-8 shadow-sm dark:shadow-xl space-y-6 transition-colors">
        {submitted ? (
          <div className="py-10 text-center space-y-4 font-sans animate-fade-in">
            <div className="w-14 h-14 bg-emerald-500/10 text-emerald-500 rounded-full flex items-center justify-center mx-auto border border-emerald-500/30">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h3 className="card-title text-slate-900 dark:text-white">Message Received!</h3>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 max-w-md mx-auto font-sans font-normal">
              Thank you for reaching out, <strong>{name}</strong>. Your message regarding Collection Lab has been recorded.
            </p>
            <button
              onClick={() => {
                setName('');
                setEmail('');
                setMessage('');
                setSubmitted(false);
              }}
              className="px-5 py-2 bg-blue-600 text-white rounded-xl text-xs sm:text-sm font-sans font-semibold hover:bg-blue-500 transition-colors shadow-md shadow-blue-500/20"
            >
              Send Another Message
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-5">
            {error && (
              <div className="p-3 bg-rose-50 dark:bg-rose-500/10 border border-rose-200 dark:border-rose-500/30 rounded-xl text-xs font-mono font-normal text-rose-600 dark:text-rose-400 flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{error}</span>
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-sans font-semibold text-slate-700 dark:text-slate-300 mb-1.5 uppercase tracking-wider flex items-center gap-1.5">
                  <User className="w-3.5 h-3.5 text-blue-500" />
                  Your Name *
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter your name..."
                  className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-700 rounded-xl px-4 py-2.5 text-sm text-slate-900 dark:text-white font-sans font-normal focus:outline-none focus:border-blue-500 transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs font-sans font-semibold text-slate-700 dark:text-slate-300 mb-1.5 uppercase tracking-wider flex items-center gap-1.5">
                  <Mail className="w-3.5 h-3.5 text-blue-500" />
                  Email Address *
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@example.com"
                  className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-700 rounded-xl px-4 py-2.5 text-sm text-slate-900 dark:text-white font-sans font-normal focus:outline-none focus:border-blue-500 transition-colors"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-sans font-semibold text-slate-700 dark:text-slate-300 mb-1.5 uppercase tracking-wider flex items-center gap-1.5">
                <MessageSquare className="w-3.5 h-3.5 text-blue-500" />
                Message / Feedback *
              </label>
              <textarea
                rows={4}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Write your message here..."
                className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-700 rounded-xl px-4 py-2.5 text-sm text-slate-900 dark:text-white font-sans font-normal focus:outline-none focus:border-blue-500 transition-colors resize-none"
              />
            </div>

            <button
              type="submit"
              className="flex items-center justify-center gap-2 w-full py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-sans font-semibold shadow-md shadow-blue-500/20 transition-all text-sm"
            >
              <Send className="w-4 h-4" /> Send Message
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
