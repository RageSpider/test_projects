/**
 * DESIGNS 11-20
 * Medbay, Matrix, Void, Retro, Tactical, Xeno, Reactor, Shield, Sniper, Holo
 */

export const DESIGN_MEDBAY = {
    wrapperClass: `
        text-[var(--color-primary)]
        [--color-frame-1-stroke:var(--color-primary)]
        [--color-frame-1-fill:var(--color-bg-transparent)]
    `,
    containerClass: 'w-full max-w-3xl aspect-[2/1]',
    content: `
        <div class="h-full grid grid-cols-3 gap-4 p-4">
            <div class="col-span-2 flex flex-col justify-center">
                <div class="text-4xl font-bold flex items-center gap-4">
                    <span class="text-[var(--color-secondary)]">+</span> VITAL SIGNS
                </div>
                <div class="mt-4 h-16 w-full bg-[var(--color-bg-transparent)] relative overflow-hidden">
                    <div class="absolute top-1/2 left-0 w-full h-1 bg-[var(--color-primary)] opacity-20"></div>
                    <svg class="h-full w-full absolute top-0 left-0" preserveAspectRatio="none">
                        <polyline points="0,32 50,32 60,10 70,50 80,32 150,32 160,10 170,50 180,32 300,32" 
                            fill="none" stroke="var(--color-primary)" stroke-width="2" class="animate-[dash_2s_linear_infinite]" />
                    </svg>
                </div>
            </div>
            <div class="flex flex-col justify-center items-end text-right border-l border-[var(--color-border)] pl-4">
                <div class="text-3xl font-mono">98%</div>
                <div class="text-xs text-[var(--color-text-muted)]">OXYGENATION</div>
                <div class="text-3xl font-mono mt-4">72</div>
                <div class="text-xs text-[var(--color-text-muted)]">BPM</div>
            </div>
        </div>
    `
};

export const DESIGN_MATRIX = {
    wrapperClass: `
        text-[var(--color-primary)]
        [--color-frame-1-stroke:var(--color-primary)]
        [--color-frame-1-fill:black]
    `,
    containerClass: 'w-full max-w-sm aspect-[9/16]',
    content: `
        <div class="h-full flex flex-col p-4 font-mono text-xs overflow-hidden relative">
            <div class="opacity-50 break-words leading-tight">
                01001011 10101011 00110010 11100011 01010101 11001100 00101010 10111010
                11100011 01010101 11001100 00101010 10111010 01001011 10101011 00110010
                00110010 11100011 01010101 11001100 00101010 10111010 01001011 10101011
            </div>
            <div class="absolute inset-0 bg-gradient-to-b from-transparent to-black"></div>
            <div class="absolute bottom-8 left-4 text-xl font-bold bg-black px-2">WAKE UP_</div>
        </div>
    `
};

export const DESIGN_VOID = {
    wrapperClass: `
        text-[var(--color-text-muted)]
        [--color-frame-1-stroke:var(--color-text-muted)]
        [--color-frame-1-fill:black]
        [--color-frame-2-stroke:transparent]
        drop-shadow-[0_0_20px_black]
    `,
    containerClass: 'w-full max-w-lg aspect-square rounded-full',
    content: `
        <div class="h-full w-full rounded-full border border-[var(--color-border)] flex items-center justify-center bg-black relative">
            <div class="absolute inset-2 rounded-full border border-[var(--color-border)] opacity-30"></div>
            <div class="absolute inset-12 rounded-full border border-[var(--color-border)] opacity-10"></div>
            <div class="w-32 h-32 bg-black rounded-full shadow-[inset_0_0_20px_var(--color-secondary)] flex items-center justify-center">
                <span class="text-[var(--color-secondary)] text-xs tracking-widest">EVENT<br>HORIZON</span>
            </div>
        </div>
    `
};

export const DESIGN_RETRO = {
    wrapperClass: `
        text-[var(--color-secondary)]
        [--color-frame-1-stroke:var(--color-secondary)]
        [--color-frame-1-fill:var(--color-bg-transparent)]
        [--color-frame-2-stroke:var(--color-primary)]
        [--color-frame-2-fill:transparent]
    `,
    containerClass: 'w-full max-w-3xl aspect-video',
    content: `
        <div class="h-full flex flex-col items-center justify-center bg-[linear-gradient(0deg,rgba(0,0,0,0.5)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.5)_1px,transparent_1px)] bg-[size:20px_20px]">
            <h1 class="text-6xl font-black italic skew-x-12 drop-shadow-[4px_4px_0px_var(--color-primary)]" style="font-family: sans-serif;">TURBO</h1>
            <div class="mt-4 text-xl font-bold tracking-widest text-[var(--color-primary)]">SYSTEM 1984</div>
        </div>
    `
};

export const DESIGN_TACTICAL = {
    wrapperClass: `
        text-[var(--color-primary)]
        [--color-frame-1-stroke:var(--color-primary)]
        [--color-frame-1-fill:var(--color-bg-transparent)]
    `,
    containerClass: 'w-full max-w-2xl aspect-[16/9]',
    content: `
        <div class="h-full relative p-4">
            <!-- Crosshairs corners -->
            <div class="absolute top-4 left-4 w-4 h-4 border-t-2 border-l-2 border-[var(--color-primary)]"></div>
            <div class="absolute top-4 right-4 w-4 h-4 border-t-2 border-r-2 border-[var(--color-primary)]"></div>
            <div class="absolute bottom-4 left-4 w-4 h-4 border-b-2 border-l-2 border-[var(--color-primary)]"></div>
            <div class="absolute bottom-4 right-4 w-4 h-4 border-b-2 border-r-2 border-[var(--color-primary)]"></div>
            
            <div class="h-full flex items-center justify-center">
                <div class="w-full max-w-xs border border-[var(--color-primary)] bg-[var(--color-bg-transparent)] p-2">
                    <div class="flex justify-between text-xs mb-1"><span>TARGET</span><span>LOCKED</span></div>
                    <div class="h-32 w-full bg-[var(--color-bg-transparent)] relative">
                        <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 border rounded-full border-[var(--color-secondary)] opacity-50"></div>
                        <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-[var(--color-secondary)]"></div>
                    </div>
                </div>
            </div>
        </div>
    `
};

