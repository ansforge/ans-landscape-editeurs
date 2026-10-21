// Exporte les données en JSON dans static/data/ (servi tel quel par Docusaurus). Usage : npm run export
// Les fichiers générés ne sont pas versionnés : ils sont recréés à chaque build.
const fs = require('fs');
const path = require('path');
const { loadData, ROOT } = require('./load-data');

const OUT = path.join(ROOT, 'static', 'data');

function main() {
  const data = loadData();
  fs.mkdirSync(OUT, { recursive: true });
  for (const [name, content] of Object.entries(data)) {
    fs.writeFileSync(path.join(OUT, `${name}.json`), JSON.stringify(content, null, 2) + '\n');
  }
  console.log(`${Object.keys(data).length} fichiers exportés dans static/data/`);
}

main();
