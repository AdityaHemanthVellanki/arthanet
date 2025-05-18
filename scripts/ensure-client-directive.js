const fs = require('fs');
const path = require('path');

const components = [
  'src/components/HowItWorks.tsx',
  'src/components/header.tsx',
  'src/components/Cta.tsx',
  'src/components/Waitlist.tsx',
  'src/components/Navbar.tsx',
  'src/components/Features.tsx',
  'src/components/Hero.tsx'
];

components.forEach(componentPath => {
  const fullPath = path.join(process.cwd(), componentPath);
  try {
    let content = fs.readFileSync(fullPath, 'utf8');
    
    // Add 'use client' if not present
    if (!content.includes("'use client'")) {
      content = "'use client';\n\n" + content;
      console.log(`Added 'use client' to ${componentPath}`);
      fs.writeFileSync(fullPath, content, 'utf8');
    } else {
      console.log(`${componentPath} already has 'use client'`);
    }
  } catch (error) {
    console.error(`Error processing ${componentPath}:`, error.message);
  }
});

console.log('Done ensuring client directives.');
