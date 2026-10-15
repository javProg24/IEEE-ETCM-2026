(function () {
  'use strict';

  var MOUNT_ID = 'ieee-glance';
  var PLACEHOLDER = 'REEMPLAZAR_';

  // Carpeta del propio script (jsDelivr o local)
  var current = document.currentScript || (function () {
    var s = document.getElementsByTagName('script');
    return s[s.length - 1];
  })();
  var BASE = current && current.src ? current.src.replace(/[^\/]*$/, '') : './';

  /* ---------- datos del programa ---------- */
  var PROGRAM_DATA = {
    "meta": {
      "subtitle": "Four days of tutorials, keynotes, technical sessions and networking in Guayaquil, Ecuador — October 21–24, 2026.",
      "note": "Technical paper sessions run in parallel across different rooms, in 15-minute slots. Browse the approved papers on the Accepted Papers page.",
      "acceptedPapersUrl": "https://attend.ieee.org/etcm-2026/scientific-articles-catalog/"
    },
    "downloads": {
      "general": {
        "label": "General Program",
        "description": "All four days on one page",
        "url": "https://attend.ieee.org/etcm-2026/wp-content/uploads/sites/825/General-Program-ETCM-2026-v4.pdf"
      },
      "groups": [
        {
          "mode": "virtual",
          "title": "Virtual Sessions",
          "subtitle": "Wednesday, October 21 · ITB – Matriz",
          "files": [
            {
              "label": "Summary",
              "description": "Sessions, rooms and paper IDs",
              "url": "https://attend.ieee.org/etcm-2026/wp-content/uploads/sites/825/IEEE_ETCM_2026_virtual-tracks-11OCT-SUMMARY.pdf"
            },
            {
              "label": "Detailed Program",
              "description": "Paper titles, authors, times and Zoom links",
              "url": "https://attend.ieee.org/etcm-2026/wp-content/uploads/sites/825/IEEE_ETCM_2026-Conference-Agenda-VF-11O-SHARE-Virtual.pdf"
            }
          ]
        },
        {
          "mode": "inperson",
          "title": "In-person Sessions",
          "subtitle": "Thursday–Saturday, October 22–24 · Hotel Oro Verde",
          "files": [
            {
              "label": "Summary",
              "description": "Sessions, rooms and paper IDs",
              "url": "https://attend.ieee.org/etcm-2026/wp-content/uploads/sites/825/IEEE_ETCM_2026_TechProm-In-Person-VF-11OCT-SUMMARY.pdf"
            },
            {
              "label": "Detailed Program",
              "description": "Paper titles, authors and times",
              "url": "https://attend.ieee.org/etcm-2026/wp-content/uploads/sites/825/IEEE_ETCM_2026-Conference-Agenda-VF-11O-SHARE-In-Person.pdf"
            }
          ]
        }
      ]
    },
    "days": [
      {
        "id": "wed",
        "day": "Wednesday",
        "date": "October 21",
        "venue": "ITB – Matriz",
        "rows": [
          {
            "time": "07:30 – 08:30",
            "type": "item",
            "activity": "Registrations – Tutorials",
            "location": "ITB – Matriz"
          },
          {
            "time": "08:30 – 10:30",
            "type": "item",
            "activity": "Tutorials",
            "location": "LAB 1 – LAB 4"
          },
          {
            "time": "10:30 – 11:00",
            "type": "break",
            "activity": "Coffee Break",
            "location": "ITB – Matriz"
          },
          {
            "time": "11:00 – 13:00",
            "type": "item",
            "activity": "Tutorials",
            "location": "LAB 1 – LAB 4"
          },
          {
            "time": "14:00 – 16:00",
            "type": "parallel",
            "papersLink": true,
            "sessions": [
              {
                "room": "LAB 1",
                "mode": "virtual",
                "time": "14:00 – 16:00",
                "name": "Virtual Track – CIS",
                "tracks": "CIS",
                "papers": 8
              },
              {
                "room": "LAB 2",
                "mode": "virtual",
                "time": "14:15 – 16:00",
                "name": "Virtual Track – ComSoc",
                "tracks": "Comms.",
                "papers": 7
              },
              {
                "room": "LAB 3",
                "mode": "virtual",
                "time": "14:15 – 16:00",
                "name": "Virtual Track – PES",
                "tracks": "PES, Sys. Control, Indust. Elec & Sign Proc",
                "papers": 7
              },
              {
                "room": "LAB 4",
                "mode": "virtual",
                "time": "14:30 – 16:00",
                "name": "Virtual Track – PES",
                "tracks": "PES, Sys. Control, Indust. Elec & Sign Proc, Education in Eng., TEM",
                "papers": 6
              }
            ]
          },
          {
            "time": "16:00 – 18:00",
            "type": "parallel",
            "papersLink": true,
            "sessions": [
              {
                "room": "LAB 1",
                "mode": "virtual",
                "time": "16:00 – 18:00",
                "name": "Virtual Track – CS & CIS",
                "tracks": "Computer Eng., CIS",
                "papers": 8
              },
              {
                "room": "LAB 2",
                "mode": "virtual",
                "time": "16:00 – 18:00",
                "name": "Virtual Track – CSS & EMBS",
                "tracks": "Sys. Control, Indust. Elec & Sign Proc, Eng. in Medicine & Bio.",
                "papers": 8
              },
              {
                "room": "LAB 3",
                "mode": "virtual",
                "time": "16:00 – 18:00",
                "name": "Virtual Track – IAS & RS",
                "tracks": "Industry Applications & Reliability, Robotics & Automation, CIS, Education in Eng.",
                "papers": 8
              },
              {
                "room": "LAB 4",
                "mode": "virtual",
                "time": "16:00 – 18:00",
                "name": "Virtual Track – IAS & RS",
                "tracks": "Industry Applications & Reliability, CIS, Comms., Education in Eng.",
                "papers": 8
              }
            ]
          }
        ]
      },
      {
        "id": "thu",
        "day": "Thursday",
        "date": "October 22",
        "venue": "Hotel Oro Verde",
        "rows": [
          {
            "time": "07:30 – 08:30",
            "type": "item",
            "activity": "Registrations",
            "location": "Hotel Oro Verde"
          },
          {
            "time": "08:30 – 09:30",
            "type": "item",
            "activity": "Opening Ceremony",
            "location": "Salón Oro Verde"
          },
          {
            "time": "09:30 – 10:30",
            "type": "keynote",
            "badge": "Keynote 1",
            "speaker": "Michael Tolley",
            "country": "USA",
            "talk": "Biologically Inspired Soft Robotics",
            "location": "Salón Oro Verde"
          },
          {
            "time": "10:30 – 11:00",
            "type": "break",
            "activity": "Coffee Break",
            "location": "Exhibit Hall & Fair"
          },
          {
            "time": "11:00 – 13:00",
            "type": "parallel",
            "papersLink": true,
            "sessions": [
              {
                "room": "Galápagos",
                "mode": "inperson",
                "time": "11:00 – 12:45",
                "name": "EdSoc I",
                "tracks": "Education in Eng.",
                "papers": 7
              },
              {
                "room": "Cuenca",
                "mode": "inperson",
                "time": "11:00 – 12:30",
                "name": "PES I",
                "tracks": "PES",
                "papers": 6
              },
              {
                "room": "Guayaquil",
                "mode": "inperson",
                "time": "11:00 – 12:45",
                "name": "EMBS I",
                "tracks": "Eng. in Medicine & Bio.",
                "papers": 5
              },
              {
                "room": "Machala",
                "mode": "inperson",
                "time": "11:00 – 12:45",
                "name": "CIS I",
                "tracks": "CIS",
                "papers": 6
              }
            ]
          },
          {
            "time": "13:00 – 14:30",
            "type": "break",
            "activity": "Lunch",
            "location": "Salón Manta"
          },
          {
            "time": "14:30 – 15:30",
            "type": "keynote",
            "badge": "Keynote 2",
            "speaker": "Luis Nando Ochoa",
            "country": "AUS",
            "talk": "The Future of DER Hosting Capacity and DER Orchestration",
            "location": "Salón Oro Verde"
          },
          {
            "time": "15:30 – 16:00",
            "type": "break",
            "activity": "Coffee Break",
            "location": "Exhibit Hall & Fair"
          },
          {
            "time": "16:00 – 18:00",
            "type": "parallel",
            "papersLink": true,
            "sessions": [
              {
                "room": "Galápagos",
                "mode": "inperson",
                "time": "16:00 – 17:30",
                "name": "RAS I",
                "tracks": "Robotics & Automation",
                "papers": 6
              },
              {
                "room": "Cuenca",
                "mode": "inperson",
                "time": "16:00 – 17:30",
                "name": "CSS & IES",
                "tracks": "Sys. Control, Indust. Elec & Sign Proc",
                "papers": 6
              },
              {
                "room": "Guayaquil",
                "mode": "inperson",
                "time": "16:00 – 17:30",
                "name": "Smart Mobility I",
                "tracks": "Smart Mobility",
                "papers": 6
              },
              {
                "room": "Machala",
                "mode": "inperson",
                "time": "16:00 – 17:30",
                "name": "ComSoc",
                "tracks": "Comms.",
                "papers": 6
              }
            ]
          },
          {
            "time": "18:00 – 20:00",
            "type": "social",
            "activity": "Welcome Cocktail",
            "location": "Terraza"
          }
        ]
      },
      {
        "id": "fri",
        "day": "Friday",
        "date": "October 23",
        "venue": "Hotel Oro Verde",
        "rows": [
          {
            "time": "07:30 – 08:30",
            "type": "item",
            "activity": "Registrations",
            "location": "Hotel Oro Verde"
          },
          {
            "time": "08:30 – 09:30",
            "type": "keynote",
            "badge": "Keynote 3",
            "speaker": "Sergio Gutiérrez",
            "country": "COL",
            "talk": "Self-Driving Networks: The present-future of networking",
            "location": "Salón Oro Verde"
          },
          {
            "time": "09:30 – 10:30",
            "type": "keynote",
            "badge": "Keynote 4",
            "speaker": "José Miguel García-Martín",
            "country": "ESP",
            "talk": "Nanostructured Columnar Thin Films by Magnetron Sputtering: From Fundamentals to Devices",
            "location": "Salón Oro Verde"
          },
          {
            "time": "10:30 – 11:00",
            "type": "break",
            "activity": "Coffee Break",
            "location": "Exhibit Hall & Fair"
          },
          {
            "time": "11:00 – 13:00",
            "type": "parallel",
            "papersLink": true,
            "sessions": [
              {
                "room": "Galápagos",
                "mode": "inperson",
                "time": "11:00 – 12:45",
                "name": "EdSoc II",
                "tracks": "Education in Eng.",
                "papers": 7
              },
              {
                "room": "Cuenca",
                "mode": "inperson",
                "time": "11:00 – 12:30",
                "name": "PES & CSS",
                "tracks": "PES, Sys. Control, Indust. Elec & Sign Proc",
                "papers": 7
              },
              {
                "room": "Guayaquil",
                "mode": "inperson",
                "time": "11:00 – 12:45",
                "name": "RAS & EMBS",
                "tracks": "Robotics & Automation, CIS",
                "papers": 7
              },
              {
                "room": "Machala",
                "mode": "inperson",
                "time": "11:00 – 12:30",
                "name": "CS, ComSoc & EDS",
                "tracks": "Computer Eng., Comms., Cir., Sys. & Elect. Devices",
                "papers": 6
              }
            ]
          },
          {
            "time": "13:00 – 14:30",
            "type": "break",
            "activity": "Lunch",
            "location": "Salón Manta"
          },
          {
            "time": "14:30 – 15:30",
            "type": "keynote",
            "badge": "Roundtable",
            "speaker": "Education",
            "talk": "From Generative AI to Agent-Based AI: New Frontiers in Engineering Education",
            "location": "Salón Oro Verde"
          },
          {
            "time": "15:30 – 16:00",
            "type": "break",
            "activity": "Coffee Break",
            "location": "Exhibit Hall & Fair"
          },
          {
            "time": "16:00 – 18:00",
            "type": "parallel",
            "papersLink": true,
            "sessions": [
              {
                "room": "Galápagos",
                "mode": "inperson",
                "time": "16:00 – 17:30",
                "name": "TEMS & CS",
                "tracks": "TEM, Education in Eng.",
                "papers": 5
              },
              {
                "room": "Cuenca",
                "mode": "inperson",
                "time": "16:00 – 17:30",
                "name": "IAS & RS",
                "tracks": "Industry Applications & Reliability, Sys. Control, Indust. Elec & Sign Proc",
                "papers": 6
              },
              {
                "room": "Guayaquil",
                "mode": "inperson",
                "time": "16:00 – 17:30",
                "name": "APS & EDS",
                "tracks": "AP-S, Cir., Sys. & Elect. Devices",
                "papers": 4
              },
              {
                "room": "Machala",
                "mode": "meeting",
                "time": "16:00 – 18:00",
                "name": "CO Meeting",
                "tracks": "Organizing Committee"
              }
            ]
          },
          {
            "time": "19:00 – 23:00",
            "type": "social",
            "activity": "Anniversary Dinner",
            "location": "Salón Oro Verde"
          }
        ]
      },
      {
        "id": "sat",
        "day": "Saturday",
        "date": "October 24",
        "venue": "Hotel Oro Verde",
        "rows": [
          {
            "time": "07:30 – 08:30",
            "type": "item",
            "activity": "Registrations",
            "location": "Hotel Oro Verde"
          },
          {
            "time": "08:30 – 10:30",
            "type": "parallel",
            "papersLink": true,
            "sessions": [
              {
                "room": "Galápagos",
                "mode": "inperson",
                "time": "08:30 – 10:00",
                "name": "EdSoc III",
                "tracks": "Education in Eng.",
                "papers": 5
              },
              {
                "room": "Cuenca",
                "mode": "inperson",
                "time": "08:30 – 10:00",
                "name": "PES II",
                "tracks": "PES",
                "papers": 4
              },
              {
                "room": "Guayaquil",
                "mode": "inperson",
                "time": "08:30 – 10:00",
                "name": "EMBS II",
                "tracks": "Eng. in Medicine & Bio.",
                "papers": 5
              },
              {
                "room": "Machala",
                "mode": "inperson",
                "time": "08:30 – 10:00",
                "name": "Smart Mobility II",
                "tracks": "Smart Mobility, CIS",
                "papers": 5
              }
            ]
          },
          {
            "time": "10:30 – 11:30",
            "type": "keynote",
            "badge": "Keynote 5",
            "speaker": "Mariela Cerrada",
            "country": "ECU/USA",
            "talk": "Building Reliable Intelligent Maintenance",
            "location": "Salón Oro Verde"
          },
          {
            "time": "11:30 – 12:30",
            "type": "item",
            "activity": "Closure & Awards",
            "location": "Hotel Oro Verde"
          },
          {
            "time": "12:30 – 13:00",
            "type": "social",
            "activity": "Closing Cocktail Reception",
            "location": "Hotel Oro Verde"
          },
          {
            "time": "17:00 – 19:00",
            "type": "optional",
            "activity": "Guayas River Cruise & City Views",
            "location": "Guayas River"
          }
        ]
      }
    ]
  };

  /* ---------- utilidades ---------- */
  function esc(v) {
    return String(v == null ? '' : v)
      .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;').replace(/'/g, '&#39;');
  }
  function isReady(url) {
    return typeof url === 'string' && url.length > 0 && url.indexOf(PLACEHOLDER) !== 0;
  }
  function fileNameFrom(url) {
    try { return decodeURIComponent(url.split('?')[0].split('/').pop()) || 'program.pdf'; }
    catch (e) { return 'program.pdf'; }
  }

  var ICON_DL = '<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M12 3v12m0 0l-5-5m5 5l5-5M5 21h14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>';
  var MODE_LABEL = { virtual: 'Virtual', inperson: 'In-person', meeting: 'Meeting' };

  function injectCss() {
    if (document.getElementById('ieee-glance-css')) return;
    var l = document.createElement('link');
    l.id = 'ieee-glance-css';
    l.rel = 'stylesheet';
    l.href = BASE + 'style.css';
    document.head.appendChild(l);
  }

  /* ---------- descargas (fetch→blob para forzar descarga en Chrome/Edge) ---------- */
  function forceDownload(e) {
    var a = e.currentTarget;
    var url = a.getAttribute('href');
    if (!isReady(url) || !window.fetch || !window.URL || !URL.createObjectURL) return;
    e.preventDefault();
    var name = a.getAttribute('download') || fileNameFrom(url);
    a.classList.add('is-loading');
    fetch(url, { credentials: 'same-origin' })
      .then(function (r) { if (!r.ok) throw new Error(r.status); return r.blob(); })
      .then(function (blob) {
        var obj = URL.createObjectURL(blob);
        var tmp = document.createElement('a');
        tmp.href = obj; tmp.download = name;
        document.body.appendChild(tmp); tmp.click(); tmp.remove();
        setTimeout(function () { URL.revokeObjectURL(obj); }, 4000);
      })
      .catch(function () { window.location.href = url; })
      .then(function () { a.classList.remove('is-loading'); });
  }

  function dlLink(file, extraClass) {
    if (!isReady(file.url)) {
      return '<span class="pg-dl ' + (extraClass || '') + ' is-disabled" aria-disabled="true">' +
        ICON_DL + '<span class="pg-dl-text"><strong>' + esc(file.label) + '</strong>' +
        '<small>Available soon</small></span></span>';
    }
    return '<a class="pg-dl ' + (extraClass || '') + '" href="' + esc(file.url) + '" download="' +
      esc(fileNameFrom(file.url)) + '">' + ICON_DL + '<span class="pg-dl-text"><strong>' +
      esc(file.label) + '</strong>' + (file.description ? '<small>' + esc(file.description) + '</small>' : '') +
      '</span></a>';
  }

  /* ---------- bloques ---------- */
  function renderHeader(meta, days) {
    var nav = days.map(function (d) {
      return '<a class="pg-jump" href="#pg-day-' + esc(d.id) + '">' +
        '<span>' + esc(d.day.slice(0, 3)) + '</span><b>' + esc(d.date.replace(/^\D+/, '')) + '</b></a>';
    }).join('');
    return '<header class="pg-head">' +
      '<h2 class="pg-title">' + esc(meta.title) + '</h2>' +
      '<p class="pg-sub">' + esc(meta.subtitle) + '</p>' +
      '<nav class="pg-jumps" aria-label="Jump to day">' + nav + '</nav>' +
      '</header>';
  }

  function renderDownloads(dl) {
    var groups = (dl.groups || []).map(function (g) {
      return '<div class="pg-dlgroup pg-mode-' + esc(g.mode) + '">' +
        '<div class="pg-dlgroup-head"><span class="pg-chip pg-chip-' + esc(g.mode) + '">' +
        esc(MODE_LABEL[g.mode] || g.mode) + '</span><h3>' + esc(g.title) + '</h3>' +
        '<p>' + esc(g.subtitle) + '</p></div>' +
        '<div class="pg-dlgroup-files">' + g.files.map(function (f) { return dlLink(f); }).join('') + '</div>' +
        '</div>';
    }).join('');
    return '<section class="pg-downloads" aria-label="Downloads">' +
      '<div class="pg-dl-main">' + dlLink(dl.general, 'pg-dl-primary') + '</div>' +
      '<div class="pg-dlgroups">' + groups + '</div>' +
      '</section>';
  }

  function renderNote(meta) {
    var link = isReady(meta.acceptedPapersUrl)
      ? meta.note.replace('Accepted Papers', '<a href="' + esc(meta.acceptedPapersUrl) + '">Accepted Papers</a>')
      : esc(meta.note);
    // Negrita en el inicio, como en el modelo de referencia
    link = link.replace(/^Technical paper sessions/, '<strong>Technical paper sessions</strong>');
    return '<p class="pg-note">' + link + '</p>';
  }

  function renderSessionCard(s) {
    var mode = s.mode || 'inperson';
    return '<div class="pg-card pg-card-' + esc(mode) + '">' +
      '<div class="pg-card-top"><span class="pg-room">' + esc(s.room) + '</span>' +
      '<span class="pg-chip pg-chip-' + esc(mode) + '">' + esc(MODE_LABEL[mode] || mode) + '</span></div>' +
      '<div class="pg-card-time">' + esc(s.time) + '</div>' +
      '<div class="pg-card-name">' + esc(s.name) + '</div>' +
      (s.tracks ? '<div class="pg-card-tracks">' + esc(s.tracks) + '</div>' : '') +
      (s.papers ? '<div class="pg-card-papers">' + esc(s.papers) + ' papers</div>' : '') +
      '</div>';
  }

  function renderRow(r, meta) {
    var type = r.type || 'item';
    var time = '<div class="pg-time">' + esc(r.time) + '</div>';

    if (type === 'parallel') {
      var btn = (r.papersLink && isReady(meta.acceptedPapersUrl))
        ? '<a class="pg-btn" href="' + esc(meta.acceptedPapersUrl) + '">View accepted papers</a>' : '';
      return '<div class="pg-row pg-row-parallel" role="row">' + time +
        '<div class="pg-parallel" role="cell">' +
        '<div class="pg-parallel-label">Technical Paper Sessions <span>· parallel rooms</span></div>' +
        '<div class="pg-cards">' + r.sessions.map(renderSessionCard).join('') + '</div>' + btn +
        '</div></div>';
    }

    var activity;
    if (type === 'keynote') {
      activity = '<span class="pg-badge">' + esc(r.badge) + '</span>' +
        '<span class="pg-speaker">' + esc(r.speaker) +
        (r.country ? ' <span class="pg-country">(' + esc(r.country) + ')</span>' : '') + '</span>' +
        (r.talk ? '<span class="pg-talk">' + esc(r.talk) + '</span>' : '');
    } else if (type === 'optional') {
      activity = '<span class="pg-badge pg-badge-soft">Optional</span>' + esc(r.activity);
    } else if (type === 'social') {
      activity = '<span class="pg-badge pg-badge-social">Social</span>' + esc(r.activity);
    } else {
      activity = esc(r.activity);
    }

    return '<div class="pg-row pg-row-' + esc(type) + '" role="row">' + time +
      '<div class="pg-activity" role="cell">' + activity + '</div>' +
      '<div class="pg-location" role="cell">' + esc(r.location || '') + '</div></div>';
  }

  function renderDay(d, meta) {
    return '<section class="pg-day" id="pg-day-' + esc(d.id) + '">' +
      '<div class="pg-day-head">' +
      '<span class="pg-dot" aria-hidden="true"></span>' +
      '<div class="pg-day-name"><h3>' + esc(d.day) + '</h3><span>' + esc(d.venue) + '</span></div>' +
      '<span class="pg-date">' + esc(d.date) + '</span></div>' +
      '<div class="pg-table" role="table" aria-label="' + esc(d.day + ', ' + d.date) + '">' +
      '<div class="pg-row pg-row-th" role="row"><div role="columnheader">Time</div>' +
      '<div role="columnheader">Activity</div><div role="columnheader">Location</div></div>' +
      d.rows.map(function (r) { return renderRow(r, meta); }).join('') +
      '</div></section>';
  }

  function render(mount, data) {
    mount.innerHTML =
      '<div class="pg-wrap">' +
      renderHeader(data.meta, data.days) +
      renderDownloads(data.downloads) +
      renderNote(data.meta) +
      data.days.map(function (d) { return renderDay(d, data.meta); }).join('') +
      '</div>';

    var links = mount.querySelectorAll('a.pg-dl');
    for (var i = 0; i < links.length; i++) links[i].addEventListener('click', forceDownload);

    // Salto suave a cada día (compensa el header fijo del tema)
    var jumps = mount.querySelectorAll('a.pg-jump');
    for (var j = 0; j < jumps.length; j++) {
      jumps[j].addEventListener('click', function (e) {
        var t = document.querySelector(this.getAttribute('href'));
        if (!t) return;
        e.preventDefault();
        var y = t.getBoundingClientRect().top + window.pageYOffset - 110;
        window.scrollTo({ top: y, behavior: 'smooth' });
      });
    }
  }

  function boot() {
    var mount = document.getElementById(MOUNT_ID);
    if (!mount) { console.warn('[ETCM glance] No se encontró #' + MOUNT_ID); return; }
    injectCss();
    window.ETCM_GLANCE.data = PROGRAM_DATA;
    render(mount, PROGRAM_DATA);
  }

  window.ETCM_GLANCE = {
    base: BASE,
    data: null,
    diagnose: function () {
      var d = this.data;
      if (!d) return console.warn('Datos aún no cargados. base =', BASE);
      var pending = [];
      if (!isReady(d.meta.acceptedPapersUrl)) pending.push('meta.acceptedPapersUrl');
      if (!isReady(d.downloads.general.url)) pending.push('downloads.general');
      d.downloads.groups.forEach(function (g) {
        g.files.forEach(function (f) { if (!isReady(f.url)) pending.push(g.title + ' → ' + f.label); });
      });
      console.table(d.days.map(function (x) {
        var sessions = x.rows.reduce(function (n, r) { return n + (r.sessions ? r.sessions.length : 0); }, 0);
        return { day: x.day, date: x.date, rows: x.rows.length, parallelSessions: sessions };
      }));
      console.log('URLs pendientes:', pending.length ? pending : 'ninguna');
    }
  };

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot);
  else boot();
})();
