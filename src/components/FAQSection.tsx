import { useState, useMemo, useCallback } from 'react';
import { FAQCard } from './FAQCard';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { defaultFaqs, defaultCategories } from '../types/faq';
import type { FAQ, Category } from '../types/faq';
import { motion } from 'framer-motion';

export function FAQSection() {
  const [openId, setOpenId] = useState<string | null>("1");
  const [faqs] = useLocalStorage<FAQ[]>('app_faqs_v2', defaultFaqs);
  const [categories] = useLocalStorage<Category[]>('app_categories_v2', defaultCategories);

  // Stable toggle handler for FAQCard memoization
  const handleToggle = useCallback((id: string) => {
    setOpenId(prev => (prev === id ? null : id));
  }, []);

  // Safely fallback if data is corrupted (fixes white screen bug)
  const safeFaqs = Array.isArray(faqs) ? faqs : defaultFaqs;
  const safeCategories = Array.isArray(categories) ? categories : defaultCategories;

  // Group FAQs by Category ID, only keeping categories that have at least one FAQ
  const groupedFaqs = useMemo(() => {
    const groups: { category: Category; items: FAQ[] }[] = [];
    
    // Sort categories by their order property
    const sortedCategories = [...safeCategories].sort((a, b) => a.order - b.order);
    
    sortedCategories.forEach(cat => {
      const items = safeFaqs.filter(f => f.categoryId === cat.id);
      if (items.length > 0) {
        groups.push({ category: cat, items });
      }
    });
    
    // Catch any orphaned FAQs that have a deleted or invalid category
    const validCategoryIds = new Set(safeCategories.map(c => c.id));
    const orphanedItems = safeFaqs.filter(f => !validCategoryIds.has(f.categoryId));
    if (orphanedItems.length > 0) {
      groups.push({ category: { id: 'orphaned', name: 'أسئلة أخرى', order: 999 }, items: orphanedItems });
    }

    return groups;
  }, [safeFaqs, safeCategories]);

  return (
    <section className="w-full max-w-3xl mx-auto px-4 relative z-20 flex flex-col gap-10">
      {groupedFaqs.map((group) => (
        <div key={group.category.id} className="flex flex-col gap-5">
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-center gap-4"
          >
            <div className="h-px flex-1 bg-gradient-to-r from-transparent via-red-200 to-transparent" />
            <h2 className="text-lg md:text-xl font-bold text-gray-800 text-center">{group.category.name}</h2>
            <div className="h-px flex-1 bg-gradient-to-r from-transparent via-red-200 to-transparent" />
          </motion.div>
          
          <div className="flex flex-col gap-4">
            {group.items.map((faq: FAQ) => (
              <FAQCard
                key={faq.id}
                id={faq.id}
                question={faq.question}
                answer={faq.answer}
                iconName={faq.iconName}
                isOpen={openId === faq.id}
                onToggle={handleToggle}
              />
            ))}
          </div>
        </div>
      ))}
    </section>
  );
}

