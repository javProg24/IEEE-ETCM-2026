const mapLink = document.querySelector("[data-map-link]");
const mapTarget = document.getElementById("campus-map");
const revealNodes = document.querySelectorAll("[data-reveal]");
const parallaxCard = document.querySelector("[data-parallax]");

revealNodes.forEach((node) => {
    const delay = node.dataset.revealDelay;

    if (delay) {
        node.style.setProperty("--reveal-delay", `${delay}ms`);
    }
});

if (revealNodes.length) {
    const revealObserver = new IntersectionObserver(
        (entries, observer) => {
            entries.forEach((entry) => {
                if (!entry.isIntersecting) {
                    return;
                }

                entry.target.classList.add("is-visible");
                observer.unobserve(entry.target);
            });
        },
        {
            threshold: 0.18,
            rootMargin: "0px 0px -8% 0px"
        }
    );

    revealNodes.forEach((node) => revealObserver.observe(node));
}

if (mapLink && mapTarget) {
    mapLink.addEventListener("click", (event) => {
        event.preventDefault();
        mapTarget.scrollIntoView({ behavior: "smooth", block: "start" });
    });
}

if (parallaxCard) {
    const updateParallax = () => {
        const rect = parallaxCard.getBoundingClientRect();
        const viewportHeight = window.innerHeight || 1;
        const distanceFromCenter = rect.top + rect.height / 2 - viewportHeight / 2;
        const offset = Math.max(Math.min(distanceFromCenter * -0.03, 14), -14);

        parallaxCard.style.setProperty("--parallax-offset", `${offset}px`);
    };

    updateParallax();
    window.addEventListener("scroll", updateParallax, { passive: true });
    window.addEventListener("resize", updateParallax);
}
