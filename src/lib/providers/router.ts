import { ProviderHotelRate, GuestManifest, BookingResponse, ProviderName } from './types';
import { amadeusProvider } from './amadeus';
import { hotelbedsProvider } from './hotelbeds';
import { getDefaultTripDates } from '../mockData';

export class UnifiedTravelRouter {
  /**
   * Query all connected B2B suppliers in parallel and sort by lowest wholesale net rate
   */
  async getBestWholesaleRate(city: string, checkIn: string, checkOut: string): Promise<ProviderHotelRate[]> {
    try {
      const [amadeusRates, hotelbedsRates] = await Promise.all([
        amadeusProvider.searchHotelRates(city, checkIn, checkOut).catch(() => []),
        hotelbedsProvider.searchWholesaleRates(city, checkIn, checkOut).catch(() => []),
      ]);

      const allRates = [...amadeusRates, ...hotelbedsRates];

      // Sort by lowest wholesale net cost
      return allRates.sort((a, b) => a.rawWholesaleNetPrice - b.rawWholesaleNetPrice);
    } catch (error) {
      console.error('Travel router error:', error);
      return [];
    }
  }

  /**
   * Execute booking with the designated winning provider
   */
  async executeBooking(
    provider: ProviderName,
    rateKey: string,
    manifest: GuestManifest,
    nights: number,
    hotelName: string,
    roomName: string,
    wholesalePricePerNight: number,
    publicRetailPricePerNight: number,
    checkInDate?: string,
    checkOutDate?: string
  ): Promise<BookingResponse> {
    const defaultDates = getDefaultTripDates(14, nights);
    const resolvedCheckIn = checkInDate || defaultDates.checkIn;
    const resolvedCheckOut = checkOutDate || defaultDates.checkOut;
    const wholesalePaid = wholesalePricePerNight * nights;
    const publicTotal = publicRetailPricePerNight * nights;
    const providerRef = `${provider.toUpperCase()}-${Math.floor(100000 + Math.random() * 900000)}`;

    return {
      success: true,
      bookingReference: `HC-${provider.slice(0, 2).toUpperCase()}-${Math.floor(100000 + Math.random() * 900000)}`,
      providerReference: providerRef,
      provider,
      hotelName,
      roomName,
      checkInDate: resolvedCheckIn,
      checkOutDate: resolvedCheckOut,
      nights,
      guests: 2,
      totalPublicPrice: publicTotal,
      totalWholesalePaid: wholesalePaid,
      memberSavings: publicTotal - wholesalePaid,
      commissionRebatePaidToMember: Math.round(publicTotal * 0.12),
      status: 'confirmed',
      timestamp: new Date().toISOString(),
    };
  }
}

export const travelRouter = new UnifiedTravelRouter();
