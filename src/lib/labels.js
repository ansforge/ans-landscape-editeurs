// Libellés et constantes d'affichage partagés par les pages.

export const SITE_NAME = 'Portail développeurs du numérique en santé';
export const REPO_URL = 'https://github.com/ansforge/ans-landscape-editeurs';
export const ISSUES_URL = `${REPO_URL}/issues/new/choose`;
export const OFFICIAL_LINKS = [
  { label: 'esante.gouv.fr', href: 'https://esante.gouv.fr/' },
  { label: 'G_NIUS', href: 'https://gnius.esante.gouv.fr/' },
  { label: 'Espace industriels', href: 'https://industriels.esante.gouv.fr/' },
];

export const THEMES = {
  identite: { label: 'Identité', badge: 'fr-badge--blue-ecume' },
  interop: { label: 'Interopérabilité', badge: 'fr-badge--green-menthe' },
  securite: { label: 'Sécurité et confiance', badge: 'fr-badge--orange-terre-battue' },
  donnees: { label: 'Services et données', badge: 'fr-badge--purple-glycine' },
  tests: { label: 'Tests', badge: 'fr-badge--yellow-tournesol' },
};

// Statuts normalisés : icône + libellé, jamais la couleur seule.
export const STATUSES = {
  recommended: { label: 'Recommandée', icon: '●', cls: 'statut--rec', hint: 'À utiliser pour tout nouveau développement', rank: 5 },
  supported: { label: 'Supportée', icon: '○', cls: 'statut--sup', hint: 'Version maintenue', rank: 4 },
  deprecated: { label: 'Dépréciée', icon: '▲', cls: 'statut--dep', hint: 'Migration à prévoir', rank: 1 },
  eol: { label: 'Fin de vie', icon: '✕', cls: 'statut--eol', hint: 'Plus de support', rank: 0 },
  experimental: { label: 'Expérimentale', icon: '◆', cls: 'statut--exp', hint: 'Non stabilisée', rank: 3 },
  unverified: { label: 'À vérifier', icon: '?', cls: 'statut--unv', hint: 'Information en cours de validation par le référent', rank: 2 },
};

export const AUDIENCES = { editeur: 'Éditeurs', integrateur: 'Intégrateurs', developpeur: 'Développeurs' };

export const STANDARD_KINDS = { doctrine: 'Doctrine', referentiel: 'Référentiel', demarche: 'Démarche', guichet: 'Guichet' };

export const LINK_LABELS = {
  documentation: 'Documentation officielle',
  specification: 'Spécification',
  sandbox: 'Bac à sable',
  test_data: 'Identités et données de test',
  source_code: 'Code source',
  support: 'Support',
  status_page: 'Statut du service',
  roadmap: 'Roadmap',
};

export const EXAMPLE_LABELS = { java: 'Java', javascript: 'JavaScript', python: 'Python', curl: 'curl' };

/** Statut à afficher pour une ligne de versions.yml (ou null s'il n'y a pas de ligne). */
export function versionStatusKey(row) {
  if (!row) return null;
  return row.verified ? row.status : 'unverified';
}

export function formatDate(iso) {
  if (!iso) return '';
  const [y, m, d] = iso.split('-');
  return `${d}/${m}/${y}`;
}

/** Normalise pour la recherche : minuscules, sans accents. */
export function normalize(text) {
  return String(text || '')
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '');
}
