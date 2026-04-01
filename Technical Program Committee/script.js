const scholarIconPath = "/images/logo/google-academico.png";
const linkedInIconPath = "/images/logo/linkedin.png";

const committeeData = [
  {
    title: "Technical Program Chair",
    people: [
      {
        name: "René Vinicio Sánchez",
        institution: "Universidad Politécnica Salesiana - UPS Cuenca",
        scholar: "#",
      },
      {
        name: "Luis Ugarte",
        institution: "Escuela Superior Politécnica del Litoral - ESPOL",
        scholar: "#",
      },
    ],
  },
  {
    title: "Technical Chapter Tracks",
    tracks: [
      {
        name: "Antennas and Propagation",
        people: [
          {
            name: "Carlos Peñafiel-Ojeda",
            institution: "Universidad Nacional de Chimborazo - UNACH",
            scholar: "#",
          },
        ],
      },
      {
        name: "Circuits, Systems and Electron Devices",
        people: [
          {
            name: "Luis Javier Serpa",
            institution: "Universidad Politécnica Salesiana - UPS Cuenca",
            scholar: "#",
          },
        ],
      },
      {
        name: "Communications, IoT & Cybersecurity",
        people: [
          {
            name: "Alcides Lara Cueva",
            institution: "Universidad de las Fuerzas Armadas - ESPE",
            scholar: "#",
          },
          {
            name: "Henry Carvajal",
            institution: "Universidad San Francisco de Quito - USFQ",
            scholar: "#",
          },
        ],
      },
      {
        name: "Computational Intelligence",
        people: [
          {
            name: "Jorge Párraga",
            institution: "Universidad Técnica de Manabí - UTM",
            scholar: "#",
          },
        ],
      },
      {
        name: "Computer and Software Engineering",
        people: [
          {
            name: "Erwin Jairo Sacoto Cabrera",
            institution: "Universidad Politécnica Salesiana - UPS Cuenca",
            scholar: "#",
          },
        ],
      },
      {
        name: "Education in Engineering",
        people: [
          {
            name: "Ronny Cabrera",
            institution: "Universidad Técnica Particular de Loja - UTPL",
            scholar: "#",
          },
          {
            name: "Erick Lamilla",
            institution: "Escuela Superior Politécnica del Litoral - ESPOL",
            scholar: "#",
          },
        ],
      },
      {
        name: "Engineering in Medicine and Biology",
        people: [
          {
            name: "Edwin Valarezo Añazco",
            institution: "Escuela Superior Politécnica del Litoral - ESPOL",
            scholar: "#",
          },
          {
            name: "Yesenia Cevallos",
            institution: "Universidad Nacional de Chimborazo - UNACH",
            scholar: "#",
          },
        ],
      },
      {
        name: "Industry Applications and Reliability",
        people: [
          {
            name: "Deiver Jiménez-Santín",
            institution: "Universidad Politécnica Salesiana - UPS Cuenca",
            scholar: "#",
          },
          {
            name: "Mariela Cerrada-Lozada",
            institution: "Universidad Estatal de Milagro - UNEMI",
            scholar: "#",
          },
        ],
      },
      {
        name: "Industrial Electronics, Systems Control & Signal Processing",
        people: [
          {
            name: "Ricardo Cajo",
            institution: "Escuela Superior Politécnica del Litoral - ESPOL",
            scholar: "#",
          },
        ],
      },
      {
        name: "Power and Energy",
        people: [
          {
            name: "Diego Echeverría",
            institution: "Escuela Politécnica Nacional - EPN",
            scholar: "#",
          },
        ],
      },
      {
        name: "Robotics and Automation",
        people: [
          {
            name: "Francisco Yumbla",
            institution: "Escuela Superior Politécnica del Litoral - ESPOL",
            scholar: "#",
          },
          {
            name: "Jorge Buele",
            institution: "Universidad Indoamérica - UTI",
            scholar: "#",
          },
        ],
      },
      {
        name: "Smart Cities & Mobility",
        people: [
          {
            name: "Luis Ugarte",
            institution: "Escuela Superior Politécnica del Litoral - ESPOL",
            scholar: "#",
          },
        ],
      },
      {
        name: "Technology and Engineering Management",
        people: [
          {
            name: "Maria de los Angeles Carrión Herrera",
            institution: "Grupo BusinessIT",
            scholar: "#",
          },
          {
            name: "Wilmar Hernández",
            institution: "Universidad de las Américas - UDLA",
            scholar: "#",
          },
        ],
      },
    ],
  },
];

function createScholarLink(person) {
  const usesLinkedInIcon = person.name === "Maria de los Angeles Carrión Herrera";
  const iconPath = usesLinkedInIcon ? linkedInIconPath : scholarIconPath;
  const ariaLabel = usesLinkedInIcon
    ? `LinkedIn profile for ${person.name}`
    : `Google Scholar profile for ${person.name}`;

  return `
    <a class="scholar-badge" href="${person.scholar || "#"}" aria-label="${ariaLabel}">
      <img src="${iconPath}" alt="">
    </a>
  `;
}

function renderPersonCard(person) {
  return `
    <article class="person-card">
      <h3>${person.name} ${createScholarLink(person)}</h3>
      <p>${person.institution}</p>
    </article>
  `;
}

function renderPeopleGrid(people) {
  return `<div class="person-grid">${people.map(renderPersonCard).join("")}</div>`;
}

function renderTrack(track) {
  return `
    <li>
      <span class="track-name">${track.name}</span>
      ${renderPeopleGrid(track.people)}
    </li>
  `;
}

function renderSection(section) {
  if (section.people) {
    return `
      <section class="tpc-section">
        <h2>${section.title}</h2>
        ${renderPeopleGrid(section.people)}
      </section>
    `;
  }

  if (section.tracks) {
    return `
      <section class="tpc-section">
        <h2>${section.title}</h2>
        <ul>${section.tracks.map(renderTrack).join("")}</ul>
      </section>
    `;
  }

  return "";
}

function renderCommittee() {
  const root = document.getElementById("tpc-root");
  if (!root) {
    return;
  }

  root.innerHTML = committeeData.map(renderSection).join("");
}

document.addEventListener("DOMContentLoaded", renderCommittee);
