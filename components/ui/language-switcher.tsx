"use client";

import { useTransition } from "react";

import { Globe } from "lucide-react";
import { useLocale } from "next-intl";

import { usePathname, useRouter } from "@/i18n/navigation";
import { localesWithLabels } from "@/i18n/routing";

import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

export const LanguageSwitcher = () => {
  const router = useRouter();
  const pathname = usePathname();
  const currentLocale = useLocale();
  const [isPending, startTransition] = useTransition();

  const handleLocaleChange = (locale: string) => {
    if (locale === currentLocale) return;

    startTransition(() => {
      router.push(pathname, { locale });
    });
  };

  const currentLocaleLabel = localesWithLabels.find((localeObj) => localeObj.locale === currentLocale)?.label;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">
          <Globe />
          {currentLocaleLabel}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {localesWithLabels.map(({ locale, label }) => (
          <DropdownMenuItem key={locale} onClick={() => handleLocaleChange(locale)} disabled={isPending || locale === currentLocale}>
            {label}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
