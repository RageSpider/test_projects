/**
 * DESIGNS 41-50
 * Warp, Files, Mission, Trophy, Clock, Power, Network, Lock, Robotics, Nano
 */

export const DESIGN_WARP = {
    wrapperClass: `
        text-[var(--color-primary)]
        [--color-frame-1-stroke:var(--color-primary)]
        [--color-frame-1-fill:transparent]
    `,
    containerClass: 'w-full max-w-3xl aspect-[16/9]',
    content: `
        <div class="h-full flex items-center justify-center relative overflow-hidden bg-black">
            <div class="absolute inset-0 flex items-center justify-center">
                <div class="w-[200%] h-[2px] bg-[var(--color-primary)] rotate-45"></div>
                <div class="w-[200%] h-[2px] bg-[var(--color-primary)] -rotate-45"></div>
            </div>
             <h1 class="text-4xl font-black italic z-10 bg-black px-4 border-y-2 border-[var(--color-primary)]">WARP SPEED</h1>
        </div>
    `
};

export const DESIGN_FILES = {
    wrapperClass: `
        text-[var(--color-text-main)]
        [--color-frame-1-stroke:var(--color-text-muted)]
        [--color-frame-1-fill:var(--color-bg-transparent)]
    `,
    containerClass: 'w-full max-w-md aspect-[3/4]',
    content: `
        <div class="h-full p-4 flex flex-col">
            <h3 class="text-sm font-bold mb-4">ARCHIVE / ROOT</h3>
            <div class="space-y-2 text-xs font-mono">
                <div class="flex gap-2 items-center cursor-pointer hover:bg-[var(--color-bg-transparent)] p-1">
                    <span class="text-[var(--color-secondary)]">[DIR]</span> confidential
                </div>
                <div class="flex gap-2 items-center cursor-pointer hover:bg-[var(--color-bg-transparent)] p-1">
                    <span class="text-[var(--color-secondary)]">[DIR]</span> public
                </div>
                <div class="flex gap-2 items-center cursor-pointer hover:bg-[var(--color-bg-transparent)] p-1 opacity-50">
                    <span>[FILE]</span> readme.txt
                </div>
                <div class="flex gap-2 items-center cursor-pointer hover:bg-[var(--color-bg-transparent)] p-1 opacity-50">
                    <span>[FILE]</span> log_001.dat
                </div>
            </div>
        </div>
    `
};

export const DESIGN_MISSION = {
    wrapperClass: `
        text-[var(--color-secondary)]
        [--color-frame-1-stroke:var(--color-secondary)]
        [--color-frame-1-fill:var(--color-bg-transparent)]
    `,
    containerClass: 'w-full max-w-lg aspect-[16/10]',
    content: `
        <div class="h-full p-6 flex flex-col">
            <div class="flex justify-between items-center mb-4">
                <span class="text-sm font-bold uppercase tracking-widest">Objectives</span>
                <span class="w-2 h-2 bg-[var(--color-secondary)] rounded-full"></span>
            </div>
            <div class="space-y-3 text-xs">
                <div class="flex gap-2 items-center">
                    <div class="w-3 h-3 border border-[var(--color-secondary)] flex items-center justify-center text-[8px]">✓</div>
                    <span class="line-through opacity-50">Infiltrate Base</span>
                </div>
                <div class="flex gap-2 items-center">
                    <div class="w-3 h-3 border border-[var(--color-secondary)]"></div>
                    <span>Locate Terminal</span>
                </div>
                <div class="flex gap-2 items-center">
                    <div class="w-3 h-3 border border-[var(--color-secondary)]"></div>
                    <span>Upload Virus</span>
                </div>
            </div>
        </div>
    `
};

export const DESIGN_TROPHY = {
    wrapperClass: `
        text-[var(--color-primary)]
        [--color-frame-1-stroke:var(--color-secondary)]
        [--color-frame-1-fill:var(--color-bg-transparent)]
        [--color-frame-2-stroke:var(--color-primary)]
        [--color-frame-2-fill:transparent]
    `,
    containerClass: 'w-full max-w-md aspect-square',
    content: `
        <div class="h-full flex flex-col items-center justify-center text-center p-4">
            <div class="text-6xl mb-4 text-[var(--color-secondary)]">★</div>
            <h2 class="text-xl font-bold uppercase">Achievement Unlocked</h2>
            <p class="text-xs mt-2 opacity-70">"Master of the Cyberverse"</p>
        </div>
    `
};

export const DESIGN_CLOCK = {
    wrapperClass: `
        text-[var(--color-text-main)]
        [--color-frame-1-stroke:var(--color-text-muted)]
        [--color-frame-1-fill:var(--color-bg-transparent)]
    `,
    containerClass: 'w-full max-w-lg aspect-[3/1]',
    content: `
        <div class="h-full flex items-center justify-center">
            <div class="text-5xl md:text-6xl font-black font-mono tracking-widest text-[var(--color-primary)] drop-shadow-[0_0_5px_var(--color-primary)]">
                23:59:59
            </div>
        </div>
    `
};

