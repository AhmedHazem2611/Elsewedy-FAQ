const fs = require('fs');
let header = fs.readFileSync('src/components/Header.tsx', 'utf-8');

const newPropsInterface = `interface HeaderProps {
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
}`;

header = header.replace(/interface HeaderProps \{[\s\S]*?\}/, newPropsInterface);

const newFunctionSig = `export function Header({ 
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
}: HeaderProps) {`;

header = header.replace(/export function Header\([^)]*\)\s*\{/, newFunctionSig);

const newLogic = `
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
  const dividerGap = isMobile ? \`\${mobileLineGap !== undefined ? mobileLineGap : baseLineGap * 0.4}rem\` : \`\${baseLineGap}rem\`;
  
  const baseLineHeight = lineHeight !== undefined ? lineHeight : 6;
  const dividerHeight = isMobile ? \`\${mobileLineHeight !== undefined ? mobileLineHeight : baseLineHeight * 0.7}rem\` : \`\${baseLineHeight}rem\`;

  const basePaddingX = headerPaddingX !== undefined ? headerPaddingX : 48;
  const currentPaddingX = isMobile ? (mobileHeaderPaddingX !== undefined ? mobileHeaderPaddingX : basePaddingX * 0.4) : basePaddingX;
  
  const baseHeight = headerHeight !== undefined ? headerHeight : 96;
  const currentHeight = isMobile ? (mobileHeaderHeight !== undefined ? mobileHeaderHeight : baseHeight * 0.75) : baseHeight;

  const ministrySizeNum = logoSizes ? logoSizes.ministry : 10.5;
  const ministrySize = isMobile ? \`\${mobileLogoSizes ? mobileLogoSizes.ministry : ministrySizeNum * 0.65}rem\` : \`\${ministrySizeNum}rem\`;

  const elsewedySizeNum = logoSizes ? logoSizes.elsewedy : 3.5;
  const elsewedySize = isMobile ? \`\${mobileLogoSizes ? mobileLogoSizes.elsewedy : elsewedySizeNum * 0.85}rem\` : \`\${elsewedySizeNum}rem\`;

  const appliedTechSizeNum = logoSizes ? logoSizes.appliedTech : 10.5;
  const appliedTechSize = isMobile ? \`\${mobileLogoSizes ? mobileLogoSizes.appliedTech : appliedTechSizeNum * 0.65}rem\` : \`\${appliedTechSizeNum}rem\`;
`;

header = header.replace(/  const \[scale, setScale\][\s\S]*?const appliedTechSize =[^;]*;/m, newLogic.trim());

fs.writeFileSync('src/components/Header.tsx', header);
console.log('Header.tsx patched 3');