export const DESIGN_XENO = {
    wrapperClass: `
        text-[var(--color-secondary)]
        [--color-frame-1-stroke:var(--color-secondary)]
        [--color-frame-1-fill:var(--color-bg-transparent)]
        drop-shadow-[0_0_10px_var(--color-secondary)]
    `,
    containerClass: 'w-full max-w-lg aspect-[3/4]',
    content: `
        <div class="h-full flex flex-col items-center justify-center gap-4">
            <div class="text-4xl">⍙⟒⌰☊⍜⋔⟒</div>
            <div class="w-32 h-32 border-2 border-[var(--color-secondary)] rounded-full flex items-center justify-center animate-pulse">
                <div class="w-20 h-20 border border-[var(--color-primary)] rounded-full"></div>
            </div>
            <div class="text-xs tracking-[0.5em]">UNKNOWN_SIGNAL</div>
        </div>
    `
};

export const DESIGN_REACTOR = {
    wrapperClass: `
        text-[var(--color-primary)]
        [--color-frame-1-stroke:var(--color-primary)]
        [--color-frame-1-fill:var(--color-bg-transparent)]
    `,
    containerClass: 'w-full max-w-3xl aspect-[16/9]',
    content: `
        <div class="h-full flex items-center justify-center gap-8">
            <div class="flex flex-col gap-1 items-end">
                <div class="w-24 h-2 bg-[var(--color-primary)]"></div>
                <div class="w-20 h-2 bg-[var(--color-primary)] opacity-80"></div>
                <div class="w-16 h-2 bg-[var(--color-primary)] opacity-60"></div>
            </div>
            <div class="w-32 h-32 rounded-full border-4 border-dashed border-[var(--color-secondary)] animate-[spin_20s_linear_infinite] flex items-center justify-center">
                <div class="text-2xl font-black">CORE</div>
            </div>
            <div class="flex flex-col gap-1">
                <div class="w-24 h-2 bg-[var(--color-primary)]"></div>
                <div class="w-20 h-2 bg-[var(--color-primary)] opacity-80"></div>
                <div class="w-16 h-2 bg-[var(--color-primary)] opacity-60"></div>
            </div>
        </div>
    `
};

export const DESIGN_SHIELD = {
    wrapperClass: `
        text-[var(--color-secondary)]
        [--color-frame-1-stroke:var(--color-secondary)]
        [--color-frame-1-fill:var(--color-secondary-transparent)]
    `,
    containerClass: 'w-full max-w-4xl aspect-[21/9]',
    content: `
        <div class="h-full flex items-center justify-between px-8">
            <div class="text-6xl font-thin opacity-50">‹</div>
            <div class="text-center">
                <h2 class="text-2xl font-bold uppercase tracking-widest">Deflector Shield</h2>
                <div class="text-4xl font-black mt-2">100%</div>
            </div>
            <div class="text-6xl font-thin opacity-50">›</div>
        </div>
    `
};

export const DESIGN_SNIPER = {
    wrapperClass: `
        text-[var(--color-primary)]
        [--color-frame-1-stroke:var(--color-primary)]
        [--color-frame-1-fill:transparent]
    `,
    containerClass: 'w-full max-w-3xl aspect-[16/9] overflow-hidden',
    content: `
        <div class="h-full w-full relative flex items-center justify-center">
            <div class="absolute w-full h-[1px] bg-[var(--color-primary)] opacity-50"></div>
            <div class="absolute h-full w-[1px] bg-[var(--color-primary)] opacity-50"></div>
            <div class="w-64 h-64 rounded-full border border-[var(--color-primary)] flex items-center justify-center relative">
                 <div class="absolute top-0 w-[2px] h-4 bg-[var(--color-primary)]"></div>
                 <div class="absolute bottom-0 w-[2px] h-4 bg-[var(--color-primary)]"></div>
                 <div class="absolute left-0 h-[2px] w-4 bg-[var(--color-primary)]"></div>
                 <div class="absolute right-0 h-[2px] w-4 bg-[var(--color-primary)]"></div>
                 <div class="text-[10px] absolute -bottom-6">WIND: 2.4 NW</div>
            </div>
        </div>
    `
};

export const DESIGN_HOLO = {
    wrapperClass: `
        text-[var(--color-primary)]
        [--color-frame-1-stroke:transparent]
        [--color-frame-1-fill:var(--color-bg-transparent)]
        opacity-90
    `,
    containerClass: 'w-full max-w-xl aspect-square',
    content: `
        <div class="h-full flex flex-col items-center justify-center border-x-2 border-[var(--color-primary)] relative">
            <div class="absolute inset-0 bg-[linear-gradient(transparent_50%,rgba(0,0,0,0.5)_50%)] bg-[size:100%_4px]"></div>
            <div class="w-24 h-24 bg-[var(--color-primary)] opacity-20 rotate-45 mb-4"></div>
            <h3 class="text-xl font-bold z-10">PROJECTION</h3>
            <p class="text-xs z-10 opacity-70">INTERACTIVE MODEL</p>
        </div>
    `
};