import ministryLogo from '../assets/Ministry-of-Education-and-techinical-education logo.png';
import elsewedyLogo from '../assets/Elsewedy logo-DxuTHIWw.png';
import appliedTechLogo from '../assets/applied teccnology logo.png';

interface HeaderProps {
  logoSizes?: { ministry: number; elsewedy: number; appliedTech: number };
  padding?: number;
  lineHeight?: number;
  lineGap?: number;
}

export function Header({ logoSizes, padding, lineHeight, lineGap }: HeaderProps) {
  // Default sizes in rem if not provided
  const ministrySize = logoSizes ? `${logoSizes.ministry}rem` : '10.5rem';
  const elsewedySize = logoSizes ? `${logoSizes.elsewedy}rem` : '3.5rem';
  const appliedTechSize = logoSizes ? `${logoSizes.appliedTech}rem` : '10.5rem';
  
  const paddingVal = padding !== undefined ? padding : -1;
  const actualPadding = Math.max(0, paddingVal) + 'rem';
  const actualMargin = Math.min(0, paddingVal) + 'rem';
  
  const dividerHeight = lineHeight !== undefined ? `${lineHeight}rem` : '6rem';
  const dividerGap = lineGap !== undefined ? `${lineGap}rem` : '2rem';

  return (
    <header 
      className="w-full flex justify-center items-center relative z-50" 
      dir="ltr"
      style={{ paddingTop: actualPadding, paddingBottom: actualPadding }}
    >
      <div 
        className="w-full max-w-[1440px] px-4 md:px-8 grid grid-cols-[1fr_auto_1fr] items-center" 
        style={{ marginTop: actualMargin, marginBottom: actualMargin }}
      >
        
        {/* Left Side: Elsewedy + Line */}
        <div className="flex justify-end items-center gap-4 md:gap-8" style={{ paddingRight: dividerGap }}>
          <img 
            src={elsewedyLogo} 
            alt="Elsewedy Logo" 
            className="object-contain"
            style={{ height: elsewedySize }} 
          />
          <div className="w-px bg-gray-300 shrink-0" style={{ height: dividerHeight }}></div>
        </div>

        {/* Center: Ministry */}
        <div className="flex justify-center items-center">
          <img 
            src={ministryLogo} 
            alt="Ministry of Education" 
            className="object-contain"
            style={{ height: ministrySize }} 
          />
        </div>

        {/* Right Side: Line + Applied Tech */}
        <div className="flex justify-start items-center gap-4 md:gap-8" style={{ paddingLeft: dividerGap }}>
          <div className="w-px bg-gray-300 shrink-0" style={{ height: dividerHeight }}></div>
          <img 
            src={appliedTechLogo} 
            alt="Applied Technology Logo" 
            className="object-contain"
            style={{ height: appliedTechSize }} 
          />
        </div>

      </div>
    </header>
  );
}
