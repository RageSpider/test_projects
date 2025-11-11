/* ===============================================================
  PART 2: THE MAIN APP LOGIC (app.js)
  
  This is the V2.0 refactored "controller".
  - It imports all modules (state, ui, fonts, designs).
  - It initializes the application.
  - It wires up all event listeners and connects them to the
    state, font, and UI modules.
  - It handles the core logic of updating the design and
    generating the final CSS.
  ===============================================================
*/

// --- Module Imports ---
import { componentLibrary } from './designs.js';
import * as State from './state.js';
import * as FontService from './fontService.js';
import * as UI from './ui.js';

document.addEventListener('DOMContentLoaded', () => {
    
    // --- Global State ---
    let appState = State.loadState();
    let masterFontList = [];

    // --- DOM Elements ---
    const previewArea = document.getElementById('preview-area');
    const fontCountEl = document.getElementById('font-count');
    const loaderContainer = document.getElementById('loader-container');
    const randomizeAllBtn = document.getElementById('randomize-all-btn');
    const randomizePageBtn = document.getElementById('randomize-page-btn');
    const resetTweaksBtn = document.getElementById('reset-tweaks-btn');
    const darkModeToggle = document.getElementById('dark-mode-toggle');
    const presetNameInput = document.getElementById('preset-name-input');
    const savePresetBtn = document.getElementById('save-preset-btn');
    const presetSelect = document.getElementById('preset-select');
    const deletePresetBtn = document.getElementById('delete-preset-btn');
    const generateCssBtn = document.getElementById('generate-css-btn');
    const cssOutput = document.getElementById('css-output');
    const exportThemeBtn = document.getElementById('export-theme-btn');
    const importThemeBtn = document.getElementById('import-theme-btn');
    const importThemeInput = document.getElementById('import-theme-input');
    
    // --- Dynamic Style Tag ---
    let dynamicStyleTag;

    // --- Core Functions ---
    
    /**
     * Initializes the entire application.
     */
    async function init() {
        console.log("[App] Initializing Font Checker v2.0");
        
        // 1. Init basic UI (tabs, sidebar, etc.)
        UI.initTabs();
        UI.initSidebarToggle();
        UI.initViewportControls();
        UI.initModal();
        UI.initClipboard();
        createDynamicStyleTag();

        // 2. Load fonts
        FontService.initFontTags();
        try {
            const count = await FontService.loadSoftwareFonts('../webfonts/fonts.css');
            fontCountEl.textContent = `Loaded ${count} software fonts.`;
            FontService.loadSavedGoogleFonts(); // Load Google Fonts from localStorage
            masterFontList = FontService.getMasterFontList();
            UI.updateDatalist(masterFontList);
            loaderContainer.style.display = 'none';
        } catch (error) {
            loaderContainer.innerHTML = `<span class="text-red-500 text-sm"><b>Error loading fonts.</b><br>${error.message}</span>`;
            console.error(error);
        }

        // 3. Init UI that depends on fonts and state
        UI.initPageBuilderUI(componentLibrary, onPageBuilderChange);
        UI.initFontTargetUI({
            onFontControlChange: onFontControlChange,
            onLockClick: onLockClick,
            onRandomClick: onRandomClick
        });
        
        // 4. Wire up all other event listeners
        initGlobalTweakControls();
        initPresetControls();
        initThemeImportExport();
        initFontSourceControls();
        
        // 5. Apply loaded state
        updateAllControlsFromState();
        updateDesign();
        UI.initAccessibilityChecker(appState, applyAllStyles);

        // 6. Setup auto-save
        window.addEventListener('beforeunload', () => {
            State.saveState(appState);
        });

        console.log("[App] Initialization complete.");
    }

    /**
     * Creates a <style> tag in the <head> to inject dynamic CSS.
     */
    function createDynamicStyleTag() {
        dynamicStyleTag = document.createElement('style');
        dynamicStyleTag.id = 'dynamic-styles';
        document.head.appendChild(dynamicStyleTag);
    }
    
    /**
     * Wires up all sliders and color pickers in the "Global Tweaks" tab.
     */
    function initGlobalTweakControls() {
        const sliders = [
            { id: 'size-slider', prop: 'fontSize', el: 'size-value', suffix: 'px' },
            { id: 'weight-slider', prop: 'fontWeight', el: 'weight-value', suffix: '' },
            { id: 'height-slider', prop: 'lineHeight', el: 'height-value', suffix: '' },
            { id: 'spacing-slider', prop: 'letterSpacing', el: 'spacing-value', suffix: 'em' },
        ];
        
        sliders.forEach(slider => {
            document.getElementById(slider.id).addEventListener('input', (e) => {
                const value = e.target.value;
                appState.globalTweaks[slider.prop] = value;
                document.getElementById(slider.el).textContent = `${value}${slider.suffix}`;
                applyAllStyles();
            });
        });

        const colorPickers = [
            { id: 'text-color-picker', prop: 'textColor' },
            { id: 'bg-color-picker', prop: 'bgColor' },
            { id: 'heading-color-picker', prop: 'headingColor' },
            { id: 'accent-color-picker', prop: 'accentColor' },
            { id: 'btn-bg-color-picker', prop: 'btnBgColor' },
            { id: 'btn-text-color-picker', prop: 'btnTextColor' },
        ];

        colorPickers.forEach(picker => {
            document.getElementById(picker.id).addEventListener('input', (e) => {
                appState.globalTweaks[picker.prop] = e.target.value;
                applyAllStyles();
            });
        });
        
        // Dark Mode Toggle
        darkModeToggle.addEventListener('click', () => {
            const isDark = !appState.globalTweaks.darkMode;
            appState.globalTweaks.darkMode = isDark;
            
            const defaults = {
                text: document.getElementById('text-color-picker').dataset.default,
                bg: document.getElementById('bg-color-picker').dataset.default,
                headings: document.getElementById('heading-color-picker').dataset.default,
                accent: document.getElementById('accent-color-picker').dataset.default,
                btnBg: document.getElementById('btn-bg-color-picker').dataset.default,
                btnText: document.getElementById('btn-text-color-picker').dataset.default,
            };

            if (isDark) {
                appState.globalTweaks.textColor = '#e2e8f0'; // slate-200
                appState.globalTweaks.bgColor = '#0f172a'; // slate-900
                appState.globalTweaks.headingColor = '#f8fafc'; // slate-50
                appState.globalTweaks.accentColor = '#94a3b8'; // slate-400
                appState.globalTweaks.btnBgColor = '#2563eb'; // blue-600
                appState.globalTweaks.btnTextColor = '#ffffff'; // white
            } else {
                // Reset to light mode defaults
                appState.globalTweaks.textColor = defaults.text;
                appState.globalTweaks.bgColor = defaults.bg;
                appState.globalTweaks.headingColor = defaults.headings;
                appState.globalTweaks.accentColor = defaults.accent;
                appState.globalTweaks.btnBgColor = defaults.btnBg;
                appState.globalTweaks.btnTextColor = defaults.btnText;
            }
            UI.updateGlobalTweakControls(appState);
            applyAllStyles();
        });
        
        // Reset Tweaks
        resetTweaksBtn.addEventListener('click', () => {
            const isDark = appState.globalTweaks.darkMode;
            // Get a fresh set of initial tweaks
            const initialTweaks = State.getInitialState().globalTweaks;
            
            // Re-apply dark mode if it was on
            if (isDark) {
                initialTweaks.textColor = '#e2e8f0';
                initialTweaks.bgColor = '#0f172a';
                initialTweaks.headingColor = '#f8fafc';
                initialTweaks.accentColor = '#94a3b8';
                initialTweaks.btnBgColor = '#2563eb';
                initialTweaks.btnTextColor = '#ffffff';
                initialTweaks.darkMode = true;
            }

            appState.globalTweaks = { ...initialTweaks };
            UI.updateGlobalTweakControls(appState);
            applyAllStyles();
        });

        // Randomize Buttons
        randomizeAllBtn.addEventListener('click', onRandomizeAll);
        randomizePageBtn.addEventListener('click', onRandomizePage);
    }

    /**
     * Wires up the "Presets" tab controls.
     */
    function initPresetControls() {
        State.populatePresetList(presetSelect);

        savePresetBtn.addEventListener('click', () => {
            const name = presetNameInput.value.trim();
            if (State.savePreset(name, appState)) {
                State.populatePresetList(presetSelect);
                presetSelect.value = name;
                presetNameInput.value = '';
            }
        });

        presetSelect.addEventListener('change', (e) => {
            const presetState = State.loadPreset(e.target.value);
            if (presetState) {
                // Load state
                appState.fonts = presetState.fonts;
                appState.layout = presetState.layout;
                appState.globalTweaks = presetState.globalTweaks;
                
                // Update UI
                updateAllControlsFromState();
                updateDesign(); // Rebuild page with saved layout
            }
        });

        deletePresetBtn.addEventListener('click', () => {
            if (State.deletePreset(presetSelect.value)) {
                State.populatePresetList(presetSelect);
            }
        });
    }

    /**
     * Wires up the "Export" tab controls.
     */
    function initThemeImportExport() {
        generateCssBtn.addEventListener('click', () => {
            cssOutput.value = generateCSS();
        });

        exportThemeBtn.addEventListener('click', () => {
            State.exportTheme(appState);
        });

        importThemeBtn.addEventListener('click', () => {
            importThemeInput.click();
        });

        importThemeInput.addEventListener('change', async (e) => {
            const file = e.target.files[0];
            if (!file) return;
            
            try {
                const importedState = await State.importTheme(file);
                // On success, replace the entire app state
                appState = importedState;
                
                // Reload fonts and UI
                FontService.loadSavedGoogleFonts(); // Load Google Fonts from imported state
                masterFontList = FontService.getMasterFontList();
                UI.updateDatalist(masterFontList);
                
                updateAllControlsFromState();
                updateDesign();
                
                alert("Theme imported successfully!");
            } catch (error) {
                console.error(error);
                alert(error.message);
            }
            
            // Reset input so user can import the same file again
            importThemeInput.value = null;
        });
    }

    /**
     * Wires up the "Fonts" tab controls.
     */
    function initFontSourceControls() {
        const googleSearch = document.getElementById('google-font-search');
        const googleResults = document.getElementById('google-font-results');
        const dropzone = document.getElementById('font-dropzone');
        const localFontInput = document.getElementById('local-font-input');

        // Google Fonts Search
        const renderGoogleFonts = () => {
            const query = googleSearch.value;
            const fonts = FontService.searchGoogleFonts(query);
            const added = FontService.getAddedGoogleFonts();
            UI.updateGoogleFontResults(fonts, added);
        };
        googleSearch.addEventListener('input', renderGoogleFonts);
        
        // Google Fonts Add
        googleResults.addEventListener('click', (e) => {
            if (e.target.classList.contains('add-font-btn')) {
                const btn = e.target;
                const fontName = btn.dataset.fontName;
                if (FontService.addGoogleFont(fontName)) {
                    // Update master list and datalist
                    masterFontList = FontService.getMasterFontList();
                    UI.updateDatalist(masterFontList);
                    // Update button state
                    btn.textContent = 'Added';
                    btn.disabled = true;
                }
            }
        });
        
        // Local Fonts
        dropzone.addEventListener('click', () => localFontInput.click());
        dropzone.addEventListener('dragover', (e) => {
            e.preventDefault();
            dropzone.classList.add('dragging');
        });
        dropzone.addEventListener('dragleave', () => dropzone.classList.remove('dragging'));
        dropzone.addEventListener('drop', (e) => {
            e.preventDefault();
            dropzone.classList.remove('dragging');
            handleFontFiles(e.dataTransfer.files);
        });
        localFontInput.addEventListener('change', (e) => {
            handleFontFiles(e.target.files);
        });

        // Initial render
        renderGoogleFonts();
    }

    /**
     * Handles new font file uploads.
     * @param {FileList} files - List of files from input or drag/drop.
     */
    async function handleFontFiles(files) {
        if (!files) return;
        
        for (const file of files) {
            try {
                const fontName = await FontService.addLocalFont(file);
                UI.updateLocalFontListUI(fontName);
                
                // Update master list and datalist
                masterFontList = FontService.getMasterFontList();
                UI.updateDatalist(masterFontList);
            } catch (e) {
                console.error("Error adding local font:", e);
                alert(`Could not add font: ${file.name}. ${e.message}`);
            }
        }
    }


    // --- Event Handlers & State Changers ---

    /**
     * Assembles and injects the selected components into the preview area.
     */
    function updateDesign() {
        let combinedHtml = '';
        const componentSelectors = document.querySelectorAll('#page-builder-container .component-selector');
        
        componentSelectors.forEach(sel => {
            const [category, key] = sel.value.split(':');
            if (key !== 'none' && componentLibrary[category] && componentLibrary[category][key]) {
                combinedHtml += componentLibrary[category][key].html;
            }
        });

        previewArea.innerHTML = combinedHtml;
        if (combinedHtml === '') {
            previewArea.innerHTML = `<p class="text-center text-gray-500 mt-20">No components selected. Use the "Page Builder" tab to add sections.</p>`;
        }
        applyAllStyles(); // Re-apply styles to the new content
    }

    /**
     * Updates the app state when the page layout is changed.
     */
    function onPageBuilderChange(e) {
        if (e.target.classList.contains('component-selector')) {
            const category = e.target.dataset.category;
            appState.layout[category] = e.target.value;
            updateDesign();
        }
    }
    
    /**
     * Generates and injects all dynamic CSS into the <head>.
     */
    function applyAllStyles() {
        dynamicStyleTag.innerHTML = generateCSS();
    }
    
    /**
     * Generates the complete CSS string based on current app state.
     */
    function generateCSS() {
        let css = '/* --- Generated by Font Checker v2.0 --- */\n\n';
        const tweaks = appState.globalTweaks;
        
        // 1. Global Styles
        css += `
/* --- Global Styles --- */
#preview-area {
    font-size: ${tweaks.fontSize}px !important;
    font-weight: ${tweaks.fontWeight} !important;
    line-height: ${tweaks.lineHeight} !important;
    letter-spacing: ${tweaks.letterSpacing}em !important;
    color: ${tweaks.textColor} !important;
    background-color: ${tweaks.bgColor} !important;
    transition: background-color 0.3s ease, color 0.3s ease;
}
\n`;
        
        // 2. Dark Mode Overrides
        if (tweaks.darkMode) {
            css += `
/* --- Dark Mode Overrides --- */
#preview-area h1, #preview-area h2, #preview-area h3, #preview-area h4, #preview-area h5, #preview-area h6 { color: ${tweaks.headingColor} !important; }
#preview-area .unimportant-body { color: #94a3b8 !important; }
#preview-area .description-label { color: #cbd5e1 !important; }
#preview-area blockquote { border-left-color: #475569 !important; color: ${tweaks.accentColor} !important; }
#preview-area .accent-text { color: ${tweaks.accentColor} !important; }
#preview-area .bg-white { background-color: #1e293b !important; border-color: #334155 !important; }
#preview-area .bg-gray-100 { background-color: #1a263a !important; }
#preview-area .bg-gray-50 { background-color: #334155 !important; border-color: #475569 !important; }
#preview-area .text-gray-500 { color: #94a3b8 !important; }
#preview-area .text-gray-600 { color: #cbd5e1 !important; }
#preview-area .text-gray-700 { color: #cbd5e1 !important; }
#preview-area .text-gray-800 { color: #f1f5f9 !important; }
#preview-area .border-gray-200 { border-color: #334155 !important; }
#preview-area .border-gray-300 { border-color: #475569 !important; }
#preview-area input, #preview-area textarea { background-color: #334155 !important; border-color: #475569 !important; color: #f1f5f9 !important; }
#preview-area button, #preview-area .button {
    background-color: ${tweaks.btnBgColor} !important;
    color: ${tweaks.btnTextColor} !important;
}
\n`;
        } else {
            // 3. Global Color Overrides (non-dark mode)
            css += '/* --- Global Color Overrides --- */\n';
            if (tweaks.headingColor !== 'default') {
                css += `#preview-area h1, #preview-area h2, #preview-area h3 { color: ${tweaks.headingColor} !important; }\n`;
            }
            if (tweaks.accentColor !== 'default') {
                css += `#preview-area blockquote, #preview-area .description-label, #preview-area .accent-text { color: ${tweaks.accentColor} !important; border-color: ${tweaks.accentColor} !important; }\n`;
            }
            if (tweaks.btnBgColor !== 'default') {
                css += `#preview-area button, #preview-area .button { background-color: ${tweaks.btnBgColor} !important; }\n`;
            }
            if (tweaks.btnTextColor !== 'default') {
                css += `#preview-area button, #preview-area .button { color: ${tweaks.btnTextColor} !important; }\n`;
            }
            css += '\n';
        }

        // 4. Font Target Styles
        css += '/* --- Font Target Styles --- */\n';
        for (const target of State.FONT_TARGETS_CONFIG) {
            const config = appState.fonts[target.id];
            const selector = `#preview-area ${target.selector}`;
            
            let rules = '';
            if (config.font !== 'Default') {
                rules += `    font-family: "${config.font}", sans-serif !important;\n`;
            }
            if (config.size && config.size !== 'default') {
                rules += `    font-size: ${config.size}px !important;\n`;
            }
            if (config.weight && config.weight !== 'default') {
                rules += `    font-weight: ${config.weight} !important;\n`;
            }
            if (config.spacing && config.spacing !== 'default') {
                rules += `    letter-spacing: ${config.spacing}em !important;\n`;
            }
            
            if (rules) {
                css += `${selector} {\n${rules}}\n\n`;
            }
        }
        
        return css;
    }
    
    /**
     * Updates the state when any font control (select, input) is changed.
     */
    function onFontControlChange(e) {
        const targetId = e.target.dataset.targetId;
        const type = e.target.dataset.type; // 'font', 'size', 'weight', 'spacing'
        let value = e.target.value;
        
        // If font input is cleared, set to 'Default'
        if (type === 'font' && value === '') {
            value = 'Default';
            e.target.placeholder = 'Search fonts... (Default)';
        }
        // Use 'default' if an individual tweak (non-font) is cleared
        else if (type !== 'font' && value === '') {
            value = 'default';
        }
        
        appState.fonts[targetId][type] = value;
        applyAllStyles();
    }
    
    /**
     * Toggles the lock state for a font target.
     */
    function onLockClick(e) {
        const btn = e.currentTarget;
        const targetId = btn.dataset.targetId;
        const isLocked = appState.fonts[targetId].locked;
        
        appState.fonts[targetId].locked = !isLocked;
        btn.classList.toggle('locked', !isLocked);
        btn.title = !isLocked ? 'Unlock Font' : 'Lock Font';
    }
    
    /**
     * Handles click on a single "randomize" button.
     */
    function onRandomClick(e) {
        const targetId = e.currentTarget.dataset.targetId;
        randomizeFont(targetId);
    }
    
    /**
     * Handles click on "Randomize All" button.
     */
    function onRandomizeAll() {
        for (const target of State.FONT_TARGETS_CONFIG) {
            if (!appState.fonts[target.id].locked) {
                randomizeFont(target.id);
            }
        }
    }

    /**
     * Handles click on "Randomize Page Layout" button.
     */
    function onRandomizePage() {
        const componentSelectors = document.querySelectorAll('#page-builder-container .component-selector');
        componentSelectors.forEach(sel => {
            const optionCount = sel.options.length;
            sel.selectedIndex = Math.floor(Math.random() * optionCount);
            // Update state
            const category = sel.dataset.category;
            appState.layout[category] = sel.value;
        });
        updateDesign();
    }
    
    /**
     * Selects a random font and applies it to a target.
     */
    function randomizeFont(targetId) {
        if (masterFontList.length === 0) return;
        
        const randomFont = masterFontList[Math.floor(Math.random() * masterFontList.length)];
        appState.fonts[targetId].font = randomFont;
        
        // Also reset individual tweaks when randomizing
        appState.fonts[targetId].size = 'default';
        appState.fonts[targetId].weight = 'default';
        appState.fonts[targetId].spacing = 'default';
        
        UI.updateFontTargetControls(appState);
        applyAllStyles();
    }

    /**
     * Helper to sync all UI controls with the current appState.
     */
    function updateAllControlsFromState() {
        UI.updateFontTargetControls(appState);
        UI.updateGlobalTweakControls(appState);
        UI.updatePageBuilderControls(appState);
        State.populatePresetList(presetSelect);
    }

    // --- Start the App ---
    init();
});