const http = require('http');

http.get('http://localhost:3005', (res) => {
  let html = '';
  res.on('data', c => html += c);
  res.on('end', () => {
    console.log('Home Status:', res.statusCode);
    const cssLinks = html.match(/href=["']([^"']+\.css[^"']*)["']/g);
    console.log('CSS links in HTML:', cssLinks);

    if (cssLinks) {
      cssLinks.forEach(linkStr => {
        const href = linkStr.replace(/^href=["']/, '').replace(/["']$/, '');
        console.log('Fetching CSS URL:', href);
        http.get('http://localhost:3005' + href, (cssRes) => {
          let cssData = '';
          cssRes.on('data', c => cssData += c);
          cssRes.on('end', () => {
            console.log('CSS Status:', cssRes.statusCode, 'CSS Length:', cssData.length);
            console.log('CSS Sample Content:\n', cssData.substring(0, 300));
          });
        });
      });
    } else {
      console.log('NO CSS LINKS FOUND IN HTML!');
      console.log('HTML Head preview:', html.substring(0, 800));
    }
  });
}).on('error', e => console.error(e));
