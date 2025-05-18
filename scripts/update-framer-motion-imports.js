const fs = require('fs');
const path = require('path');

const components = [
  'src/components/Features.tsx',
  'src/components/HowItWorks.tsx',
  'src/components/Cta.tsx',
  'src/components/Hero.tsx',
  'src/components/Navbar.tsx',
  'src/components/header.tsx',
  'src/components/Waitlist.tsx'
];

components.forEach(componentPath => {
  const fullPath = path.join(process.cwd(), componentPath);
  try {
    let content = fs.readFileSync(fullPath, 'utf8');
    
    // Replace import { motion } from 'framer-motion' with specific imports
    if (content.includes("from 'framer-motion'")) {
      // Get all named imports
      const imports = [];
      const motionRegex = /import\s*\{([^}]+)\}\s*from\s*['"]framer-motion['"]/g;
      let match;
      
      while ((match = motionRegex.exec(content)) !== null) {
        const namedImports = match[1].split(',').map(s => s.trim()).filter(Boolean);
        imports.push(...namedImports);
      }
      
      if (imports.length > 0) {
        // Remove all motion imports
        content = content.replace(
          /import\s*\{[^}]*\}\s*from\s*['"]framer-motion['"]/g,
          ''
        );
        
        // Add the new import at the top
        const uniqueImports = [...new Set(imports)];
        const newImport = `import { ${uniqueImports.join(', ')} } from 'framer-motion';`;
        content = `'use client';\n\n${newImport}\n${content.replace(/^'use client';\n\n?/, '')}`;
        
        fs.writeFileSync(fullPath, content, 'utf8');
        console.log(`Updated imports in ${componentPath}`);
      }
    }
  } catch (error) {
    console.error(`Error processing ${componentPath}:`, error.message);
  }
});

console.log('Done updating Framer Motion imports.');
