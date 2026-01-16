import { CONFIG } from './js/Config/master_config.js';

// ==========================================
// 1. COMPONENT RENDERER
// ==========================================
class ComponentRenderer {
    constructor(containerId, wrapperId) {
        this.container = document.getElementById(containerId);
        this.wrapper = document.getElementById(wrapperId);
    }

    render(structureData, designData) {
        if (!this.container || !this.wrapper) return;

        // Apply Design Styling
        // We override the style attribute completely to avoid leaks
        this.wrapper.style = designData.style || '';
        
        // Apply Classes
        // We ensure flex centering is always present so content doesn't fly off
        this.wrapper.className = `relative transition-all duration-500 w-full h-full flex flex-col justify-center items-center ${designData.wrapperClass || ''}`;

        // Inject HTML
        this.container.innerHTML = structureData.html || '<div class="text-center p-8 opacity-50">Select a Component...</div>';
    }
}

// ==========================================
// 2. MEGA MENU SYSTEM (UI Enhanced)
// ==========================================
class MegaMenuSystem {
    constructor(stateManager) {
        this.stateManager = stateManager;
        this.container = document.getElementById('ui-layer');
        this.activeDrawer = null;
        
        this.menus = [
            { id: 'structure', label: 'STRUCTURE', icon: '⬡', type: 'grid', config: CONFIG.structures },
            { id: 'design',    label: 'DESIGN',    icon: '◈', type: 'grid', config: CONFIG.designs },
            { id: 'palette',   label: 'COLORS',    icon: '◐', type: 'list', config: CONFIG.colors },
            { id: 'typo',      label: 'TYPO',      icon: 'Aa', type: 'list', config: CONFIG.typography },
            { id: 'export',    label: 'EXPORT',    icon: '⬇', type: 'action' } 
        ];

        this.render();
    }

    render() {
        // Dock UI (Bottom Bar)
        const dock = document.createElement('div');
        dock.className = "w-full pointer-events-auto bg-black/90 border-t border-white/10 backdrop-blur-xl p-4 flex items-center justify-center gap-2 md:gap-6 z-50 fixed bottom-0 left-0 right-0 shadow-[0_-10px_40px_rgba(0,0,0,0.5)]";
        
        this.menus.forEach(menu => {
            const btn = document.createElement('button');
            // Enhanced Button UI
            btn.className = `
                flex flex-col items-center justify-center w-20 h-16 rounded transition-all duration-200
                hover:bg-white/5 border border-transparent hover:border-white/20
                text-[10px] tracking-widest font-bold group relative overflow-hidden
            `;
            btn.innerHTML = `
                <div class="absolute inset-0 bg-gradient-to-t from-cyan-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <span class="text-xl mb-1 group-hover:text-cyan-400 transition-colors z-10">${menu.icon}</span>
                <span class="opacity-50 group-hover:opacity-100 text-[9px] z-10">${menu.label}</span>
            `;
            btn.onclick = () => this.toggleDrawer(menu);
            dock.appendChild(btn);
        });

        // Drawer UI
        this.drawerEl = document.createElement('div');
        this.drawerEl.className = "absolute bottom-[88px] left-0 right-0 h-[50vh] md:h-[60vh] bg-black/95 backdrop-blur-2xl border-t border-cyan-500/30 transform translate-y-[120%] transition-transform duration-300 pointer-events-auto flex flex-col shadow-[0_-10px_50px_rgba(0,0,0,0.9)] z-40";
        
        this.drawerHeader = document.createElement('div');
        this.drawerHeader.className = "h-14 border-b border-white/10 flex items-center justify-between px-6 bg-white/5";
        this.drawerTitle = document.createElement('h2');
        this.drawerTitle.className = "text-cyan-400 font-bold tracking-[0.2em] text-xs md:text-sm uppercase";
        
        const closeBtn = document.createElement('button');
        closeBtn.innerHTML = "✕ CLOSE";
        closeBtn.className = "text-[10px] font-bold hover:text-red-400 transition-colors tracking-widest";
        closeBtn.onclick = () => this.closeDrawer();

        this.drawerHeader.appendChild(this.drawerTitle);
        this.drawerHeader.appendChild(closeBtn);

        this.drawerContent = document.createElement('div');
        this.drawerContent.className = "flex-1 overflow-y-auto scifi-scroll p-4 md:p-8";

        this.drawerEl.appendChild(this.drawerHeader);
        this.drawerEl.appendChild(this.drawerContent);

        this.container.appendChild(this.drawerEl);
        this.container.appendChild(dock);
    }

