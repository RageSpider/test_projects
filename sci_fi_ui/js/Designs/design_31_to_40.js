/**
 * DESIGNS 31-40
 * Weather, Market, Chat, Settings, Audio, Cam, Scanner, Drone, Mech, Space
 */

export const DESIGN_WEATHER = {
    wrapperClass: `
        text-[var(--color-text-main)]
        [--color-frame-1-stroke:var(--color-text-muted)]
        [--color-frame-1-fill:var(--color-bg-transparent)]
    `,
    containerClass: 'w-full max-w-lg aspect-square',
    content: `
        <div class="h-full flex flex-col items-center justify-center p-4">
            <div class="text-[var(--color-primary)] text-xs tracking-widest mb-4">ATMOSPHERIC SENSORS</div>
            <div class="flex items-center justify-center gap-4">
                <span class="text-6xl text-[var(--color-primary)]">☁</span>
                <div class="text-4xl font-bold">14°C</div>
            </div>
            <div class="grid grid-cols-2 gap-4 mt-8 w-full text-center text-xs">
                <div class="border border-[var(--color-border)] p-2">
                    <div class="opacity-50">HUMIDITY</div>
                    <div class="font-bold text-lg">45%</div>
                </div>
                <div class="border border-[var(--color-border)] p-2">
                    <div class="opacity-50">PRESSURE</div>
                    <div class="font-bold text-lg">1013 hPa</div>
                </div>
            </div>
        </div>
    `
};

export const DESIGN_MARKET = {
    wrapperClass: `
        text-[var(--color-primary)]
        [--color-frame-1-stroke:var(--color-primary)]
        [--color-frame-1-fill:black]
    `,
    containerClass: 'w-full max-w-3xl aspect-[21/9]',
    content: `
        <div class="h-full flex flex-col p-4 font-mono">
            <div class="flex justify-between border-b border-[var(--color-primary)] pb-2 mb-2">
                <span class="font-bold">GALACTIC EXCHANGE</span>
                <span class="text-xs">LIVE</span>
            </div>
            <div class="space-y-2 text-xs">
                <div class="flex justify-between"><span>H3 (HELIUM-3)</span><span class="text-[var(--color-secondary)]">▲ 450.20</span></div>
                <div class="flex justify-between"><span>FE (IRON)</span><span class="text-red-500">▼ 12.05</span></div>
                <div class="flex justify-between"><span>H2O (WATER)</span><span class="text-[var(--color-secondary)]">▲ 890.00</span></div>
            </div>
        </div>
    `
};

export const DESIGN_CHAT = {
    wrapperClass: `
        text-[var(--color-text-main)]
        [--color-frame-1-stroke:var(--color-text-muted)]
        [--color-frame-1-fill:var(--color-bg-transparent)]
    `,
    containerClass: 'w-full max-w-md aspect-[3/4]',
    content: `
        <div class="h-full flex flex-col p-4 text-xs">
            <div class="flex-1 space-y-3">
                <div class="flex flex-col items-start">
                    <span class="text-[var(--color-primary)] text-[10px]">CMD_CENTRAL</span>
                    <div class="bg-[var(--color-primary)] text-black px-2 py-1 rounded-r-lg rounded-bl-lg">Status report?</div>
                </div>
                <div class="flex flex-col items-end">
                    <span class="text-[var(--color-secondary)] text-[10px]">SCOUT_1</span>
                    <div class="bg-[var(--color-secondary)] text-black px-2 py-1 rounded-l-lg rounded-br-lg">Sector clear. No anomalies.</div>
                </div>
            </div>
            <div class="mt-4 border-t border-[var(--color-border)] pt-2 flex gap-2">
                <div class="flex-1 bg-black border border-[var(--color-border)] h-6"></div>
                <div class="w-6 h-6 bg-[var(--color-text-muted)]"></div>
            </div>
        </div>
    `
};

