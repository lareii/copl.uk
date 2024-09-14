import Link from 'next/link';
import Image from 'next/image';
import { Home, Compass, Bell } from 'lucide-react';
import Item from '@/components/app/Navbar/Item';
import Dropdown from '@/components/app/Navbar/Dropdown';
import PostModal from '@/components/app/Navbar/PostModal';

export default function Uncollapsed({ router, pathname }) {
  return (
    <nav className='pb-5 sticky top-14 self-start h-[calc(100vh-3.5rem)] w-60 '>
      <div className='flex flex-col gap-5 h-full'>
        <Link href='/app' className='w-fit mb-5'>
          <Image
            src='/copluk.svg'
            alt='copl.uk logo'
            width={170}
            height={170}
            className='mb-1 select-none'
          />
          <div className='font-medium text-xs text-muted-foreground'>
            zihin çöplüğün, kafana göre.
          </div>
        </Link>
        <div className='flex flex-col justify-between grow'>
          <div>
            <div className='mb-3 font-medium text-xs text-muted-foreground'>
              genel
            </div>
            <div className='flex flex-col'>
              <Item pathname={pathname} href='/app' icon={Home} label='akış' />
              <Item
                pathname={pathname}
                href='/app/explore'
                icon={Compass}
                label='keşfet'
              />
              <Item
                pathname={pathname}
                href='/app/notifications'
                icon={Bell}
                label='bildirimler'
              />
            </div>
            <div className='mt-5 mb-3 font-medium text-xs text-muted-foreground'>
              yaratıcılık
            </div>
            <div className='flex flex-col'>
              <PostModal />
            </div>
          </div>
          <div className='flex flex-col'>
            <Dropdown router={router} pathname={pathname} />
            <hr className='mb-3 mt-2' />
            <div className='text-zinc-400 text-xs'>
            <div>copl.uk, BSD 3-Clause lisansı altında lisanslanmış özgür bir yazılımdır.</div>
              <Link href='#' className='underline'>
                hakkında
              </Link>{' '}
              <Link href='#' className='underline'>
                gizlilik politikası
              </Link>{' '}
              <Link href='#' className='underline'>
                kaynak kodları
              </Link>{' '}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
