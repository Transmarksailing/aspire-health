import type { Supplement } from "@/lib/types";

export interface SupplierLink {
  naam: string;
  url: string;
}

// Zoekterm voor webshops: Engelse naam (internationaal) of de Nederlandse naam.
function term(s: Supplement): string {
  return encodeURIComponent(s.naamEn ?? s.naam);
}

/** Directe Amazon.es-zoeklink voor dit supplement. */
export function amazonEsUrl(s: Supplement): string {
  return `https://www.amazon.es/s?k=${term(s)}`;
}

/**
 * Vijf leveranciers per supplement als werkende zoeklinks (incl. Amazon.nl).
 * (Zoeklinks i.p.v. vaste productpagina's, zodat ze altijd kloppen en up-to-date zijn.)
 * In de webshop kun je op prijs sorteren; de echte goedkoopste prijs die wij kennen
 * (Amazon.es) staat in de prijstabel, goedkoopste eerst.
 */
export function suppliers(s: Supplement): SupplierLink[] {
  const t = term(s);
  return [
    { naam: "Amazon.nl", url: `https://www.amazon.nl/s?k=${t}` },
    { naam: "Amazon.es", url: `https://www.amazon.es/s?k=${t}` },
    { naam: "Bol.com", url: `https://www.bol.com/nl/nl/s/?searchtext=${t}` },
    { naam: "iHerb", url: `https://nl.iherb.com/search?kw=${t}` },
    { naam: "Vitakruid", url: `https://www.vitakruid.nl/zoeken?q=${t}` },
  ];
}
