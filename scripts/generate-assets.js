import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const postcardsDir = path.resolve(__dirname, '../public/assets/postcards');
const galleryDir = path.resolve(__dirname, '../public/assets/gallery');

fs.mkdirSync(postcardsDir, { recursive: true });
fs.mkdirSync(galleryDir, { recursive: true });

// Helper to generate vintage SVG postcards
const postcardThemes = [
  { id: 'mc001', title: 'Rainy Love', color1: '#1b262c', color2: '#0f171e', accent: '#4e8d7c', icon: 'rain' },
  { id: 'mc002', title: 'Old Love Letter', color1: '#2b2118', color2: '#19120c', accent: '#c59b27', icon: 'letter' },
  { id: 'mc003', title: 'Moonlit Night', color1: '#0d1322', color2: '#070a12', accent: '#d4af37', icon: 'moon' },
  { id: 'mc004', title: 'Vintage Old Café', color1: '#261a14', color2: '#160e0a', accent: '#d4a373', icon: 'coffee' },
  { id: 'mc005', title: 'Eternal Rose', color1: '#2a1114', color2: '#140608', accent: '#c93b48', icon: 'rose' },
  { id: 'mc006', title: 'Railway Station', color1: '#22201d', color2: '#141311', accent: '#b08968', icon: 'train' },
  { id: 'mc007', title: 'Sunset Horizon', color1: '#361d15', color2: '#1b0e08', accent: '#e07a5f', icon: 'sunset' },
  { id: 'mc008', title: 'Zamindar House', color1: '#251b14', color2: '#140c07', accent: '#c59b27', icon: 'palace' },
  { id: 'mc009', title: 'Umbrella in Rain', color1: '#192226', color2: '#0c1214', accent: '#588157', icon: 'umbrella' },
  { id: 'mc010', title: 'Antique Gramophone', color1: '#291d15', color2: '#160d08', accent: '#d4af37', icon: 'music' },
  { id: 'mc011', title: 'Golden Ring', color1: '#2c1e19', color2: '#170c08', accent: '#ffd166', icon: 'ring' },
  { id: 'mc012', title: 'Wax Seal', color1: '#311015', color2: '#190609', accent: '#d90429', icon: 'seal' },
  { id: 'mc013', title: 'Heartbreak', color1: '#1a1818', color2: '#0d0c0c', accent: '#8d99ae', icon: 'heartbreak' },
  { id: 'mc014', title: 'Old Tram', color1: '#27231c', color2: '#14120e', accent: '#ddb892', icon: 'tram' },
  { id: 'mc015', title: 'Midnight Lantern', color1: '#191b22', color2: '#0a0c10', accent: '#f4a261', icon: 'lantern' },
  { id: 'mc016', title: 'Riverboat in Fog', color1: '#1b2223', color2: '#0e1213', accent: '#709775', icon: 'boat' },
  { id: 'mc017', title: 'Typewriter Poem', color1: '#24201a', color2: '#13110d', accent: '#c8b6ff', icon: 'typewriter' },
  { id: 'mc018', title: 'Anniversary Candle', color1: '#2d1815', color2: '#160907', accent: '#f3c68f', icon: 'candle' },
  { id: 'mc019', title: 'Birthday Bouquet', color1: '#27171e', color2: '#130a0e', accent: '#f28482', icon: 'bouquet' },
  { id: 'mc020', title: 'Silent Longing', color1: '#1e2124', color2: '#0f1113', accent: '#a8dadc', icon: 'window' },
  { id: 'mc021', title: 'One Sided Secret', color1: '#231d24', color2: '#100c11', accent: '#b5838d', icon: 'diary' },
  { id: 'mc022', title: 'Cinema Noir', color1: '#1e1c1b', color2: '#0d0c0b', accent: '#e9d8a6', icon: 'cinema' },
  { id: 'mc023', title: 'Raindrop on Glass', color1: '#151e24', color2: '#090f13', accent: '#64dfdf', icon: 'drops' },
  { id: 'mc024', title: 'Old Library', color1: '#251c14', color2: '#130d08', accent: '#d4a373', icon: 'books' },
];

