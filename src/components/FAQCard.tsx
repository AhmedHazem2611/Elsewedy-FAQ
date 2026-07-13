import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import type { ReactNode } from 'react';

interface FAQCardProps {
  question: string;
  answer: string;
  icon: ReactNode;
  isOpen: boolean;
  onClick: () => void;
}

function renderAnswer(text: string) {
  // Split by Markdown links [text](url)
  const parts = text.split(/(\[[^\]]+\]\(https?:\/\/[^)]+\))/g);
  
  return parts.map((part, index) => {
    // Check if part is a markdown link
    const match = part.match(/^\[([^\]]+)\]\((https?:\/\/[^)]+)\)$/);
    if (match) {
      return (
        <a 
          key={index} 
          href={match[2]} 
          target="_blank" 
          rel="noopener noreferrer" 
          className="text-red-600 hover:text-red-800 font-bold underline decoration-red-300 hover:decoration-red-600 underline-offset-4 transition-all"
          onClick={e => e.stopPropagation()}
        >
          {match[1]}
        </a>
      );
    }
    
    // Check for naked URLs in the text part
    const subParts = part.split(/(https?:\/\/[^\s]+)/g);
    return subParts.map((subPart, subIndex) => {
      if (subPart.match(/^https?:\/\/[^\s]+$/)) {
        return (
          <a 
            key={`${index}-${subIndex}`} 
            href={subPart} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="text-red-600 hover:text-red-800 font-bold underline decoration-red-300 hover:decoration-red-600 underline-offset-4 transition-all break-all"
            onClick={e => e.stopPropagation()}
          >
            {subPart}
          </a>
        );
      }
      // Just normal text, handle newlines
      return subPart.split('\n').map((line, i, arr) => (
        <span key={`${index}-${subIndex}-${i}`}>
          {line}
          {i < arr.length - 1 && <br />}
        </span>
      ));
    });
  });
}

export function FAQCard({ question, answer, icon, isOpen, onClick }: FAQCardProps) {
  return (
    <motion.div
      className={`bg-white rounded-[24px] overflow-hidden border border-gray-100 cursor-pointer 
        ${isOpen ? 'shadow-2xl shadow-gray-200/60 z-20 relative' : 'shadow-lg shadow-gray-100/80 hover:shadow-xl z-10 relative'}`}
      onClick={onClick}
      whileHover={!isOpen ? { y: -4 } : {}}
      transition={{ duration: 0.3 }}
      layout
    >
      <div className="flex items-center justify-between p-6 md:p-8">
        <div className="flex items-center gap-6 flex-1">
          <div className={`w-14 h-14 rounded-full flex items-center justify-center shrink-0 transition-colors duration-300 border 
            ${isOpen ? 'bg-red-50 border-red-100 text-[var(--color-elsewedy-red)]' : 'bg-gray-50 border-gray-100 text-teal-600'}`}>
            {icon}
          </div>
          <motion.h3 
            whileHover={{ y: -2 }}
            className={`text-base md:text-xl font-bold transition-colors duration-300 cursor-default text-pretty ${isOpen ? 'text-gray-900' : 'text-gray-700'}`}
          >
            {question.replace(/الـ /g, 'الـ\u00A0')}
          </motion.h3>
        </div>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className={`shrink-0 ml-2 ${isOpen ? 'text-[var(--color-elsewedy-red)]' : 'text-gray-400'}`}
        >
          <ChevronDown size={28} strokeWidth={2.5} />
        </motion.div>
      </div>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            <motion.div 
              whileHover={{ y: -2 }}
              className="px-6 md:px-8 pb-8 pt-0 text-gray-600 text-sm md:text-lg leading-relaxed md:mr-[80px] cursor-default text-pretty"
            >
              {renderAnswer(answer.replace(/الـ /g, 'الـ\u00A0'))}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
