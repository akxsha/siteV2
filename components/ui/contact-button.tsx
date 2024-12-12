import copy from 'copy-to-clipboard'
import { getCalApi } from '@calcom/embed-react'
import { useEffect } from 'react'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { toast } from '@/app//hooks/use-toast'
import { email } from '@/app/content/email'


export function ContactButton() {
  const copyEmail = () => {
    toast({
      title: 'Email copied: ' + email,
    })
    copy(email)
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          className='group bg-black text-white font-amstelvar-lead px-3 py-3 rounded-lg flex gap-6 justify-between items-center hover:bg-black/90 outline-none focus-visible:ring-3 focus-visible:ring-black/30 ring-0 transition-all'
          style={{ width: 'fit-content' }}
        >
          Get In Touch
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align='center'>
        <DropdownMenuItem onClick={copyEmail}>Copy Email</DropdownMenuItem>
        {/* <CalDotComMeeting>Virtual Meeting</CalDotComMeeting> */}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

function CalDotComMeeting({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    ;(async function () {
      const cal = await getCalApi({ namespace: '15min' })
      cal('ui', {
        styles: { branding: { brandColor: '#000000' } },
        hideEventTypeDetails: false,
        layout: 'month_view',
      })
    })()
  }, [])

  return (
    <DropdownMenuItem
      data-cal-namespace='15min'
      data-cal-link='concordance/15min'
      data-cal-config='{"layout":"month_view"}'
    >
      {children}
    </DropdownMenuItem>
  )
}
