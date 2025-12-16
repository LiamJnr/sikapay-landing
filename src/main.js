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
