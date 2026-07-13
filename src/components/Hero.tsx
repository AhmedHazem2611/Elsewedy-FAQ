import { motion } from 'framer-motion';

interface HeroProps {
  marginTop?: number;
  marginBottom?: number;
}

export function Hero({ marginTop, marginBottom }: HeroProps) {
  return (
    <section 
      className="flex flex-col items-center text-center px-4 relative z-10"
      style={{
        marginTop: marginTop !== undefined ? `${marginTop}rem` : '2rem',
        marginBottom: marginBottom !== undefined ? `${marginBottom}rem` : '4rem'
      }}
    >
      <style>{`
        @keyframes shine {
          to {
            background-position: 200% center;
          }
        }
        .animate-shine {
          background: linear-gradient(
            110deg,
            var(--color-elsewedy-red) 20%,
            var(--color-elsewedy-red) 40%,
            #ffb3b3 50%,
            var(--color-elsewedy-red) 60%,
            var(--color-elsewedy-red) 80%
          );
          background-size: 200% auto;
          color: transparent;
          -webkit-background-clip: text;
          background-clip: text;
          animation: shine 4s linear infinite;
        }
      `}</style>
      <div className="relative inline-block mb-6">
        <span className="text-sm font-bold text-[var(--color-elsewedy-red)] tracking-wider">
          الأسئلة الشائعة
        </span>
        <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-6 h-0.5 bg-[var(--color-elsewedy-red)] rounded-full"></div>
      </div>
      
      <motion.h1 
        whileHover={{ y: -2 }}
        className="text-2xl sm:text-3xl md:text-5xl font-bold text-gray-900 mb-6 max-w-3xl leading-tight cursor-default"
      >
        الأسئلة <span className="animate-shine inline-block">الأكثر</span> شيوعًا
      </motion.h1>
      
      <p className="text-gray-500 text-sm sm:text-base md:text-xl max-w-2xl leading-relaxed px-2">
        كل ما يحتاجه أولياء الأمور لمعرفة المزيد عن مدرسة السويدي للتكنولوجيا التطبيقية،
        <br className="hidden md:block" />
        قبل التقديم.
      </p>
    </section>
  );
}
