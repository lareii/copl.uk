'use client';

import { LoaderCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

export default function Loading() {
  return (
    <AnimatePresence mode='wait'>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ ease: 'easeInOut', duration: 0.3 }}
        className='h-screen flex flex-col items-center justify-center'
      >
        <Image src='/copluk.png' alt='copl.uk logo' width={170} height={170} className='mb-7' />
        <LoaderCircle className='w-6 h-6 animate-spin' />
      </motion.div>
    </AnimatePresence>
  );
}