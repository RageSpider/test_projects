// Main application logic for the website builder IDE
// This is the main "entry point"

// Corrected Paths: ./modules/
import * as Database from './modules/database.js';
import * as Editor from './modules/editor.js';
import * as Exporter from './modules/export.js';

/**
 * Shows a global loading overlay.
 * @param {string} message - The message to display (e.g., "Saving...").
 */
function showLoader(message) {
    const overlay = document.getElementById('loading-overlay');
    const messageEl = document.getElementById('loading-message');
    if (messageEl) messageEl.textContent = message || 'Loading...';
    if (overlay) overlay.style.display = 'flex';
}

/**
 * Hides the global loading overlay.
 */
function hideLoader() {
    const overlay = document.getElementById('loading-overlay');
    if (overlay) overlay.style.display = 'none';
}

/**
 * Main initialization function.
 */
async function main() {
    console.log('Builder IDE Initialized.');
    showLoader('Initializing App...');
    
    try {
        // Initialize our main feature modules
        await Database.init();
        await Editor.init();
        await Exporter.init();
    } catch (error) {
        console.error("Failed to initialize application modules:", error);
        alert("Error initializing application. Please refresh.");
    } finally {
        hideLoader();
    }

    // Expose loader functions to other modules
    window.App = {
        showLoader,
        hideLoader,
        // Expose a simple confirmation modal
        showConfirm: Editor.showConfirmDelete,
    };
}

// Wait for the DOM to be fully loaded before running main.
document.addEventListener('DOMContentLoaded', main);