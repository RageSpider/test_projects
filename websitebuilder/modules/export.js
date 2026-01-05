// Manages all project export logic
import * as Database from './database.js';

// We expect JSZip and FileSaver to be loaded in the main HTML
/* global JSZip, saveAs */

export function init() {
    console.log('Export Module: Initialized.');
    
    const exportButton = document.getElementById('export-project-btn');
    if (exportButton) {
        exportButton.addEventListener('click', generateProjectZip);
    } else {
        console.error('Export button not found!');
    }
}

/**
 * **IMPROVED:** Generates a full, runnable project as a .zip file.
 */
export async function generateProjectZip() {
    console.log('Generating project .zip file...');
    if (typeof JSZip === 'undefined' || typeof saveAs === 'undefined') {
        alert("Export libraries (JSZip, FileSaver) are not loaded. Cannot export.");
        console.error("JSZip or FileSaver not found!");
        return;
    }

    window.App.showLoader('Exporting Project...');
    
    try {
        const zip = new JSZip();

        // 1. Get all pages
        const pages = await Database.getAllPages();
        if (!pages || pages.length === 0) {
            alert("No pages found in the project to export.");
            return;
        }

        const cssFolder = zip.folder('css');
        const jsFolder = zip.folder('js');

        for (const page of pages) {
            console.log(`Processing page: ${page.name}`);
            
            // Create separate CSS and JS files
            const cssFileName = `${page.name.replace('.html', '')}.css`;
            const jsFileName = `${page.name.replace('.html', '')}.js`;
            
            if (page.css) {
                cssFolder.file(cssFileName, page.css);
            }
            if (page.js) {
                jsFolder.file(jsFileName, page.js);
            }

            // Create the final HTML, linking the CSS and JS
            const finalHtml = generateFinalHtml(page, cssFileName, jsFileName);
            zip.file(page.name, finalHtml);
        }

        // 2. Get all project assets
        const assets = await Database.getAssets('project');
        console.log(`Processing ${assets.length} assets...`);
        
        // We'll create folders based on asset type
        const assetsFolder = zip.folder('assets');
        const imgFolder = assetsFolder.folder('images');
        const videoFolder = assetsFolder.folder('videos');
        const fontsFolder = assetsFolder.folder('fonts');
        const otherFolder = assetsFolder.folder('other');
        
        for (const asset of assets) {
            // asset.data is an ArrayBuffer
            if (!asset.data) continue;
            
            let folder;
            switch(asset.type) {
                case 'image': folder = imgFolder; break;
                case 'video': folder = videoFolder; break;
                case 'font': folder = fontsFolder; break;
                default: folder = otherFolder;
            }
            
            // Add the file to the correct folder in the zip
            folder.file(asset.name, asset.data, { binary: true });
        }

        // 3. Generate and trigger download
        console.log('Generating .zip file...');
        const content = await zip.generateAsync({ type: "blob" });
        
        console.log('Triggering download...');
        saveAs(content, "website_project.zip");
        
    } catch (error) {
        console.error("Error during project export:", error);
        alert(`An error occurred during export: ${error.message}`);
    } finally {
        window.App.hideLoader();
    }
}

/**
 * Injects CSS and JS links into the exported HTML file.
 * Replaces live blob URLs with exported asset paths.
 * @param {object} pageData - The page object from the database.
 * @param {string} cssFileName - The name of the generated CSS file.
 * @param {string} jsFileName - The name of the generated JS file.
 * @returns {string} - The final, clean HTML string.
 */
function generateFinalHtml(pageData, cssFileName, jsFileName) {
    const doc = new DOMParser().parseFromString(pageData.html, 'text/html');
    
    // Remove any injected editor scripts or styles
    doc.getElementById('editor-script')?.remove();
    doc.getElementById('custom-styles')?.remove();
    doc.getElementById('custom-script')?.remove();
    doc.getElementById('editor-styles')?.remove();

    // Remove all data-editor-id attributes
    doc.querySelectorAll('[data-editor-id]').forEach(el => el.removeAttribute('data-editor-id'));

    // Add <link> for our new CSS file
    if (pageData.css) {
        const cssLink = doc.createElement('link');
        cssLink.rel = 'stylesheet';
        cssLink.href = `css/${cssFileName}`;
        doc.head.appendChild(cssLink);
    }
    
    // Add <script> for our new JS file
    if (pageData.js) {
        const jsLink = doc.createElement('script');
        jsLink.type = 'module';
        jsLink.src = `js/${jsFileName}`;
        jsLink.defer = true;
        doc.body.appendChild(jsLink);
    }
    
    // **CRITICAL:** Replace live blob URLs with exported asset paths
    // This is a simple implementation. A real one would need to know
    // the asset type to build the correct path (e.g., images/ vs videos/).
    // For this demo, we'll assume all blobs are images in 'assets/images/'.
    
    doc.querySelectorAll('img[src^="blob:"]').forEach(img => {
        // This is a limitation: we don't know the original file name from just the blob URL.
        // A more robust way would be for the editor to store the asset ID, e.g., data-asset-id="123"
        // For now, we'll try to find the alt text as a hint
        const alt = img.getAttribute('alt');
        if (alt) {
            img.src = `assets/images/${alt}`;
        } else {
            // Fallback
            img.alt = "Exported image";
            console.warn("Could not find original path for blob image. Exported path may be broken.", img);
        }
    });
    // TODO: Do the same for <video>, <audio>, etc.

    return `<!DOCTYPE html>\n` + doc.documentElement.outerHTML;
}