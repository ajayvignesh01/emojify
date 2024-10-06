import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuGroup,
  ContextMenuItem,
  ContextMenuTrigger,
} from '@/components/ui/context-menu'
import Link from 'next/link'
import { EmojifyIcon, HomeIcon } from '../icons'

export function Emojify() {
  return (
    <ContextMenu>
      <ContextMenuTrigger
        className='focus-visible:ring-ring rounded-full transition-shadow focus-visible:ring-1 focus-visible:outline-none'
        asChild
      >
        <Link href='/'>
          <span className='sr-only'>Home</span>
          <EmojifyIcon className='size-8' />
        </Link>
      </ContextMenuTrigger>
      <ContextMenuContent className='rounded-xl p-0'>
        <ContextMenuGroup className='p-2'>
          <ContextMenuItem className='flex w-full gap-3 rounded-md py-2.5'>
            <EmojifyIcon />
            Copy Logo as SVG
          </ContextMenuItem>
          <ContextMenuItem className='flex w-full gap-3 rounded-md py-2.5'>
            <Link href='/'>
              <HomeIcon className='fill-muted-foreground' />
              Home Page
            </Link>
          </ContextMenuItem>
        </ContextMenuGroup>
      </ContextMenuContent>
    </ContextMenu>
  )
}