    toggleDrawer(menu) {
        if (this.activeDrawer === menu.id) {
            this.closeDrawer();
            return;
        }
        
        this.activeDrawer = menu.id;
        this.drawerTitle.innerText = `// SELECT_MODULE: ${menu.label}`;
        this.drawerContent.innerHTML = ''; 
        
        if (menu.id === 'export') {
            this.renderExportPanel();
        } else {
            this.renderGrid(menu);
        }

        this.drawerEl.classList.remove('translate-y-[120%]');
        this.drawerEl.classList.add('translate-y-0');
    }

    closeDrawer() {
        this.activeDrawer = null;
        this.drawerEl.classList.remove('translate-y-0');
        this.drawerEl.classList.add('translate-y-[120%]');
    }

    renderGrid(menu) {
        const grid = document.createElement('div');
        // Responsive Grid
        grid.className = "grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 md:gap-4";

        if (!menu.config) {
             grid.innerHTML = '<div class="text-red-500 p-4">Error: Configuration missing.</div>';
             this.drawerContent.appendChild(grid);
             return;
        }

        Object.entries(menu.config).forEach(([key, item]) => {
            const card = document.createElement('button');
            
            // Check active state
            let isActive = false;
            if (menu.id === 'structure') isActive = this.stateManager.state.structure === key;
            else if (menu.id === 'design') isActive = this.stateManager.state.design === key;
            else if (menu.id === 'palette') isActive = this.stateManager.state.color === key;
            else if (menu.id === 'typo') isActive = this.stateManager.state.typography === key;

            // Tech Card UI
            card.className = `
                relative group flex flex-col items-start p-3 md:p-4 border text-left transition-all duration-200 h-24 md:h-32 justify-between
                ${isActive 
                    ? 'border-cyan-500 bg-cyan-900/10 shadow-[0_0_15px_rgba(6,182,212,0.2)]' 
                    : 'border-white/10 hover:border-white/40 bg-white/5 hover:bg-white/10'}
            `;
            
            // Corner Accents
            const corner = `<div class="absolute top-0 right-0 w-2 h-2 border-t border-r ${isActive ? 'border-cyan-500' : 'border-white/30'}"></div>`;
            const bottomCorner = `<div class="absolute bottom-0 left-0 w-2 h-2 border-b border-l ${isActive ? 'border-cyan-500' : 'border-white/30'}"></div>`;

            card.innerHTML = `
                ${corner}
                ${bottomCorner}
                <div class="text-[9px] font-mono opacity-40 mb-1 uppercase tracking-wider w-full overflow-hidden text-ellipsis whitespace-nowrap">
                    ID_${key.substring(0, 6)}
                </div>
                <div class="text-xs md:text-sm font-bold ${isActive ? 'text-cyan-400' : 'text-white'} leading-tight">
                    ${item.label}
                </div>
                <div class="w-full h-0.5 bg-white/10 mt-2 overflow-hidden">
                    ${isActive ? '<div class="h-full bg-cyan-500 w-full animate-[moveRight_1s_ease-out]"></div>' : ''}
                </div>
            `;

            card.onclick = () => {
                let stateKey = menu.id;
                if (menu.id === 'palette') stateKey = 'color';
                if (menu.id === 'typo') stateKey = 'typography';
                
                this.stateManager.update(stateKey, key);
                this.renderGrid(menu); 
            };

            grid.appendChild(card);
        });

        this.drawerContent.appendChild(grid);
    }

