const fs = require('fs');
const path = require('path');

const adminPath = path.join(__dirname, '../src/app/admin/page.tsx');
let code = fs.readFileSync(adminPath, 'utf8');

// Ensure proper imports from rbacData
code = code.replace(
  /import \{ ATLAS_OPERATOR_ROLES, OperatorRoleId, AdminTabId \} from '@\/lib\/rbacData';/,
  "import { ATLAS_OPERATOR_ROLES, OperatorRoleId, AdminTabId, AdminHub, AdminHubId, AdminHubTabItem } from '@/lib/rbacData';"
);

// Clean up any loose definitions of AdminHub
code = code.replace(/export type AdminHubId[\s\S]*?subTabs: Array<[\s\S]*?>;\s*\}/, '');

// Hubs Data with explicit types
const hubsData = `
  const ADMIN_HUBS: AdminHub[] = [
    {
      id: 'academy_governance',
      label: 'Academy & Governance',
      icon: GraduationCap,
      description: 'Training handbooks, role-based AI tutor, team access matrix, and master setup guides.',
      subTabs: [
        { id: 'academy_manuals', label: '🎓 Operations Academy & AI Mentor', icon: GraduationCap },
        { id: 'rbac_permissions', label: '🛡️ Role Permissions (RBAC)', icon: Key },
        { id: 'guides', label: '📖 Provider Master Guides', icon: BookOpen },
      ],
    },
    {
      id: 'travel_inventory',
      label: 'Wholesale Travel',
      icon: Building2,
      description: '1,000,000+ luxury properties, dynamic margins, curated villas, private jets, and yachts.',
      subTabs: [
        { id: 'hotel_inventory', label: '🏨 Hotel Inventory & Margins', icon: Building2 },
        { id: 'luxury_villas', label: '🏰 Luxury Villas & Estates', icon: Castle },
        { id: 'private_jets', label: '✈️ Private Jet Empty Legs', icon: Plane },
        { id: 'yachts_supercars', label: '⚓ Yachts & Supercars', icon: Anchor },
      ],
    },
    {
      id: 'fintech_banking',
      label: 'FinTech & Banking',
      icon: CreditCard,
      description: 'Stripe Issuing Visa cards, Sovereign Vault 20% dividends, multi-currency FX, and metal card dispatch.',
      subTabs: [
        { id: 'visa_manager', label: '💳 Visa Prepaid Manager', icon: CreditCard },
        { id: 'vault_manager', label: '🪙 Travel Vault & Dividends', icon: Coins },
        { id: 'card_agent', label: '🚚 Metal Card Fulfillment', icon: Truck },
        { id: 'currency_engine', label: '💱 Currency & FX Engine', icon: DollarSign },
        { id: 'paypal', label: '💵 PayPal Billing', icon: DollarSign },
      ],
    },
    {
      id: 'nomad_vip',
      label: 'Nomad & VIP Services',
      icon: Laptop,
      description: 'Global remote worker visa hub, Schengen tracker, airport fast-track, and insurance.',
      subTabs: [
        { id: 'nomad_hub', label: '💻 Digital Nomad & Visas', icon: Laptop },
        { id: 'fast_track', label: '⚡ VIP Fast-Track Immigration', icon: Zap },
        { id: 'status_match', label: '👑 Elite Status Match', icon: Award },
        { id: 'insurance', label: '🛡️ Nomad Travel Insurance', icon: HeartPulse },
        { id: 'flight_claims', label: '⚖️ Delay Claims (AirHelp)', icon: Scale },
      ],
    },
    {
      id: 'integrations_engine',
      label: 'Integrations & Engine',
      icon: Layers,
      description: 'Feature switchboard, B2B Bedbanks, Apple/Google Wallets, messaging bots, and voucher generator.',
      subTabs: [
        { id: 'switchboard', label: '⚡ Feature Switchboard', icon: Layers },
        { id: 'suppliers', label: '🌐 B2B Bedbank Suppliers', icon: Globe },
        { id: 'wallet_pass', label: '📱 Apple / Google Wallet', icon: Smartphone },
        { id: 'messaging_bridge', label: '💬 WhatsApp & Telegram Bots', icon: MessageSquare },
        { id: 'voucher_settings', label: '📄 B2B Vouchers & QR Check-in', icon: FileText },
        { id: 'auto_rebooker', label: '📉 Price-Drop Re-Booker', icon: TrendingDown },
        { id: 'ai_studio', label: '🤖 AI Concierge Studio', icon: Bot },
      ],
    },
  ];

  // Derive active hub from active tab
  const activeHub = ADMIN_HUBS.find((hub: AdminHub) => hub.subTabs.some((tab: AdminHubTabItem) => tab.id === activeTab)) || ADMIN_HUBS[0];
  const [selectedHubId, setSelectedHubId] = useState<AdminHubId>(activeHub.id);

  // Filter hubs and sub-tabs based on RBAC permissions
  const permittedHubs = ADMIN_HUBS.filter((hub: AdminHub) =>
    hub.subTabs.some((tab: AdminHubTabItem) => activeRole.permittedTabs.includes(tab.id as AdminTabId))
  );

  const currentHub = ADMIN_HUBS.find((hub: AdminHub) => hub.id === selectedHubId) || permittedHubs[0] || ADMIN_HUBS[0];
  const permittedSubTabs = currentHub.subTabs.filter((tab: AdminHubTabItem) =>
    activeRole.permittedTabs.includes(tab.id as AdminTabId)
  );
`;

