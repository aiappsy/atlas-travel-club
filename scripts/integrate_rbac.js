const fs = require('fs');
const path = require('path');

const adminPath = path.join(__dirname, '../src/app/admin/page.tsx');
let code = fs.readFileSync(adminPath, 'utf8');

// 1. Add imports from rbacData and lucide icons
if (!code.includes("from '@/lib/rbacData'")) {
  code = code.replace(
    "import { ATLAS_TRAINING_MANUALS } from '@/lib/manualsData';",
    "import { ATLAS_TRAINING_MANUALS } from '@/lib/manualsData';\nimport { ATLAS_OPERATOR_ROLES, OperatorRoleId, AdminTabId } from '@/lib/rbacData';"
  );
}

// 2. Add icons: Key, User, Users, Lock, Unlock, AlertTriangle if not present
if (!code.includes("Key,\n  Users,")) {
  code = code.replace(
    "GraduationCap,\n  CheckSquare,\n  Copy,\n  Check\n} from 'lucide-react';",
    "GraduationCap,\n  CheckSquare,\n  Copy,\n  Check,\n  Key,\n  Users,\n  UserCheck,\n  AlertTriangle,\n  ShieldAlert\n} from 'lucide-react';"
  );
}

// 3. Update activeTab type
if (!code.includes("'rbac_permissions' |")) {
  code = code.replace("'academy_manuals' |", "'rbac_permissions' | 'academy_manuals' |");
}

// 4. Add RBAC State
const rbacState = `
  // RBAC Role State
  const [currentOperatorRole, setCurrentOperatorRole] = useState<OperatorRoleId>('super_admin');
  const activeRole = ATLAS_OPERATOR_ROLES.find((r) => r.id === currentOperatorRole) || ATLAS_OPERATOR_ROLES[0];
  const isTabPermitted = (tabId: AdminTabId) => activeRole.permittedTabs.includes(tabId);
`;

if (!code.includes('currentOperatorRole')) {
  code = code.replace(
    "const [selectedManualId, setSelectedManualId] = useState<string>('network-integrations-manual');",
    rbacState + "\n  const [selectedManualId, setSelectedManualId] = useState<string>('network-integrations-manual');"
  );
}

// 5. Update top bar in JSX with Role Switcher & Operator Bar
const operatorBar = `
      {/* Role-Based Access Control (RBAC) Operator Status Bar */}
      <div className="bg-slate-900 border-b border-slate-800/80 px-4 sm:px-6 lg:px-8 py-3">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row lg:items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className={\`w-9 h-9 rounded-xl bg-gradient-to-tr \${activeRole.avatarBg} flex items-center justify-center text-slate-950 font-black text-sm shadow-md\`}>
              {activeRole.shortTitle.charAt(0)}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-slate-300">Active Operator:</span>
                <span className="text-xs font-extrabold text-white">{activeRole.defaultOperatorName}</span>
                <span className={\`text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full border \${activeRole.badgeColor}\`}>
                  {activeRole.clearanceLevel}
                </span>
              </div>
              <p className="text-[11px] text-slate-400 mt-0.5">
                {activeRole.description}
              </p>
            </div>
          </div>

          {/* Quick Role Switcher */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 lg:pb-0 scrollbar-none">
            <span className="text-[11px] font-bold text-slate-400 mr-1 whitespace-nowrap flex items-center gap-1">
              <Users className="w-3.5 h-3.5 text-amber-400" />
              Switch View:
            </span>
            {ATLAS_OPERATOR_ROLES.map((role) => {
              const isSelected = role.id === currentOperatorRole;
              return (
                <button
                  key={role.id}
                  onClick={() => {
                    setCurrentOperatorRole(role.id);
                    setSelectedManualId(role.associatedManualId);
                    // If current tab is not permitted in new role, redirect to first permitted tab
                    if (!role.permittedTabs.includes(activeTab as AdminTabId)) {
                      setActiveTab(role.permittedTabs[0] as any);
                    }
                  }}
                  className={\`px-2.5 py-1 rounded-lg text-[11px] font-extrabold whitespace-nowrap transition-all border \${
                    isSelected
                      ? 'bg-amber-500/20 text-amber-300 border-amber-500/50 shadow-sm ring-1 ring-amber-500/30'
                      : 'bg-slate-800 text-slate-400 border-slate-700 hover:text-slate-200 hover:border-slate-600'
                  }\`}
                >
                  {role.shortTitle}
                </button>
              );
            })}
          </div>
        </div>
      </div>
`;

if (!code.includes('Active Operator:')) {
  code = code.replace(
    '{/* Main Navigation Tabs */}',
    operatorBar + '\n\n      {/* Main Navigation Tabs */}'
  );
}