    renderExportPanel() {
        const wrapper = document.createElement('div');
        wrapper.className = "max-w-4xl mx-auto flex flex-col h-full";
        
        const codeBlock = document.createElement('textarea');
        codeBlock.className = "flex-1 bg-black border border-white/20 p-4 font-mono text-xs text-green-400 resize-none focus:outline-none focus:border-cyan-500 rounded mb-4";
        codeBlock.readOnly = true;
        codeBlock.value = "Generating Code...";
        
        // Async update to avoid blocking UI
        setTimeout(() => {
            codeBlock.value = this.stateManager.generateExportCode();
        }, 100);

        const actionRow = document.createElement('div');
        actionRow.className = "flex justify-end gap-4";

        const copyBtn = document.createElement('button');
        copyBtn.className = "bg-cyan-600 hover:bg-cyan-500 text-black font-bold px-8 py-3 rounded text-sm tracking-widest transition-colors";
        copyBtn.innerText = "COPY TO CLIPBOARD";
        
        copyBtn.onclick = () => {
            navigator.clipboard.writeText(codeBlock.value).then(() => {
                copyBtn.innerText = "COPIED!";
                copyBtn.classList.add("bg-green-500", "text-white");
                setTimeout(() => {
                    copyBtn.innerText = "COPY TO CLIPBOARD";
                    copyBtn.classList.remove("bg-green-500", "text-white");
                }, 2000);
            });
        };

        actionRow.appendChild(copyBtn);
        wrapper.appendChild(codeBlock);
        wrapper.appendChild(actionRow);
        
        this.drawerContent.appendChild(wrapper);
    }
}

// ==========================================
// 3. MAIN APP LOGIC
// ==========================================
class App {
    constructor() {
        // Target content-layer directly, bypassing legacy SVG layer
        this.renderer = new ComponentRenderer('content-layer', 'frame-wrapper');
        
        this.state = {
            structure: 'sidebar',
            design: 'flat',     // Changed default to 'flat' to avoid confusion
            color: 'mono_cyan', 
            typography: 'mono'
        };

        this.ui = new MegaMenuSystem(this);
        this.updateView();
    }

    update(key, value) {
        this.state[key] = value;
        this.updateView();
    }

    updateView() {
        const getSafe = (root, key) => (root && root[key] ? root[key].data : {});

        const structure = getSafe(CONFIG.structures, this.state.structure);
        const design    = getSafe(CONFIG.designs, this.state.design);
        const color     = getSafe(CONFIG.colors, this.state.color);
        const typography= getSafe(CONFIG.typography, this.state.typography);

        // Combine Styles
        const combinedStyle = `
            ${design.style || ''}
            ${color.styles || ''} 
            ${typography.style || ''}
            font-family: var(--font-main);
        `;

        const mergedDesignData = {
            style: combinedStyle,
            wrapperClass: design.wrapperClass
        };

        this.renderer.render(structure, mergedDesignData);
    }

    generateExportCode() {
        const getSafe = (root, key) => (root && root[key] ? root[key].data : {});
        const structure = getSafe(CONFIG.structures, this.state.structure);
        const design    = getSafe(CONFIG.designs, this.state.design);
        const color     = getSafe(CONFIG.colors, this.state.color);
        const typography= getSafe(CONFIG.typography, this.state.typography);

        // SMART FONT LOADING: Only include the active font's URL
        const fontLink = typography.url 
            ? `<link href="${typography.url}" rel="stylesheet">`
            : '<!-- No external font loaded -->';

        return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Export: ${this.state.structure}</title>
    <script src="https://cdn.tailwindcss.com"></script>
    
    <!-- DYNAMIC FONT LOADER -->
    ${fontLink}

    <style>
        :root {
            /* 1. DESIGN (FORM FACTOR) */
            ${design.style || ''}
            /* 2. COLORS (INK) */
            ${color.styles || ''}
            /* 3. TYPOGRAPHY */
            ${typography.style || ''}
        }
        
        body { 
            background-color: #000; 
            color: var(--color-text-main); 
            font-family: var(--font-main);
            display: flex;
            align-items: center;
            justify-content: center;
            min-height: 100vh;
            padding: 2rem;
            overflow: hidden;
        }

        /* Essential Animations */
        @keyframes scanline { 0% { transform: translateY(-100%); } 100% { transform: translateY(100%); } }
        @keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.5; } }
        @keyframes moveRight { from { width: 0; } to { width: 100%; } }
    </style>
</head>
<body>

    <!-- COMPONENT WRAPPER -->
    <div class="${design.wrapperClass || ''} w-full h-full flex flex-col justify-center items-center relative">
        ${structure.html || '<!-- No Structure Selected -->'}
    </div>

</body>
</html>`;
    }
}

document.addEventListener('DOMContentLoaded', () => {
    window.scifiApp = new App();
});