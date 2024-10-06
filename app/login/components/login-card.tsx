import { login } from '@/app/login/actions'
import { SignInWithGoogle } from '@/app/login/components/login-with-google'
import { EmojifyIcon } from '@/components/icons'
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { cn } from '@/lib/utils'
import Link from 'next/link'
import { ComponentPropsWithoutRef } from 'react'

interface LoginCardProps extends Omit<ComponentPropsWithoutRef<'div'>, 'className'> {
  className?:
    | string
    | {
        Card?: string
        CardHeader?: string
        CardTitle?: string
        CardDescription?: string
        CardFooter?: string
      }
}

export function LoginCard({ className, ...props }: LoginCardProps) {
  return (
    <Card
      className={cn(
        'mx-5 flex flex-col gap-4 overflow-hidden sm:mx-auto sm:w-full sm:max-w-md',
        typeof className === 'string' ? className : className?.Card,
      )}
      {...props}
    >
      <CardHeader
        className={cn('space-y-0 p-0', typeof className === 'object' && className?.CardHeader)}
      >
        <CardTitle
          className={cn(
            'text-center text-3xl',
            typeof className === 'object' && className?.CardTitle,
          )}
        >
          <EmojifyIcon className='m-4 mx-auto size-12' />
          Emojify
        </CardTitle>
        <CardDescription
          className={cn(
            'pt-1.5 text-center',
            typeof className === 'object' && className?.CardDescription,
          )}
        >
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
        </CardDescription>
      </CardHeader>
      <CardFooter
        className={cn('bg-accent p-4', typeof className === 'object' && className?.CardFooter)}
      >
        <form action={login} className='w-full'>
          <SignInWithGoogle />
        </form>
      </CardFooter>
    </Card>
  )
}
