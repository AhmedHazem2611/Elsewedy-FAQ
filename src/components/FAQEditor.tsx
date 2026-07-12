import { useState } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { defaultFaqs } from '../types/faq';
import type { FAQ } from '../types/faq';
import { iconMap, availableIcons } from '../utils/icons';
import { X, Plus, Trash2, Edit2, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface FAQEditorProps {
  onClose: () => void;
}

export function FAQEditor({ onClose }: FAQEditorProps) {
  const [faqs, setFaqs] = useLocalStorage<FAQ[]>('app_faqs', defaultFaqs);
  const [editingId, setEditingId] = useState<string | null>(null);
  
  // Form state
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [iconName, setIconName] = useState(availableIcons[0]);

  const handleAdd = () => {
    const newId = Date.now().toString();
    setFaqs([...faqs, { id: newId, question: 'سؤال جديد', answer: 'إجابة جديدة', iconName: availableIcons[0] }]);
    startEditing(newId, 'سؤال جديد', 'إجابة جديدة', availableIcons[0]);
  };

  const handleDelete = (id: string) => {
    if (window.confirm('هل أنت متأكد من حذف هذا السؤال؟')) {
      setFaqs(faqs.filter((f: FAQ) => f.id !== id));
      if (editingId === id) setEditingId(null);
    }
  };

  const startEditing = (id: string, q: string, a: string, icon: string) => {
    setEditingId(id);
    setQuestion(q);
    setAnswer(a);
    setIconName(icon);
  };

  const saveEdit = () => {
    setFaqs(faqs.map((f: FAQ) => f.id === editingId ? { ...f, question, answer, iconName } : f));
    setEditingId(null);
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 font-arabic"
      onClick={onClose}
    >
      <motion.div 
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        onClick={(e) => e.stopPropagation()}
        className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] flex flex-col overflow-hidden border border-gray-100"
      >
        <div className="flex items-center justify-between p-4 border-b border-gray-100 bg-gray-50/50">
          <h2 className="text-xl font-bold text-gray-800">إدارة الأسئلة الشائعة</h2>
          <button onClick={onClose} className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-full transition-colors">
            <X size={20} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-4" dir="rtl">
          <AnimatePresence>
            {faqs.map((faq: FAQ) => {
              const IconComp = iconMap[faq.iconName] || iconMap.HelpCircle;
              const isEditing = editingId === faq.id;

              return (
                <motion.div 
                  layout
                  key={faq.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className={`border rounded-xl p-4 transition-all ${isEditing ? 'border-red-500 shadow-md bg-red-50/10' : 'border-gray-200 hover:border-red-300'}`}
                >
                  {isEditing ? (
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-1">السؤال</label>
                        <input 
                          type="text" 
                          value={question}
                          onChange={(e) => setQuestion(e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none text-right"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-1">الإجابة</label>
                        <textarea 
                          value={answer}
                          onChange={(e) => setAnswer(e.target.value)}
                          rows={3}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none text-right resize-none"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-1">الأيقونة</label>
                        <div className="flex flex-wrap gap-2">
                          {availableIcons.map(icon => {
                            const I = iconMap[icon];
                            const isSelected = iconName === icon;
                            return (
                              <button
                                key={icon}
                                onClick={() => setIconName(icon)}
                                className={`p-2 rounded-lg border flex items-center justify-center transition-colors ${isSelected ? 'border-red-500 bg-red-50 text-red-600' : 'border-gray-200 text-gray-500 hover:bg-gray-50'}`}
                                title={icon}
                              >
                                <I size={20} />
                              </button>
                            )
                          })}
                        </div>
                      </div>
                      <div className="flex justify-end gap-2 pt-2">
                        <button 
                          onClick={() => setEditingId(null)}
                          className="px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                        >
                          إلغاء
                        </button>
                        <button 
                          onClick={saveEdit}
                          className="flex items-center gap-1 px-4 py-2 text-sm font-medium text-white bg-red-600 hover:bg-red-700 rounded-lg transition-colors shadow-sm shadow-red-200"
                        >
                          <Check size={16} /> حفظ
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="flex items-start gap-4">
                      <div className="p-3 bg-red-50 text-red-600 rounded-xl shrink-0">
                        <IconComp size={24} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-bold text-gray-900 text-lg mb-1">{faq.question}</h3>
                        <p className="text-gray-600 text-sm leading-relaxed">{faq.answer}</p>
                      </div>
                      <div className="flex items-center gap-1 shrink-0">
                        <button 
                          onClick={() => startEditing(faq.id, faq.question, faq.answer, faq.iconName)}
                          className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                          title="تعديل"
                        >
                          <Edit2 size={18} />
                        </button>
                        <button 
                          onClick={() => handleDelete(faq.id)}
                          className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                          title="حذف"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </div>
                  )}
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

        <div className="p-4 border-t border-gray-100 bg-gray-50/50 flex justify-center">
          <button 
            onClick={handleAdd}
            className="flex items-center gap-2 px-6 py-3 bg-gray-900 text-white rounded-xl font-bold hover:bg-gray-800 transition-colors shadow-lg shadow-gray-200 w-full sm:w-auto justify-center"
          >
            <Plus size={20} /> أضف سؤالاً جديداً
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}
