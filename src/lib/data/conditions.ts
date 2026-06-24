import type { Condition } from "@/lib/types";

// Aandoeningen met supplementenadvies. Informatief, GEEN medisch advies.
// Bewuste keuze: ernstige ziektes (kanker, Alzheimer, e.d.) staan hier NIET met
// supplementenadvies — daarvoor verwijst de app naar een arts (zie aandoeningen-pagina).

export const conditions: Condition[] = [
  {
    id: "hoge-bloeddruk",
    naam: "Hoge bloeddruk",
    beschrijving:
      "Ondersteuning bij het op peil houden van een gezonde bloeddruk. Streef samen met je arts naar gezonde waarden (richtlijn < 140/90, ideaal 120/80).",
    supplementIds: ["knoflook", "meidoorn", "omega-3", "magnesium", "q10"],
    leefstijlTips: [
      "Minder zout en bewerkt voedsel; meer groente en rode biet.",
      "Regelmatig bewegen en gezond gewicht.",
      "Beperk alcohol en stop met roken.",
      "Knoflook met citroen en (appel)azijn wordt traditioneel genoemd.",
    ],
  },
  {
    id: "hart-en-vaatziekten",
    naam: "Hart- en vaatgezondheid",
    beschrijving: "Ondersteuning van hart, bloedvaten en een gezonde doorbloeding.",
    supplementIds: ["omega-3", "q10", "knoflook", "vitamine-k2", "nattokinase", "magnesium"],
    leefstijlTips: [
      "Vette vis, olijfolie, noten en bladgroenten.",
      "Beweeg dagelijks; let op homocysteïne (B-vitamines).",
      "Bespreek bloedverdunners met je arts vóór nattokinase.",
    ],
  },
  {
    id: "hoog-cholesterol",
    naam: "Hoog cholesterol",
    beschrijving: "Ondersteuning bij een gezond cholesterolgehalte.",
    supplementIds: ["omega-3", "knoflook", "psyllium", "groene-thee"],
    leefstijlTips: [
      "Meer oplosbare vezels (haver, psyllium, peulvruchten).",
      "Onverzadigde vetten i.p.v. verzadigde; beweeg regelmatig.",
    ],
  },
  {
    id: "slaapproblemen",
    naam: "Slaapproblemen",
    beschrijving: "Hulp bij in slaap vallen en doorslapen.",
    supplementIds: ["magnesium", "melatonine", "valeriaan", "l-tryptofaan", "ashwagandha"],
    leefstijlTips: [
      "Vaste slaaptijden; scherm uit ruim voor bedtijd.",
      "Geen cafeïne in de middag/avond.",
      "Donkere, koele slaapkamer.",
    ],
  },
  {
    id: "stress-en-burn-out",
    naam: "Stress & burn-out",
    beschrijving: "Ondersteuning bij stress, spanning en herstel.",
    supplementIds: ["ashwagandha", "rhodiola", "magnesium", "l-tryptofaan", "cbd"],
    leefstijlTips: [
      "Beweging, buitenlucht en ademhalings-/meditatie-oefeningen.",
      "Voldoende slaap en pauzes; grenzen bewaken.",
    ],
  },
  {
    id: "gewrichtsklachten",
    naam: "Gewrichtsklachten",
    beschrijving: "Ondersteuning van soepele gewrichten en kraakbeen.",
    supplementIds: ["glucosamine-chondroitine", "curcumine", "omega-3", "collageen"],
    leefstijlTips: [
      "In beweging blijven met lichte belasting.",
      "Gezond gewicht ontlast de gewrichten.",
    ],
  },
  {
    id: "zwakke-weerstand",
    naam: "Zwakke weerstand",
    beschrijving: "Ondersteuning van het immuunsysteem.",
    supplementIds: ["vitamine-c", "vitamine-d3", "zink", "selenium", "reishi"],
    leefstijlTips: [
      "Voldoende slaap, beweging en daglicht.",
      "Gevarieerd eten met veel groente en fermentatie.",
    ],
  },
  {
    id: "spijsvertering-en-darmen",
    naam: "Spijsvertering & darmen",
    beschrijving: "Ondersteuning van een gezonde darmflora en spijsvertering.",
    supplementIds: ["probiotica", "psyllium", "pepermuntolie", "curcumine"],
    leefstijlTips: [
      "Vezelrijk eten en voldoende water.",
      "Gefermenteerd voedsel (zuurkool, yoghurt, kefir).",
    ],
  },
  {
    id: "leverondersteuning",
    naam: "Leverondersteuning",
    beschrijving: "Ondersteuning van de lever en natuurlijke ontgifting.",
    supplementIds: ["mariadistel", "curcumine"],
    leefstijlTips: [
      "Beperk alcohol en bewerkt voedsel.",
      "Bittere groenten (artisjok, paardenbloem).",
    ],
  },
  {
    id: "droge-ogen",
    naam: "Droge ogen",
    beschrijving: "Ondersteuning bij droge of vermoeide ogen en de oogfunctie.",
    supplementIds: ["omega-3", "luteine", "levertraan", "vitamine-d3"],
    leefstijlTips: [
      "Regelmatig knipperen en schermpauzes (20-20-20-regel).",
      "Vitamine A-rijke voeding (lever, levertraan) wordt traditioneel genoemd.",
    ],
  },
  {
    id: "geheugen-en-concentratie",
    naam: "Geheugen & concentratie",
    beschrijving: "Ondersteuning van cognitie, geheugen en focus.",
    supplementIds: ["ginkgo-biloba", "lions-mane", "omega-3", "q10"],
    leefstijlTips: [
      "Beweging, voldoende slaap en mentale uitdaging.",
      "Beperk suiker en sterk bewerkt voedsel.",
    ],
  },
  {
    id: "vermoeidheid-en-energie",
    naam: "Vermoeidheid & energie",
    beschrijving: "Ondersteuning bij energie en vitaliteit.",
    supplementIds: ["vitamine-b12", "ijzer", "q10", "magnesium", "shilajit"],
    leefstijlTips: [
      "Laat bij aanhoudende vermoeidheid bloedwaarden (ijzer, B12) checken.",
      "Daglicht, beweging en regelmaat.",
    ],
  },
  {
    id: "sterke-botten",
    naam: "Sterke botten",
    beschrijving: "Ondersteuning van bot- en gewrichtsgezondheid.",
    supplementIds: ["calcium", "vitamine-d3", "vitamine-k2", "magnesium"],
    leefstijlTips: [
      "Belaste beweging (wandelen, krachttraining).",
      "Vitamine K2 stuurt calcium naar de botten.",
    ],
  },
  {
    id: "huid-haar-en-nagels",
    naam: "Huid, haar & nagels",
    beschrijving: "Ondersteuning van een gezonde huid, haar en nagels.",
    supplementIds: ["collageen", "zink", "vitamine-c"],
    leefstijlTips: [
      "Voldoende eiwit, water en bescherming tegen de zon.",
    ],
  },
  {
    id: "prostaatklachten",
    naam: "Prostaatklachten",
    beschrijving: "Ondersteuning bij een vergrote prostaat en plasklachten.",
    supplementIds: ["saw-palmetto", "zink"],
    leefstijlTips: [
      "Laat aanhoudende plasklachten door je arts beoordelen.",
    ],
  },
  {
    id: "blaasontsteking",
    naam: "Blaas & urinewegen",
    beschrijving: "Ondersteuning van blaas en urinewegen.",
    supplementIds: ["cranberry", "vitamine-c"],
    leefstijlTips: [
      "Voldoende drinken en goede hygiëne.",
      "Bij koorts/aanhoudende klachten naar de arts.",
    ],
  },
  {
    id: "overgang-menopauze",
    naam: "Overgang / menopauze",
    beschrijving: "Ondersteuning bij overgangsklachten.",
    supplementIds: ["black-cohosh", "calcium", "vitamine-d3", "magnesium"],
    leefstijlTips: [
      "Beweging en gezond gewicht; let op botgezondheid.",
    ],
  },
  {
    id: "bloedsuiker-diabetes",
    naam: "Bloedsuiker in balans",
    beschrijving: "Ondersteuning van een normale bloedsuikerspiegel.",
    supplementIds: ["chroom", "groene-thee", "magnesium"],
    leefstijlTips: [
      "Beperk snelle suikers; vezels en beweging na de maaltijd.",
      "Bij diabetes altijd in overleg met je arts/diabetesteam.",
    ],
  },
];

export function getCondition(id: string): Condition | undefined {
  return conditions.find((c) => c.id === id);
}
