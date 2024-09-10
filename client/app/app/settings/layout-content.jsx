'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export default function LayoutContent({ children }) {
  const pathname = usePathname();
  const path = pathname.split('/')[3];

  return (
    <Tabs value={path}>
      <TabsList className='grid w-full grid-cols-2'>
        <TabsTrigger value='profile' asChild>
          <Link href='/app/settings/profile'>profil</Link>
        </TabsTrigger>
        <TabsTrigger value='account' asChild>
          <Link href='/app/settings/account'>hesap</Link>
        </TabsTrigger>
      </TabsList>
      <AnimatePresence mode='wait'>
        <motion.div
          key={path}
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ ease: 'easeInOut', duration: 0.3 }}
          className='w-full mt-3'
        >
          <TabsContent value='profile'>{children}</TabsContent>
          <TabsContent value='account'>{children}</TabsContent>
        </motion.div>
      </AnimatePresence>
    </Tabs>
  );
}
