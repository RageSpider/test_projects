/**
 * DESIGNS 21-30
 * Blueprint, Alert, Lab, Engine, Nav, Comms, Inventory, Profile, Login, Upload
 */

export const DESIGN_BLUEPRINT = {
    wrapperClass: `
        text-[var(--color-text-main)]
        [--color-frame-1-stroke:var(--color-text-muted)]
        [--color-frame-1-fill:var(--color-bg-transparent)]
    `,
    containerClass: 'w-full max-w-4xl aspect-[16/10]',
    content: `
        <div class="h-full bg-[size:40px_40px] bg-[linear-gradient(to_right,var(--color-border)_1px,transparent_1px),linear-gradient(to_bottom,var(--color-border)_1px,transparent_1px)] p-6 relative">
            <div class="absolute top-4 right-4 border-2 border-[var(--color-text-main)] px-2 py-1 text-xs font-bold">SCHEMATIC A-1</div>
            <div class="h-3/4 w-1/2 border border-dashed border-[var(--color-primary)] mt-8 flex items-center justify-center">
                <span class="text-xs text-[var(--color-primary)]">COMPONENT VIEW</span>
            </div>
        </div>
    `
};

export const DESIGN_ALERT = {
    wrapperClass: `
        text-[var(--color-secondary)]
        [--color-frame-1-stroke:var(--color-secondary)]
        [--color-frame-1-fill:var(--color-bg-transparent)]
        animate-pulse
    `,
    containerClass: 'w-full max-w-3xl aspect-[21/9]',
    content: `
        <div class="h-full flex items-center justify-center bg-[repeating-linear-gradient(-45deg,transparent,transparent_20px,var(--color-secondary-transparent)_20px,var(--color-secondary-transparent)_40px)]">
            <div class="bg-black border-4 border-[var(--color-secondary)] p-8 text-center z-10">
                <h1 class="text-5xl font-black tracking-tighter">WARNING</h1>
                <p class="mt-2 text-sm font-bold bg-[var(--color-secondary)] text-black px-2">UNAUTHORIZED ACCESS DETECTED</p>
            </div>
        </div>
    `
};

export const DESIGN_LAB = {
    wrapperClass: `
        text-[var(--color-primary)]
        [--color-frame-1-stroke:var(--color-border)]
        [--color-frame-1-fill:white]
        text-black
    `,
    containerClass: 'w-full max-w-2xl aspect-[16/10]',
    content: `
        <div class="h-full p-6 bg-white text-black flex flex-col">
            <div class="flex justify-between items-center border-b-2 border-black pb-2 mb-4">
                <span class="font-bold text-xl">LABORATORY 04</span>
                <span class="text-xs">Dr. A. Vance</span>
            </div>
            <div class="flex-1 grid grid-cols-2 gap-4">
                <div class="bg-gray-100 p-2 rounded border border-gray-300">
                    <div class="text-xs text-gray-500">SAMPLE A</div>
                    <div class="text-xl font-mono">Stable</div>
                </div>
                <div class="bg-gray-100 p-2 rounded border border-gray-300">
                    <div class="text-xs text-gray-500">SAMPLE B</div>
                    <div class="text-xl font-mono text-red-600">Volatile</div>
                </div>
            </div>
        </div>
    `
};

export const DESIGN_ENGINE = {
    wrapperClass: `
        text-[var(--color-secondary)]
        [--color-frame-1-stroke:var(--color-secondary)]
        [--color-frame-1-fill:var(--color-bg-transparent)]
    `,
    containerClass: 'w-full max-w-lg aspect-square',
    content: `
        <div class="h-full flex flex-col items-center justify-center relative">
            <svg class="w-48 h-48 -rotate-90">
                <circle cx="96" cy="96" r="88" fill="none" stroke="var(--color-border)" stroke-width="12" />
                <circle cx="96" cy="96" r="88" fill="none" stroke="var(--color-secondary)" stroke-width="12" stroke-dasharray="552" stroke-dashoffset="138" stroke-linecap="round" />
            </svg>
            <div class="absolute flex flex-col items-center">
                <span class="text-4xl font-black">75%</span>
                <span class="text-xs font-bold">THRUST</span>
            </div>
        </div>
    `
};

