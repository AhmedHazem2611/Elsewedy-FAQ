import React from 'react';
import buildingImage from '../assets/building.png';
import educationImage from '../assets/education.png';

export { educationImage };

interface IllustrationSettings {
  size: number;
  top: number;
  left?: number;
  right?: number;
}

export function LeftIllustration({ settings }: { settings: IllustrationSettings }) {
  return (
    <>
      <style>{`
        .responsive-illus-left {
          width: var(--illus-width);
          left: var(--illus-left);
          top: var(--illus-top);
          opacity: 1;
          transition: all 0.5s ease-in-out;
        }
      `}</style>
      <div 
        className="fixed z-0 pointer-events-none hidden lg:block origin-top-left responsive-illus-left"
        style={{
          '--illus-width': `max(200px, ${settings.size}vw)`,
          '--illus-left': `${settings.left}%`,
          '--illus-top': `${settings.top}%`
        } as React.CSSProperties}
      >
        {/* Layer 2: Ambient Glow (behind the image) */}
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[140%] h-[140%] mix-blend-multiply"
          style={{
            background: 'radial-gradient(circle, rgba(232, 93, 74, 0.05) 0%, rgba(255, 255, 255, 0.02) 40%, transparent 70%)',
            filter: 'blur(60px)',
            zIndex: -1
          }}
        />
        {/* Layer 3: Building Image with Horizontal Fade Mask */}
        <img
          src={buildingImage}
          alt="School Building"
          className="w-full h-auto object-contain"
          style={{
            WebkitMaskImage: 'linear-gradient(to right, rgba(0,0,0,1) 50%, rgba(0,0,0,0) 100%)',
            maskImage: 'linear-gradient(to right, rgba(0,0,0,1) 50%, rgba(0,0,0,0) 100%)'
          }}
        />
      </div>
    </>
  );
}

export function RightIllustration({ settings }: { settings: IllustrationSettings }) {
  return (
    <>
      <style>{`
        .responsive-illus-right {
          width: var(--illus-width);
          right: var(--illus-right);
          top: var(--illus-top);
          opacity: 1;
          transition: all 0.5s ease-in-out;
        }
      `}</style>
      <div 
        className="fixed z-0 pointer-events-none hidden lg:block origin-top-right responsive-illus-right"
        style={{
          '--illus-width': `max(150px, ${settings.size}vw)`,
          '--illus-right': `${settings.right}%`,
          '--illus-top': `${settings.top}%`
        } as React.CSSProperties}
      >
        {/* Layer 2: Ambient Glow (behind the image) */}
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[140%] h-[140%] mix-blend-multiply"
          style={{
            background: 'radial-gradient(circle, rgba(192, 154, 77, 0.05) 0%, rgba(0, 130, 130, 0.02) 40%, transparent 70%)',
            filter: 'blur(60px)',
            zIndex: -1
          }}
        />
        {/* Layer 3: Education Books Image with Horizontal Fade Mask */}
        <img
          src={educationImage}
          alt="Education Illustration"
          className="w-full h-auto object-contain"
          style={{
            WebkitMaskImage: 'linear-gradient(to left, rgba(0,0,0,1) 50%, rgba(0,0,0,0) 100%)',
            maskImage: 'linear-gradient(to left, rgba(0,0,0,1) 50%, rgba(0,0,0,0) 100%)'
          }}
        />
      </div>
    </>
  );
}
