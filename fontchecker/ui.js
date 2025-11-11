/* ===============================================================
  PART 7: THE UI MODULE (ui.js)
  
  This module handles all DOM initialization and updates.
  - Initializes tabs, sidebar, modal, viewport controls.
  - Creates the Page Builder and Font Target UIs.
  - Updates all control inputs based on the app state.
  - Runs the live accessibility (contrast) checker.
  - Wires up helper buttons like "Copy CSS".
  ===============================================================
*/

import { FONT_TARGETS_CONFIG } from './state.js';

// --- UI Initialization ---

export function initTabs() {
    const tabButtons = document.querySelectorAll('.tab-button');
    const tabPanels = document.querySelectorAll('.tab-panel');

    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            const tabId = button.dataset.tab;
            
            tabButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            
            tabPanels.forEach(panel => {
                panel.classList.toggle('active', panel.id === tabId);
            });
        });
    });
    // Set initial active tab
    document.querySelector('.tab-button[data-tab="tab-fonts"]').click();
}

export function initSidebarToggle() {
    const toggleBtn = document.getElementById('toggle-btn');
    const sidebar = document.getElementById('controls-sidebar');
    const sidebarInner = document.getElementById('sidebar-inner');
    const minimizeIcon = document.getElementById('minimize-icon');
    const maximizeIcon = document.getElementById('maximize-icon');

    toggleBtn.addEventListener('click', () => {
        const isMinimized = sidebar.classList.contains('md:w-0');
        
        if (isMinimized) { // Maximize
            sidebar.classList.add('md:w-80', 'lg:w-96', 'p-6');
            sidebar.classList.remove('md:w-0', 'p-0');
            sidebarInner.classList.remove('hidden');
        } else { // Minimize
            sidebar.classList.remove('md:w-80', 'lg:w-96', 'p-6');
            sidebar.classList.add('md:w-0', 'p-0');
            sidebarInner.classList.add('hidden');
        }
        minimizeIcon.classList.toggle('hidden');
        maximizeIcon.classList.toggle('hidden');
    });
}

export function initViewportControls() {
    const wrapper = document.getElementById('preview-area-wrapper');
    const outerWrapper = document.getElementById('preview-wrapper-outer');
    
    document.getElementById('viewport-controls').addEventListener('click', (e) => {
        const btn = e.target.closest('.viewport-btn');
        if (!btn) return;

        const size = btn.dataset.size;
        wrapper.style.width = size;

        // Add/remove padding for desktop view
        outerWrapper.style.padding = (size === '100%') ? '2rem' : '0';

        // Update active class
        document.querySelectorAll('.viewport-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
    });
}

export function initModal() {
    const modal = document.getElementById('help-modal');
    const openBtn = document.getElementById('help-btn');
    const closeBtn = document.getElementById('close-modal-btn');

    openBtn.addEventListener('click', () => modal.classList.remove('hidden'));
    closeBtn.addEventListener('click', () => modal.classList.add('hidden'));
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.classList.add('hidden');
        }
    });
}

export function initPageBuilderUI(componentLibrary, onChangeCallback) {
    const container = document.getElementById('page-builder-container');
    container.innerHTML = '';
    
    for (const category in componentLibrary) {
        const el = document.createElement('div');
        let optionsHtml = `<option value="${category}:none">-- None --</option>`;
        
        for (const key in componentLibrary[category]) {
            if (key !== 'none') {
                const component = componentLibrary[category][key];
                optionsHtml += `<option value="${category}:${key}">${component.name}</option>`;
            }
        }

        const label = category.charAt(0).toUpperCase() + category.slice(1)
            .replace('contentSections1', 'Content A')
            .replace('contentSections2', 'Content B');

        el.innerHTML = `
            <label for="builder-select-${category}" class="block text-sm font-medium text-gray-700 mb-1">${label}</label>
            <select id="builder-select-${category}" data-category="${category}" class="component-selector block w-full pl-3 pr-10 py-2.5 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 rounded-md shadow-sm appearance-none">
                ${optionsHtml}
            </select>
        `;
        container.appendChild(el);
    }
    container.addEventListener('change', onChangeCallback);
}

