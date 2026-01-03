import { cardColorSwap } from "./components/cardColorSwap.js";
import { digitalFootprintCanvas, encryptionCanvas } from "./components/securityCanvas.js";
import { revealIcon } from "./components/featureIconReveal.js";
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

    // Reveal icon logic
    revealIcon();

    //initialize encrytion Canvas
    encryptionCanvas();

    // initialize digital footprint canvas
    digitalFootprintCanvas();
})