import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export const cn = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs));
};

export const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const interpolate = (key: string, params: Record<string, unknown>) => {
  let result = key;

  for (const paramKey in params) {
    const placeholder = `{${paramKey}}`;
    result = result.split(placeholder).join(String(params[paramKey]));
  }

  return result;
};

export const getInitials = (name: string) => {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .substring(0, 2);
};
