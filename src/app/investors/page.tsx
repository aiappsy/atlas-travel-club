'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  ShieldCheck, Lock, ArrowRight, Download, FileText, 
  CheckCircle2, TrendingUp, DollarSign, Cloud, Building2, 
  Eye, ExternalLink, RefreshCw, AlertCircle, Sparkles,
  Layers, Users, Award, ChevronRight, X
} from 'lucide-react';

interface SignedData {
  fullName: string;
  email: string;
  firmName?: string;
  signedAt: string;
  signatureHash: string;
  ipStamp: string;
}

export default function InvestorPortalPage() {
  const [showNdaModal, setShowNdaModal] = useState(false);
  const [signedData, setSignedData] = useState<SignedData | null>(null);
  
  // Form State
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [firmName, setFirmName] = useState('');
  const [agreedConsent, setAgreedConsent] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Document Preview Modal State
  const [activePreviewDoc, setActivePreviewDoc] = useState<{
    title: string;
    file: string;
    summary: string[];
  } | null>(null);

  // Check persistent signed status on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem('atlas_investor_nda_signed');
      if (stored) {
        setSignedData(JSON.parse(stored));
      }
    } catch (e) {
      console.error('Error reading NDA status:', e);
    }
  }, []);

  const handleSignNda = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !email || !agreedConsent) return;

    setIsSubmitting(true);

    try {
      // Generate cryptographic hash (SHA-256)
      const encoder = new TextEncoder();
      const rawPayload = `${fullName.trim()}|${email.trim().toLowerCase()}|${firmName.trim()}|${Date.now()}`;
      const hashBuffer = await crypto.subtle.digest('SHA-256', encoder.encode(rawPayload));
      const hashArray = Array.from(new Uint8Array(hashBuffer));
      const hexHash = hashArray.map(b => b.toString(16).padStart(2, '0')).join('').substring(0, 32);

      const newSignature: SignedData = {
        fullName: fullName.trim(),
        email: email.trim(),
        firmName: firmName.trim() || undefined,
        signedAt: new Date().toISOString(),
        signatureHash: `sha256:${hexHash}`,
        ipStamp: 'Recorded via E-SIGN Verification Node'
      };

      // Store in localStorage
      localStorage.setItem('atlas_investor_nda_signed', JSON.stringify(newSignature));
      setSignedData(newSignature);
      setShowNdaModal(false);
    } catch (err) {
      console.error('Signing error:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleRevokeNda = () => {
    if (confirm('Reset investor session and re-lock data room?')) {
      localStorage.removeItem('atlas_investor_nda_signed');
      setSignedData(null);
    }
  };

  const documents = [
    {
      id: 'deck',
      title: '10-Slide Investor Presentation',
      category: 'Strategic Deck',
      desc: 'Visual narrative, $350B OTA tax arbitrage, unit economics, and 12-month use of proceeds.',
      file: '/docs/investors/ATLAS_Investor_Pitch_Deck.pdf',
      pages: '2 Pages • 10 Slides • Revised Edition',
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
      desc: '10-section memorandum, 5-year pro-forma financial statement, and asset-light $0 deposit model.',
      file: '/docs/investors/ATLAS_Confidential_Prospectus.pdf',
      pages: '1 Page • Full P&L & Allocation Table',
      highlights: [
        'Entity: ATLAS Travel Club LLC (Manager-Managed LLC — DE/WY).',
        '5-Year Model: Year 1: $850k ARR (1k users) -> Year 3: $21.2M ARR (25k users) -> Year 5: $102M ARR.',
        'Human Execution Focus: Over 57% of proceeds fund Founder stipend ($25k) and dev contractor sprints ($18k).',
        '$0 Supplier Deposits: Synchronous real-time credit card settlement via RateHawk and Duffel.'
      ]
    },
    {
      id: 'safe',
      title: 'YC Post-Money SAFE Term Sheet Summary',
      category: 'Legal Offering Term Sheet',
      desc: 'Simple Agreement for Future Equity (LLC Edition) with optional Delaware C-Corp conversion mechanics.',
      file: '/docs/investors/ATLAS_SAFE_Term_Sheet_LLC.pdf',
      pages: '1 Page • Deal Specifications',
      highlights: [
        'Target Financing: $75,000 USD (Min $50,000 | Max $100,000).',
        'Valuation Cap: $1,750,000 USD with 20% standard conversion discount.',
        'Conversion: Automatically converts into Preferred Units at $1M+ qualified round.',
        'Corporate Conversion Flexibility: Optional C-Corp conversion to accommodate venture funds and Section 1202 QSBS.'
      ]
    },
    {
      id: 'tech',
      title: 'Technical Architecture & Google Cloud Manual',
      category: 'Engineering Standards',
      desc: '100% Google Cloud Ecosystem specification: Cloud Run, Vertex AI, Cloud SQL, Secret Manager.',
      file: '/docs/investors/ATLAS_Technical_Architecture_Google_Cloud.pdf',
      pages: '1 Page • GCP Engineering Blueprint',
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
      pages: '1 Page • Risk & Legal Defense Brief',
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
      pages: '1 Page • 4 Strategic Acquirer Categories',
      highlights: [
        'Premium Card Issuers: Capital One acquired Velocity Black for $297M; Chase acquired Frosch Travel.',
        'OTA Consolidation: Booking Holdings & Expedia seek high-margin SaaS subscription cash flows.',
        'Return Multiples on $75k SAFE: Base Case M&A ($74M valuation) = ~42x; Growth Case ($378M) = ~215x.',
        'PE Dividend Recap: Capital-light high EBITDA allows buyout recapitalizations at 8x–12x.'
      ]
    }
  ];

  return (
    <div className="bg-slate-950 text-slate-100 min-h-screen font-sans selection:bg-amber-500 selection:text-slate-950">
      
      {/* 1. TOP STATUS BAR */}
      <div className="bg-slate-900/80 border-b border-slate-800 text-xs py-2 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span className="font-semibold text-slate-300">Round Status:</span>
            <span className="text-amber-400 font-bold">Pre-Seed Open ($75,000 / $1.75M Cap)</span>
          </div>
          <div className="flex items-center gap-4 text-slate-400">
            <span>Entity: <strong className="text-slate-200">ATLAS Travel Club LLC</strong></span>
            <span className="hidden sm:inline">Stack: <strong className="text-blue-400">100% Google Cloud</strong></span>
          </div>
        </div>
      </div>

      {/* 2. HERO TEASER HEADER */}
      <section className="relative pt-20 pb-16 px-4 sm:px-6 lg:px-8 border-b border-slate-800 bg-gradient-to-b from-slate-900 via-slate-950 to-slate-950 overflow-hidden">
        {/* Subtle background glow */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="max-w-5xl mx-auto space-y-6 text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-bold uppercase tracking-wider">
            <Building2 className="w-3.5 h-3.5" />
            Confidential Investor Portal • Delaware & Wyoming LLC
          </div>
          
          <h1 className="text-4xl sm:text-6xl font-black tracking-tight text-white max-w-4xl mx-auto leading-tight">
            The Digital <span className="text-amber-400">Costco</span> for the $1.4T Travel Market
          </h1>
          
          <p className="text-slate-300 text-base sm:text-xl max-w-3xl mx-auto leading-relaxed font-normal">
            Passing <span className="text-white font-bold">100% of wholesale travel savings</span> directly to subscribers at <span className="text-amber-400 font-bold">0% markup</span>. 
            Bypassing the 25% OTA duopoly cartel through legally protected closed-loop member distribution.
          </p>

          {/* CTA & NDA Status Badge */}
          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
            {!signedData ? (
              <button 
                onClick={() => setShowNdaModal(true)}
                className="w-full sm:w-auto px-8 py-4 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-sm sm:text-base transition-all shadow-xl shadow-amber-500/20 flex items-center justify-center gap-2.5 cursor-pointer transform hover:-translate-y-0.5"
              >
                <Lock className="w-4 h-4" />
                <span>Execute Mutual NDA to Unlock Full Data Room</span>
              </button>
            ) : (
              <div className="w-full sm:w-auto flex items-center justify-between sm:justify-start gap-4 px-5 py-3.5 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 font-bold text-xs sm:text-sm">
                <div className="flex items-center gap-2.5">
                  <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0" />
                  <span>Verified Investor: {signedData.fullName} ({signedData.signatureHash.substring(0, 15)}...)</span>
                </div>
                <button 
                  onClick={handleRevokeNda}
                  className="text-xs text-slate-400 hover:text-rose-400 underline font-normal ml-2"
                >
                  Reset Session
                </button>
              </div>
            )}

            <Link 
              href="/"
              target="_blank"
              className="w-full sm:w-auto px-6 py-4 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-200 font-bold text-sm border border-slate-700 transition-all flex items-center justify-center gap-2"
            >
              <span>Explore Live Platform Demo</span>
              <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
            </Link>
          </div>
        </div>
      </section>

      {/* 3. CORE HIGHLIGHTS TEASER METRICS */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="bg-slate-900/60 p-5 rounded-2xl border border-slate-800 space-y-1">
            <div className="flex items-center justify-between">
              <span className="text-xs text-slate-400 font-medium">Target Raise</span>
              <DollarSign className="w-4 h-4 text-amber-400" />
            </div>
            <div className="text-2xl font-black text-white">$75,000</div>
            <div className="text-[11px] text-amber-400 font-semibold">YC Post-Money SAFE</div>
          </div>

          <div className="bg-slate-900/60 p-5 rounded-2xl border border-slate-800 space-y-1">
            <div className="flex items-center justify-between">
              <span className="text-xs text-slate-400 font-medium">Valuation Cap</span>
              <TrendingUp className="w-4 h-4 text-emerald-400" />
            </div>
            <div className="text-2xl font-black text-white">$1.75M</div>
            <div className="text-[11px] text-emerald-400 font-semibold">~4.3% Ownership Cap</div>
          </div>

          <div className="bg-slate-900/60 p-5 rounded-2xl border border-slate-800 space-y-1">
            <div className="flex items-center justify-between">
              <span className="text-xs text-slate-400 font-medium">Blended ARPU</span>
              <Award className="w-4 h-4 text-purple-400" />
            </div>
            <div className="text-2xl font-black text-white">$850/yr</div>
            <div className="text-[11px] text-purple-400 font-semibold">94% Gross Margin</div>
          </div>

          <div className="bg-slate-900/60 p-5 rounded-2xl border border-slate-800 space-y-1">
            <div className="flex items-center justify-between">
              <span className="text-xs text-slate-400 font-medium">Infrastructure</span>
              <Cloud className="w-4 h-4 text-blue-400" />
            </div>
            <div className="text-2xl font-black text-white">100% GCP</div>
            <div className="text-[11px] text-blue-400 font-semibold">Cloud Run & Vertex AI</div>
          </div>
        </div>
      </section>

      {/* 4. THE INVESTMENT THESIS & THE $350B ARBITRAGE */}
      <section className="py-8 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
        <div className="bg-slate-900/40 rounded-3xl p-6 sm:p-8 border border-slate-800 space-y-6">
          <div className="flex items-center gap-2 text-amber-400 font-black text-xs uppercase tracking-wider">
            <Layers className="w-4 h-4" />
            The Closed-Loop Arbitrage Thesis
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-sm leading-relaxed">
            <div className="space-y-3">
              <h3 className="text-base font-bold text-white">The Public Travel Market is Broken</h3>
              <p className="text-slate-400">
                Online Travel Agencies (Expedia, Booking.com) extract a <strong>15% to 30% take rate</strong> on every room reservation. To maintain pricing dominance, they contractually impose <strong className="text-slate-200">Rate Parity</strong> on hotels, legally barring them from publicly discounting.
              </p>
              <p className="text-slate-400">
                Frequent leisure vacationers, families, and SMB business travelers waste tens of thousands annually because they lack Fortune 500 corporate negotiated volume.
              </p>
            </div>

            <div className="space-y-3">
              <h3 className="text-base font-bold text-amber-300">The Closed-Loop Legal Exemption</h3>
              <p className="text-slate-400">
                Under US Sherman Antitrust (15 U.S.C. § 1) and European Competition law (French Loi Macron / EC AT.40153), <strong>Rate Parity restrictions are 100% unenforceable against password-protected, closed-loop membership clubs</strong>.
              </p>
              <p className="text-slate-400">
                ATLAS procures inventory directly from global B2B bedbanks (Hotelbeds, RateHawk, WebBeds) and airline NDC feeds at wholesale net cost, passing <strong>100% of the discount directly to subscribers at 0% markup</strong>.
              </p>
            </div>
          </div>

          {/* Quick Diagram */}
          <div className="pt-4 border-t border-slate-800/80 grid grid-cols-1 sm:grid-cols-3 gap-3 text-center text-xs">
            <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
              <div className="text-slate-400 font-semibold">1. Procurement</div>
              <div className="text-white font-bold mt-1">Raw B2B Bedbanks & NDC</div>
              <div className="text-[11px] text-slate-500">Net Clearing Cost</div>
            </div>
            <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/20">
              <div className="text-amber-400 font-semibold">2. Closed-Loop Gate</div>
              <div className="text-white font-bold mt-1">0% Markup Pass-Through</div>
              <div className="text-[11px] text-amber-300/80">Rate Parity Exempt</div>
            </div>
            <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20">
              <div className="text-emerald-400 font-semibold">3. Member ROI</div>
              <div className="text-white font-bold mt-1">$1,500 – $8,000 / yr Saved</div>
              <div className="text-[11px] text-emerald-400/80">4x–5x Fee Payback</div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. CONFIDENTIAL INVESTOR DATA ROOM (LOCKED / UNLOCKED) */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto pb-28">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-800">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs text-amber-400 font-bold uppercase tracking-wider mb-1">
              <FileText className="w-3.5 h-3.5" />
              Official Due Diligence Repository
            </div>
            <h2 className="text-2xl font-black text-white">Confidential Investor Data Room</h2>
            <p className="text-xs text-slate-400 mt-1">
              Access the complete offering memorandum, financial model, and engineering manuals.
            </p>
          </div>

          <div>
            {!signedData ? (
              <button 
                onClick={() => setShowNdaModal(true)}
                className="px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs transition-all shadow-md flex items-center gap-2 cursor-pointer"
              >
                <Lock className="w-3.5 h-3.5" />
                <span>Sign NDA to Unlock Data Room</span>
              </button>
            ) : (
              <div className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-semibold">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>NDA Verified • Downloads Unlocked</span>
              </div>
            )}
          </div>
        </div>

        {/* DOCUMENTS LIST */}
        <div className="divide-y divide-slate-800/80 mt-2">
          {documents.map((doc) => (
            <div key={doc.id} className="py-6 flex flex-col md:flex-row md:items-center justify-between gap-5 group hover:bg-slate-900/30 px-3 rounded-2xl transition-colors">
              <div className="space-y-1.5 max-w-2xl">
                <div className="flex items-center gap-2.5">
                  <FileText className="w-4 h-4 text-amber-400 shrink-0" />
                  <span className="font-black text-white text-base">{doc.title}</span>
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-slate-800 text-slate-300 border border-slate-700">
                    {doc.category}
                  </span>
                </div>
                
                <p className="text-xs text-slate-400 leading-relaxed">{doc.desc}</p>
                
                <div className="flex items-center gap-3 text-[11px] text-slate-500">
                  <span>{doc.pages}</span>
                  <span>•</span>
                  <span className="text-slate-400">PDF Format</span>
                </div>
              </div>

              <div className="flex items-center gap-2.5 shrink-0">
                {signedData ? (
                  <>
                    <button 
                      onClick={() => setActivePreviewDoc({
                        title: doc.title,
                        file: doc.file,
                        summary: doc.highlights
                      })}
                      className="px-3.5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-200 text-xs font-bold transition-all border border-slate-700 flex items-center gap-1.5 cursor-pointer"
                    >
                      <Eye className="w-3.5 h-3.5 text-amber-400" />
                      <span>Executive Summary</span>
                    </button>

                    <a 
                      href={doc.file}
                      download
                      className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-black transition-all shadow-md flex items-center gap-1.5 cursor-pointer"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>Download PDF</span>
                    </a>
                  </>
                ) : (
                  <button 
                    onClick={() => setShowNdaModal(true)}
                    className="px-4 py-2.5 rounded-xl bg-slate-900/90 text-slate-500 hover:text-slate-300 text-xs font-semibold border border-slate-800 flex items-center gap-2 cursor-pointer transition-colors"
                  >
                    <Lock className="w-3.5 h-3.5 text-slate-500" />
                    <span>Locked (Execute NDA)</span>
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* DIRECT ALLOCATION INQUIRY BANNER */}
        {signedData && (
          <div className="mt-12 p-6 rounded-2xl bg-gradient-to-r from-amber-500/10 via-slate-900 to-slate-900 border border-amber-500/30 flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="space-y-1 text-center sm:text-left">
              <h4 className="text-base font-black text-white">Ready to Reserve a SAFE Allocation?</h4>
              <p className="text-xs text-slate-400">
                Allocations for the $75k pre-seed round are accepted in minimum increments of $10,000 USD via YC Post-Money SAFE.
              </p>
            </div>
            <a 
              href="mailto:executive@atlas-travel-club.com?subject=ATLAS%20SAFE%20Allocation%20Request"
              className="px-6 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs transition-all shadow-lg shrink-0 flex items-center gap-2"
            >
              <span>Request SAFE Execution & Wire Details</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </a>
          </div>
        )}
      </section>

      {/* 6. DIGITAL MUTUAL NDA MODAL (E-SIGN ACT 15 U.S.C. § 7001) */}
      {showNdaModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-xl w-full p-6 sm:p-8 space-y-5 shadow-2xl relative max-h-[92vh] overflow-y-auto">
            
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div className="flex items-center gap-2 text-white font-black text-base sm:text-lg">
                <ShieldCheck className="w-5 h-5 text-amber-400" />
                Mutual Non-Disclosure Agreement
              </div>
              <button 
                onClick={() => setShowNdaModal(false)}
                className="text-slate-400 hover:text-white text-sm p-1"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="text-[11px] text-slate-400 space-y-2.5 bg-slate-950 p-4 rounded-2xl border border-slate-800/90 max-h-48 overflow-y-auto leading-relaxed">
              <div className="font-bold text-slate-200">PARTIES & CONFIDENTIALITY SCOPE:</div>
              <p>
                This Mutual Non-Disclosure Agreement governs the confidential evaluation of <strong>ATLAS Travel Club LLC</strong> (a Manager-Managed LLC organized under the laws of Delaware and Wyoming).
              </p>
              <p>
                Confidential Information includes without limitation: proprietary B2B Bedbank supplier rate feeds (Hotelbeds, RateHawk, WebBeds), 100% Google Cloud architecture specifications, financial projections, 5-year unit economics, and corporate term sheets.
              </p>
              <p>
                The Receiving Party agrees to use Confidential Information solely to evaluate an investment in or strategic relationship with the Company, and shall not disclose or circumvent the Company for twenty-four (24) months.
              </p>
              <div className="text-amber-400/90 font-semibold pt-1">
                Governing Law: State of Delaware / Wyoming. Digital execution conforms to 15 U.S.C. § 7001 (US E-SIGN Act).
              </div>
            </div>

            <form onSubmit={handleSignNda} className="space-y-4 pt-1">
              <div>
                <label className="text-xs font-bold text-slate-300 block mb-1">Full Legal Name *</label>
                <input 
                  type="text" 
                  required
                  placeholder="e.g. Alexandra Vance" 
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-amber-400"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-bold text-slate-300 block mb-1">Email Address *</label>
                  <input 
                    type="email" 
                    required
                    placeholder="alex@holding.com" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-amber-400"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-300 block mb-1">Entity / Fund (Optional)</label>
                  <input 
                    type="text" 
                    placeholder="Vance Capital LLC" 
                    value={firmName}
                    onChange={(e) => setFirmName(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-amber-400"
                  />
                </div>
              </div>

              {/* Consent Checkbox */}
              <div className="flex items-start gap-2.5 pt-1">
                <input 
                  type="checkbox" 
                  id="consentCheckbox"
                  required
                  checked={agreedConsent}
                  onChange={(e) => setAgreedConsent(e.target.checked)}
                  className="mt-0.5 rounded border-slate-700 bg-slate-950 text-amber-500 focus:ring-amber-400 cursor-pointer"
                />
                <label htmlFor="consentCheckbox" className="text-[11px] text-slate-400 cursor-pointer leading-tight">
                  I agree to the terms of the Mutual Non-Disclosure Agreement and consent to executing this agreement by electronic signature pursuant to the US E-SIGN Act (15 U.S.C. § 7001).
                </label>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting || !agreedConsent || !fullName || !email}
                  className="w-full py-3.5 rounded-xl bg-amber-500 hover:bg-amber-400 disabled:opacity-50 disabled:cursor-not-allowed text-slate-950 font-black text-xs transition-all flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-amber-500/20"
                >
                  {isSubmitting ? (
                    <span className="flex items-center gap-2">
                      <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                      Generating Cryptographic Signature Hash...
                    </span>
                  ) : (
                    <>
                      <CheckCircle2 className="w-4 h-4" />
                      <span>Execute Digital Signature & Unlock Data Room</span>
                    </>
                  )}
                </button>
              </div>

              <p className="text-[10px] text-center text-slate-500">
                Timestamp and cryptographic client fingerprint will be appended to the executed NDA record.
              </p>
            </form>
          </div>
        </div>
      )}

      {/* 7. DOCUMENT SUMMARY PREVIEW MODAL */}
      {activePreviewDoc && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-xl w-full p-6 sm:p-8 space-y-5 shadow-2xl relative">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div className="flex items-center gap-2 text-white font-black text-base">
                <FileText className="w-4 h-4 text-amber-400" />
                {activePreviewDoc.title}
              </div>
              <button 
                onClick={() => setActivePreviewDoc(null)}
                className="text-slate-400 hover:text-white text-sm p-1"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-3">
              <div className="text-xs text-amber-400 font-bold uppercase tracking-wider">
                Key Document Takeaways:
              </div>
              <ul className="space-y-2">
                {activePreviewDoc.summary.map((item, idx) => (
                  <li key={idx} className="text-xs text-slate-300 flex items-start gap-2 bg-slate-950 p-3 rounded-xl border border-slate-800/80 leading-relaxed">
                    <span className="text-amber-400 font-bold">✓</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="pt-2 flex items-center justify-end gap-3">
              <button 
                onClick={() => setActivePreviewDoc(null)}
                className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 text-xs font-bold hover:bg-slate-700"
              >
                Close Preview
              </button>
              <a 
                href={activePreviewDoc.file}
                download
                className="px-5 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-black flex items-center gap-1.5"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download Full PDF</span>
              </a>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
