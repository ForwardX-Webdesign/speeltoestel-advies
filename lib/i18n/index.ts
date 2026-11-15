/**
 * Interface language (ForwardX addition).
 *
 * `t("Save")` returns the text in the app language. English source strings are
 * the keys, so anything without a translation simply stays English. Set
 * NEXT_PUBLIC_APP_LOCALE=en to run the interface in English.
 */

import { formatDistanceToNow } from "date-fns";
import { nl as dateFnsNl } from "date-fns/locale";
import nl from "./nl";

type Vars = Record<string, string | number | null | undefined>;

const dictionaries: Record<string, Record<string, string>> = { nl };

const locale = (process.env.NEXT_PUBLIC_APP_LOCALE || "nl").toLowerCase();

const t = (text: string, vars?: Vars): string => {
  const translated = dictionaries[locale]?.[text] ?? text;
  if (!vars) return translated;
  return translated.replace(/\{(\w+)\}/g, (match, key) =>
    vars[key] != null ? String(vars[key]) : match,
  );
};

// "5 minutes ago" / "5 minuten geleden"
const timeAgo = (date: Date | number | string): string =>
  formatDistanceToNow(new Date(date), {
    addSuffix: true,
    locale: locale === "nl" ? dateFnsNl : undefined,
  });

export { locale, t, timeAgo };
