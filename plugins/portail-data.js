// Plugin Docusaurus : charge data/*.yml, les expose à toutes les pages (global data)
// et crée une page par service, par étape de parcours et par parcours pilote.
const path = require('path');
const { loadData } = require('../scripts/load-data');

module.exports = function portailData(context) {
  const { siteDir, baseUrl } = context;
  const route = (...parts) => [baseUrl, ...parts].join('/').replace(/\/+/g, '/');

  return {
    name: 'portail-data',

    async loadContent() {
      return loadData(siteDir);
    },

    async contentLoaded({ content, actions }) {
      const { setGlobalData, addRoute, createData } = actions;
      setGlobalData(content);

      for (const service of content.services) {
        const modulePath = await createData(`service-${service.id}.json`, JSON.stringify(service));
        addRoute({
          path: route('services', service.id, '/'),
          component: '@site/src/components/ServicePage',
          exact: true,
          modules: { service: modulePath },
        });
      }

      for (const step of content.journeys.steps) {
        const modulePath = await createData(`step-${step.id}.json`, JSON.stringify(step));
        addRoute({
          path: route('parcours', 'etapes', step.id, '/'),
          component: '@site/src/components/StepPage',
          exact: true,
          modules: { step: modulePath },
        });
      }

      for (const pilot of content.journeys.pilots) {
        const modulePath = await createData(`pilot-${pilot.id}.json`, JSON.stringify(pilot));
        addRoute({
          path: route('parcours', 'pilotes', pilot.id, '/'),
          component: '@site/src/components/PilotPage',
          exact: true,
          modules: { pilot: modulePath },
        });
      }
    },

    getPathsToWatch() {
      return [path.join(siteDir, 'data', '*.yml')];
    },
  };
};
