export const revealIcon = () => {

    const cards = document.querySelectorAll('.feature-card');

    const observer = new IntersectionObserver(
    (entries) => {
        entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            // observer.unobserve(entry.target); // animate once
        }else{
            entry.target.classList.remove('is-visible');
        }
        });
    },
    {
        threshold: 0.6, // 40% visible
    }
    );

    cards.forEach(card => observer.observe(card));
}