export function initFontTargetUI(callbacks) {
    const container = document.getElementById('font-targets-container');
    container.innerHTML = ''; // Clear
    
    for (const target of FONT_TARGETS_CONFIG) {
        const el = document.createElement('details');
        el.className = 'font-target-details bg-gray-50 border border-gray-200 rounded-lg';
        // Add [open] attribute to 'headings' and 'body' by default
        if (target.id === 'headings' || target.id === 'body') {
            el.open = true;
        }
        
        el.innerHTML = `
            <summary class="p-4 flex justify-between items-center cursor-pointer">
                <span class="font-medium text-gray-800">${target.label}</span>
            </summary>
            <div class="p-4 border-t border-gray-200 space-y-4">
                <!-- Font Selector (Searchable Input) -->
                <div class="flex space-x-2">
                    <input 
                        id="select-${target.id}" 
                        data-target-id="${target.id}" 
                        data-type="font" 
                        class="font-target-control block w-full pl-3 py-2.5 text-base border-gray-300 rounded-md shadow-sm"
                        list="font-datalist" 
                        placeholder="Search fonts... (Default)"
                        autocomplete="off" 
                    >
                    <button title="Lock Font" data-target-id="${target.id}" class="font-target-lock flex-shrink-0 p-2.5 border border-gray-300 bg-white rounded-md shadow-sm hover:bg-gray-100">
                        <svg class="w-5 h-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10 1a4 4 0 00-4 4v2H5a2 2 0 00-2 2v6a2 2 0 002 2h10a2 2 0 002-2V9a2 2 0 00-2-2h-1V5a4 4 0 00-4-4zm2 5V5a2 2 0 10-4 0v1h4zM5 9v6h10V9H5z" clip-rule="evenodd"></path></svg>
                    </button>
                    <button title="Randomize Font" data-target-id="${target.id}" class="font-target-random flex-shrink-0 p-2.5 border border-gray-300 bg-white rounded-md shadow-sm hover:bg-gray-100">
                        <svg class="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2.5A8.001 8.001 0 004.582 9H3m18 0v5h-.581m-15.357-2.5A8.001 8.001 0 0019.418 15H21M4 12H3m18 0h-1m-2.5-7.418A8.001 8.001 0 009 4.582V3m7.418 2.5A8.001 8.001 0 0015 19.418V21"></path></svg>
                    </button>
                </div>
                <!-- Individual Tweaks -->
                <div>
                    <label class="block text-xs font-medium text-gray-500 mb-1">Font Size (px)</label>
                    <input id="size-${target.id}" data-target-id="${target.id}" data-type="size" type="number" placeholder="Default" min="8" max="150" class="font-target-control w-full p-2 border border-gray-300 rounded-md shadow-sm text-sm">
                </div>
                <div>
                    <label class="block text-xs font-medium text-gray-500 mb-1">Font Weight</label>
                    <input id="weight-${target.id}" data-target-id="${target.id}" data-type="weight" type="number" placeholder="Default" min="100" max="900" step="100" class="font-target-control w-full p-2 border border-gray-300 rounded-md shadow-sm text-sm">
                </div>
                <div>
                    <label class="block text-xs font-medium text-gray-500 mb-1">Letter Spacing (em)</label>
                    <input id="spacing-${target.id}" data-target-id="${target.id}" data-type="spacing" type="number" placeholder="Default" min="-0.2" max="0.5" step="0.01" class="font-target-control w-full p-2 border border-gray-300 rounded-md shadow-sm text-sm">
                </div>
            </div>
        `;
        container.appendChild(el);
    }
    
    // Add event listeners
    container.querySelectorAll('.font-target-control').forEach(el => el.addEventListener('input', callbacks.onFontControlChange));
    container.querySelectorAll('.font-target-lock').forEach(btn => btn.addEventListener('click', callbacks.onLockClick));
    container.querySelectorAll('.font-target-random').forEach(btn => btn.addEventListener('click', callbacks.onRandomClick));
}

export function initClipboard() {
    document.getElementById('copy-css-btn').addEventListener('click', () => {
        const cssOutput = document.getElementById('css-output');
        if (!cssOutput.value) {
            alert("Please generate the CSS first.");
            return;
        }
        
        // Use document.execCommand for iframe compatibility
        cssOutput.select();
        document.execCommand('copy');
        
        // Show temporary success feedback
        const btn = document.getElementById('copy-css-btn');
        const originalIcon = btn.innerHTML;
        btn.innerHTML = '<i class="ph ph-check text-green-400"></i>';
        setTimeout(() => { btn.innerHTML = originalIcon; }, 2000);
    });
}

// --- UI Updates (from State) ---

/**
 * Updates the global <datalist> with the master font list.
 * @param {string[]} fontList - The master list of font names.
 */
export function updateDatalist(fontList) {
    const datalist = document.getElementById('font-datalist');
    const datalistOptions = fontList.map(font => 
        `<option value="${font}"></option>`
    ).join('');
    datalist.innerHTML = datalistOptions;
}

/**
 * Syncs the "Controls" tab inputs with the current appState.fonts.
 * @param {object} appState - The main application state.
 */
