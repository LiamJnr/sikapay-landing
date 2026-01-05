import { cardColorSwap } from "./components/cardColorSwap.js";
import { revealIcon } from "./components/featureIconReveal.js";
import { sidebarToggler } from "./components/sidebarToggler.js";
import { scalabilityTextReveal, securityTextReveal } from "./components/textReveal.js";
import { setupStepAnimation } from "./components/setupStepAnimation.js";

window.addEventListener('DOMContentLoaded', () => {

    //sidebar toggler
    sidebarToggler();

    // Security Briefing Scroll Animation
    securityTextReveal();

    // Scalability Section Text Reveal
    scalabilityTextReveal();

    // Built For Section Scroll Animation
    cardColorSwap();

    // Setup Steps Animation
    setupStepAnimation();

    // Reveal icon logic
    revealIcon();
})