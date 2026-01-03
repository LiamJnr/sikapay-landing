export const encryptionCanvas = () => {
    const canvas = document.getElementById('encryption-canvas');
    const ctx = canvas.getContext('2d');
    const canvasContainer = document.querySelector('.encryption-canvas__cntnr');
    
    let containerRect = canvasContainer.getBoundingClientRect();
    let canvasWidth = canvas.width = containerRect.width;
    let canvasHeight = canvas.height = containerRect.height;

    // --- Animation Logic ---
    class Symbol {
        constructor(x, y, fontSize, canvasHeight) {
            this.characters = '01ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz$+-*/=%<>!&^#';
            this.x = x;
            this.y = y;
            this.fontSize = fontSize;
            this.text = '';
            this.canvasHeight = canvasHeight;
        }
        draw(context) {
            this.text = this.characters.charAt(Math.floor(Math.random() * this.characters.length));
            context.fillText(this.text, this.x * this.fontSize, this.y * this.fontSize);
            
            // Reset to top if it leaves screen (with a bit of randomness for variation)
            if (this.y * this.fontSize > this.canvasHeight && Math.random() > 0.98) {
                this.y = 0;
            } else {
                this.y += 1;
            }
        }
    }

    class Effect {
        constructor(canvasWidth, canvasHeight) {
            this.canvasWidth = canvasWidth;
            this.canvasHeight = canvasHeight;
            this.fontSize = 16;
            this.columns = this.canvasWidth / this.fontSize;
            this.symbols = [];
            this.initialize();
        }
        initialize() {
            for (let i = 0; i < this.columns; i++) {
                this.symbols[i] = new Symbol(i, 0, this.fontSize, this.canvasHeight);
            }
        }
        resize(width, height) {
            this.canvasWidth = width;
            this.canvasHeight = height;
            this.columns = this.canvasWidth / this.fontSize;
            this.symbols = [];
            this.initialize();
        }
    }

    const effect = new Effect(canvasWidth, canvasHeight);

    function animate() {
        // This creates the "trail" effect by painting a semi-transparent rectangle
        ctx.fillStyle = 'rgba(0, 0, 0, 0.05)'; 
        ctx.fillRect(0, 0, canvasWidth, canvasHeight);
        
        ctx.fillStyle = '#004585ff'; // Classic Matrix Green
        ctx.font = effect.fontSize + 'px monospace';

        effect.symbols.forEach(symbol => symbol.draw(ctx));
        requestAnimationFrame(animate);
    }

    animate();

    // --- Resize Observer ---
    window.addEventListener('resize', () => {
        containerRect = canvasContainer.getBoundingClientRect();
        canvasWidth = canvas.width = containerRect.width;
        canvasHeight = canvas.height = containerRect.height;
        effect.resize(canvasWidth, canvasHeight);
    });
}




// export const digitalFootprintCanvas = () => {
//     const canvas = document.getElementById('footprint-canvas');
//     const ctx = canvas.getContext('2d');
//     const canvasContainer = document.querySelector('.footprint-canvas__cntnr');

//     let containerRect = canvasContainer.getBoundingClientRect();
//     let canvasWidth = canvas.width = containerRect.width;
//     let canvasHeight = canvas.height = containerRect.height;

//     const actions = [
//         "USER_LOGIN", "DEPT_CREATED", "STAFF_ADDED", 
//         "PAYROLL_RUN", "LEAVE_APPROVED", "DOC_UPLOADED", 
//         "TAX_CALC_COMPLETED", "BENEFITS_UPDATED"
//     ];
//     const users = ["Admin_01", "HR_Manager", "System_Bot", "Finance_Lead"];

//     class AuditLog {
//         constructor(canvasWidth, canvasHeight) {
//             this.canvasWidth = canvasWidth;
//             this.canvasHeight = canvasHeight;
//             this.baseFontSize = 14; 
//             this.logs = [];
//             this.lastTimestamp = 0;
//             this.interval = 800;
//             this.fadeZone = 100;
//         }

//         generateLog() {
//             const user = users[Math.floor(Math.random() * users.length)];
//             const action = actions[Math.floor(Math.random() * actions.length)];
//             const timestamp = new Date().toLocaleTimeString('en-GB', { hour12: false });
//             const id = Math.random().toString(16).slice(2, 8).toUpperCase();
            
