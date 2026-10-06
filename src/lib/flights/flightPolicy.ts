/**
 * Atlas Travel Club - 0% Risk Flight Architecture & Cost-Clearing Model
 * 
 * CORE RULES:
 * 1. Zero Retail Markup: Atlas passes direct airline net/GDS fares at exact cost.
 * 2. Zero Financial Leakage: All payment processing fees and PNR ticketing fees ($3 Duffel)
 *    are either absorbed directly by the operating carrier (Pass-Through) or itemized at exact cost.
 * 3. Carrier Tariff Pass-Through: All flight tickets are subject to operating airline
 *    conditions of carriage. Atlas does not fund cancellations or carrier bankruptcies out of pocket.
 * 4. EU261 Disruption Protection: Club members receive automatic flight delay monitoring
 *    and up to €600 compensation claim filing assistance.
 */

export interface FlightFareBreakdown {
  baseNetFare: number;
  airportTaxesAndSecurity: number;
  ticketingAndPnrFee: number; // Duffel flat fee ($3.00)
  merchantProcessingFee: number; // $0 in pass-through, or exact 2.5-2.9% if merchant
  totalAmountCharged: number;
  retailOtaComparison: number; // What Expedia / eDreams charge with their markup & junk fees
  memberInstantSavings: number;
  paymentMode: 'direct_carrier_pass_through' | 'merchant_at_cost';
  carrierNotice: string;
}

export interface FlightLegalDisclosure {
  ticketingAuthority: string;
  tariffDisclaimer: string;
  cancellationPolicy: string;
  eu261Protection: string;
}

export const FLIGHT_LEGAL_DISCLOSURES: FlightLegalDisclosure = {
  ticketingAuthority:
    'Flight bookings are cleared through accredited IATA/NDC carrier settlement networks (Duffel / Operating Airlines). Atlas Travel Club acts strictly as a private membership purchasing agent and does not operate aircraft.',
  tariffDisclaimer:
    'All flights are ticketed subject to the operating airline’s published Conditions of Carriage and fare tariff rules. Fare restrictions, seat selection, and baggage allowances are governed directly by the carrier.',
  cancellationPolicy:
    'Non-refundable tickets cannot be refunded once issued. If an airline approves a ticket refund or schedule change, funds are returned directly to the passenger pursuant to carrier policy. Atlas does not underwrite airline ticket cancellations from club funds.',
  eu261Protection:
    'Atlas Travel Club Sentinel automatically monitors all booked member flights. Under Regulation (EC) No 261/2004, eligible delays of 3+ hours or cancellations qualify for up to €600 in direct passenger cash compensation.',
};

/**
 * Computes exact 0%-risk flight cost clearing for any ticket
 */
export function calculateFlightClearingSummary(
  baseNetFare: number,
  airportTaxes: number = 45,
  paymentMethod: 'card_pass_through' | 'atlas_merchant' = 'card_pass_through'
): FlightFareBreakdown {
  const pnrIssuanceFee = 3.0; // Duffel flat per-order fee

  if (paymentMethod === 'card_pass_through') {
    // 0% Risk Model A: Member card charged directly by carrier/Duffel
    // Processing fee is $0 for Atlas (absorbed by the airline)
    const total = Math.round((baseNetFare + airportTaxes + pnrIssuanceFee) * 100) / 100;
    // Typical retail OTA adds 7-10% markup + $20 booking fee
    const retailOta = Math.round((baseNetFare * 1.08 + airportTaxes + 20) * 100) / 100;
    const savings = Math.max(0, Math.round((retailOta - total) * 100) / 100);

    return {
      baseNetFare,
      airportTaxesAndSecurity: airportTaxes,
      ticketingAndPnrFee: pnrIssuanceFee,
      merchantProcessingFee: 0.0,
      totalAmountCharged: total,
      retailOtaComparison: retailOta,
      memberInstantSavings: savings,
      paymentMode: 'direct_carrier_pass_through',
      carrierNotice:
        'Billed directly by operating carrier / Duffel settlement. 0% credit card surcharge to Atlas.',
    };
  } else {
    // 0% Risk Model B: Atlas merchant checkout with at-cost pass-through (Stripe 2.9% + $0.30)
    const subtotal = baseNetFare + airportTaxes + pnrIssuanceFee;
    const processingFee = Math.round(((subtotal * 0.029) + 0.3) * 100) / 100;
    const total = Math.round((subtotal + processingFee) * 100) / 100;
    const retailOta = Math.round((baseNetFare * 1.08 + airportTaxes + 25) * 100) / 100;
    const savings = Math.max(0, Math.round((retailOta - total) * 100) / 100);

    return {
      baseNetFare,
      airportTaxesAndSecurity: airportTaxes,
      ticketingAndPnrFee: pnrIssuanceFee,
      merchantProcessingFee: processingFee,
      totalAmountCharged: total,
      retailOtaComparison: retailOta,
      memberInstantSavings: savings,
      paymentMode: 'merchant_at_cost',
      carrierNotice:
        'Atlas Merchant Settlement: 0% club markup. Card processing fee itemized at exact bank cost.',
    };
  }
}
