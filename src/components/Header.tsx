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
  mobileLogoSizes?: { ministry: number; elsewedy: number; appliedTech: number };
  mobileLineHeight?: number;
  mobileLineGap?: number;
  mobileHeaderHeight?: number;
  mobileHeaderPaddingX?: number;
}

export function Header({ 
  logoSizes, 
  padding, 
  lineHeight, 
  lineGap, 
  headerHeight, 
  headerPaddingX,
  mobileLogoSizes,
  mobileLineHeight,
  mobileLineGap,
  mobileHeaderHeight,
  mobileHeaderPaddingX
}: HeaderProps) {
  // Sizes and spacing logic computed dynamically
const [scale, setScale] = useState(1);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      setIsMobile(width < 768);
      const targetWidth = 650;
      if (width < targetWidth) {
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
  const dividerGap = isMobile ? `${mobileLineGap !== undefined ? mobileLineGap : baseLineGap * 0.4}rem` : `${baseLineGap}rem`;
  
  const baseLineHeight = lineHeight !== undefined ? lineHeight : 6;
  const dividerHeight = isMobile ? `${mobileLineHeight !== undefined ? mobileLineHeight : baseLineHeight * 0.7}rem` : `${baseLineHeight}rem`;

  const basePaddingX = headerPaddingX !== undefined ? headerPaddingX : 48;
  const currentPaddingX = isMobile ? (mobileHeaderPaddingX !== undefined ? mobileHeaderPaddingX : basePaddingX * 0.4) : basePaddingX;
  const validPaddingX = Math.max(0, currentPaddingX);
  const extraNegativePaddingX = Math.min(0, currentPaddingX);
  
  const baseHeight = headerHeight !== undefined ? headerHeight : 96;
  const currentHeight = isMobile ? (mobileHeaderHeight !== undefined ? mobileHeaderHeight : baseHeight * 0.75) : baseHeight;
  const validHeight = Math.max(0, currentHeight);
  const extraNegativeMargin = Math.min(0, currentHeight);

  const ministrySizeNum = logoSizes ? logoSizes.ministry : 10.5;
  const ministrySize = isMobile ? `${mobileLogoSizes ? mobileLogoSizes.ministry : ministrySizeNum * 0.65}rem` : `${ministrySizeNum}rem`;

  const elsewedySizeNum = logoSizes ? logoSizes.elsewedy : 3.5;
  const elsewedySize = isMobile ? `${mobileLogoSizes ? mobileLogoSizes.elsewedy : elsewedySizeNum * 0.85}rem` : `${elsewedySizeNum}rem`;

  const appliedTechSizeNum = logoSizes ? logoSizes.appliedTech : 10.5;
  const appliedTechSize = isMobile ? `${mobileLogoSizes ? mobileLogoSizes.appliedTech : appliedTechSizeNum * 0.65}rem` : `${appliedTechSizeNum}rem`;

  return (
    <header 
      className="w-full flex justify-center items-center relative z-50" 
      dir="ltr"
      style={{ paddingTop: actualPadding, paddingBottom: actualPadding }}
    >
      <div 
        className="bg-white shadow-[0_8px_30px_rgb(0,0,0,0.08)] rounded-[40px] flex items-center justify-center mt-6 w-max mx-auto transform-origin-top" 
        style={{ zoom: scale < 1 ? scale : undefined, marginTop: actualMargin, marginBottom: `calc(${actualMargin} + ${extraNegativeMargin}px)`, gap: dividerGap, height: `${validHeight}px`, paddingLeft: `${validPaddingX}px`, paddingRight: `${validPaddingX}px` }}
      >
        <div className="flex items-center justify-center h-0" style={{ marginLeft: `${extraNegativePaddingX}px` }}>
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

        <div className="flex items-center justify-center h-0" style={{ marginRight: `${extraNegativePaddingX}px` }}>
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
