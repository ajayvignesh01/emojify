'use client'

import { genEmoji } from '@/app/actions'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { ArrowUp } from 'lucide-react'
import { useState, useTransition } from 'react'

export function Prompt() {
  const [invalid, setInvalid] = useState(false)
  const [disabled, setDisabled] = useState(false)

  const [input, setInput] = useState('')
  const handleInput = (value: string) => {
    setInput(value)
    if (invalid) {
      setInvalid(false)
    }
  }

  const [isPending, startTransition] = useTransition()
  const handleSubmit = () =>
    startTransition(async () => {
      const result = await genEmoji(input)
      if (result.generationId === null) {
        setInvalid(true)
      }
    })
  return (
    <form
      className={cn(
        'border-input shadow-xs group flex w-full max-w-2xl flex-col rounded-md border bg-transparent',
        'focus-within:border-ring focus-within:ring-ring/50 transition-[color,box-shadow] focus-within:ring-[3px]',
        'has-aria-invalid:ring-destructive/20 dark:has-aria-invalid:ring-destructive/40 has-aria-invalid:border-destructive',
        'has-aria-disabled:pointer-events-none has-aria-disabled:opacity-50'
      )}
      action={handleSubmit}
    >
      <textarea
        aria-disabled={disabled}
        aria-invalid={invalid}
        disabled={disabled}
        placeholder='Describe your image'
        value={input}
        onChange={(e) => handleInput(e.target.value)}
        className={cn(
          'placeholder:text-muted-foreground p-3 pb-1.5',
          'max-h-[138px] text-base',
          'md:max-h-[118px] md:text-sm',
          'field-sizing-content resize-none outline-none'
        )}
      />
      <div className='flex items-center gap-2 p-3'>
        <Button
          disabled={disabled || invalid || input.trim().length === 0}
          className='ml-auto size-8'
          size='icon'
          type='submit'
        >
          <ArrowUp />
        </Button>
      </div>
    </form>
  )
}
