'use client'

import { createClient } from '@/lib/supabase/client'
import { Tables } from '@/lib/supabase/database.types'
import { cn } from '@/lib/utils'
import { Loader } from 'lucide-react'
import Image from 'next/image'
import { ComponentProps, useState } from 'react'
import { GenerationActions } from './GenerationActions'

interface GenerationTileProps extends ComponentProps<'div'> {
  generation: Tables<'generations'>
}

export function GenerationTile({ generation, className, ...props }: GenerationTileProps) {
  const supabase = createClient()
  const realtime = supabase.channel(generation.id)

  const [data, setData] = useState<Tables<'generations'>>(generation)

  const isLoading = !data.output && data.success === null

  if (isLoading) {
    realtime
      .on(
        'postgres_changes',
        {
          event: 'UPDATE',
          schema: 'public',
          table: 'generations',
          filter: `id=eq.${generation.id}`
        },
        async (payload) => {
          // console.log('payload', payload)
          setData(payload.new as Tables<'generations'>)

          if (payload.new.output || payload.new.success === false) {
            await supabase.removeChannel(realtime)
          }
        }
      )
      .subscribe()
  }

  return (
    <div className={cn('flex size-full flex-col rounded-md border', className)} {...props}>
      <div className='relative size-full flex-1'>
        {data.output ? (
          <Image
            fill
            src={data.output}
            alt={data.prompt || 'emoji'}
            className='object-contain'
            unoptimized
          />
        ) : data.success === false ? (
          <div className='flex size-full items-center justify-center'>
            <p className='text-destructive-foreground'>Failed to generate emoji</p>
          </div>
        ) : (
          <div className='flex size-full items-center justify-center'>
            <Loader className='animate-spin' />
            {data.progress && <p className='ml-3'>{Math.round(data.progress)}%</p>}
          </div>
        )}
      </div>

      <GenerationActions data={data} />
    </div>
  )
}