function getIconSvg(type, accent) {
  switch (type) {
    case 'rain':
    case 'drops':
      return `
        <g stroke="${accent}" stroke-width="1.5" opacity="0.65" stroke-dasharray="8 6">
          <line x1="120" y1="60" x2="90" y2="180" />
          <line x1="220" y1="40" x2="190" y2="170" />
          <line x1="340" y1="50" x2="310" y2="200" />
          <line x1="480" y1="30" x2="450" y2="190" />
          <line x1="620" y1="50" x2="590" y2="210" />
          <line x1="720" y1="40" x2="690" y2="180" />
        </g>
        <path d="M360,280 C360,230 400,200 450,200 C490,200 530,230 530,280 C540,280 550,290 550,300 C550,310 540,315 530,315 L360,315 C345,315 335,305 335,295 C335,285 345,280 360,280 Z" fill="${accent}" fill-opacity="0.2" stroke="${accent}" stroke-width="2"/>
        <path d="M445,315 L445,370 C445,385 430,390 420,380" fill="none" stroke="${accent}" stroke-width="3" stroke-linecap="round"/>
      `;
    case 'rose':
      return `
        <circle cx="450" cy="270" r="50" fill="${accent}" fill-opacity="0.15" stroke="${accent}" stroke-width="2"/>
        <path d="M450,235 C430,250 430,285 450,295 C470,285 470,250 450,235 Z" fill="${accent}" fill-opacity="0.4"/>
        <path d="M450,295 Q450,380 435,420" stroke="#4e7c59" stroke-width="3" fill="none"/>
        <path d="M448,340 Q475,330 490,345 C480,360 450,350 448,340 Z" fill="#4e7c59" fill-opacity="0.7"/>
      `;
    case 'moon':
      return `
        <circle cx="450" cy="250" r="60" fill="none" stroke="${accent}" stroke-width="2" stroke-dasharray="4 4"/>
        <path d="M465,200 C430,215 410,250 420,290 C430,325 465,345 495,335 C450,355 395,325 395,270 C395,225 435,195 465,200 Z" fill="${accent}" fill-opacity="0.6"/>
        <polygon points="530,210 535,225 550,225 538,235 542,250 530,240 518,250 522,235 510,225 525,225" fill="${accent}" fill-opacity="0.8"/>
        <polygon points="370,180 373,190 384,190 375,197 378,208 370,201 362,208 365,197 356,190 367,190" fill="${accent}" fill-opacity="0.5"/>
      `;
    case 'letter':
    case 'seal':
      return `
        <rect x="360" y="220" width="180" height="120" rx="4" fill="${accent}" fill-opacity="0.15" stroke="${accent}" stroke-width="2"/>
        <line x1="360" y1="220" x2="450" y2="285" stroke="${accent}" stroke-width="2"/>
        <line x1="540" y1="220" x2="450" y2="285" stroke="${accent}" stroke-width="2"/>
        <circle cx="450" cy="285" r="22" fill="#8b1e22" stroke="${accent}" stroke-width="2"/>
        <path d="M443,285 C443,279 450,277 450,283 C450,277 457,279 457,285 C457,292 450,296 450,296 C450,296 443,292 443,285 Z" fill="#ffd166"/>
      `;
    case 'coffee':
      return `
        <path d="M380,270 L500,270 C500,340 400,340 380,270 Z" fill="${accent}" fill-opacity="0.25" stroke="${accent}" stroke-width="2"/>
        <path d="M495,285 C515,285 525,300 515,315 C505,325 490,320 485,320" fill="none" stroke="${accent}" stroke-width="3"/>
        <line x1="360" y1="345" x2="520" y2="345" stroke="${accent}" stroke-width="3" stroke-linecap="round"/>
        <path d="M420,240 Q410,215 430,195 M445,240 Q435,215 455,195 M470,240 Q460,215 480,195" fill="none" stroke="${accent}" stroke-width="1.5" stroke-linecap="round" opacity="0.7"/>
      `;
    default:
      return `
        <circle cx="450" cy="270" r="65" fill="${accent}" fill-opacity="0.15" stroke="${accent}" stroke-width="2"/>
        <path d="M450,240 C430,215 390,230 400,265 C410,295 450,325 450,325 C450,325 490,295 500,265 C510,230 470,215 450,240 Z" fill="${accent}" fill-opacity="0.45"/>
        <circle cx="450" cy="270" r="95" fill="none" stroke="${accent}" stroke-width="1" stroke-dasharray="6 4" opacity="0.5"/>
      `;
  }
}

