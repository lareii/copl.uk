'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { motion, AnimatePresence } from 'framer-motion';

export default function Layout({ children }) {
  const pathname = usePathname().split('/')[1];

  return (
    <AnimatePresence mode='wait'>
      <motion.div
        key={pathname}
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ ease: 'easeInOut', duration: 0.3 }}
      >
        <div className='h-full min-h-screen flex flex-col max-w-screen-xl mx-auto px-5'>
          <nav className='py-5 flex justify-between items-center'>
            <Link href='/'>
              <Image
                src='/copluk.svg'
                alt='logo'
                width={128}
                height={128}
                className='select-none'
              />
            </Link>
            <div className='gap-3'>
              <Button variant='ghost' asChild>
                <Link href='/login'>oturum aç</Link>
              </Button>
              <Button>
                <Link href='/register'>kayıt ol</Link>
              </Button>
            </div>
          </nav>
          {children}
        </div>
        <footer className='relative z-10 bg-zinc-900 border-t border-zinc-700'>
          <div className='max-w-screen-xl mx-auto px-5 py-20 flex max-md:flex-col gap-y-10 justify-between'>
            <div>
              <Link href='/'>
                <Image
                  src='/copluk.svg'
                  alt='logo'
                  width={150}
                  height={150}
                  className='select-none'
                />
              </Link>
              <div className='text-xs text-muted-foreground mt-1'>
                zihin çöplüğün, kafana göre.
              </div>
              <div className='text-sm text-muted-foreground mt-5'>
                copl.uk,{' '}
                <Link
                  href={'https://github.com/lareii/copl.uk/blob/master/LICENSE'}
                  target='_blank'
                  className='underline'
                >
                  BSD 3-Clause lisansı
                </Link>{' '}
                altında
                <br /> lisanslanmış özgür bir yazılımdır.
              </div>
            </div>
            <hr />
            <div className='text-sm flex justify-between gap-32 max-md:gap-3'>
              <div>
                <div className='text-muted-foreground mb-2'>copl.uk</div>
                <div className='flex flex-col gap-1'>
                  <div>
                    <Link href={'/about'}>hakkında</Link>
                  </div>
                </div>
              </div>
              <div>
                <div className='text-muted-foreground mb-2'>yasal</div>
                <div className='flex flex-col gap-1'>
                  <Link href={'/privacy'}>gizlilik politikası</Link>
                  <Link href={'/tos'}>hizmet şartları</Link>
                  <Link href={'/content'}>içerik politikası</Link>
                </div>
              </div>
              <div>
                <div className='text-muted-foreground mb-2'>sosyal</div>
                <div className='flex flex-col gap-1'>
                  <Link
                    href={'https://github.com/lareii/copl.uk/'}
                    target='_blank'
                  >
                    github
                  </Link>
                  <Link href={'https://discord.gg/taMRRAHb6y'} target='_blank'>
                    discord
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </footer>
      </motion.div>
    </AnimatePresence>
  );
}
