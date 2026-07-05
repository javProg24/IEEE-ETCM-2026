const tutorials = [
  {
    title: "Quantifying the DER Hosting Capacity of Distribution Networks: Models, Considerations and Tools",
    summary: [
      "Distribution companies all over the world are finding it challenging to quantify the ability of their existing low and medium voltage networks to host residential Distributed Energy Resources (DER), such as photovoltaic (PV) systems and electric vehicles (EVs). This quantification, known as Hosting Capacity, is also needed to assess different potential solutions that could increase DER uptake. Thus, it is crucial for distribution companies to carry out adequate DER hosting capacity quantifications using appropriate models, considerations, and tools. The foundations part of this tutorial will present and discuss different aspects required to quantify the residential DER hosting capacity of distribution networks, particularly focusing on solar PV and EVs. Using realistic case studies from urban and rural integrated MV-LV networks from Australia, this tutorial will explain and demonstrate the benefits but also the potential challenges and limitations of exploiting existing assets as well as the capabilities of DER. During the hands-on part, attendees will have the opportunity to learn about the basics of realistic modelling and analysis of distribution networks with solar photovoltaics using advanced tools. Attendees will use the programming language Python and the advanced distribution network analysis tool OpenDSS, an open-source tool developed by the Electric Power Research Institute (EPRI) in the US. OpenDSS will be used entirely with Python code thanks to the dss_python module developed by researchers at the University of Campinas in Brazil. And, to guide you, all will be done using Jupyter Notebook."
    ],
    duration: "5 hours (3 hours Foundations + 2 hours Hands-On)",
    requirements: [
      [
        { text: "Install Python (Anaconda) and Jupyter Notebook — " },
        { link: "anaconda.com/products/distribution", href: "https://www.anaconda.com/products/distribution" }
      ],
      [
        { text: "Install the " },
        { code: "dss_python" },
        { text: " module by running " },
        { code: "python -m pip install dss_python" },
        { text: " in the Anaconda Prompt" }
      ],
      [
        { text: "Software repositories will be shared after registration — " },
        { link: "github.com/Team-Nando", href: "https://github.com/Team-Nando" }
      ]
    ],
    speaker: {
      foto: "https://attend.ieee.org/etcm-2026/wp-content/uploads/sites/825/Luis-Nando-Ochoa-page-00001-scaled.jpg",
      fotoPosition: "center 15%",
      nombre: "Prof. Luis (Nando) Ochoa",
      rol: "Professor of Smart Grids and Power Systems, Dept. of Electrical and Electronic Engineering, The University of Melbourne",
      country:"Australia",
      bandera:"https://upload.wikimedia.org/wikipedia/commons/b/b9/Flag_of_Australia.svg",
      extraLogo: "https://attend.ieee.org/etcm-2026/wp-content/uploads/sites/825/logo-PES-EC-color-e1783197351585.png",
      bio: [
        "He leads one of the world's leading research teams in smart grids. He is a professor of Smart Grids and Energy Systems at the University of Melbourne and the chief scientist and co-founder of VoltMind. He specializes in electric distribution networks, particularly in the integration of distributed energy resources (DERs) and the use of data-driven and artificial intelligence techniques to achieve smarter, low-carbon grids. He is also a distinguished lecturer and a senior member of IEEE PES, and served on the editorial board of the journal IEEE Power and Energy. Before joining the University of Melbourne, he held academic positions at the University of Manchester and a research position at the University of Edinburgh. At VoltMind, he contributes to the development of advanced software tools that meet the evolving needs of electric distribution utilities.",
        "Over the years, the research team has worked on major academic and industrial projects, resulting in more than 230 research articles in top-tier international peer-reviewed journals and conferences, more than 90 technical reports, and two patents — one filed by Psymetrix Ltd and the other by the University of Melbourne."
      ]
    }
  }
];


const container = document.getElementById("tutorials-container");

function escapeHTML(value) {
  const element = document.createElement("div");
  element.textContent = String(value);
  return element.innerHTML;
}

function renderParagraphs(paragraphs) {
  return (paragraphs || [])
    .map(function (paragraph) {
      return String(paragraph).trim();
    })
    .filter(Boolean)
    .map(function (paragraph) {
      return "<p>" + escapeHTML(paragraph) + "</p>";
    })
    .join("");
}

