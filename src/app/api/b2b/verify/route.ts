import { NextRequest, NextResponse } from 'next/server';
import { getOrganizationByEmail, getOrganizationBySlug } from '@/modules/b2b/organizations';

export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
  try {
    const { email, slug } = await request.json();

    if (!email || typeof email !== 'string') {
      return NextResponse.json(
        { success: false, error: 'E-postadresse er påkrevd' },
        { status: 400 }
      );
    }

    if (slug) {
      const org = getOrganizationBySlug(slug);
      if (!org) {
        return NextResponse.json(
          { success: false, error: 'Organisasjonen finnes ikke' },
          { status: 404 }
        );
      }

      const domain = email.split('@')[1]?.toLowerCase().trim();
      const isAllowed = org.allowedEmailDomains.some(
        (d) => d.toLowerCase() === domain
      );

      return NextResponse.json({
        success: isAllowed,
        organization: org,
        verified: isAllowed,
        message: isAllowed
          ? `Verifisert under ${org.name}`
          : `E-postdomenet @${domain} er ikke godkjent for ${org.shortName}`,
      });
    }

    // Auto-detect organization by email domain
    const matchedOrg = getOrganizationByEmail(email);
    if (!matchedOrg) {
      return NextResponse.json({
        success: false,
        verified: false,
        message: 'Ingen aktiv bedriftsavtale funnet for dette e-postdomenet',
      });
    }

    return NextResponse.json({
      success: true,
      verified: true,
      organization: matchedOrg,
      message: `Funnet aktiv bedriftsavtale for ${matchedOrg.name}`,
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error?.message || 'Serverfeil' },
      { status: 500 }
    );
  }
}
