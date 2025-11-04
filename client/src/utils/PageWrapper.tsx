import { motion } from 'framer-motion';

function PageWrapper({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.4, ease: 'easeInOut' }}
      className='min-h-[calc(100vh-5rem)]'
    >
      {children}
    </motion.div>
  );
}

export default PageWrapper;
