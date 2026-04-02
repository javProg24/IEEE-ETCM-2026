const menuLinks = [...document.querySelectorAll(".top-nav__link")];
const tabPanels = [...document.querySelectorAll(".tab-panel")];
const tutorials = [...document.querySelectorAll(".tutorial")];

const lightbox = document.getElementById("lightbox");
const lightboxImage = document.getElementById("lightbox-image");
const lightboxClose = document.getElementById("lightbox-close");

function showPanel(panelId) {
  menuLinks.forEach((link) => {
    link.classList.toggle("is-active", link.dataset.target === panelId);
  });

  tabPanels.forEach((panel) => {
    const isActive = panel.id === panelId;
    panel.classList.toggle("is-active", isActive);
    panel.hidden = !isActive;
  });
}

menuLinks.forEach((link) => {
  link.addEventListener("click", () => {
    const targetId = link.dataset.target;
    showPanel(targetId);
  });
});

function updateTutorial(tutorial, nextIndex) {
  const steps = [...tutorial.querySelectorAll(".tutorial-step")];
  const status = tutorial.querySelector(".tutorial__status");
  const prevButton = tutorial.querySelector('[data-action="prev"]');
  const nextButton = tutorial.querySelector('[data-action="next"]');
  const safeIndex = Math.max(0, Math.min(nextIndex, steps.length - 1));

  steps.forEach((step, index) => {
    step.classList.toggle("is-active", index === safeIndex);
  });

  if (status) {
    status.textContent = `Step ${safeIndex + 1} of ${steps.length}`;
  }

  if (prevButton) {
    prevButton.disabled = safeIndex === 0;
  }

  if (nextButton) {
    nextButton.disabled = safeIndex === steps.length - 1;
  }

  tutorial.dataset.stepIndex = String(safeIndex);
}

tutorials.forEach((tutorial) => {
  updateTutorial(tutorial, Number(tutorial.dataset.stepIndex || 0));

  tutorial.querySelector('[data-action="prev"]')?.addEventListener("click", () => {
    updateTutorial(tutorial, Number(tutorial.dataset.stepIndex || 0) - 1);
  });

  tutorial.querySelector('[data-action="next"]')?.addEventListener("click", () => {
    updateTutorial(tutorial, Number(tutorial.dataset.stepIndex || 0) + 1);
  });
});

document.querySelectorAll(".gallery__item img").forEach((image) => {
  image.addEventListener("click", () => {
    lightboxImage.src = image.src;
    lightboxImage.alt = image.alt;
    lightbox.showModal();
  });
});

lightboxClose.addEventListener("click", () => lightbox.close());

lightbox.addEventListener("click", (event) => {
  const bounds = lightbox.getBoundingClientRect();
  const clickedOutside =
    event.clientX < bounds.left ||
    event.clientX > bounds.right ||
    event.clientY < bounds.top ||
    event.clientY > bounds.bottom;

  if (clickedOutside) {
    lightbox.close();
  }
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && lightbox.open) {
    lightbox.close();
  }
});
