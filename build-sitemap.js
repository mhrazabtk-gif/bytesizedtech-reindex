const fs = require('fs');
const path = require('path');

const domain = 'https://bytesizedtech.pages.dev';

// All 51 URLs from bytesizedtech.pages.dev
const routes = [
  '', '/aafrd', '/pndud', '/mpffp', '/t5nar', '/66i5p', '/pwfp0', '/a4a0m', 
  '/6kj6q', '/nhf2y', '/1m1dp', '/qzfa4', '/mcnwg', '/jhe8f', '/djh67', 
  '/attvk', '/34959', '/8ckve', '/nj9di', '/if0mq', '/53t1g', '/gbym1', 
  '/7uy73', '/n9bt7', '/1jtk6', '/kjeyu', '/tqh1c', '/1586g', '/2zzpm', 
  '/cdiiu', '/niqd1', '/z01d4', '/vqqhy', '/6wre2', '/au0an', '/vha4a', 
  '/6g01t', '/b59qd', '/4fcu2', '/m6bw2', '/ceqrn', '/3wurt', '/vm575', 
  '/h3fcr', '/eatiu', '/pi1bd', '/mcqwz', '/ha24n', '/cncrh', '/aykva', 
  '/wgy8r', '/w3da9'
];

const now = new Date().toISOString();

let xml = `<?xml version="1.0" encoding="UTF-8"?>\n`;
xml += `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`;

routes.forEach(route => {
  xml += `  <url>\n`;
  xml += `    <loc>${domain}${route}</loc>\n`;
  xml += `    <lastmod>${now}</lastmod>\n`;
  xml += `    <changefreq>hourly</changefreq>\n`;
  xml += `    <priority>0.9</priority>\n`;
  xml += `  </url>\n`;
});

xml += `</urlset>`;

// Ensure public directory exists
const targetDir = path.join(__dirname, 'public');
if (!fs.existsSync(targetDir)) {
  fs.mkdirSync(targetDir, { recursive: true });
}

fs.writeFileSync(path.join(targetDir, 'sitemap.xml'), xml);
console.log(`[+] sitemap.xml generated with 51 URLs at ${now}`);
