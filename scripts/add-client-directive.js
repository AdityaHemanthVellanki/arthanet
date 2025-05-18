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
    
    // Check if 'use client' is already present
    if (!content.includes("'use client'")) {
      // Add 'use client' after any existing comments at the top
      content = content.replace(
        /^(\/\*[\s\S]*?\*\/\s*)?(import|export|'|")/m,
        (match, p1) => {
          return (p1 || '') + "'use client';\n\n";
        }
      );
      
      fs.writeFileSync(fullPath, content, 'utf8');
      console.log(`Updated ${componentPath} with 'use client' directive`);
    } else {
      console.log(`${componentPath} already has 'use client' directive`);
    }
  } catch (error) {
    console.error(`Error processing ${componentPath}:`, error.message);
  }
});

console.log('Done updating components with client directives.');
