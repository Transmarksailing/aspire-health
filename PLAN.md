# Aspire — Projectplan

> Status: **GOEDGEKEURD door Mark (2026-06-19)** — start Fase 1 zodra inputs binnen zijn
> Naam: **Aspire** · Huisstijl: **Pyramide** (assets nog aan te leveren)
> Stack: Next.js 16 + React 19 + Tailwind 4 + TypeScript (PWA, installeerbaar op telefoon)
> Databron: curated basis → AI-aanvulling → scraping (leveranciers/prijzen) in latere fase

## Nog aan te leveren door Mark
- [ ] **Eigen supplementenlijst** → in `data-input/` (csv / foto / tekst, maakt niet uit)
- [ ] **Pyramide huisstijl** → in `brand/` (logo, kleuren/hexcodes, lettertype, voorbeelden)

---

## 1. Visie

Eén app waar je:
- **alle voedingssupplementen** vindt met **wanneer** je ze moet innemen,
- **overlap** ziet (dubbele werkzame stoffen / teveel van het goede),
- **prijzen** vergelijkt tussen leveranciers,
- per **aandoening** ziet welke supplementen bijzonder geschikt zijn,
- **gezonde voeding** terugvindt (10 beste / 10 slechtste),
- en **leefstijl-protocollen** ontdekt (vasten, Blue Zones, Bryan Johnson, meditatie, etc.).

Onderbouwd met **studies/bronnen**, met **AI-assistent** voor persoonlijk advies.

---

## 2. Belangrijk uitgangspunt — disclaimer & veiligheid

> Dit is een **informatie- en overzichtsapp**, geen medisch advies. Bij aandoeningen
> (Alzheimer, kanker, obesitas, etc.) en bij medicijngebruik altijd verwijzen naar arts.

- Duidelijke disclaimer op elke aandoening-/ziektepagina.
- Interactie-waarschuwingen (supplement ↔ medicijn ↔ supplement) waar bekend.
- Bronnen/studies altijd vermelden, met datum en betrouwbaarheidsniveau.

---

## 3. Datamodel (de kern van de app)

Alles draait om een goede, uitbreidbare dataset. Voorstel (TypeScript types, opgeslagen als JSON):

```
Supplement
  id, naam (NL/EN), categorie (vitamine/mineraal/kruid/aminozuur/...)
  werkzameStoffen[]            // voor overlap-detectie
  doseringStandaard, eenheid
  innameMomenten[]             // ochtend/middag/avond/nuchter/bij maaltijd/voor slapen
  innameTips                   // bv. "met vet voor opname", "niet met koffie"
  geschiktVoor[]               // aandoening-id's
  doelgroepen[]                // kinderen / sporters / ouderen / zwangeren
  interacties[]                // met medicijnen / andere supplementen
  bijwerkingen, contra-indicaties
  bronnen[]                    // studie-id's
  prijzen[]                    // {leverancier, prijs, eenheidsprijs, url, datum}

Aandoening
  id, naam, beschrijving, aanbevolenSupplementen[], leefstijlTips[], bronnen[]

Voedingsmiddel
  id, naam, type (top10-goed / top10-slecht / functioneel), waarom,
  categorie (voeding / vleesvervanger / bottenbouillon / superfood)
  merk?, voedingsstoffen[], bronnen[]
  // bv. bottenbouillon van RealRoots → categorie "bottenbouillon", merk "RealRoots"

Leverancier
  id, naam, land, website, betrouwbaarheid

Studie / Bron
  id, titel, jaar, auteurs, type (RCT/meta-analyse/observationeel), link, samenvatting

LeefstijlProtocol
  id, naam (vasten/Blue Zones/Bryan Johnson/meditatie/...), beschrijving,
  stappen[], voordelen, risico's, bronnen[]
```

Overlap-detectie werkt op **werkzameStoffen**: als twee gekozen supplementen dezelfde
stof bevatten → waarschuwing + opgetelde dosering vs. veilige bovengrens.

---

## 4. Fasering

### Fase 1 — MVP (eerste werkende versie)
**Doel: bruikbaar overzicht + de 3 kernfuncties.**
- [ ] Project-setup (Next.js PWA, Tailwind, NL-UI)
- [ ] Curated dataset van **top 30-50 supplementen** (handmatig + AI, door jou gecheckt)
- [ ] **Supplementen-overzicht**: zoeken, filteren (categorie/doelgroep/aandoening)
- [ ] **Detailpagina** per supplement (timing, dosering, tips, bronnen)
- [ ] **Inname-schema**: kies jouw supplementen → dagschema (ochtend/avond/nuchter…)
- [ ] **Overlap-check**: waarschuwing bij dubbele stoffen / te hoge totaaldosering
- [ ] **Prijsvergelijking** (eerst handmatig ingevoerde prijzen)
- [ ] Disclaimer + bronnenvermelding
- [ ] Installeerbaar als PWA op telefoon

### Fase 2 — Voeding, aandoeningen & meldingen
- [ ] **10 beste / 10 slechtste voedingsmiddelen** met onderbouwing
- [ ] **Gezonde voedingsstoffen**-overzicht
- [ ] **Functionele voeding**: vleesvervangers, **bottenbouillon (RealRoots)**, superfoods
- [ ] **Aandoeningen-overzicht** → welke supplementen + leefstijl per aandoening
  (start algemeen; ziekte-specifiek zoals Alzheimer/kanker/obesitas met extra disclaimer)
