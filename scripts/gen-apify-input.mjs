// Genereert de Apify-input (zoek-URL's voor Amazon.es) per supplement.
import { writeFileSync } from "node:fs";

// id -> Amazon.es zoekterm (Spaans/Engels/Latijn werkt goed op amazon.es)
const terms = {
  "vitamine-d3": "vitamina D3 2000",
  "vitamine-k2": "vitamina K2 MK7",
  "omega-3": "omega 3 aceite de pescado",
  magnesium: "magnesio suplemento",
  knoflook: "ajo capsulas garlic",
  meidoorn: "espino blanco hawthorn",
  nattokinase: "nattokinase nattokinasa",
  curcumine: "curcuma curcumina",
  "ginkgo-biloba": "ginkgo biloba",
  ashwagandha: "ashwagandha KSM-66",
  q10: "coenzima Q10 ubiquinol",
  mariadistel: "cardo mariano",
  zink: "zinc suplemento",
  shilajit: "shilajit",
  cbd: "aceite CBD",
  "vitamine-c": "vitamina C 1000",
  "vitamine-b12": "vitamina B12 metilcobalamina",
  ijzer: "hierro suplemento iron",
  calcium: "calcio suplemento",
  probiotica: "probioticos",
  psyllium: "psyllium plantago",
  "glucosamine-chondroitine": "glucosamina condroitina",
  "saw-palmetto": "saw palmetto sabal",
  cranberry: "arandano rojo cranberry",
  "black-cohosh": "cimicifuga black cohosh",
  melatonine: "melatonina",
  valeriaan: "valeriana",
  "l-tryptofaan": "l-triptofano",
  "lions-mane": "melena de leon lions mane",
  reishi: "reishi ganoderma",
  "groene-thee": "te verde extracto green tea",
  collageen: "colageno hidrolizado",
  foliumzuur: "acido folico",
  selenium: "selenio selenium",
  luteine: "luteina zeaxantina",
  rhodiola: "rhodiola rosea",
  chroom: "cromo picolinato",
};

const urls = Object.entries(terms).map(([id, term]) => ({
  url: `https://www.amazon.es/s?k=${encodeURIComponent(term)}`,
  // we hangen het id mee zodat we de resultaten kunnen terugkoppelen
  method: "GET",
  userData: { id },
}));

const input = {
  categoryOrProductUrls: urls,
  maxItemsPerStartUrl: 3,
  language: "es",
  scrapeProductDetails: true,
};

writeFileSync("/tmp/apify-input.json", JSON.stringify(input));
console.log("count:", urls.length);
console.log(JSON.stringify(input));
