/* ===============================================================
  PART 6: THE FONT SERVICE MODULE (fontService.js)
  
  This module handles all font loading and management.
  - Creates and manages dynamic <style> and <link> tags.
  - Loads "Software Fonts" from fonts.css.
  - Loads, adds, and persists Google Fonts.
  - Handles local .ttf/.otf/.woff file uploads.
  - Maintains the master list of available fonts.
  ===============================================================
*/

import { POPULAR_GOOGLE_FONTS } from './googleFonts.js';

// --- Module State ---
let softwareFontList = [];
let localFontList = [];
let addedGoogleFonts = []; // Array of font names, e.g., ["Roboto", "Lato"]
let dynamicStyleTag; // For @font-face rules
let googleFontLinkTag; // For Google Font <link>

const GOOGLE_FONTS_STORAGE_KEY = 'fontCheckerAddedGoogleFonts';

// --- Initialization ---

/**
 * Creates the <style> and <link> tags in the <head>.
 */
export function initFontTags() {
    // For local fonts and other dynamic rules
    dynamicStyleTag = document.createElement('style');
    dynamicStyleTag.id = 'dynamic-font-styles';
    document.head.appendChild(dynamicStyleTag);

    // For Google Fonts
    googleFontLinkTag = document.createElement('link');
    googleFontLinkTag.id = 'google-font-link';
    googleFontLinkTag.rel = 'stylesheet';
    document.head.appendChild(googleFontLinkTag);
}


// --- Font List Management ---

/**
 * Gets the combined list of all available fonts.
 * @returns {string[]} A sorted array of font names.
 */
export function getMasterFontList() {
    const combinedList = new Set([
        ...softwareFontList,
        ...addedGoogleFonts,
        ...localFontList
    ]);
    return Array.from(combinedList).sort();
}

/**
 * Gets the current list of added Google Font names.
 * @returns {string[]}
 */
export function getAddedGoogleFonts() {
    return addedGoogleFonts;
}


// --- Software Fonts (fonts.css) ---

/**
 * Fetches and parses font names from the local fonts.css file.
 * @param {string} cssPath - The path to the fonts.css file.
 * @returns {Promise<number>} A promise that resolves with the number of fonts loaded.
 */
export async function loadSoftwareFonts(cssPath) {
    try {
        const response = await fetch(cssPath);
        if (!response.ok) throw new Error(`Failed to fetch ${cssPath} (Status: ${response.status})`);
        
        const cssText = await response.text();
        const fontFaceRegex = /font-family:\s*'([^']+)'/g;
        const fontNames = new Set();
        let match;
        while ((match = fontFaceRegex.exec(cssText)) !== null) {
            fontNames.add(match[1]);
        }
        softwareFontList = Array.from(fontNames);
        
        if (softwareFontList.length === 0) {
            console.warn("No font-family rules were parsed from fonts.css.");
        }

        console.log(`[Fonts] Parsed ${softwareFontList.length} software fonts.`);
        return softwareFontList.length;
    } catch (error) {
        console.error("Error loading software fonts:", error);
        throw error; // Re-throw to be caught by init()
    }
}


// --- Google Fonts ---

/**
 * Loads the list of added Google Fonts from localStorage.
 */
export function loadSavedGoogleFonts() {
    try {
        const savedFonts = localStorage.getItem(GOOGLE_FONTS_STORAGE_KEY);
        if (savedFonts) {
            addedGoogleFonts = JSON.parse(savedFonts);
            console.log(`[Fonts] Loaded ${addedGoogleFonts.length} saved Google Fonts.`);
            updateGoogleFontLink();
        }
    } catch (e) {
        console.error("Error loading saved Google Fonts", e);
        addedGoogleFonts = [];
    }
}

/**
 * Searches the curated list of popular Google Fonts.
 * @param {string} query - The search query.
 * @returns {object[]} An array of font objects matching the query.
 */
export function searchGoogleFonts(query) {
    const lowerQuery = query.toLowerCase();
    if (!lowerQuery) {
        return POPULAR_GOOGLE_FONTS.slice(0, 50); // Show first 50 by default
    }
    return POPULAR_GOOGLE_FONTS.filter(font => 
        font.name.toLowerCase().includes(lowerQuery) ||
        font.category.toLowerCase().includes(lowerQuery)
    );
}

/**
 * Adds a new Google Font to the list and updates the <link> tag.
 * @param {string} fontName - The name of the font to add (e.g., "Roboto").
 * @returns {boolean} True if the font was added, false if it already exists.
 */
export function addGoogleFont(fontName) {
    if (addedGoogleFonts.includes(fontName)) {
        return false; // Already added
    }
    
    addedGoogleFonts.push(fontName);
    updateGoogleFontLink();
    saveGoogleFonts();
    console.log(`[Fonts] Added Google Font: ${fontName}`);
    return true;
}

/**
 * Updates the <link> tag href to fetch all added Google Fonts.
 */
function updateGoogleFontLink() {
    if (addedGoogleFonts.length === 0) {
        googleFontLinkTag.href = '';
        return;
    }
    
    // e.g., "Roboto:wght@100;300;400;700"
    const families = addedGoogleFonts.map(fontName => {
        const font = POPULAR_GOOGLE_FONTS.find(f => f.name === fontName);
        if (font && font.variants) {
            // Request all available variants
            return `family=${font.name.replace(/ /g, '+')}:wght@${font.variants.join(';')}`;
        }
        return `family=${fontName.replace(/ /g, '+')}`;
    }).join('&');
    
    googleFontLinkTag.href = `https://fonts.googleapis.com/css2?${families}&display=swap`;
}

/**
 * Saves the current list of added Google Fonts to localStorage.
 */
function saveGoogleFonts() {
    try {
        localStorage.setItem(GOOGLE_FONTS_STORAGE_KEY, JSON.stringify(addedGoogleFonts));
    } catch (e) {
        console.error("Error saving Google Fonts to localStorage", e);
    }
}


// --- Local Fonts ---

/**
 * Handles a user-uploaded font file.
 * @param {File} file - The font file.
 * @returns {Promise<string>} A promise that resolves with the font-family name.
 */
export function addLocalFont(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = (e) => {
            try {
                const fontUrl = e.target.result;
                const fontName = file.name.split('.')[0]; // Use file name as font name
                
                // Create @font-face rule
                const fontFaceRule = `
                    @font-face {
                        font-family: "${fontName}";
                        src: url(${fontUrl});
                    }
                `;
                
                // Add rule to our dynamic style tag
                dynamicStyleTag.sheet.insertRule(fontFaceRule, dynamicStyleTag.sheet.cssRules.length);
                
                if (!localFontList.includes(fontName)) {
                    localFontList.push(fontName);
                }
                
                console.log(`[Fonts] Added local font: ${fontName}`);
                resolve(fontName);
            } catch (e) {
                reject(e);
            }
        };
        reader.onerror = () => {
            reject(new Error("Error reading font file."));
        };
        reader.readAsDataURL(file); // Read as Base64 URL
    });
}