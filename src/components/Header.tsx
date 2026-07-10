import { useState, useEffect } from 'react';
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
  // Sizes and spacing logic computed dynamically
  const [scale, setScale] = useState(1);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      setIsMobile(width < 768);
      const targetWidth = 650;
      if (width < targetWidth) {
        // We use a much smaller base width (400) because we are already shrinking the contents
        // so it doesn't need to be zoomed out as aggressively.
        setScale(Math.min(1, (width - 16) / 450));
      } else {
        setScale(1);
      }
    };
    
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const paddingVal = padding !== undefined ? padding : -1;
  const actualPadding = Math.max(0, paddingVal) + 'rem';
  const actualMargin = Math.min(0, paddingVal) + 'rem';
  
  const baseLineGap = lineGap !== undefined ? lineGap : 2;
  const dividerGap = isMobile ? `${baseLineGap * 0.4}rem` : `${baseLineGap}rem`;
  
  const baseLineHeight = lineHeight !== undefined ? lineHeight : 6;
  const dividerHeight = isMobile ? `${baseLineHeight * 0.7}rem` : `${baseLineHeight}rem`;

  const basePaddingX = headerPaddingX !== undefined ? headerPaddingX : 48;
  const currentPaddingX = isMobile ? basePaddingX * 0.4 : basePaddingX;
  
  const baseHeight = headerHeight !== undefined ? headerHeight : 96;
  const currentHeight = isMobile ? baseHeight * 0.75 : baseHeight;

  // Reduce ministry and applied tech logos more than elsewedy
  const ministrySizeNum = logoSizes ? logoSizes.ministry : 10.5;
  const ministrySize = isMobile ? `${ministrySizeNum * 0.65}rem` : `${ministrySizeNum}rem`;

  const elsewedySizeNum = logoSizes ? logoSizes.elsewedy : 3.5;
  const elsewedySize = isMobile ? `${elsewedySizeNum * 0.85}rem` : `${elsewedySizeNum}rem`;

  const appliedTechSizeNum = logoSizes ? logoSizes.appliedTech : 10.5;
  const appliedTechSize = isMobile ? `${appliedTechSizeNum * 0.65}rem` : `${appliedTechSizeNum}rem`;

  return (
    <header 
      className="w-full flex justify-center items-center relative z-50" 
      dir="ltr"
      style={{ paddingTop: actualPadding, paddingBottom: actualPadding }}
    >
      <div 
        className="bg-white shadow-[0_8px_30px_rgb(0,0,0,0.08)] rounded-[40px] flex items-center justify-center mt-6 w-max mx-auto transform-origin-top" 
        style={{ zoom: scale < 1 ? scale : undefined, marginTop: actualMargin, marginBottom: actualMargin, gap: dividerGap, height: `${currentHeight}px`, paddingLeft: `${currentPaddingX}px`, paddingRight: `${currentPaddingX}px` }}
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
