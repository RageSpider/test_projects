/**
 * DESIGNS (THE STYLE/TEXTURE)
 * Defines the "Form Factor". 
 * These use the CSS Variables provided by the Color palette.
 * They do NOT define specific colors (like "red" or "blue"), only relationships.
 */

// 1. CROOKED: Skewed, chaotic, punk-ish
export const DESIGN_CROOKED = {
    label: 'Crooked',
    wrapperClass: 'font-mono',
    style: `
        /* Overrides for Form */
        --ui-bg: #000;
        --ui-border: var(--color-primary); 
        
        /* The Look */
        transform: skew(-5deg) rotate(1deg);
        border: 2px solid var(--color-primary);
        box-shadow: 10px 10px 0px var(--color-secondary);
    `
};

// 2. ELEGANT: Thin lines, serif, high spacing, graceful
export const DESIGN_ELEGANT = {
    label: 'Elegant',
    wrapperClass: 'font-serif tracking-widest',
    style: `
        --ui-bg: #050505;
        --ui-border: var(--color-primary);
        
        border: 1px solid var(--color-primary);
        border-radius: 4px;
        box-shadow: 0 0 30px -10px var(--color-primary);
    `
};

// 3. STAMPED: Industrial, thick borders, stencil, no radius
export const DESIGN_STAMPED = {
    label: 'Stamped',
    wrapperClass: 'font-mono uppercase tracking-tighter',
    style: `
        --ui-bg: #111;
        --ui-border: var(--color-primary);
        
        border: 8px solid var(--color-primary);
        background-image: repeating-linear-gradient(45deg, var(--color-bg-subtle) 0px, var(--color-bg-subtle) 10px, transparent 10px, transparent 20px);
    `
};

// 4. FLAT: Modern, minimal, no shadows, clean
export const DESIGN_FLAT = {
    label: 'Flat',
    wrapperClass: 'font-sans',
    style: `
        --ui-bg: #18181b;
        --ui-border: transparent;
        
        background-color: var(--ui-bg);
        border-radius: 12px;
        /* Flattening the children via vars */
        --color-bg-subtle: var(--color-secondary);
        --color-border: transparent;
    `
};

// 5. 3D / DEPTH: Heavy shadows, layers, pop-out
export const DESIGN_DEPTH = {
    label: 'Depth',
    wrapperClass: 'font-sans font-bold',
    style: `
        --ui-bg: #222;
        --ui-border: var(--color-primary);
        
        transform: perspective(1000px) rotateX(10deg);
        border-bottom: 8px solid var(--color-secondary);
        border-right: 8px solid var(--color-secondary);
        border-top: 1px solid var(--color-primary);
        border-left: 1px solid var(--color-primary);
        box-shadow: 0 20px 50px rgba(0,0,0,0.8);
        border-radius: 16px;
    `
};

// 6. OUTLINE: Strokes only, transparent backgrounds
export const DESIGN_OUTLINE = {
    label: 'Outline',
    wrapperClass: 'font-mono',
    style: `
        --ui-bg: transparent;
        --ui-border: var(--color-primary);
        
        /* Force transparent backgrounds on sub-elements by overriding vars */
        --color-bg-subtle: transparent;
        
        border: 2px dashed var(--color-primary);
        backdrop-filter: blur(2px);
    `
};

// 7. GHOST: Faint, barely there, glowing
export const DESIGN_GHOST = {
    label: 'Ghost',
    wrapperClass: 'font-sans font-light',
    style: `
        --ui-bg: rgba(0,0,0,0.3);
        --ui-border: var(--color-primary);
        
        border: 1px solid var(--color-primary);
        box-shadow: 0 0 15px var(--color-primary), inset 0 0 20px var(--color-primary);
        opacity: 0.8;
        text-shadow: 0 0 5px var(--color-primary);
    `
};