const track = document.querySelector(".carousel__track");

if (track) {
  const baseSlides = Array.from(track.children);
  const slideCount = baseSlides.length;
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (slideCount > 1 && !prefersReducedMotion) {
    const firstClone = baseSlides[0].cloneNode(true);
    const lastClone = baseSlides[slideCount - 1].cloneNode(true);

    firstClone.setAttribute("aria-hidden", "true");
    lastClone.setAttribute("aria-hidden", "true");

    track.insertBefore(lastClone, baseSlides[0]);
    track.appendChild(firstClone);

    let currentIndex = 1;
    let autoplayId = null;
    let isResetting = false;

    const setPosition = (withTransition = true) => {
      track.style.transition = withTransition ? "transform 900ms ease" : "none";
      track.style.transform = `translateX(-${currentIndex * 100}%)`;
    };

    const goToNextSlide = () => {
      if (isResetting) {
        return;
      }

      currentIndex += 1;
      setPosition(true);
    };

    const startAutoplay = () => {
      stopAutoplay();
      autoplayId = window.setInterval(goToNextSlide, 4000);
    };

    const stopAutoplay = () => {
      if (autoplayId !== null) {
        window.clearInterval(autoplayId);
        autoplayId = null;
      }
    };

    track.addEventListener("transitionend", () => {
      if (currentIndex >= slideCount + 1) {
        isResetting = true;
        currentIndex = 1;
        setPosition(false);
        requestAnimationFrame(() => {
          isResetting = false;
        });
      }

      if (currentIndex <= 0) {
        isResetting = true;
        currentIndex = slideCount;
        setPosition(false);
        requestAnimationFrame(() => {
          isResetting = false;
        });
      }
    });

    track.addEventListener("mouseenter", stopAutoplay);
    track.addEventListener("mouseleave", startAutoplay);

    document.addEventListener("visibilitychange", () => {
      if (document.hidden) {
        stopAutoplay();
        return;
      }

      startAutoplay();
    });

    setPosition(false);
    startAutoplay();
  }
}
