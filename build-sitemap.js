
const fs = require('fs');
const path = require('path');

const DOMAIN = 'https://bytesizedtech.pages.dev';
const PUBLIC_DIR = path.join(__dirname, 'public');
const SITEMAP_PATH = path.join(PUBLIC_DIR, 'sitemap.xml');

// Keep the existing route list.
const ROUTES = [
  '', '/aafrd', '/pndud', '/mpffp', '/t5nar', '/66i5p',
  '/pwfp0', '/a4a0m', '/6kj6q', '/nhf2y', '/1m1dp',
  '/qzfa4', '/mcnwg', '/jhe8f', '/djh67', '/attvk',
  '/34959', '/8ckve', '/nj9di', '/if0mq', '/53t1g',
  '/gbym1', '/7uy73', '/n9bt7', '/1jtk6', '/kjeyu',
  '/tqh1c', '/1586g', '/2zzpm', '/cdiiu', '/niqd1',
  '/z01d4', '/vqqhy', '/6wre2', '/au0an', '/vha4a',
  '/6g01t', '/b59qd', '/4fcu2', '/m6bw2', '/ceqrn',
  '/3wurt', '/vm575', '/h3fcr', '/eatiu', '/pi1bd',
  '/mcqwz', '/ha24n', '/cncrh', '/aykva', '/wgy8r',
  '/w3da9'
];

function main() {
  fs.mkdirSync(PUBLIC_DIR, { recursive: true });

  // Never generate a sitemap without the committed redirect rules.
  const redirectsPath = path.join(PUBLIC_DIR, '_redirects');

  if (!fs.existsSync(redirectsPath)) {
    throw new Error(
      'STOP: public/_redirects is missing. ' +
      'Restore the original redirect file before deploying.'
    );
  }

  const redirectText = fs.readFileSync(redirectsPath, 'utf8');

  const redirectRules = redirectText
    .split(/\r?\n/)
    .map(line => line.trim())
    .filter(line => line && !line.startsWith('#'));

  if (redirectRules.length === 0) {
    throw new Error(
      'STOP: public/_redirects contains no active redirect rules.'
    );
  }

  if (redirectRules.length > 2100) {
    throw new Error(
      `STOP: Found ${redirectRules.length} redirect rules; ` +
      'Cloudflare Pages supports a maximum of 2100.'
    );
  }

  // Deduplicate URLs without changing their original order.
  const urls = [...new Set(
    ROUTES.map(route => {
      if (!route.startsWith('/')) {
        return DOMAIN + '/' + route;
      }
      return DOMAIN + route;
    })
  )];

  const escapeXml = value => value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');

  let xml =
    '<?xml version="1.0" encoding="UTF-8"?>\n' +
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';

  for (const url of urls) {
    xml += '  <url>\n';
    xml += `    <loc>${escapeXml(url)}</loc>\n`;
    xml += '  </url>\n';
  }

  xml += '</urlset>\n';

  // Write ONLY sitemap.xml. Never overwrite _redirects.
  const tempPath = SITEMAP_PATH + '.tmp';

  fs.writeFileSync(tempPath, xml, 'utf8');
  fs.renameSync(tempPath, SITEMAP_PATH);

  // Verify that the redirect file still exists after generation.
  if (!fs.existsSync(redirectsPath)) {
    throw new Error('STOP: Redirect file disappeared during generation.');
  }

  console.log(`Sitemap generated: ${SITEMAP_PATH}`);
  console.log(`URLs included: ${urls.length}`);
  console.log(`Redirect rules preserved: ${redirectRules.length}`);
}

main();
