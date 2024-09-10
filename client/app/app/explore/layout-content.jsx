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
      <TabsList className='grid w-full grid-cols-3'>
        <TabsTrigger value='posts' asChild>
          <Link href='/app/explore/posts'>çöpler</Link>
        </TabsTrigger>
        <TabsTrigger value='guilds' asChild>
          <Link href='/app/explore/guilds'>çöplükler</Link>
        </TabsTrigger>
        <TabsTrigger value='users' asChild>
          <Link href='/app/explore/users'>çöpçüler</Link>
        </TabsTrigger>
      </TabsList>
      <AnimatePresence mode='wait'>
        <motion.div
          key={path}
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ ease: 'easeInOut', duration: 0.3 }}
        >
          <TabsContent value='posts'>{children}</TabsContent>
          <TabsContent value='guilds'>{children}</TabsContent>
          <TabsContent value='users'>{children}</TabsContent>
        </motion.div>
      </AnimatePresence>
    </Tabs>
  );
}
