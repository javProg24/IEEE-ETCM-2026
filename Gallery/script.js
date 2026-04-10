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
    let autoplayId;

    const setPosition = (withTransition = true) => {
      track.style.transition = withTransition ? "transform 900ms ease" : "none";
      track.style.transform = `translateX(-${currentIndex * 100}%)`;
    };

    const startAutoplay = () => {
      autoplayId = window.setInterval(() => {
        currentIndex += 1;
        setPosition(true);
      }, 4000);
    };

    const stopAutoplay = () => {
      if (autoplayId) {
        window.clearInterval(autoplayId);
      }
    };

    track.addEventListener("transitionend", () => {
      if (currentIndex === slideCount + 1) {
        currentIndex = 1;
        setPosition(false);
      }

      if (currentIndex === 0) {
        currentIndex = slideCount;
        setPosition(false);
      }
    });

    track.addEventListener("mouseenter", stopAutoplay);
    track.addEventListener("mouseleave", startAutoplay);

    setPosition(false);
    startAutoplay();
  }
}
