# Aspire Wealth

Gezondheids-PWA voor supplementen, inname-timing, overlap-check, prijzen en gezond leven.
Gebouwd met Next.js (static export) en gehost op **GitHub Pages**.

> ⚕️ Informatie-app, **geen medisch advies**. Bij klachten/medicijngebruik: raadpleeg een arts.

## Lokaal draaien

```bash
npm install
npm run dev      # http://localhost:3000
```

## Online zetten via GitHub Pages (stap voor stap)

> Belangrijk: noem de GitHub-repo **`aspire-health`** (dat matcht het pad `/aspire-health`
> in `next.config.ts`). Wil je een andere naam? Pas dan `basePath` in `next.config.ts` aan.

1. Maak op GitHub een nieuwe repository met de naam **`aspire-health`**.
2. Push deze map naar die repo (zie hieronder).
3. Ga in de repo naar **Settings → Pages**.
4. Zet bij **Build and deployment → Source** op **GitHub Actions**.
5. Klaar. Bij elke push naar `main` bouwt en publiceert de workflow
   (`.github/workflows/deploy.yml`) de site automatisch.
6. De site komt online op: `https://<jouw-gebruikersnaam>.github.io/aspire-health/`

### Eerste keer pushen

```bash
cd aspire
git init
git add .
git commit -m "Aspire Wealth Fase 1"
git branch -M main
git remote add origin https://github.com/<jouw-gebruikersnaam>/aspire-health.git
git push -u origin main
```

## Wat zit er in Fase 1

- Supplementen-overzicht met zoeken en filteren
- Detailpagina per supplement (dosering, inname-timing, tips, prijzen, waarschuwingen)
- "Mijn schema": kies supplementen → dagschema per inname-moment + **overlap-check**
- Prijsvergelijking (handmatige voorbeeldprijzen)
- **Gezondheidsmeldingen**: beweeg- (elke 20 min) en hydratie-reminder, alleen tijdens
  werkuren (instelbaar via de 🔔-knop)
- Installeerbaar als app (PWA)

## Structuur

- `src/lib/types.ts` — datamodel
- `src/lib/data/supplements.ts` — de dataset (uitbreiden/aanpassen hier)
- `src/lib/overlap.ts` — overlap- en schema-logica
- `src/app/` — pagina's
- `src/components/` — UI + meldingen + PWA
