// Valide les données : schémas JSON puis règles de cohérence entre fichiers.
// Usage : npm run validate
const fs = require('fs');
const path = require('path');
const Ajv = require('ajv');
const addFormats = require('ajv-formats');
const { loadData, ROOT, FILES } = require('./load-data');

const errors = [];
const fail = (msg) => errors.push(msg);

function validateSchemas(data) {
  const ajv = new Ajv({ allErrors: true, strict: false });
  addFormats(ajv);
  for (const name of FILES) {
    const schema = JSON.parse(fs.readFileSync(path.join(ROOT, 'schemas', `${name}.schema.json`), 'utf8'));
    const validate = ajv.compile(schema);
    if (!validate(data[name])) {
      for (const e of validate.errors) {
        fail(`data/${name}.yml ${e.instancePath || '/'} : ${e.message}`);
      }
    }
  }
}

function duplicates(list) {
  return list.filter((v, i) => list.indexOf(v) !== i);
}

function validateConsistency(data) {
  const { services, versions, roadmaps, standards, journeys } = data;
  const serviceIds = new Set(services.map((s) => s.id));
  const standardIds = new Set(standards.map((s) => s.id));

  for (const id of duplicates(services.map((s) => s.id))) fail(`services.yml : id en double « ${id} »`);
  for (const id of duplicates(standards.map((s) => s.id))) fail(`standards.yml : id en double « ${id} »`);

  for (const s of services) {
    for (const r of s.related || []) {
      if (!serviceIds.has(r)) fail(`services.yml ${s.id} : related inconnu « ${r} »`);
      if (r === s.id) fail(`services.yml ${s.id} : related référence le service lui-même`);
    }
  }

  for (const v of versions) {
    if (!serviceIds.has(v.service)) fail(`versions.yml : service inconnu « ${v.service} »`);
  }
  const recommended = versions.filter((v) => v.status === 'recommended').map((v) => v.service);
  for (const id of duplicates(recommended)) fail(`versions.yml ${id} : plus d'une version recommandée`);
  for (const v of versions) {
    if ((v.status === 'deprecated' || v.status === 'eol') && !v.end_of_support && v.verified) {
      fail(`versions.yml ${v.service} ${v.version} : une version dépréciée ou en fin de vie doit avoir une end_of_support`);
    }
  }

  for (const r of roadmaps) {
    if (!serviceIds.has(r.service)) fail(`roadmaps.yml : service inconnu « ${r.service} »`);
  }

  for (const st of standards) {
    for (const id of st.services) {
      if (!serviceIds.has(id)) fail(`standards.yml ${st.id} : service inconnu « ${id} »`);
    }
  }

  const stepIds = journeys.steps.map((s) => s.id);
  for (const id of duplicates(stepIds)) fail(`journeys.yml : étape en double « ${id} »`);
  for (const step of journeys.steps) {
    for (const id of step.standards || []) {
      if (!standardIds.has(id)) fail(`journeys.yml étape ${step.id} : référentiel inconnu « ${id} »`);
    }
  }

  const questionIds = new Set();
  const optionsByQuestion = {};
  for (const q of journeys.questions) {
    questionIds.add(q.id);
    optionsByQuestion[q.id] = new Set(q.options.map((o) => o.id));
    for (const id of duplicates(q.options.map((o) => o.id))) fail(`journeys.yml ${q.id} : option en double « ${id} »`);
  }
  for (const id of duplicates(journeys.questions.map((q) => q.id))) fail(`journeys.yml : question en double « ${id} »`);

  journeys.rules.forEach((rule, i) => {
    for (const [q, values] of Object.entries(rule.when)) {
      if (!questionIds.has(q)) fail(`journeys.yml règle ${i + 1} : question inconnue « ${q} »`);
      else for (const v of values) if (!optionsByQuestion[q].has(v)) fail(`journeys.yml règle ${i + 1} : option inconnue « ${q}=${v} »`);
    }
    for (const s of rule.services || []) {
      if (!serviceIds.has(s.id)) fail(`journeys.yml règle ${i + 1} : service inconnu « ${s.id} »`);
    }
    for (const id of rule.standards || []) {
      if (!standardIds.has(id)) fail(`journeys.yml règle ${i + 1} : référentiel inconnu « ${id} »`);
    }
  });

  for (const pilot of journeys.pilots) {
    for (const q of journeys.questions) {
      const a = pilot.answers[q.id];
      if (!a) fail(`journeys.yml parcours ${pilot.id} : pas de réponse pour ${q.id}`);
      else if (!optionsByQuestion[q.id].has(a)) fail(`journeys.yml parcours ${pilot.id} : option inconnue « ${q.id}=${a} »`);
    }
  }
}

function main() {
  let data;
  try {
    data = loadData();
  } catch (e) {
    console.error(`Lecture des données impossible : ${e.message}`);
    process.exit(1);
  }
  validateSchemas(data);
  if (errors.length === 0) validateConsistency(data);

  if (errors.length) {
    console.error(`\n${errors.length} erreur(s) dans les données :\n`);
    for (const e of errors) console.error(`  - ${e}`);
    console.error('');
    process.exit(1);
  }
  console.log(
    `Données valides : ${data.services.length} services, ${data.versions.length} versions, ` +
      `${data.standards.length} référentiels, ${data.journeys.steps.length} étapes, ` +
      `${data.journeys.questions.length} questions, ${data.journeys.pilots.length} parcours pilotes.`
  );
}

main();
