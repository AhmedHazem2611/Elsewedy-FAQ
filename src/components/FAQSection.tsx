import { useState } from 'react';
import { School, Users, GraduationCap, ShieldCheck } from 'lucide-react';
import { FAQCard } from './FAQCard';

const faqs = [
  {
    id: 1,
    question: "ما هي مدرسة السويدي للتكنولوجيا التطبيقية؟",
    answer: "مدرسة السويدي للتكنولوجيا التطبيقية هي مدرسة فنية متخصصة تقدم تعليمًا عالي الجودة وتدريبًا عمليًا في التقنيات الحديثة والهندسة وفقًا لأحدث المعايير الدولية.",
    icon: <School size={24} strokeWidth={2} />,
  },
  {
    id: 2,
    question: "ما هي شروط التقديم؟",
    answer: "المدرسة متاحة للطلاب الذين أتموا المرحلة الإعدادية ولديهم شغف بالتكنولوجيا والابتكار وبناء مسار مهني ناجح، على أن يجتازوا اختبارات القبول والمقابلات الشخصية.",
    icon: <Users size={24} strokeWidth={2} />,
  },
  {
    id: 3,
    question: "ما هي التخصصات المتاحة؟",
    answer: "نقدم تخصصات فنية متعددة في مجالات عالية الطلب مثل الميكاترونيات، الإلكترونيات، الأتمتة، تكنولوجيا المعلومات، والمزيد من التخصصات الحديثة.",
    icon: <GraduationCap size={24} strokeWidth={2} />,
  },
  {
    id: 4,
    question: "هل يحصل الطلاب على تدريب عملي؟",
    answer: "بالتأكيد، يكتسب الطلاب خبرة عملية قوية من خلال تدريبات ميدانية في مصانعنا وشركائنا، مما يمنحهم مهارات متوافقة مع متطلبات الصناعة ومسارًا واضحًا للتوظيف أو التعليم العالي.",
    icon: <ShieldCheck size={24} strokeWidth={2} />,
  }
];

export function FAQSection() {
  const [openId, setOpenId] = useState<number | null>(1);

  return (
    <section className="w-full max-w-3xl mx-auto px-4 relative z-20 flex flex-col gap-5">
      {faqs.map((faq) => (
        <FAQCard
          key={faq.id}
          question={faq.question}
          answer={faq.answer}
          icon={faq.icon}
          isOpen={openId === faq.id}
          onClick={() => setOpenId(openId === faq.id ? null : faq.id)}
        />
      ))}
    </section>
  );
}
