const fs = require('fs');
let content = fs.readFileSync('src/App.tsx', 'utf-8');
content = content.replace(/<\/main>\s*\)\;\s*\}\s*export default App;/m, "    </motion.main>\n    </>\n  );\n}\n\nexport default App;");
fs.writeFileSync('src/App.tsx', content);
