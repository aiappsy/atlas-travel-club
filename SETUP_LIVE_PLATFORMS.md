# Live Platform Onboarding & Production Deployment Guide

This guide details the exact steps to register with the required platforms and make your **HotelsClub** wholesale travel and perks platform live.

---

## 1. Google Cloud & Firebase Setup

### A. Firebase Project Creation
1. Go to the [Firebase Console](https://console.firebase.google.com/).
2. Click **Add project** and name it (e.g. `hotel-club-production`).
3. Under **Authentication** > **Sign-in method**:
   - Enable **Email/Password**.
   - Enable **Google** (add your support email).
4. Under **Firestore Database**:
   - Click **Create database** (choose `us-central1` or your preferred region).
   - Start in **Production mode**.
5. Under **Project Settings** > **General** > **Your apps**:
   - Click the Web icon (`</>`) to register a Web App.
   - Copy the `firebaseConfig` keys into your `.env.local`.

### B. Deploying to Google Cloud Run
From your local terminal:
```powershell
cd C:\Users\paul\.gemini\antigravity\scratch\hotel-club-platform

# 1. Login to Google Cloud
gcloud auth login
gcloud config set project [YOUR_FIREBASE_PROJECT_ID]

# 2. Build container image using Google Cloud Build
gcloud builds submit --tag gcr.io/[YOUR_FIREBASE_PROJECT_ID]/hotel-club-app

# 3. Deploy container to Google Cloud Run
gcloud run deploy hotel-club-app `
  --image gcr.io/[YOUR_FIREBASE_PROJECT_ID]/hotel-club-app `
  --platform managed `
  --region us-central1 `
  --allow-unauthenticated
```

---

## 2. Wholesale Travel B2B Provider Registration

To connect real-time wholesale hotel inventories without individual property contracts, register with one of the primary travel bedbanks:

### A. Amadeus for Developers (Instant Self-Service)
1. Go to [Amadeus for Developers](https://developers.amadeus.com/).
2. Click **Register** for a free developer account.
3. Under **My Self-Service Workspace**, click **Create New App**.
4. Copy your **API Key** and **API Secret**.
5. Set the keys in your `.env.local`:
   ```env
   TRAVEL_API_KEY=your_amadeus_api_key
   TRAVEL_API_SECRET=your_amadeus_api_secret
   ```

### B. Hotelbeds / APItude (Wholesale Bedbank)
1. Go to [Hotelbeds Developer Portal](https://developer.hotelbeds.com/).
2. Register for a partner developer sandbox.
3. Apply for live B2B wholesale rates once testing is complete.

---

## 3. Stripe Subscriptions & Billing Setup

1. Go to [Stripe Dashboard](https://dashboard.stripe.com/register).
2. Create recurring membership pricing products:
   - **Silver Club**: $9.99/month or $89/year
   - **Gold VIP**: $19.99/month or $179/year
   - **Platinum Elite**: $39.99/month or $349/year
3. Copy your **Publishable Key** and **Secret Key** into `.env.local`.

---

## 4. Environment Variables Checklist (`.env.local`)

```env
# Google Firebase Client
NEXT_PUBLIC_FIREBASE_API_KEY=AIzaSy...
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=hotel-club-production.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=hotel-club-production
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=hotel-club-production.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=...
NEXT_PUBLIC_FIREBASE_APP_ID=...

# Travel API Keys (Amadeus / Hotelbeds)
TRAVEL_API_KEY=...
TRAVEL_API_SECRET=...

# Stripe Billing
STRIPE_PUBLIC_KEY=pk_live_...
STRIPE_SECRET_KEY=sk_live_...
```
