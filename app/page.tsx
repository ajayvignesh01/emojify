import { Button } from '@/components/ui/button'

export default function Home() {
  return (
    <div className='animate-in fade-in zoom-in flex h-screen w-screen items-center justify-center gap-4'>
      <div className='flex flex-row gap-2'>
        <Button className='bg-ds-gray-700 hover:bg-ds-gray-800'>Gray</Button>
        <Button className='bg-ds-blue-700 hover:bg-ds-blue-800'>Blue</Button>
        <Button className='bg-ds-red-700 hover:bg-ds-red-800'>Red</Button>
        <Button className='bg-ds-amber-700 hover:bg-ds-amber-800'>Amber</Button>
        <Button className='bg-ds-green-700 hover:bg-ds-green-800'>Green</Button>
        <Button className='bg-ds-teal-700 hover:bg-ds-teal-800'>Teal</Button>
        <Button className='bg-ds-purple-700 hover:bg-ds-purple-800'>Purple</Button>
        <Button className='bg-ds-pink-700 hover:bg-ds-pink-800'>Pink</Button>
      </div>
    </div>
  )
}