export function updateFontTargetControls(appState) {
    for (const target of FONT_TARGETS_CONFIG) {
        const config = appState.fonts[target.id];
        
        const fontInput = document.getElementById(`select-${target.id}`);
        fontInput.value = (config.font === 'Default') ? '' : config.font;
        fontInput.placeholder = (config.font === 'Default') ? 'Search fonts... (Default)' : config.font;

        document.getElementById(`size-${target.id}`).value = (config.size === 'default') ? '' : config.size;
        document.getElementById(`weight-${target.id}`).value = (config.weight === 'default') ? '' : config.weight;
        document.getElementById(`spacing-${target.id}`).value = (config.spacing === 'default') ? '' : config.spacing;
        
        const lockBtn = document.querySelector(`.font-target-lock[data-target-id="${target.id}"]`);
        lockBtn.classList.toggle('locked', config.locked);
        lockBtn.title = config.locked ? 'Unlock Font' : 'Lock Font';
    }
}

/**
 * Syncs the "Global Tweaks" tab controls with the current appState.
 * @param {object} appState - The main application state.
 */
export function updateGlobalTweakControls(appState) {
    const tweaks = appState.globalTweaks;
    
    document.getElementById('size-slider').value = tweaks.fontSize;
    document.getElementById('size-value').textContent = `${tweaks.fontSize}px`;
    document.getElementById('weight-slider').value = tweaks.fontWeight;
    document.getElementById('weight-value').textContent = tweaks.fontWeight;
    document.getElementById('height-slider').value = tweaks.lineHeight;
    document.getElementById('height-value').textContent = tweaks.lineHeight;
    document.getElementById('spacing-slider').value = tweaks.letterSpacing;
    document.getElementById('spacing-value').textContent = `${tweaks.letterSpacing}em`;
    
    document.getElementById('text-color-picker').value = tweaks.textColor;
    document.getElementById('bg-color-picker').value = tweaks.bgColor;

    // Helper to get default value from picker's data attribute
    const getDefault = (id) => document.getElementById(id).dataset.default;

    document.getElementById('heading-color-picker').value = (tweaks.headingColor === 'default') ? getDefault('heading-color-picker') : tweaks.headingColor;
    document.getElementById('accent-color-picker').value = (tweaks.accentColor === 'default') ? getDefault('accent-color-picker') : tweaks.accentColor;
    document.getElementById('btn-bg-color-picker').value = (tweaks.btnBgColor === 'default') ? getDefault('btn-bg-color-picker') : tweaks.btnBgColor;
    document.getElementById('btn-text-color-picker').value = (tweaks.btnTextColor === 'default') ? getDefault('btn-text-color-picker') : tweaks.btnTextColor;
    
    // Update dark mode toggle
    document.getElementById('dark-mode-toggle').textContent = tweaks.darkMode ? "Disable Dark Mode" : "Enable Dark Mode";
}

/**
 * Syncs the "Page Builder" <select> controls with the current appState.layout.
 * @param {object} appState - The main application state.
 */
export function updatePageBuilderControls(appState) {
    if (!appState.layout) return;
    for (const category in appState.layout) {
        const sel = document.getElementById(`builder-select-${category}`);
        if (sel) {
            sel.value = appState.layout[category];
        }
    }
}

/**
 * Updates the Google Font search results UI.
 * @param {object[]} fonts - An array of font objects to display.
 * @param {string[]} addedFonts - An array of font names that are already added.
 */
export function updateGoogleFontResults(fonts, addedFonts) {
    const container = document.getElementById('google-font-results');
    if (fonts.length === 0) {
        container.innerHTML = `<p class="p-4 text-center text-gray-500">No fonts found.</p>`;
        return;
    }
    
    container.innerHTML = fonts.map(font => {
        const isAdded = addedFonts.includes(font.name);
        return `
            <div class="result-item">
                <span style="font-family: '${font.name}', ${font.category}; font-size: 1.1rem;">${font.name}</span>
                <button 
                    class="add-font-btn" 
                    data-font-name="${font.name}" 
                    ${isAdded ? 'disabled' : ''}
                >
                    ${isAdded ? 'Added' : 'Add'}
                </button>
            </div>
        `;
    }).join('');
}

/**
 * Updates the list of added local fonts in the UI.
 * @param {string} fontName - The name of the font that was added.
 */
export function updateLocalFontListUI(fontName) {
    const container = document.getElementById('local-font-list');
    const el = document.createElement('div');
    el.className = 'local-font-item';
    el.textContent = `Added: ${fontName}`;
    container.appendChild(el);
}

// --- Accessibility Checker ---

let a11yEls = {};
let a11yTimeout;

