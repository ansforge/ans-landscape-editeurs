// @ts-check
// Site statique hébergé sur GitHub Pages (dépôt ansforge/ans-landscape-editeurs).
// Docusaurus fournit le rendu statique et le routage ; l'interface est écrite avec le DSFR
// (voir src/theme/Layout) et les contenus viennent de data/*.yml (voir plugins/portail-data.js).

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'Portail développeurs du numérique en santé',
  tagline: 'Construire, tester et intégrer des services numériques en santé',
  favicon: 'img/favicon.svg',

  url: process.env.SITE_URL || 'https://ansforge.github.io',
  baseUrl: process.env.BASE_URL || '/ans-landscape-editeurs/',
  organizationName: 'ansforge',
  projectName: 'ans-landscape-editeurs',
  trailingSlash: true,

  onBrokenLinks: 'throw',

  i18n: { defaultLocale: 'fr', locales: ['fr'] },

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: false,
        blog: false,
        theme: { customCss: './src/css/custom.css' },
      }),
    ],
  ],

  plugins: ['./plugins/portail-data.js'],

  themeConfig: {
    colorMode: { defaultMode: 'light', disableSwitch: true, respectPrefersColorScheme: false },
  },
};

module.exports = config;
