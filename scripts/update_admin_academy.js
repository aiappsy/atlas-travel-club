const fs = require('fs');
const path = require('path');

const adminPath = path.join(__dirname, '../src/app/admin/page.tsx');
let code = fs.readFileSync(adminPath, 'utf8');

// 1. Ensure icons GraduationCap, CheckSquare, Copy, Check are imported
if (!code.includes('GraduationCap')) {
  code = code.replace("Building2\n} from 'lucide-react';", "Building2,\n  GraduationCap,\n  CheckSquare,\n  Copy,\n  Check\n} from 'lucide-react';");
}

// 2. Import ATLAS_TRAINING_MANUALS
if (!code.includes('ATLAS_TRAINING_MANUALS')) {
  code = code.replace("import { PROVIDER_INSTRUCTION_GUIDES,", "import { ATLAS_TRAINING_MANUALS } from '@/lib/manualsData';\nimport { PROVIDER_INSTRUCTION_GUIDES,");
}

// 3. Add 'academy_manuals' to activeTab type union
if (!code.includes("'academy_manuals' |")) {
  code = code.replace("'switchboard' |", "'academy_manuals' | 'switchboard' |");
}

// 4. Add Academy State Variables right after activeGuide
const academyStateCode = `
  // Academy & Operations Training Manuals State
  const [selectedManualId, setSelectedManualId] = useState<string>('network-integrations-manual');
  const activeManual = ATLAS_TRAINING_MANUALS.find((m) => m.id === selectedManualId) || ATLAS_TRAINING_MANUALS[0];
  const [selectedChapterId, setSelectedChapterId] = useState<string>(activeManual.chapters[0]?.id || '');
  const activeChapter = activeManual.chapters.find((c) => c.id === selectedChapterId) || activeManual.chapters[0];
  
  const [checkedChecklist, setCheckedChecklist] = useState<Record<string, boolean>>({});
  const [academyQuery, setAcademyQuery] = useState('');
  const [academyLoading, setAcademyLoading] = useState(false);
  const [copiedChapterId, setCopiedChapterId] = useState<string | null>(null);
  const [academyMessages, setAcademyMessages] = useState<Array<{ sender: 'user' | 'tutor'; text: string; time: string }>>([
    {
      sender: 'tutor',
      text: '🎓 **Welcome to the ATLAS Operations Academy!**\\n\\nI am your bespoke AI Mentor. Choose any operational role above to study the master training handbook or ask me questions about API credentials, Next.js architecture, morning 08:00 UTC health checks, or high-converting ad scripts.',
      time: 'Just now'
    }
  ]);

  const handleAskTutor = async (promptText?: string) => {
    const textToSend = promptText || academyQuery;
    if (!textToSend.trim() || academyLoading) return;

    const userMsg = { sender: 'user' as const, text: textToSend, time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) };
    setAcademyMessages((prev) => [...prev, userMsg]);
    setAcademyQuery('');
    setAcademyLoading(true);

    try {
      const res = await fetch('/api/admin/academy/tutor', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          role: selectedManualId,
          chapterId: selectedChapterId,
          prompt: textToSend
        })
      });
      const data = await res.json();
      const tutorReply = data.tutorResponse || 'I am ready to assist. Please check your network and API keys in the Admin Console.';
      setAcademyMessages((prev) => [
        ...prev,
        { sender: 'tutor' as const, text: tutorReply, time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }
      ]);
    } catch (e) {
      setAcademyMessages((prev) => [
        ...prev,
        { sender: 'tutor' as const, text: '⚠️ Unable to connect to the AI Academy Mentor server. Please check your network connection.', time: 'Error' }
      ]);
    } finally {
      setAcademyLoading(false);
    }
  };
`;

if (!code.includes('selectedManualId')) {
  code = code.replace("const activeGuide = PROVIDER_INSTRUCTION_GUIDES.find((g) => g.id === selectedGuideId) || PROVIDER_INSTRUCTION_GUIDES[0];", "const activeGuide = PROVIDER_INSTRUCTION_GUIDES.find((g) => g.id === selectedGuideId) || PROVIDER_INSTRUCTION_GUIDES[0];\n" + academyStateCode);
}

