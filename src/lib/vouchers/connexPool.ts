/**
 * Atlas Travel Club — Connex Holiday Plus Automated Voucher Engine
 * 
 * Manages the digital pool of Holiday Plus e-vouchers.
 * Automates assignment, tracking, and delivery for club members.
 */

export interface ConnexVoucher {
  code: string;
  status: 'available' | 'assigned' | 'redeemed';
  assignedTo?: string;
  assignedAt?: string;
  expiresAt: string;
  portalUrl: string;
}

// Initial pre-loaded seed pool for Atlas VIP Members
export const INITIAL_CONNEX_POOL: ConnexVoucher[] = [
  {
    code: 'HP-8492-ATLAS-VIP',
    status: 'available',
    expiresAt: '2027-10-31',
    portalUrl: 'https://www.holidayplus.net',
  },
  {
    code: 'HP-8493-ATLAS-VIP',
    status: 'available',
    expiresAt: '2027-10-31',
    portalUrl: 'https://www.holidayplus.net',
  },
  {
    code: 'HP-8494-ATLAS-VIP',
    status: 'available',
    expiresAt: '2027-10-31',
    portalUrl: 'https://www.holidayplus.net',
  },
  {
    code: 'HP-8495-ATLAS-VIP',
    status: 'available',
    expiresAt: '2027-10-31',
    portalUrl: 'https://www.holidayplus.net',
  },
  {
    code: 'HP-8496-ATLAS-VIP',
    status: 'available',
    expiresAt: '2027-10-31',
    portalUrl: 'https://www.holidayplus.net',
  },
  {
    code: 'HP-8497-ATLAS-VIP',
    status: 'available',
    expiresAt: '2027-10-31',
    portalUrl: 'https://www.holidayplus.net',
  },
  {
    code: 'HP-8498-ATLAS-VIP',
    status: 'available',
    expiresAt: '2027-10-31',
    portalUrl: 'https://www.holidayplus.net',
  },
  {
    code: 'HP-8499-ATLAS-VIP',
    status: 'available',
    expiresAt: '2027-10-31',
    portalUrl: 'https://www.holidayplus.net',
  },
];