export function initAccessibilityChecker(appState, applyCallback) {
    a11yEls = {
        text: document.getElementById('a11y-text'),
        headings: document.getElementById('a11y-headings'),
        buttons: document.getElementById('a11y-buttons'),
    };
    
    // Listen to all color pickers
    const pickers = ['text-color-picker', 'bg-color-picker', 'heading-color-picker', 'btn-bg-color-picker', 'btn-text-color-picker'];
    pickers.forEach(id => {
        document.getElementById(id).addEventListener('input', () => {
            // Debounce the check
            clearTimeout(a11yTimeout);
            a11yTimeout = setTimeout(() => runA11yCheck(appState), 300);
        });
    });
    
    // Also run on dark mode toggle
    document.getElementById('dark-mode-toggle').addEventListener('click', () => runA11yCheck(appState));
    
    // Initial run
    runA11yCheck(appState);
}

function runA11yCheck(appState) {
    const tweaks = appState.globalTweaks;
    const defaults = {
        text: document.getElementById('text-color-picker').dataset.default,
        bg: document.getElementById('bg-color-picker').dataset.default,
        headings: document.getElementById('heading-color-picker').dataset.default,
        btnBg: document.getElementById('btn-bg-color-picker').dataset.default,
        btnText: document.getElementById('btn-text-color-picker').dataset.default,
    };

    // Determine effective colors
    const text = tweaks.textColor;
    const bg = tweaks.bgColor;
    const headings = (tweaks.headingColor === 'default') ? (tweKS.darkMode ? '#f8fafc' : defaults.headings) : tweaks.headingColor;
    const btnBg = (tweaks.btnBgColor === 'default') ? (tweKS.darkMode ? '#2563eb' : defaults.btnBg) : tweaks.btnBgColor;
    const btnText = (tweaks.btnTextColor === 'default') ? (tweKS.darkMode ? '#ffffff' : defaults.btnText) : tweaks.btnTextColor;
    
    // Calculate and render
    updateA11yResult(a11yEls.text, text, bg);
    updateA11yResult(a11yEls.headings, headings, bg);
    updateA11yResult(a11yEls.buttons, btnText, btnBg);
}

function updateA11yResult(el, color1, color2) {
    const ratio = getContrastRatio(color1, color2);
    const aa = checkWCAG(ratio, 'AA');
    const aaa = checkWCAG(ratio, 'AAA');
    
    el.innerHTML = `
        <span>${el.id.replace('a11y-', '')}: <strong>${ratio.toFixed(2)}</strong></span>
        <div>
            ${createA11yBadge('AA', aa)}
            ${createA11yBadge('AAA', aaa)}
        </div>
    `;
}

function createA11yBadge(level, pass) {
    return `<span class="a11y-badge ${pass ? 'pass' : 'fail'}">${level}</span>`;
}

function checkWCAG(ratio, level, large = false) {
    if (level === 'AA') {
        return large ? ratio >= 3 : ratio >= 4.5;
    } else if (level === 'AAA') {
        return large ? ratio >= 4.5 : ratio >= 7;
    }
    return false;
}

// --- Contrast Calculation Helpers ---

/**
 * Calculates the contrast ratio between two hex colors.
 * @param {string} hex1 - e.g., #FFFFFF
 * @param {string} hex2 - e.g., #000000
 * @returns {number} The contrast ratio.
 */
function getContrastRatio(hex1, hex2) {
    const lum1 = getLuminance(hex1);
    const lum2 = getLuminance(hex2);
    const lightest = Math.max(lum1, lum2);
    const darkest = Math.min(lum1, lum2);
    return (lightest + 0.05) / (darkest + 0.05);
}

/**
 * Gets the relative luminance of a hex color.
 * @param {string} hex - e.g., #FFFFFF
 * @returns {number} The relative luminance (0 to 1).
 */
function getLuminance(hex) {
    const rgb = hexToRgb(hex);
    if (!rgb) return 0;
    
    const [r, g, b] = Object.values(rgb).map(c => {
        c /= 255;
        return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
    });
    
    return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

/**
 * Converts a hex color string to an RGB object.
 * @param {string} hex - e.g., #FFF or #FFFFFF
 * @returns {object | null} - e.g., { r: 255, g: 255, b: 255 }
 */
function hexToRgb(hex) {
    hex = hex.replace(/^#/, '');
    if (hex.length === 3) {
        hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
    }
    if (hex.length !== 6) {
        return null; // Invalid hex
    }
    const bigint = parseInt(hex, 16);
    return {
        r: (bigint >> 16) & 255,
        g: (bigint >> 8) & 255,
        b: bigint & 255
    };
}