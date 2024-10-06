'use client'

import { login } from '@/app/login/actions'
import { SignInWithGoogle } from '@/app/login/components/login-with-google'
import { EmojifyIcon } from '@/components/icons'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from '@/components/ui/drawer'
import { useMediaQuery } from '@/lib/hooks'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

export default function Login() {
  const router = useRouter()
  const isDesktop = useMediaQuery('(min-width: 768px)')

  if (isDesktop) {
    return (
      <Dialog open={true} onOpenChange={(_open) => router.back()}>
        <DialogContent className='overflow-hidden p-0 sm:max-w-md'>
          <DialogHeader>
            <DialogTitle className='text-center text-3xl'>
              <EmojifyIcon className='m-4 mx-auto size-12' />
              Emojify
            </DialogTitle>
            <DialogDescription className='text-center'>
              <span className='text-accent-foreground'>
                Generate emojis from text or photos using AI.
              </span>
              <br />
              <span>
                <Link className='hover:text-primary underline underline-offset-4' href='/terms'>
                  Terms of Service
                </Link>
                {' and '}
                <Link className='hover:text-primary underline underline-offset-4' href='/privacy'>
                  Privacy Policy
                </Link>
                .
              </span>
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className='bg-accent p-4'>
            <form action={login} className='w-full'>
              <SignInWithGoogle />
            </form>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    )
  }

  return (
    <Drawer open={true} onOpenChange={(_open) => router.back()}>
      <DrawerContent className='overflow-hidden'>
        <DrawerHeader>
          <DrawerTitle className='text-center text-3xl'>
            <EmojifyIcon className='m-4 mx-auto size-12' />
            Emojify
          </DrawerTitle>
          <DrawerDescription className='text-center'>
            <span className='text-accent-foreground'>
              Generate emojis from text or photos using AI.
            </span>
            <br />
            <span>
              <Link className='hover:text-primary underline underline-offset-4' href='/terms'>
                Terms of Service
              </Link>
              {' and '}
              <Link className='hover:text-primary underline underline-offset-4' href='/privacy'>
                Privacy Policy
              </Link>
              .
            </span>
          </DrawerDescription>
        </DrawerHeader>
        <DrawerFooter className='bg-accent p-4'>
          <form action={login} className='w-full'>
            <SignInWithGoogle />
          </form>
          <DrawerClose asChild>
            <Button onClick={() => router.back()} variant='outline'>
              Cancel
            </Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}
