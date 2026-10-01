# ATLAS Travel Club — Immutable Agent Engineering Rules

> **MANDATORY INSTRUCTION FOR ALL AI CODING AGENTS**:  
> Read and strictly obey these rules before making ANY change to this codebase.  
> These rules were established directly with the product owner and cannot be overridden, bypassed, or modified without explicit user consent.

---

## 1. User Flow & Modal-First Navigation (STRICT)
* **Search Feed Click Behavior**: When a user clicks ANY hotel card, title, image, or OTA rate card (Booking.com, Expedia, Hotels.com, Agoda) in the search results (`LiveHotelSearch.tsx`), it **MUST ALWAYS open the Google Market Audit Modal** (`setAuditingHotel(hotel)`).
* **Zero External Redirects from Search**: Never redirect the user off-site from the search feed. All external comparisons occur ONLY inside the Audit Modal.
* **On-Site Booking**: Clicking "Lock In Wholesale Rate" or any member booking CTA must remain 100% inside ATLAS to complete the reservation.

---

## 2. Direct OTA Verification Links (STRICT)
Inside the Audit Modal (`GoogleMarketAuditModal.tsx`), when a user clicks an OTA verification button, it must route **directly and exclusively** to that brand's official website with hotel name and stay dates pre-filled:
* **Expedia** ➔ `https://www.expedia.com/Hotel-Search?destination=[Hotel, City]&startDate=[In]&endDate=[Out]&adults=[N]&rooms=[M]`
* **Hotels.com** ➔ `https://www.hotels.com/Hotel-Search?destination=[Hotel, City]&startDate=[In]&endDate=[Out]&adults=[N]&rooms=[M]`
* **Agoda** ➔ `https://www.agoda.com/en-us/search?text=[Hotel, City]&checkIn=[In]&checkOut=[Out]&rooms=[M]&adults=[N]&currency=[CURR]`
* **Booking.com** ➔ `https://www.booking.com/searchresults.html?ss=[Hotel, City]&checkin=[In]&checkout=[Out]&group_adults=[N]&no_rooms=[M]&selected_currency=[CURR]`
* **Kayak** ➔ `https://www.kayak.com/hotels/[Hotel, City]/[In]/[Out]/[N]adults`
* **Google Hotels** ➔ Only when the user specifically clicks "Google Hotels" or "Open on Google Travel ↗".
* **FORBIDDEN**: NEVER route Expedia, Hotels.com, or Agoda buttons to Google Travel (`google.com/travel/search`) or any other intermediary.

---

## 3. Query Sanitization & Clean Destination Formatting
* **No Name Duplication**: Hotel search queries must never duplicate city names (e.g. `"The Plaza Hotel New York New York"` is forbidden; use `"The Plaza Hotel, New York"`).
* **No Brand Affixes in Search**: Never append OTA brand names (e.g. `"Expedia"`, `"Hotels.com"`) to search queries.

---

## 4. Pricing Integrity & Wholesale Math Invariants
* **Landmark Realism**: Iconic ultra-luxury landmarks (e.g., The Plaza, The St. Regis NY, Burj Al Arab, Hôtel Ritz Paris, The Savoy) must have authentic baseline rates (\$1,600–\$2,100/nt) reflecting live market rates on Booking.com.
* **Guaranteed Wholesale Discount**: ATLAS Wholesale rate must ALWAYS remain **28% to 42% below** the lowest public retail OTA rate.
* **Positive Financial Figures**:
  - Member savings must ALWAYS be positive.
  - Taxes and fees must ALWAYS be positive.
  - Negative savings or negative taxes are strictly prohibited.
* **Fee Transparency**: Display the 3.5% payment processing fee disclaimer clearly; never hide markups.

---

## 5. Scope Containment & Zero Unsolicited "Refactoring"
* **Touch Only What Was Asked**: Modify only the exact file and lines needed to resolve the requested issue or feature.
* **Preserve Working Logic**: Never touch, "refactor", "optimize", or modernize existing working code without explicit user instruction.
* **Ask Before Deviating**: If an external API is down, rate-limited, or quota-exhausted (e.g. SerpApi), notify the user immediately. **Never silently invent an alternative workaround.**

---

## 6. Verification Protocol Before Declaring Done
Before reporting any task complete to the user:
1. Run `npx tsc --noEmit` and ensure `0` TypeScript errors.
2. Run an end-to-end automated test against the relevant API endpoints or components.
3. Display the exact output (actual URLs generated, actual prices calculated) in the response as proof.

---

## 7. Dual Remote Git Synchronization
Every commit must be pushed to both remotes:
1. `origin` ➔ `https://github.com/aiappsy/atlastravelnewfromaistudio.git`
2. `atlas-repo` ➔ `https://github.com/aiappsy/atlas-travel-club.git`
Working tree must remain clean.
