// Charge les fichiers YAML de data/ (partagé par la validation, le plugin Docusaurus et les tests).
const fs = require('fs');
const path = require('path');
const YAML = require('yaml');

const ROOT = path.resolve(__dirname, '..');
const FILES = ['services', 'versions', 'roadmaps', 'standards', 'journeys'];

function loadData(root = ROOT) {
  const data = {};
  for (const name of FILES) {
    const file = path.join(root, 'data', `${name}.yml`);
    data[name] = YAML.parse(fs.readFileSync(file, 'utf8'));
  }
  return data;
}

module.exports = { loadData, ROOT, FILES };