export const DESIGN_NAV = {
    wrapperClass: `
        text-[var(--color-primary)]
        [--color-frame-1-stroke:var(--color-primary)]
        [--color-frame-1-fill:var(--color-bg-transparent)]
    `,
    containerClass: 'w-full max-w-4xl aspect-[21/9]',
    content: `
        <div class="h-full grid grid-cols-4 gap-2 p-2 text-xs">
            <div class="col-span-3 border border-[var(--color-primary)] p-2 relative bg-[var(--color-bg-transparent)]">
                <div class="absolute inset-0 grid grid-cols-6 grid-rows-4 opacity-30">
                    <div class="border-r border-b border-[var(--color-primary)]"></div>
                    <div class="border-r border-b border-[var(--color-primary)]"></div>
                    <!-- more grid cells implicit -->
                </div>
                <div class="absolute top-1/2 left-1/2 w-2 h-2 bg-[var(--color-secondary)] rounded-full"></div>
                <div class="absolute bottom-2 left-2">LAT: 45.21 LON: 12.99</div>
            </div>
            <div class="col-span-1 flex flex-col gap-2">
                <div class="border border-[var(--color-primary)] flex-1 p-2">DEST: SECTOR 7</div>
                <div class="border border-[var(--color-primary)] flex-1 p-2">ETA: 4M 20S</div>
            </div>
        </div>
    `
};

export const DESIGN_COMMS = {
    wrapperClass: `
        text-[var(--color-primary)]
        [--color-frame-1-stroke:var(--color-primary)]
        [--color-frame-1-fill:var(--color-bg-transparent)]
    `,
    containerClass: 'w-full max-w-2xl aspect-[16/9]',
    content: `
        <div class="h-full flex flex-col p-6">
            <div class="flex items-center gap-4 mb-4">
                <div class="w-3 h-3 bg-[var(--color-secondary)] rounded-full animate-pulse"></div>
                <h3 class="font-bold tracking-widest">INCOMING TRANSMISSION</h3>
            </div>
            <div class="flex-1 flex items-center justify-center gap-1">
                <div class="w-2 h-8 bg-[var(--color-primary)] animate-[bounce_1s_infinite]"></div>
                <div class="w-2 h-12 bg-[var(--color-primary)] animate-[bounce_1.2s_infinite]"></div>
                <div class="w-2 h-6 bg-[var(--color-primary)] animate-[bounce_0.8s_infinite]"></div>
                <div class="w-2 h-16 bg-[var(--color-primary)] animate-[bounce_1.5s_infinite]"></div>
                <div class="w-2 h-10 bg-[var(--color-primary)] animate-[bounce_1.1s_infinite]"></div>
            </div>
            <div class="text-right text-xs opacity-70">FREQ: 140.85 MHz</div>
        </div>
    `
};

export const DESIGN_INVENTORY = {
    wrapperClass: `
        text-[var(--color-text-main)]
        [--color-frame-1-stroke:var(--color-primary)]
        [--color-frame-1-fill:var(--color-bg-transparent)]
    `,
    containerClass: 'w-full max-w-lg aspect-[3/4]',
    content: `
        <div class="h-full flex flex-col p-4">
            <h3 class="text-sm font-bold border-b border-[var(--color-primary)] mb-4">CARGO HOLD</h3>
            <div class="grid grid-cols-3 gap-2">
                <div class="aspect-square border border-[var(--color-border)] bg-[var(--color-bg-transparent)] flex items-center justify-center text-xs">EMPTY</div>
                <div class="aspect-square border border-[var(--color-border)] bg-[var(--color-bg-transparent)] flex items-center justify-center text-xs text-[var(--color-primary)]">FUEL</div>
                <div class="aspect-square border border-[var(--color-border)] bg-[var(--color-bg-transparent)] flex items-center justify-center text-xs">EMPTY</div>
                <div class="aspect-square border border-[var(--color-border)] bg-[var(--color-bg-transparent)] flex items-center justify-center text-xs text-[var(--color-secondary)]">DATA</div>
                <div class="aspect-square border border-[var(--color-border)] bg-[var(--color-bg-transparent)] flex items-center justify-center text-xs">EMPTY</div>
                <div class="aspect-square border border-[var(--color-border)] bg-[var(--color-bg-transparent)] flex items-center justify-center text-xs">EMPTY</div>
            </div>
        </div>
    `
};

