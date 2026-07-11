import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { FAQSection } from './components/FAQSection';
import { BackgroundDecorations } from './components/BackgroundDecorations';
import { LoadingScreen } from './components/LoadingScreen';
import { LeftIllustration, RightIllustration, educationImage } from './components/Illustrations';

// Custom hook for auto-saving state to localStorage
function useLocalStorage<T>(key: string, initialValue: T): [T, (value: T | ((val: T) => T)) => void] {
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.warn(error);
      return initialValue;
    }
  });

  const setValue = (value: T | ((val: T) => T)) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.warn(error);
    }
  };

  return [storedValue, setValue];
}

const ENABLE_DEV_TOOLS = true;

function App() {
  const [leftSettings, setLeftSettings] = useLocalStorage('leftSettingsTop', { size: 50, top: 24, left: -9 });
  const [rightSettings, setRightSettings] = useLocalStorage('rightSettingsTopV3', { size: 58, top: 16, right: -18 });
  const [techCircuits, setTechCircuits] = useLocalStorage('techCircuits', { top: -1, right: 0, opacity: 9, size: 307 });
  const [techDots, setTechDots] = useLocalStorage('techDots', { top: -5, right: 11, opacity: 68, size: 284 });
  const [techCircuitsLeft, setTechCircuitsLeft] = useLocalStorage('techCircuitsLeft', { top: -2, left: 0, opacity: 15, size: 288 });
  const [techDotsLeft, setTechDotsLeft] = useLocalStorage('techDotsLeft', { top: -4, left: 10, opacity: 26, size: 326 });
  
  const [techCircuitsBottomRight, setTechCircuitsBottomRight] = useLocalStorage('techCircuitsBottomRight', { top: 62, right: -1, opacity: 10, size: 430 });
  const [techDotsBottomRight, setTechDotsBottomRight] = useLocalStorage('techDotsBottomRight', { top: 80, right: 20, opacity: 30, size: 400 });
  const [techCircuitsBottomLeft, setTechCircuitsBottomLeft] = useLocalStorage('techCircuitsBottomLeft', { top: 69, left: 0, opacity: 10, size: 450 });
  const [techDotsBottomLeft, setTechDotsBottomLeft] = useLocalStorage('techDotsBottomLeft', { top: 80, left: 20, opacity: 30, size: 400 });

  const [centerDots1, setCenterDots1] = useLocalStorage('centerDots1', { top: 34, left: 71, opacity: 100, size: 208 });
  const [centerDots2, setCenterDots2] = useLocalStorage('centerDots2', { top: 35, left: 30, opacity: 100, size: 204 });

  const [logoSizes, setLogoSizes] = useLocalStorage('logoSizes', { ministry: 12, elsewedy: 3.5, appliedTech: 10.5 });
  const [headerPadding, setHeaderPadding] = useLocalStorage('headerPadding', 1.75);
  const [headerHeight, setHeaderHeight] = useLocalStorage('headerHeight', 123);
  const [headerPaddingX, setHeaderPaddingX] = useLocalStorage('headerPaddingX', 37);
  const [lineHeight, setLineHeight] = useLocalStorage('lineHeight', 5);
  const [lineGap, setLineGap] = useLocalStorage('lineGap', 0.5);
  const [heroTopGap, setHeroTopGap] = useLocalStorage('heroTopGap', 0);
  const [bgSize, setBgSize] = useLocalStorage('bgSize', 77);

  const [mobileCenterIllustrationSize, setMobileCenterIllustrationSize] = useLocalStorage('mobileCenterIllustrationSize', 150);
  const [mobileLogoSizes, setMobileLogoSizes] = useLocalStorage('mobileLogoSizes', { ministry: 8, elsewedy: 2, appliedTech: 6.5 });
  const [mobileHeaderHeight, setMobileHeaderHeight] = useLocalStorage('mobileHeaderHeight', 96);
  const [mobileHeaderPaddingX, setMobileHeaderPaddingX] = useLocalStorage('mobileHeaderPaddingX', 16);
  const [mobileLineHeight, setMobileLineHeight] = useLocalStorage('mobileLineHeight', 3.5);
  const [mobileLineGap, setMobileLineGap] = useLocalStorage('mobileLineGap', 0.5);
  const [isMobileScreen, setIsMobileScreen] = useState(typeof window !== 'undefined' ? window.innerWidth < 1024 : false);

  useEffect(() => {
    const handleScreenResize = () => {
      setIsMobileScreen(window.innerWidth < 1024);
    };
    handleScreenResize();
    window.addEventListener('resize', handleScreenResize);
    return () => window.removeEventListener('resize', handleScreenResize);
  }, []);

  const [showControls, setShowControls] = useState(false);
  const [showSaveMessage, setShowSaveMessage] = useState(false);

  // Dragging state
  const [panelPos, setPanelPos] = useLocalStorage('tweaksPanelPos', { x: 16, y: 112 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [appReady, setAppReady] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setAppReady(true);
    }, 2800);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!isDragging) return;

    const handlePointerMove = (e: PointerEvent) => {
      setPanelPos({
        x: e.clientX - dragOffset.x,
        y: e.clientY - dragOffset.y
      });
    };

    const handlePointerUp = () => {
      setIsDragging(false);
    };

    window.addEventListener('pointermove', handlePointerMove);
    window.addEventListener('pointerup', handlePointerUp);

    return () => {
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerup', handlePointerUp);
    };
  }, [isDragging, dragOffset, setPanelPos]);

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if ((e.target as HTMLElement).tagName === 'BUTTON') return;
    setIsDragging(true);
    setDragOffset({
      x: e.clientX - panelPos.x,
      y: e.clientY - panelPos.y
    });
    e.preventDefault();
  };

  const handleManualSave = () => {
    setShowSaveMessage(true);
    setTimeout(() => setShowSaveMessage(false), 2000);
  };

  return (
    <>
      <AnimatePresence>
        {!appReady && <LoadingScreen key="splash" />}
      </AnimatePresence>

      <motion.main 
        initial={{ opacity: 0 }}
        animate={{ opacity: appReady ? 1 : 0 }}
        transition={{ duration: 1, delay: 0.2 }}
        className="min-h-screen relative font-arabic overflow-x-hidden"
      >
      <BackgroundDecorations 
        techCircuits={techCircuits} 
        techDots={techDots} 
        techCircuitsLeft={techCircuitsLeft} 
        techDotsLeft={techDotsLeft} 
        techCircuitsBottomRight={techCircuitsBottomRight}
        techDotsBottomRight={techDotsBottomRight}
        techCircuitsBottomLeft={techCircuitsBottomLeft}
        techDotsBottomLeft={techDotsBottomLeft}
        centerDots1={centerDots1}
        centerDots2={centerDots2}
      />

      <div className="relative z-10 flex flex-col min-h-screen w-full max-w-[1440px] mx-auto">
        <Header 
          logoSizes={logoSizes} 
          padding={headerPadding} 
          lineHeight={lineHeight} 
          lineGap={lineGap} 
          headerHeight={headerHeight} 
          headerPaddingX={headerPaddingX} 
          mobileLogoSizes={mobileLogoSizes}
          mobileLineHeight={mobileLineHeight}
          mobileLineGap={mobileLineGap}
          mobileHeaderHeight={mobileHeaderHeight}
          mobileHeaderPaddingX={mobileHeaderPaddingX}
        />

        <div className="flex-1 flex flex-col items-center pb-24" style={{ paddingTop: `${heroTopGap}rem` }}>

          {/* Centered Right Illustration for smaller screens */}
          <div className="lg:hidden shrink-0 mx-auto mb-2 flex justify-center relative z-10 hover:-translate-y-2 transition-transform duration-500 cursor-pointer" style={{ width: `${mobileCenterIllustrationSize}vw` }}>
            <div
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[140%] h-[140%] mix-blend-multiply pointer-events-none"
              style={{
                background: 'radial-gradient(circle, rgba(192, 154, 77, 0.08) 0%, rgba(0, 130, 130, 0.04) 40%, transparent 70%)',
                filter: 'blur(40px)',
                zIndex: -1
              }}
            />
            <img 
              src={educationImage} 
              alt="Education Illustration" 
              className="w-full h-auto object-contain drop-shadow-xl" 
              style={{
                WebkitMaskImage: 'linear-gradient(to bottom, rgba(0,0,0,1) 85%, rgba(0,0,0,0) 100%)',
                maskImage: 'linear-gradient(to bottom, rgba(0,0,0,1) 85%, rgba(0,0,0,0) 100%)'
              }}
            />
          </div>

          <Hero />

          <div className="w-full relative flex justify-center mt-4 z-0">
            <LeftIllustration settings={leftSettings} />
            <FAQSection />
            <RightIllustration settings={rightSettings} />
          </div>
        </div>
      </div>

      {/* Dev Controls Panel */}
      {ENABLE_DEV_TOOLS && showControls && (
        <div 
          className="scrollable-panel fixed z-50 bg-white/90 backdrop-blur p-4 rounded-xl shadow-2xl border border-gray-200 text-sm w-64 font-sans max-h-[80vh] overflow-y-scroll overscroll-contain pointer-events-auto" 
          dir="ltr"
          style={{ top: `${panelPos.y}px`, left: `${panelPos.x}px` }}
        >
          <style>{`
            .scrollable-panel::-webkit-scrollbar {
              display: block !important;
              width: 10px !important;
            }
            .scrollable-panel::-webkit-scrollbar-track {
              background: #f1f5f9 !important;
              border-radius: 8px !important;
            }
            .scrollable-panel::-webkit-scrollbar-thumb {
              background: #94a3b8 !important;
              border-radius: 8px !important;
              border: 2px solid #f1f5f9 !important;
            }
            .scrollable-panel {
              scrollbar-width: auto !important;
              scrollbar-color: #94a3b8 #f1f5f9 !important;
            }
          `}</style>
          <div 
            className="flex justify-between items-center mb-4 sticky top-0 bg-white/90 pb-2 z-10 border-b cursor-grab active:cursor-grabbing select-none"
            onPointerDown={handlePointerDown}
          >
            <h3 className="font-bold text-gray-800 pointer-events-none">
              {isMobileScreen ? 'Mobile Layout Tweaks' : 'Desktop Layout Tweaks'}
            </h3>
            <div className="flex gap-2 items-center">
              {showSaveMessage && <span className="text-xs text-green-600 font-bold">Saved!</span>}
              <button onClick={handleManualSave} className="bg-blue-600 hover:bg-blue-700 text-white px-2 py-1 rounded text-xs font-bold transition-colors">Save</button>
              <button onClick={() => setShowControls(false)} className="text-gray-400 hover:text-gray-800 text-xs font-bold ml-2">X</button>
            </div>
          </div>

          <div className="space-y-6">
            {!isMobileScreen ? (
              <>
                <div className="space-y-3">
              <h4 className="font-semibold text-xs text-red-500 uppercase tracking-wider">Left Illustration</h4>
              <label className="block text-xs text-gray-600 font-medium">Size: {leftSettings.size}vw
                <input type="range" min="10" max="150" value={leftSettings.size} onChange={e => setLeftSettings({ ...leftSettings, size: Number(e.target.value) })} className="w-full mt-1 accent-red-500" />
              </label>
              <label className="block text-xs text-gray-600 font-medium">Top: {leftSettings.top}%
                <input type="range" min="-100" max="100" value={leftSettings.top} onChange={e => setLeftSettings({ ...leftSettings, top: Number(e.target.value) })} className="w-full mt-1 accent-red-500" />
              </label>
              <label className="block text-xs text-gray-600 font-medium">Left: {leftSettings.left}%
                <input type="range" min="-100" max="100" value={leftSettings.left} onChange={e => setLeftSettings({ ...leftSettings, left: Number(e.target.value) })} className="w-full mt-1 accent-red-500" />
              </label>
            </div>

            <div className="space-y-3 pt-4 border-t border-gray-100">
              <h4 className="font-semibold text-xs text-teal-600 uppercase tracking-wider">Right Illustration</h4>
              <label className="block text-xs text-gray-600 font-medium">Size: {rightSettings.size}vw
                <input type="range" min="10" max="150" value={rightSettings.size} onChange={e => setRightSettings({ ...rightSettings, size: Number(e.target.value) })} className="w-full mt-1 accent-teal-600" />
              </label>
              <label className="block text-xs text-gray-600 font-medium">Top: {rightSettings.top}%
                <input type="range" min="-100" max="100" value={rightSettings.top} onChange={e => setRightSettings({ ...rightSettings, top: Number(e.target.value) })} className="w-full mt-1 accent-teal-600" />
              </label>
              <label className="block text-xs text-gray-600 font-medium">Right: {rightSettings.right}%
                <input type="range" min="-100" max="100" value={rightSettings.right} onChange={e => setRightSettings({ ...rightSettings, right: Number(e.target.value) })} className="w-full mt-1 accent-teal-600" />
              </label>
            </div>

            <div className="space-y-3 pt-4 border-t border-gray-100">
              <h4 className="font-semibold text-xs text-red-600 uppercase tracking-wider">Top Left Circuits</h4>
              <label className="block text-xs text-gray-600 font-medium">Size: {techCircuitsLeft.size}px
                <input type="range" min="100" max="1000" value={techCircuitsLeft.size} onChange={e => setTechCircuitsLeft({ ...techCircuitsLeft, size: Number(e.target.value) })} className="w-full mt-1 accent-red-600" />
              </label>
              <label className="block text-xs text-gray-600 font-medium">Top: {techCircuitsLeft.top}%
                <input type="range" min="-100" max="100" value={techCircuitsLeft.top} onChange={e => setTechCircuitsLeft({ ...techCircuitsLeft, top: Number(e.target.value) })} className="w-full mt-1 accent-red-600" />
              </label>
              <label className="block text-xs text-gray-600 font-medium">Left: {techCircuitsLeft.left}%
                <input type="range" min="-100" max="100" value={techCircuitsLeft.left} onChange={e => setTechCircuitsLeft({ ...techCircuitsLeft, left: Number(e.target.value) })} className="w-full mt-1 accent-red-600" />
              </label>
              <label className="block text-xs text-gray-600 font-medium">Opacity: {techCircuitsLeft.opacity}%
                <input type="range" min="0" max="100" value={techCircuitsLeft.opacity} onChange={e => setTechCircuitsLeft({ ...techCircuitsLeft, opacity: Number(e.target.value) })} className="w-full mt-1 accent-red-600" />
              </label>
            </div>

            <div className="space-y-3 pt-4 border-t border-gray-100">
              <h4 className="font-semibold text-xs text-red-600 uppercase tracking-wider">Top Left Circuit Dots</h4>
              <label className="block text-xs text-gray-600 font-medium">Size: {techDotsLeft.size}px
                <input type="range" min="100" max="1000" value={techDotsLeft.size} onChange={e => setTechDotsLeft({ ...techDotsLeft, size: Number(e.target.value) })} className="w-full mt-1 accent-red-600" />
              </label>
              <label className="block text-xs text-gray-600 font-medium">Top: {techDotsLeft.top}%
                <input type="range" min="-100" max="100" value={techDotsLeft.top} onChange={e => setTechDotsLeft({ ...techDotsLeft, top: Number(e.target.value) })} className="w-full mt-1 accent-red-600" />
              </label>
              <label className="block text-xs text-gray-600 font-medium">Left: {techDotsLeft.left}%
                <input type="range" min="-100" max="100" value={techDotsLeft.left} onChange={e => setTechDotsLeft({ ...techDotsLeft, left: Number(e.target.value) })} className="w-full mt-1 accent-red-600" />
              </label>
              <label className="block text-xs text-gray-600 font-medium">Opacity: {techDotsLeft.opacity}%
                <input type="range" min="0" max="100" value={techDotsLeft.opacity} onChange={e => setTechDotsLeft({ ...techDotsLeft, opacity: Number(e.target.value) })} className="w-full mt-1 accent-red-600" />
              </label>
            </div>

            <div className="space-y-3 pt-4 border-t border-gray-100">
              <h4 className="font-semibold text-xs text-teal-600 uppercase tracking-wider">Top Right Circuits</h4>
              <label className="block text-xs text-gray-600 font-medium">Size: {techCircuits.size}px
                <input type="range" min="100" max="1000" value={techCircuits.size} onChange={e => setTechCircuits({ ...techCircuits, size: Number(e.target.value) })} className="w-full mt-1 accent-teal-600" />
              </label>
              <label className="block text-xs text-gray-600 font-medium">Top: {techCircuits.top}%
                <input type="range" min="-100" max="100" value={techCircuits.top} onChange={e => setTechCircuits({ ...techCircuits, top: Number(e.target.value) })} className="w-full mt-1 accent-teal-600" />
              </label>
              <label className="block text-xs text-gray-600 font-medium">Right: {techCircuits.right}%
                <input type="range" min="-100" max="100" value={techCircuits.right} onChange={e => setTechCircuits({ ...techCircuits, right: Number(e.target.value) })} className="w-full mt-1 accent-teal-600" />
              </label>
              <label className="block text-xs text-gray-600 font-medium">Opacity: {techCircuits.opacity}%
                <input type="range" min="0" max="100" value={techCircuits.opacity} onChange={e => setTechCircuits({ ...techCircuits, opacity: Number(e.target.value) })} className="w-full mt-1 accent-teal-600" />
              </label>
            </div>

            <div className="space-y-3 pt-4 border-t border-gray-100">
              <h4 className="font-semibold text-xs text-teal-600 uppercase tracking-wider">Top Right Circuit Dots</h4>
              <label className="block text-xs text-gray-600 font-medium">Size: {techDots.size}px
                <input type="range" min="100" max="1000" value={techDots.size} onChange={e => setTechDots({ ...techDots, size: Number(e.target.value) })} className="w-full mt-1 accent-teal-600" />
              </label>
              <label className="block text-xs text-gray-600 font-medium">Top: {techDots.top}%
                <input type="range" min="-100" max="100" value={techDots.top} onChange={e => setTechDots({ ...techDots, top: Number(e.target.value) })} className="w-full mt-1 accent-teal-600" />
              </label>
              <label className="block text-xs text-gray-600 font-medium">Right: {techDots.right}%
                <input type="range" min="-100" max="100" value={techDots.right} onChange={e => setTechDots({ ...techDots, right: Number(e.target.value) })} className="w-full mt-1 accent-teal-600" />
              </label>
              <label className="block text-xs text-gray-600 font-medium">Opacity: {techDots.opacity}%
                <input type="range" min="0" max="100" value={techDots.opacity} onChange={e => setTechDots({ ...techDots, opacity: Number(e.target.value) })} className="w-full mt-1 accent-teal-600" />
              </label>
            </div>

            <div className="space-y-3 pt-4 border-t border-gray-100">
              <h4 className="font-semibold text-xs text-teal-600 uppercase tracking-wider">Bottom Right Circuits</h4>
              <label className="block text-xs text-gray-600 font-medium">Size: {techCircuitsBottomRight.size}px
                <input type="range" min="100" max="1000" value={techCircuitsBottomRight.size} onChange={e => setTechCircuitsBottomRight({ ...techCircuitsBottomRight, size: Number(e.target.value) })} className="w-full mt-1 accent-teal-600" />
              </label>
              <label className="block text-xs text-gray-600 font-medium">Top: {techCircuitsBottomRight.top}%
                <input type="range" min="-100" max="150" value={techCircuitsBottomRight.top} onChange={e => setTechCircuitsBottomRight({ ...techCircuitsBottomRight, top: Number(e.target.value) })} className="w-full mt-1 accent-teal-600" />
              </label>
              <label className="block text-xs text-gray-600 font-medium">Right: {techCircuitsBottomRight.right}%
                <input type="range" min="-100" max="100" value={techCircuitsBottomRight.right} onChange={e => setTechCircuitsBottomRight({ ...techCircuitsBottomRight, right: Number(e.target.value) })} className="w-full mt-1 accent-teal-600" />
              </label>
              <label className="block text-xs text-gray-600 font-medium">Opacity: {techCircuitsBottomRight.opacity}%
                <input type="range" min="0" max="100" value={techCircuitsBottomRight.opacity} onChange={e => setTechCircuitsBottomRight({ ...techCircuitsBottomRight, opacity: Number(e.target.value) })} className="w-full mt-1 accent-teal-600" />
              </label>
            </div>

            <div className="space-y-3 pt-4 border-t border-gray-100">
              <h4 className="font-semibold text-xs text-teal-600 uppercase tracking-wider">Bottom Right Dots</h4>
              <label className="block text-xs text-gray-600 font-medium">Size: {techDotsBottomRight.size}px
                <input type="range" min="100" max="1000" value={techDotsBottomRight.size} onChange={e => setTechDotsBottomRight({ ...techDotsBottomRight, size: Number(e.target.value) })} className="w-full mt-1 accent-teal-600" />
              </label>
              <label className="block text-xs text-gray-600 font-medium">Top: {techDotsBottomRight.top}%
                <input type="range" min="-100" max="150" value={techDotsBottomRight.top} onChange={e => setTechDotsBottomRight({ ...techDotsBottomRight, top: Number(e.target.value) })} className="w-full mt-1 accent-teal-600" />
              </label>
              <label className="block text-xs text-gray-600 font-medium">Right: {techDotsBottomRight.right}%
                <input type="range" min="-100" max="100" value={techDotsBottomRight.right} onChange={e => setTechDotsBottomRight({ ...techDotsBottomRight, right: Number(e.target.value) })} className="w-full mt-1 accent-teal-600" />
              </label>
              <label className="block text-xs text-gray-600 font-medium">Opacity: {techDotsBottomRight.opacity}%
                <input type="range" min="0" max="100" value={techDotsBottomRight.opacity} onChange={e => setTechDotsBottomRight({ ...techDotsBottomRight, opacity: Number(e.target.value) })} className="w-full mt-1 accent-teal-600" />
              </label>
            </div>

            <div className="space-y-3 pt-4 border-t border-gray-100">
              <h4 className="font-semibold text-xs text-red-600 uppercase tracking-wider">Bottom Left Circuits</h4>
              <label className="block text-xs text-gray-600 font-medium">Size: {techCircuitsBottomLeft.size}px
                <input type="range" min="100" max="1000" value={techCircuitsBottomLeft.size} onChange={e => setTechCircuitsBottomLeft({ ...techCircuitsBottomLeft, size: Number(e.target.value) })} className="w-full mt-1 accent-red-600" />
              </label>
              <label className="block text-xs text-gray-600 font-medium">Top: {techCircuitsBottomLeft.top}%
                <input type="range" min="-100" max="150" value={techCircuitsBottomLeft.top} onChange={e => setTechCircuitsBottomLeft({ ...techCircuitsBottomLeft, top: Number(e.target.value) })} className="w-full mt-1 accent-red-600" />
              </label>
              <label className="block text-xs text-gray-600 font-medium">Left: {techCircuitsBottomLeft.left}%
                <input type="range" min="-100" max="100" value={techCircuitsBottomLeft.left} onChange={e => setTechCircuitsBottomLeft({ ...techCircuitsBottomLeft, left: Number(e.target.value) })} className="w-full mt-1 accent-red-600" />
              </label>
              <label className="block text-xs text-gray-600 font-medium">Opacity: {techCircuitsBottomLeft.opacity}%
                <input type="range" min="0" max="100" value={techCircuitsBottomLeft.opacity} onChange={e => setTechCircuitsBottomLeft({ ...techCircuitsBottomLeft, opacity: Number(e.target.value) })} className="w-full mt-1 accent-red-600" />
              </label>
            </div>

            <div className="space-y-3 pt-4 border-t border-gray-100">
              <h4 className="font-semibold text-xs text-red-600 uppercase tracking-wider">Bottom Left Dots</h4>
              <label className="block text-xs text-gray-600 font-medium">Size: {techDotsBottomLeft.size}px
                <input type="range" min="100" max="1000" value={techDotsBottomLeft.size} onChange={e => setTechDotsBottomLeft({ ...techDotsBottomLeft, size: Number(e.target.value) })} className="w-full mt-1 accent-red-600" />
              </label>
              <label className="block text-xs text-gray-600 font-medium">Top: {techDotsBottomLeft.top}%
                <input type="range" min="-100" max="150" value={techDotsBottomLeft.top} onChange={e => setTechDotsBottomLeft({ ...techDotsBottomLeft, top: Number(e.target.value) })} className="w-full mt-1 accent-red-600" />
              </label>
              <label className="block text-xs text-gray-600 font-medium">Left: {techDotsBottomLeft.left}%
                <input type="range" min="-100" max="100" value={techDotsBottomLeft.left} onChange={e => setTechDotsBottomLeft({ ...techDotsBottomLeft, left: Number(e.target.value) })} className="w-full mt-1 accent-red-600" />
              </label>
              <label className="block text-xs text-gray-600 font-medium">Opacity: {techDotsBottomLeft.opacity}%
                <input type="range" min="0" max="100" value={techDotsBottomLeft.opacity} onChange={e => setTechDotsBottomLeft({ ...techDotsBottomLeft, opacity: Number(e.target.value) })} className="w-full mt-1 accent-red-600" />
              </label>
            </div>

            <div className="space-y-3 pt-4 border-t border-gray-100">
              <h4 className="font-semibold text-xs text-teal-600 uppercase tracking-wider">Center Dots 1 (Teal)</h4>
              <label className="block text-xs text-gray-600 font-medium">Size: {centerDots1.size}px
                <input type="range" min="100" max="1000" value={centerDots1.size} onChange={e => setCenterDots1({ ...centerDots1, size: Number(e.target.value) })} className="w-full mt-1 accent-teal-600" />
              </label>
              <label className="block text-xs text-gray-600 font-medium">Top: {centerDots1.top}%
                <input type="range" min="-100" max="150" value={centerDots1.top} onChange={e => setCenterDots1({ ...centerDots1, top: Number(e.target.value) })} className="w-full mt-1 accent-teal-600" />
              </label>
              <label className="block text-xs text-gray-600 font-medium">Left: {centerDots1.left}%
                <input type="range" min="-100" max="150" value={centerDots1.left} onChange={e => setCenterDots1({ ...centerDots1, left: Number(e.target.value) })} className="w-full mt-1 accent-teal-600" />
              </label>
              <label className="block text-xs text-gray-600 font-medium">Opacity: {centerDots1.opacity}%
                <input type="range" min="0" max="100" value={centerDots1.opacity} onChange={e => setCenterDots1({ ...centerDots1, opacity: Number(e.target.value) })} className="w-full mt-1 accent-teal-600" />
              </label>
            </div>

            <div className="space-y-3 pt-4 border-t border-gray-100">
              <h4 className="font-semibold text-xs text-red-600 uppercase tracking-wider">Center Dots 2 (Red)</h4>
              <label className="block text-xs text-gray-600 font-medium">Size: {centerDots2.size}px
                <input type="range" min="100" max="1000" value={centerDots2.size} onChange={e => setCenterDots2({ ...centerDots2, size: Number(e.target.value) })} className="w-full mt-1 accent-red-600" />
              </label>
              <label className="block text-xs text-gray-600 font-medium">Top: {centerDots2.top}%
                <input type="range" min="-100" max="150" value={centerDots2.top} onChange={e => setCenterDots2({ ...centerDots2, top: Number(e.target.value) })} className="w-full mt-1 accent-red-600" />
              </label>
              <label className="block text-xs text-gray-600 font-medium">Left: {centerDots2.left}%
                <input type="range" min="-100" max="150" value={centerDots2.left} onChange={e => setCenterDots2({ ...centerDots2, left: Number(e.target.value) })} className="w-full mt-1 accent-red-600" />
              </label>
              <label className="block text-xs text-gray-600 font-medium">Opacity: {centerDots2.opacity}%
                <input type="range" min="0" max="100" value={centerDots2.opacity} onChange={e => setCenterDots2({ ...centerDots2, opacity: Number(e.target.value) })} className="w-full mt-1 accent-red-600" />
              </label>
            </div>

            <div className="space-y-3 pt-4 border-t border-gray-100">
              <h4 className="font-semibold text-xs text-teal-600 uppercase tracking-wider">Header Logos (vh)</h4>
              <label className="block text-xs text-gray-600 font-medium">Bar Height: {headerHeight}px
                <input type="range" min="-200" max="200" step="1" value={headerHeight} onChange={e => setHeaderHeight(Number(e.target.value))} className="w-full mt-1 accent-blue-600" />
              </label>
              <label className="block text-xs text-gray-600 font-medium">Bar Padding (Width): {headerPaddingX}px
                <input type="range" min="-200" max="200" step="1" value={headerPaddingX} onChange={e => setHeaderPaddingX(Number(e.target.value))} className="w-full mt-1 accent-blue-600" />
              </label>
              <label className="block text-xs text-gray-600 font-medium">Padding: {headerPadding}rem
                <input type="range" min="-2" max="6" step="0.25" value={headerPadding} onChange={e => setHeaderPadding(Number(e.target.value))} className="w-full mt-1 accent-blue-600" />
              </label>
              <label className="block text-xs text-gray-600 font-medium">Lines Height: {lineHeight}rem
                <input type="range" min="1" max="16" step="0.5" value={lineHeight} onChange={e => setLineHeight(Number(e.target.value))} className="w-full mt-1 accent-blue-600" />
              </label>
              <label className="block text-xs text-gray-600 font-medium">Lines Gap: {lineGap}rem
                <input type="range" min="0" max="12" step="0.5" value={lineGap} onChange={e => setLineGap(Number(e.target.value))} className="w-full mt-1 accent-blue-600" />
              </label>
              <label className="block text-xs text-gray-600 font-medium">Bottom Gap: {heroTopGap}rem
                <input type="range" min="0" max="20" step="0.5" value={heroTopGap} onChange={e => setHeroTopGap(Number(e.target.value))} className="w-full mt-1 accent-blue-600" />
              </label>
              <label className="block text-xs text-gray-600 font-medium">Ministry: {logoSizes.ministry}rem
                <input type="range" min="1" max="12" step="0.5" value={logoSizes.ministry} onChange={e => setLogoSizes({ ...logoSizes, ministry: Number(e.target.value) })} className="w-full mt-1 accent-blue-600" />
              </label>
              <label className="block text-xs text-gray-600 font-medium">Elsewedy: {logoSizes.elsewedy}rem
                <input type="range" min="1" max="12" step="0.5" value={logoSizes.elsewedy} onChange={e => setLogoSizes({ ...logoSizes, elsewedy: Number(e.target.value) })} className="w-full mt-1 accent-blue-600" />
              </label>
              <label className="block text-xs text-gray-600 font-medium">Applied Tech: {logoSizes.appliedTech}rem
                <input type="range" min="1" max="12" step="0.5" value={logoSizes.appliedTech} onChange={e => setLogoSizes({ ...logoSizes, appliedTech: Number(e.target.value) })} className="w-full mt-1 accent-blue-600" />
              </label>
            </div>

            <div className="space-y-3 pt-4 border-t border-gray-100">
                  <h4 className="font-semibold text-xs text-purple-600 uppercase tracking-wider">Background</h4>
                  <label className="block text-xs text-gray-600 font-medium">Size: {bgSize}%
                    <input type="range" min="10" max="300" step="1" value={bgSize} onChange={e => setBgSize(Number(e.target.value))} className="w-full mt-1 accent-purple-600" />
                  </label>
                </div>
              </>
            ) : (
              <>
                <div className="space-y-3">
                  <h4 className="font-semibold text-xs text-blue-600 uppercase tracking-wider">Mobile Header Logos (px/rem)</h4>
                  <label className="block text-xs text-gray-600 font-medium">Bar Height: {mobileHeaderHeight}px
                    <input type="range" min="-200" max="150" step="1" value={mobileHeaderHeight} onChange={e => setMobileHeaderHeight(Number(e.target.value))} className="w-full mt-1 accent-blue-600" />
                  </label>
                  <label className="block text-xs text-gray-600 font-medium">Bar Padding: {mobileHeaderPaddingX}px
                    <input type="range" min="-200" max="100" step="1" value={mobileHeaderPaddingX} onChange={e => setMobileHeaderPaddingX(Number(e.target.value))} className="w-full mt-1 accent-blue-600" />
                  </label>
                  <label className="block text-xs text-gray-600 font-medium">Lines Height: {mobileLineHeight}rem
                    <input type="range" min="1" max="12" step="0.5" value={mobileLineHeight} onChange={e => setMobileLineHeight(Number(e.target.value))} className="w-full mt-1 accent-blue-600" />
                  </label>
                  <label className="block text-xs text-gray-600 font-medium">Lines Gap: {mobileLineGap}rem
                    <input type="range" min="0" max="4" step="0.1" value={mobileLineGap} onChange={e => setMobileLineGap(Number(e.target.value))} className="w-full mt-1 accent-blue-600" />
                  </label>
                  <label className="block text-xs text-gray-600 font-medium">Ministry Size: {mobileLogoSizes.ministry}rem
                    <input type="range" min="1" max="12" step="0.5" value={mobileLogoSizes.ministry} onChange={e => setMobileLogoSizes({ ...mobileLogoSizes, ministry: Number(e.target.value) })} className="w-full mt-1 accent-blue-600" />
                  </label>
                  <label className="block text-xs text-gray-600 font-medium">Elsewedy Size: {mobileLogoSizes.elsewedy}rem
                    <input type="range" min="1" max="12" step="0.5" value={mobileLogoSizes.elsewedy} onChange={e => setMobileLogoSizes({ ...mobileLogoSizes, elsewedy: Number(e.target.value) })} className="w-full mt-1 accent-blue-600" />
                  </label>
                  <label className="block text-xs text-gray-600 font-medium">Applied Tech Size: {mobileLogoSizes.appliedTech}rem
                    <input type="range" min="1" max="12" step="0.5" value={mobileLogoSizes.appliedTech} onChange={e => setMobileLogoSizes({ ...mobileLogoSizes, appliedTech: Number(e.target.value) })} className="w-full mt-1 accent-blue-600" />
                  </label>
                </div>
                <div className="space-y-3 pt-4 border-t border-gray-100">
                  <h4 className="font-semibold text-xs text-red-500 uppercase tracking-wider">Mobile Center Illustration</h4>
                  <label className="block text-xs text-gray-600 font-medium">Width: {mobileCenterIllustrationSize}vw
                    <input type="range" min="30" max="300" step="1" value={mobileCenterIllustrationSize} onChange={e => setMobileCenterIllustrationSize(Number(e.target.value))} className="w-full mt-1 accent-red-500" />
                  </label>
                </div>
                <div className="space-y-3 pt-4 border-t border-gray-100">
                  <h4 className="font-semibold text-xs text-purple-600 uppercase tracking-wider">Background</h4>
                  <label className="block text-xs text-gray-600 font-medium">Size: {bgSize}%
                    <input type="range" min="10" max="300" step="1" value={bgSize} onChange={e => setBgSize(Number(e.target.value))} className="w-full mt-1 accent-purple-600" />
                  </label>
                </div>
              </>
            )}
          </div>
        </div>
      )}
      {ENABLE_DEV_TOOLS && !showControls && (

        <button
          onClick={() => setShowControls(true)}
          className="fixed top-28 left-4 z-50 bg-white shadow-md border border-gray-200 px-3 py-1 rounded-md text-xs font-sans text-gray-600 hover:text-gray-900"
          dir="ltr"
        >
          Show Tweaks
        </button>
      )}
        </motion.main>
    </>
  );
}

export default App;
