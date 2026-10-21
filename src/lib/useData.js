import { useMemo, useState, useEffect } from 'react';
import { usePluginData } from '@docusaurus/useGlobalData';
import { useLocation } from '@docusaurus/router';

/** Données de data/*.yml avec quelques index pratiques. */
export function useData() {
  const data = usePluginData('portail-data');
  return useMemo(() => {
    const servicesById = new Map(data.services.map((s) => [s.id, s]));
    const standardsById = new Map(data.standards.map((s) => [s.id, s]));
    const versionsByService = new Map();
    for (const v of data.versions) {
      if (!versionsByService.has(v.service)) versionsByService.set(v.service, []);
      versionsByService.get(v.service).push(v);
    }
    const roadmapsByService = new Map();
    for (const r of data.roadmaps) {
      if (!roadmapsByService.has(r.service)) roadmapsByService.set(r.service, []);
      roadmapsByService.get(r.service).push(r);
    }
    return { ...data, servicesById, standardsById, versionsByService, roadmapsByService };
  }, [data]);
}

/**
 * Lit un paramètre d'URL côté navigateur seulement (le rendu statique ne connaît pas l'URL).
 * Retourne undefined avant l'hydratation, puis la valeur ou null.
 */
export function useQueryParam(name) {
  const location = useLocation();
  const [value, setValue] = useState(undefined);
  useEffect(() => {
    setValue(new URLSearchParams(location.search).get(name));
  }, [location.search, name]);
  return value;
}