- [ ] **Doelgroepen**: kinderen / sporters / ouderen / spieropbouw
- [ ] **Tips & tricks** voor gezond leven
- [ ] **Gezondheidsmeldingen** (zie §4b): beweeg-reminder elke 20 min + hydratie-reminder
  + (optioneel) inname-reminders gekoppeld aan het inname-schema (zie §8)

### Fase 3 — Leveranciers & live prijzen (scraping)
- [ ] **Leveranciers in kaart** brengen
- [ ] **Live prijzen scrapen** (Apify) + eenheidsprijs-vergelijking
- [ ] **"Online kopen"**-links per supplement
- [ ] Prijs-historie / prijsalert (optioneel)

### Fase 4 — Leefstijl & langer leven
- [ ] **Vasten**: intermittent fasting + water-vasten (Dr. Pradip Jamnadas), autofagie
- [ ] **Blue Zones** principes
- [ ] **Bryan Johnson** (biologisch verjongen) protocol-overzicht
- [ ] **Michael Snyder** (continue monitoring/wearables) inzichten
- [ ] **Meditatie, natuurgeneeskunde, geluidsgolven**
- [ ] **Ziektepreventie & levensverlenging** ("longevity hacks")
- [ ] **Helder denken** (cognitie/nootropics)

### Fase 5 — Studies & AI
- [ ] **Studies-database** doorzoekbaar, gekoppeld aan supplementen/aandoeningen
- [ ] **AI-assistent** ("welke supplementen passen bij mijn situatie?") — Haiku/Sonnet,
  conform credit-besparing, met disclaimer en bronnen
- [ ] Persoonlijk profiel (leeftijd/doelen/aandoeningen) → advies-op-maat (lokaal opgeslagen)

---

## 4b. Gezondheidsmeldingen (reminders)

Meldingen die de app gedurende de dag stuurt:

- **Beweeg-reminder** — standaard **elke 20 minuten**: "Even opstaan & bewegen 🚶"
- **Hydratie-reminder** — instelbaar interval (bv. elk uur): "Tijd om water te drinken 💧"
- **Inname-reminder** (optioneel) — gekoppeld aan jouw inname-schema, op de gekozen
  momenten (ochtend/avond/nuchter…)

**Instellingen (lokaal opgeslagen):**
- Aan/uit per type melding
- Interval aanpasbaar (beweeg standaard 20 min; hydratie standaard 60 min)
- **Alleen tijdens werkuren** — standaard AAN (Mark's keuze). Werkvenster instelbaar,
  default bv. 09:00–18:00, ma–vr. Buiten werkuren geen meldingen.
- **Stille uren** als extra grens (bv. 22:00–07:00)

**Technisch (PWA):**
- `Notification` API + toestemming vragen (eenmalig, met duidelijke uitleg)
- Service worker voor meldingen ook als de app op de achtergrond staat
- Interval-scheduling via service worker; fallback met in-app timer als de browser
  achtergrond-meldingen beperkt (iOS Safari is hierin beperkt → eerlijk communiceren:
  betrouwbaarst werkt het met de app open/geïnstalleerd)
- Geen server nodig in Fase 1/2 (alles client-side)

> Let op iOS: web-push/achtergrondmeldingen werken alleen bij een **geïnstalleerde** PWA
> en zijn beperkter dan op Android. We bouwen het robuust en communiceren de grenzen.

## 5. Technische opzet (Fase 1)

```
aspire/
  brand/                  # Pyramide huisstijl (aan te leveren door Mark)
  data-input/             # ruwe input (Mark's supplementenlijst)
  src/
    app/                  # Next.js app router (NL routes)
      page.tsx            # home / overzicht
      supplement/[id]/    # detailpagina
      schema/             # inname-schema + overlap-check
      prijzen/            # prijsvergelijking
    components/           # UI-componenten
    lib/
      data/               # supplementen.json, aandoeningen.json, ...
      types.ts            # datamodel-types
      overlap.ts          # overlap-/dosering-logica
    styles/
  public/
    manifest.json         # PWA
    icons/
```

- **NL-UI**, code in Engels (workspace-conventie).
- Statische export (zoals `spanish-course`) → makkelijk hosten.
- Data als JSON in repo (later evt. database als het groeit).
- Let op: nieuwe content registreren waar nodig (vgl. spanish-course content-registratie).

---

## 6. Beslissingen (vastgelegd 2026-06-19)

1. ✅ **Naam**: Aspire
2. ✅ **Huisstijl**: Pyramide (assets nog aan te leveren in `brand/`)
3. ✅ **Supplementenlijst**: Mark levert eigen lijst aan (in `data-input/`); aanvullen met AI
4. ✅ **Meldingen**: alleen tijdens werkuren
5. ✅ **Extra inhoud**: functionele voeding — vleesvervangers + bottenbouillon (RealRoots)
6. ⏳ **Prijzen/leveranciers Fase 1**: nog te bepalen (bv. Bol, iHerb, Vitakruid, Amazon)
7. ⏳ **AI-adviseur (Fase 5)**: nog te bevestigen of gewenst

---

## 7. Voorstel: wat ik nu als eerste bouw (na jouw OK)

Fase 1 MVP, in deze volgorde:
1. Project-setup + datamodel-types + PWA-skeleton
2. Dataset van ~10 supplementen als startpunt (jij checkt, dan vullen we aan tot 30-50)
3. Overzicht + detailpagina
4. Inname-schema + overlap-check
5. Prijsvergelijking (handmatige prijzen)

→ Daarna live demo op je telefoon, en we breiden fase voor fase uit.
