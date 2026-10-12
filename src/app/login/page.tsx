'use client';

import React, { useState, Suspense } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { useLanguage } from '@/context/LanguageContext';
import {
  Compass,
  Lock,
  Mail,
  ArrowRight,
  ShieldCheck,
  Sparkles,
  ArrowLeft,
  Loader2
} from 'lucide-react';

function LoginContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { signInWithGoogle, signInWithEmail, toggleDemoMode, loading } = useAuth();
  const { locale } = useLanguage();
  const isNo = locale === 'no';

  const redirectUrl = searchParams.get('redirect') || '/hotels';
  const hotelName = searchParams.get('hotelName');
  const hotelId = searchParams.get('hotelId');

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSuccess = () => {
    router.push(redirectUrl);
  };

  const handleEmailSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    try {
      await signInWithEmail(email, password);
      handleSuccess();
    } catch (err: any) {
      setError(err?.message || 'Invalid email or password. Please try again.');
    }
  };

  const handleGoogleSignIn = async () => {
    setError('');
    try {
      await signInWithGoogle();
      handleSuccess();
    } catch (err: any) {
      setError('Google Sign-In failed. Please try again.');
    }
  };

  const handleDemoPass = () => {
    toggleDemoMode();
    handleSuccess();
  };

  // Build the subscribe/membership link, passing hotel info if available
  const subscribeHref = hotelId
    ? `/membership?hotelId=${encodeURIComponent(hotelId)}${hotelName ? `&hotelName=${encodeURIComponent(hotelName)}` : ''}`
    : '/membership';

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col justify-center items-center px-4 py-12 selection:bg-amber-100 selection:text-amber-900">
      {/* Back button */}
      <div className="w-full max-w-md mb-6">
        <button
          onClick={() => router.back()}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-slate-900 transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>{isNo ? 'Tilbake' : 'Back'}</span>
        </button>
      </div>

      <div className="w-full max-w-md">
        {/* Brand Header */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-block mb-4">
            <img
              src="/atlas-logo-light.svg"
              alt="ATLAS TRAVEL CLUB"
              className="h-10 w-auto mx-auto object-contain"
            />
          </Link>

          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
            {isNo ? 'Logg inn som medlem' : 'Member Sign In'}
          </h1>
          {hotelName ? (
            <p className="text-xs text-amber-700 mt-1 font-medium">
              {isNo ? (
                <>Logg inn for å låse opp konfidensielle engrospriser for <strong>{hotelName}</strong></>
              ) : (
                <>Sign in to unlock confidential wholesale rates for <strong>{hotelName}</strong></>
              )}
            </p>
          ) : (
            <p className="text-xs text-slate-500 mt-1">
              {isNo
                ? 'Få tilgang til din lukkede reiseklubb med 0 % påslag'
                : 'Access your private 0% markup wholesale travel club'}
            </p>
          )}
        </div>

        {/* Login Box */}
        <div className="p-8 rounded-3xl bg-white border border-slate-200/90 shadow-xl shadow-slate-200/50 space-y-5">
          {error && (
            <div className="p-3.5 rounded-2xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-medium">
              {error}
            </div>
          )}

          {/* Google Sign In */}
          <button
            type="button"
            onClick={handleGoogleSignIn}
            disabled={loading}
            className="w-full flex items-center justify-center gap-3 py-3.5 px-4 rounded-2xl bg-white hover:bg-slate-50 text-slate-800 font-semibold text-sm border border-slate-300 shadow-xs transition-all cursor-pointer"
          >
            <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24">
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
            <span>{isNo ? 'Fortsett med Google' : 'Continue with Google'}</span>
          </button>

          {/* Instant VIP Demo Pass */}
          <button
            type="button"
            onClick={handleDemoPass}
            className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-2xl bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-200/80 font-bold text-xs transition-all cursor-pointer"
          >
            <Sparkles className="w-4 h-4 text-amber-600" />
            <span>
              {isNo
                ? '⚡ Øyeblikkelig VIP-medlemstilgang (Demo Pass)'
                : '⚡ Instant VIP Member Access (Demo Pass)'}
            </span>
          </button>

          <div className="relative my-4 text-center">
            <hr className="border-slate-200" />
            <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white px-3 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
              {isNo ? 'Eller med e-post' : 'Or with email'}
            </span>
          </div>

          {/* Email / Password Form */}
          <form onSubmit={handleEmailSignIn} className="space-y-4">
            <div>
              <label className="block text-[11px] font-bold text-slate-600 uppercase tracking-wider mb-1">
                {isNo ? 'Medlems-e-post' : 'Member Email'}
              </label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-3 w-4 h-4 text-slate-400" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="member@example.com"
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 placeholder-slate-400 focus:outline-none focus:border-amber-500 focus:bg-white focus:ring-2 focus:ring-amber-500/20 text-xs font-medium"
                />
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-bold text-slate-600 uppercase tracking-wider mb-1">
                {isNo ? 'Passord' : 'Password'}
              </label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-3 w-4 h-4 text-slate-400" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 placeholder-slate-400 focus:outline-none focus:border-amber-500 focus:bg-white focus:ring-2 focus:ring-amber-500/20 text-xs font-medium"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              {loading ? (
                <Loader2 className="w-4 h-4 animate-spin text-white" />
              ) : (
                <>
                  <Lock className="w-3.5 h-3.5 text-amber-400" />
                  <span>{isNo ? 'Logg inn' : 'Sign In'}</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          <div className="pt-2 border-t border-slate-100 flex items-center justify-center gap-1.5 text-[10px] text-slate-400">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
            <span>
              {isNo
                ? 'Kryptert med Google Firebase-sikkerhet'
                : 'Encrypted with Google Firebase Security'}
            </span>
          </div>
        </div>

        {/* Below the login box: not a member subscribe here */}
        <div className="mt-6 text-center text-sm text-slate-500">
          <span>{isNo ? 'Ikke medlem ennå? ' : 'Not a member? '}</span>
          <Link
            href={subscribeHref}
            className="text-amber-700 hover:text-amber-800 font-bold hover:underline transition-colors"
          >
            {isNo ? 'Bli medlem her ➔' : 'Subscribe here ➔'}
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-slate-50 flex items-center justify-center text-slate-500 text-sm">
          Loading sign in...
        </div>
      }
    >
      <LoginContent />
    </Suspense>
  );
}
