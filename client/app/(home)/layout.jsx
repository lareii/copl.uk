'use client';

import { motion, AnimatePresence } from 'framer-motion';

export default function Layout({ children }) {
  return (
    <AnimatePresence mode='wait'>
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ ease: 'easeInOut', duration: 0.3 }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
