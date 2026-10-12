# Deployment & Arkitektur: ATLAS Travel Club

Dette prosjektet inneholder den fullstendige ATLAS Travel Club-plattformen (Next.js 14, 71 ruter, tospråklig NO/EN, søkemotorer).

## Live URL-er
* **Showcase / Demo URL:** [https://atlasclub.web.app](https://atlasclub.web.app)
* **Prelaunch (Produksjon / Hoveddomene):** [https://atlastravelclub.com](https://atlastravelclub.com) -> [https://atlaslaunch.web.app](https://atlaslaunch.web.app) (urørt, dedikert hosting-site `atlaslaunch`)

## Hvordan bygge og rulle ut oppdateringer til atlasclub

Når du gjør endringer i kildekoden her:
```bash
npm run build
firebase deploy --only hosting
```
Dette ruller kun ut til `atlasclub.web.app` via Firebase Web Frameworks og Cloud Function `ssratlasclub`, og vil **aldri** overskrive prelaunch-siden (`atlaslaunch`).
