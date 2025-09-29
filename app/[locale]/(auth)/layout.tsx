import Link from "next/link";

import { useTranslations } from "next-intl";

import { LanguageSwitcher } from "@/components/ui/language-switcher";
import { ThemeSwitcher } from "@/components/ui/theme-switcher";

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
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
        <div className="mb-8 text-center">
          <p className="text-muted-foreground mb-1 text-sm">{t("layouts.auth.subTitle")}</p>
          <h1 className="text-2xl font-bold">{t("layouts.auth.title")}</h1>
        </div>
        {children}
        <div className="text-muted-foreground mt-6 text-center text-sm text-balance">
          {t.rich("layouts.auth.bottomText", {
            termsLink: (chunks) => (
              <Link href="/terms-of-service" className="text-blue-link hover:underline">
                {chunks}
              </Link>
            ),
            privacyLink: (chunks) => (
              <Link href="/privacy-policy" className="text-blue-link hover:underline">
                {chunks}
              </Link>
            ),
          })}
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
