/*!
 * IEEE ETCM 2026 — Accepted Papers (Catálogo v2, orden cronológico)
 * Datos: catalogo-data.json (misma carpeta que este script; local o jsDelivr)
 * Montaje: <div id="ieee-accepted"></div>
 */
(function () {
  'use strict';

  var MOUNT_ID = 'ieee-accepted';
  var DATA_FILE = 'catalogo-data.json';

  // Carpeta del propio script (jsDelivr o local) -> de ahí se lee el JSON
  var current = document.currentScript || (function () {
    var s = document.getElementsByTagName('script');
    return s[s.length - 1];
  })();
  // Solo se usa la carpeta del script si de verdad es este archivo (los plugins de
  // optimización de WordPress pueden mover o diferir scripts y romper currentScript).
  var BASE = current && current.src && /\/script(\.min)?\.js(\?.*)?$/.test(current.src) ?
    current.src.replace(/[^\/]*$/, '') : '';

  // Fuentes del JSON en orden: carpeta del script (jsDelivr o local) y respaldos.
  // Subir DATA_VERSION cada vez que cambie catalogo-data.json (evita caché vieja).
  var DATA_VERSION = '2026-10-16';
  var REPO_PATH = 'javProg24/IEEE-ETCM-2026';
  var DATA_PATH = 'Catalogo_Articulos/v2/' + DATA_FILE;
  var DATA_SOURCES = [
    BASE ? BASE + DATA_FILE : null,
    'https://cdn.jsdelivr.net/gh/' + REPO_PATH + '@master/' + DATA_PATH,
    'https://raw.githubusercontent.com/' + REPO_PATH + '/master/' + DATA_PATH,
    'https://cdn.statically.io/gh/' + REPO_PATH + '/master/' + DATA_PATH
  ].filter(function (u, i, a) { return u && a.indexOf(u) === i; });
  var CSS_FALLBACK = 'https://cdn.statically.io/gh/' + REPO_PATH + '/master/Catalogo_Articulos/v2/style.css';
  var FETCH_TIMEOUT = 10000;

  // Color por sala (consistente en todos los días)
  var ROOM_COLORS = {
    'galapagos': '#1f8a70',
    'cuenca': '#c0392b',
    'guayaquil': '#e0a100',
    'machala': '#6c4ab6',
    'virtual 1': '#0f5fa8',
    'virtual 2': '#0e8fa3',
    'virtual 3': '#7a5c2e',
    'virtual 4': '#b8457a'
  };

  var state = { data: null, day: null, query: '', room: '', track: '' };
  var root;

  /* ---------------- utilidades ---------------- */
  function esc(s) {
    return String(s == null ? '' : s)
      .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;').replace(/'/g, '&#39;');
  }
  function norm(s) {
    return String(s || '').toLowerCase()
      .normalize('NFD').replace(/[̀-ͯ]/g, '');
  }
  function roomColor(room) {
    return ROOM_COLORS[norm(room)] || '#0f5fa8';
  }
  function dash(a, b) { return a + ' – ' + b; }
  function plural(n, w) { return n + ' ' + w + (n === 1 ? '' : 's'); }
  function countDay(day) {
    return day.sessions.reduce(function (n, s) { return n + s.papers.length; }, 0);
  }

  // Agrupa sesiones que se solapan en el tiempo en un mismo bloque (salas paralelas)
  function blocksOf(sessions) {
    var sorted = sessions.slice().sort(function (a, b) {
      return a.start < b.start ? -1 : a.start > b.start ? 1 : 0;
    });
    var blocks = [];
    sorted.forEach(function (s) {
      var last = blocks[blocks.length - 1];
      if (last && s.start < last.end) {
        last.sessions.push(s);
        if (s.end > last.end) last.end = s.end;
      } else {
        blocks.push({ start: s.start, end: s.end, sessions: [s] });
      }
    });
    return blocks;
  }

  function paperText(p, s) {
    return norm([
      p.id, 'paper ' + p.id, p.title, p.track, p.trackShort,
      p.authors.map(function (a) { return a.name; }).join(' '),
      p.affiliations.join(' '), (p.keywords || []).join(' '),
      s.name, s.room
    ].join(' '));
  }

  /* ---------------- render ---------------- */
  function renderAuthors(p) {
    var multi = p.affiliations.length > 1;
    var names = p.authors.map(function (a) {
      var sup = multi && a.aff && a.aff.length ? '<sup>' + a.aff.join(',') + '</sup>' : '';
      return '<span class="ap-author">' + esc(a.name) + sup + '</span>';
    }).join(', ');
    var affs = p.affiliations.map(function (af, i) {
      return '<li>' + (multi ? '<sup>' + (i + 1) + '</sup>' : '') + esc(af) + '</li>';
    }).join('');
    return '<div class="ap-authors">' + names + '</div>' +
           '<ul class="ap-affs">' + affs + '</ul>';
  }

  function renderPaper(p) {
    var kw = (p.keywords || []).map(function (k) {
      return '<span class="ap-kw">' + esc(k) + '</span>';
    }).join('');
    return '' +
      '<div class="ap-row" id="paper-' + esc(p.id) + '">' +
        '<div class="ap-time">' + esc(dash(p.start, p.end)) + '</div>' +
        '<div class="ap-paper">' +
          '<div class="ap-ptitle">' + esc(p.title) + '</div>' +
          '<div class="ap-pmeta">' +
            '<span class="ap-id">Paper ' + esc(p.id) + '</span>' +
            '<span class="ap-track">' + esc(p.track) + '</span>' +
          '</div>' +
          (p.abstract ?
            '<details class="ap-abs"><summary>Abstract</summary>' +
              '<p>' + esc(p.abstract) + '</p>' +
              (kw ? '<div class="ap-kws">' + kw + '</div>' : '') +
            '</details>' : '') +
        '</div>' +
        '<div class="ap-people">' + renderAuthors(p) + '</div>' +
      '</div>';
  }

  function renderSession(s, papers, open) {
    var color = roomColor(s.room);
    var tracks = (s.tracks || []).map(function (t) {
      return '<span class="ap-chip">' + esc(t) + '</span>';
    }).join('');
    return '' +
      '<details class="ap-session" style="--room:' + color + '"' + (open ? ' open' : '') + '>' +
        '<summary class="ap-shead">' +
          '<div class="ap-stitle">' +
            '<span class="ap-dot"></span>' +
            '<span class="ap-sname">' + esc(s.name) + '</span>' +
            '<span class="ap-room">' + esc(s.mode === 'virtual' ? s.room : 'Room ' + s.room) + '</span>' +
            '<span class="ap-stime">' + esc(dash(s.start, s.end)) + '</span>' +
          '</div>' +
          '<div class="ap-sright">' +
            '<span class="ap-count">' + plural(papers.length, 'paper') + '</span>' +
            '<span class="ap-chev" aria-hidden="true"></span>' +
          '</div>' +
          (tracks ? '<div class="ap-chips">' + tracks + '</div>' : '') +
        '</summary>' +
        '<div class="ap-sbody">' +
          '<div class="ap-thead"><span>Time</span><span>Paper</span><span>Authors &amp; affiliations</span></div>' +
          papers.map(renderPaper).join('') +
        '</div>' +
      '</details>';
  }

  function renderDayBody(day, filter) {
    var blocks = blocksOf(day.sessions);
    var html = '';
    blocks.forEach(function (b) {
      var parts = [], total = 0;
      b.sessions.forEach(function (s) {
        var ps = filter ? s.papers.filter(function (p) { return filter(p, s); }) : s.papers;
        if (ps.length) { parts.push(renderSession(s, ps, !!filter)); total += ps.length; }
      });
      if (!parts.length) return;
      var mode = b.sessions[0].mode === 'virtual' ? 'Virtual sessions' : 'In-person sessions';
      html +=
        '<div class="ap-block">' +
          '<div class="ap-bhead">' +
            '<span class="ap-blabel">' + mode + '</span>' +
            '<span class="ap-binfo">' + esc(dash(b.start, b.end)) + ' · ' +
              plural(parts.length, parts.length === 1 ? 'room' : 'parallel room') + ' · ' + plural(total, 'paper') +
            '</span>' +
          '</div>' +
          parts.join('') +
        '</div>';
    });
    return html;
  }

  function renderTabs() {
    var filtered = hasFilters();
    var match = filtered ? buildMatcher() : null;
    return state.data.days.map(function (d) {
      var active = !filtered && d.id === state.day;
      var n = filtered ? countMatches(d, match) : countDay(d);
      return '<button type="button" class="ap-tab' + (active ? ' is-active' : '') + (filtered && !n ? ' is-empty' : '') +
        '" data-day="' + esc(d.id) + '" aria-pressed="' + active + '">' +
        '<span class="ap-tday">' + esc(d.weekday) + '</span>' +
        '<span class="ap-tdate">' + esc(d.dateLabel) + ' \u00b7 ' + (filtered ? n + (n === 1 ? ' match' : ' matches') : plural(n, 'paper')) + '</span>' +
        '<span class="ap-tmode">' + esc(d.sessions[0].mode === 'virtual' ? 'Virtual' : 'In-person') + '</span>' +
      '</button>';
    }).join('');
  }

  function hasFilters() {
    return !!(state.query.trim() || state.room || state.track);
  }

  // Combina búsqueda + sala + track
  function buildMatcher() {
    var q = norm(state.query.trim());
    var terms = q ? q.split(/\s+/) : [];
    return function (p, s) {
      if (state.room && s.room !== state.room) return false;
      if (state.track && p.track !== state.track) return false;
      if (!terms.length) return true;
      var t = paperText(p, s);
      return terms.every(function (w) { return t.indexOf(w) !== -1; });
    };
  }

  function countMatches(day, match) {
    var n = 0;
    day.sessions.forEach(function (s) { s.papers.forEach(function (p) { if (match(p, s)) n++; }); });
    return n;
  }

  function roomOptions() {
    var seen = {}, inPerson = [], virtual = [];
    state.data.days.forEach(function (d) {
      d.sessions.forEach(function (s) {
        if (seen[s.room]) return;
        seen[s.room] = true;
        (s.mode === 'virtual' ? virtual : inPerson).push(s.room);
      });
    });
    var opt = function (r) {
      return '<option value="' + esc(r) + '">' + esc(r) + '</option>';
    };
    return '<option value="">All rooms</option>' +
      (inPerson.length ? '<optgroup label="In-person \u00b7 Hotel Oro Verde">' + inPerson.map(opt).join('') + '</optgroup>' : '') +
      (virtual.length ? '<optgroup label="Virtual \u00b7 Wednesday">' + virtual.map(opt).join('') + '</optgroup>' : '');
  }

  function trackOptions() {
    var counts = {};
    state.data.days.forEach(function (d) {
      d.sessions.forEach(function (s) {
        s.papers.forEach(function (p) { counts[p.track] = (counts[p.track] || 0) + 1; });
      });
    });
    return '<option value="">All tracks</option>' +
      Object.keys(counts).sort().map(function (t) {
        return '<option value="' + esc(t) + '">' + esc(t) + ' (' + counts[t] + ')</option>';
      }).join('');
  }

  // El botón dice "Collapse all" si todas las sesiones visibles están abiertas
  function syncToggle() {
    var btn = root.querySelector('.ap-toggle-all');
    if (!btn) return;
    var list = root.querySelectorAll('.ap-session'), allOpen = list.length > 0;
    for (var i = 0; i < list.length; i++) if (!list[i].open) { allOpen = false; break; }
    btn.setAttribute('data-open', allOpen ? '1' : '0');
    btn.textContent = allOpen ? 'Collapse all' : 'Expand all';
    btn.style.display = list.length ? '' : 'none';
  }

  function renderBody() {
    renderBodyInner();
    syncToggle();
  }

  function renderBodyInner() {
    var body = root.querySelector('.ap-body');
    var info = root.querySelector('.ap-result');
    if (!hasFilters()) {
      var day = state.data.days.filter(function (d) { return d.id === state.day; })[0];
      info.innerHTML = '<strong>' + esc(day.weekday + ', ' + day.dateLabel) + '</strong> · ' +
        esc(day.venue) + ' · ' + plural(countDay(day), 'paper');
      body.innerHTML = renderDayBody(day);
      return;
    }

    var match = buildMatcher();
    var html = '', n = 0;
    state.data.days.forEach(function (d) {
      var part = renderDayBody(d, match);
      if (part) {
        n += countMatches(d, match);
        html += '<h3 class="ap-dayhead">' + esc(d.weekday + ', ' + d.dateLabel) + '</h3>' + part;
      }
    });
    var desc = [];
    if (state.room) desc.push('Room ' + state.room);
    if (state.track) desc.push(state.track);
    if (state.query.trim()) desc.push('\u201c' + state.query.trim() + '\u201d');
    info.innerHTML = (n ?
      '<strong>' + plural(n, 'paper') + '</strong> \u00b7 ' + esc(desc.join(' \u00b7 ')) :
      'No papers for ' + esc(desc.join(' \u00b7 ')) + '.') +
      ' <button type="button" class="ap-clear">Clear filters</button>';
    body.innerHTML = html;
  }

  function render() {
    var m = state.data.meta;
    var total = state.data.days.reduce(function (n, d) { return n + countDay(d); }, 0);
    root.innerHTML = '' +
      '<div class="ap-header">' +
        '<p class="ap-sub">' + esc(m.subtitle) + '</p>' +
      '</div>' +
      '<div class="ap-search">' +
        '<input type="search" class="ap-input" placeholder="Find a paper by ID, title, author or affiliation\u2026" aria-label="Search accepted papers">' +
        '<div class="ap-filters">' +
          '<label class="ap-field"><span>Room</span>' +
            '<select class="ap-select ap-room-filter" aria-label="Filter by room">' + roomOptions() + '</select></label>' +
          '<label class="ap-field"><span>Track</span>' +
            '<select class="ap-select ap-track-filter" aria-label="Filter by track">' + trackOptions() + '</select></label>' +
        '</div>' +
      '</div>' +
      '<div class="ap-tabs" role="group" aria-label="Conference days">' + renderTabs() + '</div>' +
      '<div class="ap-toolbar">' +
        '<p class="ap-result"></p>' +
        '<button type="button" class="ap-toggle-all" data-open="0">Expand all</button>' +
      '</div>' +
      '<div class="ap-body"></div>' +
      '<p class="ap-foot">All times in ' + esc(m.timezone) + '. ' + total +
        ' papers scheduled. Schedule subject to change.</p>';

    var input = root.querySelector('.ap-input');
    var timer;
    input.addEventListener('input', function () {
      clearTimeout(timer);
      timer = setTimeout(function () {
        state.query = input.value;
        root.querySelector('.ap-tabs').innerHTML = renderTabs();
        renderBody();
      }, 150);
    });
    var roomSel = root.querySelector('.ap-room-filter');
    var trackSel = root.querySelector('.ap-track-filter');
    function refresh() {
      root.querySelector('.ap-tabs').innerHTML = renderTabs();
      renderBody();
    }
    roomSel.addEventListener('change', function () { state.room = roomSel.value; refresh(); });
    trackSel.addEventListener('change', function () { state.track = trackSel.value; refresh(); });
    function clearFilters() {
      state.query = ''; state.room = ''; state.track = '';
      input.value = ''; roomSel.value = ''; trackSel.value = '';
    }
    root.querySelector('.ap-toolbar').addEventListener('click', function (e) {
      if (e.target && e.target.className === 'ap-clear') { clearFilters(); refresh(); }
    });
    var toggleAll = root.querySelector('.ap-toggle-all');
    toggleAll.addEventListener('click', function () {
      var openAll = toggleAll.getAttribute('data-open') !== '1';
      var list = root.querySelectorAll('.ap-session');
      for (var i = 0; i < list.length; i++) list[i].open = openAll;
      syncToggle();
    });
    root.querySelector('.ap-body').addEventListener('toggle', syncToggle, true);
    root.querySelector('.ap-tabs').addEventListener('click', function (e) {
      var btn = e.target.closest ? e.target.closest('.ap-tab') : null;
      if (!btn) return;
      state.day = btn.getAttribute('data-day');
      clearFilters();
      refresh();
    });
    renderBody();
  }

  // Si la URL trae #paper-123, abrir el día correcto y desplazarse al paper
  function dayFromHash() {
    var m = /^#paper-(\d+)$/.exec(window.location.hash || '');
    if (!m) return null;
    var id = m[1], found = null;
    state.data.days.forEach(function (d) {
      d.sessions.forEach(function (s) {
        s.papers.forEach(function (p) { if (p.id === id) found = d.id; });
      });
    });
    return found;
  }

  function init(data) {
    state.data = data;
    var hashDay = dayFromHash();
    state.day = hashDay || data.days[0].id;
    render();
    if (hashDay) {
      var el = document.getElementById(window.location.hash.slice(1));
      if (el) {
        var sess = el.closest ? el.closest('.ap-session') : null;
        if (sess) sess.open = true;
        syncToggle();
        el.classList.add('is-target');
        el.scrollIntoView({ block: 'center' });
      }
    }
  }

  // Si style.css no llegó (jsDelivr caído), cargarlo desde el respaldo
  function ensureStyles() {
    setTimeout(function () {
      if (!root || window.getComputedStyle(root).maxWidth === '1080px') return;
      if (document.querySelector('link[data-ap-fallback]')) return;
      var l = document.createElement('link');
      l.rel = 'stylesheet';
      l.href = CSS_FALLBACK;
      l.setAttribute('data-ap-fallback', '1');
      document.head.appendChild(l);
    }, 3000);
  }

  function start() {
    root = document.getElementById(MOUNT_ID);
    if (!root || root.getAttribute('data-ap-ready')) return;   // evita doble carga
    root.setAttribute('data-ap-ready', '1');
    // URL de datos opcional desde el bloque: <div id="ieee-accepted" data-src="...">
    var custom = root.getAttribute('data-src');
    if (custom && DATA_SOURCES.indexOf(custom) === -1) DATA_SOURCES.unshift(custom);
    root.innerHTML = '<p class="ap-loading">Loading accepted papers\u2026</p>';
    ensureStyles();
    loadData(0);
  }

  function fetchJSON(url) {
    return new Promise(function (resolve, reject) {
      var done = false;
      var timer = setTimeout(function () { done = true; reject(new Error('timeout')); }, FETCH_TIMEOUT);
      fetch(url + (url.indexOf('?') === -1 ? '?' : '&') + 'v=' + DATA_VERSION)
        .then(function (r) { if (!r.ok) throw new Error('HTTP ' + r.status); return r.json(); })
        .then(function (j) {
          if (done) return;
          clearTimeout(timer);
          if (!j || !j.days || !j.days.length) throw new Error('empty data');
          resolve(j);
        })
        .catch(function (e) { if (!done) { clearTimeout(timer); reject(e); } });
    });
  }

  function loadData(i) {
    if (i >= DATA_SOURCES.length) {
      root.innerHTML = '<p class="ap-loading">The accepted papers could not be loaded. ' +
        '<button type="button" class="ap-clear ap-retry">Try again</button></p>';
      var btn = root.querySelector('.ap-retry');
      if (btn) btn.addEventListener('click', function () {
        root.innerHTML = '<p class="ap-loading">Loading accepted papers\u2026</p>';
        loadData(0);
      });
      return;
    }
    fetchJSON(DATA_SOURCES[i])
      .then(init)
      .catch(function (err) {
        if (window.console) console.warn('[ETCM accepted papers] source failed:', DATA_SOURCES[i], err && err.message);
        loadData(i + 1);
      });
  }

  // Diagnóstico desde consola: ETCM_ACCEPTED.find('ochoa')
  window.ETCM_ACCEPTED = {
    data: function () { return state.data; },
    find: function (q) {
      var out = [], t = norm(q);
      (state.data ? state.data.days : []).forEach(function (d) {
        d.sessions.forEach(function (s) {
          s.papers.forEach(function (p) {
            if (paperText(p, s).indexOf(t) !== -1) out.push({ day: d.weekday, room: s.room, time: p.start, id: p.id, title: p.title });
          });
        });
      });
      if (console.table) console.table(out);
      return out;
    }
  };

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start);
  else start();
})();
