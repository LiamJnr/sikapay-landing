export const setupStepAnimation = () => {
    const setupSteps = document.querySelectorAll('.setup-step');
    
    const observerOptions = {
        threshold: 0.8,
        rootMargin: '0px 0px -50px 0px',
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in-view');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    setupSteps.forEach(step => {
        observer.observe(step);
    });
};
