import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function validateUrl(input: string): boolean {
  try {
    const url = new URL(input.trim());

    // 1. Only allow http or https
    if (url.protocol !== "http:" && url.protocol !== "https:") {
      return false;
    }

    const hostname = url.hostname.toLowerCase();

    // 2. Reject localhost
    if (hostname === "localhost") {
      return false;
    }

    // 3. Reject IP addresses
    const ipRegex = /^(?:\d{1,3}\.){3}\d{1,3}$/;

    if (ipRegex.test(hostname)) {
      return false;
    }

    // 4. Require valid domain with TLD
    const domainRegex =
      /^(?:[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?\.)+[a-z]{2,}$/;

    if (!domainRegex.test(hostname)) {
      return false;
    }

    return true;
  } catch {
    return false;
  }
}
