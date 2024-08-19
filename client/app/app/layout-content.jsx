'use client';

import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import Loading from '@/components/app/Loading';
import Navbar from '@/components/app/Navbar';
import useLoadingStore from '@/stores/loading';

export default function LayoutContent({ children }) {
  const pathname = usePathname();
  const loading = useLoadingStore((state) => state.loading);

  if (loading) return <Loading />;

  return (
    <div className='flex max-w-screen-lg mx-auto gap-x-5 max-lg:flex-col lg:pt-14 lg:px-5'>
      <Navbar />
      <div className='w-full max-lg:p-5 pb-5 min-h-[calc(100vh-3.5rem)]'>
        <AnimatePresence mode='wait'>
          <motion.div
            key={pathname}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ ease: 'easeInOut', duration: 0.3 }}
            className='w-full h-full'
          >
            {children}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}