//             return {
//                 text: `[${timestamp}] ${user} executed ${action} (ID: ${id})`,
//                 y: this.canvasHeight + 20,
//                 opacity: 0
//             };
//         }

//         update(time) {
//             if (time - this.lastTimestamp > this.interval) {
//                 this.logs.push(this.generateLog());
//                 this.lastTimestamp = time;
//             }

//             this.logs.forEach((log, index) => {
//                 log.y -= 0.8;

//                 if (log.y > this.canvasHeight - this.fadeZone) {
//                     log.opacity = (this.canvasHeight - log.y) / this.fadeZone;
//                 } else if (log.y < this.fadeZone) {
//                     log.opacity = log.y / this.fadeZone;
//                 } else {
//                     log.opacity = 1;
//                 }

//                 if (log.y < -20) {
//                     this.logs.splice(index, 1);
//                 }
//             });
//         }

//         draw(context) {
//             // Keep text readable but responsive
//             const dynamicFontSize = Math.min(this.baseFontSize, Math.max(10, this.canvasWidth / 24));
//             context.font = `${dynamicFontSize}px 'Courier New', monospace`;
            
//             const sampleText = `[00:00:00] HR_Manager executed TAX_CALC_COMPLETED (ID: FFFFFF)`;
//             const textWidth = context.measureText(sampleText).width;
            
//             // Centering logic: if screen is too small, we anchor to the left with a small margin
//             const centeredX = this.canvasWidth > textWidth + 40 
//                 ? (this.canvasWidth / 2) - (textWidth / 2) 
//                 : 25; 

//             this.logs.forEach(log => {
//                 const currentOpacity = Math.max(0, log.opacity);
//                 const dotSize = dynamicFontSize / 4.5;
//                 const dotOffset = dynamicFontSize * 1.1;

//                 // --- HORIZONTAL FADE GRADIENT ---
//                 // We create a gradient that starts fully opaque and fades out at the right edge
//                 const gradient = context.createLinearGradient(centeredX, 0, this.canvasWidth - 10, 0);
//                 gradient.addColorStop(0, `rgba(200, 220, 255, ${currentOpacity})`);
//                 gradient.addColorStop(0.8, `rgba(200, 220, 255, ${currentOpacity})`); // Stay solid for 80%
//                 gradient.addColorStop(1, `rgba(200, 220, 255, 0)`); // Fade to transparent

//                 // Status dot (uses vertical opacity only)
//                 context.fillStyle = `rgba(0, 255, 150, ${currentOpacity})`;
//                 context.beginPath();
//                 context.arc(centeredX - dotOffset, log.y - (dynamicFontSize / 3), dotSize, 0, Math.PI * 2);
//                 context.fill();

//                 // Log text (uses the horizontal gradient)
//                 context.fillStyle = gradient;
//                 context.fillText(log.text, centeredX, log.y);
//             });
//         }

//         resize(width, height) {
//             this.canvasWidth = width;
//             this.canvasHeight = height;
//         }
//     }

//     const auditTrail = new AuditLog(canvasWidth, canvasHeight);

//     function animate(time) {
//         ctx.clearRect(0, 0, canvasWidth, canvasHeight);
//         auditTrail.update(time);
//         auditTrail.draw(ctx);
//         requestAnimationFrame(animate);
//     }

//     requestAnimationFrame(animate);

//     window.addEventListener('resize', () => {
//         containerRect = canvasContainer.getBoundingClientRect();
//         canvasWidth = canvas.width = containerRect.width;
//         canvasHeight = canvas.height = containerRect.height;
//         auditTrail.resize(canvasWidth, canvasHeight);
//     });
// }

