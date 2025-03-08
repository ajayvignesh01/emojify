import { createAdminClient } from '@/lib/supabase/admin'
import { headers } from 'next/headers'
import { Prediction } from 'replicate'

export async function POST(
  req: Request,
  segmentData: { params: Promise<{ generationId: string }> }
) {
  const supabase = createAdminClient()

  const { generationId } = await segmentData.params

  // Get the webhook headers
  const headersList = await headers()
  const webhookId = headersList.get('webhook-id')
  const webhookSignatures = headersList.get('webhook-signature')
  const webhookTimestamp = headersList.get('webhook-timestamp')
  if (!webhookId || !webhookSignatures || !webhookTimestamp) {
    return new Response('Missing headers', { status: 400 })
  }

  // Verify the webhook signature
  const rawBody = await req.text()
  const signedContent = `${webhookId}.${webhookTimestamp}.${rawBody}`
  const secret = process.env.REPLICATE_API_SECRET!
  // Extract the base64 part of the secret
  const secretBase64 = secret.split('_')[1]
  // Decode the base64 secret to a byte array
  const secretBytes = Uint8Array.from(atob(secretBase64), (c) => c.charCodeAt(0))
  // Import the key
  const key = await crypto.subtle.importKey(
    'raw',
    secretBytes,
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign']
  )
  // Sign the content
  const encoder = new TextEncoder()
  const data = encoder.encode(signedContent)
  const signature = await crypto.subtle.sign('HMAC', key, data)
  // Convert signature to base64
  const computedSignature = btoa(String.fromCharCode.apply(null, [...new Uint8Array(signature)]))
  // Compare the computed signature with the expected signatures
  const expectedSignatures = webhookSignatures.split(' ').map((sig) => sig.split(',')[1])
  const isValidSignature = expectedSignatures.some(
    (expectedSignature) => expectedSignature === computedSignature
  )
  if (!isValidSignature) {
    return new Response('Invalid signature', { status: 401 })
  }

  // Process the webhook payload
  const prediction = JSON.parse(rawBody) as Prediction
  switch (prediction.status) {
    case 'starting':
      // console.log('Starting prediction:', prediction)
      await supabase
        .from('replicates')
        .update({ status: prediction.status })
        .eq('id', prediction.id)
      break
    case 'processing':
      // console.log('Processing prediction:', prediction)
      await supabase
        .from('replicates')
        .update({ status: prediction.status, started_at: prediction.started_at })
        .eq('id', prediction.id)
      break
    case 'canceled':
      // console.log('Canceled prediction:', prediction)
      await supabase
        .from('replicates')
        .update({
          status: prediction.status,
          completed_at: prediction.completed_at,
          predict_time: prediction.metrics?.predict_time
        })
        .eq('id', prediction.id)
      break
    case 'failed':
      // console.log('Failed prediction:', prediction)
      await supabase
        .from('replicates')
        .update({
          status: prediction.status,
          error: String(prediction.error),
          completed_at: prediction.completed_at,
          predict_time: prediction.metrics?.predict_time
        })
        .eq('id', prediction.id)
      break
    case 'succeeded':
      // console.log('Succeeded prediction:', prediction)
      await supabase
        .from('replicates')
        .update({
          status: prediction.status,
          completed_at: prediction.completed_at,
          predict_time: prediction.metrics?.predict_time
        })
        .eq('id', prediction.id)
      await supabase
        .from('generations')
        .update({ output: prediction.output[0] })
        .eq('id', generationId)
      break
    default:
    // console.log('Unhandled prediction:', prediction)
  }

  return new Response('OK', { status: 200 })
}
