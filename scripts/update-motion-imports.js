const fs = require('fs');
const path = require('path');

const components = [
  'src/components/header.tsx',
  'src/components/Hero.tsx',
  'src/components/HowItWorks.tsx',
  'src/components/Features.tsx',
  'src/components/Waitlist.tsx',
  'src/components/Navbar.tsx'
];

components.forEach(componentPath => {
  const fullPath = path.join(process.cwd(), componentPath);
  try {
    let content = fs.readFileSync(fullPath, 'utf8');
    
    // Add 'use client' if not present
    if (!content.includes("'use client'")) {
      content = "'use client';\n\n" + content;
      console.log(`Added 'use client' to ${componentPath}`);
    }
    
    // Update motion import if needed
    if (content.includes("from 'framer-motion'") && !content.includes("import { motion }")) {
      content = content.replace(
        /import\s*\{\s*([^}]*?motion[^}]*?)\s*\}\s*from\s*['"]framer-motion['"]/,
        "import { motion, $1 } from 'framer-motion'"
      );
      console.log(`Updated motion import in ${componentPath}`);
    }
    
    fs.writeFileSync(fullPath, content, 'utf8');
  } catch (error) {
    console.error(`Error processing ${componentPath}:`, error.message);
  }
});

console.log('Done updating motion imports.');
