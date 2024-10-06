import { clsx, type ClassValue } from "clsx"
import { redirect } from "next/navigation"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const getURL = (input: string = '') => {
  return process.env.NEXT_PUBLIC_VERCEL_ENV === 'production'
    ? `https://${process.env.NEXT_PUBLIC_VERCEL_PROJECT_PRODUCTION_URL}${input}`
    : process.env.NEXT_PUBLIC_VERCEL_ENV === 'preview'
      ? `https://${process.env.NEXT_PUBLIC_VERCEL_URL}${input}`
      : `http://localhost:3000${input}`
}

// run `bun tunnel` and set TUNNEL_URL
export const getDomain = (input: string = '') => {
  return process.env.NEXT_PUBLIC_VERCEL_ENV === 'production'
      ? `https://${process.env.NEXT_PUBLIC_VERCEL_PROJECT_PRODUCTION_URL}${input}`
      : process.env.NEXT_PUBLIC_VERCEL_ENV === 'preview'
        ? `https://${process.env.NEXT_PUBLIC_VERCEL_URL}${input}`
        : `${process.env.TUNNEL_URL!}${input}`
}

/**
 * Redirects to a specified path with an encoded message as a query parameter.
 * @param {('error' | 'success')} type - The type of message, either 'error' or 'success'.
 * @param {string} path - The path to redirect to.
 * @param {string} message - The message to be encoded and added as a query parameter.
 * @returns {never} This function doesn't return as it triggers a redirect.
 */
export function encodedRedirect(
  type: "error" | "success",
  path: string,
  message: string,
) {
  return redirect(`${path}?${type}=${encodeURIComponent(message)}`);
}

export function getInitials(fullName: string) {
  if (!fullName) return ''

  const names = fullName.trim().split(' ')
  return names.reduce((acc, curr, index) => {
    if (index === 0 || index === names.length - 1) {
      acc += curr.charAt(0).toUpperCase()
    }
    return acc
  }, '')
}

export function delay(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}
