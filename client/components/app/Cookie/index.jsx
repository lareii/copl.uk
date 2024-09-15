'use client';

import { useEffect, useState } from 'react';
import { useLocalStorage } from 'react-use';
import { Button } from '@/components/ui/button';

export default function CookieBanner() {
  const [hasAcceptedCookies, setHasAcceptedCookies] = useLocalStorage(
    'hasAcceptedCookies',
    false
  );
  const [isCookieBannerVisible, setIsCookieBannerVisible] = useState(false);

  useEffect(() => {
    if (!hasAcceptedCookies) setIsCookieBannerVisible(true);
    else setIsCookieBannerVisible(false);
  }, [hasAcceptedCookies]);

  return (
    isCookieBannerVisible && (
      <div className='absolute bottom-0 sticky z-50 w-full bg-zinc-800 border-t border-zinc-700 flex justify-center items-center gap-2 py-2 px-5 text-sm'>
        🍪 bu site çerezleri kullanır, devam ederek bunu kabul etmiş olursunuz.
        <Button onClick={() => setHasAcceptedCookies(true)} className='h-8'>
          anladım
        </Button>
      </div>
    )
  );
}
