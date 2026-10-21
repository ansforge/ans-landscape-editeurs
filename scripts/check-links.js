// Vérifie que les liens sortants des données répondent. Usage : npm run check-links
// Sortie non nulle si un lien échoue (utilisé par le workflow planifié).
const { loadData } = require('./load-data');

const TIMEOUT_MS = 15000;
const CONCURRENCY = 5;

function collectUrls(data) {
  const urls = new Map(); // url -> origines
  const add = (url, origin) => {
    if (!url) return;
    if (!urls.has(url)) urls.set(url, []);
    urls.get(url).push(origin);
  };
  for (const s of data.services) for (const [k, url] of Object.entries(s.links)) add(url, `services.yml ${s.id}.${k}`);
  for (const s of data.standards) add(s.link, `standards.yml ${s.id}`);
  for (const v of data.versions) add(v.release_notes, `versions.yml ${v.service} ${v.version}`);
  for (const r of data.roadmaps) add(r.link, `roadmaps.yml ${r.service}`);
  return urls;
}

async function check(url) {
  const opts = { redirect: 'follow', signal: AbortSignal.timeout(TIMEOUT_MS), headers: { 'user-agent': 'portail-developpeurs-sante-link-check' } };
  try {
    let res = await fetch(url, { ...opts, method: 'HEAD' });
    if (res.status === 405 || res.status === 403 || res.status === 404) {
      res = await fetch(url, { ...opts, method: 'GET', signal: AbortSignal.timeout(TIMEOUT_MS) });
    }
    return res.ok ? null : `HTTP ${res.status}`;
  } catch (e) {
    return e.name === 'TimeoutError' ? 'délai dépassé' : e.cause?.code || e.message;
  }
}

async function main() {
  const urls = [...collectUrls(loadData())];
  const failures = [];
  let next = 0;
  async function worker() {
    while (next < urls.length) {
      const [url, origins] = urls[next++];
      const problem = await check(url);
      if (problem) failures.push({ url, origins, problem });
    }
  }
  await Promise.all(Array.from({ length: CONCURRENCY }, worker));

  console.log(`${urls.length} liens vérifiés, ${failures.length} en échec.`);
  for (const f of failures) {
    console.error(`  - ${f.url} : ${f.problem}\n      utilisé par : ${f.origins.join(', ')}`);
  }
  process.exit(failures.length ? 1 : 0);
}

main();
