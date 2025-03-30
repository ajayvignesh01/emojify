import { Tables } from '@/lib/supabase/database.types'
import { cn, createImageFileName } from '@/lib/utils'
import { ArrowLeft, Check, Copy, Download, Share2 } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { ComponentProps, useState } from 'react'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'

interface GenerationActionsProps extends ComponentProps<'div'> {
  data: Tables<'generations'>
}

export function GenerationActions({ data, className, ...props }: GenerationActionsProps) {
  const router = useRouter()

  const isLoading = !data.output && data.success === null

  const handleShare = async () => {
    if (isLoading) return

    try {
      const shareData: ShareData = {
        title: `${data.prompt} | Emojiify`,
        url: window.location.href,
        text: 'Remix this or create your own with AI 🪄!'
      }

      if (navigator.canShare(shareData)) {
        await navigator.share(shareData)
      } else {
        // Fallback to sharing just the text and URL
        await navigator.clipboard.writeText(window.location.href)
        toast.success('Link copied to clipboard')
      }
    } catch (error) {
      console.error('Error sharing emoji:', error)
      toast.error('Error sharing emoji')
    }
  }

  const [downloadSuccess, setDownloadSuccess] = useState<boolean | null>(null)
  const handleDownload = () => {
    if (isLoading || !data.output) return

    try {
      const link = document.createElement('a')
      link.href = data.output
      link.download = createImageFileName({ id: data.id, prompt: data.prompt })
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)

      setDownloadSuccess(true)
      setTimeout(() => setDownloadSuccess(null), 2000)
    } catch (error) {
      console.error('Error downloading emoji:', error)
      toast.error('Error downloading emoji')
    }
  }

  const [copySuccess, setCopySuccess] = useState<boolean | null>(null)
  const handleCopy = async () => {
    if (isLoading || !data.output) return

    try {
      const imagePromise = () => fetch(data.output as string).then((res) => res.blob())
      await navigator.clipboard.write([new ClipboardItem({ ['image/png']: imagePromise() })])

      setCopySuccess(true)
      setTimeout(() => setCopySuccess(null), 2000)
    } catch (error) {
      console.error('Error copying emoji:', error)
      toast.error('Error copying emoji')
    }
  }

  return (
    <div className={cn('flex flex-row gap-4 p-4', className)} {...props}>
      <div className='mr-auto flex flex-row gap-4'>
        <Button onClick={() => router.back()} variant='secondary' className='max-sm:size-9'>
          <ArrowLeft />
          <span className='max-sm:hidden'>Back</span>
        </Button>
      </div>
      <div className='ml-auto flex flex-row gap-4'>
        <Button
          disabled={isLoading}
          onClick={handleShare}
          variant='secondary'
          className='max-sm:size-9'
        >
          <Share2 />
          <span className='max-sm:hidden'>Share</span>
        </Button>
        <Button
          disabled={isLoading}
          onClick={handleDownload}
          variant='secondary'
          className='max-sm:size-9'
        >
          {downloadSuccess ? <Check /> : <Download />}
          <span className='max-sm:hidden'>Download</span>
        </Button>
        <Button
          disabled={isLoading}
          onClick={handleCopy}
          variant='secondary'
          className='max-sm:size-9'
        >
          {copySuccess ? <Check /> : <Copy />}
          <span className='max-sm:hidden'>Copy</span>
        </Button>
      </div>
    </div>
  )
}
