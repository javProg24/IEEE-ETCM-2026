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
  },
  {
    title:"Building Critical Infrastructure Resilience Against Natural Hazards: Technical, Economic, and Social Aspects",
    summary:[
      "Critical infrastructure systems are increasingly exposed to natural hazards that can damage physical assets, disrupt essential services, and generate significant economic and social consequences. Earthquakes, volcanic eruptions, lahars, floods, wildfires, and extreme weather events can affect electricity, transportation, telecommunications, water supply, healthcare, and other interconnected systems.",
      "This tutorial introduces the fundamental concepts, frameworks, and methods used to assess and strengthen critical infrastructure resilience. It integrates technical assessment with economic analysis, social considerations, and public policy, addressing topics such as hazard exposure, infrastructure vulnerability, system interdependencies, cascading failures, resilience metrics, service restoration, and risk-informed planning.",
      "Real-world examples from Latin America, including applications to Ecuadorian infrastructure and power systems, will illustrate how resilience strategies can support infrastructure investment, emergency preparedness, institutional coordination, and the protection of communities and essential services. The tutorial is intended for participants from engineering, economics, policymaking, risk management, and related disciplines."
    ],
    duration:"4 hours (Theory and practical exercises)",
    requirements:[
      [
        {text:"Install Python (Anaconda). Download — "},
        {link:"anaconda.com/products/distribution", href:"https://www.anaconda.com/download/success?reg=skipped"}
      ],
      [
        {text:"Microsoft Excel"}
      ],
      [
        {text:"Install the "},
        {code:"pandapower"},
        {text:" module in your Python environment — "},
        {link:"pandapower.org", href:"https://www.pandapower.org/"}
      ],
      [
        {text:"Materials and practical exercises will be shared after registration"}
      ]
    ],
    speaker:{
      foto:"https://attend.ieee.org/etcm-2026/wp-content/uploads/sites/825/Alex-Villamarin.jpg",
      fotoPosition:"center 15%",
      nombre:"Dr. Alex Villamarin",
      rol:"Professor, Universidad de las Fuerzas Armadas ESPE, Ecuador",
      country:"Ecuador",
      bandera:"https://upload.wikimedia.org/wikipedia/commons/e/e8/Flag_of_Ecuador.svg",
      bio:[
        "Alex Villamarín is a Professor in the Department of Electrical, Electronics, and Telecommunications Engineering at Universidad de las Fuerzas Armadas ESPE. He holds a PhD and an MSc in Electrical Engineering from the University of Chile. He also serves as a Project Leader at the Instituto Sistemas Complejos de Ingeniería (ISCI) and as a researcher at the Centro de Energía ENLACE. In these roles, he has participated in and led research and consulting projects for industry associations, public institutions, and electric utilities in Chile",
        "With over ten years of experience in the energy sector, his work focuses on power system planning and operation, infrastructure resilience to natural hazards, energy storage, and the long-term energy transition. His research has addressed the technical and socioeconomic impacts of disruptive events, including earthquakes, volcanic hazards, and extreme hydrological conditions. He currently leads several research and collaborative projects involving academic, public, and private-sector institutions in Ecuador.",
        "He has authored more than 30 peer-reviewed journal and conference publications. He is an IEEE Senior Member, a member of the IEEE Ecuador Section Young Professionals Committee, Technical Program Lead for the IEEE PES Young Professionals Region 9 Committee, and Lead for Regions 1–7 and 9 of the IEEE PES Student Chapters Committee Event of the Month Program."
      ]
    }
  },
  {
    title:"Deep Learning for the Classification of Arrhythmias in ECG Signals",
    summary:[
      "Electrocardiographic (ECG) signal analysis is a fundamental tool for identifying abnormalities in cardiac rhythm. However, interpreting and classifying these signals can be challenging due to signal variability and the need to identify specific patterns within large volumes of data.",
      "In this context, Artificial Intelligence techniques—particularly deep neural networks—offer tools to automate feature extraction and the classification of biomedical signals. This tutorial introduces participants to the fundamentals of Deep Learning applied to ECG analysis, using arrhythmia classification with a one-dimensional Convolutional Neural Network (1D CNN) architecture as a case study.",
      "The content is based on the work “A Deep Learning-Based Algorithm for ECG Arrhythmia Classification,” published at the 2023 IEEE 13th International Conference on Pattern Recognition Systems (ICPRS), where 1D CNN and ResNet models were developed to classify five types of heartbeats present in ECG signals using the MIT-BIH Arrhythmia Database. The CNN model achieved 96.33% accuracy and a 96.34% F1-score on the test set.",
      "The proposal combines theoretical foundations with hands-on implementation experience, allowing participants to understand not only Deep Learning concepts but also the full workflow of a biomedical signal classification problem — from data preparation through model training and evaluation."
    ],
    duration:"3 hours (Theory and hands-on practice)",
    requirements:[
      [
        { text: "The presenter will share the working notebook, processed dataset, and supporting files through a public GitHub repository (link to be provided by the speaker)" }
      ]
    ],
    speaker:{
      foto:"https://attend.ieee.org/etcm-2026/wp-content/uploads/sites/825/foto_perfil_expositor_Vicente-EMBS.png",
      fotoPosition:"center 15%",
      nombre:"Ing. Vicente Alvarado",
      rol:"Mechatronics Engineer & Researcher, Robotics and Drones Laboratory, Information Technology Center (CTI), ESPOL",
      country: "Ecuador",
      bandera:"https://upload.wikimedia.org/wikipedia/commons/e/e8/Flag_of_Ecuador.svg",
      bio:[
        "Vicente Alvarado is a Mechatronics Engineer graduated from Escuela Superior Politécnica del Litoral (ESPOL) and currently works as a researcher at the Robotics and Drones Laboratory of ESPOL's Information Technology Center (CTI). He is passionate about the convergence between robotics and artificial intelligence.",
        "His work focuses on the integration of Artificial Intelligence, signal processing, and robotic systems. He has experience in time-series signal processing, the development and training of Deep Learning models, sensor integration, and the design of human-machine interaction (HCI) systems.",
        "He also has experience in robotics and unmanned aerial systems, including hardware and software integration, development under ROS 2, and the use of Software-in-the-Loop (SITL) simulation environments.",
        "In the field of biomedical signal processing, he is a co-author of “A Deep Learning-Based Algorithm for ECG Arrhythmia Classification,” published at IEEE ICPRS 2023, which studied the use of 1D CNN and ResNet architectures for the automatic classification of five arrhythmia classes present in ECG signals. He led the implementation and computational experiments presented in that article, including data preparation, model training, and performance evaluation. For this tutorial, he will make the original code and resources available in a public GitHub repository, including the working notebook, processed datasets, and the files needed to reproduce a one-dimensional convolutional neural network (1D CNN) for cardiac arrhythmia classification."
      ]
    }
  },
  {
    title: "Responsible AI-Assisted Research by Design: Ethics, Human Oversight and Research Integrity",
    summary: [
      "The incorporation of artificial intelligence into research allows researchers to review study designs, analyze data, and support methodological decisions — but it also introduces risks when its recommendations are adopted without sufficient scrutiny by the researcher.",
      "This tutorial works through a research case in which artificial intelligence is incorporated as support for different decisions throughout the research process. Participants will review the proposed design, analyze how the data are used, and apply the Data Ethics Canvas from the Open Data Institute (ODI) before comparing their decisions against the evidence produced by a predictive model. The exercise takes place in an interactive environment and draws on UNESCO's Recommendation on the Ethics of Artificial Intelligence as well as applicable Ecuadorian regulations.",
      "The tutorial will be delivered in a laboratory format built around a single case study and an interactive environment. Participants will progress as researchers through the same process: defining an initial design, receiving and evaluating AI-assisted guidance, reviewing decisions using the Open Data Institute's (ODI) Data Ethics Canvas, and comparing their approach against the evidence produced by a reference predictive model.",
      "The session will combine brief instructor explanations with hands-on work, results analysis, and discussion. The application will keep a full trace of decisions, allowing participants to compare their initial approach with their final, evidence-based decision — supported by arguments, ethical considerations, and model evidence."
    ],
    duration: "3 hours",
    requirements: [
      [
        { text: "The tutorial runs in an interactive web-based environment provided by the speaker; no specific software installation was indicated" }
      ]
    ],
    speaker:{
      foto:"https://attend.ieee.org/etcm-2026/wp-content/uploads/sites/825/Ing.-Gilda-Taranto.png",
      fotoPosition: "center 15%",
      nombre: "Ing. Gilda Taranto",
      rol: "Graduate Professor, Universidad Estatal de Milagro & Universidad Casa Grande, Ecuador — PhD Candidate in Applied Multivariate Statistics, Universidad de Salamanca (USAL)",
      country: "Ecuador",
      bandera: "https://upload.wikimedia.org/wikipedia/commons/e/e8/Flag_of_Ecuador.svg",
      bio: [
        "Gilda Taranto holds a degree in Statistical and Computer Engineering from Escuela Superior Politécnica del Litoral (ESPOL) and a Master's degree in Advanced Multivariate Data Analysis and Big Data from the Universidad de Salamanca (USAL), where she is currently a PhD candidate in Applied Multivariate Statistics. She has more than ten years of experience in data management and analysis and seven years as a teaching researcher.",
        "Her academic career spans data analytics, applied research, and educational management and innovation. She has been part of ESPOL's Learning Analytics and Technologies Group at the Information Technology Center and has participated in research projects at Universidad de Guayaquil, where she directed the Center for Innovation and Development in Applied Multivariate Statistics and an FCI project focused on positioning Ecuadorian universities using machine learning techniques. She currently teaches graduate courses at Universidad Estatal de Milagro and Universidad Casa Grande and supervises research and scientific production.",
        "She is the author of indexed publications in machine learning, data mining, and educational research, and of the book “Aprendizajes éticos con inteligencia artificial: sistematización de una experiencia formativa” (“Ethical Learning with Artificial Intelligence: Systematizing a Training Experience”), which examines the use of artificial intelligence from an ethical and reflective perspective in higher education, highlighting the role of human oversight and responsible use of these technologies in educational processes. She is a member of the Ecuadorian Statistical Society and the International Biometric Society."
      ]
    }
  },
  {
    title: "From Data to Deployment: Robust Banana Ripeness Classification under Illumination Variability with CREDA",
    summary: [
      "Automated fruit-quality inspection using computer vision has achieved high classification performance under controlled acquisition conditions; however, real-world deployment remains challenging, since illumination changes, shadows, reflections, and other environmental factors can alter the visual appearance of agricultural products and degrade model performance. This hands-on tutorial presents a complete, reproducible workflow for classifying banana ripeness under variable lighting conditions, using an open-access image dataset and the BananaRipenessCREDA framework.",
      "Participants will work with four ripeness stages — Green, Partially Ripe, Ripe, and Overripe — and analyze how illumination variability affects the performance of deep learning models. The tutorial covers dataset exploration and preparation, training of pretrained architectures, analysis under different lighting conditions, and the application of Domain Adaptation via Rényi Conditional Entropy (CREDA) to reduce the discrepancy between domains and improve the robustness of the learned representations.",
      "Model training and evaluation will be carried out interactively in Google Colab, allowing participants to analyze classification metrics, confusion matrices, and UMAP visualizations of the latent space. Finally, the resulting model will be integrated into an interactive application hosted on Hugging Face, where participants can upload new banana images and obtain ripeness predictions — completing a reproducible workflow that spans data preparation, model training, robustness analysis, and practical deployment for precision-agriculture applications."
    ],
    duration: "2 hours (Hands-On)",
    requirements: [
      [
        { text: "Access to Google Colab with a Google account — " },
        { link: "colab.research.google.com", href: "https://colab.research.google.com/" }
      ],
      [
        { text: "Access to the BananaRipenessCREDA source code — " },
        { link: "github.com/UN-GCPDS/BananaRipenessCREDA", href: "https://github.com/UN-GCPDS/BananaRipenessCREDA" }
      ],
      [
        { text: "Access to the Banana Ripeness Dataset on Kaggle — " },
        { link: "kaggle.com/datasets/lucasiturriago/bananaripeness", href: "https://www.kaggle.com/datasets/lucasiturriago/bananaripeness" }
      ],
      [
        { text: "A modern web browser and a stable internet connection are required. No local Python installation or GPU is needed, as experiments run entirely on Google Colab." }
      ],
      [
        { text: "A Hugging Face account is required to access and test the trained model through the interactive application hosted on the platform — " },
        { link: "huggingface.co", href: "https://huggingface.co/" }
      ]
    ],
    speakers: [
      {
        foto: "https://attend.ieee.org/etcm-2026/wp-content/uploads/sites/825/Prof.-Lucas-Miguel-Iturriago-Salas.jpg",
        fotoPosition: "center 15%",
        nombre: "Prof. Lucas Miguel Iturriago Salas",
        rol: "Computer Vision & Edge AI Researcher, AI-Lab (Signal Processing and Recognition Group), Universidad Nacional de Colombia",
        modality: "Virtual",
        country: "Colombia",
        bandera: "https://commons.wikimedia.org/wiki/Special:FilePath/Flag_of_Colombia.svg",
        expandBio: true,
        bio: [
          "He is a professor and doctoral researcher in computer vision and machine learning at Universidad Nacional de Colombia (AI-Lab). He specializes in unsupervised domain adaptation (UDA), explainable artificial intelligence (XAI), and edge computing for real-world computer vision applications. His research focuses on formulating robust objective functions, particularly within information-theoretic frameworks that use matrix-based Rényi α-entropy, aiming to decouple environmental artifacts — such as severe photometric shifts and illumination noise — from the intrinsic semantic features learned by deep convolutional networks and Vision Transformers.",
          "Throughout his career, he has led and contributed to multiple academic and applied machine learning initiatives, connecting advanced theoretical developments in deep learning with efficient implementations. His work spans synthetic-to-real transfer learning, latent-space geometry analysis, model compression, and low-latency deployment across domains including precision agriculture, remote sensing, and algorithmic auditing. He is also the creator and lead maintainer of CoreCV, an open-source computer vision library, and actively contributes peer-reviewed international publications and technical reports for scientific institutions."
        ]
      },
      {
        foto: "https://attend.ieee.org/etcm-2026/wp-content/uploads/sites/825/Prof.-Luis-Enrique-Chuquimarca-Jimenez.jpg",
        fotoPosition: "center 15%",
        nombre: "Prof. Luis Enrique Chuquimarca Jiménez, Ph.D.",
        rol: "Professor & Researcher in Electronics, Automation and Artificial Intelligence, Universidad Estatal Península de Santa Elena (UPSE)",
        modality: "In-person",
        country: "Ecuador",
        bandera: "https://upload.wikimedia.org/wikipedia/commons/e/e8/Flag_of_Ecuador.svg",
        expandBio: true,
        bio: [
          "He is a professor and researcher in the Electronics and Automation program at Universidad Estatal Península de Santa Elena (UPSE), Ecuador. His research focuses on computer vision, deep learning, and intelligent sensing systems, with particular emphasis on developing non-destructive methods for inspecting and assessing the quality of agricultural products. His work explores the use of convolutional neural networks, Vision Transformers, synthetic data generation, illumination-robust learning, and multi-domain techniques.",
          "Throughout his academic career, he has participated in research and technological development projects integrating computer vision, IoT, renewable energy, and embedded systems. His research has been published in high-impact scientific journals and international conferences. He also participates in interdisciplinary initiatives aimed at transferring artificial-intelligence-based methodologies from controlled laboratory environments to practical applications in precision agriculture and intelligent monitoring systems."
        ]
      }
    ]
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

function renderSpeaker(speaker) {
  speaker = speaker || {};
  const speakerName = escapeHTML(speaker.nombre);

  const photoStyle = speaker.fotoPosition
    ? ' style="object-position: ' + escapeHTML(speaker.fotoPosition) + '"'
    : "";

  return (
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
        (speaker.expandBio
          ? renderParagraphs(speaker.bio)
          : '<div class="collapsible-content">' + renderParagraphs(speaker.bio) + "</div>" +
            '<button class="collapse-toggle" type="button" aria-expanded="false">Read more</button>') +
      "</div>" +
    "</div>"
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

    const speakersList = tutorial.speakers || (tutorial.speaker ? [tutorial.speaker] : []);
    const kicker = speakersList.length > 1 ? "About the speakers" : "About the speaker";

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
        '<p class="section__kicker">' + kicker + "</p>" +
        speakersList.map(renderSpeaker).join("") +
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

  function syncVisibility() {
    if (button.getAttribute("aria-expanded") === "true") {
      return;
    }
    button.style.display =
      content.scrollHeight <= content.clientHeight + 4 ? "none" : "";
  }

  syncVisibility();
  window.addEventListener("resize", syncVisibility);

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