postcardThemes.forEach((card) => {
  const svgContent = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 900 600" width="900" height="600">
  <defs>
    <linearGradient id="bgGrad_${card.id}" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="${card.color1}" />
      <stop offset="100%" stop-color="${card.color2}" />
    </linearGradient>
    <pattern id="grain_${card.id}" width="40" height="40" patternUnits="userSpaceOnUse">
      <circle cx="10" cy="10" r="0.8" fill="${card.accent}" opacity="0.08"/>
      <circle cx="25" cy="30" r="1.2" fill="#ffffff" opacity="0.04"/>
      <circle cx="35" cy="15" r="0.6" fill="${card.accent}" opacity="0.07"/>
    </pattern>
    <filter id="vintagePaper_${card.id}">
      <feTurbulence type="fractalNoise" baseFrequency="0.04" numOctaves="3" result="noise"/>
      <feColorMatrix type="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 0.12 0" in="noise" result="coloredNoise"/>
      <feComposite operator="in" in2="SourceGraphic"/>
    </filter>
  </defs>

  <!-- Base Canvas Background -->
  <rect width="900" height="600" fill="url(#bgGrad_${card.id})" />
  <rect width="900" height="600" fill="url(#grain_${card.id})" />

  <!-- Outer Classic Vintage Border -->
  <rect x="25" y="25" width="850" height="550" fill="none" stroke="${card.accent}" stroke-width="2.5" opacity="0.45" rx="8"/>
  <rect x="36" y="36" width="828" height="528" fill="none" stroke="${card.accent}" stroke-width="1" stroke-dasharray="6 3" opacity="0.35" rx="6"/>

  <!-- Ornate Corner Accents -->
  <g stroke="${card.accent}" stroke-width="2" fill="none" opacity="0.75">
    <path d="M45,65 L45,45 L65,45 M50,50 L60,50 M50,50 L50,60" />
    <path d="M855,65 L855,45 L835,45 M850,50 L840,50 M850,50 L850,60" />
    <path d="M45,535 L45,555 L65,555 M50,550 L60,550 M50,550 L50,540" />
    <path d="M855,535 L855,555 L835,555 M850,550 L840,550 M850,550 L850,540" />
  </g>

  <!-- Central Artwork Illustration & Silhouette -->
  <g transform="translate(0, -10)">
    ${getIconSvg(card.icon, card.accent)}
  </g>

  <!-- Vintage Postmark / Stamp Top Right -->
  <g transform="translate(730, 48)">
    <rect x="0" y="0" width="85" height="105" fill="#181310" stroke="${card.accent}" stroke-width="1.8" rx="3" opacity="0.85"/>
    <rect x="6" y="6" width="73" height="93" fill="none" stroke="${card.accent}" stroke-width="0.8" stroke-dasharray="2 2" opacity="0.5"/>
    <text x="42" y="32" text-anchor="middle" font-family="'Cinzel', 'Times New Roman', serif" font-size="9" fill="${card.accent}" letter-spacing="1">MAGIC CARD</text>
    <circle cx="42" cy="58" r="15" fill="none" stroke="${card.accent}" stroke-width="1.2" opacity="0.8"/>
    <path d="M38,58 L42,52 L46,58 L42,64 Z" fill="${card.accent}" opacity="0.7"/>
    <text x="42" y="88" text-anchor="middle" font-family="'Special Elite', monospace" font-size="11" font-weight="bold" fill="#f4eee0">1954</text>
    <!-- Postmark Cancel Lines -->
    <path d="M-30,45 Q0,40 30,45 M-35,60 Q0,55 35,60 M-30,75 Q0,70 30,75" stroke="${card.accent}" stroke-width="1.5" opacity="0.55" fill="none"/>
  </g>

  <!-- Vintage Postcard Header / Division -->
  <text x="75" y="85" font-family="'Cinzel', serif" font-size="16" letter-spacing="4" fill="${card.accent}" opacity="0.8">POST CARD</text>
  <text x="75" y="105" font-family="'Tiro Bangla', serif" font-size="13" fill="#e2d8c3" opacity="0.6">মেমোরি আর্কাইভ • কালেকশন নং ${card.id.toUpperCase()}</text>

  <!-- Bottom Vintage Seal & Tagline -->
  <line x1="75" y1="520" x2="825" y2="520" stroke="${card.accent}" stroke-width="1" opacity="0.25"/>
  <text x="450" y="545" text-anchor="middle" font-family="'Tiro Bangla', 'Noto Serif Bengali', serif" font-size="13" fill="${card.accent}" letter-spacing="1" opacity="0.85">“যেখানে প্রতিটি কার্ড একটি গল্প বলে।”</text>
</svg>`;

  fs.writeFileSync(path.join(postcardsDir, `${card.id}.svg`), svgContent, 'utf-8');
});

// Gallery Items
for (let i = 1; i <= 16; i++) {
  const gId = `g${String(i).padStart(3, '0')}`;
  const galleryQuotes = [
    { en: 'Some stories never end.', bn: 'কিছু গল্পের কখনো সমাপ্তি ঘটে না।' },
    { en: 'Forever begins with a memory.', bn: 'অনন্তকালের শুরু হয় একটি সুন্দর স্মৃতি দিয়ে।' },
    { en: 'You were there, that made it magical.', bn: 'তুমি ছিলে, তাই গল্পটা সুন্দর ছিল।' },
    { en: 'Some memories never age.', bn: 'কিছু স্মৃতি কখনো পুরনো হয় না।' },
    { en: 'The rain remembers our steps.', bn: 'বৃষ্টির প্রতিটি ফোঁটায় তোমার স্মৃতি।' },
    { en: 'Unspoken words in yellow envelopes.', bn: 'ডাকবাক্সের হলুদ খামে জমানো ভালোবাসা।' },
    { en: 'When midnight knocks on dreams.', bn: 'নিশুতি রাতের তারাদের মেলা।' },
    { en: 'Written in the vintage stars.', bn: 'মহাকালের আকাশে আমাদের প্রেম।' },
    { en: 'Time passes, love stays forever.', bn: 'সময় বয়ে যায়, মায়া রয়ে যায় চিরকাল।' },
    { en: 'Sealed with sacred devotion.', bn: 'ভালোবাসার লাল মোম দিয়ে সীলমোহর।' },
    { en: 'My soul yearns for only you.', bn: 'আমার পরান যাহা চায়, তুমি তাই।' },
    { en: 'Raindrops holding your smile.', bn: 'ভেজা ছাতা আর এক কাপ গরম চা।' },
    { en: 'Unfinished symphony of two hearts.', bn: 'জোছনায় ভেজা দুটি হৃদয়ের সুর।' },
    { en: 'Echoes of a forgotten melody.', bn: 'পুরনো দিনের গান আর একলা বারান্দা।' },
    { en: 'Your grace is my poetry.', bn: 'তুমি সুন্দর, তাই চেয়ে থাকি প্রিয়।' },
    { en: 'Pure as dawn jasmine.', bn: 'ভোরের শিউলি ফুলের মতো স্নিগ্ধ প্রেম।' }
  ];
  const item = galleryQuotes[i - 1];

  const gallerySvg = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" width="800" height="600">
  <defs>
    <linearGradient id="galGrad_${gId}" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#1c1612" />
      <stop offset="100%" stop-color="#0c0a08" />
    </linearGradient>
  </defs>
  <rect width="800" height="600" fill="url(#galGrad_${gId})"/>
  <rect x="30" y="30" width="740" height="540" fill="none" stroke="#d4af37" stroke-width="2" opacity="0.4" rx="10"/>
  <rect x="42" y="42" width="716" height="516" fill="none" stroke="#d4af37" stroke-width="0.8" stroke-dasharray="5 3" opacity="0.3" rx="8"/>
  <path d="M50,70 L50,50 L70,50" stroke="#d4af37" stroke-width="2.5" fill="none"/>
  <path d="M750,70 L750,50 L730,50" stroke="#d4af37" stroke-width="2.5" fill="none"/>
  <path d="M50,530 L50,550 L70,550" stroke="#d4af37" stroke-width="2.5" fill="none"/>
  <path d="M750,530 L750,550 L730,550" stroke="#d4af37" stroke-width="2.5" fill="none"/>

  <g transform="translate(400, 160)">
    <circle cx="0" cy="0" r="36" fill="#7a1f26" fill-opacity="0.3" stroke="#d4af37" stroke-width="1.5"/>
    <text x="0" y="8" text-anchor="middle" font-size="24">💌</text>
  </g>

  <text x="400" y="260" text-anchor="middle" font-family="'Cormorant Garamond', 'Cinzel', Georgia, serif" font-size="28" font-style="italic" fill="#e9d8a6" letter-spacing="1">“${item.en}”</text>
  <line x1="260" y1="300" x2="540" y2="300" stroke="#d4af37" stroke-width="1" opacity="0.4"/>
  <text x="400" y="360" text-anchor="middle" font-family="'Noto Serif Bengali', 'Tiro Bangla', serif" font-size="26" font-weight="600" fill="#f4eee0">“${item.bn}”</text>

  <text x="400" y="490" text-anchor="middle" font-family="'Cinzel', serif" font-size="12" fill="#d4af37" letter-spacing="3" opacity="0.7">MAGIC CARD • VINTAGE QUOTE ARCHIVE</text>
  <text x="400" y="515" text-anchor="middle" font-family="'Tiro Bangla', serif" font-size="11" fill="#a89882" opacity="0.6">যেখানে প্রতিটি কার্ড একটি গল্প বলে</text>
</svg>`;

  fs.writeFileSync(path.join(galleryDir, `${gId}.svg`), gallerySvg, 'utf-8');
}

console.log('Successfully generated all 24 postcard SVGs and 16 gallery SVGs!');
