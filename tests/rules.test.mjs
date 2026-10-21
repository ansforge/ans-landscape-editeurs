import test from 'node:test';
import assert from 'node:assert/strict';
import { createRequire } from 'node:module';
import { parseAnswers, encodeAnswers, computeResult } from '../src/lib/rules.mjs';

const { loadData } = createRequire(import.meta.url)('../scripts/load-data.js');

const data = loadData();
const ctx = { journeys: data.journeys, services: data.services, standards: data.standards };
const ids = (result, level) => result.services.filter((s) => s.level === level).map((s) => s.id);

test('parseAnswers : aller-retour avec encodeAnswers', () => {
  const answers = data.journeys.pilots[0].answers;
  const raw = encodeAnswers(data.journeys.questions, answers);
  assert.deepEqual(parseAnswers(data.journeys.questions, raw), answers);
});

test('parseAnswers : rejette les valeurs invalides', () => {
  const qs = data.journeys.questions;
  assert.equal(parseAnswers(qs, null), null);
  assert.equal(parseAnswers(qs, ''), null);
  assert.equal(parseAnswers(qs, 'oui,oui'), null);
  assert.equal(parseAnswers(qs, 'x,x,x,x,x,x'), null);
});

test('parcours pilote « authentifier » : Pro Santé Connect et son bac à sable', () => {
  const r = computeResult(ctx, data.journeys.pilots[0].answers);
  assert.ok(ids(r, 'certain').includes('prosante-connect'));
  assert.ok(ids(r, 'certain').includes('si-coeur'));
  assert.ok(ids(r, 'certain').includes('hds'));
  assert.ok(!r.flags.includes('referencement'));
});

test('parcours pilote « échanger » : CI-SIS et FHIR, pas d\'authentification', () => {
  const r = computeResult(ctx, data.journeys.pilots[1].answers);
  assert.ok(ids(r, 'certain').includes('ci-sis'));
  assert.ok(ids(r, 'certain').includes('fhir-terminologies'));
  assert.ok(!r.services.some((s) => s.id === 'prosante-connect'));
});

test('parcours pilote « référencement » : drapeau et étape applicable', () => {
  const r = computeResult(ctx, data.journeys.pilots[2].answers);
  assert.ok(r.flags.includes('referencement'));
  assert.ok(r.standards.includes('homologation'));
  assert.ok(r.steps.find((s) => s.id === 'referencement').applicable);
});

test('« je ne sais pas » donne des services à confirmer, jamais certains', () => {
  const answers = Object.fromEntries(data.journeys.questions.map((q) => [q.id, 'nsp']));
  const r = computeResult(ctx, answers);
  assert.ok(r.services.length > 0);
  assert.equal(ids(r, 'certain').length, 0);
});

test('toutes les combinaisons de réponses donnent un résultat cohérent', () => {
  const qs = data.journeys.questions;
  const known = new Set(data.services.map((s) => s.id));
  const walk = (i, answers) => {
    if (i === qs.length) {
      const r = computeResult(ctx, answers);
      assert.equal(r.steps.length, data.journeys.steps.length);
      for (const s of r.services) assert.ok(known.has(s.id));
      return;
    }
    for (const o of qs[i].options) walk(i + 1, { ...answers, [qs[i].id]: o.id });
  };
  walk(0, {});
});

test('chaque étape à thèmes est renseignée quand les services correspondants sont retenus', () => {
  const r = computeResult(ctx, data.journeys.pilots[0].answers);
  const socles = r.steps.find((s) => s.id === 'socles');
  assert.ok(socles.items.some((it) => it.id === 'prosante-connect'));
});
