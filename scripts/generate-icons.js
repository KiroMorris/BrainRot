const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const svgIcon = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
  <defs>
    <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#10b981"/>
      <stop offset="100%" style="stop-color:#14b8a6"/>
    </linearGradient>
  </defs>
  <rect width="512" height="512" rx="100" fill="#0f172a"/>
  <g transform="translate(256, 256)">
    <path d="M-80,-60 Q-120,-60 -120,-20 Q-120,20 -80,40 Q-100,60 -80,80 Q-60,100 -20,80 Q0,100 40,80 Q80,100 100,60 Q120,40 120,0 Q120,-40 80,-60 Q100,-80 60,-100 Q20,-100 0,-80 Q-40,-100 -80,-60"
          fill="url(#grad)"
          stroke="#059669"
          stroke-width="4"/>
    <path d="M-40,-40 Q0,-60 40,-40" stroke="#0f172a" stroke-width="8" fill="none" stroke-linecap="round"/>
    <path d="M-60,0 Q0,-20 60,0" stroke="#0f172a" stroke-width="8" fill="none" stroke-linecap="round"/>
    <path d="M-40,40 Q0,20 40,40" stroke="#0f172a" stroke-width="8" fill="none" stroke-linecap="round"/>
    <line x1="0" y1="-80" x2="0" y2="80" stroke="#0f172a" stroke-width="6" stroke-linecap="round"/>
    <circle cx="80" cy="-80" r="12" fill="#fbbf24"/>
    <circle cx="90" cy="-70" r="6" fill="#fbbf24" opacity="0.6"/>
  </g>
</svg>`;

const sizes = [192, 512];
const iconsDir = path.join(__dirname, '../public/icons');

async function generateIcons() {
  // Ensure directory exists
  if (!fs.existsSync(iconsDir)) {
    fs.mkdirSync(iconsDir, { recursive: true });
  }

  for (const size of sizes) {
    const outputPath = path.join(iconsDir, `icon-${size}.png`);

    await sharp(Buffer.from(svgIcon))
      .resize(size, size)
      .png()
      .toFile(outputPath);

    console.log(`Generated: icon-${size}.png`);
  }

  console.log('All icons generated successfully!');
}

generateIcons().catch(console.error);
