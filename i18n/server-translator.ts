import { createTranslator } from "next-intl";

import { getMessages } from "./get-messages";

export const serverTranslator = (locale: string) => {
  const messages = getMessages(locale);
  return createTranslator({ locale, messages });
};