export const DESIGN_POWER = {
    wrapperClass: `
        text-[var(--color-secondary)]
        [--color-frame-1-stroke:var(--color-secondary)]
        [--color-frame-1-fill:var(--color-bg-transparent)]
    `,
    containerClass: 'w-full max-w-2xl aspect-[16/9]',
    content: `
        <div class="h-full flex flex-col justify-center px-8">
            <h3 class="text-xs font-bold mb-2">ENERGY CELL</h3>
            <div class="flex items-center gap-1 h-12">
                <div class="h-full flex-1 bg-[var(--color-secondary)]"></div>
                <div class="h-full flex-1 bg-[var(--color-secondary)]"></div>
                <div class="h-full flex-1 bg-[var(--color-secondary)]"></div>
                <div class="h-full flex-1 bg-[var(--color-secondary)] opacity-30"></div>
                <div class="h-full flex-1 bg-[var(--color-secondary)] opacity-30"></div>
            </div>
            <div class="text-right text-xs mt-1">60% CHARGE</div>
        </div>
    `
};

export const DESIGN_NETWORK = {
    wrapperClass: `
        text-[var(--color-primary)]
        [--color-frame-1-stroke:var(--color-primary)]
        [--color-frame-1-fill:var(--color-bg-transparent)]
    `,
    containerClass: 'w-full max-w-3xl aspect-[16/9]',
    content: `
        <div class="h-full flex items-center justify-center relative p-8">
            <div class="absolute w-2 h-2 bg-[var(--color-primary)] top-1/4 left-1/4 rounded-full"></div>
            <div class="absolute w-2 h-2 bg-[var(--color-primary)] top-3/4 left-1/3 rounded-full"></div>
            <div class="absolute w-4 h-4 bg-[var(--color-secondary)] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full z-10"></div>
            <div class="absolute w-2 h-2 bg-[var(--color-primary)] top-1/3 right-1/4 rounded-full"></div>
            
            <svg class="absolute inset-0 w-full h-full pointer-events-none">
                <line x1="25%" y1="25%" x2="50%" y2="50%" stroke="var(--color-primary)" stroke-width="1" opacity="0.5" />
                <line x1="33%" y1="75%" x2="50%" y2="50%" stroke="var(--color-primary)" stroke-width="1" opacity="0.5" />
                <line x1="75%" y1="33%" x2="50%" y2="50%" stroke="var(--color-primary)" stroke-width="1" opacity="0.5" />
            </svg>
            
            <div class="absolute bottom-2 right-4 text-xs">NODES ONLINE: 3</div>
        </div>
    `
};

export const DESIGN_LOCK = {
    wrapperClass: `
        text-[var(--color-text-main)]
        [--color-frame-1-stroke:var(--color-secondary)]
        [--color-frame-1-fill:var(--color-bg-transparent)]
    `,
    containerClass: 'w-full max-w-sm aspect-[4/5]',
    content: `
        <div class="h-full flex flex-col items-center justify-center">
            <div class="w-16 h-20 border-t-4 border-l-4 border-r-4 border-[var(--color-secondary)] rounded-t-full mb-1"></div>
            <div class="w-24 h-20 bg-[var(--color-secondary)] rounded flex items-center justify-center">
                <div class="w-4 h-4 bg-black rounded-full"></div>
            </div>
            <div class="mt-4 text-xs font-bold tracking-widest text-[var(--color-secondary)]">LOCKED</div>
        </div>
    `
};

export const DESIGN_ROBOTICS = {
    wrapperClass: `
        text-[var(--color-primary)]
        [--color-frame-1-stroke:var(--color-primary)]
        [--color-frame-1-fill:var(--color-bg-transparent)]
    `,
    containerClass: 'w-full max-w-2xl aspect-[16/9]',
    content: `
        <div class="h-full grid grid-cols-2 gap-4 p-4">
            <div class="border border-[var(--color-border)] p-2">
                <h4 class="text-[10px] uppercase opacity-70 mb-2">Servo Motor A</h4>
                <div class="text-2xl font-bold">4500 <span class="text-[10px] font-normal">RPM</span></div>
            </div>
            <div class="border border-[var(--color-border)] p-2">
                 <h4 class="text-[10px] uppercase opacity-70 mb-2">Hydraulics</h4>
                 <div class="text-2xl font-bold">250 <span class="text-[10px] font-normal">PSI</span></div>
            </div>
            <div class="col-span-2 border border-[var(--color-border)] p-2 flex items-center justify-between">
                <span class="text-xs">SYSTEM INTEGRITY</span>
                <span class="text-xs font-bold text-[var(--color-secondary)]">OK</span>
            </div>
        </div>
    `
};

export const DESIGN_NANO = {
    wrapperClass: `
        text-[var(--color-secondary)]
        [--color-frame-1-stroke:var(--color-secondary)]
        [--color-frame-1-fill:var(--color-bg-transparent)]
        drop-shadow-[0_0_5px_var(--color-secondary)]
    `,
    containerClass: 'w-full max-w-lg aspect-square',
    content: `
        <div class="h-full flex items-center justify-center relative">
            <div class="absolute inset-0 flex items-center justify-center opacity-20">
                <div class="w-32 h-32 border border-[var(--color-secondary)] rotate-12"></div>
                <div class="w-32 h-32 border border-[var(--color-secondary)] rotate-45 absolute"></div>
            </div>
            <div class="text-center z-10">
                <div class="text-4xl font-thin">NANO</div>
                <div class="text-[8px] tracking-[0.4em] mt-1">MOLECULAR ASSEMBLER</div>
            </div>
        </div>
    `
};