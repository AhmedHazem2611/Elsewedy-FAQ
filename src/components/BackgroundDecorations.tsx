import React from 'react';

// Simple media query hook implementation for this component
function useMediaQuery(query: string) {
  const [matches, setMatches] = React.useState(false);

  React.useEffect(() => {
    const media = window.matchMedia(query);
    if (media.matches !== matches) {
      setMatches(media.matches);
    }
    const listener = () => setMatches(media.matches);
    media.addEventListener('change', listener);
    return () => media.removeEventListener('change', listener);
  }, [matches, query]);

  return matches;
}

export function BackgroundDecorations({ 
  techCircuits, techDots,
  techCircuitsLeft, techDotsLeft,
  techCircuitsBottomRight, techDotsBottomRight,
  techCircuitsBottomLeft, techDotsBottomLeft,
  centerDots1, centerDots2
}: { 
  techCircuits?: any, techDots?: any,
  techCircuitsLeft?: any, techDotsLeft?: any,
  techCircuitsBottomRight?: any, techDotsBottomRight?: any,
  techCircuitsBottomLeft?: any, techDotsBottomLeft?: any,
  centerDots1?: any, centerDots2?: any
}) {
  const isMobile = useMediaQuery('(max-width: 768px)');
  const isTablet = useMediaQuery('(min-width: 769px) and (max-width: 1024px)');
  const isBelow1200 = useMediaQuery('(max-width: 1200px)');

  const circuits = techCircuits || { top: 12, right: 0, opacity: 40, size: 450 };
  const dots = techDots || { top: 10, right: 20, opacity: 30, size: 400 };
  
  const circuitsL = techCircuitsLeft || { top: 12, left: 0, opacity: 40, size: 450 };
  const dotsL = techDotsLeft || { top: 10, left: 20, opacity: 30, size: 400 };

  const circuitsBR = techCircuitsBottomRight || { top: 80, right: 0, opacity: 40, size: 450 };
  const dotsBR = techDotsBottomRight || { top: 80, right: 20, opacity: 30, size: 400 };

  const circuitsBL = techCircuitsBottomLeft || { top: 80, left: 0, opacity: 40, size: 450 };
  const dotsBL = techDotsBottomLeft || { top: 80, left: 20, opacity: 30, size: 400 };

  const cDots1 = centerDots1 || { top: 45, left: 35, opacity: 20, size: 400 };
  const cDots2 = centerDots2 || { top: 55, left: 65, opacity: 20, size: 400 };

  return (
    <div className="fixed inset-0 w-full h-full pointer-events-none z-0 overflow-hidden bg-[#fafafa]">
      
      {/* Layer 1: Ambient Light Gradients */}
      <div 
        className="absolute top-0 left-0 w-full h-full opacity-60"
        style={{
          background: `
            radial-gradient(circle at 15% 30%, rgba(229, 57, 53, 0.02) 0%, transparent 40%),
            radial-gradient(circle at 85% 70%, rgba(0, 150, 136, 0.02) 0%, transparent 40%),
            radial-gradient(circle at 50% 50%, rgba(255, 255, 255, 0.8) 0%, transparent 100%)
          `
        }}
      />

      {/* Layer 2.1: Top Left Tech Circuit Nodes (Red) */}
      <div 
        className="absolute pointer-events-none z-0"
        style={{
          top: `${circuitsL.top}%`,
          left: `${circuitsL.left}%`,
          width: `${circuitsL.size * (isMobile ? 0.6 : 1)}px`,
          height: `${circuitsL.size * (400/450) * (isMobile ? 0.6 : 1)}px`,
          opacity: circuitsL.opacity / 100
        }}
      >
        <svg viewBox="0 0 450 400" className="w-full h-full text-[#E53935] scale-x-[-1]">
            <g stroke="currentColor" fill="#fafafa" strokeWidth="1.5">
              {/* Top line */}
              <path d="M 450 50 L 350 50 L 320 80 L 200 80" fill="none" />
              <circle cx="350" cy="50" r="3" />
              <circle cx="196" cy="80" r="4" />
              
              {/* Mid line 1 */}
              <path d="M 450 120 L 300 120 L 270 150 L 170 150" fill="none" />
              <circle cx="300" cy="120" r="3" />
              <circle cx="166" cy="150" r="5" />

              {/* Main straight line */}
              <path d="M 450 190 L 150 190" fill="none" />
              <circle cx="330" cy="190" r="3" />
              <circle cx="250" cy="190" r="3" />
              <circle cx="144" cy="190" r="6" strokeWidth="2" />
              
              {/* Lower angled line */}
              <path d="M 450 250 L 370 250 L 330 290 L 230 290" fill="none" />
              <circle cx="330" cy="290" r="3" />
              <circle cx="226" cy="290" r="4" />
              
              {/* Bottom line */}
              <path d="M 450 330 L 310 330 L 270 370 L 200 370" fill="none" />
              <circle cx="310" cy="330" r="3" />
              <circle cx="196" cy="370" r="4" />
            </g>
          </svg>
        </div>

      {/* Layer 2.2: Top Right Tech Circuit Nodes (Teal) */}
      <div 
        className="absolute pointer-events-none z-0"
        style={{
          top: `${circuits.top}%`,
          right: `${circuits.right}%`,
          width: `${circuits.size * (isMobile ? 0.6 : 1)}px`,
          height: `${circuits.size * (400/450) * (isMobile ? 0.6 : 1)}px`,
          opacity: circuits.opacity / 100
        }}
      >
        <svg viewBox="0 0 450 400" className="w-full h-full text-[#009688]">
            <g stroke="currentColor" fill="#fafafa" strokeWidth="1.5">
              {/* Top line */}
              <path d="M 450 50 L 350 50 L 320 80 L 200 80" fill="none" />
              <circle cx="350" cy="50" r="3" />
              <circle cx="196" cy="80" r="4" />
              
              {/* Mid line 1 */}
              <path d="M 450 120 L 300 120 L 270 150 L 170 150" fill="none" />
              <circle cx="300" cy="120" r="3" />
              <circle cx="166" cy="150" r="5" />

              {/* Main straight line */}
              <path d="M 450 190 L 150 190" fill="none" />
              <circle cx="330" cy="190" r="3" />
              <circle cx="250" cy="190" r="3" />
              <circle cx="144" cy="190" r="6" strokeWidth="2" />
              
              {/* Lower angled line */}
              <path d="M 450 250 L 370 250 L 330 290 L 230 290" fill="none" />
              <circle cx="330" cy="290" r="3" />
              <circle cx="226" cy="290" r="4" />
              
              {/* Bottom line */}
              <path d="M 450 330 L 310 330 L 270 370 L 200 370" fill="none" />
              <circle cx="310" cy="330" r="3" />
              <circle cx="196" cy="370" r="4" />
            </g>
          </svg>
        </div>

      {/* Layer 2.3: Bottom Right Tech Circuit Nodes (Teal) */}
      {!isMobile && (
        <div 
          className="absolute pointer-events-none z-0"
          style={{
            top: `${circuitsBR.top}%`,
            right: `${circuitsBR.right}%`,
            width: `${circuitsBR.size}px`,
            height: `${circuitsBR.size * (400/450)}px`,
            opacity: circuitsBR.opacity / 100
          }}
        >
          {/* scale-y-[-1] to flip it vertically so it crawls up from the bottom */}
          <svg viewBox="0 0 450 400" className="w-full h-full text-[#009688] scale-y-[-1]">
            <g stroke="currentColor" fill="#fafafa" strokeWidth="1.5">
              <path d="M 450 50 L 350 50 L 320 80 L 200 80" fill="none" />
              <circle cx="350" cy="50" r="3" />
              <circle cx="196" cy="80" r="4" />
              <path d="M 450 120 L 300 120 L 270 150 L 170 150" fill="none" />
              <circle cx="300" cy="120" r="3" />
              <circle cx="166" cy="150" r="5" />
              <path d="M 450 190 L 150 190" fill="none" />
              <circle cx="330" cy="190" r="3" />
              <circle cx="250" cy="190" r="3" />
              <circle cx="144" cy="190" r="6" strokeWidth="2" />
              <path d="M 450 250 L 370 250 L 330 290 L 230 290" fill="none" />
              <circle cx="330" cy="290" r="3" />
              <circle cx="226" cy="290" r="4" />
              <path d="M 450 330 L 310 330 L 270 370 L 200 370" fill="none" />
              <circle cx="310" cy="330" r="3" />
              <circle cx="196" cy="370" r="4" />
            </g>
          </svg>
        </div>
      )}

      {/* Layer 2.4: Bottom Left Tech Circuit Nodes (Red) */}
      {!isMobile && (
        <div 
          className="absolute pointer-events-none z-0"
          style={{
            top: `${circuitsBL.top}%`,
            left: `${circuitsBL.left}%`,
            width: `${circuitsBL.size}px`,
            height: `${circuitsBL.size * (400/450)}px`,
            opacity: circuitsBL.opacity / 100
          }}
        >
          {/* scale-x-[-1] scale-y-[-1] to flip both vertically and horizontally */}
          <svg viewBox="0 0 450 400" className="w-full h-full text-[#E53935] scale-x-[-1] scale-y-[-1]">
            <g stroke="currentColor" fill="#fafafa" strokeWidth="1.5">
              <path d="M 450 50 L 350 50 L 320 80 L 200 80" fill="none" />
              <circle cx="350" cy="50" r="3" />
              <circle cx="196" cy="80" r="4" />
              <path d="M 450 120 L 300 120 L 270 150 L 170 150" fill="none" />
              <circle cx="300" cy="120" r="3" />
              <circle cx="166" cy="150" r="5" />
              <path d="M 450 190 L 150 190" fill="none" />
              <circle cx="330" cy="190" r="3" />
              <circle cx="250" cy="190" r="3" />
              <circle cx="144" cy="190" r="6" strokeWidth="2" />
              <path d="M 450 250 L 370 250 L 330 290 L 230 290" fill="none" />
              <circle cx="330" cy="290" r="3" />
              <circle cx="226" cy="290" r="4" />
              <path d="M 450 330 L 310 330 L 270 370 L 200 370" fill="none" />
              <circle cx="310" cy="330" r="3" />
              <circle cx="196" cy="370" r="4" />
            </g>
          </svg>
        </div>
      )}

      {/* Layer 2.6: Top Left Tech Circuit Dots (Red) */}
      <div 
        className="absolute pointer-events-none z-0"
        style={{
          top: `${dotsL.top}%`,
          left: `${dotsL.left}%`,
          width: `${dotsL.size * (isMobile ? 0.6 : 1)}px`,
          height: `${dotsL.size * (isMobile ? 0.6 : 1)}px`,
          opacity: dotsL.opacity / 100
        }}
      >
        <svg viewBox="0 0 400 400" className="w-full h-full">
            <defs>
              <pattern id="circuit-dots-left" x="0" y="0" width="24" height="24" patternUnits="userSpaceOnUse">
                <circle cx="2" cy="2" r="1.5" fill="#E53935" />
              </pattern>
              <radialGradient id="circuit-dots-mask-left" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="white" stopOpacity="1" />
                <stop offset="60%" stopColor="white" stopOpacity="0.8" />
                <stop offset="100%" stopColor="white" stopOpacity="0" />
              </radialGradient>
              <mask id="dots-mask-left">
                <circle cx="200" cy="200" r="200" fill="url(#circuit-dots-mask-left)" />
              </mask>
            </defs>
            <rect x="0" y="0" width="400" height="400" fill="url(#circuit-dots-left)" mask="url(#dots-mask-left)" />
          </svg>
        </div>

      {/* Layer 2.7: Top Right Tech Circuit Dots (Teal) */}
      <div 
        className="absolute pointer-events-none z-0"
        style={{
          top: `${dots.top}%`,
          right: `${dots.right}%`,
          width: `${dots.size * (isMobile ? 0.6 : 1)}px`,
          height: `${dots.size * (isMobile ? 0.6 : 1)}px`,
          opacity: dots.opacity / 100
        }}
      >
        <svg viewBox="0 0 400 400" className="w-full h-full">
            <defs>
              <pattern id="circuit-dots" x="0" y="0" width="24" height="24" patternUnits="userSpaceOnUse">
                <circle cx="2" cy="2" r="1.5" fill="#009688" />
              </pattern>
              <radialGradient id="circuit-dots-mask" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="white" stopOpacity="1" />
                <stop offset="60%" stopColor="white" stopOpacity="0.8" />
                <stop offset="100%" stopColor="white" stopOpacity="0" />
              </radialGradient>
              <mask id="dots-mask">
                <circle cx="200" cy="200" r="200" fill="url(#circuit-dots-mask)" />
              </mask>
            </defs>
            <rect x="0" y="0" width="400" height="400" fill="url(#circuit-dots)" mask="url(#dots-mask)" />
          </svg>
        </div>

      {/* Layer 2.7: Bottom Right Tech Circuit Dots (Teal) */}
      {!isMobile && (
        <div 
          className="absolute pointer-events-none z-0"
          style={{
            top: `${dotsBR.top}%`,
            right: `${dotsBR.right}%`,
            width: `${dotsBR.size}px`,
            height: `${dotsBR.size}px`,
            opacity: dotsBR.opacity / 100
          }}
        >
          <svg viewBox="0 0 400 400" className="w-full h-full scale-y-[-1]">
            <defs>
              <pattern id="circuit-dots-br" x="0" y="0" width="24" height="24" patternUnits="userSpaceOnUse">
                <circle cx="2" cy="2" r="1.5" fill="#009688" />
              </pattern>
              <radialGradient id="circuit-dots-mask-br" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="white" stopOpacity="1" />
                <stop offset="60%" stopColor="white" stopOpacity="0.8" />
                <stop offset="100%" stopColor="white" stopOpacity="0" />
              </radialGradient>
              <mask id="dots-mask-br">
                <circle cx="200" cy="200" r="200" fill="url(#circuit-dots-mask-br)" />
              </mask>
            </defs>
            <rect x="0" y="0" width="400" height="400" fill="url(#circuit-dots-br)" mask="url(#dots-mask-br)" />
          </svg>
        </div>
      )}

      {/* Layer 2.8: Bottom Left Tech Circuit Dots (Red) */}
      {!isMobile && (
        <div 
          className="absolute pointer-events-none z-0"
          style={{
            top: `${dotsBL.top}%`,
            left: `${dotsBL.left}%`,
            width: `${dotsBL.size}px`,
            height: `${dotsBL.size}px`,
            opacity: dotsBL.opacity / 100
          }}
        >
          <svg viewBox="0 0 400 400" className="w-full h-full scale-y-[-1]">
            <defs>
              <pattern id="circuit-dots-bl" x="0" y="0" width="24" height="24" patternUnits="userSpaceOnUse">
                <circle cx="2" cy="2" r="1.5" fill="#E53935" />
              </pattern>
              <radialGradient id="circuit-dots-mask-bl" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="white" stopOpacity="1" />
                <stop offset="60%" stopColor="white" stopOpacity="0.8" />
                <stop offset="100%" stopColor="white" stopOpacity="0" />
              </radialGradient>
              <mask id="dots-mask-bl">
                <circle cx="200" cy="200" r="200" fill="url(#circuit-dots-mask-bl)" />
              </mask>
            </defs>
            <rect x="0" y="0" width="400" height="400" fill="url(#circuit-dots-bl)" mask="url(#dots-mask-bl)" />
          </svg>
        </div>
      )}

      {/* Layer 2.9: Center Dots 1 (Teal) */}
      {!isMobile && (
        <div 
          className="absolute pointer-events-none z-0"
          style={{
            top: `${cDots1.top}%`,
            left: `${cDots1.left}%`,
            width: `${cDots1.size}px`,
            height: `${cDots1.size}px`,
            opacity: cDots1.opacity / 100,
            transform: 'translate(-50%, -50%)'
          }}
        >
          <svg viewBox="0 0 400 400" className="w-full h-full">
            <defs>
              <pattern id="circuit-dots-c1" x="0" y="0" width="24" height="24" patternUnits="userSpaceOnUse">
                <circle cx="2" cy="2" r="1.5" fill="#009688" />
              </pattern>
              <radialGradient id="circuit-dots-mask-c1" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="white" stopOpacity="1" />
                <stop offset="60%" stopColor="white" stopOpacity="0.8" />
                <stop offset="100%" stopColor="white" stopOpacity="0" />
              </radialGradient>
              <mask id="dots-mask-c1">
                <circle cx="200" cy="200" r="200" fill="url(#circuit-dots-mask-c1)" />
              </mask>
            </defs>
            <rect x="0" y="0" width="400" height="400" fill="url(#circuit-dots-c1)" mask="url(#dots-mask-c1)" />
          </svg>
        </div>
      )}
      
      {/* Layer 2.10: Center Dots 2 (Red) */}
      {!isMobile && (
        <div 
          className="absolute pointer-events-none z-0"
          style={{
            top: `${cDots2.top}%`,
            left: `${cDots2.left}%`,
            width: `${cDots2.size}px`,
            height: `${cDots2.size}px`,
            opacity: cDots2.opacity / 100,
            transform: 'translate(-50%, -50%)'
          }}
        >
          <svg viewBox="0 0 400 400" className="w-full h-full">
            <defs>
              <pattern id="circuit-dots-c2" x="0" y="0" width="24" height="24" patternUnits="userSpaceOnUse">
                <circle cx="2" cy="2" r="1.5" fill="#E53935" />
              </pattern>
              <radialGradient id="circuit-dots-mask-c2" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="white" stopOpacity="1" />
                <stop offset="60%" stopColor="white" stopOpacity="0.8" />
                <stop offset="100%" stopColor="white" stopOpacity="0" />
              </radialGradient>
              <mask id="dots-mask-c2">
                <circle cx="200" cy="200" r="200" fill="url(#circuit-dots-mask-c2)" />
              </mask>
            </defs>
            <rect x="0" y="0" width="400" height="400" fill="url(#circuit-dots-c2)" mask="url(#dots-mask-c2)" />
          </svg>
        </div>
      )}

      {/* Layers 3-5: SVG Elements */}
      <svg className="absolute inset-0 w-full h-full z-0" xmlns="http://www.w3.org/2000/svg">
        
        {/* Layer 3: Technology Lines (Circuit traces) */}
        <g fill="none" stroke="#D6D6D6" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" opacity="0.04">
          {/* Top Left Traces */}
          <path d="M -50 120 L 100 120 A 30 30 0 0 1 130 150 L 130 250 A 30 30 0 0 0 160 280 L 300 280" />
          <path d="M -20 80 L 200 80 A 20 20 0 0 1 220 100 L 220 150 A 20 20 0 0 0 240 170 L 400 170" strokeWidth="0.5" />
          
          {/* Bottom Right Traces */}
          <path d="M 110% 700 L calc(100% - 150px) 700 A 30 30 0 0 0 calc(100% - 180px) 730 L calc(100% - 180px) 850 A 30 30 0 0 1 calc(100% - 210px) 880 L calc(100% - 350px) 880" />
          <path d="M 105% 650 L calc(100% - 250px) 650 A 20 20 0 0 0 calc(100% - 270px) 670 L calc(100% - 270px) 750" strokeWidth="0.5" />
          
          {!isMobile && (
            <>
              {/* Mid Left Traces */}
              <path d="M -20 500 L 80 500 A 40 40 0 0 0 120 460 L 120 380 A 20 20 0 0 1 140 360 L 250 360" />
              <path d="M -10 600 L 150 600 A 30 30 0 0 0 180 570 L 180 500" strokeWidth="0.5" />
              
              {/* Top Right Traces */}
              <path d="M 105% 200 L calc(100% - 100px) 200 A 20 20 0 0 0 calc(100% - 120px) 180 L calc(100% - 120px) 100" />
              <path d="M 110% 300 L calc(100% - 200px) 300 A 30 30 0 0 1 calc(100% - 230px) 270 L calc(100% - 230px) 150" strokeWidth="0.5" />
            </>
          )}
        </g>

        {!isMobile && !isTablet && (
          <>
            {/* Layer 4: Large Background Shapes */}
            <g>
              {/* Bottom Left Rings */}
              <circle cx="10%" cy="85%" r="400" fill="none" stroke="#94a3b8" strokeWidth="2" opacity="0.02" />
              <circle cx="10%" cy="85%" r="410" fill="none" stroke="#94a3b8" strokeWidth="0.5" opacity="0.01" />
              <circle cx="5%" cy="80%" r="200" fill="none" stroke="#94a3b8" strokeWidth="1" opacity="0.02" strokeDasharray="4 8" />
              
              {/* Top Left Ring */}
              <circle cx="-5%" cy="5%" r="350" fill="none" stroke="#D6D6D6" strokeWidth="1.5" opacity="0.02" />
              
              {/* Bottom Right Circles */}
              <circle cx="85%" cy="90%" r="250" fill="#009688" opacity="0.02" filter="blur(40px)" />
              <circle cx="90%" cy="85%" r="300" fill="none" stroke="#009688" strokeWidth="1" opacity="0.02" strokeDasharray="10 20" />

              {/* Upper Right Circular Outlines */}
              <circle cx="95%" cy="5%" r="200" fill="none" stroke="#D6D6D6" strokeWidth="0.5" opacity="0.02" />
              <circle cx="90%" cy="10%" r="150" fill="none" stroke="#D6D6D6" strokeWidth="2" opacity="0.03" />
              
              {/* Mid Center-Right Faint Blob */}
              <circle cx="80%" cy="50%" r="300" fill="#E53935" opacity="0.02" filter="blur(80px)" />
            </g>

            {/* Layer 5: Soft Grid Texture (Blueprint marks) */}
            <g stroke="#94a3b8" strokeWidth="1" opacity="0.03">
              {/* Crosshairs Top Left Area */}
              <path d="M 200 195 L 200 205 M 195 200 L 205 200" />
              <path d="M 250 145 L 250 155 M 245 150 L 255 150" />
              <path d="M 150 250 L 150 255 M 145 250 L 150 250" />
              <path d="M 350 200 L 350 210 M 345 205 L 355 205" />

              {/* Crosshairs Bottom Right Area */}
              <path d="M calc(100% - 200px) 800 L calc(100% - 200px) 810 M calc(100% - 205px) 805 L calc(100% - 195px) 805" />
              <path d="M calc(100% - 300px) 750 L calc(100% - 300px) 760 M calc(100% - 305px) 755 L calc(100% - 295px) 755" />
              <path d="M calc(100% - 150px) 600 L calc(100% - 150px) 610 M calc(100% - 155px) 605 L calc(100% - 145px) 605" />
              
              {/* Tick marks Mid Left Area */}
              <path d="M 50 400 L 60 400 M 50 420 L 55 420 M 50 440 L 60 440 M 50 460 L 55 460 M 50 480 L 60 480" />
              <path d="M 100 500 L 100 510 M 120 500 L 120 505 M 140 500 L 140 510" />

              {/* Tick marks Top Right Area */}
              <path d="M calc(100% - 80px) 150 L calc(100% - 80px) 160 M calc(100% - 60px) 150 L calc(100% - 60px) 155 M calc(100% - 40px) 150 L calc(100% - 40px) 160" />
              <path d="M calc(100% - 100px) 250 L calc(100% - 90px) 250 M calc(100% - 100px) 270 L calc(100% - 95px) 270 M calc(100% - 100px) 290 L calc(100% - 90px) 290" />
            </g>
          </>
        )}
      </svg>
    </div>
  );
}
