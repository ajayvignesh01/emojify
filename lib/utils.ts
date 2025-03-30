import { clsx, type ClassValue } from 'clsx'
import { ReadonlyHeaders } from 'next/dist/server/web/spec-extension/adapters/headers'
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
        ? `https://ajay-35.localcan.dev${input}`
        : `http://localhost:${process.env.PORT}${input}`
}

export function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

export function getIp(headersList: ReadonlyHeaders) {
  const forwardedFor = headersList.get('x-forwarded-for')
  const realIp = headersList.get('x-real-ip')

  if (forwardedFor) {
    return forwardedFor.split(',')[0].trim()
  } else if (realIp) {
    return realIp.trim()
  } else {
    return null
  }
}

export function getModel(model: `${string}/${string}` | string) {
  const models = {
    [`${process.env.REPLICATE_TEXT_TO_EMOJI_USER}/${process.env.REPLICATE_TEXT_TO_EMOJI_MODEL}`]:
      'text-to-emoji',
    [`${process.env.REPLICATE_IMAGE_TO_EMOJI_USER}/${process.env.REPLICATE_IMAGE_TO_EMOJI_MODEL}`]:
      'image-to-emoji',
    [`${process.env.REPLICATE_BACKGROUND_REMOVAL_USER}/${process.env.REPLICATE_BACKGROUND_REMOVAL_MODEL}`]:
      'background-removal'
  }
  return models[model]
}

export function createImageFileName({ id, prompt }: { id: string; prompt?: string | null }) {
  return `emojified-${prompt?.replace(/\s+/g, '-') || 'emoji'}-${id}.png`
}

/**
 * Gets the progress percentage from Replicate model generation logs
 * @param logs - The raw log output from a Replicate prediction
 * @returns The final or latest progress percentage (0-100), or null if no progress found
 */
export function getPredictionProgress(logs: string) {
  // Create a regular expression to match percentage lines
  // Format example: " 42%|████▏     | 21/50 [00:02<00:04,  7.01it/s]"
  const progressRegex = /^\s*(\d+)%\|[█▏▍▌▊ ]+\|\s*\d+\/\d+/gm

  // Find all matches
  const matches = [...logs.matchAll(progressRegex)]

  // Extract the percentage values
  const percentages = matches.map((match) => parseInt(match[1], 10))

  // Return the last percentage or null if none found
  return percentages.length > 0 ? percentages[percentages.length - 1] : null
}
