/**
 * COLORS (THE SKIN)
 * Defines strictly the color palettes. 
 * Does NOT define shape, border-width, or shadows. Just the ink.
 */

// =========================================
// MONO: Single Hue (Shades of one color)
// =========================================
export const PALETTE_MONO_CYAN = {
    styles: `
        --color-primary: #06b6d4;      /* Cyan */
        --color-secondary: #0891b2;    /* Darker Cyan */
        --color-accent: #67e8f9;       /* Lighter Cyan */
        --color-bg-subtle: #0e749020;  /* Tinted BG */
        --color-text-main: #ecfeff;
        --color-text-muted: #155e75;
        --color-border: #06b6d4;
    `
};

export const PALETTE_MONO_RED = {
    styles: `
        --color-primary: #ef4444;      /* Red */
        --color-secondary: #b91c1c;    /* Darker Red */
        --color-accent: #fca5a5;       /* Lighter Red */
        --color-bg-subtle: #7f1d1d20;
        --color-text-main: #fef2f2;
        --color-text-muted: #7f1d1d;
        --color-border: #ef4444;
    `
};

export const PALETTE_MONO_AMBER = {
    styles: `
        --color-primary: #f59e0b;
        --color-secondary: #b45309;
        --color-accent: #fcd34d;
        --color-bg-subtle: #78350f20;
        --color-text-main: #fffbeb;
        --color-text-muted: #78350f;
        --color-border: #f59e0b;
    `
};

// =========================================
// DUO: Two distinct complimentary/contrasting colors
// =========================================
export const PALETTE_DUO_SYNTH = {
    styles: `
        --color-primary: #d946ef;      /* Fuchsia */
        --color-secondary: #4338ca;    /* Indigo */
        --color-accent: #e879f9;
        --color-bg-subtle: #4338ca20;
        --color-text-main: #fae8ff;
        --color-text-muted: #4a044e;
        --color-border: #d946ef;
    `
};

export const PALETTE_DUO_TOXIC = {
    styles: `
        --color-primary: #a3e635;      /* Lime */
        --color-secondary: #1e293b;    /* Slate/Black */
        --color-accent: #d9f99d;
        --color-bg-subtle: #1e293b40;
        --color-text-main: #f7fee7;
        --color-text-muted: #365314;
        --color-border: #a3e635;
    `
};

// =========================================
// MULTI: Complex tri-color or full spectrum
// =========================================
export const PALETTE_MULTI_RETRO = {
    styles: `
        --color-primary: #3b82f6;      /* Blue */
        --color-secondary: #ef4444;    /* Red */
        --color-accent: #eab308;       /* Yellow */
        --color-bg-subtle: #1e3a8a20;
        --color-text-main: #eff6ff;
        --color-text-muted: #1e3a8a;
        --color-border: #3b82f6;
    `
};

export const PALETTE_MULTI_NEON = {
    styles: `
        --color-primary: #00ff00;      /* Lime */
        --color-secondary: #ff00ff;    /* Magenta */
        --color-accent: #00ffff;       /* Cyan */
        --color-bg-subtle: #000000;
        --color-text-main: #ffffff;
        --color-text-muted: #00ff00;
        --color-border: #ffffff;
    `
};