export const DESIGN_SETTINGS = {
    wrapperClass: `
        text-[var(--color-primary)]
        [--color-frame-1-stroke:var(--color-primary)]
        [--color-frame-1-fill:var(--color-bg-transparent)]
    `,
    containerClass: 'w-full max-w-lg aspect-[16/10]',
    content: `
        <div class="h-full p-6 flex flex-col justify-center gap-4">
            <h3 class="uppercase tracking-widest text-sm border-b border-[var(--color-primary)] pb-2">System Config</h3>
            <div class="flex items-center justify-between text-xs">
                <span>HUD OPACITY</span>
                <div class="w-32 h-1 bg-[var(--color-border)] relative">
                    <div class="absolute left-2/3 w-2 h-2 -top-0.5 bg-[var(--color-primary)]"></div>
                </div>
            </div>
            <div class="flex items-center justify-between text-xs">
                <span>AI ASSIST</span>
                <div class="w-8 h-4 border border-[var(--color-primary)] p-0.5 flex justify-end">
                    <div class="w-3 h-full bg-[var(--color-primary)]"></div>
                </div>
            </div>
        </div>
    `
};

export const DESIGN_AUDIO = {
    wrapperClass: `
        text-[var(--color-secondary)]
        [--color-frame-1-stroke:var(--color-secondary)]
        [--color-frame-1-fill:transparent]
    `,
    containerClass: 'w-full max-w-2xl aspect-[4/1]',
    content: `
        <div class="h-full flex items-end justify-between px-8 py-4 gap-1">
            <div class="w-full h-[30%] bg-[var(--color-secondary)] opacity-50"></div>
            <div class="w-full h-[60%] bg-[var(--color-secondary)] opacity-80"></div>
            <div class="w-full h-[40%] bg-[var(--color-secondary)] opacity-60"></div>
            <div class="w-full h-[80%] bg-[var(--color-secondary)]"></div>
            <div class="w-full h-[50%] bg-[var(--color-secondary)] opacity-70"></div>
            <div class="w-full h-[90%] bg-[var(--color-secondary)]"></div>
            <div class="w-full h-[45%] bg-[var(--color-secondary)] opacity-60"></div>
            <div class="w-full h-[20%] bg-[var(--color-secondary)] opacity-40"></div>
        </div>
    `
};

export const DESIGN_CAM = {
    wrapperClass: `
        text-white
        [--color-frame-1-stroke:transparent]
        [--color-frame-1-fill:black]
    `,
    containerClass: 'w-full max-w-3xl aspect-video',
    content: `
        <div class="h-full relative bg-[#111] flex items-center justify-center overflow-hidden">
            <div class="absolute top-4 left-4 flex items-center gap-2">
                <div class="w-3 h-3 bg-red-600 rounded-full animate-pulse"></div>
                <span class="text-xs font-mono">REC</span>
            </div>
            <div class="absolute top-4 right-4 text-xs font-mono">CAM_04 [NIGHT]</div>
            <div class="absolute bottom-4 left-4 text-xs font-mono">02:14:59:12</div>
            
            <!-- Static noise effect simulated -->
            <div class="text-6xl text-gray-800 opacity-20 font-black tracking-tighter">NO SIGNAL</div>
        </div>
    `
};

export const DESIGN_SCANNER = {
    wrapperClass: `
        text-[var(--color-primary)]
        [--color-frame-1-stroke:var(--color-primary)]
        [--color-frame-1-fill:var(--color-bg-transparent)]
    `,
    containerClass: 'w-full max-w-4xl aspect-[4/1]',
    content: `
        <div class="h-full flex flex-col justify-center px-4 relative overflow-hidden">
            <div class="absolute top-0 bottom-0 w-1 bg-[var(--color-secondary)] shadow-[0_0_15px_var(--color-secondary)] animate-[moveRight_3s_linear_infinite_alternate]"></div>
            <div class="flex justify-between items-end border-b border-[var(--color-primary)] pb-1">
                <span class="text-xs font-bold">SCANNING SECTOR</span>
                <span class="text-xs font-mono">...</span>
            </div>
            <div class="mt-2 grid grid-cols-12 gap-1 h-4 opacity-50">
                 <div class="bg-[var(--color-primary)] col-span-1"></div>
                 <div class="bg-[var(--color-primary)] col-span-2"></div>
                 <div class="bg-[var(--color-primary)] col-span-1"></div>
            </div>
        </div>
    `
};

