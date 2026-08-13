
(function () {
  /* =========================================================
    ETCM 2026 — CATÁLOGO DE ARTÍCULOS (v2)
    Fuente: ETCM_2026_Accepted_Articles_by_Track_Superscript_Affiliations.docx
    189 artículos, 13 tracks. Corte de datos: 4 de agosto de 2026.
    Nota: algunos autores aún pueden corregirse (Julio Barzola).
    No se publica el PDF de cada artículo (política de derechos de autor IEEE).

    Los artículos viven en articulos.json (no en este archivo), para
    que reemplazar el listado sea editar un solo JSON. Campos por
    artículo: id, titulo, autores, track, keywords (5 por artículo),
    resumenCorto (~155 caracteres), abstract (texto completo).

    IMPORTANTE: al abrir index.html localmente con doble clic
    (protocolo file://), el navegador bloquea el fetch() de
    articulos.json por CORS. Sirve la carpeta con un servidor local
    (ej. "npx serve", "python -m http.server", Live Server de VSCode)
    para previsualizar. Una vez subido a un hosting real (http/https)
    funciona sin problema.
    ========================================================= */

  var PAGE_SIZE = 12; // artículos por página — ajusta este número si hace falta

  var ETCM_ARTICLES = [];
  var TRACKS = [];
  var currentResults = [];
  var currentPage = 1;

  var input = document.getElementById('ic-input');
  var trackSelect = document.getElementById('ic-track-filter');
  var results = document.getElementById('ic-results');
  var pagination = document.getElementById('ic-pagination');
  var countNum = document.getElementById('ic-count-num');
  var countTotal = document.getElementById('ic-count-total');
  var queryEcho = document.getElementById('ic-query-echo');

  function normalizar(s) {
    return (s || '')
      .toString()
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '');
  }

  function escapeHtml(s) {
    return (s || '')
      .toString()
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

  function collectTracks(articulos) {
    var seen = {};
    var list = [];
    articulos.forEach(function (a) {
      if (!seen[a.track]) { seen[a.track] = true; list.push(a.track); }
    });
    list.sort();
    return list;
  }

  function poblarTracks() {
    TRACKS.forEach(function (t) {
      var opt = document.createElement('option');
      opt.value = t;
      opt.textContent = t;
      trackSelect.appendChild(opt);
    });
  }

  function render(lista) {
    results.innerHTML = '';
    if (lista.length === 0) {
      results.innerHTML = '<div class="ic-empty">No se encontraron artículos que coincidan con tu búsqueda.</div>';
      return;
    }
    lista.forEach(function (a) {
      var card = document.createElement('article');
      card.className = 'ic-card';
      card.tabIndex = 0;
      card.setAttribute('role', 'button');
      card.setAttribute('aria-expanded', 'false');

      var keywordsHtml = (a.keywords || []).map(function (k) {
        return '<span class="ic-tag ic-tag-keyword">' + escapeHtml(k) + '</span>';
      }).join('');

      card.innerHTML =
        '<h3 class="ic-card-title">' + escapeHtml(a.titulo) + '</h3>' +
        '<p class="ic-card-authors">' + escapeHtml(a.autores) + '</p>' +
        '<p class="ic-card-abstract ic-abstract-short">' + escapeHtml(a.resumenCorto) + '</p>' +
        '<p class="ic-card-abstract ic-abstract-full">' + escapeHtml(a.abstract) + '</p>' +
        '<div class="ic-card-footer">' +
          '<div class="ic-tags">' +
            '<span class="ic-tag ic-tag-track">' + escapeHtml(a.track) + '</span>' +
            keywordsHtml +
          '</div>' +
          '<a class="ic-link" href="#" data-ic-link="1">Ver artículo →</a>' +
        '</div>';

      var link = card.querySelector('[data-ic-link]');
      link.addEventListener('click', function (e) {
        e.preventDefault();
        e.stopPropagation();
        // Pendiente: aún no hay destino real por artículo (ver instrucciones).
      });

      function toggleExpand() {
        var expanded = card.classList.toggle('ic-expanded');
        card.setAttribute('aria-expanded', expanded ? 'true' : 'false');
      }

      card.addEventListener('click', toggleExpand);
      card.addEventListener('keydown', function (e) {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          toggleExpand();
        }
      });

      results.appendChild(card);
    });
  }

  function renderPage(scrollToTop) {
    var totalPages = Math.max(1, Math.ceil(currentResults.length / PAGE_SIZE));
    if (currentPage > totalPages) currentPage = totalPages;
    if (currentPage < 1) currentPage = 1;

    var start = (currentPage - 1) * PAGE_SIZE;
    render(currentResults.slice(start, start + PAGE_SIZE));
    renderPagination(totalPages);

    if (scrollToTop) {
      results.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  function irAPagina(n) {
    currentPage = n;
    renderPage(true);
  }

  function renderPagination(totalPages) {
    pagination.innerHTML = '';
    if (currentResults.length === 0 || totalPages <= 1) return;

    var prevBtn = document.createElement('button');
    prevBtn.type = 'button';
    prevBtn.className = 'ic-page-btn';
    prevBtn.textContent = '← Anterior';
    prevBtn.disabled = currentPage <= 1;
    prevBtn.addEventListener('click', function () { irAPagina(currentPage - 1); });

    var info = document.createElement('span');
    info.className = 'ic-page-info';
    info.textContent = 'Página ' + currentPage + ' de ' + totalPages;

    var nextBtn = document.createElement('button');
    nextBtn.type = 'button';
    nextBtn.className = 'ic-page-btn';
    nextBtn.textContent = 'Siguiente →';
    nextBtn.disabled = currentPage >= totalPages;
    nextBtn.addEventListener('click', function () { irAPagina(currentPage + 1); });

    pagination.appendChild(prevBtn);
    pagination.appendChild(info);
    pagination.appendChild(nextBtn);
  }

  function buscar() {
    var query = input.value.trim();
    var q = normalizar(query);
    var track = trackSelect.value;

    countTotal.textContent = ETCM_ARTICLES.length;

    var filtrados = ETCM_ARTICLES.filter(function (a) {
      if (track && a.track !== track) return false;
      if (!q) return true;
      var campo = normalizar(a.titulo) + ' ' + normalizar(a.autores) + ' ' +
                  normalizar((a.keywords || []).join(' ')) + ' ' + normalizar(a.track);
      return campo.indexOf(q) !== -1;
    });

    queryEcho.textContent = query ? 'Resultados para "' + query + '"' : '';
    countNum.textContent = filtrados.length;
    currentResults = filtrados;
    currentPage = 1;
    renderPage(false);
  }

  document.getElementById('ic-btn-buscar').addEventListener('click', buscar);

  input.addEventListener('keydown', function (e) {
    if (e.key === 'Enter') {
      e.preventDefault();
      buscar();
    }
  });

  trackSelect.addEventListener('change', buscar);

  fetch('articulos.json')
    .then(function (res) {
      if (!res.ok) throw new Error('HTTP ' + res.status);
      return res.json();
    })
    .then(function (data) {
      ETCM_ARTICLES = data;
      TRACKS = collectTracks(ETCM_ARTICLES);
      poblarTracks();
      buscar();
    })
    .catch(function (err) {
      results.innerHTML = '<div class="ic-empty">No se pudo cargar articulos.json (' + err.message + '). Si abriste este archivo con doble clic, sirve la carpeta con un servidor local.</div>';
    });
})();
