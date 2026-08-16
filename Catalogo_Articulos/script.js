(function () {
  fetch('articulos-data.json')
    .then(function (res) {
      if (!res.ok) { throw new Error('HTTP ' + res.status); }
      return res.json();
    })
    .then(init)
    .catch(function (err) {
      var results = document.getElementById('ic-results');
      if (results) {
        results.innerHTML = '<div class="ic-empty">Could not load the article catalog.</div>';
      }
      console.error('Failed to load articulos-data.json', err);
    });

  function init(ETCM_ARTICLES) {
    var PAGE_SIZE = 12;

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
        .replace(/'/g, '&#39;')
    }

    function collectTracks(articles) {
      var seen = {};
      var list = [];
      articles.forEach(function (a) {
        if (!seen[a.track]) { seen[a.track] = true; list.push(a.track); }
      });
      list.sort();
      return list;
    }

    function populateTracks() {
      TRACKS.forEach(function (t) {
        var opt = document.createElement('option');
        opt.value = t;
        opt.textContent = t;
        trackSelect.appendChild(opt);
      });
    }

    function render(list) {
      results.innerHTML = '';
      if (list.length === 0) {
        results.innerHTML = '<div class="ic-empty">No articles found matching your search.</div>';
        return;
      }
      list.forEach(function (a) {
        var card = document.createElement('article');
        card.className = 'ic-card';
        card.tabIndex = 0;
        card.setAttribute('role', 'button');
        card.setAttribute('aria-expanded', 'false');

        var keywordsHtml = (a.keywords || []).map(function (k) {
          return '<span class="ic-tag ic-tag-keyword">' + escapeHtml(k) + '</span>';
        }).join('');

        card.innerHTML =
          '<h3 class="ic-card-title">' + escapeHtml(a.title) + '</h3>' +
          '<p class="ic-card-authors">' + escapeHtml(a.authors) + '</p>' +
          '<p class="ic-card-abstract ic-abstract-short">' + escapeHtml(a.shortAbstract) + '</p>' +
          '<p class="ic-card-abstract ic-abstract-full">' + escapeHtml(a.abstract) + '</p>' +
          '<div class="ic-card-footer">' +
            '<div class="ic-tags">' +
              '<span class="ic-tag ic-tag-track">' + escapeHtml(a.track) + '</span>' +
              keywordsHtml +
            '</div>' +
            '<a class="ic-link" href="#" data-ic-link="1">View article →</a>' +
          '</div>';

        var link = card.querySelector('[data-ic-link]');
        link.addEventListener('click', function (e) {
          e.preventDefault();
          e.stopPropagation();
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

    function goToPage(n) {
      currentPage = n;
      renderPage(true);
    }

    function renderPagination(totalPages) {
      pagination.innerHTML = '';
      if (currentResults.length === 0 || totalPages <= 1) return;

      var prevBtn = document.createElement('button');
      prevBtn.type = 'button';
      prevBtn.className = 'ic-page-btn';
      prevBtn.textContent = '← Previous';
      prevBtn.disabled = currentPage <= 1;
      prevBtn.addEventListener('click', function () { goToPage(currentPage - 1); });

      var info = document.createElement('span');
      info.className = 'ic-page-info';
      info.textContent = 'Page ' + currentPage + ' of ' + totalPages;

      var nextBtn = document.createElement('button');
      nextBtn.type = 'button';
      nextBtn.className = 'ic-page-btn';
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
      var track = trackSelect.value;

      countTotal.textContent = ETCM_ARTICLES.length;

      var filtered = ETCM_ARTICLES.filter(function (a) {
        if (track && a.track !== track) return false;
        if (!q) return true;
        var field = normalize(a.title) + ' ' + normalize(a.authors) + ' ' +
                    normalize((a.keywords || []).join(' ')) + ' ' + normalize(a.track);
        return field.indexOf(q) !== -1;
      });

      queryEcho.textContent = query ? 'Results for "' + query + '"' : '';
      countNum.textContent = filtered.length;
      currentResults = filtered;
      currentPage = 1;
      renderPage(false);
    }

    document.getElementById('ic-btn-search').addEventListener('click', search);

    input.addEventListener('keydown', function (e) {
      if (e.key === 'Enter') {
        e.preventDefault();
        search();
      }
    });

    trackSelect.addEventListener('change', search);

    TRACKS = collectTracks(ETCM_ARTICLES);
    populateTracks();
    search();
  }
})();