export const DESIGN_DRONE = {
    wrapperClass: `
        text-[var(--color-text-main)]
        [--color-frame-1-stroke:var(--color-primary)]
        [--color-frame-1-fill:transparent]
    `,
    containerClass: 'w-full max-w-3xl aspect-[16/9]',
    content: `
        <div class="h-full relative p-8">
            <div class="absolute inset-0 border-4 border-[var(--color-bg-transparent)] m-4 rounded-lg"></div>
            <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 border-2 border-[var(--color-primary)] rounded-full flex items-center justify-center">
                <div class="w-1 h-1 bg-[var(--color-primary)]"></div>
            </div>
            <div class="absolute bottom-8 left-8 text-xs font-mono bg-black/50 p-2 text-[var(--color-primary)]">
                <div>ALT: 450m</div>
                <div>SPD: 22m/s</div>
                <div>BAT: 88%</div>
            </div>
        </div>
    `
};

export const DESIGN_MECH = {
    wrapperClass: `
        text-[var(--color-secondary)]
        [--color-frame-1-stroke:var(--color-secondary)]
        [--color-frame-1-fill:var(--color-bg-transparent)]
    `,
    containerClass: 'w-full max-w-4xl aspect-[21/9]',
    content: `
        <div class="h-full grid grid-cols-5 gap-2 p-2">
            <div class="col-span-1 border-r border-[var(--color-secondary)] flex flex-col justify-end p-2 text-right">
                <h4 class="text-xs font-bold">L. ARM</h4>
                <div class="h-24 w-4 bg-[var(--color-bg-transparent)] self-end mt-2 border border-[var(--color-secondary)]">
                    <div class="h-1/2 bg-[var(--color-secondary)] w-full mt-12"></div>
                </div>
            </div>
            <div class="col-span-3 flex items-center justify-center border border-[var(--color-secondary)] bg-black relative">
                <span class="text-xs text-[var(--color-secondary)] absolute top-2">MAIN VIEW</span>
            </div>
            <div class="col-span-1 border-l border-[var(--color-secondary)] flex flex-col justify-end p-2 text-left">
                <h4 class="text-xs font-bold">R. ARM</h4>
                <div class="h-24 w-4 bg-[var(--color-bg-transparent)] self-start mt-2 border border-[var(--color-secondary)]">
                    <div class="h-3/4 bg-[var(--color-secondary)] w-full mt-6"></div>
                </div>
            </div>
        </div>
    `
};

export const DESIGN_SPACE = {
    wrapperClass: `
        text-white
        [--color-frame-1-stroke:white]
        [--color-frame-1-fill:transparent]
    `,
    containerClass: 'w-full max-w-2xl aspect-square rounded-full',
    content: `
        <div class="h-full w-full rounded-full bg-black relative overflow-hidden flex items-center justify-center border-2 border-white/20">
            <div class="absolute w-[1px] h-[1px] bg-white top-1/4 left-1/4 shadow-[0_0_2px_white]"></div>
            <div class="absolute w-[2px] h-[2px] bg-white top-1/2 left-3/4 shadow-[0_0_3px_white]"></div>
            <div class="absolute w-[1px] h-[1px] bg-white bottom-1/3 right-1/4"></div>
            
            <div class="w-full h-[1px] bg-white/30 absolute top-1/2"></div>
            <div class="h-full w-[1px] bg-white/30 absolute left-1/2"></div>
            
            <div class="z-10 bg-black px-2 text-xs font-mono tracking-[0.5em]">DEEP SPACE</div>
        </div>
    `
};