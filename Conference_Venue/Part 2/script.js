const revealNodes = document.querySelectorAll("[data-reveal]");

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
                if (!entry.isIntersecting) return;
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
