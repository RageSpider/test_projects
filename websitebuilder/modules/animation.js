// Manages animations and interactions

let editor; // Will be set to the Editor module instance

/**
 * Initializes the Animation module.
 * @param {object} editorInstance - The main Editor module.
 */
export async function init(editorInstance) {
    console.log('Animation Module: Initializing...');
    editor = editorInstance;
    
    // Listeners are set in editor.js, this module just
    // provides the logic and data.
}

/**
 * **NEW:** Called by the editor to apply animation classes.
 */
export function applyAnimation() {
    if (!editor) return;
    
    const select = document.getElementById('animation-on-load-select');
    const animClass = select.value; // e.g., "wb-anim-fade-in"
    
    // Use the editor's helper function to update classes
    editor.updateSelectedElementClass(animClass, 'wb-anim-');
}

/**
 * **NEW:** Returns the CSS styles needed for animations in the *editor*.
 */
export function getAnimationEditorStyles() {
    // In the editor, we just want to see the final state,
    // so we force opacity to 1.
    return `
        [class*="wb-anim-"] {
            opacity: 1 !important;
            transform: none !important;
        }
    `;
}

/**
 * **NEW:** Returns the CSS styles needed for animations in the *export*.
 */
export function getAnimationExportStyles() {
    return `
        /* --- Animation Keyframes --- */
        @keyframes wb-fade-in {
            from { opacity: 0; }
            to { opacity: 1; }
        }
        
        @keyframes wb-slide-in-left {
            from { opacity: 0; transform: translateX(-30px); }
            to { opacity: 1; transform: translateX(0); }
        }
        
        @keyframes wb-slide-in-top {
            from { opacity: 0; transform: translateY(-30px); }
            to { opacity: 1; transform: translateY(0); }
        }

        @keyframes wb-scale-in {
            from { opacity: 0; transform: scale(0.9); }
            to { opacity: 1; transform: scale(1); }
        }
        
        /* --- Animation Classes --- */
        /* Base state (hidden) */
        .wb-anim-fade-in,
        .wb-anim-slide-in-left,
        .wb-anim-slide-in-top,
        .wb-anim-scale-in {
            opacity: 0;
        }

        /* Running state */
        .wb-anim-fade-in.wb-run-anim {
            animation: wb-fade-in 0.6s ease-out both;
        }
        .wb-anim-slide-in-left.wb-run-anim {
            animation: wb-slide-in-left 0.6s ease-out both;
        }
        .wb-anim-slide-in-top.wb-run-anim {
            animation: wb-slide-in-top 0.6s ease-out both;
        }
        .wb-anim-scale-in.wb-run-anim {
            animation: wb-scale-in 0.6s ease-out both;
        }
    `;
}

/**
 * **NEW:** Returns the JS runtime needed for animations.
 * This runs on the exported site.
 */
export function getAnimationRuntimeScript() {
    return `
        document.addEventListener('DOMContentLoaded', () => {
            const runAnimations = () => {
                const elements = document.querySelectorAll('[class*="wb-anim-"]');
                elements.forEach((el, index) => {
                    // Stagger the animation start slightly
                    setTimeout(() => {
                        el.classList.add('wb-run-anim');
                    }, index * 50); // 50ms delay between elements
                });
            };
            
            // Run animations after a short delay
            setTimeout(runAnimations, 100);
        });
    `;
}