// Replace ADMIN_HUBS block if exists or insert
if (code.includes('const ADMIN_HUBS: AdminHub[] = [')) {
  code = code.replace(
    /const ADMIN_HUBS: AdminHub\[\] = \[[\s\S]*?activeRole\.permittedTabs\.includes\(tab\.id as AdminTabId\)\s*\);/,
    hubsData.trim()
  );
} else {
  code = code.replace(
    'const isTabPermitted = (tabId: AdminTabId) => activeRole.permittedTabs.includes(tabId);',
    'const isTabPermitted = (tabId: AdminTabId) => activeRole.permittedTabs.includes(tabId);\n' + hubsData
  );
}

// Clean Hub Navigation in JSX with proper types
const cleanHubNavigation = `
      {/* 2-TIER COMMAND HUBS NAVIGATION */}
      <div className="bg-slate-900/80 border-b border-slate-800 px-4 sm:px-6 lg:px-8 pt-3 pb-2 backdrop-blur-md">
        <div className="max-w-7xl mx-auto space-y-3">
          {/* Tier 1: Core Command Hubs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
            {permittedHubs.map((hub: AdminHub) => {
              const HubIcon = hub.icon;
              const isHubActive = hub.id === currentHub.id;
              const permittedCount = hub.subTabs.filter((t: AdminHubTabItem) => activeRole.permittedTabs.includes(t.id as AdminTabId)).length;

              return (
                <button
                  key={hub.id}
                  onClick={() => {
                    setSelectedHubId(hub.id);
                    const firstValidTab = hub.subTabs.find((t: AdminHubTabItem) => activeRole.permittedTabs.includes(t.id as AdminTabId));
                    if (firstValidTab) {
                      setActiveTab(firstValidTab.id as any);
                    }
                  }}
                  className={\`flex items-center gap-2.5 px-4 py-2.5 rounded-2xl text-xs font-black transition-all whitespace-nowrap \${
                    isHubActive
                      ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 shadow-lg shadow-amber-500/20 ring-1 ring-amber-400'
                      : 'bg-slate-800/80 text-slate-300 hover:text-white hover:bg-slate-800 border border-slate-700/60'
                  }\`}
                >
                  <HubIcon className={\`w-4 h-4 \${isHubActive ? 'text-slate-950' : 'text-amber-400'}\`} />
                  <span>{hub.label}</span>
                  <span
                    className={\`text-[10px] font-mono px-1.5 py-0.2 rounded-full font-extrabold \${
                      isHubActive ? 'bg-slate-950/20 text-slate-950' : 'bg-slate-900 text-slate-400'
                    }\`}
                  >
                    {permittedCount}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Tier 2: Sub-Modules Pills within Selected Hub */}
          <div className="flex items-center gap-1.5 overflow-x-auto pt-1 pb-1 scrollbar-none border-t border-slate-800/60">
            <span className="text-[11px] font-mono text-slate-500 mr-2 whitespace-nowrap hidden sm:inline-block">
              {currentHub.label}:
            </span>
            {permittedSubTabs.map((tab: AdminHubTabItem) => {
              const TabIcon = tab.icon;
              const isTabActive = activeTab === tab.id;

              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={\`flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all \${
                    isTabActive
                      ? 'bg-sky-600 text-white shadow-md ring-1 ring-sky-400/50'
                      : 'bg-slate-950/60 text-slate-400 hover:text-slate-200 hover:bg-slate-800/80 border border-slate-800'
                  }\`}
                >
                  <TabIcon className={\`w-3.5 h-3.5 \${isTabActive ? 'text-white' : 'text-slate-400'}\`} />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
`;

code = code.replace(
  /\{\/\* 2-TIER COMMAND HUBS NAVIGATION \*\/\}[\s\S]*?\{\/\* Content Area \*\/\}/,
  cleanHubNavigation + '\n\n      {/* Content Area */}'
);

fs.writeFileSync(adminPath, code, 'utf8');
console.log('Successfully updated Admin Console with typed 5 Command Hubs!');
