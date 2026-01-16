/**
 * STRUCTURES (COMPONENTS)
 * Pure HTML layouts without specific styling opinions.
 * These rely on the 'Design' layer for colors, borders, and effects.
 */

// 1. Sidebar Layout
export const COMPONENT_SIDEBAR = {
    html: `
        <div class="flex h-full w-full max-w-5xl mx-auto border border-[var(--ui-border)] bg-[var(--ui-bg)] overflow-hidden">
            <!-- Sidebar -->
            <aside class="w-64 border-r border-[var(--ui-border)] p-4 flex flex-col gap-4">
                <div class="h-10 w-10 bg-[var(--color-primary)] rounded"></div>
                <nav class="flex-1 space-y-2 mt-8">
                    <div class="h-8 w-full bg-[var(--color-bg-subtle)] rounded border border-[var(--color-border-subtle)]"></div>
                    <div class="h-8 w-3/4 bg-[var(--color-bg-subtle)] rounded border border-[var(--color-border-subtle)] opacity-50"></div>
                    <div class="h-8 w-5/6 bg-[var(--color-bg-subtle)] rounded border border-[var(--color-border-subtle)] opacity-50"></div>
                </nav>
                <div class="h-12 border-t border-[var(--ui-border)] mt-auto pt-4 flex gap-2">
                    <div class="h-8 w-8 rounded-full bg-[var(--color-secondary)]"></div>
                    <div class="h-2 w-20 bg-[var(--color-text-muted)] rounded self-center"></div>
                </div>
            </aside>
            <!-- Main Content -->
            <main class="flex-1 p-8 space-y-4">
                <div class="h-8 w-1/3 bg-[var(--color-text-main)] rounded mb-8 opacity-80"></div>
                <div class="grid grid-cols-2 gap-4">
                    <div class="h-32 bg-[var(--color-bg-subtle)] border border-[var(--color-border-subtle)] rounded"></div>
                    <div class="h-32 bg-[var(--color-bg-subtle)] border border-[var(--color-border-subtle)] rounded"></div>
                </div>
                <div class="h-64 bg-[var(--color-bg-subtle)] border border-[var(--color-border-subtle)] rounded mt-4"></div>
            </main>
        </div>
    `
};

// 2. Navbar Layout
export const COMPONENT_NAVBAR = {
    html: `
        <div class="w-full max-w-4xl mx-auto space-y-8">
            <!-- Top Nav -->
            <nav class="w-full h-16 border border-[var(--ui-border)] bg-[var(--ui-bg)] flex items-center justify-between px-6 rounded">
                <div class="text-[var(--color-primary)] font-bold tracking-widest">LOGO_TYPE</div>
                <div class="flex gap-4">
                    <div class="w-20 h-2 bg-[var(--color-text-main)] opacity-20 rounded"></div>
                    <div class="w-20 h-2 bg-[var(--color-text-main)] opacity-20 rounded"></div>
                    <div class="w-20 h-2 bg-[var(--color-text-main)] opacity-20 rounded"></div>
                </div>
                <div class="px-4 py-1 border border-[var(--color-primary)] text-[var(--color-primary)] text-xs">ACTION</div>
            </nav>
            
            <!-- Hero Section -->
            <div class="w-full h-64 border border-[var(--ui-border)] bg-[var(--ui-bg)] relative flex items-center justify-center rounded">
                <div class="text-center space-y-2">
                    <h1 class="text-4xl font-bold text-[var(--color-text-main)]">HERO SECTION</h1>
                    <p class="text-[var(--color-text-muted)]">Subtitle content goes here</p>
                </div>
            </div>
        </div>
    `
};

