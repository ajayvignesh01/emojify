import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const getURL = (input: string = '', localCan?: boolean) => {
  return process.env.NEXT_PUBLIC_VERCEL_ENV === 'production'
    ? `https://${process.env.NEXT_PUBLIC_VERCEL_PROJECT_PRODUCTION_URL}${input}`
    : process.env.NEXT_PUBLIC_VERCEL_ENV === 'preview'
      ? `https://${process.env.NEXT_PUBLIC_VERCEL_URL}${input}`
      : localCan
        ? `https://ajay-03.localcan.dev${input}`
        : `http://localhost:${process.env.PORT}${input}`
}

export function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}
