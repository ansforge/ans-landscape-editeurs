import React, { useMemo, useState } from 'react';
import Layout from '@theme/Layout';
import { useData } from '@site/src/lib/useData';
import { THEMES, STATUSES, versionStatusKey } from '@site/src/lib/labels';
import { Breadcrumb, ServiceCard, mainVersion } from '@site/src/components/ui';

function Check({ id, label, checked, onChange }) {
  return (
    <div className="fr-fieldset__element">
      <div className="fr-checkbox-group fr-checkbox-group--sm">
        <input type="checkbox" id={id} checked={checked} onChange={onChange} />
        <label className="fr-label" htmlFor={id}>{label}</label>
      </div>
    </div>
  );
}

export default function Catalogue() {
  const data = useData();
  const [themes, setThemes] = useState([]);
  const [sandbox, setSandbox] = useState(false);
  const [spec, setSpec] = useState(false);
  const [status, setStatus] = useState('all');

  const toggleTheme = (t) => setThemes(themes.includes(t) ? themes.filter((x) => x !== t) : [...themes, t]);

  const list = useMemo(
    () =>
      data.services.filter((s) => {
        if (themes.length && !themes.includes(s.theme)) return false;
        if (sandbox && !(s.links.sandbox || s.sandbox)) return false;
        if (spec && !s.links.specification) return false;
        if (status !== 'all') {
          const key = versionStatusKey(mainVersion(data.versionsByService.get(s.id)));
          if (key !== status) return false;
        }
        return true;
      }),
    [data, themes, sandbox, spec, status]
  );

  return (
    <Layout title="Catalogue des services" description="Le catalogue des services du numérique en santé pour les développeurs.">
      <div className="fr-container fr-my-6w">
        <Breadcrumb items={[{ label: 'Services' }]} />
        <h1>Catalogue des services pour développeurs</h1>
        <div className="fr-grid-row fr-grid-row--gutters">
          <div className="fr-col-12 fr-col-md-3">
            <form onSubmit={(e) => e.preventDefault()} aria-label="Filtres du catalogue">
              <fieldset className="fr-fieldset">
                <legend className="fr-fieldset__legend">Thème</legend>
                {Object.entries(THEMES).map(([id, t]) => (
                  <Check key={id} id={`theme-${id}`} label={t.label} checked={themes.includes(id)} onChange={() => toggleTheme(id)} />
                ))}
              </fieldset>
              <fieldset className="fr-fieldset">
                <legend className="fr-fieldset__legend">Disponible</legend>
                <Check id="f-sandbox" label="Avec un bac à sable" checked={sandbox} onChange={() => setSandbox(!sandbox)} />
                <Check id="f-spec" label="Avec une spécification ou une API" checked={spec} onChange={() => setSpec(!spec)} />
              </fieldset>
              <div className="fr-select-group">
                <label className="fr-label" htmlFor="f-status">Statut de version</label>
                <select className="fr-select" id="f-status" value={status} onChange={(e) => setStatus(e.target.value)}>
                  <option value="all">Tous</option>
                  {Object.entries(STATUSES).map(([id, s]) => <option key={id} value={id}>{s.label}</option>)}
                </select>
              </div>
            </form>
          </div>
          <div className="fr-col-12 fr-col-md-9">
            <p role="status" aria-live="polite"><strong>{list.length} {list.length > 1 ? 'services' : 'service'}</strong></p>
            {list.length === 0 && <p>Aucun service ne correspond à ces filtres.</p>}
            <div className="fr-grid-row fr-grid-row--gutters card-grid-equal">
              {list.map((s) => (
                <div className="fr-col-12 fr-col-lg-6" key={s.id}>
                  <ServiceCard service={s} versions={data.versionsByService.get(s.id)} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