function renderRequirement(segments) {
  return (
    "<li>" +
    segments
      .map(function (segment) {
        if (segment.link) {
          return (
            '<a href="' +
            escapeHTML(segment.href) +
            '">' +
            escapeHTML(segment.link) +
            "</a>"
          );
        }
        if (segment.code) {
          return "<code>" + escapeHTML(segment.code) + "</code>";
        }
        return escapeHTML(segment.text);
      })
      .join("") +
    "</li>"
  );
}

function renderTutorials() {
  if (!container) {
    return;
  }

  container.innerHTML = "";

  tutorials.forEach(function (tutorial) {
    const tutorialElement = document.createElement("article");
    tutorialElement.className = "section tutorial-card";

    const speaker = tutorial.speaker || {};
    const speakerName = escapeHTML(speaker.nombre);

    const photoStyle = speaker.fotoPosition
      ? ' style="object-position: ' + escapeHTML(speaker.fotoPosition) + '"'
      : "";

    tutorialElement.innerHTML =
      '<div class="section__header">' +
        "<h2>" + escapeHTML(tutorial.title) + "</h2>" +
      "</div>" +

      '<div class="tutorial-summary">' +
        '<div class="collapsible-content">' + renderParagraphs(tutorial.summary) + "</div>" +
        '<button class="collapse-toggle" type="button" aria-expanded="false">Read more</button>' +
      "</div>" +

      '<p class="tutorial-meta"><strong>Duration:</strong> ' + escapeHTML(tutorial.duration) + "</p>" +

      '<div class="content-card">' +
        "<h3>Requirements</h3>" +
        '<ul class="tutorial-requirements">' +
          (tutorial.requirements || []).map(renderRequirement).join("") +
        "</ul>" +
      "</div>" +

      '<div class="speaker-block">' +
        '<p class="section__kicker">About the speaker</p>' +
        '<div class="speaker">' +
          '<div class="speaker-photo-col">' +
            '<div class="speaker-photo">' +
              '<img src="' + escapeHTML(speaker.foto) + '" alt="' + speakerName + '"' + photoStyle + ">" +
            "</div>" +
            '<p class="speaker-name">' + speakerName + "</p>" +
            '<p class="speaker-role">' + escapeHTML(speaker.rol) + "</p>" +
            (speaker.country
              ? '<p class="speaker-country">' +
                (speaker.bandera
                  ? '<img class="flag-icon" src="' + escapeHTML(speaker.bandera) + '" alt="Flag of ' + escapeHTML(speaker.country) + '">'
                  : "") +
                "<span>" + escapeHTML(speaker.country) + "</span></p>"
              : "") +
            (speaker.extraLogo ? '<img class="speaker-extra-logo" src="' + escapeHTML(speaker.extraLogo) + '" alt="' + speakerName + ' distinction logo">' : "") +
          "</div>" +
          '<div class="speaker-bio">' +
            '<div class="collapsible-content">' + renderParagraphs(speaker.bio) + "</div>" +
            '<button class="collapse-toggle" type="button" aria-expanded="false">Read more</button>' +
          "</div>" +
        "</div>" +
      "</div>";

    container.appendChild(tutorialElement);

    tutorialElement.querySelectorAll(".collapsible-content").forEach(function (content) {
      setupCollapse(content);
    });
  });
}

function setupCollapse(content) {
  const button = content.nextElementSibling;
  if (!button || !button.classList.contains("collapse-toggle")) {
    return;
  }

  if (content.scrollHeight <= content.clientHeight + 4) {
    button.style.display = "none";
    return;
  }

  button.addEventListener("click", function () {
    const isExpanded = button.getAttribute("aria-expanded") === "true";

    if (isExpanded) {
      content.style.maxHeight = "";
      button.textContent = "Read more";
      button.setAttribute("aria-expanded", "false");
    } else {
      content.style.maxHeight = content.scrollHeight + "px";
      button.textContent = "Read less";
      button.setAttribute("aria-expanded", "true");
    }
  });
}

renderTutorials();
