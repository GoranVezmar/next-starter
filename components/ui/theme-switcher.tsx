"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

type ThemeSwitcherProps = {
  type?: "button" | "dropdown";
};

export const ThemeSwitcher = ({ type = "button" }: ThemeSwitcherProps) => {
  const { setTheme, resolvedTheme } = useTheme();

  const sunIcon = <Sun className="h-[1.2rem] w-[1.2rem] scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90" />;
  const moonIcon = <Moon className="absolute h-[1.2rem] w-[1.2rem] scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0" />;

  if (type === "button") {
    return (
      <Button variant="outline" size="icon" onClick={() => setTheme(resolvedTheme === "light" ? "dark" : "light")}>
        {sunIcon}
        {moonIcon}
        {/* TODO translate this */}
        <span className="sr-only">Toggle theme</span>
      </Button>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon">
          {sunIcon}
          {moonIcon}
          {/* TODO translate this */}
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {/* TODO translate this */}
        <DropdownMenuItem onClick={() => setTheme("light")}>Light</DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("dark")}>Dark</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
