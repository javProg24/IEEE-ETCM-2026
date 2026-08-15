
(function () {
  var PAGE_SIZE = 25;

  var COUNTRY_NAMES = {
    AR: 'Argentina', AU: 'Australia', AZ: 'Azerbaiyán', BE: 'Bélgica',
    BR: 'Brasil', CA: 'Canadá', CL: 'Chile', CN: 'China', CO: 'Colombia',
    DK: 'Dinamarca', EC: 'Ecuador', ES: 'España', FR: 'Francia',
    GB: 'Reino Unido', ID: 'Indonesia', IT: 'Italia', MA: 'Marruecos',
    MX: 'México', NL: 'Países Bajos', PE: 'Perú', RO: 'Rumania',
    US: 'Estados Unidos', VE: 'Venezuela'
  };

  var currentResults = [];
  var currentPage = 1;

  var input = document.getElementById('ir-input');
  var results = document.getElementById('ir-results');
  var pagination = document.getElementById('ir-pagination');
  var countNum = document.getElementById('ir-count-num');
  var countTotal = document.getElementById('ir-count-total');
  var queryEcho = document.getElementById('ir-query-echo');

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

  function nombreCompleto(r) {
    return r.nombre + ' ' + r.apellido;
  }

  function nombrePais(r) {
    return COUNTRY_NAMES[r.codigo] || '';
  }

  function render(lista) {
    results.innerHTML = '';
    if (lista.length === 0) {
      var emptyRow = document.createElement('tr');
      emptyRow.innerHTML = '<td colspan="3"><div class="ir-empty">No se encontraron revisores que coincidan con tu búsqueda.</div></td>';
      results.appendChild(emptyRow);
      return;
    }
    lista.forEach(function (r) {
      var row = document.createElement('tr');
      row.innerHTML =
        '<td class="ir-name">' + escapeHtml(nombreCompleto(r)) + '</td>' +
        '<td class="ir-affiliation">' + escapeHtml(r.afiliacion) + '</td>' +
        '<td class="ir-country">' +
          '<img class="ir-flag" src="' + escapeHtml(r.pais) + '" alt="" loading="lazy">' +
          '<span class="ir-country-name">' + escapeHtml(nombrePais(r)) + '</span>' +
        '</td>';
      results.appendChild(row);
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
    prevBtn.className = 'ir-page-btn';
    prevBtn.textContent = '← Anterior';
    prevBtn.disabled = currentPage <= 1;
    prevBtn.addEventListener('click', function () { irAPagina(currentPage - 1); });

    var info = document.createElement('span');
    info.className = 'ir-page-info';
    info.textContent = 'Página ' + currentPage + ' de ' + totalPages;

    var nextBtn = document.createElement('button');
    nextBtn.type = 'button';
    nextBtn.className = 'ir-page-btn';
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

    countTotal.textContent = REVISORES.length;

    var filtrados = REVISORES.filter(function (r) {
      if (!q) return true;
      var campo = normalizar(r.nombre) + ' ' + normalizar(r.apellido) + ' ' + normalizar(r.afiliacion);
      return campo.indexOf(q) !== -1;
    });

    queryEcho.textContent = query ? 'Resultados para "' + query + '"' : '';
    countNum.textContent = filtrados.length;
    currentResults = filtrados;
    currentPage = 1;
    renderPage(false);
  }

  document.getElementById('ir-btn-buscar').addEventListener('click', buscar);

  input.addEventListener('keydown', function (e) {
    if (e.key === 'Enter') {
      e.preventDefault();
      buscar();
    }
  });

  buscar();
})();