// 3. Card Grid
export const COMPONENT_CARDS = {
    html: `
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-5xl mx-auto">
            <!-- Card 1 -->
            <div class="p-6 border border-[var(--ui-border)] bg-[var(--ui-bg)] flex flex-col gap-4 rounded group hover:border-[var(--color-primary)] transition-colors">
                <div class="w-12 h-12 bg-[var(--color-bg-subtle)] rounded flex items-center justify-center text-[var(--color-primary)]">01</div>
                <h3 class="text-xl font-bold text-[var(--color-text-main)]">Feature One</h3>
                <p class="text-sm text-[var(--color-text-muted)]">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                <div class="mt-auto h-1 w-full bg-[var(--color-primary)] transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></div>
            </div>
            <!-- Card 2 -->
            <div class="p-6 border border-[var(--ui-border)] bg-[var(--ui-bg)] flex flex-col gap-4 rounded group hover:border-[var(--color-secondary)] transition-colors">
                <div class="w-12 h-12 bg-[var(--color-bg-subtle)] rounded flex items-center justify-center text-[var(--color-secondary)]">02</div>
                <h3 class="text-xl font-bold text-[var(--color-text-main)]">Feature Two</h3>
                <p class="text-sm text-[var(--color-text-muted)]">Sed do eiusmod tempor incididunt ut labore et dolore.</p>
                <div class="mt-auto h-1 w-full bg-[var(--color-secondary)] transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></div>
            </div>
            <!-- Card 3 -->
            <div class="p-6 border border-[var(--ui-border)] bg-[var(--ui-bg)] flex flex-col gap-4 rounded group hover:border-[var(--color-accent)] transition-colors">
                <div class="w-12 h-12 bg-[var(--color-bg-subtle)] rounded flex items-center justify-center text-[var(--color-accent)]">03</div>
                <h3 class="text-xl font-bold text-[var(--color-text-main)]">Feature Three</h3>
                <p class="text-sm text-[var(--color-text-muted)]">Ut enim ad minim veniam, quis nostrud exercitation.</p>
                <div class="mt-auto h-1 w-full bg-[var(--color-accent)] transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></div>
            </div>
        </div>
    `
};

// 4. Footer
export const COMPONENT_FOOTER = {
    html: `
        <div class="w-full max-w-5xl mx-auto border-t-4 border-[var(--color-primary)] bg-[var(--ui-bg)] p-12">
            <div class="grid grid-cols-4 gap-8">
                <div class="col-span-1 space-y-4">
                    <div class="text-2xl font-black text-[var(--color-text-main)]">FOOTER</div>
                    <div class="text-sm text-[var(--color-text-muted)]">System status: Online</div>
                </div>
                <div class="col-span-1 space-y-2">
                    <div class="font-bold text-[var(--color-secondary)] mb-2">LINKS</div>
                    <div class="h-2 w-16 bg-[var(--color-text-muted)] opacity-50"></div>
                    <div class="h-2 w-20 bg-[var(--color-text-muted)] opacity-50"></div>
                    <div class="h-2 w-12 bg-[var(--color-text-muted)] opacity-50"></div>
                </div>
                <div class="col-span-1 space-y-2">
                    <div class="font-bold text-[var(--color-secondary)] mb-2">LEGAL</div>
                    <div class="h-2 w-16 bg-[var(--color-text-muted)] opacity-50"></div>
                    <div class="h-2 w-24 bg-[var(--color-text-muted)] opacity-50"></div>
                </div>
                <div class="col-span-1">
                     <div class="h-10 w-full border border-[var(--color-border-subtle)] bg-[var(--color-bg-subtle)] flex items-center px-2">
                        <span class="text-[10px] text-[var(--color-text-muted)]">SUBSCRIBE...</span>
                     </div>
                     <div class="h-8 w-full bg-[var(--color-primary)] mt-2"></div>
                </div>
            </div>
            <div class="mt-12 pt-8 border-t border-[var(--ui-border)] flex justify-between text-xs text-[var(--color-text-muted)]">
                <span>© 2077 CORPORATION</span>
                <span>ALL RIGHTS RESERVED</span>
            </div>
        </div>
    `
};

