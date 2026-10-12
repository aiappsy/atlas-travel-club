import { NextRequest, NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe';
import { db } from '@/lib/firebase';
import { doc, updateDoc, setDoc, getDoc } from 'firebase/firestore';

export const dynamic = 'force-dynamic';

export async function POST(req: NextRequest) {
  try {
    if (!stripe) {
      return NextResponse.json({ error: 'Stripe not initialized' }, { status: 500 });
    }

    const sig = req.headers.get('stripe-signature');
    const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

    const rawBody = await req.text();
    let event: any;

    if (webhookSecret && sig) {
      try {
        event = stripe.webhooks.constructEvent(rawBody, sig, webhookSecret);
      } catch (err: any) {
        console.error('Webhook signature verification failed:', err.message);
        return NextResponse.json({ error: `Webhook Error: ${err.message}` }, { status: 400 });
      }
    } else {
      // In development / test without webhook signing secret
      event = JSON.parse(rawBody);
    }

    // Handle checkout session completion
    if (event.type === 'checkout.session.completed') {
      const session = event.data.object;
      const metadata = session.metadata || {};
      const userId = metadata.userId;
      const tierId = metadata.tierId || 'gold';
      const customerEmail = session.customer_email || session.customer_details?.email;
      const customerName = session.customer_details?.name || 'VIP Member';

      console.log(`[Stripe Webhook] Membership payment completed for ${customerEmail} (Tier: ${tierId})`);

      if (userId && userId !== 'guest' && db) {
        try {
          const userRef = doc(db, 'users', userId);
          const userSnap = await getDoc(userRef);

          if (userSnap.exists()) {
            await updateDoc(userRef, {
              membershipStatus: 'active',
              tier: tierId,
              role: 'vip',
              validUntil: 'Dec 31, 2026',
              stripePaymentId: session.payment_intent || session.id,
              upgradedAt: new Date().toISOString(),
            });
          } else {
            await setDoc(userRef, {
              uid: userId,
              email: customerEmail || '',
              displayName: customerName,
              memberId: `HC-${Math.floor(1000 + Math.random() * 9000)}-VIP`,
              role: 'vip',
              tier: tierId,
              membershipStatus: 'active',
              validUntil: 'Dec 31, 2026',
              lifetimeSavings: 0,
              totalBookings: 0,
              createdAt: new Date().toISOString().split('T')[0],
              stripePaymentId: session.payment_intent || session.id,
            });
          }
        } catch (dbErr) {
          console.warn('Firestore update on Stripe webhook failed:', dbErr);
        }
      }
    }

    return NextResponse.json({ received: true });
  } catch (err: any) {
    console.error('Stripe webhook processing error:', err);
    return NextResponse.json(
      { error: err?.message || 'Webhook processing failed' },
      { status: 500 }
    );
  }
}