export const DESIGN_PROFILE = {
    wrapperClass: `
        text-[var(--color-primary)]
        [--color-frame-1-stroke:var(--color-primary)]
        [--color-frame-1-fill:var(--color-bg-transparent)]
    `,
    containerClass: 'w-full max-w-md aspect-[4/5]',
    content: `
        <div class="h-full flex flex-col items-center pt-8 px-4">
            <div class="w-24 h-24 border-2 border-[var(--color-primary)] bg-black mb-4 flex items-center justify-center text-4xl">?</div>
            <h2 class="text-2xl font-bold">OPERATIVE</h2>
            <div class="w-full mt-6 space-y-2 text-sm">
                <div class="flex justify-between border-b border-[var(--color-border)] pb-1">
                    <span class="opacity-70">RANK</span>
                    <span>COMMANDER</span>
                </div>
                <div class="flex justify-between border-b border-[var(--color-border)] pb-1">
                    <span class="opacity-70">UNIT</span>
                    <span>ALPHA-9</span>
                </div>
                <div class="flex justify-between border-b border-[var(--color-border)] pb-1">
                    <span class="opacity-70">STATUS</span>
                    <span class="text-[var(--color-secondary)]">ACTIVE</span>
                </div>
            </div>
        </div>
    `
};

export const DESIGN_LOGIN = {
    wrapperClass: `
        text-[var(--color-primary)]
        [--color-frame-1-stroke:var(--color-primary)]
        [--color-frame-1-fill:var(--color-bg-transparent)]
    `,
    containerClass: 'w-full max-w-md aspect-[16/10]',
    content: `
        <div class="h-full flex flex-col items-center justify-center p-8">
            <div class="text-xs tracking-[0.3em] mb-6">AUTHENTICATION REQUIRED</div>
            <div class="w-full h-10 border border-[var(--color-primary)] flex items-center px-4 mb-2 bg-black">
                <span class="animate-pulse">_</span>
            </div>
            <div class="flex gap-2 w-full">
                <div class="flex-1 h-8 bg-[var(--color-primary)] text-black font-bold flex items-center justify-center text-xs">ENTER</div>
                <div class="w-8 h-8 border border-[var(--color-primary)] flex items-center justify-center text-xs">X</div>
            </div>
        </div>
    `
};

export const DESIGN_UPLOAD = {
    wrapperClass: `
        text-[var(--color-secondary)]
        [--color-frame-1-stroke:var(--color-secondary)]
        [--color-frame-1-fill:var(--color-bg-transparent)]
    `,
    containerClass: 'w-full max-w-2xl aspect-[3/1]',
    content: `
        <div class="h-full flex flex-col justify-center px-8">
            <div class="flex justify-between text-xs mb-2 font-bold">
                <span>UPLOADING DATA PACKET...</span>
                <span>84%</span>
            </div>
            <div class="h-4 w-full border border-[var(--color-secondary)] p-0.5">
                <div class="h-full w-[84%] bg-[var(--color-secondary)] shadow-[0_0_10px_var(--color-secondary)]"></div>
            </div>
            <div class="text-[10px] mt-2 opacity-70 font-mono">PACKET_ID: 994-Alpha-Zulu</div>
        </div>
    `
};