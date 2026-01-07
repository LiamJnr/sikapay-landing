export const logoCarousel = () => {
    const track = document.querySelector('.logo-cntnr');
    const logosWrapper = document.querySelector('.logos-carousel');
    
    if (!track || !logosWrapper) return;
    
    // Duplicate the logos for seamless infinite loop
    const logos = track.innerHTML;
    console.log(logos)
    track.innerHTML = logos + logos;
    
    // Get the width of one set of logos
    const animationDuration = 10; // seconds for full scroll
    
    // Set CSS custom property for animation duration
    logosWrapper.style.setProperty('--animation-duration', `${animationDuration}s`);
    
    // Add animation class for infinite scroll
    track.classList.add('carousel-animate');
}