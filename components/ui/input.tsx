import * as React from 'react'

import { cn } from '@/lib/utils'

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          'border-input placeholder:text-muted-foreground flex h-9 w-full rounded-md border bg-transparent py-1 px-3 text-sm shadow-sm',
          'transition-[color,_background-color,_border-color,_text-decoration-color,_fill,_stroke,_box-shadow]',
          'file:text-foreground file:border-0 file:bg-transparent file:text-sm file:font-medium',
          'focus-visible:ring-ring focus-visible:ring-1 focus-visible:outline-none',
          'disabled:cursor-not-allowed disabled:opacity-50',
          className,
        )}
        ref={ref}
        {...props}
      />
    )
  },
)
Input.displayName = 'Input'

export { Input }
