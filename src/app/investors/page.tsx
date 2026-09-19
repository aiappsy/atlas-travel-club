'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  ShieldCheck, Lock, Download, FileText, CheckCircle2, 
  TrendingUp, DollarSign, Cloud, Building2, Eye, ExternalLink, 
  RefreshCw, AlertCircle, Sparkles, Layers, Users, Award, 
  ChevronRight, X, Mail, KeyRound, ArrowRight, Menu, 
  ChevronLeft, Check, Copy, HelpCircle, Briefcase, Info, LockKeyhole
} from 'lucide-react';

interface SignatureRecord {
  id: string;
  fullName: string;
  email: string;
  firmName?: string;
  signatureHash: string;
  ipAddress: string;
  signedAt: string;
}

export default function InvestorPortalPage() {
  // Navigation & Layout State
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [activeSection, setActiveSection] = useState('overview');

  // Verification & Gating State
  const [email, setEmail] = useState('');
  const [isEmailVerified, setIsEmailVerified] = useState(false);
  const [verificationCode, setVerificationCode] = useState('');
  const [codeSent, setCodeSent] = useState(false);
  const [demoCodeHint, setDemoCodeHint] = useState<string | null>(null);
  const [verifyError, setVerifyError] = useState<string | null>(null);
  const [isSendingCode, setIsSendingCode] = useState(false);
  const [isVerifyingCode, setIsVerifyingCode] = useState(false);

  // NDA Signing State
  const [showNdaModal, setShowNdaModal] = useState(false);
  const [fullName, setFullName] = useState('');
  const [firmName, setFirmName] = useState('');
  const [eSignConsent, setESignConsent] = useState(false);
  const [isSigning, setIsSigning] = useState(false);
  const [signedData, setSignedData] = useState<SignatureRecord | null>(null);
  const [copiedHash, setCopiedHash] = useState(false);

  // Document Preview State
  const [previewDoc, setPreviewDoc] = useState<{
    title: string;
    file: string;
    highlights: string[];
    category: string;
  } | null>(null);

  // Check persisted signature on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem('atlas_investor_session_v2');
      if (stored) {
        const parsed = JSON.parse(stored);
        setSignedData(parsed);
        setIsEmailVerified(true);
        setEmail(parsed.email || '');
      }
    } catch (e) {
      console.error('Error reading investor session:', e);
    }
  }, []);

  // Send Email OTP
  const handleSendVerificationCode = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      setVerifyError('Please enter a valid email address.');
      return;
    }

    setIsSendingCode(true);
    setVerifyError(null);

    try {
      const res = await fetch('/api/investors/verify-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email.trim(), action: 'send' })
      });
      const data = await res.json();

      if (res.ok) {
        setCodeSent(true);
        if (data.demoCode) {
          setDemoCodeHint(data.demoCode);
        }
      } else {
        setVerifyError(data.error || 'Failed to send verification code.');
      }
    } catch (err: any) {
      setVerifyError('Network error. Please try again.');
    } finally {
      setIsSendingCode(false);
    }
  };

  // Verify OTP
  const handleVerifyCode = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!verificationCode) return;

    setIsVerifyingCode(true);
    setVerifyError(null);

    try {
      const res = await fetch('/api/investors/verify-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: email.trim(),
          action: 'verify',
          code: verificationCode.trim()
        })
      });
      const data = await res.json();

      if (res.ok && data.verified) {
        setIsEmailVerified(true);
        // Automatically open NDA execution modal
        setShowNdaModal(true);
      } else {
        setVerifyError(data.error || 'Invalid verification code. Try test code 888999.');
      }
    } catch (err: any) {
      setVerifyError('Verification failed. Try again.');
    } finally {
      setIsVerifyingCode(false);
    }
  };

  // Execute NDA Signature
  const handleExecuteNda = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !eSignConsent || !email) return;

    setIsSigning(true);

    try {
      const res = await fetch('/api/investors/sign-nda', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fullName: fullName.trim(),
          email: email.trim(),
          firmName: firmName.trim(),
          eSignConsent: true
        })
      });
      const data = await res.json();

      if (res.ok && data.success) {
        setSignedData(data.signature);
        localStorage.setItem('atlas_investor_session_v2', JSON.stringify(data.signature));
        setShowNdaModal(false);
        setActiveSection('documents');
      } else {
        alert(data.error || 'Could not record signature.');
      }
    } catch (err) {
      alert('Error recording signature. Please check connection.');
    } finally {
      setIsSigning(false);
    }
  };

  const handleResetSession = () => {
    if (confirm('Reset your investor session? This will re-lock confidential documents.')) {
      localStorage.removeItem('atlas_investor_session_v2');
      setSignedData(null);
      setIsEmailVerified(false);
      setCodeSent(false);
      setVerificationCode('');
      setDemoCodeHint(null);
    }
  };

  const copySignatureHash = () => {
    if (signedData?.signatureHash) {
      navigator.clipboard.writeText(signedData.signatureHash);
      setCopiedHash(true);
      setTimeout(() => setCopiedHash(false), 2000);
    }
  };

  const navItems = [
    { id: 'overview', label: 'Overview & Deal Terms', icon: Award },
    { id: 'thesis', label: 'The Wholesale Arbitrage', icon: Layers },
    { id: 'economics', label: 'Unit Economics & Model', icon: TrendingUp },
    { id: 'budget', label: '$75k Use of Proceeds', icon: DollarSign },
    { id: 'documents', label: 'Confidential Data Room', icon: FileText, badge: signedData ? 'Unlocked' : 'Locked' },
    { id: 'exits', label: 'M&A Exits & Liquidity', icon: Building2 },
    { id: 'contact', label: 'Reserve Allocation', icon: ArrowRight },
  ];

  const documents = [
    {
      id: 'deck',
      title: '10-Slide Investor Presentation',
      category: 'Pitch Deck',
      desc: 'Visual deck covering the Costco travel thesis, $350B OTA tax, unit economics, and use of proceeds.',
      file: '/docs/investors/ATLAS_Investor_Pitch_Deck.pdf',
      highlights: [
        'Costco Travel Model: 100% of wholesale net savings passed at 0% markup.',
        'Target Market: Affluent families (45%), SMBs (30%), Luxury (15%), Nomads (10%).',
        'Unit Economics: $850 blended ARPU, $115 CAC, 94% subscription gross margin.',
        'Budget: $75,000 raise on a $1.75M Post-Money SAFE (~4.3% dilution).'
      ]
    },
    {
      id: 'prospectus',
      title: 'Confidential Investor Prospectus (PPM)',
      category: 'Private Placement Memorandum',
      desc: '10-section offering memorandum, 5-year pro-forma income statement, and $0 supplier deposit model.',
      file: '/docs/investors/ATLAS_Confidential_Prospectus.pdf',
      highlights: [
        'Entity: ATLAS Travel Club LLC (Manager-Managed LLC — DE/WY).',
        '5-Year Model: Year 1: $850k ARR (1k users) -> Year 3: $21.2M ARR (25k users) -> Year 5: $102M ARR.',
        'Human Execution Focus: Over 57% of proceeds fund Founder stipend ($25k) and dev contractor sprints ($18k).',
        '$0 Supplier Deposits: Synchronous real-time card authorization via RateHawk, Duffel, and Stripe.'
      ]
    },
    {
      id: 'safe',
      title: 'YC Post-Money SAFE Term Sheet Summary',
      category: 'Legal Term Sheet',
      desc: 'Simple Agreement for Future Equity (LLC Edition) with optional Delaware C-Corp conversion mechanics.',
      file: '/docs/investors/ATLAS_SAFE_Term_Sheet_LLC.pdf',
      highlights: [
        'Target Financing: $75,000 USD (Min $50,000 | Max $100,000).',
        'Valuation Cap: $1,750,000 USD with 20% standard conversion discount.',
        'Conversion: Automatically converts into Preferred Units upon $1M+ qualified round.',
        'Corporate Conversion Flexibility: Optional C-Corp conversion to accommodate venture funds and Section 1202 QSBS.'
      ]
    },
    {
      id: 'tech',
      title: 'Technical Architecture & Google Cloud Manual',
      category: 'Engineering Standards',
      desc: '100% Google Cloud Ecosystem specification: Cloud Run, Vertex AI, Cloud SQL, Secret Manager.',
      file: '/docs/investors/ATLAS_Technical_Architecture_Google_Cloud.pdf',
      highlights: [
        'Stateless Serverless: Google Cloud Run with automatic scaling up to 50 concurrent instances.',
        'Zero-IP Exposure Database: Google Cloud SQL PostgreSQL v16 accessed via Cloud SQL Auth Proxy.',
        'Native Vertex AI: Gemini 1.5 Pro & 2.0 Flash with Function Calling for real-time bedbank queries.',
        'Edge Compliance: Google Cloud Armor WAF mitigating bots and enforcing noindex rate parity shields.'
      ]
    },
    {
      id: 'faq',
      title: 'Investor Due Diligence FAQ & Risk Brief',
      category: 'Due Diligence & Compliance',
      desc: 'Pre-empts rate parity legal precedent (Sherman Act, Loi Macron), account-sharing controls, and CRS check-in.',
      file: '/docs/investors/ATLAS_Due_Diligence_FAQ.pdf',
      highlights: [
        'Rate Parity Antitrust: US Sherman Act 15 U.S.C. § 1 & EU Loi Macron exempt closed-loop buyer syndicates.',
        'Account Protection: Device fingerprinting, legal passport matching, and wallet balances disincentivize sharing.',
        'CRS Hotel Settlement: Direct bedbank voucher codes appear identical to Amex Fine Hotels reservations.',
        'Capital Efficiency: Why $75k is sufficient for 12 months due to asset-light software architecture.'
      ]
    },
    {
      id: 'exit',
      title: 'Strategic Exit Opportunities & M&A Landscape',
      category: 'Liquidity & M&A Analysis',
      desc: 'Precedent transactions (Amex, Capital One/Velocity Black, Booking, Revolut) and 3 to 6-year exit multiples.',
      file: '/docs/investors/ATLAS_Strategic_Exit_Opportunities.pdf',
      highlights: [
        'Premium Card Issuers: Capital One acquired Velocity Black for $297M; Chase acquired Frosch Travel.',
        'OTA Consolidation: Booking Holdings & Expedia seek high-margin SaaS subscription cash flows.',
        'Return Multiples on $75k SAFE: Base Case M&A ($74M valuation) = ~42x; Growth Case ($378M) = ~215x.',
        'PE Dividend Recap: Capital-light high EBITDA allows buyout recapitalizations at 8x–12x.'
      ]
    }
  ];

  return (
    <div className="bg-slate-50 text-slate-800 min-h-screen font-sans flex flex-col antialiased">
      
      {/* TOP COMPLIANCE BAR */}
      <header className="sticky top-0 z-40 bg-white border-b border-slate-200/80 shadow-xs backdrop-blur-md bg-white/90">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="p-2 rounded-xl border border-slate-200 text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-all cursor-pointer"
              title={isSidebarOpen ? "Collapse Navigation" : "Expand Navigation"}
            >
              <Menu className="w-4 h-4" />
            </button>

            <Link href="/" className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-slate-950 flex items-center justify-center text-amber-400 font-black text-sm shadow-xs">
                A
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-black tracking-tight text-slate-900 font-mono flex items-center gap-1.5">
                  ATLAS <span className="text-[10px] font-sans font-bold px-1.5 py-0.2 bg-amber-100 text-amber-800 rounded">LLC</span>
                </span>
                <span className="text-[10px] text-slate-500 font-medium">Investor Portal • Confidential</span>
              </div>
            </Link>
          </div>

          {/* Verification Badge */}
          <div className="flex items-center gap-3">
            {signedData ? (
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                <span className="hidden sm:inline">NDA Executed:</span>
                <span className="font-bold">{signedData.fullName}</span>
                <button 
                  onClick={handleResetSession}
                  className="text-[11px] text-slate-400 hover:text-rose-600 underline ml-1 cursor-pointer"
                >
                  Exit
                </button>
              </div>
            ) : isEmailVerified ? (
              <button 
                onClick={() => setShowNdaModal(true)}
                className="px-3.5 py-1.5 rounded-full bg-amber-500 hover:bg-amber-600 text-slate-950 text-xs font-bold transition-all shadow-xs flex items-center gap-1.5 cursor-pointer"
              >
                <FileText className="w-3.5 h-3.5" />
                <span>Sign NDA to Unlock</span>
              </button>
            ) : (
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-100 text-slate-600 text-xs font-medium border border-slate-200">
                <LockKeyhole className="w-3 h-3 text-slate-400" />
                <span>Verification Required</span>
              </div>
            )}

            <Link
              href="/"
              target="_blank"
              className="hidden md:flex items-center gap-1 text-xs text-slate-500 hover:text-slate-900 font-medium px-2.5 py-1 rounded-lg hover:bg-slate-100 transition-colors"
            >
              <span>Live App</span>
              <ExternalLink className="w-3 h-3 text-slate-400" />
            </Link>
          </div>
        </div>
      </header>

      {/* MAIN CONTAINER WITH COLLAPSIBLE SIDEBAR */}
      <div className="flex-1 flex max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 gap-6">
        
        {/* COLLAPSIBLE SIDEBAR */}
        <aside 
          className={`shrink-0 transition-all duration-300 ease-in-out ${
            isSidebarOpen ? 'w-64' : 'w-14'
          } hidden md:block`}
        >
          <div className="sticky top-24 bg-white rounded-2xl border border-slate-200/80 p-3 shadow-xs space-y-1">
            <div className={`px-3 py-2 text-[10px] font-bold text-slate-400 uppercase tracking-wider ${!isSidebarOpen && 'hidden'}`}>
              Navigation Index
            </div>

            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeSection === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveSection(item.id);
                    document.getElementById(item.id)?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                    isActive 
                      ? 'bg-slate-900 text-white shadow-xs' 
                      : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                  }`}
                  title={item.label}
                >
                  <div className="flex items-center gap-2.5 truncate">
                    <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-amber-400' : 'text-slate-500'}`} />
                    {isSidebarOpen && <span className="truncate">{item.label}</span>}
                  </div>
                  {isSidebarOpen && item.badge && (
                    <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded ${
                      item.badge === 'Unlocked' 
                        ? 'bg-emerald-500/20 text-emerald-700' 
                        : 'bg-amber-100 text-amber-800'
                    }`}>
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}

            {isSidebarOpen && (
              <div className="pt-4 mt-4 border-t border-slate-100 px-3 text-[11px] text-slate-500 space-y-1">
                <div className="font-semibold text-slate-700">Pre-Seed Round</div>
                <div>Target: <strong>$75,000 USD</strong></div>
                <div>Cap: <strong>$1.75M Post-Money</strong></div>
                <div>Instrument: <strong>YC SAFE (LLC)</strong></div>
              </div>
            )}
          </div>
        </aside>

        {/* MAIN BODY CONTENT */}
        <main className="flex-1 space-y-10 min-w-0">

          {/* 1. HERO TEASER & VALUE PROPOSITION */}
          <section id="overview" className="bg-white rounded-3xl p-8 sm:p-10 border border-slate-200/80 shadow-xs space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 border border-slate-200 text-slate-700 text-xs font-semibold">
              <Building2 className="w-3.5 h-3.5 text-amber-600" />
              <span>ATLAS Travel Club LLC • Delaware / Wyoming Manager-Managed LLC</span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight leading-tight">
              The Digital <span className="text-amber-600">Costco</span> for the $1.4T Travel Market
            </h1>

            <p className="text-slate-600 text-base sm:text-lg leading-relaxed max-w-3xl">
              By operating as a private, password-gated membership club, ATLAS exercises 
              antitrust exemptions under US and EU law to bypass the 25% OTA retail duopoly. 
              We acquire raw B2B bedbank and flight inventory at wholesale clearing cost and pass 
              <strong> 100% of wholesale savings to members at 0% markup</strong>.
            </p>

            {/* TEASER KEY METRICS BAR */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-2">
              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200/80">
                <div className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">Round Target</div>
                <div className="text-2xl font-black text-slate-900 mt-0.5">$75,000</div>
                <div className="text-[11px] text-amber-600 font-semibold">YC Post-Money SAFE</div>
              </div>

              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200/80">
                <div className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">Valuation Cap</div>
                <div className="text-2xl font-black text-slate-900 mt-0.5">$1.75M</div>
                <div className="text-[11px] text-emerald-700 font-semibold">~4.3% Equity at Cap</div>
              </div>

              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200/80">
                <div className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">Blended ARPU</div>
                <div className="text-2xl font-black text-slate-900 mt-0.5">$850 / yr</div>
                <div className="text-[11px] text-slate-500">94% Gross Margin</div>
              </div>

              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200/80">
                <div className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">Cloud Engine</div>
                <div className="text-2xl font-black text-slate-900 mt-0.5">100% GCP</div>
                <div className="text-[11px] text-blue-600 font-semibold">Cloud Run & Vertex AI</div>
              </div>
            </div>
          </section>

          {/* 2. THE 2-STEP ACCESS GATE (EMAIL VERIFY -> DIGITAL NDA) */}
          {!signedData && (
            <section className="bg-white rounded-3xl p-8 border-2 border-amber-500/40 shadow-sm space-y-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-700">
                  <Lock className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="text-xl font-black text-slate-900">Access the Confidential Investor Data Room</h2>
                  <p className="text-xs text-slate-500">Complete the 2-step verification below to review financials and download PDFs.</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
                {/* STEP 1: EMAIL VERIFICATION */}
                <div className={`p-6 rounded-2xl border transition-all ${
                  isEmailVerified 
                    ? 'bg-emerald-50/60 border-emerald-200' 
                    : 'bg-slate-50 border-slate-200'
                }`}>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
                      <span className="w-5 h-5 rounded-full bg-slate-900 text-white flex items-center justify-center text-[10px]">1</span>
                      Step 1: Verify Email
                    </span>
                    {isEmailVerified && (
                      <span className="text-xs font-bold text-emerald-700 flex items-center gap-1">
                        <CheckCircle2 className="w-4 h-4" /> Verified
                      </span>
                    )}
                  </div>

                  {!isEmailVerified ? (
                    <div className="space-y-3">
                      <p className="text-xs text-slate-600">
                        Enter your email to receive a 6-digit verification code before reviewing confidential materials.
                      </p>

                      {!codeSent ? (
                        <form onSubmit={handleSendVerificationCode} className="space-y-2.5">
                          <input
                            type="email"
                            required
                            placeholder="investor@fund.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs text-slate-900 bg-white focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500"
                          />
                          <button
                            type="submit"
                            disabled={isSendingCode}
                            className="w-full py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                          >
                            {isSendingCode ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : <Mail className="w-3.5 h-3.5" />}
                            <span>Send Verification Code</span>
                          </button>
                        </form>
                      ) : (
                        <form onSubmit={handleVerifyCode} className="space-y-2.5">
                          <div className="text-[11px] text-slate-500 flex items-center justify-between">
                            <span>Code sent to {email}</span>
                            <button
                              type="button"
                              onClick={() => setCodeSent(false)}
                              className="text-amber-600 hover:underline"
                            >
                              Change
                            </button>
                          </div>
                          <input
                            type="text"
                            required
                            maxLength={6}
                            placeholder="6-digit code (or 888999)"
                            value={verificationCode}
                            onChange={(e) => setVerificationCode(e.target.value)}
                            className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-center text-sm font-mono tracking-widest text-slate-900 bg-white focus:outline-none focus:border-amber-500"
                          />
                          {demoCodeHint && (
                            <div className="p-2 rounded-lg bg-amber-50 border border-amber-200 text-[11px] text-amber-800 text-center">
                              Demo Verification Code: <strong>{demoCodeHint}</strong> (or test: <strong>888999</strong>)
                            </div>
                          )}
                          <button
                            type="submit"
                            disabled={isVerifyingCode}
                            className="w-full py-2.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                          >
                            {isVerifyingCode ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : <KeyRound className="w-3.5 h-3.5" />}
                            <span>Verify Code</span>
                          </button>
                        </form>
                      )}

                      {verifyError && (
                        <p className="text-[11px] text-rose-600 font-medium">{verifyError}</p>
                      )}
                    </div>
                  ) : (
                    <p className="text-xs text-emerald-800 font-medium">
                      Email confirmed as <strong>{email}</strong>. Proceed to Step 2 to sign the NDA.
                    </p>
                  )}
                </div>

                {/* STEP 2: DIGITAL MUTUAL NDA */}
                <div className={`p-6 rounded-2xl border transition-all flex flex-col justify-between ${
                  !isEmailVerified 
                    ? 'bg-slate-50/50 border-slate-200 opacity-60' 
                    : 'bg-slate-50 border-slate-200'
                }`}>
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
                        <span className="w-5 h-5 rounded-full bg-slate-900 text-white flex items-center justify-center text-[10px]">2</span>
                        Step 2: Sign Mutual NDA
                      </span>
                      <span className="text-[11px] text-slate-500">15 U.S.C. § 7001</span>
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed mb-4">
                      Digital bilateral non-disclosure agreement protecting B2B bedbank integrations, Google Cloud manual, and financial projections.
                    </p>
                  </div>

                  <button
                    onClick={() => setShowNdaModal(true)}
                    disabled={!isEmailVerified}
                    className={`w-full py-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer shadow-xs ${
                      isEmailVerified 
                        ? 'bg-slate-900 hover:bg-slate-800 text-white' 
                        : 'bg-slate-200 text-slate-400 cursor-not-allowed'
                    }`}
                  >
                    <FileText className="w-3.5 h-3.5 text-amber-400" />
                    <span>Review & Execute Digital Signature</span>
                  </button>
                </div>
              </div>
            </section>
          )}

          {/* 3. CONFIDENTIAL DATA ROOM & PDF DOWNLOADS */}
          <section id="documents" className="bg-white rounded-3xl p-8 sm:p-10 border border-slate-200/80 shadow-xs space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
              <div>
                <div className="text-xs font-bold text-amber-600 uppercase tracking-wider">Due Diligence Repository</div>
                <h2 className="text-2xl font-black text-slate-900">Confidential Investor Data Room</h2>
                <p className="text-xs text-slate-500 mt-0.5">Official offering documentation, 5-year financials, and engineering guides.</p>
              </div>

              {signedData ? (
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  <span>Downloads Unlocked</span>
                </div>
              ) : (
                <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-50 border border-amber-200 text-amber-800 text-xs font-semibold">
                  <Lock className="w-3.5 h-3.5 text-amber-600" />
                  <span>NDA Signature Required</span>
                </div>
              )}
            </div>

            {/* DOCUMENT CARDS GRID */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
              {documents.map((doc) => (
                <div 
                  key={doc.id}
                  className="p-5 rounded-2xl border border-slate-200/90 bg-slate-50/50 hover:bg-white hover:border-slate-300 transition-all flex flex-col justify-between space-y-4 group"
                >
                  <div className="space-y-2">
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex items-center gap-2 text-slate-900 font-bold text-sm">
                        <FileText className="w-4 h-4 text-amber-600 shrink-0" />
                        <span>{doc.title}</span>
                      </div>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-white border border-slate-200 text-slate-600 shrink-0">
                        {doc.category}
                      </span>
                    </div>
                    <p className="text-xs text-slate-500 leading-relaxed">{doc.desc}</p>
                  </div>

                  <div className="flex items-center justify-between pt-2 border-t border-slate-200/60">
                    <button
                      onClick={() => setPreviewDoc({
                        title: doc.title,
                        file: doc.file,
                        highlights: doc.highlights,
                        category: doc.category
                      })}
                      className="text-xs font-semibold text-slate-700 hover:text-slate-950 flex items-center gap-1 cursor-pointer"
                    >
                      <Eye className="w-3.5 h-3.5 text-slate-400" />
                      <span>Highlights</span>
                    </button>

                    {signedData ? (
                      <a
                        href={doc.file}
                        download
                        className="px-3.5 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold transition-all shadow-xs flex items-center gap-1.5 cursor-pointer"
                      >
                        <Download className="w-3.5 h-3.5 text-amber-400" />
                        <span>Download PDF</span>
                      </a>
                    ) : (
                      <button
                        onClick={() => {
                          if (!isEmailVerified) {
                            alert('Please verify your email in Step 1 first.');
                          } else {
                            setShowNdaModal(true);
                          }
                        }}
                        className="px-3.5 py-1.5 rounded-lg bg-slate-200 text-slate-500 text-xs font-medium flex items-center gap-1.5 cursor-pointer hover:bg-slate-300 transition-colors"
                      >
                        <Lock className="w-3 h-3" />
                        <span>Locked</span>
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* EXECUTED SIGNATURE CERTIFICATE (IF SIGNED) */}
            {signedData && (
              <div className="mt-6 p-5 rounded-2xl bg-emerald-50/70 border border-emerald-200/80 text-xs text-emerald-900 space-y-2">
                <div className="flex items-center justify-between">
                  <div className="font-bold flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-emerald-600" />
                    <span>Official E-SIGN Execution Certificate (15 U.S.C. § 7001)</span>
                  </div>
                  <span className="text-[11px] text-emerald-700 font-mono">{new Date(signedData.signedAt).toLocaleDateString()}</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-[11px] pt-1">
                  <div>Signatory: <strong>{signedData.fullName}</strong></div>
                  <div>Email: <strong>{signedData.email}</strong></div>
                  <div>Entity: <strong>{signedData.firmName || 'Individual Angel'}</strong></div>
                </div>
                <div className="flex items-center justify-between text-[10px] font-mono text-emerald-700 pt-1 border-t border-emerald-200/60">
                  <span className="truncate">Hash: {signedData.signatureHash}</span>
                  <button 
                    onClick={copySignatureHash}
                    className="ml-2 underline hover:text-emerald-900 cursor-pointer shrink-0"
                  >
                    {copiedHash ? 'Copied!' : 'Copy Hash'}
                  </button>
                </div>
              </div>
            )}
          </section>

          {/* 4. THE ARBITRAGE & COSTCO TRAVEL MODEL */}
          <section id="thesis" className="bg-white rounded-3xl p-8 sm:p-10 border border-slate-200/80 shadow-xs space-y-6">
            <div className="text-xs font-bold text-amber-600 uppercase tracking-wider">The Market Opportunity</div>
            <h2 className="text-2xl font-black text-slate-900">Why ATLAS Captures the $350B OTA Arbitrage</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-slate-600 leading-relaxed">
              <div className="space-y-3 p-5 rounded-2xl bg-slate-50 border border-slate-200/80">
                <h3 className="font-bold text-slate-900 text-sm">The Broken Public Duopoly</h3>
                <p>
                  Booking Holdings and Expedia Group extract 15% to 30% markups on every hotel reservation. 
                  Hotels are bound by strict <strong>Rate Parity agreements</strong> that legally prohibit them from offering discounts on open, indexable internet channels.
                </p>
                <p>
                  High-spend leisure families and SMB business travelers waste thousands every year because they lack corporate buying desks.
                </p>
              </div>

              <div className="space-y-3 p-5 rounded-2xl bg-amber-50/60 border border-amber-200/80 text-amber-950">
                <h3 className="font-bold text-amber-900 text-sm">The Closed-Loop Legal Exemption</h3>
                <p>
                  Under US Sherman Antitrust (15 U.S.C. § 1) and European competition law (French Loi Macron / EC AT.40153), 
                  <strong> Rate Parity restrictions do NOT apply to closed-loop, password-protected membership clubs</strong>.
                </p>
                <p>
                  ATLAS procures institutional bedbank inventory directly from Hotelbeds, RateHawk, and WebBeds at wholesale net cost, passing 
                  <strong> 100% of the discount to verified subscribers at 0% markup</strong>.
                </p>
              </div>
            </div>
          </section>

          {/* 5. UNIT ECONOMICS & 3-YEAR PROJECTIONS */}
          <section id="economics" className="bg-white rounded-3xl p-8 sm:p-10 border border-slate-200/80 shadow-xs space-y-6">
            <div className="text-xs font-bold text-amber-600 uppercase tracking-wider">Unit Economics</div>
            <h2 className="text-2xl font-black text-slate-900">Predictable Recurring SaaS + Fintech Interchange</h2>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
                <div className="text-xs text-slate-500 font-semibold">Blended Annual Fee</div>
                <div className="text-2xl font-black text-slate-900 mt-1">$684 / yr</div>
                <div className="text-[11px] text-slate-500 mt-1">Club ($349), Family ($699), VIP ($1,499)</div>
              </div>

              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200">
                <div className="text-xs text-slate-500 font-semibold">Fintech Interchange</div>
                <div className="text-2xl font-black text-slate-900 mt-1">$166 / yr</div>
                <div className="text-[11px] text-slate-500 mt-1">1.2% net yield on $13,850 card spend</div>
              </div>

              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200">
                <div className="text-xs text-slate-500 font-semibold">Customer Payback</div>
                <div className="text-2xl font-black text-emerald-700 mt-1">1.6 Months</div>
                <div className="text-[11px] text-emerald-700 mt-1">$115 Blended CAC • 38.6x LTV:CAC</div>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-slate-900 text-white text-xs flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <span className="font-bold text-amber-400">5-Year Growth Target: </span>
                <span className="text-slate-300">1,000 paid members ($850k ARR) in Year 1 reaching 25,000 members ($21.2M ARR) by Year 3.</span>
              </div>
              <span className="text-slate-400 text-[11px] shrink-0">Model documented in Prospectus PPM</span>
            </div>
          </section>

          {/* 6. USE OF PROCEEDS ($75,000 PRE-SEED BUDGET) */}
          <section id="budget" className="bg-white rounded-3xl p-8 sm:p-10 border border-slate-200/80 shadow-xs space-y-6">
            <div className="text-xs font-bold text-amber-600 uppercase tracking-wider">Capital Plan</div>
            <h2 className="text-2xl font-black text-slate-900">$75,000 Capital Allocation (Over 57% in Execution)</h2>

            <p className="text-xs text-slate-600 leading-relaxed">
              Unlike legacy travel agencies that tie up $50k–$100k in non-productive bank guarantees and hotel room blocks, 
              ATLAS operates on modern, asset-light APIs (RateHawk B2B, Duffel NDC, Stripe Issuing) settling bookings synchronously with 
              <strong> $0 in locked supplier deposits</strong>. Over 57% of proceeds go directly to founder execution and dev contractor sprints.
            </p>

            <div className="divide-y divide-slate-100 text-xs">
              {[
                { name: 'Founder Executive Stipend', amt: '$25,000', pct: '33.3%', note: '$2,500/mo over 10 months for full-time leadership.' },
                { name: 'Contract Engineering & Tech Ops', amt: '$18,000', pct: '24.0%', note: '6 milestone dev sprints for live bedbank & flight APIs.' },
                { name: 'Member Acquisition & GTM', amt: '$16,500', pct: '22.0%', note: 'Targeted executive outreach, "Savings Audit" ads, creator seeds.' },
                { name: 'Legal, SoT Licensing & Entity', amt: '$6,500', pct: '8.7%', note: 'Delaware/Wyoming LLC formalization and Seller of Travel filings.' },
                { name: 'Google Cloud Platform & Vertex AI', amt: '$3,500', pct: '4.7%', note: '12 mos Cloud Run, Cloud SQL, and Gemini 2.0 API inference.' },
                { name: 'Contingency Operating Buffer', amt: '$3,500', pct: '4.7%', note: 'Emergency cash reserve for 10–12 months runway.' },
                { name: 'Minimal Operating Float', amt: '$2,000', pct: '2.7%', note: 'Working float for card generation ($1,200) and eSIM stock ($800).' },
              ].map((row, idx) => (
                <div key={idx} className="py-2.5 flex items-center justify-between gap-4">
                  <div className="font-semibold text-slate-900">{row.name}</div>
                  <div className="hidden sm:block text-slate-500 text-[11px]">{row.note}</div>
                  <div className="text-right">
                    <span className="font-bold text-slate-900">{row.amt}</span>
                    <span className="text-[11px] text-slate-400 ml-1.5 font-mono">({row.pct})</span>
                  </div>
                </div>
              ))}
              <div className="py-3 flex items-center justify-between font-bold text-sm text-slate-900 bg-slate-50 px-2 rounded-xl mt-2">
                <span>TOTAL PRE-SEED CAPITAL</span>
                <span>$75,000 (100.0%)</span>
              </div>
            </div>
          </section>

          {/* 7. EXIT OPPORTUNITIES & PRECEDENT TRANSACTIONS */}
          <section id="exits" className="bg-white rounded-3xl p-8 sm:p-10 border border-slate-200/80 shadow-xs space-y-6">
            <div className="text-xs font-bold text-amber-600 uppercase tracking-wider">Liquidity Roadmap</div>
            <h2 className="text-2xl font-black text-slate-900">Strategic Exit Opportunities (3 to 6-Year Horizon)</h2>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1.5">
                <div className="font-bold text-slate-900">1. Premium Card Issuers</div>
                <div className="text-[11px] text-amber-700 font-semibold">Amex, Capital One, Chase</div>
                <p className="text-slate-500 text-[11px] leading-relaxed">
                  Precedent: Capital One acquired Velocity Black for $297M (2023); Chase acquired Frosch Travel.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1.5">
                <div className="font-bold text-slate-900">2. Public OTAs</div>
                <div className="text-[11px] text-blue-700 font-semibold">Booking Holdings, Expedia</div>
                <p className="text-slate-500 text-[11px] leading-relaxed">
                  OTAs seek sticky SaaS recurring revenue to eliminate Google Ad bidding dependency.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1.5">
                <div className="font-bold text-slate-900">3. Mobility & Super-Apps</div>
                <div className="text-[11px] text-purple-700 font-semibold">Revolut, Hopper, Uber</div>
                <p className="text-slate-500 text-[11px] leading-relaxed">
                  Millions of cardholders instantly become high-yield travel club members.
                </p>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs space-y-2">
              <div className="font-bold text-slate-900">Return Multiples on $75k SAFE Investment:</div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-[11px]">
                <div>• Base Case M&A (Yr 3): <strong>$74.2M Valuation (~42x return)</strong></div>
                <div>• Growth Case (Yr 4): <strong>$378M Valuation (~215x return)</strong></div>
                <div>• PE Buyout (Yr 5): <strong>$416M Valuation (~237x return)</strong></div>
              </div>
            </div>
          </section>

          {/* 8. DIRECT ALLOCATION INQUIRY CTA */}
          <section id="contact" className="bg-gradient-to-r from-slate-900 via-slate-950 to-slate-900 text-white rounded-3xl p-8 sm:p-10 shadow-lg space-y-4">
            <div className="text-xs font-bold text-amber-400 uppercase tracking-wider">Allocation Reservation</div>
            <h2 className="text-2xl sm:text-3xl font-black">Participate in the $75,000 Pre-Seed Round</h2>
            <p className="text-xs sm:text-sm text-slate-400 max-w-2xl leading-relaxed">
              Allocations are accepted in minimum increments of $10,000 USD via Y Combinator Post-Money SAFE for LLCs. 
              Contact the managing member directly to confirm allocation availability.
            </p>

            <div className="pt-2 flex flex-col sm:flex-row items-center gap-4">
              <a
                href="mailto:executive@atlas-travel-club.com?subject=ATLAS%20SAFE%20Allocation%20Request"
                className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs transition-all shadow-md flex items-center justify-center gap-2"
              >
                <span>Request SAFE Subscription & Wire Instructions</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>

              <Link
                href="/"
                className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs transition-all flex items-center justify-center gap-2 border border-slate-700"
              >
                <span>Back to Member Search Demo</span>
              </Link>
            </div>
          </section>

          {/* 9. STATUTORY LEGAL DISCLAIMERS & REGULATORY FOOTNOTE */}
          <section className="p-6 rounded-2xl bg-white border border-slate-200/80 text-xs text-slate-500 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
              <div className="font-bold text-slate-900 flex items-center gap-2">
                <Scale className="w-4 h-4 text-amber-600" />
                <span>Statutory Securities & Regulatory Disclosures</span>
              </div>
              <span className="text-[11px] font-mono text-slate-400">ATLAS Travel Club LLC • Reg D / Rule 506</span>
            </div>

            <p className="text-[11px] leading-relaxed text-slate-500">
              The materials presented within this Investor Portal do not constitute an offer to sell or a solicitation of an offer to buy securities. 
              Any offering of SAFEs or membership units is made solely pursuant to definitive subscription agreements and is restricted exclusively to 
              verified Accredited Investors pursuant to Rule 501 of Regulation D. Forward-looking statements are subject to risks and uncertainties 
              pursuant to the Private Securities Litigation Reform Act of 1995.
            </p>

            <div className="flex flex-wrap items-center gap-x-6 gap-y-2 pt-2 text-[11px] border-t border-slate-100 font-semibold text-slate-600">
              <Link href="/legal/investor-disclosures" className="hover:text-amber-600 hover:underline">
                Investor Disclosures & Safe Harbor
              </Link>
              <Link href="/legal/electronic-signatures" className="hover:text-amber-600 hover:underline">
                Electronic Signatures (E-SIGN Act)
              </Link>
              <Link href="/legal/rate-parity-compliance" className="hover:text-amber-600 hover:underline">
                Rate Parity Antitrust Memorandum
              </Link>
              <Link href="/legal/seller-of-travel" className="hover:text-amber-600 hover:underline">
                Seller of Travel Disclosures
              </Link>
              <Link href="/legal/travel-disclaimer" className="hover:text-amber-600 hover:underline">
                Supplier & CRS Disclaimer
              </Link>
              <Link href="/legal/eu-norway-compliance" className="hover:text-blue-600 hover:underline font-bold text-blue-800">
                EU & Norwegian Compliance (EØS)
              </Link>
              <Link href="/legal" className="text-amber-600 font-bold hover:underline ml-auto flex items-center gap-1">
                <span>View Full Legal Directory</span>
                <ArrowRight className="w-3 h-3" />
              </Link>
            </div>
          </section>

        </main>
      </div>

      {/* DIGITAL MUTUAL NDA EXECUTION MODAL */}
      {showNdaModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs">
          <div className="bg-white border border-slate-200 rounded-3xl max-w-xl w-full p-6 sm:p-8 space-y-5 shadow-2xl relative max-h-[92vh] overflow-y-auto text-slate-900">
            
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2 text-slate-900 font-black text-base sm:text-lg">
                <ShieldCheck className="w-5 h-5 text-amber-600" />
                Mutual Non-Disclosure Agreement
              </div>
              <button 
                onClick={() => setShowNdaModal(false)}
                className="text-slate-400 hover:text-slate-700 p-1 text-sm cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="text-[11px] text-slate-600 space-y-2 bg-slate-50 p-4 rounded-2xl border border-slate-200 max-h-44 overflow-y-auto leading-relaxed">
              <div className="font-bold text-slate-900">CONFIDENTIALITY & NON-CIRCUMVENTION TERMS:</div>
              <p>
                This Mutual Non-Disclosure Agreement governs the confidential evaluation of <strong>ATLAS Travel Club LLC</strong> (a Manager-Managed LLC organized under Delaware / Wyoming law).
              </p>
              <p>
                Confidential Information includes without limitation: proprietary B2B Bedbank supplier rate feeds (Hotelbeds, RateHawk, WebBeds), 100% Google Cloud architecture specifications, financial projections, 5-year unit economics, and corporate term sheets.
              </p>
              <p>
                The Receiving Party agrees to use Confidential Information solely to evaluate an investment in or strategic relationship with the Company, and shall not disclose or circumvent the Company for twenty-four (24) months.
              </p>
              <div className="text-amber-700 font-semibold pt-1">
                Governing Law: State of Delaware / Wyoming. Digital execution conforms to 15 U.S.C. § 7001 (US E-SIGN Act).
              </div>
            </div>

            <form onSubmit={handleExecuteNda} className="space-y-4 pt-1">
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">Full Legal Name *</label>
                <input 
                  type="text" 
                  required
                  placeholder="e.g. Alexandra Vance" 
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 focus:outline-none focus:border-amber-500 focus:bg-white"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">Verified Email *</label>
                  <input 
                    type="email" 
                    readOnly
                    value={email}
                    className="w-full bg-slate-100 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-600 cursor-not-allowed font-medium"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">Entity / Fund (Optional)</label>
                  <input 
                    type="text" 
                    placeholder="Vance Capital LLC" 
                    value={firmName}
                    onChange={(e) => setFirmName(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 focus:outline-none focus:border-amber-500 focus:bg-white"
                  />
                </div>
              </div>

              {/* Consent Checkbox */}
              <div className="flex items-start gap-2.5 pt-1">
                <input 
                  type="checkbox" 
                  id="eSignConsentBox"
                  required
                  checked={eSignConsent}
                  onChange={(e) => setESignConsent(e.target.checked)}
                  className="mt-0.5 rounded border-slate-300 text-amber-600 focus:ring-amber-500 cursor-pointer"
                />
                <label htmlFor="eSignConsentBox" className="text-[11px] text-slate-600 cursor-pointer leading-tight">
                  I agree to the terms of the Mutual Non-Disclosure Agreement and consent to conducting this transaction electronically pursuant to the US E-SIGN Act (15 U.S.C. § 7001).
                </label>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSigning || !eSignConsent || !fullName}
                  className="w-full py-3.5 rounded-xl bg-slate-900 hover:bg-slate-800 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold text-xs transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md"
                >
                  {isSigning ? (
                    <span className="flex items-center gap-2">
                      <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                      Recording Cryptographic E-Signature...
                    </span>
                  ) : (
                    <>
                      <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                      <span>Execute Digital Signature & Unlock Data Room</span>
                    </>
                  )}
                </button>
              </div>

              <p className="text-[10px] text-center text-slate-400">
                Timestamp, verified email ({email}), and cryptographic hash will be permanently recorded.
              </p>
            </form>
          </div>
        </div>
      )}

      {/* DOCUMENT PREVIEW HIGHLIGHTS MODAL */}
      {previewDoc && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs">
          <div className="bg-white border border-slate-200 rounded-3xl max-w-xl w-full p-6 sm:p-8 space-y-5 shadow-2xl relative text-slate-900">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2 font-bold text-base text-slate-900">
                <FileText className="w-4 h-4 text-amber-600" />
                <span>{previewDoc.title}</span>
              </div>
              <button 
                onClick={() => setPreviewDoc(null)}
                className="text-slate-400 hover:text-slate-700 p-1 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-3">
              <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                Document Key Highlights:
              </div>
              <ul className="space-y-2">
                {previewDoc.highlights.map((item, idx) => (
                  <li key={idx} className="text-xs text-slate-700 flex items-start gap-2 bg-slate-50 p-3 rounded-xl border border-slate-200/80 leading-relaxed">
                    <span className="text-emerald-600 font-bold">✓</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="pt-2 flex items-center justify-end gap-3 border-t border-slate-100">
              <button 
                onClick={() => setPreviewDoc(null)}
                className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-100 cursor-pointer"
              >
                Close
              </button>
              {signedData ? (
                <a 
                  href={previewDoc.file}
                  download
                  className="px-5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold flex items-center gap-1.5 shadow-xs"
                >
                  <Download className="w-3.5 h-3.5 text-amber-400" />
                  <span>Download Full PDF</span>
                </a>
              ) : (
                <button
                  onClick={() => {
                    setPreviewDoc(null);
                    setShowNdaModal(true);
                  }}
                  className="px-5 py-2 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 text-xs font-bold flex items-center gap-1.5"
                >
                  <Lock className="w-3.5 h-3.5" />
                  <span>Sign NDA to Download</span>
                </button>
              )}
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
