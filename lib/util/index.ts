import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Concatenates class names and merges conflicting Tailwind classes
 * @param inputs class names to concatenate
 * @returns resulting concatenated class names
 */
export function cc(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Normalizes a value in bytes to a string with human-readable units
 * @param bytes the input number in bytes to normalize
 * @param [si=false] represent result in SI units (powers of 1000) instead of binary units (powers of 1024)
 * @param [dp=1] amount of decimal places to round result to
 */
export function formatBytes(bytes: number, si = false, dp = 1) {
  const thresh = si ? 1000 : 1024;

  if (Math.abs(bytes) < thresh) {
    return bytes + " B";
  }

  const units = si
    ? ["kB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"]
    : ["KiB", "MiB", "GiB", "TiB", "PiB", "EiB", "ZiB", "YiB"];
  let u = -1;
  const r = 10 ** dp;

  do {
    bytes /= thresh;
    ++u;
  } while (
    Math.round(Math.abs(bytes) * r) / r >= thresh &&
    u < units.length - 1
  );

  return bytes.toFixed(dp) + " " + units[u];
}
