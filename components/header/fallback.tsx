import { Emojify } from '@/components/header/emojify'
import { Skeleton } from '../ui/skeleton'
import { NewGeneration } from './new-generation'
import { Support } from './support'

export function HeaderFallback() {
  return (
    <header className='bg-background supports-[backdrop-filter]:bg-background/60 flex w-full flex-col gap-3 p-3 backdrop-blur md:h-16 md:flex-row md:items-center lg:px-4'>
      <div className='flex w-full items-center gap-8'>
        {/* Logo */}
        <div className='flex items-center gap-2'>
          <Emojify />

          {/* TODO: Breadcrumbb */}
        </div>

        <div className='ml-auto flex items-center gap-2 sm:gap-4'>
          <NewGeneration />
          <Support />

          <Skeleton className='size-8 rounded-full' />
        </div>
      </div>
    </header>
  )
}
