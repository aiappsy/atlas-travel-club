export type ProviderName = 'amadeus' | 'hotelbeds' | 'priceline' | 'expedia' | 'direct';

export interface ProviderHotelRate {
  provider: ProviderName;
  providerHotelId: string;
  hotelName: string;
  roomType: string;
  currency: string;
  rawWholesaleNetPrice: number;
  publicRetailPrice: number;
  affiliateCommissionRate: number; // e.g. 0.12 (12%)
  availableRooms: number;
  cancellationPolicy: string;
  rateKey: string;
}

export interface GuestManifest {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  specialRequests?: string;
  paymentMethod: 'paypal' | 'credit_card' | 'member_wallet';
  paypalOrderId?: string;
}

export interface BookingResponse {
  success: boolean;
  bookingReference: string;
  providerReference: string;
  provider: ProviderName;
  hotelName: string;
  roomName: string;
  checkInDate: string;
  checkOutDate: string;
  nights: number;
  guests: number;
  totalPublicPrice: number;
  totalWholesalePaid: number;
  memberSavings: number;
  commissionRebatePaidToMember: number;
  status: 'confirmed' | 'pending' | 'failed';
  timestamp: string;
}

export interface SupplierConfig {
  id: ProviderName;
  name: string;
  category: 'Hotel Bedbank' | 'GDS System' | 'OTA Partner Network' | 'Local Merchant Network';
  enabled: boolean;
  apiKey: string;
  apiSecret: string;
  endpointMode: 'sandbox' | 'live';
  commissionPassThroughPercent: number; // e.g. 100 for 100% pass through
  status: 'connected' | 'unconfigured' | 'error';
  lastPing: string;
}

export interface PayPalConfig {
  mode: 'sandbox' | 'live';
  clientId: string;
  clientSecret: string;
  webhookId: string;
  autoCapture: boolean;
  memberCommissionRebateEnabled: boolean;
  status: 'connected' | 'unconfigured';
}
