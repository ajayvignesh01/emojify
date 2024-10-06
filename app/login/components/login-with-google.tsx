'use client'

import { LoaderCircleIcon, LogoGoogleIcon } from '@/components/icons'
import { Button } from '@/components/ui/button'
import { useFormStatus } from 'react-dom'

export function SignInWithGoogle() {
  const { pending } = useFormStatus()

  return (
    <Button size='lg' className='w-full gap-3' type='submit' disabled={pending}>
      {!pending ? <LogoGoogleIcon /> : <LoaderCircleIcon />}
      <span>Login with Google</span>
    </Button>
  )
}
