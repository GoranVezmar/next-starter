import { defineRouting } from "next-intl/routing";

export type Locale = "en" | "de" | "es" | "fr";

export const localesWithLabels: { locale: Locale; label: string }[] = [
  {
    locale: "en",
    label: "English",
  },
  {
    locale: "es",
    label: "Español",
  },
  {
    locale: "fr",
    label: "Français",
  },
  {
    locale: "de",
    label: "Deutsch",
  },
];

export const locales = localesWithLabels.map((localeObj) => localeObj.locale);

export const routing = defineRouting({
  locales,
  defaultLocale: "en",
  localePrefix: "as-needed",
});
