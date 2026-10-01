# ATLAS Travel Club — System Rules & Operational Standards

> **PRIMARY DIRECTIVE**:
> The primary business objective of ATLAS Travel Club is twofold:
> 1. **Front-End**: Flawless, verified credibility to drive signups and paying subscribers.
> 2. **Members Area**: Absolute delight, transparency, and authentic wholesale rates to keep members happy and retained.
>
> Any sloppy rates, broken links, fake hotel names, or unsolicited refactors destroy credibility and are strictly forbidden.

---

## 1. Navigation Flow (Zero External Redirects from Search)
* In `LiveHotelSearch.tsx`, clicking ANY hotel card, image, title, or OTA rate card (Booking.com, Expedia, Hotels.com, Agoda) **MUST ALWAYS open the Audit Modal (`setAuditingHotel(hotel)`)**.
* Never redirect the user off-site from the search feed. All external comparisons occur ONLY inside the Audit Modal.
* Clicking "Lock In Wholesale Rate" must remain 100% inside ATLAS to complete the booking.

## 2. Direct OTA Verification Links
Inside `GoogleMarketAuditModal.tsx`, clicking an OTA button must link directly to that brand's official website:
* **Expedia** ➔ `https://www.expedia.com/Hotel-Search?destination=...`
* **Hotels.com** ➔ `https://www.hotels.com/Hotel-Search?destination=...`
* **Agoda** ➔ `https://www.agoda.com/en-us/search?text=...`
* **Booking.com** ➔ `https://www.booking.com/searchresults.html?ss=...`
* **Kayak** ➔ `https://www.kayak.com/hotels/...`
* **Google Hotels** ➔ Only when user specifically clicks "Google Hotels".
* **NEVER** route Expedia, Hotels.com, or Agoda to Google Travel or any third party.

## 3. Query Sanitization
* Never duplicate city names in search queries (e.g. `"The Plaza Hotel New York New York"` is forbidden; use `"The Plaza Hotel, New York"`).
* Never append OTA brand names (e.g. `"Expedia"`, `"Hotels.com"`) to hotel search queries.

## 4. Pricing Integrity & Math Invariants
* Landmark hotels (The Plaza, St. Regis, Burj Al Arab, Ritz Paris) must have authentic baseline rates (\$1,600–\$2,100/nt) reflecting live Booking.com prices.
* ATLAS Wholesale rate must ALWAYS remain **28% to 42% below** public retail.
* Member savings and taxes must ALWAYS be positive. Negative figures are strictly prohibited.

## 5. Scope Containment & Zero Unsolicited "Refactoring"
* Modify only the exact files and lines requested.
* Never "refactor", "optimize", or change working components without explicit request.
* If an external API is down or quota-exhausted, notify the user immediately. Never invent silent workarounds.

## 6. Verification Protocol Before Declaring Done
* Run `npx tsc --noEmit` with 0 errors.
* Run end-to-end tests and show exact URLs and prices as proof before declaring completion.

## 7. Dual Remote Git Synchronization
* Always push commits to both `origin` (atlastravelnewfromaistudio) and `atlas-repo` (atlas-travel-club).
