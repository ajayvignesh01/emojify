'use client'

import { genEmoji } from '@/app/actions'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { ArrowUp, Loader, X } from 'lucide-react'
import { AnimatePresence, motion } from 'motion/react'
import { useRef, useState, useTransition } from 'react'
export function Prompt() {
  const textInputRef = useRef<HTMLTextAreaElement>(null)

  const [message, setMessage] = useState<{
    message: string
    type: 'warning' | 'error'
    disabled: boolean
    clearOnInput?: boolean
    clearOnSubmit?: boolean
  } | null>(null)

  const [input, setInput] = useState('')
  const handleInput = (value: string) => {
    setInput(value)
    if (message?.clearOnInput || message?.clearOnSubmit) {
      setMessage(null)
    }
  }

  const [isPending, startTransition] = useTransition()
  const handleSubmit = () =>
    startTransition(async () => {
      const result = await genEmoji(input)
      if (result) {
        setMessage({
          message: result.message,
          type: result.type,
          disabled: result.disabled,
          clearOnInput: result.clearOnInput,
          clearOnSubmit: result.clearOnSubmit
        })
        textInputRef.current?.focus()
      }
    })

  // Handle pressing enter to submit the form
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    const commandEnter = (e.ctrlKey || e.metaKey) && (e.key === 'Enter' || e.key === 'NumpadEnter')
    const shiftEnter = e.shiftKey && (e.key === 'Enter' || e.key === 'NumpadEnter')
    const enter = !commandEnter && !shiftEnter && (e.key === 'Enter' || e.key === 'NumpadEnter')

    if (commandEnter || enter) {
      e.preventDefault()

      // If the message is pending, do nothing
      if (isPending) {
        return
      }
      // If we are in a message state, clear the message if applicable
      else if (message?.clearOnSubmit) {
        setInput('')
        setMessage(null)
        return
      }
      // If the input is empty, show a warning message
      else if (e.currentTarget.value.trim().length === 0) {
        setMessage({
          message: `Please enter a prompt ${Math.random()}`,
          type: 'warning',
          disabled: false,
          clearOnInput: true,
          clearOnSubmit: false
        })
      }
      // Otherwise, submit the form
      else {
        e.currentTarget.form?.requestSubmit()
      }
    }
  }

  return (
    <div className='relative w-full max-w-2xl'>
      <AnimatePresence>
        {message && (
          <motion.div
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: -40, opacity: 1 }}
            exit={{ y: -20, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 500, damping: 30 }}
            className={cn('absolute inset-x-0 flex items-center rounded-md px-3 py-1.5 text-sm', {
              'text-warning-foreground bg-warning/20 dark:bg-warning/40':
                message.type === 'warning',
              'text-destructive-foreground bg-destructive/20 dark:bg-destructive/40':
                message.type === 'error'
            })}
          >
            {message.message}
          </motion.div>
        )}
      </AnimatePresence>

      <form
        data-warning={message?.type === 'warning'}
        data-error={message?.type === 'error'}
        className={cn(
          'border-input shadow-xs bg-background group relative flex w-full flex-col rounded-md border',
          'focus-within:border-ring focus-within:ring-ring/50 transition-[color,box-shadow] focus-within:ring-[3px]',
          'data-[warning=true]:ring-warning/20 dark:data-[warning=true]:ring-warning/40 data-[warning=true]:border-warning',
          'data-[error=true]:ring-destructive/20 dark:data-[error=true]:ring-destructive/40 data-[error=true]:border-destructive',
          'has-aria-disabled:pointer-events-none has-aria-disabled:opacity-50'
        )}
        action={handleSubmit}
      >
        <textarea
          aria-disabled={message?.disabled}
          disabled={message?.disabled}
          placeholder='Describe your image'
          value={input}
          onKeyDown={handleKeyDown}
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
          {message?.clearOnSubmit ? (
            <Button
              className='ml-auto size-8'
              size='icon'
              type='button'
              variant={message.type === 'warning' ? 'warning' : 'destructive'}
              onClick={(e) => {
                e.preventDefault()
                setInput('')
                setMessage(null)
              }}
            >
              <X />
            </Button>
          ) : (
            <Button
              className='ml-auto size-8'
              size='icon'
              type='submit'
              variant='secondary'
              disabled={isPending || message !== null || input.trim().length === 0}
            >
              {isPending ? <Loader className='animate-spin' /> : <ArrowUp />}
            </Button>
          )}
        </div>
      </form>
    </div>
  )
}
