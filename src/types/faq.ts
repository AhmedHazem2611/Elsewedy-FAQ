export type Category = {
  id: string;
  name: string;
  order: number;
};

export type FAQ = {
  id: string;
  question: string;
  answer: string;
  iconName: string;
  categoryId: string;
};

export const defaultCategories: Category[] = [
  { id: "cat-1", name: "أسئلة عامة", order: 1 },
  { id: "cat-2", name: "شروط التقديم والقبول", order: 2 },
  { id: "cat-3", name: "الدراسة والمناهج", order: 3 },
];

export const defaultFaqs: FAQ[] = [
  {
    id: "1",
    question: "ما هي مدرسة السويدي للتكنولوجيا التطبيقية؟",
    answer: "مدرسة السويدي للتكنولوجيا التطبيقية هي مدرسة فنية متخصصة تقدم تعليمًا عالي الجودة وتدريبًا عمليًا في التقنيات الحديثة والهندسة وفقًا لأحدث المعايير الدولية.",
    iconName: "School",
    categoryId: "cat-1"
  },
  {
    id: "2",
    question: "ما هي شروط التقديم؟",
    answer: "المدرسة متاحة للطلاب الذين أتموا المرحلة الإعدادية ولديهم شغف بالتكنولوجيا والابتكار وبناء مسار مهني ناجح، على أن يجتازوا اختبارات القبول والمقابلات الشخصية.",
    iconName: "Users",
    categoryId: "cat-2"
  },
  {
    id: "3",
    question: "ما هي التخصصات المتاحة؟",
    answer: "نقدم تخصصات فنية متعددة في مجالات عالية الطلب مثل الميكاترونيات، الإلكترونيات، الأتمتة، تكنولوجيا المعلومات، والمزيد من التخصصات الحديثة.",
    iconName: "GraduationCap",
    categoryId: "cat-3"
  },
  {
    id: "4",
    question: "هل يحصل الطلاب على تدريب عملي؟",
    answer: "بالتأكيد، يكتسب الطلاب خبرة عملية قوية من خلال تدريبات ميدانية في مصانعنا وشركائنا، مما يمنحهم مهارات متوافقة مع متطلبات الصناعة ومسارًا واضحًا للتوظيف أو التعليم العالي.",
    iconName: "ShieldCheck",
    categoryId: "cat-3"
  }
];

