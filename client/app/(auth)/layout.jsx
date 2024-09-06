'use client';

import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

export default function Layout({ children }) {
  return (
    <AnimatePresence mode='wait'>
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ ease: 'easeInOut', duration: 0.3 }}
      >
        <div className='h-screen flex justify-center sm:items-center sm:p-5'>
          <div className='rounded-[var(--radius)] min-h-96 w-[50rem] flex flex-col p-10 max-sm:gap-y-10 sm:bg-zinc-100 sm:bg-zinc-900 max-sm:border-0'>
            <Image
              src='/copluk.svg'
              alt='copl.uk logo'
              width={100}
              height={100}
            />
            <div className='grow flex flex-col justify-center'>{children}</div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
