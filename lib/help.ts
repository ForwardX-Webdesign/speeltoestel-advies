/**
 * Uitleg voor klanten (ForwardX-toevoeging).
 *
 * Elk onderwerp heeft korte stappen en optioneel een video. Zet een video in
 * `public/help/` en vul hieronder `video` in, bijvoorbeeld
 * `video: { src: "/help/tekst-aanpassen.mp4", poster: "/help/tekst-aanpassen.jpg" }`.
 * Zonder video toont de pagina alleen de stappen.
 */

type HelpVideo = {
  src: string;
  poster?: string;
};

type HelpTopic = {
  slug: string;
  title: string;
  summary: string;
  steps: string[];
  tip?: string;
  video?: HelpVideo;
};

const helpTopics: HelpTopic[] = [
  {
    slug: "inloggen",
    title: "Inloggen",
    summary: "Je logt in met je e-mailadres. Een wachtwoord heb je niet nodig.",
    steps: [
      "Vul op de inlogpagina je e-mailadres in en klik op de knop eronder.",
      "Je krijgt een e-mail met een code van zes cijfers.",
      "Vul de code in. Je bent nu ingelogd.",
    ],
    tip: "Geen e-mail gekregen? Kijk in je spam, of vraag een nieuwe code aan.",
  },
  {
    slug: "tekst-aanpassen",
    title: "Een tekst aanpassen",
    summary: "Pas een tekst op je website aan, bijvoorbeeld je openingstijden.",
    steps: [
      "Kies links in het menu het onderdeel dat je wilt aanpassen.",
      "Klik in het veld en typ je nieuwe tekst.",
      "Klik rechtsboven op Opslaan.",
      "Binnen een paar minuten staat de wijziging op je website.",
    ],
    tip: "Onder een veld staat vaak een voorbeeld van hoe je het invult.",
  },
  {
    slug: "foto-vervangen",
    title: "Een foto vervangen",
    summary: "Zet een nieuwe foto bij een teamlid, behandeling of pagina.",
    steps: [
      "Open het onderdeel met de foto die je wilt vervangen.",
      "Klik bij de foto op het kruisje om de oude foto weg te halen.",
      "Kies een foto die al is geüpload, of upload een nieuwe vanaf je computer of telefoon.",
      "Klik rechtsboven op Opslaan.",
    ],
    tip: "Gebruik scherpe foto's. Liggende foto's van minstens 1600 pixels breed werken bijna overal goed.",
  },
  {
    slug: "item-toevoegen",
    title: "Iets toevoegen of weghalen",
    summary: "Voeg een teamlid, behandeling of vacature toe, of haal er een weg.",
    steps: [
      "Kies links het onderdeel, bijvoorbeeld Team.",
      "Klik onderaan de lijst op de knop om een item toe te voegen en vul de velden in.",
      "Sleep een item aan het handvat links om de volgorde te veranderen.",
      "Weghalen doe je met het prullenbakje bij het item.",
      "Klik rechtsboven op Opslaan.",
    ],
  },
  {
    slug: "bekijken",
    title: "Je wijziging bekijken",
    summary: "Controleer hoe je wijziging er op de website uitziet.",
    steps: [
      "Sla je wijziging eerst op.",
      "Klik rechtsboven op Bekijk pagina, of op de knop in de melding na het opslaan.",
      "Zie je de wijziging nog niet? Wacht een paar minuten en laad de pagina opnieuw.",
    ],
    tip: "Je ziet altijd de laatst opgeslagen versie. Wat je nog niet hebt opgeslagen, staat er nog niet in.",
  },
  {
    slug: "foutje-herstellen",
    title: "Een foutje herstellen",
    summary: "Iets verkeerd opgeslagen? Dat is altijd terug te draaien.",
    steps: [
      "Open het onderdeel opnieuw en pas de tekst of foto weer aan.",
      "Klik op Opslaan. De website wordt opnieuw bijgewerkt.",
      "Weet je niet meer hoe het was? Het klokje rechtsboven laat zien wie wanneer iets heeft gewijzigd.",
    ],
    tip: "Elke versie wordt bewaard. Kom je er niet uit, dan zet ForwardX een eerdere versie voor je terug.",
  },
];

// Waar klanten terechtkunnen als de uitleg niet genoeg is.
const helpContact = {
  name: "ForwardX",
  url: "https://forwardx.nl/contact",
};

export { helpContact, helpTopics };
export type { HelpTopic, HelpVideo };
