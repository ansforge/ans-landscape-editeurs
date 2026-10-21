// Moteur du questionnaire « Je démarre » : règles de journeys.yml -> résultat.
// Fonctions pures, sans dépendance, utilisables dans le navigateur et dans les tests.

/**
 * Décode « a,b,c,… » (ids d'options dans l'ordre des questions).
 * Retourne null si la chaîne est absente ou invalide.
 */
function parseAnswers(questions, raw) {
  if (!raw) return null;
  const parts = String(raw).split(',');
  if (parts.length !== questions.length) return null;
  const answers = {};
  for (let i = 0; i < questions.length; i++) {
    const q = questions[i];
    if (!q.options.some((o) => o.id === parts[i])) return null;
    answers[q.id] = parts[i];
  }
  return answers;
}

function encodeAnswers(questions, answers) {
  return questions.map((q) => answers[q.id]).join(',');
}

function ruleApplies(rule, answers) {
  return Object.entries(rule.when).every(([q, values]) => values.includes(answers[q]));
}

/**
 * Calcule le résultat pour un jeu de réponses.
 * - services : { id, level } triés dans l'ordre du catalogue ; `certain` l'emporte sur `maybe`
 * - standards : ids de référentiels déclenchés par les règles
 * - flags : drapeaux déclenchés (ex. referencement)
 * - steps : les étapes du parcours avec les éléments à afficher
 */
function computeResult({ journeys, services, standards }, answers) {
  const level = new Map();
  const standardIds = new Set();
  const flags = new Set();

  for (const rule of journeys.rules) {
    if (!ruleApplies(rule, answers)) continue;
    for (const s of rule.services || []) {
      if (level.get(s.id) !== 'certain') level.set(s.id, s.level);
    }
    for (const id of rule.standards || []) standardIds.add(id);
    for (const f of rule.flags || []) flags.add(f);
  }

  const matched = services.filter((s) => level.has(s.id)).map((s) => ({ id: s.id, level: level.get(s.id) }));
  const byId = new Map(services.map((s) => [s.id, s]));
  const standardById = new Map(standards.map((s) => [s.id, s]));
  const gated = new Set(journeys.rules.flatMap((r) => r.standards || []));

  const steps = journeys.steps.map((step, index) => {
    const items = [];
    if (step.themes) {
      for (const m of matched) if (step.themes.includes(byId.get(m.id).theme)) items.push({ type: 'service', id: m.id, level: m.level });
    }
    if (step.needs === 'sandbox') {
      for (const m of matched) {
        const s = byId.get(m.id);
        if ((s.links && s.links.sandbox) || s.sandbox) items.push({ type: 'service', id: m.id, level: m.level });
      }
    }
    const stepStandards = (step.standards || []).filter((id) => standardById.has(id) && (!gated.has(id) || standardIds.has(id)));
    for (const id of stepStandards) items.push({ type: 'standard', id });

    const seen = new Set();
    const unique = items.filter((it) => {
      const key = `${it.type}:${it.id}`;
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    });

    const applicable = !step.flag || flags.has(step.flag) || stepStandards.some((id) => standardIds.has(id));
    return { number: index + 1, id: step.id, title: step.title, objective: step.objective, applicable, items: unique };
  });

  return { services: matched, standards: [...standardIds], flags: [...flags], steps };
}

export { parseAnswers, encodeAnswers, computeResult, ruleApplies };
