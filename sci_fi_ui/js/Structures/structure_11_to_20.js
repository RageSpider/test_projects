/**
 * STRUCTURES 11-20
 * Advanced sci-fi layouts.
 */

// 11. Scanner (Corners only, open center)
export const SHAPE_SCANNER = {
    id: 'scanner',
    className: 'relative p-4',
    elements: `
        <div class="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-[var(--color-frame-1-stroke)] rounded-tl-lg pointer-events-none"></div>
        <div class="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-[var(--color-frame-1-stroke)] rounded-tr-lg pointer-events-none"></div>
        <div class="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-[var(--color-frame-1-stroke)] rounded-bl-lg pointer-events-none"></div>
        <div class="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-[var(--color-frame-1-stroke)] rounded-br-lg pointer-events-none"></div>
        <div class="absolute inset-0 border border-[var(--color-frame-1-stroke)] opacity-10 rounded-lg pointer-events-none"></div>
    `
};

// 12. Grid (Technical readout)
export const SHAPE_GRID = {
    id: 'grid',
    className: 'relative p-1 bg-black',
    elements: `
        <div class="absolute inset-0 border border-[var(--color-frame-1-stroke)] pointer-events-none"></div>
        <div class="absolute -left-1 top-4 bottom-4 w-1 bg-[var(--color-frame-2-stroke)] pointer-events-none"></div>
        <div class="absolute -right-1 top-4 bottom-4 w-1 bg-[var(--color-frame-2-stroke)] pointer-events-none"></div>
        <div class="absolute top-0 left-0 text-[8px] bg-[var(--color-frame-1-stroke)] text-black px-1">SYS.01</div>
    `
};

// 13. Hex (Hexagonal clip)
export const SHAPE_HEX = {
    id: 'hex',
    className: 'relative p-8 [clip-path:polygon(50%_0,100%_25%,100%_75%,50%_100%,0_75%,0_25%)] bg-[var(--color-frame-1-fill)]',
    elements: `
        <div class="absolute inset-0 border-2 border-[var(--color-frame-1-stroke)] pointer-events-none opacity-50"></div>
    `
};

// 14. Circle (Radar style)
export const SHAPE_CIRCLE = {
    id: 'circle',
    className: 'relative p-4 rounded-full border-2 border-[var(--color-frame-1-stroke)] aspect-square flex items-center justify-center',
    elements: `
        <div class="absolute inset-1 rounded-full border border-dashed border-[var(--color-frame-2-stroke)] pointer-events-none"></div>
        <div class="absolute -top-1 left-1/2 -translate-x-1/2 bg-[var(--color-frame-1-fill)] px-2 text-[10px] text-[var(--color-frame-1-stroke)]">RADAR</div>
    `
};

// 15. Bar (Top heavy)
export const SHAPE_BAR = {
    id: 'bar',
    className: 'relative pt-12 pb-2 px-2 border-b border-[var(--color-frame-1-stroke)]',
    elements: `
        <div class="absolute top-0 left-0 w-full h-10 bg-[var(--color-frame-1-fill)] border-b border-[var(--color-frame-1-stroke)] flex items-end pb-1 px-2 pointer-events-none">
            <div class="h-1 w-1/3 bg-[var(--color-frame-1-stroke)]"></div>
        </div>
    `
};

// 16. Sidebar (Left menu style)
export const SHAPE_SIDEBAR = {
    id: 'sidebar',
    className: 'relative pl-12 p-2',
    elements: `
        <div class="absolute left-0 top-0 w-10 h-full border-r border-[var(--color-frame-1-stroke)] bg-[var(--color-frame-1-fill)] pointer-events-none flex flex-col items-center py-4 gap-2">
            <div class="w-4 h-4 rounded-full border border-[var(--color-frame-2-stroke)]"></div>
            <div class="w-4 h-4 rounded-full border border-[var(--color-frame-2-stroke)] opacity-50"></div>
            <div class="w-4 h-4 rounded-full border border-[var(--color-frame-2-stroke)] opacity-50"></div>
        </div>
    `
};

// 17. Modal (Popup style)
export const SHAPE_MODAL = {
    id: 'modal',
    className: 'relative p-6 bg-black border border-[var(--color-frame-1-stroke)] shadow-[0_0_30px_rgba(0,0,0,0.5)]',
    elements: `
        <div class="absolute -top-3 left-1/2 -translate-x-1/2 px-4 bg-black border border-[var(--color-frame-1-stroke)] text-[10px] tracking-widest pointer-events-none">MESSAGE</div>
    `
};

// 18. Overlay (Screen overlay)
export const SHAPE_OVERLAY = {
    id: 'overlay',
    className: 'relative p-4',
    elements: `
        <div class="absolute top-4 bottom-4 left-0 w-px bg-gradient-to-b from-transparent via-[var(--color-frame-1-stroke)] to-transparent pointer-events-none"></div>
        <div class="absolute top-4 bottom-4 right-0 w-px bg-gradient-to-b from-transparent via-[var(--color-frame-1-stroke)] to-transparent pointer-events-none"></div>
        <div class="absolute left-4 right-4 top-0 h-px bg-gradient-to-r from-transparent via-[var(--color-frame-1-stroke)] to-transparent pointer-events-none"></div>
        <div class="absolute left-4 right-4 bottom-0 h-px bg-gradient-to-r from-transparent via-[var(--color-frame-1-stroke)] to-transparent pointer-events-none"></div>
    `
};

// 19. Widget (Small corner details)
export const SHAPE_WIDGET = {
    id: 'widget',
    className: 'relative p-3 bg-[var(--color-frame-1-fill)] border border-[var(--color-frame-1-stroke)] rounded',
    elements: `
        <div class="absolute top-1 right-1 w-2 h-2 bg-[var(--color-frame-2-stroke)] rounded-full pointer-events-none animate-pulse"></div>
    `
};

// 20. Minimal (Just a line)
export const SHAPE_MINIMAL = {
    id: 'minimal',
    className: 'relative pl-4 border-l-2 border-[var(--color-frame-1-stroke)]',
    elements: `
        <div class="absolute top-0 left-0 w-2 h-0.5 bg-[var(--color-frame-1-stroke)] pointer-events-none"></div>
        <div class="absolute bottom-0 left-0 w-2 h-0.5 bg-[var(--color-frame-1-stroke)] pointer-events-none"></div>
    `
};