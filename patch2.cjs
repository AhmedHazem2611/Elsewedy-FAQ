const fs = require('fs');
let content = fs.readFileSync('src/App.tsx', 'utf-8');

// 1. Imports
content = content.replace(
  "import { useState } from 'react';",
  "import React, { useState, useEffect } from 'react';\nimport { motion, AnimatePresence } from 'framer-motion';"
);
content = content.replace(
  "import { DotMatrix } from './components/DotMatrix';",
  "import { DotMatrix } from './components/DotMatrix';\nimport { LoadingScreen } from './components/LoadingScreen';"
);

// 2. States (headerHeight, headerPaddingX and appReady)
content = content.replace(
  "const [headerPadding, setHeaderPadding] = useLocalStorage('headerPadding', -1.75);",
  "const [headerPadding, setHeaderPadding] = useLocalStorage('headerPadding', -1.75);\n  const [headerHeight, setHeaderHeight] = useLocalStorage('headerHeight', 96);\n  const [headerPaddingX, setHeaderPaddingX] = useLocalStorage('headerPaddingX', 48);"
);
content = content.replace(
  "const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });",
  `const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [appReady, setAppReady] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setAppReady(true);
    }, 2800);
    return () => clearTimeout(timer);
  }, []);`
);

// 3. Render return
content = content.replace(
  "<main className=\"min-h-screen relative font-arabic\">",
  `<>
      <AnimatePresence>
        {!appReady && <LoadingScreen key="splash" />}
      </AnimatePresence>

      <motion.main 
        initial={{ opacity: 0 }}
        animate={{ opacity: appReady ? 1 : 0 }}
        transition={{ duration: 1, delay: 0.2 }}
        className="min-h-screen relative font-arabic"
      >`
);

content = content.replace(
  "<Header logoSizes={logoSizes} padding={headerPadding} lineHeight={lineHeight} lineGap={lineGap} />",
  "<Header logoSizes={logoSizes} padding={headerPadding} lineHeight={lineHeight} lineGap={lineGap} headerHeight={headerHeight} headerPaddingX={headerPaddingX} />"
);

content = content.replace(
  "<label className=\"block text-xs text-gray-600 font-medium\">Padding: {headerPadding}rem",
  `<label className="block text-xs text-gray-600 font-medium">Bar Height: {headerHeight}px
                <input type="range" min="40" max="200" step="1" value={headerHeight} onChange={e => setHeaderHeight(Number(e.target.value))} className="w-full mt-1 accent-blue-600" />
              </label>
              <label className="block text-xs text-gray-600 font-medium">Bar Padding (Width): {headerPaddingX}px
                <input type="range" min="0" max="200" step="1" value={headerPaddingX} onChange={e => setHeaderPaddingX(Number(e.target.value))} className="w-full mt-1 accent-blue-600" />
              </label>
              <label className="block text-xs text-gray-600 font-medium">Padding: {headerPadding}rem`
);

content = content.replace(
  "    </main>\n  );\n}\n\nexport default App;",
  "      </motion.main>\n    </>\n  );\n}\n\nexport default App;"
);

fs.writeFileSync('src/App.tsx', content);