// 5. Alert & Toasts
export const COMPONENT_ALERTS = {
    html: `
        <div class="w-full max-w-2xl mx-auto space-y-6">
            <!-- Danger Alert -->
            <div class="p-4 border-l-4 border-[var(--color-primary)] bg-[var(--color-bg-subtle)] flex items-start gap-4">
                <div class="text-2xl">⚠</div>
                <div>
                    <h4 class="font-bold text-[var(--color-text-main)]">System Failure Imminent</h4>
                    <p class="text-sm text-[var(--color-text-muted)]">Critical error detected in sector 7G. Evacuate immediately.</p>
                </div>
            </div>
            
            <!-- Success Alert -->
            <div class="p-4 border border-[var(--color-secondary)] bg-[var(--color-secondary-transparent)] flex items-center justify-between rounded">
                <div class="flex items-center gap-3">
                    <div class="h-2 w-2 bg-[var(--color-secondary)] rounded-full animate-pulse"></div>
                    <span class="font-bold text-[var(--color-secondary)]">Upload Complete</span>
                </div>
                <span class="text-xs opacity-50">100%</span>
            </div>

            <!-- Toast Stack -->
            <div class="flex flex-col items-end gap-2 opacity-80">
                <div class="bg-[var(--ui-bg)] border border-[var(--ui-border)] px-4 py-2 text-xs rounded shadow-lg flex items-center gap-2">
                    <span class="text-[var(--color-accent)]">ℹ</span> New message received
                </div>
                 <div class="bg-[var(--ui-bg)] border border-[var(--ui-border)] px-4 py-2 text-xs rounded shadow-lg flex items-center gap-2">
                    <span class="text-[var(--color-primary)]">✔</span> Database synced
                </div>
            </div>
        </div>
    `
};

// 6. Tabs Interface
export const COMPONENT_TABS = {
    html: `
        <div class="w-full max-w-3xl mx-auto border border-[var(--ui-border)] bg-[var(--ui-bg)] rounded overflow-hidden">
            <!-- Tab Headers -->
            <div class="flex border-b border-[var(--ui-border)]">
                <div class="px-6 py-3 border-r border-[var(--ui-border)] border-b-2 border-b-[var(--color-primary)] bg-[var(--color-bg-subtle)] text-[var(--color-primary)] font-bold text-sm">
                    MAIN_CONSOLE
                </div>
                <div class="px-6 py-3 border-r border-[var(--ui-border)] text-[var(--color-text-muted)] text-sm hover:text-[var(--color-text-main)] cursor-pointer">
                    NETWORK
                </div>
                <div class="px-6 py-3 border-r border-[var(--ui-border)] text-[var(--color-text-muted)] text-sm hover:text-[var(--color-text-main)] cursor-pointer">
                    LOGS
                </div>
            </div>
            <!-- Tab Content -->
            <div class="p-8 min-h-[300px]">
                <h2 class="text-2xl font-light mb-4 text-[var(--color-text-main)]">Console Output</h2>
                <div class="font-mono text-xs text-[var(--color-text-muted)] space-y-1">
                    <p>> Initializing sequence...</p>
                    <p>> Loading modules [||||||||||] 100%</p>
                    <p class="text-[var(--color-secondary)]">> Connection established.</p>
                    <p class="animate-pulse">> Awaiting input_</p>
                </div>
            </div>
        </div>
    `
};

