'use client'

import { genEmoji } from '@/app/actions'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { ArrowUp, Loader, X } from 'lucide-react'
import { AnimatePresence, motion } from 'motion/react'
import { useRef, useState, useTransition } from 'react'
export function Prompt() {
  const textInputRef = useRef<HTMLTextAreaElement>(null)
  const [invalid, setInvalid] = useState<string | null>(null)
  const [disabled, setDisabled] = useState(false)

  const [input, setInput] = useState('')
  const handleInput = (value: string) => {
    setInput(value)
    if (invalid) {
      setInvalid(null)
    }
  }

  const [isPending, startTransition] = useTransition()
  const handleSubmit = () =>
    startTransition(async () => {
      if (invalid) {
        handleInput('')
        return
      }

      const result = await genEmoji(input)
      if (result.generationId === null) {
        setInvalid(result.message)
        textInputRef.current?.focus()
      }
    })
  return (
    <div className='relative w-full max-w-2xl'>
      <AnimatePresence>
        {invalid && (
          <motion.div
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: -40, opacity: 1 }}
            exit={{ y: -20, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 500, damping: 30 }}
            className='text-destructive-foreground bg-destructive/20 dark:bg-destructive/40 absolute inset-x-0 flex items-center rounded-md px-3 py-1.5 text-sm'
          >
            {invalid}
          </motion.div>
        )}
      </AnimatePresence>

      <form
        className={cn(
          'border-input shadow-xs bg-background group relative flex w-full flex-col rounded-md border',
          'focus-within:border-ring focus-within:ring-ring/50 transition-[color,box-shadow] focus-within:ring-[3px]',
          'has-aria-invalid:ring-destructive/20 dark:has-aria-invalid:ring-destructive/40 has-aria-invalid:border-destructive',
          'has-aria-disabled:pointer-events-none has-aria-disabled:opacity-50'
        )}
        action={handleSubmit}
      >
        <textarea
          aria-disabled={disabled}
          aria-invalid={Boolean(invalid)}
          disabled={disabled}
          placeholder='Describe your image'
          value={input}
          onChange={(e) => handleInput(e.target.value)}
          ref={textInputRef}
          className={cn(
            'placeholder:text-muted-foreground p-3 pb-1.5',
            'max-h-[138px] text-base',
            'md:max-h-[118px] md:text-sm',
            'field-sizing-content resize-none outline-none'
          )}
        />
        <div className='flex items-center gap-2 p-3'>
          <Button
            disabled={isPending || disabled || input.trim().length === 0}
            className='ml-auto size-8'
            size='icon'
            type='submit'
            variant={invalid ? 'destructive' : 'secondary'}
          >
            {Boolean(invalid) ? (
              <X />
            ) : isPending ? (
              <Loader className='animate-spin' />
            ) : (
              <ArrowUp />
            )}
          </Button>
        </div>
      </form>
    </div>
  )
}
