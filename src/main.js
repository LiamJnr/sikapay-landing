import { cardColorSwap } from "./components/cardColorSwap.js";
import { sidebarToggler } from "./components/sidebarToggler.js";
import { scalabilityTextReveal, securityTextReveal } from "./components/textReveal.js";

window.addEventListener('DOMContentLoaded', () => {

    //sidebar toggler
    sidebarToggler();

    // Security Briefing Scroll Animation
    securityTextReveal();

    // Scalability Section Text Reveal
    scalabilityTextReveal();

    // Built For Section Scroll Animation
    cardColorSwap();

})