const https = require('https');

const host = 'bytesizedtech.pages.dev';
const apiKey = '4060977e51ce4c1fa379061ad0ee9e12';

const routes = [
  '/', '/aafrd', '/pndud', '/mpffp', '/t5nar', '/66i5p', '/pwfp0', '/a4a0m', 
  '/6kj6q', '/nhf2y', '/1m1dp', '/qzfa4', '/mcnwg', '/jhe8f', '/djh67', 
  '/attvk', '/34959', '/8ckve', '/nj9di', '/if0mq', '/53t1g', '/gbym1', 
  '/7uy73', '/n9bt7', '/1jtk6', '/kjeyu', '/tqh1c', '/1586g', '/2zzpm', 
  '/cdiiu', '/niqd1', '/z01d4', '/vqqhy', '/6wre2', '/au0an', '/vha4a', 
  '/6g01t', '/b59qd', '/4fcu2', '/m6bw2', '/ceqrn', '/3wurt', '/vm575', 
  '/h3fcr', '/eatiu', '/pi1bd', '/mcqwz', '/ha24n', '/cncrh', '/aykva', 
  '/wgy8r', '/w3da9'
];

const payload = JSON.stringify({
  host: host,
  key: apiKey,
  keyLocation: `https://${host}/${apiKey}.txt`,
  urlList: routes.map(r => `https://${host}${r}`)
});

const options = {
  hostname: 'api.indexnow.org',
  path: '/indexnow',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json; charset=utf-8',
    'Content-Length': Buffer.byteLength(payload)
  }
};

const req = https.request(options, (res) => {
  console.log(`[+] IndexNow Response Status: ${res.statusCode}`);
  res.on('data', d => process.stdout.write(d));
});

req.on('error', (e) => {
  console.error(`[-] IndexNow Error: ${e.message}`);
});

req.write(payload);
req.end();
