'use client';

import React, { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { X, ShieldCheck, Mail, Lock, User, Sparkles, Zap, CheckCircle2 } from 'lucide-react';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultMode?: 'login' | 'signup';
  customTitle?: string;
  customSubtitle?: string;
}

export default function AuthModal({
  isOpen,
  onClose,
  defaultMode = 'signup',
  customTitle,
  customSubtitle,
}: AuthModalProps) {
  const { signInWithGoogle, signInWithEmail, signUpWithEmail, loading, signInWithDemo } = useAuth();
  const [isSignUp, setIsSignUp] = useState(defaultMode === 'signup');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    try {
      if (isSignUp) {
        if (!name) {
          setError('Please enter your full name');
          return;
        }
        await signUpWithEmail(email, password, name);
      } else {
        await signInWithEmail(email, password);
      }
      onClose();
    } catch (err: any) {
      setError(err?.message || 'Authentication error. Please try again.');
    }
  };

  const handleGoogle = async () => {
    try {
      await signInWithGoogle();
      onClose();
    } catch (err: any) {
      setError('Google Sign-in failed. Please try again.');
    }
  };

  const handleDemoLogin = async () => {
    try {
      if (signInWithDemo) {
        await signInWithDemo();
      } else {
        await signInWithEmail('vip.member@atlasclub.com', 'password');
      }
      onClose();
    } catch (err) {
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/85 backdrop-blur-md p-4 animate-in fade-in duration-200">
      <div className="relative w-full max-w-md bg-slate-900 rounded-3xl shadow-2xl overflow-hidden border border-amber-500/30 text-white animate-in zoom-in-95 duration-200">
        {/* Luxury Header Banner */}
        <div className="bg-gradient-to-r from-slate-950 via-indigo-950 to-slate-950 p-6 text-white text-center relative border-b border-slate-800">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-1.5 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
          
          <div className="inline-flex items-center justify-center p-2.5 bg-amber-400/10 rounded-2xl mb-3 border border-amber-400/30">
            <Sparkles className="w-6 h-6 text-amber-400" />
          </div>

          <h2 className="text-xl sm:text-2xl font-black text-white">
            {customTitle ? customTitle : isSignUp ? 'Join ATLAS Wholesale Club' : 'Member Sign In'}
          </h2>
          
          <p className="text-slate-300 text-xs mt-1.5 leading-relaxed max-w-xs mx-auto">
            {customSubtitle
              ? customSubtitle
              : isSignUp
              ? 'Rate parity laws require closed-loop membership to clear wholesale rates at 0% markup.'
              : 'Access your private wholesale rates & sovereign travel vault.'}
          </p>
        </div>

        <div className="p-6 space-y-4">
          {error && (
            <div className="p-3 rounded-xl bg-rose-950/80 border border-rose-500 text-rose-300 text-xs">
              {error}
            </div>
          )}

          {/* 1-Click Demo VIP Access Button */}
          <button
            onClick={handleDemoLogin}
            className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-black text-xs shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer border border-emerald-400/40"
          >
            <Zap className="w-4 h-4 text-amber-300" />
            <span>⚡ 1-Click Instant VIP Access (Instant Test Access)</span>
          </button>

          {/* Google Sign In */}
          <button
            onClick={handleGoogle}
            disabled={loading}
            className="w-full flex items-center justify-center gap-3 py-2.5 px-4 rounded-xl border border-slate-700 bg-slate-950 hover:bg-slate-800 text-slate-200 font-bold text-xs shadow-sm transition-all cursor-pointer"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.8-2.4 3.64v3h3.88c2.27-2.09 3.66-5.17 3.66-9.08z"
              />
              <path
                fill="#34A853"
                d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.26v3.09C3.26 21.37 7.36 24 12 24z"
              />
              <path
                fill="#FBBC05"
                d="M5.28 14.32c-.25-.72-.38-1.49-.38-2.32s.13-1.6.38-2.32V6.59H1.26C.46 8.18 0 9.99 0 12s.46 3.82 1.26 5.41l4.02-3.09z"
              />
              <path
                fill="#EA4335"
                d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.36 0 3.26 2.63 1.26 6.59l4.02 3.09c.95-2.83 3.6-4.93 6.72-4.93z"
              />
            </svg>
            <span>Continue with Google</span>
          </button>

          <div className="relative my-4 text-center">
            <hr className="border-slate-800" />
            <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-slate-900 px-3 text-[10px] font-bold text-slate-500 uppercase tracking-wider">
              Or with email
            </span>
          </div>

          {/* Email / Password Form */}
          <form onSubmit={handleSubmit} className="space-y-3">
            {isSignUp && (
              <div>
                <label className="block text-[10px] font-black text-slate-400 uppercase tracking-wider mb-1">
                  Full Name
                </label>
                <div className="relative">
                  <User className="absolute left-3.5 top-3 w-4 h-4 text-slate-500" />
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Jane Doe"
                    className="w-full pl-10 pr-4 py-2 bg-slate-950 border border-slate-800 rounded-xl focus:outline-none focus:border-amber-400 text-xs text-white placeholder:text-slate-600"
                  />
                </div>
              </div>
            )}

            <div>
              <label className="block text-[10px] font-black text-slate-400 uppercase tracking-wider mb-1">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-3 w-4 h-4 text-slate-500" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@domain.com"
                  className="w-full pl-10 pr-4 py-2 bg-slate-950 border border-slate-800 rounded-xl focus:outline-none focus:border-amber-400 text-xs text-white placeholder:text-slate-600"
                />
              </div>
            </div>

            <div>
              <label className="block text-[10px] font-black text-slate-400 uppercase tracking-wider mb-1">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-3 w-4 h-4 text-slate-500" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-4 py-2 bg-slate-950 border border-slate-800 rounded-xl focus:outline-none focus:border-amber-400 text-xs text-white placeholder:text-slate-600"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 hover:from-amber-500 hover:to-amber-700 text-slate-950 font-black shadow-lg transition-all text-xs cursor-pointer mt-2"
            >
              {loading ? 'Processing...' : isSignUp ? 'Create VIP Member Account' : 'Sign In to Club'}
            </button>
          </form>

          {/* Toggle Login / Signup */}
          <div className="text-center text-xs text-slate-400 pt-2">
            {isSignUp ? (
              <span>
                Already an ATLAS member?{' '}
                <button
                  type="button"
                  onClick={() => setIsSignUp(false)}
                  className="text-amber-400 font-bold hover:underline cursor-pointer"
                >
                  Sign In
                </button>
              </span>
            ) : (
              <span>
                Don’t have a membership yet?{' '}
                <button
                  type="button"
                  onClick={() => setIsSignUp(true)}
                  className="text-amber-400 font-bold hover:underline cursor-pointer"
                >
                  Join ATLAS VIP
                </button>
              </span>
            )}
          </div>

          <div className="pt-3 border-t border-slate-800 flex items-center justify-center gap-1.5 text-[11px] text-slate-400">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            <span>Closed-Loop B2B Bedbank Clearing • 100% Rate Parity Exempt</span>
          </div>
        </div>
      </div>
    </div>
  );
}
