import { useTranslations } from "next-intl";

import { LanguageSwitcher } from "@/components/ui/language-switcher";
import { ThemeSwitcher } from "@/components/ui/theme-switcher";

const ConfirmationEmailSentPage = () => {
  const t = useTranslations();

  return (
    <div className="flex min-h-screen items-center justify-center px-4">
      <div className="absolute top-0 left-0 flex w-full justify-between gap-2 p-4">
        <div className="text-2xl font-bold">Next Starter</div>
        <div className="flex items-center gap-2">
          <ThemeSwitcher />
          <LanguageSwitcher />
        </div>
      </div>
      <div className="w-full max-w-md">
        <div className="p-2 text-center">
          <h1 className="text-2xl font-bold">{t("pages.confirmationEmailSent.title")}</h1>
          <p className="text-muted-foreground">{t("pages.confirmationEmailSent.description")}</p>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationEmailSentPage;
