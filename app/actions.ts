'use server'

import { createAdminClient } from '@/lib/supabase/admin'
import { TablesInsert } from '@/lib/supabase/database.types'
import { getURL } from '@/lib/utils'
import { nanoid } from 'nanoid'
import OpenAI from 'openai'
import Replicate from 'replicate'

export async function genEmoji(prompt: string) {
  const openai = new OpenAI()
  const replicate = new Replicate()
  const supabase = createAdminClient()

  const generationInsert: TablesInsert<'generations'> = {
    id: nanoid(),
    prompt
  }

  // Moderation
  const moderations = await openai.moderations.create({
    model: 'omni-moderation-latest',
    input: prompt
  })

  if (moderations.results[0].flagged) {
    return {
      generationId: null,
      message: 'Inappropriate content detected. Try running it again, or try a different prompt.'
    }
  }

  const moderationInsert: TablesInsert<'moderations'> = {
    id: moderations.id,
    generation_id: generationInsert.id,
    flagged: moderations.results[0].flagged,
    sexual: moderations.results[0].categories.sexual,
    'sexual/minors': moderations.results[0].categories['sexual/minors'],
    harassment: moderations.results[0].categories.harassment,
    'harassment/threatening': moderations.results[0].categories['harassment/threatening'],
    hate: moderations.results[0].categories.hate,
    'hate/threatening': moderations.results[0].categories['hate/threatening'],
    illicit: moderations.results[0].categories.illicit,
    'illicit/violent': moderations.results[0].categories['illicit/violent'],
    'self-harm': moderations.results[0].categories['self-harm'],
    'self-harm/intent': moderations.results[0].categories['self-harm/intent'],
    'self-harm/instructions': moderations.results[0].categories['self-harm/instructions'],
    violence: moderations.results[0].categories.violence,
    'violence/graphic': moderations.results[0].categories['violence/graphic'],
    scores: moderations.results[0].category_scores
  }

  // Replicate
  const prediction = await replicate.predictions.create({
    version: process.env.REPLICATE_TEXT_TO_EMOJI_VERSION!,
    input: {
      prompt: `A TOK emoji of ${prompt}`,
      apply_watermark: false
    },
    webhook: getURL(`/api/webhooks/replicate/${generationInsert.id}`, true),
    webhook_events_filter: ['start', 'logs', 'completed']
  })

  console.log('prediction trigger', prediction)

  const replicateInsert: TablesInsert<'replicates'> = {
    id: prediction.id,
    generation_id: generationInsert.id,
    model: prediction.model,
    version: prediction.version,
    input: prediction.input,
    status: prediction.status
  }

  // Insert into Supabase
  await supabase.from('generations').insert(generationInsert)
  await supabase.from('moderations').insert(moderationInsert)
  await supabase.from('replicates').insert(replicateInsert)

  return { generationId: generationInsert.id, message: 'OK' }
}
