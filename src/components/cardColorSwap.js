export const cardColorSwap = () => {

    const cards = document.querySelectorAll('.built-for__card');
    
    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    cards.forEach(card =>
                        card.classList.remove('is-active')
                    );
                    entry.target.classList.add('is-active');
                }
            });
        },
        {
            root: null,
            threshold: 0,
            rootMargin: '-50% 0px -50% 0px'
        }
    );
    
    cards.forEach(card => observer.observe(card));
}
