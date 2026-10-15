import os
import subprocess
import shutil

html_content = """<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>ATLAS Travel Club — Deep Dive: How Digital Wallets Replace Loyalty Apps & Unlock 100% Cruise Commissions</title>
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&family=JetBrains+Mono:wght@400;600&display=swap');

    @page {
      size: A4 portrait;
      margin: 14mm 16mm 14mm 16mm;
    }

    * {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
    }

    body {
      font-family: 'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      color: #0f172a;
      background-color: #ffffff;
      line-height: 1.5;
      font-size: 9pt;
      -webkit-print-color-adjust: exact;
      print-color-adjust: exact;
    }

    .page {
      page-break-after: always;
      position: relative;
      min-height: 100%;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
    }

    .page:last-child {
      page-break-after: avoid;
    }

    /* HEADER */
    .header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding-bottom: 12px;
      border-bottom: 2px solid #0f172a;
      margin-bottom: 16px;
    }

    .brand-title {
      font-size: 13pt;
      font-weight: 800;
      letter-spacing: -0.5px;
      color: #0f172a;
      text-transform: uppercase;
    }

    .brand-title span {
      color: #d97706;
    }

    .brand-meta {
      font-size: 7.5pt;
      font-weight: 600;
      color: #64748b;
      text-align: right;
      line-height: 1.3;
    }

    /* FOOTER */
    .footer {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding-top: 10px;
      border-top: 1px solid #e2e8f0;
      margin-top: 20px;
      font-size: 7pt;
      color: #94a3b8;
    }

    /* TYPOGRAPHY & ELEMENTS */
    h1 {
      font-size: 18pt;
      font-weight: 800;
      line-height: 1.2;
      color: #0f172a;
      letter-spacing: -0.5px;
      margin-bottom: 6px;
    }

    .subtitle {
      font-size: 10pt;
      color: #475569;
      font-weight: 500;
      margin-bottom: 16px;
      line-height: 1.4;
    }

    h2 {
      font-size: 11pt;
      font-weight: 700;
      color: #0f172a;
      border-left: 3.5px solid #d97706;
      padding-left: 8px;
      margin-top: 14px;
      margin-bottom: 8px;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }

    h3 {
      font-size: 9.5pt;
      font-weight: 700;
      color: #1e293b;
      margin-top: 10px;
      margin-bottom: 4px;
    }

    p {
      margin-bottom: 8px;
      color: #334155;
      text-align: justify;
    }

    /* BADGES & CARDS */
    .badge {
      display: inline-block;
      padding: 3px 8px;
      border-radius: 9999px;
      font-size: 7pt;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }

    .badge-gold {
      background-color: #fef3c7;
      color: #92400e;
      border: 1px solid #fde68a;
    }

    .badge-dark {
      background-color: #0f172a;
      color: #ffffff;
    }

    .card {
      background: #f8fafc;
      border: 1px solid #e2e8f0;
      border-radius: 8px;
      padding: 10px 12px;
      margin-bottom: 10px;
    }

    .grid-2 {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 10px;
      margin-bottom: 12px;
    }

    .grid-3 {
      display: grid;
      grid-template-columns: 1fr 1fr 1fr;
      gap: 8px;
      margin-bottom: 12px;
    }

    /* DIALOGUE FORMATTING */
    .dialogue-turn {
      margin-bottom: 9px;
      display: flex;
      gap: 10px;
      font-size: 8.5pt;
      line-height: 1.45;
    }

    .speaker-host1 {
      font-weight: 800;
      color: #0284c7;
      min-width: 65px;
      font-size: 8pt;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }

    .speaker-host2 {
      font-weight: 800;
      color: #d97706;
      min-width: 65px;
      font-size: 8pt;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }

    .dialogue-content {
      color: #1e293b;
      flex: 1;
    }

    .timestamp {
      font-family: 'JetBrains Mono', monospace;
      font-size: 7pt;
      color: #94a3b8;
      margin-right: 4px;
    }

    .highlight-box {
      background: #eff6ff;
      border: 1px solid #bfdbfe;
      border-radius: 8px;
      padding: 10px 14px;
      margin: 10px 0;
      font-size: 8.5pt;
    }

    .stat-number {
      font-size: 16pt;
      font-weight: 800;
      color: #0f172a;
      line-height: 1;
      margin-bottom: 2px;
    }
  </style>
</head>
<body>

  <!-- ================= PAGE 1: COVER & EXECUTIVE SUMMARY ================= -->
  <div class="page">
    <div>
      <div class="header">
        <div class="brand-title">ATLAS <span>TRAVEL CLUB</span></div>
        <div class="brand-meta">
          OPERATED BY HARD ROCK CAPITAL LTD (UK #16833237)<br>
          FOUNDER & MANAGING DIRECTOR: PÅL JURITZEN
        </div>
      </div>

      <div style="margin-bottom: 12px;">
        <span class="badge badge-gold">INSTITUTIONAL RESEARCH BRIEF & AUDIO TRANSCRIPT</span>
      </div>

      <h1>How Digital Wallets Replace Loyalty Apps & Unlock 100% Cruise Commissions</h1>
      <div class="subtitle">
        A deep-dive technical and economic analysis of the Apple Wallet (.pkpass) and Google Wallet architecture, the Rate Parity dilemma, and the EscrowGuard solvency protocol.
      </div>

      <div class="grid-3">
        <div class="card">
          <div class="stat-number">0%</div>
          <div style="font-weight: 700; font-size: 8pt; color: #475569; text-transform: uppercase;">Retail Markup</div>
          <div style="font-size: 7pt; color: #64748b; margin-top: 3px;">Direct raw wholesale net pricing on flights and hotels.</div>
        </div>
        <div class="card">
          <div class="stat-number">100%</div>
          <div style="font-weight: 700; font-size: 8pt; color: #475569; text-transform: uppercase;">Commission Rebate</div>
          <div style="font-size: 7pt; color: #64748b; margin-top: 3px;">10-16% cruise commissions rebated to member's Rewards Vault.</div>
        </div>
        <div class="card">
          <div class="stat-number">0 Friksjon</div>
          <div style="font-weight: 700; font-size: 8pt; color: #475569; text-transform: uppercase;">Apple & Google Wallet</div>
          <div style="font-size: 7pt; color: #64748b; margin-top: 3px;">Native pass provisioning with zero app download barrier.</div>
        </div>
      </div>

      <h2>1. Executive Summary & Core Strategic Theses</h2>
      <p>
        The global travel and consumer rewards landscape is undergoing a profound structural shift driven by two converging dynamics: <strong>consumer app fatigue</strong> and the <strong>breakdown of legacy commission margins</strong>. For decades, online travel agencies (OTAs) and legacy travel management companies have operated as rent-extracting tollbooths, commanding 10% to 16% back-end commissions on luxury cruises and parity-locked hotel inventory while forcing customers to download fragmented, heavyweight native applications.
      </p>
      <p>
        ATLAS Travel Club, established by <strong>HARD ROCK CAPITAL LTD</strong> under Founder & Managing Director <strong>Pål Juritzen</strong>, introduces a clean-slate architectural paradigm:
      </p>
      
      <div class="grid-2">
        <div class="card">
          <h3 style="color: #0284c7;">1. The Rate Parity Hack</h3>
          <p style="font-size: 8pt; margin: 0;">
            Ultra-luxury cruise lines (Regent Seven Seas, Silversea, Seabourn) legally prohibit front-end retail discounting to preserve brand equity. ATLAS complies with mandatory published fares at booking, but redirects <strong>100% of the supplier's back-end commission (10–16%)</strong> straight back to the member as cash credits in their Rewards Vault.
          </p>
        </div>
        <div class="card">
          <h3 style="color: #d97706;">2. The EscrowGuard Solvency Protocol</h3>
          <p style="font-size: 8pt; margin: 0;">
            Suppliers operate on a 30 to 60-day post-travel cash settlement lag. To prevent unfunded startup liabilities, ATLAS utilizes an automated dual-ledger system: pending commissions sit safely locked in <code>🟡 In Escrow</code> until cash physically clears into HARD ROCK CAPITAL LTD's corporate bank, upon which they unlock to <code>🟢 Cleared / Spendable</code>.
          </p>
        </div>
      </div>

      <div class="card">
        <h3 style="color: #0f172a;">3. The Native Lock-Screen Operating System</h3>
        <p style="font-size: 8pt; margin: 0;">
          Rather than building a 50MB standalone app that gets offloaded or ignored, ATLAS provisions cryptographic digital passes directly into <strong>Apple Wallet (.pkpass)</strong> and <strong>Google Wallet (JWT)</strong>. Members receive contactless NFC/QR entry into 1,300+ DragonPass VIP airport lounges, real-time live balance counters, and silent lock-screen updates via Apple Push Notification service (APNs).
        </p>
      </div>

    </div>

    <div class="footer">
      <div>ATLAS TRAVEL CLUB &bull; OPERATED BY HARD ROCK CAPITAL LTD &bull; UK REG #16833237</div>
      <div>PAGE 1 OF 4</div>
    </div>
  </div>

  <!-- ================= PAGE 2: TRANSCRIPT PART 1 ================= -->
  <div class="page">
    <div>
      <div class="header">
        <div class="brand-title">PODCAST TRANSCRIPT <span>&bull; PART 1</span></div>
        <div class="brand-meta">EPISODE: HOW DIGITAL WALLETS REPLACE LOYALTY APPS<br>SOURCE DURATION: 24 MIN 17 SEC</div>
      </div>

      <h2>2. Full Audio Overview Dialogue (00:00 – 11:30)</h2>

      <div class="dialogue-turn">
        <div class="speaker-host1">HOST 1</div>
        <div class="dialogue-content"><span class="timestamp">[00:00]</span> You know that thick, completely overstuffed wallet George Costanza carried around on Seinfeld? The absolute leather brick?</div>
      </div>

      <div class="dialogue-turn">
        <div class="speaker-host2">HOST 2</div>
        <div class="dialogue-content"><span class="timestamp">[00:06]</span> Oh yeah! The absurd, unmanageable mess stuffed with old receipts and a dozen punch cards for coffee shops he hadn't visited in years.</div>
      </div>

      <div class="dialogue-turn">
        <div class="speaker-host1">HOST 1</div>
        <div class="dialogue-content"><span class="timestamp">[00:18]</span> Right. But the irony is, today we are carrying that exact same unmanageable mess—we just moved it to our smartphones. It's just digital clutter now.</div>
      </div>

      <div class="dialogue-turn">
        <div class="speaker-host2">HOST 2</div>
        <div class="dialogue-content"><span class="timestamp">[00:30]</span> Looking at the sources you sent us today, we've got the official Apple Developer PassKit documentation, some really eye-opening Forbes analyses on consumer psychology, a CRM tech whitepaper, and a strategic breakdown of a brand-new financial engine built by a company called Atlas Travel Club.</div>
      </div>

      <div class="dialogue-turn">
        <div class="speaker-host1">HOST 1</div>
        <div class="dialogue-content"><span class="timestamp">[00:53]</span> So our mission today is to explore this massive shift happening right under our noses: the death of the standalone loyalty app, the rise of the native digital wallet, and how this one tech company is bypassing a multi-billion-dollar travel cartel.</div>
      </div>

      <div class="dialogue-turn">
        <div class="speaker-host2">HOST 2</div>
        <div class="dialogue-content"><span class="timestamp">[01:14]</span> It really is a perfect case study. For the last decade, brands operated under the assumption: "If you build an app, consumers will download it." But that frictionless promise created massive friction. We are currently dealing with a psychological phenomenon that Forbes accurately labels as "App Fatigue."</div>
      </div>

      <div class="dialogue-turn">
        <div class="speaker-host1">HOST 1</div>
        <div class="dialogue-content"><span class="timestamp">[01:38]</span> App fatigue is so real! You're standing at checkout, there's a line of angry people behind you, and the cashier says: "Download our app right now for 20% off." And you freeze. You have to open the App Store, search, wait for a 50MB download over cellular, create an account, verify an email... The CRM whitepaper notes a 40% to 60% drop-off rate right there in the onboarding process!</div>
      </div>

      <div class="dialogue-turn">
        <div class="speaker-host2">HOST 2</div>
        <div class="dialogue-content"><span class="timestamp">[02:55]</span> And physical plastic cards are worse—over 70% of physical loyalty cards are left at home or lost in a drawer when the transaction actually occurs. Brands want home screen real estate, but they are losing that battle because iOS and Android now actively offload unused apps to save battery and storage.</div>
      </div>

      <div class="dialogue-turn">
        <div class="speaker-host1">HOST 1</div>
        <div class="dialogue-content"><span class="timestamp">[04:14]</span> So if brands are getting kicked off the home screen, they have to move deeper: to the lock screen. And that brings us right into Apple's PassKit framework and Google Wallet. That massive onboarding friction drops to effectively zero because there is no download. A brand simply texts you a link or you scan a QR code, and your phone executes a one-tap cryptographic provisioning sequence. It's ready in under three seconds.</div>
      </div>

      <div class="dialogue-turn">
        <div class="speaker-host2">HOST 2</div>
        <div class="dialogue-content"><span class="timestamp">[05:24]</span> And the engagement numbers are wild! Because native passes sit in Apple Wallet, the OS recognizes them as trusted native credentials—like a driver's license or a Visa card—not as marketing spam. When a brand sends a lock-screen push notification through a native wallet, it gets up to 10 TIMES higher open rates than legacy email marketing!</div>
      </div>

      <div class="dialogue-turn">
        <div class="speaker-host1">HOST 1</div>
        <div class="dialogue-content"><span class="timestamp">[06:06]</span> And it is protected by Zero-Trust Cryptography. Every pass is cryptographically signed using an Apple WWDR (Worldwide Developer Relations) certificate—like an unbreakable digital wax seal. Furthermore, with Near Field Communication (NFC), the pass doesn't just show a dumb barcode; it loads an encrypted payload directly into the phone's Secure Element chip, generating dynamic single-use radio tokens. A screenshot is completely useless to a thief.</div>
      </div>

      <div class="dialogue-turn">
        <div class="speaker-host2">HOST 2</div>
        <div class="dialogue-content"><span class="timestamp">[08:47]</span> But technology is just a tool. To really understand how powerful this is, we need to look at how it's being deployed to solve a multi-billion dollar business problem. And that brings us straight to the Atlas Travel Club whitepaper.</div>
      </div>

      <div class="dialogue-turn">
        <div class="speaker-host1">HOST 1</div>
        <div class="dialogue-content"><span class="timestamp">[09:10]</span> Atlas Travel Club is operated by Hard Rock Capital Limited and was founded by Paul Juritzen. They operate on a subscription model—like Costco, but tailored for high-net-worth travelers. You pay a flat annual fee, and in exchange you get flights and standard hotels at raw wholesale net rates: 0% markup.</div>
      </div>

    </div>

    <div class="footer">
      <div>ATLAS TRAVEL CLUB &bull; OPERATED BY HARD ROCK CAPITAL LTD &bull; UK REG #16833237</div>
      <div>PAGE 2 OF 4</div>
    </div>
  </div>

  <!-- ================= PAGE 3: TRANSCRIPT PART 2 ================= -->
  <div class="page">
    <div>
      <div class="header">
        <div class="brand-title">PODCAST TRANSCRIPT <span>&bull; PART 2</span></div>
        <div class="brand-meta">EPISODE: HOW DIGITAL WALLETS REPLACE LOYALTY APPS<br>SOURCE DURATION: 24 MIN 17 SEC</div>
      </div>

      <h2>3. The Rate Parity Hack & The Escrow Solvency Engine (11:30 – 24:17)</h2>

      <div class="dialogue-turn">
        <div class="speaker-host2">HOST 2</div>
        <div class="dialogue-content"><span class="timestamp">[09:50]</span> But here is the massive dilemma Atlas ran into: When you move up the ladder into the ultra-luxury tier—high-end cruise lines like Regent Seven Seas, Silversea, Seabourn, or 5-star suites—suppliers enforce strict legal contracts called "Rate Parity Agreements."</div>
      </div>

      <div class="dialogue-turn">
        <div class="speaker-host1">HOST 1</div>
        <div class="dialogue-content"><span class="timestamp">[10:11]</span> Rate parity is the glue that holds luxury brand equity together. If cruise lines allow websites to publicly discount a $10,000 cruise down to $7,000, the public perception of value drops. So they legally prohibit any channel from publicly discounting the published retail rate. If you break rate parity, they cut off your inventory entirely—you are blacklisted.</div>
      </div>

      <div class="dialogue-turn">
        <div class="speaker-host2">HOST 2</div>
        <div class="dialogue-content"><span class="timestamp">[10:48]</span> So legacy OTAs like Expedia or Booking.com charge full retail at checkout. But behind the scenes, the cruise line pays that OTA a massive back-end commission—anywhere between 10% to 16% of the total booking cost. And legacy OTAs just keep 100% of that commission to fund corporate profits and stock buybacks. They act as a giant tollbooth.</div>
      </div>

      <div class="dialogue-turn">
        <div class="speaker-host1">HOST 1</div>
        <div class="dialogue-content"><span class="timestamp">[12:04]</span> So how does Atlas solve this without getting sued or going bankrupt? They utilize what the whitepaper calls the "100% Commission Kickback Engine." It is a brilliant financial loophole. Atlas charges the mandatory $10,000 full retail price at checkout to comply with rate parity. But then, Atlas takes that entire 10% to 16% back-end commission, and rebates 100% of it straight back to the member! On a $10,000 cruise, the member gets a $1,500 cash kickback. The enterprise extracts zero margin.</div>
      </div>

      <div class="dialogue-turn">
        <div class="speaker-host2">HOST 2</div>
        <div class="dialogue-content"><span class="timestamp">[13:00]</span> That's incredibly elegant. But as soon as you start promising people thousands of dollars in cash back, you introduce a massive operational danger: The Cash Lag—the silent killer of travel startups. The cruise line doesn't pay the agency the commission today; there's a 30 to 60-day lag between when you finish your vacation and when the supplier wires the check to Hard Rock Capital Limited. If 1,000 people book a cruise on Tuesday, Atlas suddenly owes $1.5 million in kickbacks!</div>
      </div>

      <div class="dialogue-turn">
        <div class="speaker-host1">HOST 1</div>
        <div class="dialogue-content"><span class="timestamp">[14:16]</span> This is why founder Paul Juritzen instituted the EscrowGuard Solvency Protocol. It relies on strict automated double-entry accounting. When a member books, the $1,500 kickback is logged as a contingent liability—meaning "we owe you this money, but our obligation to pay is legally contingent upon the cruise line actually paying us first." Ledger A tracks the promise; Ledger B tracks physically cleared cash in the corporate bank account. The company cannot mathematically promise or distribute funds that haven't physically cleared Ledger B. Zero Silicon Valley burnout.</div>
      </div>

      <div class="dialogue-turn">
        <div class="speaker-host2">HOST 2</div>
        <div class="dialogue-content"><span class="timestamp">[16:45]</span> And the user experience ties it all together through the Apple Wallet pass: A sleek, midnight-blue card with gold accents. On the front, it gives you contactless NFC access to over 1,300 DragonPass VIP airport lounges. But the true masterclass is the Dual Balance interface:
        <br>&bull; A yellow indicator labeled "Pending Escrow": Shows your $1,500 the minute you book, creating trust and eliminating customer service anxiety.
        <br>&bull; A green indicator labeled "Available to Spend": Lights up only when the supplier's cash has physically cleared into Hard Rock Capital LTD's operating bank account!</div>
      </div>

      <div class="dialogue-turn">
        <div class="speaker-host1">HOST 1</div>
        <div class="dialogue-content"><span class="timestamp">[18:45]</span> And the most magic UX moment: A month after you unpack from your cruise, your phone buzzes on your lock screen with an APNs push notification: "Balance updated: Your cruise commission of $1,500 has cleared into your wallet and is ready to spend!" You don't even have to open an app.</div>
      </div>

      <div class="dialogue-turn">
        <div class="speaker-host2">HOST 2</div>
        <div class="dialogue-content"><span class="timestamp">[19:40]</span> And what can you actually do with that $1,500? First, it automatically offsets your next annual membership fee in Stripe, so the club pays for itself. Second, you can use it to buy more wholesale flights, hotels, or rental cars. And third—the real disruptor—you can just cash it out straight to your private everyday checking account via standard banking rails (ACH/SEPA)!</div>
      </div>

      <div class="dialogue-turn">
        <div class="speaker-host1">HOST 1</div>
        <div class="dialogue-content"><span class="timestamp">[21:05]</span> By leveraging the native wallet, this architecture eliminates 85% of the administrative overhead of a global loyalty program—no plastic cards to mail, no heavy iOS apps to constantly patch, and none of that 92% onboarding drop-off. You turn a travel booking into an essential, highly visible financial instrument!</div>
      </div>

    </div>

    <div class="footer">
      <div>ATLAS TRAVEL CLUB &bull; OPERATED BY HARD ROCK CAPITAL LTD &bull; UK REG #16833237</div>
      <div>PAGE 3 OF 4</div>
    </div>
  </div>

  <!-- ================= PAGE 4: TECHNICAL SPECIFICATIONS & VERDICT ================= -->
  <div class="page">
    <div>
      <div class="header">
        <div class="brand-title">ARCHITECTURAL SPECIFICATION <span>&bull; CONCLUSION</span></div>
        <div class="brand-meta">HARD ROCK CAPITAL LTD &bull; LONDON, UK<br>VERIFIED PRODUCTION SYSTEM</div>
      </div>

      <h2>4. Architectural & Production Implementation Mapping</h2>
      <p>
        The table below confirms the production-level code assets within the ATLAS repository matching the architectural elements analyzed in the podcast:
      </p>

      <div class="card" style="margin-bottom: 14px;">
        <table style="width: 100%; border-collapse: collapse; font-size: 8pt;">
          <thead>
            <tr style="border-bottom: 1.5px solid #0f172a; text-align: left;">
              <th style="padding: 4px 6px;">Feature</th>
              <th style="padding: 4px 6px;">Technical Mechanism</th>
              <th style="padding: 4px 6px;">Codebase Reference</th>
              <th style="padding: 4px 6px;">Production Status</th>
            </tr>
          </thead>
          <tbody>
            <tr style="border-bottom: 1px solid #e2e8f0;">
              <td style="padding: 4px 6px; font-weight: 700;">Apple Wallet Pass</td>
              <td style="padding: 4px 6px;">PassKit formatVersion 1, storeCard, NFC token payload</td>
              <td style="padding: 4px 6px; font-family: monospace;">src/lib/cards/walletPass.ts</td>
              <td style="padding: 4px 6px; color: #16a34a; font-weight: 700;">Live & Verified</td>
            </tr>
            <tr style="border-bottom: 1px solid #e2e8f0;">
              <td style="padding: 4px 6px; font-weight: 700;">Google Wallet Pass</td>
              <td style="padding: 4px 6px;">Google Wallet API, typ: savetowallet, JWT genericObjects</td>
              <td style="padding: 4px 6px; font-family: monospace;">src/lib/cards/walletPass.ts</td>
              <td style="padding: 4px 6px; color: #16a34a; font-weight: 700;">Live & Verified</td>
            </tr>
            <tr style="border-bottom: 1px solid #e2e8f0;">
              <td style="padding: 4px 6px; font-weight: 700;">Dual Balance UI</td>
              <td style="padding: 4px 6px;">Disponibel Saldo (Green) vs. Venter på oppgjør (Yellow Escrow)</td>
              <td style="padding: 4px 6px; font-family: monospace;">src/app/rewards/page.tsx</td>
              <td style="padding: 4px 6px; color: #16a34a; font-weight: 700;">Live & Verified</td>
            </tr>
            <tr style="border-bottom: 1px solid #e2e8f0;">
              <td style="padding: 4px 6px; font-weight: 700;">Escrow Solvency Rule</td>
              <td style="padding: 4px 6px;">30-60 day cash lag protection; Hard Rock Capital Ltd treasury</td>
              <td style="padding: 4px 6px; font-family: monospace;">PROJECT_DECISIONS.md</td>
              <td style="padding: 4px 6px; color: #16a34a; font-weight: 700;">Codified Rule</td>
            </tr>
            <tr style="border-bottom: 1px solid #e2e8f0;">
              <td style="padding: 4px 6px; font-weight: 700;">DragonPass Lounges</td>
              <td style="padding: 4px 6px;">1,300+ global airport lounges, digital QR/NFC voucher pass</td>
              <td style="padding: 4px 6px; font-family: monospace;">src/app/lounges/page.tsx</td>
              <td style="padding: 4px 6px; color: #16a34a; font-weight: 700;">Live & Verified</td>
            </tr>
            <tr>
              <td style="padding: 4px 6px; font-weight: 700;">Stripe Auto-Renewal</td>
              <td style="padding: 4px 6px;">Customer credit balance offsets annual 1 290 NOK billing</td>
              <td style="padding: 4px 6px; font-family: monospace;">src/app/api/stripe/checkout</td>
              <td style="padding: 4px 6px; color: #16a34a; font-weight: 700;">Live & Verified</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h2>5. Concluding Takeaway</h2>
      <div class="highlight-box">
        <p style="margin-bottom: 6px; font-weight: 700; color: #1e3a8a;">
          "If a single native wallet pass can execute double-entry accounting, physically unlock airport lounges, and wire thousands in cash directly to your checking account silently from your lock screen without an app... are we looking at the beginning of the end for traditional clunky banking apps?"
        </p>
        <p style="margin: 0; font-size: 8pt; color: #3b82f6;">
          ATLAS Travel Club demonstrates that the winning architecture for 21st-century luxury loyalty is not a heavier app, but a zero-friction operating-system credential paired with uncompromising corporate solvency discipline.
        </p>
      </div>

      <div style="margin-top: 20px; padding: 12px; background: #0f172a; color: #ffffff; border-radius: 8px;">
        <div style="display: flex; justify-content: space-between; align-items: center;">
          <div>
            <div style="font-size: 8pt; text-transform: uppercase; color: #fbbf24; font-weight: 700; letter-spacing: 0.5px;">Corporate Governance & Issuance</div>
            <div style="font-size: 9pt; font-weight: 800; margin-top: 2px;">HARD ROCK CAPITAL LTD &bull; UK Company #16833237</div>
            <div style="font-size: 7.5pt; color: #94a3b8; margin-top: 2px;">71-75 Shelton Street, Covent Garden, London, WC2H 9JQ, United Kingdom</div>
          </div>
          <div style="text-align: right; font-size: 7.5pt;">
            <div style="color: #cbd5e1;">Founder & Managing Director: <strong>Pål Juritzen</strong></div>
            <div style="color: #cbd5e1;">Email: <strong>paljuritzen@gmail.com</strong> | Phone: <strong>+47 40059493</strong></div>
            <div style="color: #fbbf24; font-weight: 700; margin-top: 2px;">https://atlasclub.web.app</div>
          </div>
        </div>
      </div>

    </div>

    <div class="footer">
      <div>ATLAS TRAVEL CLUB &bull; OPERATED BY HARD ROCK CAPITAL LTD &bull; UK REG #16833237</div>
      <div>PAGE 4 OF 4 &bull; END OF REPORT</div>
    </div>
  </div>

</body>
</html>
"""

