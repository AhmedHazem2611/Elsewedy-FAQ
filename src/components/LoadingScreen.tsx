import { motion } from 'framer-motion';
import logo from '../assets/Elsewedy logo.png';

export function LoadingScreen() {
  return (
    <motion.div
      key="splash"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.05, filter: 'blur(10px)' }}
      transition={{ duration: 0.8, ease: "easeInOut" }}
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#fafafa]"
    >
      <motion.img 
        src={logo} 
        alt="Elsewedy Logo" 
        className="w-48 md:w-64"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
      />
      <motion.div
        className="mt-8 w-32 h-1 bg-gray-200 rounded-full overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
      >
        <motion.div 
          className="h-full bg-[var(--color-elsewedy-red)] rounded-full"
          initial={{ width: "0%" }}
          animate={{ width: "100%" }}
          transition={{ duration: 1.5, ease: "easeInOut", delay: 0.8 }}
        />
      </motion.div>
    </motion.div>
  );
}
