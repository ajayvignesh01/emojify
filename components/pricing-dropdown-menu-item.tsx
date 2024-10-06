import { Dialog, DialogContent, DialogTrigger } from '@radix-ui/react-dialog'
import { DropdownMenuItem } from '@radix-ui/react-dropdown-menu'
import { DollarIcon } from './icons'

export function PricingDropdownMenuItem() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <DropdownMenuItem className='flex w-full gap-3 rounded-md py-2.5'>
          <DollarIcon className='fill-muted-foreground' />
          Pricing
        </DropdownMenuItem>
      </DialogTrigger>
      <DialogContent></DialogContent>
    </Dialog>
  )
}
