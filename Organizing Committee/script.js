(function () {
  var committee = [
    {
      role: 'General chair',
      name: 'Julio Barzola Monteses',
      email: 'jbarzola@ieee.org',
      linkedin: 'https://www.linkedin.com/in/julio-barzola-monteses-smieee-66344514/',
      scholar: 'https://scholar.google.com/citations?user=0_JE-TYAAAAJ&hl=es&oi=ao',
      image: '../images/rostro - Julio J. Barzola M..jpg'
    },
    {
      role: 'General cochair',
      name: 'Michelle Stefanie Tolozano Lapierre',
      email: 'mtolozano@bolivariano.edu.ec',
      linkedin: 'https://www.linkedin.com/in/michelle-tolozano-lapierre-95b01a49?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app',
      scholar: 'https://scholar.google.com/citations?user=p1i-YCAAAAAJ&hl=en',
      image: '../images/WhatsApp Image 2026-03-16 at 15.31.40 (1) - Michelle Tolozano Lapierre.jpeg'
    },
    {
      role: 'Technical Program chair',
      name: 'Rene Vinicio Sanchez Loja',
      email: 'rsanchezl@ups.edu.ec',
      linkedin: 'https://www.linkedin.com/in/renevinicio/',
      scholar: 'https://scholar.google.com/citations?user=Sa3cH1oAAAAJ&hl=es',
      image: '../images/foto 2024 - René Vinicio Sánchez L..png'
    },
    {
      role: 'Technical Program cochair',
      name: 'Luis Fernando Ugarte Vega',
      email: 'lfugarte@bolivariano.edu.ec',
      linkedin: 'https://www.linkedin.com/in/luis-ugarte-8b965613a/',
      scholar: 'https://scholar.google.com/citations?user=EL0ov1cAAAAJ&hl=es',
      image: '../images/_DSC1287 - LUIS UGARTE.jpeg'
    },
    {
      role: 'Publication chair',
      name: 'Mariela Cerrada',
      email: 'Not available',
      linkedin: '',
      scholar: '',
      image: '', 
      placeholder:'Photo pending'
    },
    {
      role: 'Publication cochair',
      name: 'Gary Pulla Zambrano',
      email: 'Not available',
      linkedin: '',
      scholar: '',
      image: '',
      placeholder:'Photo pending'
    },
    {
      role: 'Financiar chair',
      name: 'Alcibar Homero Yanez Escobar',
      email: 'alcibar.yaneze@uma.es',
      linkedin: 'https://www.linkedin.com/in/alcibar-yanez-48a859210/?skipRedirect=true',
      scholar: 'https://scholar.google.com/citations?user=LvO31sEAAAAJ&hl=es',
      image: '../images/bio_ahye - Alcibar Yanez.jpeg'
    },
    {
      role: 'Webmaster',
      name: 'Felix Tomala Gonzalez',
      email: 'javiertomalag14@gmail.com',
      linkedin: 'www.linkedin.com/in/javier-t-7aa8b0357',
      scholar: 'https://scholar.google.com/citations?user=f6_Eap4AAAAJ&hl=es',
      image: '',
      placeholder:'Photo pending'
    }
  ];

  var topRow = document.getElementById('top-row');
  var middleRow = document.getElementById('middle-row');
  var bottomRow = document.getElementById('bottom-row');
  var modal = document.getElementById('profile-modal');
  var modalPhoto = document.getElementById('modal-photo');
  var modalPhotoParent = modalPhoto.parentNode;
  var modalRole = document.getElementById('modal-role');
  var modalName = document.getElementById('modal-name');
  var modalEmail = document.getElementById('modal-email');
  var modalLinkedin = document.getElementById('modal-linkedin');
  var modalScholar = document.getElementById('modal-scholar');
  var closeButtons = document.querySelectorAll('[data-close-modal]');
  var lastTrigger = null;

  function normalizeUrl(url) {
    if (!url) {
      return '';
    }

    if (/^https?:\/\//i.test(url)) {
      return url;
    }

    return 'https://' + url.replace(/^\/+/, '');
  }

  function createCard(member) {
    var button = document.createElement('button');
    button.type = 'button';
    button.className = 'oc-card';
    var photoMarkup = member.image
      ? '<img class="oc-photo" src="' + member.image + '" alt="Photo of ' + member.name + '">'
      : '<div class="oc-photo-placeholder" aria-hidden="true">' + member.placeholder + '</div>';

    button.innerHTML = [
      '<p class="oc-role">' + member.role + '</p>',
      '<div class="oc-photo-frame">',
      photoMarkup,
      '</div>',
      '<h2 class="oc-name">' + member.name + '</h2>'
    ].join('');

    button.addEventListener('click', function () {
      openModal(member, button);
    });

    return button;
  }

  function setLink(element, href, label) {
    var normalized = normalizeUrl(href);
    element.textContent = label;

    if (normalized) {
      element.href = normalized;
      element.classList.remove('is-disabled');
      element.setAttribute('aria-disabled', 'false');
      return;
    }

    element.removeAttribute('href');
    element.classList.add('is-disabled');
    element.setAttribute('aria-disabled', 'true');
  }

  function openModal(member, trigger) {
    lastTrigger = trigger;
    if (member.image) {
      if (modalPhoto.tagName !== 'IMG') {
        var restoredPhoto = document.createElement('img');
        restoredPhoto.id = 'modal-photo';
        restoredPhoto.className = 'oc-modal-photo';
        modalPhotoParent.replaceChild(restoredPhoto, modalPhoto);
        modalPhoto = restoredPhoto;
      }

      modalPhoto.src = member.image;
      modalPhoto.alt = 'Photo of ' + member.name;
    } else {
      var placeholder = document.createElement('div');
      placeholder.id = 'modal-photo';
      placeholder.className = 'oc-modal-photo oc-modal-photo-placeholder';
      placeholder.textContent = member.placeholder;
      modalPhotoParent.replaceChild(placeholder, modalPhoto);
      modalPhoto = placeholder;
    }

    modalRole.textContent = member.role;
    modalName.textContent = member.name;
    modalEmail.textContent = member.email;
    if (member.email && member.email !== 'Not available') {
      modalEmail.href = 'mailto:' + member.email;
      modalEmail.classList.remove('is-disabled');
      modalEmail.setAttribute('aria-disabled', 'false');
    } else {
      modalEmail.removeAttribute('href');
      modalEmail.classList.add('is-disabled');
      modalEmail.setAttribute('aria-disabled', 'true');
    }
    setLink(modalLinkedin, member.linkedin, 'LinkedIn Profile');
    setLink(modalScholar, member.scholar, 'Google Scholar Profile');
    modal.classList.add('is-open');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    document.querySelector('.oc-modal-close').focus();
  }

  function closeModal() {
    modal.classList.remove('is-open');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';

    if (lastTrigger) {
      lastTrigger.focus();
    }
  }

  committee.slice(0, 2).forEach(function (member) {
    topRow.appendChild(createCard(member));
  });

  committee.slice(2, 6).forEach(function (member) {
    middleRow.appendChild(createCard(member));
  });

  committee.slice(6).forEach(function (member) {
    bottomRow.appendChild(createCard(member));
  });

  closeButtons.forEach(function (button) {
    button.addEventListener('click', closeModal);
  });

  document.addEventListener('keydown', function (event) {
    if (event.key === 'Escape' && modal.classList.contains('is-open')) {
      closeModal();
    }
  });
})();