// 7. Mega Menu
export const COMPONENT_MEGAMENU = {
    html: `
        <div class="w-full max-w-5xl mx-auto relative h-[400px] border border-[var(--ui-border)] bg-[var(--ui-bg)]">
            <div class="absolute inset-x-0 top-0 h-16 border-b border-[var(--ui-border)] flex items-center px-8 justify-between">
                <span class="font-bold">MENU_SYSTEM</span>
                <span class="text-xs">▼</span>
            </div>
            <!-- Expanded Menu -->
            <div class="absolute inset-x-0 top-16 bg-[var(--color-bg-subtle)] p-8 border-b border-[var(--ui-border)] grid grid-cols-4 gap-8 z-10">
                <div class="space-y-4">
                    <h4 class="font-bold text-[var(--color-primary)] text-sm tracking-widest border-b border-[var(--color-border-subtle)] pb-2">PRODUCTS</h4>
                    <ul class="space-y-2 text-xs text-[var(--color-text-muted)]">
                        <li class="hover:text-[var(--color-text-main)] cursor-pointer">Cybernetics</li>
                        <li class="hover:text-[var(--color-text-main)] cursor-pointer">Neural Links</li>
                        <li class="hover:text-[var(--color-text-main)] cursor-pointer">Optics</li>
                    </ul>
                </div>
                <div class="space-y-4">
                    <h4 class="font-bold text-[var(--color-secondary)] text-sm tracking-widest border-b border-[var(--color-border-subtle)] pb-2">SERVICES</h4>
                    <ul class="space-y-2 text-xs text-[var(--color-text-muted)]">
                        <li class="hover:text-[var(--color-text-main)] cursor-pointer">Data Recovery</li>
                        <li class="hover:text-[var(--color-text-main)] cursor-pointer">Memory Wiping</li>
                        <li class="hover:text-[var(--color-text-main)] cursor-pointer">Security Audits</li>
                    </ul>
                </div>
                <div class="col-span-2 bg-[var(--ui-bg)] border border-[var(--color-primary)] p-4 flex items-center justify-center relative overflow-hidden">
                    <div class="absolute inset-0 bg-[var(--color-primary)] opacity-10"></div>
                    <div class="text-center relative z-10">
                        <div class="text-xl font-bold mb-1">FEATURED ITEM</div>
                        <div class="text-xs opacity-70">New Neural Interface v2.0</div>
                        <button class="mt-4 px-4 py-1 bg-[var(--color-primary)] text-black text-xs font-bold">PRE-ORDER</button>
                    </div>
                </div>
            </div>
        </div>
    `
};

// 8. Accordion
export const COMPONENT_ACCORDION = {
    html: `
        <div class="w-full max-w-2xl mx-auto space-y-2">
            <!-- Item 1 (Closed) -->
            <div class="border border-[var(--ui-border)] bg-[var(--ui-bg)]">
                <div class="p-4 flex justify-between items-center cursor-pointer hover:bg-[var(--color-bg-subtle)]">
                    <span class="font-bold text-[var(--color-text-main)]">System Requirements</span>
                    <span class="text-[var(--color-primary)]">+</span>
                </div>
            </div>
            
            <!-- Item 2 (Open) -->
            <div class="border border-[var(--color-primary)] bg-[var(--ui-bg)]">
                <div class="p-4 flex justify-between items-center cursor-pointer bg-[var(--color-bg-subtle)] border-b border-[var(--color-border-subtle)]">
                    <span class="font-bold text-[var(--color-primary)]">Installation Protocol</span>
                    <span class="text-[var(--color-primary)]">-</span>
                </div>
                <div class="p-4 text-sm text-[var(--color-text-muted)]">
                    1. Disable firewall<br>
                    2. Connect via Port 8080<br>
                    3. Inject payload<br>
                    <span class="text-[var(--color-secondary)] mt-2 block">Status: Ready to execute.</span>
                </div>
            </div>

            <!-- Item 3 (Closed) -->
            <div class="border border-[var(--ui-border)] bg-[var(--ui-bg)]">
                <div class="p-4 flex justify-between items-center cursor-pointer hover:bg-[var(--color-bg-subtle)]">
                    <span class="font-bold text-[var(--color-text-main)]">Troubleshooting</span>
                    <span class="text-[var(--color-primary)]">+</span>
                </div>
            </div>
        </div>
    `
};

