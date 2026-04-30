(function () {
    const speakers = [
      {
        nombre: "Daniel Campos Delgado",
        cargoCorto: "Professor · UASLP, Mexico",
        cargoCompleto: "Professor · Universidad Autónoma de San Luis Potosí · Mexico",
        foto: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=800&auto=format&fit=crop",
        bio: "Daniel Campos Delgado is a distinguished researcher whose work focuses on control systems, intelligent automation and advanced engineering applications. His keynote addresses emerging challenges in applied research, innovation and technological development for future-oriented engineering solutions.",
        perfil: "#",
        scholar: "#"
      },
      {
        nombre: "Bikash Pal",
        cargoCorto: "Professor · Imperial College London",
        cargoCompleto: "Professor · Imperial College London · United Kingdom",
        foto: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=800&auto=format&fit=crop",
        bio: "Bikash Pal has contributed significantly to power systems, system dynamics and renewable energy integration. His keynote provides a strong academic and practical perspective on resilient infrastructures, sustainable energy systems and intelligent engineering strategies.",
        perfil: "#",
        scholar: "#"
      },
      {
        nombre: "María Fernanda López",
        cargoCorto: "Researcher · Smart Systems Institute",
        cargoCompleto: "Researcher · Smart Systems Institute · Ecuador",
        foto: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=800&auto=format&fit=crop",
        bio: "María Fernanda López specializes in digital transformation, smart systems and interdisciplinary innovation. Her keynote emphasizes how technology, research and collaboration can strengthen engineering education and scientific impact in contemporary environments.",
        perfil: "#",
        scholar: "#"
      },
      {
        nombre: "Andrés Villacís",
        cargoCorto: "Professor · Advanced Energy Lab",
        cargoCompleto: "Professor · Advanced Energy Lab · Colombia",
        foto: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=800&auto=format&fit=crop",
        bio: "Andrés Villacís works on smart grids, industrial energy systems and modern infrastructure optimization. His keynote contributes a practical and strategic view of current energy, sustainability and technology challenges in engineering.",
        perfil: "#",
        scholar: "#"
      }
    ];

    const grid = document.getElementById("ks4Grid");

    function crearItem(speaker, index) {
      const item = document.createElement("div");
      item.className = "ks4-item";
      item.dataset.index = index;

      item.innerHTML = `
        <div class="ks4-shell">
          <div class="ks4-left">
            <div class="ks4-card-top">
              <div class="ks4-photo-wrap">
                <img src="${speaker.foto}" alt="${speaker.nombre}">
              </div>

              <div class="ks4-head">
                <h3 class="ks4-name">${speaker.nombre}</h3>
                <p class="ks4-role">${speaker.cargoCorto}</p>
              </div>

              <div class="ks4-plus">+</div>
            </div>
          </div>

          <div class="ks4-right">
            <div class="ks4-right-inner">
              <h4 class="ks4-panel-title">${speaker.nombre}</h4>
              <div class="ks4-meta">${speaker.cargoCompleto}</div>
              <p class="ks4-bio">${speaker.bio}</p>

              <div class="ks4-actions">
                <a class="ks4-link" href="${speaker.perfil}" target="_blank" rel="noopener">View Profile</a>
                <a class="ks4-link" href="${speaker.scholar}" target="_blank" rel="noopener">Google Scholar</a>
              </div>
            </div>
          </div>
        </div>
      `;

      item.querySelector(".ks4-left").addEventListener("click", function () {
        const abierto = item.classList.contains("is-open");

        document.querySelectorAll(".ks4-item").forEach((otro) => {
          otro.classList.remove("is-open");
        });

        if (!abierto) {
          item.classList.add("is-open");
        }
      });

      return item;
    }

    speakers.forEach((speaker, index) => {
      grid.appendChild(crearItem(speaker, index));
    });
  })();