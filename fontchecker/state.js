/* ===============================================================
  PART 5: THE STATE MODULE (state.js)
  
  This module manages the application's data.
  - Defines the initial state.
  - Handles saving/loading the entire app state to localStorage for persistence.
  - Manages presets (save, load, delete).
  - Manages theme import/export.
  ===============================================================
*/

// --- Constants ---
export const FONT_TARGETS_CONFIG = [
    { id: 'headings', label: 'Headings (h1, h2, h3)', selector: 'h1, h2, h3' },
    { id: 'body', label: 'Body Text (p, lists, etc)', selector: 'p, li, .body-text, .long-yapping-desc, .unimportant-body, label, input, textarea, span' },
    { id: 'buttons', label: 'Buttons & UI', selector: 'button, .button' },
    { id: 'accent', label: 'Accent Text (quotes, labels)', selector: 'blockquote, .description-label, .accent-text' }
];

const PRESET_STORAGE_KEY = 'fontCheckerPreset_';
const APP_STATE_KEY = 'fontCheckerAppState_v2';

// --- Initial State ---
export function getInitialState() {
    return {
        fonts: {
            headings: { font: 'Default', locked: false, size: 'default', weight: 'default', spacing: 'default' },
            body: { font: 'Default', locked: false, size: 'default', weight: 'default', spacing: 'default' },
            buttons: { font: 'Default', locked: false, size: 'default', weight: 'default', spacing: 'default' },
            accent: { font: 'Default', locked: false, size: 'default', weight: 'default', spacing: 'default' }
        },
        globalTweaks: {
            fontSize: '16',
            fontWeight: '400',
            lineHeight: '1.7',
            letterSpacing: '0',
            textColor: '#1e293b',
            bgColor: '#ffffff',
            headingColor: 'default',
            accentColor: 'default',
            btnBgColor: 'default',
            btnTextColor: 'default',
            darkMode: false
        },
        layout: {
            // This will be populated by the UI, e.g., 'navbars': 'navbars:nav-simple'
        },
        addedGoogleFonts: [
            // e.g., "Roboto"
        ]
    };
}


// --- App State Persistence (Auto-Save/Load) ---

/**
 * Saves the entire app state to localStorage.
 * @param {object} state - The current application state.
 */
export function saveState(state) {
    try {
        const stateString = JSON.stringify(state);
        localStorage.setItem(APP_STATE_KEY, stateString);
        console.log("[State] App state saved.");
    } catch (e) {
        console.error("Error saving app state to localStorage", e);
    }
}

/**
 * Loads the entire app state from localStorage.
 * @returns {object} The saved app state, or the initial state if nothing is saved.
 */
export function loadState() {
    try {
        const stateString = localStorage.getItem(APP_STATE_KEY);
        if (stateString === null) {
            return getInitialState();
        }
        console.log("[State] App state loaded.");
        return JSON.parse(stateString);
    } catch (e) {
        console.error("Error loading app state from localStorage", e);
        return getInitialState();
    }
}


// --- Preset Management ---

/**
 * Saves the current font and layout config as a named preset.
 * @param {string} name - The name of the preset.
 * @param {object} state - The current application state.
 */
export function savePreset(name, state) {
    if (!name) {
        alert("Please enter a name for your preset.");
        return false;
    }
    try {
        const presetState = {
            fonts: state.fonts,
            layout: state.layout,
            globalTweaks: state.globalTweaks // Also save colors/tweaks
        };
        localStorage.setItem(PRESET_STORAGE_KEY + name, JSON.stringify(presetState));
        console.log(`[State] Preset "${name}" saved.`);
        return true;
    } catch (e) {
        console.error("Error saving preset", e);
        alert("Could not save preset. Storage might be full.");
        return false;
    }
}

/**
 * Loads a preset by name.
 * @param {string} name - The name of the preset to load.
 * @returns {object | null} The preset state or null.
 */
export function loadPreset(name) {
    if (!name) return null;
    try {
        const presetString = localStorage.getItem(PRESET_STORAGE_KEY + name);
        if (presetString) {
            console.log(`[State] Preset "${name}" loaded.`);
            return JSON.parse(presetString);
        }
    } catch (e) {
        console.error("Error loading preset", e);
        alert("Could not load preset. Data might be corrupt.");
    }
    return null;
}

/**
 * Deletes a preset by name.
 * @param {string} name - The name of the preset to delete.
 */
export function deletePreset(name) {
    if (!name) {
        alert("Please select a preset to delete.");
        return false;
    }
    if (confirm(`Are you sure you want to delete the preset "${name}"?`)) {
        try {
            localStorage.removeItem(PRESET_STORAGE_KEY + name);
            console.log(`[State] Preset "${name}" deleted.`);
            return true;
        } catch (e) {
            console.error("Error deleting preset", e);
            alert("Could not delete preset.");
        }
    }
    return false;
}

/**
 * Populates a <select> element with all saved presets.
 * @param {HTMLSelectElement} selectEl - The <select> element to populate.
 */
export function populatePresetList(selectEl) {
    selectEl.innerHTML = ''; // Clear
    let hasPresets = false;
    
    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key.startsWith(PRESET_STORAGE_KEY)) {
            const name = key.substring(PRESET_STORAGE_KEY.length);
            const option = document.createElement('option');
            option.value = name;
            option.textContent = name;
            selectEl.appendChild(option);
            hasPresets = true;
        }
    }
    
    if (!hasPresets) {
        selectEl.innerHTML = '<option value="">No presets found...</option>';
    } else {
        selectEl.insertAdjacentHTML('afterbegin', '<option value="">Select a preset...</option>');
        selectEl.value = "";
    }
}


// --- Theme Import / Export ---

/**
 * Exports the entire app state as a JSON file.
 * @param {object} state - The current application state.
 */
export function exportTheme(state) {
    try {
        const stateString = JSON.stringify(state, null, 2);
        const blob = new Blob([stateString], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `font-checker-theme-${Date.now()}.json`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
        console.log("[State] Theme exported.");
    } catch (e) {
        console.error("Error exporting theme", e);
        alert("Could not export theme.");
    }
}

/**
 * Imports a theme from a JSON file.
 * @param {File} file - The JSON file to import.
 * @returns {Promise<object>} A promise that resolves with the loaded state object.
 */
export function importTheme(file) {
    return new Promise((resolve, reject) => {
        if (!file || file.type !== 'application/json') {
            reject(new Error("Please select a valid .json file."));
            return;
        }
        
        const reader = new FileReader();
        reader.onload = (e) => {
            try {
                const importedState = JSON.parse(e.target.result);
                // Basic validation
                if (importedState.fonts && importedState.globalTweaks && importedState.layout) {
                    console.log("[State] Theme imported successfully.");
                    resolve(importedState);
                } else {
                    reject(new Error("Invalid theme file. Missing required properties."));
                }
            } catch (e) {
                console.error("Error parsing theme file", e);
                reject(new Error("Could not parse theme file. It may be corrupt."));
            }
        };
        reader.onerror = () => {
            reject(new Error("Error reading file."));
        };
        reader.readAsText(file);
    });
}