// 9. Login/Auth Form
export const COMPONENT_AUTH = {
    html: `
        <div class="w-full max-w-md mx-auto border-2 border-[var(--color-primary)] bg-[var(--ui-bg)] p-8 relative overflow-hidden">
            <!-- Decor -->
            <div class="absolute top-0 right-0 w-8 h-8 bg-[var(--color-primary)] clip-path-corner"></div>
            
            <h2 class="text-3xl font-black text-center mb-8 text-[var(--color-primary)]">AUTHENTICATE</h2>
            
            <div class="space-y-6">
                <div class="space-y-1">
                    <label class="text-xs font-bold text-[var(--color-secondary)] tracking-widest">USER_ID</label>
                    <div class="h-10 border-b border-[var(--color-text-muted)] bg-[var(--color-bg-subtle)] flex items-center px-2">
                        <span class="animate-pulse">|</span>
                    </div>
                </div>
                
                <div class="space-y-1">
                    <label class="text-xs font-bold text-[var(--color-secondary)] tracking-widest">PASSKEY</label>
                    <div class="h-10 border-b border-[var(--color-text-muted)] bg-[var(--color-bg-subtle)]"></div>
                </div>

                <button class="w-full h-12 bg-[var(--color-primary)] text-black font-bold tracking-[0.2em] hover:bg-white transition-colors mt-4">
                    ACCESS SYSTEM
                </button>
                
                <div class="flex justify-between text-[10px] text-[var(--color-text-muted)] mt-4">
                    <span>FORGOT CREDENTIALS?</span>
                    <span>ENCRYPTION: AES-256</span>
                </div>
            </div>
        </div>
    `
};

// 10. Dashboard Stats
export const COMPONENT_STATS = {
    html: `
        <div class="grid grid-cols-2 md:grid-cols-4 gap-4 w-full max-w-6xl mx-auto">
            <div class="border border-[var(--ui-border)] bg-[var(--ui-bg)] p-4 relative overflow-hidden">
                <div class="text-[var(--color-text-muted)] text-xs uppercase">Total Users</div>
                <div class="text-3xl font-bold text-[var(--color-primary)] mt-1">8,492</div>
                <div class="absolute bottom-0 left-0 w-full h-1 bg-[var(--color-primary)]"></div>
            </div>
            
            <div class="border border-[var(--ui-border)] bg-[var(--ui-bg)] p-4 relative overflow-hidden">
                <div class="text-[var(--color-text-muted)] text-xs uppercase">Revenue</div>
                <div class="text-3xl font-bold text-[var(--color-secondary)] mt-1">45.2K</div>
                <div class="absolute bottom-0 left-0 w-full h-1 bg-[var(--color-secondary)]"></div>
            </div>
            
            <div class="border border-[var(--ui-border)] bg-[var(--ui-bg)] p-4 relative overflow-hidden">
                <div class="text-[var(--color-text-muted)] text-xs uppercase">Active Nodes</div>
                <div class="text-3xl font-bold text-[var(--color-accent)] mt-1">142</div>
                <div class="absolute bottom-0 left-0 w-full h-1 bg-[var(--color-accent)]"></div>
            </div>

            <div class="border border-[var(--ui-border)] bg-[var(--ui-bg)] p-4 relative overflow-hidden">
                <div class="text-[var(--color-text-muted)] text-xs uppercase">System Health</div>
                <div class="text-3xl font-bold text-white mt-1">99.9%</div>
                <div class="absolute bottom-0 left-0 w-full h-1 bg-green-500"></div>
            </div>
            
            <div class="col-span-2 md:col-span-4 h-64 border border-[var(--ui-border)] bg-[var(--ui-bg)] mt-4 p-4 flex items-end gap-2">
                 <!-- Fake Graph -->
                 <div class="w-full bg-[var(--color-primary)] opacity-50 h-[40%]"></div>
                 <div class="w-full bg-[var(--color-primary)] opacity-60 h-[60%]"></div>
                 <div class="w-full bg-[var(--color-primary)] opacity-40 h-[30%]"></div>
                 <div class="w-full bg-[var(--color-primary)] opacity-80 h-[80%]"></div>
                 <div class="w-full bg-[var(--color-primary)] opacity-50 h-[50%]"></div>
            </div>
        </div>
    `
};