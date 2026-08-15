
(function () {
  var PAGE_SIZE = 25;

  var COUNTRY_NAMES = {
    AR: 'Argentina', AU: 'Australia', AZ: 'Azerbaijan', BE: 'Belgium',
    BR: 'Brazil', CA: 'Canada', CL: 'Chile', CN: 'China', CO: 'Colombia',
    DK: 'Denmark', EC: 'Ecuador', ES: 'Spain', FR: 'France',
    GB: 'United Kingdom', ID: 'Indonesia', IT: 'Italy', MA: 'Morocco',
    MX: 'Mexico', NL: 'Netherlands', PE: 'Peru', RO: 'Romania',
    US: 'United States', VE: 'Venezuela'
  };

  var currentResults = [];
  var currentPage = 1;

  var input = document.getElementById('ir-input');
  var results = document.getElementById('ir-results');
  var pagination = document.getElementById('ir-pagination');
  var countNum = document.getElementById('ir-count-num');
  var countTotal = document.getElementById('ir-count-total');
  var queryEcho = document.getElementById('ir-query-echo');

  function normalize(s) {
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

  function fullName(r) {
    return r.firstName + ' ' + r.lastName;
  }

  function countryName(r) {
    return COUNTRY_NAMES[r.countryCode] || '';
  }

  function render(list) {
    results.innerHTML = '';
    if (list.length === 0) {
      var emptyRow = document.createElement('tr');
      emptyRow.innerHTML = '<td colspan="3"><div class="ir-empty">No reviewers found matching your search.</div></td>';
      results.appendChild(emptyRow);
      return;
    }
    list.forEach(function (r) {
      var row = document.createElement('tr');
      row.innerHTML =
        '<td class="ir-name">' + escapeHtml(fullName(r)) + '</td>' +
        '<td class="ir-affiliation">' + escapeHtml(r.affiliation) + '</td>' +
        '<td class="ir-country">' +
          '<img class="ir-flag" src="' + escapeHtml(r.flag) + '" alt="" loading="lazy">' +
          '<span class="ir-country-name">' + escapeHtml(countryName(r)) + '</span>' +
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

  function goToPage(n) {
    currentPage = n;
    renderPage(true);
  }

  function renderPagination(totalPages) {
    pagination.innerHTML = '';
    if (currentResults.length === 0 || totalPages <= 1) return;

    var prevBtn = document.createElement('button');
    prevBtn.type = 'button';
    prevBtn.className = 'ir-page-btn';
    prevBtn.textContent = '← Previous';
    prevBtn.disabled = currentPage <= 1;
    prevBtn.addEventListener('click', function () { goToPage(currentPage - 1); });

    var info = document.createElement('span');
    info.className = 'ir-page-info';
    info.textContent = 'Page ' + currentPage + ' of ' + totalPages;

    var nextBtn = document.createElement('button');
    nextBtn.type = 'button';
    nextBtn.className = 'ir-page-btn';
    nextBtn.textContent = 'Next →';
    nextBtn.disabled = currentPage >= totalPages;
    nextBtn.addEventListener('click', function () { goToPage(currentPage + 1); });

    pagination.appendChild(prevBtn);
    pagination.appendChild(info);
    pagination.appendChild(nextBtn);
  }

  function search() {
    var query = input.value.trim();
    var q = normalize(query);

    countTotal.textContent = REVISORES.length;

    var filtered = REVISORES.filter(function (r) {
      if (!q) return true;
      var field = normalize(r.firstName) + ' ' + normalize(r.lastName) + ' ' + normalize(r.affiliation);
      return field.indexOf(q) !== -1;
    });

    queryEcho.textContent = query ? 'Results for "' + query + '"' : '';
    countNum.textContent = filtered.length;
    currentResults = filtered;
    currentPage = 1;
    renderPage(false);
  }

  document.getElementById('ir-btn-search').addEventListener('click', search);

  input.addEventListener('keydown', function (e) {
    if (e.key === 'Enter') {
      e.preventDefault();
      search();
    }
  });

  search();
})();
