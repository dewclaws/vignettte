import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cc(...classes: ClassValue[]) {
  return twMerge(clsx(classes));
}
