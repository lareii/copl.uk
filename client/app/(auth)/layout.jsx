'use client';

import { usePathname } from 'next/navigation';
import Image from 'next/image';
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
        <div className='h-screen flex justify-center md:items-center md:p-5'>
          <div className='rounded-[var(--radius)] h-96 w-[50rem] flex flex-col p-10 max-md:gap-y-10 md:bg-zinc-100 md:bg-zinc-900 max-md:border-0'>
            <Image
              src='/copluk.svg'
              alt='copl.uk logo'
              width={100}
              height={100}
            />
            <div className='h-full flex flex-col justify-center'>{children}</div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
