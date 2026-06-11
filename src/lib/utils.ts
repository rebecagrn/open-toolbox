import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export const cn = (...inputs: ClassValue[]) => twMerge(clsx(inputs))

const numberFormatter = new Intl.NumberFormat("en-US")

/** Stable number format for SSR — avoids hydration mismatch from toLocaleString() */
export const formatNumber = (value: number): string => numberFormatter.format(value)

/** Stable date format for SSR — avoids hydration mismatch from toLocaleString() */
export const formatUtcDateTime = (isoDate: string): string => {
  const date = new Date(isoDate)
  const pad = (value: number) => String(value).padStart(2, "0")

  return `${date.getUTCFullYear()}-${pad(date.getUTCMonth() + 1)}-${pad(date.getUTCDate())} ${pad(date.getUTCHours())}:${pad(date.getUTCMinutes())} UTC`
}
