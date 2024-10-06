import { Emojify } from '@/components/header/emojify'
import {
  DollarIcon,
  GridMasonryIcon,
  InformationIcon,
  LogoGithubIcon,
  MenuIcon,
  UserIcon,
} from '@/components/icons'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { delay } from '@/lib/utils'
import { createClient } from '@/lib/utils/supabase/server'
import Link from 'next/link'
import { NewGeneration } from './new-generation'
import { Support } from './support'

export async function Header() {
  const supabase = createClient()
  const fake = await delay(3000)
  const user = await supabase.auth.getUser()

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

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant='ghost'
                size='icon'
                className='border-input text-muted-foreground size-8 rounded-full border'
              >
                {user ? (
                  <Avatar className='size-full'>
                    <AvatarImage src='https://github.com/shadcn.png' />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                ) : (
                  <MenuIcon />
                )}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align='end' className='min-w-[16rem] rounded-xl p-0'>
              <DropdownMenuGroup className='p-2'>
                <DropdownMenuItem
                  className='text-muted-foreground focus:text-accent-foreground flex w-full gap-3 rounded-md py-2.5'
                  asChild
                >
                  <Link href='/login'>
                    <UserIcon />
                    Login
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuGroup>

              <DropdownMenuSeparator className='my-0' />

              <DropdownMenuGroup className='p-2'>
                <DropdownMenuItem
                  className='text-muted-foreground focus:text-accent-foreground flex w-full gap-3 rounded-md py-2.5'
                  asChild
                >
                  <Link href='/explore'>
                    <GridMasonryIcon />
                    Explore
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem
                  className='text-muted-foreground focus:text-accent-foreground flex w-full gap-3 rounded-md py-2.5'
                  asChild
                >
                  <Link href='/faqs'>
                    <InformationIcon />
                    FAQs
                  </Link>
                </DropdownMenuItem>
                <Dialog>
                  <DialogTrigger asChild>
                    <DropdownMenuItem
                      className='text-muted-foreground focus:text-accent-foreground flex w-full gap-3 rounded-md py-2.5'
                      asChild
                    >
                      <Link href='/pricing'>
                        <DollarIcon />
                        Pricing
                      </Link>
                    </DropdownMenuItem>
                  </DialogTrigger>
                  <DialogContent></DialogContent>
                </Dialog>
                <DropdownMenuItem
                  className='text-muted-foreground focus:text-accent-foreground flex w-full gap-3 rounded-md py-2.5'
                  asChild
                >
                  <Link
                    href='https://github.com/ajayvignesh01/emojify'
                    rel='noopener noreferrer'
                    target='_blank'
                  >
                    <LogoGithubIcon />
                    Github
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  )
}
