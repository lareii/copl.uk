import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Home, Compass, Bell, Menu, User } from 'lucide-react';
import Item from '@/components/app/Navbar/Item';
import Dropdown from '@/components/app/Navbar/Dropdown';
import PostModal from '@/components/app/Navbar/PostModal';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { useAuthStore } from '@/stores/auth';

export default function Collapsed({ router, pathname }) {
  const [icon, setIcon] = useState(<Menu className='h-4 w-4' />);
  const user = useAuthStore((state) => state.user);

  useEffect(() => {
    if (pathname === '/app') {
      setIcon(<Home className='h-4 w-4' />);
    } else if (pathname === '/app/explore') {
      setIcon(<Compass className='h-4 w-4' />);
    } else if (pathname === '/app/notifications') {
      setIcon(<Bell className='h-4 w-4' />);
    } else if (pathname === `/app/users/${user?.username}`) {
      setIcon(<User className='h-4 w-4' />);
    } else {
      setIcon(<Menu className='h-4 w-4' />);
    }
  }, [pathname, user]);

  return (
    <nav className='z-10 sticky self-start w-full top-0 px-5 py-3 backdrop-blur-xl border-b'>
      <div className='flex justify-between items-center'>
        <Link href='/app'>
          <Image
            src='/copluk.svg'
            alt='copl.uk logo'
            width={120}
            height={120}
          />
        </Link>
        <Sheet>
          <SheetTrigger asChild>
            <Button variant='ghost' size='icon'>
              {icon}
            </Button>
          </SheetTrigger>
          <SheetContent className='flex flex-col justify-between'>
            <div className='mt-5'>
              <div className='mb-3 font-medium text-xs text-muted-foreground'>
                genel
              </div>
              <div className='flex flex-col'>
                <Item
                  pathname={pathname}
                  href='/app'
                  icon={Home}
                  label='akış'
                />
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
              <hr className='mb-5 mt-3' />
              <div>
                <Image
                  src='/copluk.svg'
                  alt='copl.uk logo'
                  width={120}
                  height={120}
                />
                <div className='text-zinc-400 text-xs mt-3'>
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
          </SheetContent>
        </Sheet>
      </div>
    </nav>
  );
}
