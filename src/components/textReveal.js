export const securityTextReveal = () => {

    const briefingSection = document.querySelector('.security-briefing');
    const paragraphs = document.querySelectorAll('.briefing-wrapper p');
    
    let allWords = [];
    
    /* Split text into word spans */
    paragraphs.forEach(p => {
        const words = p.textContent.trim().split(' ');
        p.innerHTML = words
            .map(word => `<span class="briefing-word">${word}&nbsp;</span>`)
            .join('');
    });
    
    /* Collect all words in reading order */
    allWords = Array.from(document.querySelectorAll('.briefing-word'));
    const totalWords = allWords.length;
    
    function handleScroll() {
        const rect = briefingSection.getBoundingClientRect();
        const viewportHeight = window.innerHeight;
    
        const exitOffset = viewportHeight * 0.15;
    
        const start = viewportHeight;
        const end = exitOffset;
    
        const progress = (start - rect.top) / (start - end);
        const clampedProgress = Math.min(Math.max(progress, 0), 1);
    
        const wordsToHighlight = Math.floor(clampedProgress * totalWords);
    
        allWords.forEach((word, index) => {
            word.classList.toggle('is-active', index < wordsToHighlight);
        });
    }
    
    
    window.addEventListener('scroll', handleScroll);
}


export const scalabilityTextReveal = () => {

    const securityBrief = document.querySelector('.scalability-brief__wrapper');
    const briefText = document.querySelectorAll('.scalability__brief p');
    
    let briefWords = [];
    
    briefText.forEach(t => {
        const text = t.textContent.trim().split(' ');
    
        t.innerHTML = text
            .map(spanText => `<span class="span-text">${spanText}&nbsp;</span>`)
            .join('');
    })
    
    /* Collect all words in reading order */
    briefWords = Array.from(document.querySelectorAll('.span-text'));
    const totalSpanText = briefWords.length;
    
    function handleScrollTwo() {
        const rect = securityBrief.getBoundingClientRect();
        const viewportHeight = window.innerHeight;
    
        const exitOffset = viewportHeight * 0.15;
    
        const start = viewportHeight;
        const end = exitOffset;
    
        const progress = (start - rect.top) / (start - end);
        const clampedProgress = Math.min(Math.max(progress, 0), 1);
    
        const wordsToHighlight = Math.floor(clampedProgress * totalSpanText);
    
        briefWords.forEach((word, index) => {
            word.classList.toggle('is-active', index < wordsToHighlight);
        });
    }
    
    
    window.addEventListener('scroll', handleScrollTwo);
}

export const metricCounterAnimation = () => {
    const metricValues = document.querySelectorAll('.metric-value');
    const animationDuration = 2000; // 2 seconds
    const animatedElements = new Set();

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !animatedElements.has(entry.target)) {
                animatedElements.add(entry.target);
                animateCounter(entry.target);
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.5
    });

    function animateCounter(element) {
        const targetValue = parseInt(element.textContent, 10);
        let currentValue = 0;
        const startTime = performance.now();

        function updateCounter(currentTime) {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / animationDuration, 1);
            
            currentValue = Math.floor(progress * targetValue);
            element.textContent = currentValue;

            if (progress < 1) {
                requestAnimationFrame(updateCounter);
            } else {
                element.textContent = targetValue;
            }
        }

        requestAnimationFrame(updateCounter);
    }

    metricValues.forEach(element => {
        observer.observe(element);
    });
}