// 6. Update Main Navigation Tabs list to include RBAC tab and filter based on role permissions
const allTabsDefinition = `
          {[
            { id: 'rbac_permissions', label: '🛡️ Role Permissions (RBAC)', icon: Key },
            { id: 'academy_manuals', label: '🎓 Operations Academy & Manuals', icon: GraduationCap },
            { id: 'switchboard', label: 'Feature Switchboard', icon: Layers },
            { id: 'currency_engine', label: 'Currency & FX Engine', icon: DollarSign },
            { id: 'hotel_inventory', label: 'Hotel Inventory & Margins', icon: Building2 },
            { id: 'nomad_hub', label: 'Digital Nomad & Visas', icon: Laptop },
            { id: 'vault_manager', label: 'Travel Vault & Dividends', icon: Coins },
            { id: 'luxury_villas', label: 'Luxury Villas', icon: Castle },
            { id: 'status_match', label: 'Status Match', icon: Award },
            { id: 'fast_track', label: 'VIP Fast-Track', icon: Zap },
            { id: 'yachts_supercars', label: 'Yachts & Supercars', icon: Anchor },
            { id: 'auto_rebooker', label: 'Price-Drop Re-Booker', icon: TrendingDown },
            { id: 'private_jets', label: 'Private Jet Empty Legs', icon: Plane },
            { id: 'flight_claims', label: 'Delay Claims (AirHelp)', icon: Scale },
            { id: 'insurance', label: 'Travel Insurance', icon: HeartPulse },
            { id: 'visa_manager', label: 'Visa Prepaid Manager', icon: CreditCard },
            { id: 'card_agent', label: 'Card Fulfillment Agent', icon: Truck },
            { id: 'wallet_pass', label: 'Apple / Google Wallet', icon: Smartphone },
            { id: 'messaging_bridge', label: 'WhatsApp & Telegram Bots', icon: MessageSquare },
            { id: 'voucher_settings', label: 'B2B Vouchers & QR Check-in', icon: FileText },
            { id: 'ai_studio', label: 'AI Concierge Studio', icon: Bot },
            { id: 'guides', label: 'Provider Instructions', icon: BookOpen },
            { id: 'suppliers', label: 'B2B Suppliers', icon: Globe },
            { id: 'paypal', label: 'PayPal Billing', icon: DollarSign },
          ]
            .filter((tab) => activeRole.permittedTabs.includes(tab.id as AdminTabId))
            .map((tab) => {
`;

// Replace tab rendering list
code = code.replace(
  /\{\[\s*\{\s*id:\s*'academy_manuals'[\s\S]*?\}\]\.map\(\(tab\) => \{/,
  allTabsDefinition
);

// 7. Add RBAC Tab View
const rbacTabView = `
        {/* TAB: ROLE-BASED ACCESS CONTROL & PERMISSIONS MATRIX */}
        {activeTab === 'rbac_permissions' && (
          <div className="space-y-8">
            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-6">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="px-3 py-0.5 bg-amber-500/20 text-amber-400 font-bold text-xs rounded-full uppercase tracking-wider border border-amber-500/30 flex items-center gap-1.5">
                      <Key className="w-3.5 h-3.5" />
                      Security &amp; Governance
                    </span>
                    <span className="text-xs text-slate-400 font-mono">RBAC Engine v2.4</span>
                  </div>
                  <h3 className="text-2xl font-black text-white">Role-Based Access Control &amp; Team Permissions</h3>
                  <p className="text-xs text-slate-400 mt-1 max-w-2xl">
                    Configure granular module access, security clearances, and operational responsibilities for each position.
                  </p>
                </div>
                <button
                  onClick={() => alert('RBAC Permissions matrix saved to corporate security vault!')}
                  className="px-5 py-2.5 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-slate-950 font-black text-xs rounded-xl shadow-lg transition-all"
                >
                  Save Permissions Matrix
                </button>
              </div>

              {/* Roles Cards Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {ATLAS_OPERATOR_ROLES.map((role) => {
                  const isCurrent = role.id === currentOperatorRole;
                  return (
                    <div
                      key={role.id}
                      className={\`bg-slate-950/70 border rounded-2xl p-5 space-y-4 transition-all \${
                        isCurrent
                          ? 'border-amber-400 ring-1 ring-amber-400/30 shadow-lg'
                          : 'border-slate-800/80 hover:border-slate-700'
                      }\`}
                    >
                      <div className="flex items-center justify-between">
                        <span className={\`text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full border \${role.badgeColor}\`}>
                          {role.clearanceLevel.split(' ')[0]} {role.clearanceLevel.split(' ')[1]}
                        </span>
                        <span className="text-xs font-mono text-slate-400">
                          {role.permittedTabs.length} Modules Allowed
                        </span>
                      </div>

                      <div>
                        <h4 className="font-extrabold text-base text-white">{role.title}</h4>
                        <p className="text-xs text-amber-400 font-mono mt-0.5">{role.defaultOperatorName}</p>
                        <p className="text-[11px] text-slate-400 mt-2 leading-relaxed">{role.description}</p>
                      </div>

                      <div className="border-t border-slate-800/80 pt-3">
                        <span className="text-[10px] font-extrabold uppercase text-slate-400 tracking-wider block mb-2">
                          Permitted Modules ({role.permittedTabs.length}):
                        </span>
                        <div className="flex flex-wrap gap-1">
                          {role.permittedTabs.map((tabId) => (
                            <span
                              key={tabId}
                              className="text-[10px] bg-slate-800/80 text-slate-300 px-2 py-0.5 rounded-md font-mono border border-slate-700/60"
                            >
                              {tabId}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className="pt-2">
                        <button
                          onClick={() => {
                            setCurrentOperatorRole(role.id);
                            setSelectedManualId(role.associatedManualId);
                            setActiveTab('academy_manuals');
                          }}
                          className="w-full py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold rounded-xl border border-slate-700 transition-all flex items-center justify-center gap-1.5"
                        >
                          <UserCheck className="w-3.5 h-3.5 text-amber-400" />
                          <span>Simulate This Role View</span>
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}
`;

if (!code.includes("activeTab === 'rbac_permissions'")) {
  code = code.replace(
    "{/* TAB: ACADEMY & IN-DEPTH TRAINING MANUALS */}\n        {activeTab === 'academy_manuals' && (",
    rbacTabView + "\n        {/* TAB: ACADEMY & IN-DEPTH TRAINING MANUALS */}\n        {activeTab === 'academy_manuals' && ("
  );
}

fs.writeFileSync(adminPath, code, 'utf8');
console.log('Successfully integrated RBAC into src/app/admin/page.tsx!');
