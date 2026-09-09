# ATLAS Operational Training Manual

## Role: General App & Platform Operations Manager
**Badge**: Operations & Business Execution
**Target Audience**: General managers, operations directors, and customer support leads running daily ATLAS platform operations.

### Executive Summary
The operational runbook for executing daily health checks, Sovereign Vault dividend calculations, metal card fulfillment dispatch, Pruvo price-drop refund audits, and VIP dispute escalation.

---

## Chapter 1: Daily Operations Runbook & Health Checks (Est. Reading Time: 12 mins)

### 1.1 08:00 UTC Morning Operational Checklist
Every morning, the Platform Operations Manager must execute the following 5-point health check:
1. **API Gateway Status**: Verify all 20+ supplier health bars are green in the Admin Console.
2. **Rate Parity Variance Audit**: Review automated price comparison scans. Ensure our wholesale rates are at least 15% to 60% below Expedia/Booking.com.
3. **Booking Reconciliation**: Match reservations booked in ATLAS against bedbank supplier confirmations.
4. **Stripe Issuing Balance**: Confirm operating balance has at least $50,000 for member card spending.
5. **AI Concierge Audit**: Review unresolved VIP concierge tickets on Telegram and WhatsApp.

### Operator Action Checklist:
- [ ] Open Admin Console at /admin and inspect System Health Tab
- [ ] Verify live FX exchange rates are updated
- [ ] Confirm all overnight bookings have confirmed B2B voucher numbers

---

## Chapter 2: Sovereign Vault Dividend Calculations & Batch Payouts (Est. Reading Time: 16 mins)

### 2.1 The 20% Profit-Sharing Model
Unlike public OTAs that pocket 100% of profits, ATLAS pools **20% of net company profits** into the Sovereign Dividend Vault to distribute back to members annually.

### 2.2 Dividend Formula
`Member Dividend = (Individual Annual Spend / Total Club Member Spend) * Total Vault Pool`

### 2.3 Executing Batch Payouts
1. In Admin Console > **Sovereign Vault Manager**:
2. Click **"Calculate Quarterly Allocations"**.
3. Review audit table of qualifying members and their dividend amounts.
4. Click **"Execute Batch Payout via Wise / Stripe"** or deposit directly onto the member's ATLAS Visa card balance.

### Operator Action Checklist:
- [ ] Run quarterly Sovereign Vault audit calculation
- [ ] Verify member wallet balances match transaction logs
- [ ] Execute batch dividend distribution and send push notifications

---

## Chapter 3: Metal Visa Card Fulfillment Dispatch & VIP Tiering (Est. Reading Time: 10 mins)

### 3.1 Physical Metal Card Specifications
- **Material**: 18-gram Matte Black Stainless Steel with Laser-Etched Member Name & ID.
- **NFC Technology**: Embedded dual-interface chip supporting contactless tap-to-pay and Apple/Google Wallet provisioning.

### 3.2 Fulfillment Workflow
1. When a member reaches VIP or Patron tier, a card production ticket is generated in Admin Console.
2. Verify shipping address and member name spelling.
3. Dispatch engraving payload to our manufacturing partner (CompoSecure / Idemia).
4. Enter DHL / FedEx Express tracking number into the member record to trigger shipping notifications.

### Operator Action Checklist:
- [ ] Review pending physical card dispatch requests in Admin Console
- [ ] Validate member shipping addresses and engraving text
- [ ] Assign courier tracking numbers and notify members

---

## Chapter 4: Pruvo Price-Drop Audits & Customer Support Escalations (Est. Reading Time: 14 mins)

### 4.1 Automated Price-Drop Refund Processing
1. When Pruvo detects a lower rate for an existing reservation, the system automatically creates a rebooking request.
2. The Operations Manager reviews the savings delta in Admin Console > **Price Drop Refunds**.
3. Approve rebooking: Old reservation is cancelled (under free cancellation terms) and new reservation is confirmed.
4. 50% of the savings is credited to the member's wallet, and 50% is added to the Sovereign Vault pool.

### 4.2 Handling Check-in Inquiries
If a hotel front desk claims they cannot find a reservation under the member's name:
- Explain that the reservation is booked through the wholesale B2B bedbank allotment (e.g., Hotelbeds / WebBeds).
- Instruct the front desk agent to search by the **Bedbank Confirmation Reference Number** listed on the B2B Wholesale Voucher.

### Operator Action Checklist:
- [ ] Audit pending Pruvo price-drop alerts and approve savings splits
- [ ] Provide immediate concierge support for check-in voucher inquiries
- [ ] Maintain 99.8% customer satisfaction rating on VIP support desk

---

