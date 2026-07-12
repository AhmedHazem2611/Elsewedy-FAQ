import { useState } from 'react';
import { FAQCard } from './FAQCard';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { defaultFaqs } from '../types/faq';
import type { FAQ } from '../types/faq';
import { iconMap } from '../utils/icons';
import { HelpCircle } from 'lucide-react';

export function FAQSection() {
  const [openId, setOpenId] = useState<string | null>("1");
  const [faqs] = useLocalStorage<FAQ[]>('app_faqs', defaultFaqs);

  return (
    <section className="w-full max-w-3xl mx-auto px-4 relative z-20 flex flex-col gap-5">
      {faqs.map((faq: FAQ) => {
        const IconComponent = iconMap[faq.iconName] || HelpCircle;
        
        return (
          <FAQCard
            key={faq.id}
            question={faq.question}
            answer={faq.answer}
            icon={<IconComponent size={24} strokeWidth={2} />}
            isOpen={openId === faq.id}
            onClick={() => setOpenId(openId === faq.id ? null : faq.id)}
          />
        );
      })}
    </section>
  );
}

