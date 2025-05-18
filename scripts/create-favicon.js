const fs = require('fs');
const path = require('path');

// Copy the logo.png to favicon.ico
const logoPath = path.join(__dirname, '../public/images/logo.png');
const faviconPath = path.join(__dirname, '../public/favicon.ico');

fs.copyFile(logoPath, faviconPath, (err) => {
  if (err) {
    console.error('Error creating favicon.ico:', err);
    process.exit(1);
  }
  console.log('Successfully created favicon.ico');
});
