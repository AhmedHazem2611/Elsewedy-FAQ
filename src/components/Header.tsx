import ministryLogo from '../assets/Ministry-of-Education-and-techinical-education logo.png';
import elsewedyLogo from '../assets/Elsewedy logo-DxuTHIWw.png';
import appliedTechLogo from '../assets/applied teccnology logo.png';

interface HeaderProps {
  logoSizes?: { ministry: number; elsewedy: number; appliedTech: number };
  padding?: number;
  lineHeight?: number;
  lineGap?: number;
  headerHeight?: number;
  headerPaddingX?: number;
}

export function Header({ logoSizes, padding, lineHeight, lineGap, headerHeight, headerPaddingX }: HeaderProps) {
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
        className="bg-white shadow-[0_8px_30px_rgb(0,0,0,0.08)] rounded-[40px] flex items-center justify-center mt-6 w-max mx-auto md:max-w-[95vw]" 
        style={{ marginTop: actualMargin, marginBottom: actualMargin, gap: dividerGap, height: headerHeight ? `${headerHeight}px` : '96px', paddingLeft: headerPaddingX !== undefined ? `${headerPaddingX}px` : '48px', paddingRight: headerPaddingX !== undefined ? `${headerPaddingX}px` : '48px' }}
      >
        <div className="flex items-center justify-center h-0">
          <img 
            src={elsewedyLogo} 
            alt="Elsewedy Logo" 
            className="object-contain shrink-0 transition-transform duration-300 ease-out hover:-translate-y-1.5 cursor-pointer"
            style={{ height: elsewedySize }} 
          />
        </div>
        
        <div className="w-px bg-gray-200 shrink-0" style={{ height: dividerHeight }}></div>

        <div className="flex items-center justify-center h-0">
          <img 
            src={ministryLogo} 
            alt="Ministry of Education" 
            className="object-contain shrink-0 transition-transform duration-300 ease-out hover:-translate-y-1.5 cursor-pointer"
            style={{ height: ministrySize }} 
          />
        </div>

        <div className="w-px bg-gray-200 shrink-0" style={{ height: dividerHeight }}></div>

        <div className="flex items-center justify-center h-0">
          <img 
            src={appliedTechLogo} 
            alt="Applied Technology Logo" 
            className="object-contain shrink-0 transition-transform duration-300 ease-out hover:-translate-y-1.5 cursor-pointer"
            style={{ height: appliedTechSize }} 
          />
        </div>
      </div>
    </header>
  );
}
