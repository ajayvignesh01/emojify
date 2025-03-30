import { GenerationTile } from '@/components/generations/GenerationTile'
import { createClient } from '@/lib/supabase/server'
import { notFound } from 'next/navigation'

export default async function Generation(segmentData: {
  params: Promise<{ generationId: string }>
}) {
  const { generationId } = await segmentData.params

  const supabase = await createClient()
  const { data: generation } = await supabase
    .from('generations')
    .select()
    .eq('id', generationId)
    .maybeSingle()

  if (!generation) {
    return notFound()
  }

  return (
    <div className='mx-auto flex h-screen w-full max-w-[1280px] flex-col items-center justify-center p-4'>
      <div className='flex size-full flex-col rounded-md border'>
        <GenerationTile generation={generation} />
      </div>
    </div>
  )
}
