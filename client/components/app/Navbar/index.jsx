'use client';

import { useRouter, usePathname } from 'next/navigation';
import { useMedia } from 'react-use';
import Uncollapsed from '@/components/app/Navbar/Uncollapsed';
import Collapsed from '@/components/app/Navbar/Collapsed';

export default function Navbar() {
  const router = useRouter();
  const pathname = usePathname();

  const isWide = useMedia('(min-width: 1024px)', false); // tailwind css lg breakpoint

  return isWide ? (
    <Uncollapsed router={router} pathname={pathname} />
  ) : (
    <Collapsed router={router} pathname={pathname} />
  );
}