export const digitalFootprintCanvas = () => {
    const canvas = document.getElementById('footprint-canvas');
    const ctx = canvas.getContext('2d');
    const canvasContainer = document.querySelector('.footprint-canvas__cntnr');

    let containerRect = canvasContainer.getBoundingClientRect();
    let canvasWidth = canvas.width = containerRect.width;
    let canvasHeight = canvas.height = containerRect.height;

    const actions = [
        "USER_LOGIN", "DEPT_CREATED", "STAFF_ADDED", 
        "PAYROLL_RUN", "LEAVE_APPROVED", "DOC_UPLOADED", 
        "TAX_CALC_COMPLETED", "BENEFITS_UPDATED"
    ];
    const users = ["Admin_01", "HR_Manager", "System_Bot", "Finance_Lead"];

    class AuditLog {
        constructor(canvasWidth, canvasHeight) {
            this.canvasWidth = canvasWidth;
            this.canvasHeight = canvasHeight;
            this.baseFontSize = 14; 
            this.logs = [];
            this.lastTimestamp = 0;
            this.interval = 800;
            this.fadeZone = 100;
        }

        generateLog() {
            const user = users[Math.floor(Math.random() * users.length)];
            const action = actions[Math.floor(Math.random() * actions.length)];
            const timestamp = new Date().toLocaleTimeString('en-GB', { hour12: false });
            const id = Math.random().toString(16).slice(2, 8).toUpperCase();
            
            return {
                text: `[${timestamp}] ${user} executed ${action} (ID: ${id})`,
                y: this.canvasHeight + 20,
                opacity: 0
            };
        }

        update(time) {
            if (time - this.lastTimestamp > this.interval) {
                this.logs.push(this.generateLog());
                this.lastTimestamp = time;
            }

            this.logs.forEach((log, index) => {
                log.y -= 0.8;

                if (log.y > this.canvasHeight - this.fadeZone) {
                    log.opacity = (this.canvasHeight - log.y) / this.fadeZone;
                } else if (log.y < this.fadeZone) {
                    log.opacity = log.y / this.fadeZone;
                } else {
                    log.opacity = 1;
                }

                if (log.y < -20) {
                    this.logs.splice(index, 1);
                }
            });
        }

        drawScanlines(context) {
            context.save();
            context.lineWidth = 1;
            // Subtle flicker by modulating opacity slightly
            const flicker = Math.random() * 0.05;
            context.strokeStyle = `rgba(18, 16, 16, ${0.1 + flicker})`;

            for (let i = 0; i < this.canvasHeight; i += 3) {
                context.beginPath();
                context.moveTo(0, i);
                context.lineTo(this.canvasWidth, i);
                context.stroke();
            }
            context.restore();
        }

        draw(context) {
            const dynamicFontSize = Math.min(this.baseFontSize, Math.max(10, this.canvasWidth / 24));
            context.font = `${dynamicFontSize}px 'Courier New', monospace`;
            
            const sampleText = `[00:00:00] HR_Manager executed TAX_CALC_COMPLETED (ID: FFFFFF)`;
            const textWidth = context.measureText(sampleText).width;
            
            const centeredX = this.canvasWidth > textWidth + 40 
                ? (this.canvasWidth / 2) - (textWidth / 2) 
                : 25; 

            this.logs.forEach(log => {
                const currentOpacity = Math.max(0, log.opacity);
                const dotSize = dynamicFontSize / 4.5;
                const dotOffset = dynamicFontSize * 1.1;

                const gradient = context.createLinearGradient(centeredX, 0, this.canvasWidth - 10, 0);
                gradient.addColorStop(0, `rgba(200, 220, 255, ${currentOpacity})`);
                gradient.addColorStop(0.8, `rgba(200, 220, 255, ${currentOpacity})`);
                gradient.addColorStop(1, `rgba(200, 220, 255, 0)`);

                context.fillStyle = `rgba(0, 255, 150, ${currentOpacity})`;
                context.beginPath();
                context.arc(centeredX - dotOffset, log.y - (dynamicFontSize / 3), dotSize, 0, Math.PI * 2);
                context.fill();

                context.fillStyle = gradient;
                context.fillText(log.text, centeredX, log.y);
            });

            // Draw scanlines on top of the text for a better overlay effect
            this.drawScanlines(context);
        }

        resize(width, height) {
            this.canvasWidth = width;
            this.canvasHeight = height;
        }
    }

    const auditTrail = new AuditLog(canvasWidth, canvasHeight);

    function animate(time) {
        ctx.clearRect(0, 0, canvasWidth, canvasHeight);
        auditTrail.update(time);
        auditTrail.draw(ctx);
        requestAnimationFrame(animate);
    }

    requestAnimationFrame(animate);

    window.addEventListener('resize', () => {
        containerRect = canvasContainer.getBoundingClientRect();
        canvasWidth = canvas.width = containerRect.width;
        canvasHeight = canvas.height = containerRect.height;
        auditTrail.resize(canvasWidth, canvasHeight);
    });
}