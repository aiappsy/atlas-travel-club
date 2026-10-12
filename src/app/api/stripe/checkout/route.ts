import { NextRequest, NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe';
import { MEMBERSHIP_TIERS } from '@/lib/mockData';

export const dynamic = 'force-dynamic';

export async function POST(req: NextRequest) {
  try {
    if (!stripe) {
      return NextResponse.json(
        { error: 'Stripe configuration missing on server (STRIPE_SECRET_KEY)' },
        { status: 500 }
      );
    }

    const body = await req.json();
    const {
      tierId = 'gold',
      billingCycle = 'annual',
      userEmail,
      userId,
      successUrl,
      cancelUrl,
      discountCode,
    } = body;

    const tier = MEMBERSHIP_TIERS.find((t) => t.id === tierId) || MEMBERSHIP_TIERS[2]; // Default Gold VIP

    // Pricing: Founding Membership default £79 (~$99 / 990 NOK) or tier annual/monthly
    let unitAmount = tier.priceAnnual * 100; // in cents
    let currency = 'gbp';

    if (tierId === 'founding') {
      unitAmount = 7900; // £79.00
      currency = 'gbp';
    } else if (billingCycle === 'monthly') {
      unitAmount = Math.round(tier.priceMonthly * 100);
      currency = 'usd';
    } else {
      unitAmount = Math.round(tier.priceAnnual * 100);
      currency = 'usd';
    }

    const origin = req.headers.get('origin') || 'https://atlastravelclub.com';

    // Build Stripe Checkout Session
    const session = await (stripe.checkout.sessions as any).create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency,
            product_data: {
              name: `ATLAS Travel Club - ${tier.name}`,
              description: `Private Wholesale Access • 0% Retail Markup • Bedbank CUG Parity Exemption (${billingCycle === 'annual' ? 'Annual Pass' : 'Monthly'})`,
              images: ['https://atlastravelclub.com/atlas-logo.svg'],
            },
            unit_amount: unitAmount,
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      customer_email: userEmail || undefined,
      metadata: {
        userId: userId || 'guest',
        tierId: tier.id,
        billingCycle,
        discountCode: discountCode || '',
      },
      success_url:
        successUrl ||
        `${origin}/membership?checkout_success=true&session_id={CHECKOUT_SESSION_ID}&tier=${tier.id}`,
      cancel_url: cancelUrl || `${origin}/membership?checkout_canceled=true`,
    });

    return NextResponse.json({
      success: true,
      sessionId: session.id,
      url: session.url,
    });
  } catch (error: any) {
    console.error('Stripe checkout session error:', error);
    return NextResponse.json(
      { error: error?.message || 'Failed to initialize Stripe checkout session' },
      { status: 500 }
    );
  }
}
