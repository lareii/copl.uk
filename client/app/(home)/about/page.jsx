'use client';

import { useState } from 'react';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from '@/components/ui/tooltip';
import Link from 'next/link';

export default function Page() {
  const [open, setOpen] = useState(false);

  return (
    <div className='my-20 text-sm'>
      <div className='text-3xl font-black'>Hakkında</div>
      <div className='text-muted-foreground'>
        copl.uk, günlük yaşamınızda aklınıza gelen sıra dışı düşünceleri ve
        absürt fikirleri paylaşabileceğiniz bir platformdur. Bu alanda kendinizi
        ifade etmekte{' '}
        <TooltipProvider>
          <Tooltip open={open}>
            <TooltipTrigger
              onClick={() => setOpen(!open)}
              onMouseEnter={() => setOpen(true)}
              onMouseLeave={() => setOpen(false)}
              onTouchStart={() => setOpen(!open)}
              className='underline select-none'
            >
              özgürsünüz
            </TooltipTrigger>
            <TooltipContent className='text-xs'>
              <Link href='/content'>içerik politikasına uyduğunuz sürece</Link>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        . İster garip bir bilgi, ister ilginç bir gözlem topluluğun dikkatine
        sunulabilir.
      </div>
      <div>
        <div className='mt-10 text-lg font-bold'>Nedir bu copl.uk?</div>
        <div className='text-muted-foreground'>
          copl.uk ismi &quot;çöplük&quot; kelimesinden esinlenilmiştir. Bu
          platformda paylaşılan içeriklere ise &quot;çöp&quot;, çöpleri paylaşan
          kullancılara &quot;çöpçü&quot;, çöpçülerin oluşturduğu topluluklara
          ise &quot;çöplük &quot; adı verilir. Konseptin çöp üzerine olması
          paylaşılan içeriklerin kalitesiz ya da gereksiz olduğu anlamına
          gelmez. Aksine, copl.uk&apos; te her türlü düşünceye yer vardır ve
          herkesin paylaşımı değerlidir.
        </div>
      </div>
      <div>
        <div className='mt-10 text-lg font-bold'>
          copl.uk nasıl geliştiriliyor?
        </div>
        <div className='text-muted-foreground'>
          copl.uk özgür yazılım bir proje olup, herkesin katkıda bulunabileceği
          bir projedir. Bulduğunuz bir hata veya eklemek istediğiniz bir özellik
          olduğunda bunu{' '}
          <Link
            href='https://github.com/lareii/copl.uk'
            target='_blank'
            className='underline'
          >
            GitHub
          </Link>{' '}
          üzerinden veya{' '}
          <Link
            href='https://discord.gg/taMRRAHb6y'
            target='_blank'
            className='underline'
          >
            Discord sunucumuzda
          </Link>{' '}
          bildirebilir ya da katkıda bulunabilirsiniz.
        </div>
      </div>
    </div>
  );
}
