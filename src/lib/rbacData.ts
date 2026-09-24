export type AdminTabId =
  | 'academy_manuals'
  | 'rbac_permissions'
  | 'switchboard'
  | 'currency_engine'
  | 'hotel_inventory'
  | 'nomad_hub'
  | 'vault_manager'
  | 'luxury_villas'
  | 'status_match'
  | 'fast_track'
  | 'yachts_supercars'
  | 'auto_rebooker'
  | 'private_jets'
  | 'flight_claims'
  | 'insurance'
  | 'visa_manager'
  | 'card_agent'
  | 'wallet_pass'
  | 'messaging_bridge'
  | 'voucher_settings'
  | 'ai_studio'
  | 'guides'
  | 'suppliers'
  | 'paypal';

export type OperatorRoleId =
  | 'super_admin'
  | 'network_specialist'
  | 'junior_engineer'
  | 'operations_manager'
  | 'cmo_growth';

export type AdminHubId =
  | 'academy_governance'
  | 'travel_inventory'
  | 'fintech_banking'
  | 'nomad_vip'
  | 'integrations_engine';

export interface AdminHubTabItem {
  id: AdminTabId;
  label: string;
  icon: any;
  badge?: string;
}

export interface AdminHub {
  id: AdminHubId;
  label: string;
  icon: any;
  description: string;
  subTabs: AdminHubTabItem[];
}

export interface OperatorRole {
  id: OperatorRoleId;
  title: string;
  shortTitle: string;
  defaultOperatorName: string;
  clearanceLevel: string;
  badge: string;
  badgeColor: string; // Tailwind class
  avatarBg: string;
  description: string;
  associatedManualId: string;
  permittedTabs: AdminTabId[];
}

export const ATLAS_OPERATOR_ROLES: OperatorRole[] = [
  {
    id: 'super_admin',
    title: 'Super Admin / Platform Owner',
    shortTitle: 'Platform Owner',
    defaultOperatorName: 'Alexander Sterling (Founder & Managing Director)',
    clearanceLevel: 'Level 5 (Unrestricted Clearance)',
    badge: 'Full Platform Clearance',
    badgeColor: 'bg-amber-500/20 text-amber-400 border-amber-500/40',
    avatarBg: 'from-amber-500 to-amber-700',
    description: 'Full uninhibited read/write/execute control across all financial gateways, core codebase settings, profit allocations, and master switches.',
    associatedManualId: 'network-integrations-manual',
    permittedTabs: [
      'rbac_permissions',
      'academy_manuals',
      'switchboard',
      'currency_engine',
      'hotel_inventory',
      'nomad_hub',
      'vault_manager',
      'luxury_villas',
      'status_match',
      'fast_track',
      'yachts_supercars',
      'auto_rebooker',
      'private_jets',
      'flight_claims',
      'insurance',
      'visa_manager',
      'card_agent',
      'wallet_pass',
      'messaging_bridge',
      'voucher_settings',
      'ai_studio',
      'guides',
      'suppliers',
      'paypal',
    ],
  },
  {
    id: 'network_specialist',
    title: 'Network & Third-Party Integrations Specialist',
    shortTitle: 'Integrations Lead',
    defaultOperatorName: 'Sarah Lin (VP of Strategic Integrations)',
    clearanceLevel: 'Level 3 (Partner & API Infrastructure)',
    badge: 'Integrations & Webhooks',
    badgeColor: 'bg-sky-500/20 text-sky-400 border-sky-500/40',
    avatarBg: 'from-sky-500 to-blue-700',
    description: 'Responsible for onboarding B2B Bedbanks, configuring Stripe Issuing webhooks, Apple/Google Wallet certs, and partner APIs.',
    associatedManualId: 'network-integrations-manual',
    permittedTabs: [
      'academy_manuals',
      'suppliers',
      'visa_manager',
      'wallet_pass',
      'messaging_bridge',
      'voucher_settings',
      'nomad_hub',
      'private_jets',
      'guides',
    ],
  },
  {
    id: 'junior_engineer',
    title: 'Junior Software Engineer & Technical Operations',
    shortTitle: 'Software Engineer',
    defaultOperatorName: 'Alex Vance (Full-Stack Engineer)',
    clearanceLevel: 'Level 3 (Codebase & Architecture)',
    badge: 'Engineering & Tech Ops',
    badgeColor: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/40',
    avatarBg: 'from-emerald-500 to-teal-700',
    description: 'Responsible for Next.js App Router maintenance, hotel provider adapters, PDF voucher rendering, and deployment pipelines.',
    associatedManualId: 'junior-dev-tech-ops-manual',
    permittedTabs: [
      'academy_manuals',
      'hotel_inventory',
      'currency_engine',
      'voucher_settings',
      'ai_studio',
      'suppliers',
      'guides',
    ],
  },
  {
    id: 'operations_manager',
    title: 'General App & Platform Operations Manager',
    shortTitle: 'Operations Manager',
    defaultOperatorName: 'Elena Rostova (Head of Operations)',
    clearanceLevel: 'Level 4 (Operational Execution)',
    badge: 'Operations & Execution',
    badgeColor: 'bg-indigo-500/20 text-indigo-400 border-indigo-500/40',
    avatarBg: 'from-indigo-500 to-purple-700',
    description: 'Executes daily 08:00 UTC health checks, calculates Sovereign Vault profit dividends, dispatches metal cards, and audits price drop refunds.',
    associatedManualId: 'platform-operations-manual',
    permittedTabs: [
      'academy_manuals',
      'vault_manager',
      'card_agent',
      'auto_rebooker',
      'status_match',
      'fast_track',
      'insurance',
      'flight_claims',
      'hotel_inventory',
      'voucher_settings',
    ],
  },
  {
    id: 'cmo_growth',
    title: 'Chief Marketing Officer & Growth Lead',
    shortTitle: 'Marketing Lead',
    defaultOperatorName: 'Marcus Sterling (Chief Growth Officer)',
    clearanceLevel: 'Level 2 (Marketing & Analytics)',
    badge: 'Marketing & Acquisition',
    badgeColor: 'bg-pink-500/20 text-pink-400 border-pink-500/40',
    avatarBg: 'from-pink-500 to-rose-700',
    description: 'Leads member acquisition, monitors wholesale savings proofs for high-converting ads, tests AI conversion prompts, and scales viral referral loops.',
    associatedManualId: 'cmo-growth-manual',
    permittedTabs: [
      'academy_manuals',
      'hotel_inventory',
      'nomad_hub',
      'luxury_villas',
      'yachts_supercars',
      'ai_studio',
      'vault_manager',
    ],
  },
];
