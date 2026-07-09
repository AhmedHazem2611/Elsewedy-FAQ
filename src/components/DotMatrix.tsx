import { useState, useEffect, useMemo } from 'react';

// Custom hook for window size to make matrix responsive
function useWindowSize() {
  const [windowSize, setWindowSize] = useState({
    width: typeof window !== 'undefined' ? window.innerWidth : 1200,
    height: typeof window !== 'undefined' ? window.innerHeight : 800,
  });

  useEffect(() => {
    // Debounce the resize event to prevent rapid recalculations while dragging the window
    let timeoutId: ReturnType<typeof setTimeout>;
    
    function handleResize() {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        setWindowSize({
          width: window.innerWidth,
          height: window.innerHeight,
        });
      }, 150); // 150ms debounce
    }
    
    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('resize', handleResize);
      clearTimeout(timeoutId);
    };
  }, []);

  return windowSize;
}

interface Dot {
  id: string;
  x: number;
  y: number;
  r: number;
  opacity: number;
  fill: string;
}

interface Cluster {
  id: string;
  cx: number;
  cy: number;
  rx: number;
  ry: number;
  rotation: number;
  dots: Dot[];
}

export function DotMatrix() {
  const { width, height } = useWindowSize();

  const clusters = useMemo(() => {
    let spacing = 35; // Tighter grid for more density
    let densityMultiplier = 1;
    
    if (width < 768) {
      spacing = 55;
      densityMultiplier = 0.5;
    } else if (width < 1024) {
      spacing = 45;
      densityMultiplier = 0.8;
    }

    const clusterDefs = [
      // Massive Corner Anchors
      { id: 'top-left', cx: width * 0.1, cy: height * 0.1, rx: Math.max(400, width * 0.35), ry: 400, rotation: -15 },
      { id: 'top-right', cx: width * 0.9, cy: height * 0.1, rx: Math.max(450, width * 0.4), ry: 350, rotation: 10 },
      { id: 'bottom-left', cx: width * 0.1, cy: height * 0.9, rx: Math.max(450, width * 0.35), ry: 450, rotation: 20 },
      { id: 'bottom-right', cx: width * 0.9, cy: height * 0.9, rx: Math.max(400, width * 0.4), ry: 400, rotation: -15 },
      
      // Mid-sections pushing closer to the center column
      { id: 'mid-left-1', cx: width * 0.15, cy: height * 0.35, rx: 350, ry: 450, rotation: 25 },
      { id: 'mid-left-2', cx: width * 0.05, cy: height * 0.65, rx: 300, ry: 500, rotation: 5 },
      { id: 'mid-right-1', cx: width * 0.85, cy: height * 0.3, rx: 350, ry: 500, rotation: -25 },
      { id: 'mid-right-2', cx: width * 0.95, cy: height * 0.6, rx: 300, ry: 400, rotation: -10 },

      // Horizontal bridges spanning the top and bottom gaps
      { id: 'bridge-top', cx: width * 0.5, cy: height * 0.02, rx: width * 0.45, ry: 250, rotation: 0 },
      { id: 'bridge-bottom', cx: width * 0.5, cy: height * 0.98, rx: width * 0.45, ry: 300, rotation: 0 },
    ];

    const generatedClusters: Cluster[] = [];

    clusterDefs.forEach(def => {
      const dots: Dot[] = [];
      const cols = Math.ceil((def.rx * 2) / spacing);
      const rows = Math.ceil((def.ry * 2) / spacing);
      
      const startX = -def.rx;
      const startY = -def.ry;

      for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
          const baseX = startX + (i * spacing);
          const baseY = startY + (j * spacing);
          
          const x = baseX + (Math.random() * 20 - 10);
          const y = baseY + (Math.random() * 20 - 10);

          const distance = (x * x) / (def.rx * def.rx) + (y * y) / (def.ry * def.ry);
          
          if (distance <= 1.2) {
            let probability = 0.7 + (Math.random() * 0.2);
            probability *= densityMultiplier;

            if (Math.random() < probability) {
              const sizes = [1, 1.5, 2]; // equivalent to 2px, 3px, 4px diameter
              const r = sizes[Math.floor(Math.random() * sizes.length)];
              
              // Opacity restricted to 2%, 4%, 6%, 8%
              const opacities = [0.02, 0.04, 0.06, 0.08];
              const opacity = opacities[Math.floor(Math.random() * opacities.length)];

              let fill = '#94a3b8'; // Neutral gray
              const colorRoll = Math.random();
              if (colorRoll < 0.05) fill = '#E53935'; // 5% Soft red
              else if (colorRoll < 0.10) fill = '#009688'; // 5% Soft teal

              dots.push({
                id: `dot-${def.id}-${i}-${j}`,
                x,
                y,
                r,
                opacity,
                fill,
              });
            }
          }
        }
      }

      generatedClusters.push({ ...def, dots });
    });
    
    return generatedClusters;
  }, [width, height]);

  return (
    <>
      <defs>
        <radialGradient id="cluster-gradient" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="white" stopOpacity="1" />
          <stop offset="30%" stopColor="white" stopOpacity="0.8" />
          <stop offset="60%" stopColor="white" stopOpacity="0.4" />
          <stop offset="100%" stopColor="white" stopOpacity="0" />
        </radialGradient>

        {clusters.map(cluster => (
          <mask 
            key={`mask-${cluster.id}`} 
            id={`mask-${cluster.id}`} 
            maskUnits="userSpaceOnUse" 
            x={-cluster.rx} 
            y={-cluster.ry} 
            width={cluster.rx * 2} 
            height={cluster.ry * 2}
          >
            <ellipse cx="0" cy="0" rx={cluster.rx} ry={cluster.ry} fill="url(#cluster-gradient)" />
          </mask>
        ))}
      </defs>

      {clusters.map(cluster => (
        <g 
          key={cluster.id} 
          className="dot-matrix-cluster"
          transform={`translate(${cluster.cx}, ${cluster.cy}) rotate(${cluster.rotation})`}
          mask={`url(#mask-${cluster.id})`}
        >
          {cluster.dots.map(dot => (
            <circle
              key={dot.id}
              cx={dot.x}
              cy={dot.y}
              r={dot.r}
              fill={dot.fill}
              opacity={dot.opacity}
            />
          ))}
        </g>
      ))}
    </>
  );
}