// 5. Add Academy Tab to Main Navigation Tabs
if (!code.includes("id: 'academy_manuals'")) {
  code = code.replace(
    "{ id: 'switchboard', label: 'Feature Switchboard', icon: Layers },",
    "{ id: 'academy_manuals', label: '🎓 Operations Academy & Manuals', icon: GraduationCap },\n            { id: 'switchboard', label: 'Feature Switchboard', icon: Layers },"
  );
}

// 6. Add Academy Tab View before switchboard tab
const academyTabView = `
        {/* TAB: ACADEMY & IN-DEPTH TRAINING MANUALS */}
        {activeTab === 'academy_manuals' && (
          <div className="space-y-8">
            {/* Header Banner */}
            <div className="bg-gradient-to-r from-amber-500/10 via-sky-500/10 to-indigo-500/10 border border-amber-500/20 rounded-3xl p-6 sm:p-8 backdrop-blur-md">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="px-3 py-1 bg-amber-500/20 border border-amber-500/40 text-amber-400 font-bold text-xs rounded-full uppercase tracking-wider flex items-center gap-1.5">
                      <GraduationCap className="w-3.5 h-3.5" />
                      Executive Operations Academy
                    </span>
                    <span className="text-xs text-slate-400 font-mono">4 Specialized Roles • 17 Chapters • Live AI Mentor</span>
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                    In-Depth Operational Training Manuals & AI Academy
                  </h2>
                  <p className="text-sm text-slate-300 mt-2 max-w-3xl leading-relaxed">
                    Interactive role-based master handbooks and bespoke AI coaching for the Network & Integrations Specialist, Junior Software Engineer, Platform Operations Manager, and Chief Marketing Officer.
                  </p>
                </div>
                <div className="flex flex-wrap gap-2">
                  <a
                    href="/ATLAS_Master_Operations_Manuals_Collection.pdf"
                    download="ATLAS_Master_Operations_Manuals_Collection.pdf"
                    className="px-4 py-2.5 bg-slate-800 hover:bg-slate-700 text-amber-400 font-bold text-xs rounded-xl border border-slate-700 shadow-lg flex items-center gap-2 transition-all"
                  >
                    <BookOpen className="w-4 h-4" />
                    <span>Download All 4 Manuals (PDF)</span>
                  </a>
                </div>
              </div>

              {/* Role Selectors */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mt-6">
                {ATLAS_TRAINING_MANUALS.map((manual) => {
                  const isSelected = activeManual.id === manual.id;
                  return (
                    <button
                      key={manual.id}
                      onClick={() => {
                        setSelectedManualId(manual.id);
                        setSelectedChapterId(manual.chapters[0]?.id || '');
                      }}
                      className={\`text-left p-4 rounded-2xl border transition-all \${
                        isSelected
                          ? 'bg-slate-800 border-amber-400 text-white shadow-lg ring-1 ring-amber-400/40'
                          : 'bg-slate-900/80 border-slate-800 text-slate-400 hover:border-slate-700 hover:text-slate-200'
                      }\`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className={\`text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full \${
                          isSelected ? 'bg-amber-400/20 text-amber-300' : 'bg-slate-800 text-slate-400'
                        }\`}>
                          {manual.badge}
                        </span>
                        <span className="text-xs font-mono text-slate-500">{manual.chapters.length} Chs</span>
                      </div>
                      <div className="font-black text-sm text-white line-clamp-1">{manual.roleTitle}</div>
                      <p className="text-[11px] text-slate-400 line-clamp-2 mt-1">{manual.summary}</p>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Split Layout: Interactive Manual Reader & AI Academy Mentor */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              {/* Left Column: Interactive Reader (7 Cols) */}
              <div className="lg:col-span-7 space-y-6">
                {/* Chapter Selector Navigation */}
                <div className="bg-slate-900 border border-slate-800 rounded-3xl p-5 shadow-xl">
                  <div className="flex items-center justify-between mb-3 border-b border-slate-800 pb-3">
                    <span className="text-xs font-black uppercase text-slate-400 tracking-wider flex items-center gap-1.5">
                      <BookOpen className="w-4 h-4 text-sky-400" />
                      Chapters ({activeManual.chapters.length})
                    </span>
                    <span className="text-xs text-amber-400 font-mono">
                      Active: {activeChapter?.title.split(':')[0] || 'Chapter 1'}
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {activeManual.chapters.map((ch, idx) => {
                      const isChSelected = activeChapter.id === ch.id;
                      return (
                        <button
                          key={ch.id}
                          onClick={() => setSelectedChapterId(ch.id)}
                          className={\`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 \${
                            isChSelected
                              ? 'bg-sky-600 text-white shadow-md'
                              : 'bg-slate-800/80 text-slate-400 hover:text-slate-200 hover:bg-slate-800'
                          }\`}
                        >
                          <span>Ch {idx + 1}</span>
                          <span className="text-[10px] opacity-75 font-mono">({ch.readingTimeMinutes}m)</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Chapter Content Card */}
                <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
                    <div>
                      <span className="text-[10px] font-extrabold uppercase tracking-wider text-amber-400 bg-amber-400/10 px-2.5 py-1 rounded-full border border-amber-400/20">
                        {activeManual.roleTitle}
                      </span>
                      <h3 className="text-xl font-black text-white mt-2">{activeChapter.title}</h3>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => {
                          navigator.clipboard.writeText(activeChapter.content);
                          setCopiedChapterId(activeChapter.id);
                          setTimeout(() => setCopiedChapterId(null), 2500);
                        }}
                        className="p-2.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl border border-slate-700 text-xs font-bold flex items-center gap-1.5 transition-all"
                        title="Copy chapter markdown to clipboard"
                      >
                        {copiedChapterId === activeChapter.id ? (
                          <>
                            <Check className="w-4 h-4 text-emerald-400" />
                            <span className="text-emerald-400">Copied!</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-4 h-4 text-slate-400" />
                            <span>Copy Text</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>

                  {/* Markdown Content Display */}
                  <div className="prose prose-invert max-w-none text-slate-300 text-sm leading-relaxed space-y-4 whitespace-pre-line font-sans">
                    {activeChapter.content}
                  </div>

                  {/* Interactive Action Checklist */}
                  {activeChapter.actionChecklist && activeChapter.actionChecklist.length > 0 && (
                    <div className="bg-slate-950/70 border border-slate-800/80 rounded-2xl p-5 space-y-3 mt-6">
                      <h4 className="text-xs font-black uppercase text-amber-400 tracking-wider flex items-center gap-2">
                        <CheckSquare className="w-4 h-4 text-amber-400" />
                        Operator Action Checklist ({activeChapter.actionChecklist.length} Items)
                      </h4>
                      <p className="text-xs text-slate-400">
                        Complete and verify each mandatory operational task for this chapter:
                      </p>
                      <div className="space-y-2 pt-1">
                        {activeChapter.actionChecklist.map((item, i) => {
                          const itemKey = \`\${activeChapter.id}_\${i}\`;
                          const isDone = !!checkedChecklist[itemKey];
                          return (
                            <label
                              key={i}
                              className={\`flex items-start gap-3 p-3 rounded-xl border transition-all cursor-pointer \${
                                isDone
                                  ? 'bg-emerald-950/20 border-emerald-800/40 text-emerald-200'
                                  : 'bg-slate-900 border-slate-800 text-slate-300 hover:border-slate-700'
                              }\`}
                            >
                              <input
                                type="checkbox"
                                checked={isDone}
                                onChange={(e) =>
                                  setCheckedChecklist((prev) => ({
                                    ...prev,
                                    [itemKey]: e.target.checked
                                  }))
                                }
                                className="mt-0.5 rounded bg-slate-800 border-slate-700 text-emerald-500 focus:ring-emerald-500"
                              />
                              <span className={\`text-xs \${isDone ? 'line-through opacity-75 text-emerald-300' : ''}\`}>
                                {item}
                              </span>
                            </label>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Right Column: AI Academy Mentor Chat & Quiz (5 Cols) */}
              <div className="lg:col-span-5 space-y-6">
                <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-2xl flex flex-col h-[750px]">
                  {/* Tutor Avatar & Header */}
                  <div className="flex items-center justify-between border-b border-slate-800 pb-4 mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-amber-500 to-sky-500 flex items-center justify-center text-slate-950 font-black shadow-lg">
                        <Bot className="w-5 h-5 text-slate-950" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="font-extrabold text-sm text-white">AI Academy Mentor</h4>
                          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                        </div>
                        <p className="text-[11px] text-amber-400 font-mono">
                          Mode: {activeManual.badge}
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={() =>
                        setAcademyMessages([
                          {
                            sender: 'tutor',
                            text: \`🎓 **\${activeManual.roleTitle} Coaching Mode Activated!**\\n\\nAsk me anything about setup steps, debugging code, API keys, compliance, or ask me for a quick role quiz!\`,
                            time: 'Just now'
                          }
                        ])
                      }
                      className="text-[11px] text-slate-500 hover:text-slate-300 p-1.5 rounded-lg hover:bg-slate-800 transition-all flex items-center gap-1"
                      title="Reset chat"
                    >
                      <RefreshCw className="w-3.5 h-3.5" />
                      <span>Reset</span>
                    </button>
                  </div>

                  {/* Quick Role Prompts */}
                  <div className="mb-3">
                    <span className="text-[10px] font-bold uppercase text-slate-400 tracking-wider block mb-1.5">
                      Recommended Questions for this Role:
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {activeManual.id === 'network-integrations-manual' && (
                        <>
                          <button
                            onClick={() => handleAskTutor('How do I configure Stripe Issuing webhooks and secret keys?')}
                            className="px-2.5 py-1 bg-slate-800 hover:bg-slate-700 text-sky-400 rounded-lg text-[11px] font-semibold border border-slate-700 transition-all"
                          >
                            💳 Stripe Issuing setup
                          </button>
                          <button
                            onClick={() => handleAskTutor('What are the Hotelbeds APItude credentials and rate parity rules?')}
                            className="px-2.5 py-1 bg-slate-800 hover:bg-slate-700 text-sky-400 rounded-lg text-[11px] font-semibold border border-slate-700 transition-all"
                          >
                            🏨 Hotelbeds onboarding
                          </button>
                          <button
                            onClick={() => handleAskTutor('How do I set up Apple Wallet .pkpass and Google Wallet passes?')}
                            className="px-2.5 py-1 bg-slate-800 hover:bg-slate-700 text-sky-400 rounded-lg text-[11px] font-semibold border border-slate-700 transition-all"
                          >
                            📱 Apple/Google Wallet
                          </button>
                        </>
                      )}

                      {activeManual.id === 'junior-dev-tech-ops-manual' && (
                        <>
                          <button
                            onClick={() => handleAskTutor('How do I implement a new HotelSupplierAdapter in TypeScript?')}
                            className="px-2.5 py-1 bg-slate-800 hover:bg-slate-700 text-emerald-400 rounded-lg text-[11px] font-semibold border border-slate-700 transition-all"
                          >
                            💻 New Hotel Adapter
                          </button>
                          <button
                            onClick={() => handleAskTutor('Explain the B2B PDF Voucher and QR generation engine at /api/bookings/voucher')}
                            className="px-2.5 py-1 bg-slate-800 hover:bg-slate-700 text-emerald-400 rounded-lg text-[11px] font-semibold border border-slate-700 transition-all"
                          >
                            📄 Voucher QR Route
                          </button>
                          <button
                            onClick={() => handleAskTutor('What are the Next.js App Router rules and deployment checklist?')}
                            className="px-2.5 py-1 bg-slate-800 hover:bg-slate-700 text-emerald-400 rounded-lg text-[11px] font-semibold border border-slate-700 transition-all"
                          >
                            🚀 CI/CD & Build gotchas
                          </button>
                        </>
                      )}

                      {activeManual.id === 'platform-operations-manual' && (
                        <>
                          <button
                            onClick={() => handleAskTutor('Run through the 08:00 UTC morning operations health check')}
                            className="px-2.5 py-1 bg-slate-800 hover:bg-slate-700 text-amber-400 rounded-lg text-[11px] font-semibold border border-slate-700 transition-all"
                          >
                            📋 08:00 UTC Runbook
                          </button>
                          <button
                            onClick={() => handleAskTutor('How do we calculate and execute 20% Sovereign Vault batch dividends?')}
                            className="px-2.5 py-1 bg-slate-800 hover:bg-slate-700 text-amber-400 rounded-lg text-[11px] font-semibold border border-slate-700 transition-all"
                          >
                            💰 20% Vault Dividends
                          </button>
                          <button
                            onClick={() => handleAskTutor('What is the workflow for metal card laser-engraving fulfillment?')}
                            className="px-2.5 py-1 bg-slate-800 hover:bg-slate-700 text-amber-400 rounded-lg text-[11px] font-semibold border border-slate-700 transition-all"
                          >
                            💳 Metal Card Dispatch
                          </button>
                        </>
                      )}

                      {activeManual.id === 'cmo-growth-manual' && (
                        <>
                          <button
                            onClick={() => handleAskTutor('Give me the split-screen TikTok/Reels video ad script with hook, story, and offer')}
                            className="px-2.5 py-1 bg-slate-800 hover:bg-slate-700 text-indigo-400 rounded-lg text-[11px] font-semibold border border-slate-700 transition-all"
                          >
                            🎬 TikTok Ad Script
                          </button>
                          <button
                            onClick={() => handleAskTutor('What are the legal rate parity advertising rules for closed-loop clubs?')}
                            className="px-2.5 py-1 bg-slate-800 hover:bg-slate-700 text-indigo-400 rounded-lg text-[11px] font-semibold border border-slate-700 transition-all"
                          >
                            ⚖️ Rate Parity Rules
                          </button>
                          <button
                            onClick={() => handleAskTutor('Explain the CAC, LTV, and dual-sided $100 member referral program')}
                            className="px-2.5 py-1 bg-slate-800 hover:bg-slate-700 text-indigo-400 rounded-lg text-[11px] font-semibold border border-slate-700 transition-all"
                          >
                            📊 CAC/LTV & Referrals
                          </button>
                        </>
                      )}
                    </div>
                  </div>

                  {/* Chat Messages Stream */}
                  <div className="flex-1 overflow-y-auto space-y-3 pr-1 scrollbar-thin scrollbar-thumb-slate-800">
                    {academyMessages.map((msg, i) => (
                      <div
                        key={i}
                        className={\`flex flex-col \${msg.sender === 'user' ? 'items-end' : 'items-start'}\`}
                      >
                        <div
                          className={\`max-w-[90%] p-3.5 rounded-2xl text-xs leading-relaxed \${
                            msg.sender === 'user'
                              ? 'bg-sky-600 text-white rounded-br-none'
                              : 'bg-slate-800 border border-slate-700/80 text-slate-200 rounded-bl-none shadow-md'
                          }\`}
                        >
                          <div className="whitespace-pre-line font-sans">{msg.text}</div>
                        </div>
                        <span className="text-[9px] text-slate-500 font-mono mt-1 px-1">{msg.time}</span>
                      </div>
                    ))}

                    {academyLoading && (
                      <div className="flex items-center gap-2 text-xs text-amber-400 bg-slate-800/80 p-3 rounded-2xl border border-slate-700 w-fit">
                        <Sparkles className="w-4 h-4 animate-spin text-amber-400" />
                        <span>Academy Tutor analyzing operational manual...</span>
                      </div>
                    )}
                  </div>

                  {/* Interactive Query Input */}
                  <div className="pt-3 border-t border-slate-800 mt-2">
                    <form
                      onSubmit={(e) => {
                        e.preventDefault();
                        handleAskTutor();
                      }}
                      className="flex items-center gap-2"
                    >
                      <input
                        type="text"
                        value={academyQuery}
                        onChange={(e) => setAcademyQuery(e.target.value)}
                        placeholder={\`Ask \${activeManual.roleTitle.split(' ')[0]} Mentor...\`}
                        disabled={academyLoading}
                        className="flex-1 px-3.5 py-2.5 bg-slate-800 border border-slate-700 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-amber-400"
                      />
                      <button
                        type="submit"
                        disabled={academyLoading || !academyQuery.trim()}
                        className="p-2.5 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 disabled:opacity-40 text-slate-950 font-bold rounded-xl shadow-md transition-all"
                      >
                        <Send className="w-4 h-4" />
                      </button>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
`;

if (!code.includes("activeTab === 'academy_manuals'")) {
  code = code.replace("{/* TAB 1: LIVE FEATURE SWITCHBOARD */}\n        {activeTab === 'switchboard' && (", academyTabView + "\n        {/* TAB 1: LIVE FEATURE SWITCHBOARD */}\n        {activeTab === 'switchboard' && (");
}

fs.writeFileSync(adminPath, code, 'utf8');
console.log('Successfully updated src/app/admin/page.tsx with Academy & In-Depth Manuals tab!');
