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

    const tier = MEMBERSHIP_TIERS.find((t) => t.id === tierId) || MEMBERSHIP_TIERS[0];

    // Pricing: 1 290 NOK flat annual membership (107.50 NOK/mo) or 129 NOK monthly
    let unitAmount = 129000; // 1 290 NOK in øre
    let currency = 'nok';

    if (tierId === 'sovereign' || tierId === 'business') {
      unitAmount = billingCycle === 'monthly' ? 24900 : 249000; // 2 490 NOK / år
    } else if (billingCycle === 'monthly') {
      unitAmount = 12900; // 129 NOK / mnd
    } else {
      unitAmount = 129000; // 1 290 NOK / år
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
              description: `Ren B2B Nettomodell • 0 kr i bookinggebyr • Bedbank CUG Paritetsfritak (${billingCycle === 'annual' ? 'Årskort 1 290 kr' : 'Månedlig 129 kr'})`,
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
