import { clsx } from "https://cdn.jsdelivr.net/npm/clsx@2.1.1/+esm";
import { twMerge } from "https://cdn.jsdelivr.net/npm/tailwind-merge@2.5.2/+esm";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}
