import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

export const dynamic = 'force-dynamic';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { companyName, contactName, contactEmail, contactPhone, agreementType, employeeCount } = body;

    if (!companyName || !contactEmail) {
      return NextResponse.json(
        { error: 'Firmanavn og e-post er påkrevd' },
        { status: 400 }
      );
    }

    const docData = {
      companyName: String(companyName).trim(),
      contactName: String(contactName || '').trim(),
      contactEmail: String(contactEmail).trim().toLowerCase(),
      contactPhone: String(contactPhone || '').trim(),
      agreementType: agreementType || 'employer_sponsored',
      employeeCount: Number(employeeCount) || 50,
      status: 'new',
      platform: 'ATLAS B2B Enterprise',
      createdAt: new Date().toISOString(),
    };

    try {
      await addDoc(collection(db, 'b2b_inquiries'), {
        ...docData,
        timestamp: serverTimestamp(),
      });
    } catch (firestoreError) {
      console.warn('Notice: Firestore lead save fallback to local logging:', firestoreError);
    }

    return NextResponse.json({
      success: true,
      message: 'Forespørsel om bedriftsavtale er registrert',
      inquiry: docData,
    });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || 'Server error' }, { status: 500 });
  }
}
