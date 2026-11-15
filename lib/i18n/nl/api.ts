// Messages returned by the API routes (shown in toasts and error screens).
const api: Record<string, string> = {
  // Saving, deleting, renaming
  "File \"{path}\" saved successfully.": "\"{path}\" is opgeslagen.",
  "File \"{path}\" saved successfully but renamed to \"{savedPath}\" to avoid naming conflict.":
    "Opgeslagen als \"{savedPath}\", omdat \"{path}\" al bestond.",
  "File \"{path}\" deleted successfully.": "\"{path}\" is verwijderd.",
  "File \"{path}\" moved to \"{newPath}\".":
    "Naam gewijzigd van \"{path}\" naar \"{newPath}\".",
  "File \"{path}\" already exists.": "Het bestand \"{path}\" bestaat al.",
  "File has changed since you last loaded it. Please refresh the page and try again.":
    "Dit bestand is gewijzigd sinds je het opende. Ververs de pagina en probeer het opnieuw.",
  "This repository requires changes through a pull request. Save to a different branch or fork, or ask a maintainer to relax the repository rule for direct edits.":
    "Je kunt deze website nu niet direct aanpassen. Neem contact op met de beheerder van je website.",
  "New path \"{path}\" is the same as the old path.":
    "De nieuwe naam is hetzelfde als de oude.",

  // Things that are switched off for this website
  "Creating entries isn't allowed for \"{name}\".":
    "Je kunt geen nieuwe items toevoegen aan \"{name}\".",
  "Deleting entries isn't allowed for \"{name}\".":
    "Je kunt geen items verwijderen uit \"{name}\".",
  "Renaming entries isn't allowed for \"{name}\".":
    "Je kunt de naam van items in \"{name}\" niet wijzigen.",
  "Renaming content of type \"file\" isn't allowed.":
    "De naam van dit bestand kun je niet wijzigen.",
  "Subfolders are not allowed for collection \"{name}\".":
    "Je kunt geen mappen gebruiken in \"{name}\".",
  "Creating the settings file isn't allowed.":
    "Het instellingenbestand kun je hier niet aanmaken.",
  "Deleting the settings file isn't allowed.":
    "Het instellingenbestand kun je niet verwijderen.",
  "Renaming the settings file isn't allowed.":
    "De naam van het instellingenbestand kun je niet wijzigen.",

  // Wrong place or wrong kind of file
  "Invalid path \"{path}\" for {type} \"{name}\".":
    "\"{path}\" hoort niet bij \"{name}\".",
  "Invalid path \"{path}\" for collection \"{name}\".":
    "\"{path}\" hoort niet bij \"{name}\".",
  "Invalid path for collection \"{name}\".":
    "Deze map hoort niet bij \"{name}\".",
  "Invalid path \"{path}\" for media \"{name}\".":
    "\"{path}\" hoort niet bij de mediamap \"{name}\".",
  "Invalid path \"{path}\" for media.":
    "\"{path}\" hoort niet bij deze mediamap.",
  "Invalid extension \"{extension}\" for {type} \"{name}\".":
    "Bestanden die eindigen op \"{extension}\" kun je niet gebruiken in \"{name}\".",
  "Invalid extension \"{extension}\" for media.":
    "Bestanden die eindigen op \"{extension}\" kun je hier niet gebruiken.",
  "Expected a file but found a directory": "Dit is een map, geen bestand.",
  "Content validation failed: {errors}": "Niet alles is goed ingevuld: {errors}",
  "Error parsing frontmatter: {message}":
    "Dit item kon niet worden gelezen: {message}",

  // Not found
  "Schema not found for {name}.": "\"{name}\" bestaat niet (meer) op deze website.",
  "Content schema not found for {name}.":
    "\"{name}\" bestaat niet (meer) op deze website.",
  "Media schema not found for {name}.":
    "De mediamap \"{name}\" bestaat niet (meer).",
  "No media configuration named \"{name}\" found for {owner}/{repo}/{branch}.":
    "De mediamap \"{name}\" bestaat niet (meer).",
  "No media configuration found for {owner}/{repo}/{branch}.":
    "Voor deze website is nog geen mediamap ingesteld.",
  "Configuration not found for {owner}/{repo}/{branch}.":
    "De instellingen van deze website zijn niet gevonden.",

  // Signing in and access
  "Not signed in.": "Je bent niet ingelogd.",
  "Token not found":
    "We konden je toegang niet controleren. Log opnieuw in en probeer het opnieuw.",
  "No access to repository {owner}/{repo}.": "Je hebt geen toegang tot deze website.",
  "You do not have permission to access \"{owner}/{repo}\".":
    "Je hebt hier geen toegang toe.",

  // GitHub is busy
  "GitHub rate limit reached. Please wait {seconds} seconds and try again.":
    "Het is nu even te druk. Wacht {seconds} seconden en probeer het opnieuw.",
  "GitHub rate limit reached. Please wait a minute and try again.":
    "Het is nu even te druk. Wacht een minuutje en probeer het opnieuw.",
};

export default api;
