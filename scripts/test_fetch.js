const http = require('http');

http.get('http://localhost:3005/admin', (res) => {
  let data = '';
  res.on('data', (chunk) => { data += chunk; });
  res.on('end', () => {
    console.log('Status Code:', res.statusCode);
    console.log('HTML Length:', data.length);
    const cssLinks = data.match(/<link[^>]+rel=["']stylesheet["'][^>]*>/gi);
    console.log('CSS Links found:', cssLinks);
  });
}).on('error', (e) => {
  console.error('Fetch error:', e.message);
});