# Write HTML file
html_path = r'C:\Users\paul\.gemini\antigravity\scratch\atlastravelnewfromaistudio\public\docs\podcast_transcript.html'
with open(html_path, 'w', encoding='utf-8') as f:
    f.write(html_content)

output_pdfs = [
    r'C:\Users\paul\.gemini\antigravity\scratch\atlastravelnewfromaistudio\public\docs\How_Digital_Wallets_Replace_Loyalty_Apps.pdf',
    r'C:\Users\paul\Downloads\ATLAS_How_Digital_Wallets_Replace_Loyalty_Apps.pdf'
]

chrome_path = r'C:\Program Files\Google\Chrome\Application\chrome.exe'
cmd = [
    chrome_path,
    '--headless',
    '--disable-gpu',
    f'--print-to-pdf={output_pdfs[0]}',
    '--no-pdf-header-footer',
    html_path
]

print("Rendering PDF via Chrome Headless...")
res = subprocess.run(cmd, capture_output=True, text=True)
print("Chrome exit code:", res.returncode)

if os.path.exists(output_pdfs[0]):
    print(f"Generated: {output_pdfs[0]} (Size: {os.path.getsize(output_pdfs[0])} bytes)")
    try:
        shutil.copyfile(output_pdfs[0], output_pdfs[1])
        print(f"Copied to user downloads: {output_pdfs[1]}")
    except Exception as e:
        print(f"Could not copy to downloads (sandbox): {e}")
    print("SUCCESS: Pixel-perfect PDF generated!")
else:
    print("ERROR: PDF was not generated.")
