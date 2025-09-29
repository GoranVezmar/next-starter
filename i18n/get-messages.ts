import de from "@/messages/de.json";
import en from "@/messages/en.json";
import es from "@/messages/es.json";
import fr from "@/messages/fr.json";

import { Locale } from "./routing";

const messagesMap: Record<Locale, typeof en> = {
  en,
  de,
  es,
  fr,
};

export const getMessages = (locale: string) => {
  return messagesMap[locale as Locale] || messagesMap["en"];
};
