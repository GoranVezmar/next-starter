"use client";

import { User } from "@/server/schemas/auth.schema";

import { Separator } from "@/components/ui/separator";
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";

import { LanguageSwitcher } from "../ui/language-switcher";
import { ThemeSwitcher } from "../ui/theme-switcher";
import { Breadcrumbs } from "./breadcrumbs";
import { Sidebar } from "./sidebar";
import { UserProfileDropdown } from "./user-profile-dropdown";

type DashboardProps = {
  user: User;
  children: React.ReactNode;
};

export const Dashboard = ({ user, children }: DashboardProps) => {
  return (
    <SidebarProvider>
      <Sidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear">
          <div className="flex w-full justify-between px-4">
            <div className="flex items-center gap-2">
              <SidebarTrigger className="-ml-1" />
              <Separator orientation="vertical" className="mr-2 data-[orientation=vertical]:h-4" />
              <Breadcrumbs />
            </div>
            <div className="flex items-center gap-2">
              {/* TODO add global search here */}
              {/* TODO add notifications here */}
              <ThemeSwitcher />
              <LanguageSwitcher />
              <UserProfileDropdown user={user} />
            </div>
          </div>
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">{children}</div>
      </SidebarInset>
    </SidebarProvider>
  );
};
