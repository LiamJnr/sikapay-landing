const sideNav = document.getElementById('side-nav');
const sideNavBackdrop = document.querySelector('.side-nav__backdrop');
const menuBtn = document.getElementById('menu-btn');
const closeBtn = document.getElementById('close-btn');

function toggleSideNav(){
    sideNav?.style.setProperty('transform', 'translateX(0)');
    sideNavBackdrop?.style.setProperty('display', 'block');
}

function collapseNav(){
    sideNav?.style.setProperty('transform', 'translateX(-320px)');
    sideNavBackdrop?.style.setProperty('display', 'none');
}

menuBtn?.addEventListener('click', toggleSideNav);
closeBtn?.addEventListener('click', collapseNav);

sideNavBackdrop?.addEventListener('click', () =>{
    if(sideNavBackdrop){
        collapseNav();
    }
})



// Built For Section Scroll Animation

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


// Security Briefing Scroll Animation

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
