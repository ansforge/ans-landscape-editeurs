#!/bin/bash
# Assemble les maquettes statiques à partir d'un en-tête/pied communs.
# Usage : bash _build.sh   (régénère les pages .html du dossier)
cd "$(dirname "$0")"

head_html() { # $1=titre  $2=page active
cat <<H
<!DOCTYPE html>
<html lang="fr" data-fr-scheme="light">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>$1 – Portail développeurs du numérique en santé (maquette)</title>
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@gouvfr/dsfr@1.12.1/dist/dsfr.min.css">
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@gouvfr/dsfr@1.12.1/dist/utility/icons/icons.min.css">
<link rel="stylesheet" href="maquette.css">
</head>
<body>
<div class="maquette-bandeau">Maquette de conception – données fictives, à ne pas publier</div>
<header role="banner" class="fr-header">
  <div class="fr-header__body"><div class="fr-container"><div class="fr-header__body-row">
    <div class="fr-header__brand fr-enlarge-link">
      <div class="fr-header__brand-top">
        <div class="fr-header__logo"><p class="fr-logo">République<br>Française</p></div>
        <div class="fr-header__navbar">
          <button class="fr-btn--menu fr-btn" data-fr-opened="false" aria-controls="modal-menu" aria-haspopup="menu" title="Menu">Menu</button>
        </div>
      </div>
      <div class="fr-header__service">
        <a href="index.html" title="Accueil – Portail développeurs du numérique en santé"><p class="fr-header__service-title">Portail développeurs du numérique en santé</p></a>
        <p class="fr-header__service-tagline">Construire, tester et intégrer des services numériques en santé</p>
      </div>
    </div>
    <div class="fr-header__tools"><div class="fr-header__search fr-modal" id="modal-search">
      <div class="fr-search-bar" role="search"><label class="fr-label" for="q">Rechercher</label>
      <input class="fr-input" placeholder="Rechercher un service, une API…" type="search" id="q"><button class="fr-btn" title="Rechercher">Rechercher</button></div>
    </div></div>
  </div></div></div>
  <div class="fr-header__menu fr-modal" id="modal-menu"><div class="fr-container">
    <button class="fr-btn--close fr-btn" aria-controls="modal-menu">Fermer</button>
    <nav class="fr-nav" role="navigation" aria-label="Menu principal"><ul class="fr-nav__list">
      <li class="fr-nav__item"><a class="fr-nav__link" href="demarrer.html" $( [ "$2" = demarrer ] && echo 'aria-current="page"' )>Démarrer</a></li>
      <li class="fr-nav__item"><a class="fr-nav__link" href="services.html" $( [ "$2" = services ] && echo 'aria-current="page"' )>Services</a></li>
      <li class="fr-nav__item"><a class="fr-nav__link" href="versions.html" $( [ "$2" = versions ] && echo 'aria-current="page"' )>Versions</a></li>
      <li class="fr-nav__item"><a class="fr-nav__link" href="parcours.html" $( [ "$2" = parcours ] && echo 'aria-current="page"' )>Parcours</a></li>
      <li class="fr-nav__item"><a class="fr-nav__link" href="tests.html" $( [ "$2" = tests ] && echo 'aria-current="page"' )>Tests</a></li>
      <li class="fr-nav__item"><a class="fr-nav__link" href="#support">Support</a></li>
    </ul></nav>
  </div></div>
</header>
<main role="main" id="contenu">
H
}

foot_html() {
cat <<H
</main>
<footer class="fr-footer" role="contentinfo" id="support"><div class="fr-container">
  <div class="fr-footer__body"><div class="fr-footer__brand fr-enlarge-link"><p class="fr-logo">République<br>Française</p></div>
  <div class="fr-footer__content"><p class="fr-footer__content-desc">Portail développeurs du numérique en santé. Les contenus réglementaires et les documentations restent publiés par leurs propriétaires : ce portail les relie et les rend actionnables.</p>
  <ul class="fr-footer__content-list">
    <li class="fr-footer__content-item"><a class="fr-footer__content-link" target="_blank" rel="noopener" href="#">esante.gouv.fr <span class="fr-sr-only">(nouvelle fenêtre)</span></a></li>
    <li class="fr-footer__content-item"><a class="fr-footer__content-link" target="_blank" rel="noopener" href="#">G_NIUS <span class="fr-sr-only">(nouvelle fenêtre)</span></a></li>
    <li class="fr-footer__content-item"><a class="fr-footer__content-link" target="_blank" rel="noopener" href="#">Doctrine du numérique en santé <span class="fr-sr-only">(nouvelle fenêtre)</span></a></li>
  </ul></div></div>
  <div class="fr-footer__bottom"><ul class="fr-footer__bottom-list">
    <li class="fr-footer__bottom-item"><a class="fr-footer__bottom-link" href="#">Accessibilité : non conforme (audit à réaliser)</a></li>
    <li class="fr-footer__bottom-item"><a class="fr-footer__bottom-link" href="#">Mentions légales</a></li>
    <li class="fr-footer__bottom-item"><a class="fr-footer__bottom-link" href="#">Signaler un problème</a></li>
  </ul></div>
</div></footer>
<script type="module" src="https://cdn.jsdelivr.net/npm/@gouvfr/dsfr@1.12.1/dist/dsfr.module.min.js"></script>
</body></html>
H
}

# Statuts : icône + texte, jamais la couleur seule
st_rec='<span class="statut statut--rec"><span aria-hidden="true">●</span> Recommandée</span>'
st_sup='<span class="statut statut--sup"><span aria-hidden="true">○</span> Supportée</span>'
st_dep='<span class="statut statut--dep"><span aria-hidden="true">▲</span> Dépréciée</span>'
st_eol='<span class="statut statut--eol"><span aria-hidden="true">✕</span> Fin de vie</span>'
st_exp='<span class="statut statut--exp"><span aria-hidden="true">◆</span> Expérimentale</span>'

for f in pages/*.body; do
  name=$(basename "$f" .body)
  title=$(head -1 "$f" | sed 's/<!-- *//;s/ *-->//')
  active=$(sed -n 2p "$f" | sed 's/<!-- *//;s/ *-->//')
  { head_html "$title" "$active"; tail -n +3 "$f" | sed \
      -e "s|{{REC}}|$st_rec|g" -e "s|{{SUP}}|$st_sup|g" -e "s|{{DEP}}|$st_dep|g" \
      -e "s|{{EOL}}|$st_eol|g" -e "s|{{EXP}}|$st_exp|g"; foot_html; } > "$name.html"
  echo "généré : $name.html"
done
