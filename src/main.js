import { cardColorSwap } from "./components/cardColorSwap.js";
import { sidebarToggler } from "./components/sidebarToggler.js";
import { scalabilityTextReveal, securityTextReveal, metricCounterAnimation } from "./components/textReveal.js";
import { setupStepAnimation } from "./components/setupStepAnimation.js";
import { logoCarousel } from "./components/logoCarousel.js";

window.addEventListener('DOMContentLoaded', () => {

    //sidebar toggler
    sidebarToggler();

    // Security Briefing Scroll Animation
    securityTextReveal();

    // Scalability Section Text Reveal
    scalabilityTextReveal();

    // Metric Counter Animation
    metricCounterAnimation();

    // Built For Section Scroll Animation
    cardColorSwap();

    // Setup Steps Animation
    setupStepAnimation();

    // carousel animation
    logoCarousel();
})