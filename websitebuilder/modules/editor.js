// Manages ALL Editor UI and Interactions
import * as Database from './database.js';

// --- DOM Element References ---
let canvasIframe;
let responsiveToolbar;
let leftPanelContent, rightPanelContent;
let pageListUI, atomsListUI, blocksListUI, projectAssetsListUI;
let addNewPageBtn, uploadAssetBtn, uploadAssetInput;
let addPageModal, modalCancelBtn, modalCreateBtn, newPageNameInput;
let confirmDeleteModal, modalDeleteCancelBtn, modalDeleteConfirmBtn, confirmDeleteMessage, confirmDeleteTitle;
let currentPageLabel;
let codeTabHtml, codeTabCss, codeTabJs;
let codeEditorHtml, codeEditorCss, codeEditorJs;
let saveCodeBtn;
let inspectorPlaceholder, inspectorContent, inspectorElementTag, inspectorElementClasses;
let textEditorGroup, textContentInput, applyTextBtn;
let attributesEditorGroup, attributesList, addAttributeBtn, applyAttributesBtn;
let tailwindClassesInput, applyTailwindBtn;

// --- State ---
let currentPageName = 'index.html';
let currentPageData = {};
let selectedElement = null; // The DOM element selected in the iframe
let assetUrlCache = new Map(); // Cache for asset blob URLs

// --- Definitions ---

// Default empty page content
const defaultPage = {
    html: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>New Page</title>
    <!-- Tailwind CSS -->
    <script src="https://cdn.tailwindcss.com"></script>
    <!-- Inter Font -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
</head>
<body class="bg-gray-100 p-8" style="font-family: 'Inter', sans-serif;">
    <div class="bg-white p-10 rounded-lg shadow-lg max-w-2xl mx-auto text-center">
        <h1 class="text-4xl font-bold text-gray-800 mb-4">Your Page is Empty</h1>
        <p class="text-gray-600">Start dragging elements from the library to build your page.</p>
    </div>
</body>
</html>`,
    css: `/* Custom CSS for your page */
body {
    font-family: 'Inter', sans-serif;
}`,
    js: `// Custom JS for your page
console.log('Page loaded');`
};

// Definitions for draggable "Atoms"
const atoms = [
    { name: 'Heading 1', html: '<h1 class="text-4xl font-bold">Heading 1</h1>' },
    { name: 'Paragraph', html: '<p class="text-base">This is a paragraph of text.</p>' },
    { name: 'Button', html: '<button class="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600">Click Me</button>' },
    { name: 'Image', html: '<img src="https://placehold.co/600x400/eee/ccc?text=Image" alt="placeholder" class="rounded-lg max-w-full">' }
];

// Definitions for draggable "Blocks" (more complex components)
const blocks = [
    {
        name: 'Hero Section',
        html: `<div class="w-full bg-gray-800 text-white p-16 text-center rounded-lg">
    <h1 class="text-5xl font-bold mb-4">Welcome to Your Website</h1>
    <p class="text-xl mb-8">This is a hero section. Edit it as you like.</p>
    <button class="bg-indigo-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-indigo-600">Get Started</button>
</div>`
    },
    {
        name: 'Two Columns',
        html: `<div class="grid md:grid-cols-2 gap-8 p-8">
    <div class="bg-white p-6 rounded-lg shadow">
        <h3 class="text-2xl font-bold mb-2">Column 1</h3>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
    </div>
    <div class="bg-white p-6 rounded-lg shadow">
        <h3 class="text-2xl font-bold mb-2">Column 2</h3>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
    </div>
</div>`
    }
];


/**
 * Main initialization function for the Editor module.
 */
export async function init() {
    console.log('Editor Module: Initializing...');
    
    // 1. Find all DOM elements
    findAllElements();

    // 2. Setup UI event listeners
    setupEventListeners();

    // 3. Populate static parts of the left panel
    populateAtomsList();
    populateBlocksList();
    
    // 4. Load project assets
    await refreshProjectAssets();

    // 5. Load the last active page or the default page
    await loadInitialPage();
    
    // 6. Refresh the page list in the left panel
    await refreshPageList();
    
    console.log('Editor Module: Initialization Complete.');
}

/**
 * Caches references to all key DOM elements.
 */
function findAllElements() {
    canvasIframe = document.getElementById('website-canvas');
    responsiveToolbar = document.querySelector('.canvas-toolbar');
    leftPanelContent = document.getElementById('left-panel-content');
    rightPanelContent = document.getElementById('right-panel-content');
    pageListUI = document.getElementById('page-list');
    atomsListUI = document.getElementById('atoms-list');
    blocksListUI = document.getElementById('blocks-list');
    projectAssetsListUI = document.getElementById('project-assets-list');
    addNewPageBtn = document.getElementById('add-new-page-btn');
    uploadAssetBtn = document.getElementById('upload-asset-btn');
    uploadAssetInput = document.getElementById('upload-asset-input');
    
    // Modals
    addPageModal = document.getElementById('add-page-modal');
    modalCancelBtn = document.getElementById('modal-cancel-btn');
    modalCreateBtn = document.getElementById('modal-create-btn');
    newPageNameInput = document.getElementById('new-page-name-input');
    
    confirmDeleteModal = document.getElementById('confirm-delete-modal');
    modalDeleteCancelBtn = document.getElementById('modal-delete-cancel-btn');
    modalDeleteConfirmBtn = document.getElementById('modal-delete-confirm-btn');
    confirmDeleteMessage = document.getElementById('confirm-delete-message');
    confirmDeleteTitle = document.getElementById('confirm-delete-title');

    currentPageLabel = document.getElementById('current-page-label');
    
    // Code Editors
    codeTabHtml = document.getElementById('code-tab-html');
    codeTabCss = document.getElementById('code-tab-css');
    codeTabJs = document.getElementById('code-tab-js');
    codeEditorHtml = document.getElementById('code-editor-html');
    codeEditorCss = document.getElementById('code-editor-css');
    codeEditorJs = document.getElementById('code-editor-js');
    saveCodeBtn = document.getElementById('save-code-btn');

    // Inspector
    inspectorPlaceholder = document.getElementById('inspector-placeholder');
    inspectorContent = document.getElementById('inspector-content');
    inspectorElementTag = document.getElementById('inspector-element-tag');
    inspectorElementClasses = document.getElementById('inspector-element-classes');
    
    // Inspector Panes
    textEditorGroup = document.getElementById('text-editor-group');
    textContentInput = document.getElementById('text-content-input');
    applyTextBtn = document.getElementById('apply-text-btn');
    
    attributesEditorGroup = document.getElementById('attributes-editor-group');
    attributesList = document.getElementById('attributes-list');
    addAttributeBtn = document.getElementById('add-attribute-btn');
    applyAttributesBtn = document.getElementById('apply-attributes-btn');
    
    tailwindClassesInput = document.getElementById('tailwind-classes-input');
    applyTailwindBtn = document.getElementById('apply-tailwind-btn');
}

/**
 * Sets up all event listeners for the editor UI.
 */
function setupEventListeners() {
    // Responsive Toolbar
    responsiveToolbar.addEventListener('click', handleResponsiveControls);

    // Left Panel
    addNewPageBtn.addEventListener('click', openAddPageModal);
    uploadAssetBtn.addEventListener('click', () => uploadAssetInput.click());
    uploadAssetInput.addEventListener('change', handleAssetUpload);
    pageListUI.addEventListener('click', handlePageListClick);
    
    // "Add Page" Modal
    modalCancelBtn.addEventListener('click', closeAddPageModal);
    modalCreateBtn.addEventListener('click', handleCreateNewPage);
    
    // "Confirm Delete" Modal
    modalDeleteCancelBtn.addEventListener('click', () => confirmDeleteModal.style.display = 'none');

    // Code Editors
    document.querySelector('.code-editor-tabs').addEventListener('click', handleCodeTabClick);
    saveCodeBtn.addEventListener('click', saveCodeFromEditors);
    
    // Inspector
    document.querySelector('.inspector-tabs').addEventListener('click', handleInspectorTabClick);
    inspectorElementClasses.addEventListener('click', () => {
        navigator.clipboard.writeText(inspectorElementClasses.textContent);
    });
    applyTailwindBtn.addEventListener('click', applyTailwindClasses);
    applyTextBtn.addEventListener('click', applyTextContent);
    applyAttributesBtn.addEventListener('click', applyAttributes);
    addAttributeBtn.addEventListener('click', () => addAttributeInput());

    // Listen for messages from the iframe (e.g., element selection)
    window.addEventListener('message', handleIframeMessage);
    
    // Drag and Drop listeners
    leftPanelContent.addEventListener('dragstart', handleDragStart);
}

// --- Page Management ---

/**
 * Loads the initial page on app start.
 */
async function loadInitialPage() {
    currentPageName = Database.getCurrentPage() || 'index.html';
    await loadPage(currentPageName);
}

/**
 * Loads a specific page's content into the editor and canvas.
 * @param {string} pageName 
 */
export async function loadPage(pageName) {
    console.log(`Loading page: ${pageName}`);
    window.App.showLoader(`Loading ${pageName}...`);
    
    try {
        let pageData = await Database.getPage(pageName);

        if (!pageData) {
            console.log(`No data found for ${pageName}, creating default page.`);
            pageData = {
                name: pageName,
                html: defaultPage.html,
                css: defaultPage.css,
                js: defaultPage.js,
                settings: { styleMode: 'tailwind' } // Default to Tailwind
            };
            await Database.savePage(pageName, pageData);
        }
        
        currentPageName = pageName;
        currentPageData = pageData;
        Database.setCurrentPage(pageName);

        // Update UI
        updateCanvas(currentPageData); // This is async due to iframe load
        updateCodeEditors(currentPageData);
        updatePageListUI();
        currentPageLabel.textContent = currentPageName;
        
        // Reset inspector
        showInspector(null);
    } catch (error) {
        console.error(`Error loading page ${pageName}:`, error);
    } finally {
        window.App.hideLoader();
    }
}

/**
 * Fetches all pages from DB and renders the page list.
 */
async function refreshPageList() {
    const pages = await Database.getAllPages();
    pageListUI.innerHTML = ''; // Clear list
    
    if (pages.length === 0) {
        pageListUI.innerHTML = '<li class="empty-list-item">No pages yet.</li>';
        return;
    }
    
    pages.forEach(page => {
        const li = document.createElement('li');
        li.dataset.pageName = page.name;
        
        const span = document.createElement('span');
        span.textContent = page.name;
        li.appendChild(span);

        if (page.name === currentPageName) {
            li.classList.add('active');
        }

        // Add delete button (but not for index.html)
        if (page.name !== 'index.html') {
            const deleteBtn = document.createElement('button');
            deleteBtn.className = 'delete-page-btn';
            deleteBtn.title = `Delete ${page.name}`;
            deleteBtn.innerHTML = '&times;'; // '×' symbol
            deleteBtn.dataset.pageName = page.name;
            li.appendChild(deleteBtn);
        }
        
        pageListUI.appendChild(li);
    });
}

/**
 * Handles clicks on the page list (to switch or delete pages).
 */
function handlePageListClick(e) {
    const target = e.target;
    
    if (target.classList.contains('delete-page-btn')) {
        // Handle delete
        e.stopPropagation(); // Prevent page selection
        const pageName = target.dataset.pageName;
        handleDeletePage(pageName);
    } else if (target.closest('li')) {
        // Handle page switch
        const pageName = target.closest('li').dataset.pageName;
        if (pageName && pageName !== currentPageName) {
            loadPage(pageName);
        }
    }
}

/**
 * Confirms and deletes a page.
 * @param {string} pageName 
 */
function handleDeletePage(pageName) {
    if (pageName === 'index.html') {
        alert("Cannot delete the main index.html page.");
        return;
    }

    showConfirmDelete({
        title: 'Delete Page',
        message: `Are you sure you want to delete ${pageName}? This cannot be undone.`,
        onConfirm: async () => {
            console.log(`Deleting page: ${pageName}`);
            window.App.showLoader(`Deleting ${pageName}...`);
            try {
                await Database.deletePage(pageName);
                await refreshPageList();
                // If we deleted the current page, load index.html
                if (currentPageName === pageName) {
                    await loadPage('index.html');
                }
            } catch (error) {
                console.error('Error deleting page:', error);
            } finally {
                window.App.hideLoader();
            }
        }
    });
}

/**
 * **NEW:** A generic confirmation modal.
 * @param {object} options - { title, message, onConfirm }
 */
export function showConfirmDelete({ title, message, onConfirm }) {
    confirmDeleteTitle.textContent = title || 'Confirm Action';
    confirmDeleteMessage.textContent = message || 'Are you sure?';
    
    confirmDeleteModal.style.display = 'flex';

    // Remove old listeners and add new one
    const newConfirmBtn = modalDeleteConfirmBtn.cloneNode(true);
    modalDeleteConfirmBtn.parentNode.replaceChild(newConfirmBtn, modalDeleteConfirmBtn);
    modalDeleteConfirmBtn = newConfirmBtn; // Update reference

    modalDeleteConfirmBtn.addEventListener('click', () => {
        confirmDeleteModal.style.display = 'none';
        if (onConfirm) onConfirm();
    }, { once: true });
}


/**
 * Updates the visual selection in the page list.
 */
function updatePageListUI() {
    Array.from(pageListUI.children).forEach(li => {
        if (li.dataset.pageName === currentPageName) {
            li.classList.add('active');
        } else {
            li.classList.remove('active');
        }
    });
}

// --- "Add New Page" Modal ---

function openAddPageModal() {
    newPageNameInput.value = '';
    addPageModal.style.display = 'flex';
    newPageNameInput.focus();
}

function closeAddPageModal() {
    addPageModal.style.display = 'none';
}

async function handleCreateNewPage() {
    let newPageName = newPageNameInput.value.trim().toLowerCase();
    if (!newPageName) {
        alert("Please enter a page name.");
        return;
    }
    
    // Basic sanitization
    newPageName = newPageName.replace(/[^a-z0-9\-\.]/g, '');
    if (!newPageName.endsWith('.html')) {
        newPageName += '.html';
    }

    // Check if page already exists
    const existingPage = await Database.getPage(newPageName);
    if (existingPage) {
        alert(`A page named ${newPageName} already exists.`);
        return;
    }
    
    window.App.showLoader(`Creating ${newPageName}...`);
    try {
        // Create and load the new page
        await loadPage(newPageName); // loadPage handles creation
        await refreshPageList(); // Update the UI
        closeAddPageModal();
    } catch (error) {
        console.error('Error creating new page:', error);
    } finally {
        window.App.hideLoader();
    }
}

// --- Left Panel: Atoms, Blocks, Assets ---

function populateAtomsList() {
    atomsListUI.innerHTML = '';
    atoms.forEach(atom => {
        const el = document.createElement('div');
        el.className = 'block-item';
        el.textContent = atom.name;
        el.draggable = true;
        el.dataset.dragType = 'html';
        el.dataset.html = atom.html;
        atomsListUI.appendChild(el);
    });
}

function populateBlocksList() {
    blocksListUI.innerHTML = '';
    blocks.forEach(block => {
        const el = document.createElement('div');
        el.className = 'block-item';
        el.textContent = block.name;
        el.draggable = true;
        el.dataset.dragType = 'html';
        el.dataset.html = block.html;
        blocksListUI.appendChild(el);
    });
}

async function handleAssetUpload(event) {
    const files = event.target.files;
    if (!files.length) return;

    window.App.showLoader(`Uploading ${files.length} asset(s)...`);
    console.log(`Uploading ${files.length} asset(s)...`);
    
    try {
        for (const file of files) {
            await Database.addAsset('project', file);
        }
        console.log('Upload complete.');
        // Clear asset cache so new URLs are generated
        revokeAssetUrls();
        await refreshProjectAssets();
    } catch (error) {
        console.error('Failed to upload assets:', error);
    } finally {
        window.App.hideLoader();
        event.target.value = null; // Reset input
    }
}

/**
 * **IMPROVED:** Fetches project assets from DB and renders them.
 * Uses blob URLs for live preview and drag-and-drop.
 */
async function refreshProjectAssets() {
    const assets = await Database.getAssets('project');
    projectAssetsListUI.innerHTML = '';
    
    if (assets.length === 0) {
        projectAssetsListUI.innerHTML = '<p class="empty-list-item">No assets yet.</p>';
        return;
    }

    for (const asset of assets) {
        if (asset.type === 'image') {
            const url = await getAssetBlobUrl('project', asset.id);
            if (!url) continue;

            const el = document.createElement('div');
            el.className = 'asset-item';
            
            const img = document.createElement('img');
            img.src = url;
            img.alt = asset.name;
            img.title = asset.name;
            el.appendChild(img);
            
            el.draggable = true;
            el.dataset.dragType = 'html';
            // **FIXED:** Drag the live blob URL, not a broken path
            el.dataset.html = `<img src="${url}" alt="${asset.name}" class="max-w-full rounded-lg">`;
            
            projectAssetsListUI.appendChild(el);
        }
        // TODO: Handle other asset types (videos, fonts)
    }
}

/**
 * **NEW:** Caching wrapper for getAssetUrl to avoid re-creating blobs.
 */
async function getAssetBlobUrl(dbType, id) {
    const key = `${dbType}-${id}`;
    if (assetUrlCache.has(key)) {
        return assetUrlCache.get(key);
    }
    
    const url = await Database.getAssetUrl(dbType, id);
    if (url) {
        assetUrlCache.set(key, url);
    }
    return url;
}

/**
 * **NEW:** Revokes all cached blob URLs to free memory.
 * Call this when refreshing assets or changing pages.
 */
function revokeAssetUrls() {
    assetUrlCache.forEach(url => URL.revokeObjectURL(url));
    assetUrlCache.clear();
}


// --- Drag and Drop ---

function handleDragStart(e) {
    if (e.target.dataset.dragType) {
        e.dataTransfer.setData('text/html', e.target.dataset.html);
        e.dataTransfer.effectAllowed = 'copy';
    }
}

// --- Canvas (Iframe) ---

function updateCanvas(pageData) {
    if (!canvasIframe) return;

    // Revoke old URLs before loading new page
    revokeAssetUrls();
    
    const doc = new DOMParser().parseFromString(pageData.html, 'text/html');
    
    // Inject Custom CSS
    if (pageData.css) {
        const styleTag = doc.createElement('style');
        styleTag.id = 'custom-styles';
        styleTag.textContent = pageData.css;
        doc.head.appendChild(styleTag);
    }

    // Inject Custom JS
    if (pageData.js) {
        const scriptTag = doc.createElement('script');
        scriptTag.id = 'custom-script';
        scriptTag.type = 'module'; // Use module for modern JS
        scriptTag.textContent = `document.addEventListener('DOMContentLoaded', () => {
    try {
        ${pageData.js}
    } catch (e) {
        console.error('Error in custom JS:', e);
    }
});`;
        doc.body.appendChild(scriptTag);
    }

    // Inject the Editor Interaction Script
    const editorScript = doc.createElement('script');
    editorScript.id = 'editor-script';
    editorScript.type = 'module';
    editorScript.textContent = getEditorScript(); // Injected script is now in a separate function
    doc.body.appendChild(editorScript);
    
    // Set the iframe content
    // We must wait for the iframe to load before we can access its contentWindow
    canvasIframe.srcdoc = doc.documentElement.outerHTML;
    
    canvasIframe.onload = () => {
        console.log('Canvas iframe loaded.');
        // Now that it's loaded, tell the script inside to initialize
        canvasIframe.contentWindow.postMessage({
            type: 'initEditor',
            iframeId: currentPageName
        }, '*');
    };
}

/**
 * **IMPROVED:** Returns the script to be injected into the iframe.
 * This script now handles:
 * - Unique ID-based selection (much more robust).
 * - Smarter drag-and-drop with drop targets.
 * - Text and attribute editing.
 */
function getEditorScript() {
    return `
        let IFRAME_ID = null; // Set by 'initEditor' message
        let lastSelected = null;
        let dropIndicator = null;

        // --- Initialization ---
        window.addEventListener('message', (e) => {
            if (e.data.type === 'initEditor') {
                IFRAME_ID = e.data.iframeId;
                console.log('Editor script initialized in iframe:', IFRAME_ID);
                // Assign unique IDs to all elements on load
                assignUniqueIds(document.body);
                // Add editor styles
                injectEditorStyles();
                // Create drop indicator
                createDropIndicator();
            }
        });

        function assignUniqueIds(root) {
            root.querySelectorAll('body *').forEach(el => {
                if (!el.dataset.editorId && el.id !== 'editor-script') {
                    el.dataset.editorId = crypto.randomUUID();
                }
            });
        }
        
        function injectEditorStyles() {
            const outlineStyle = document.createElement('style');
            outlineStyle.id = 'editor-styles';
            outlineStyle.textContent = \`
                .editor-selected { 
                    outline: 2px solid #007bff !important; 
                    box-shadow: 0 0 10px rgba(0,123,255,0.5) !important; 
                    /* Prevent selection from blocking clicks */
                    position: relative; 
                    z-index: 10;
                }
                .editor-drag-over {
                    outline: 2px dashed #007bff !important;
                    background: rgba(0,123,255,0.05) !important;
                }
                #editor-drop-indicator {
                    position: absolute;
                    height: 2px;
                    background: #007bff;
                    width: 100%;
                    z-index: 9999;
                    pointer-events: none;
                    display: none;
                }
            \`;
            document.head.appendChild(outlineStyle);
        }
        
        function createDropIndicator() {
            dropIndicator = document.createElement('div');
            dropIndicator.id = 'editor-drop-indicator';
            document.body.appendChild(dropIndicator);
        }

        // --- Element Selection ---
        document.addEventListener('click', (e) => {
            if (!IFRAME_ID) return; // Not initialized
            // Don't select the body, html, or script tags
            if (e.target === document.body || e.target === document.documentElement || e.target.tagName === 'SCRIPT' || e.target.tagName === 'STYLE') {
                return;
            }
            e.preventDefault(); // Prevent navigation
            e.stopPropagation(); // Stop event bubbling
            
            const targetId = e.target.dataset.editorId;
            if (!targetId) return; // Don't select non-editable elements
            
            // Send message to parent (the editor)
            window.parent.postMessage({
                type: 'elementSelected',
                iframeId: IFRAME_ID,
                id: targetId,
                tagName: e.target.tagName,
                classes: e.target.className,
                textContent: e.target.textContent,
                attributes: Array.from(e.target.attributes).map(attr => ({ name: attr.name, value: attr.value }))
            }, '*');
            
            // Highlight locally
            selectElement(targetId);
            
        }, true); // Use capture phase to get click first

        function selectElement(id) {
            if (lastSelected) lastSelected.classList.remove('editor-selected');
            let el = document.querySelector(\`[data-editor-id="\${id}"]\`);
            if (el) {
                el.classList.add('editor-selected');
                lastSelected = el;
            }
        }

        // --- Drag and Drop ---
        let currentDragTarget = null;
        
        document.addEventListener('dragover', (e) => {
            e.preventDefault();
            e.dataTransfer.dropEffect = 'copy';
            
            let target = e.target;
            while(target && !target.dataset.editorId) {
                target = target.parentElement;
            }
            
            if (target && target.dataset.editorId) {
                positionDropIndicator(e, target);
                if (target !== currentDragTarget) {
                    currentDragTarget?.classList.remove('editor-drag-over');
                    currentDragTarget = target;
                    // currentDragTarget.classList.add('editor-drag-over'); // This is too noisy, use indicator
                }
            } else {
                dropIndicator.style.display = 'none';
            }
        });

        document.addEventListener('dragleave', (e) => {
            currentDragTarget?.classList.remove('editor-drag-over');
            currentDragTarget = null;
            dropIndicator.style.display = 'none';
        });
        
        function positionDropIndicator(e, target) {
            const rect = target.getBoundingClientRect();
            const y = e.clientY - rect.top;
            const threshold = rect.height / 2;
            
            const top = target.getBoundingClientRect().top + window.scrollY;
            
            if (y < threshold) {
                // Insert before
                dropIndicator.style.top = \`\${top}px\`;
                dropIndicator.dataset.position = 'before';
            } else {
                // Insert after
                dropIndicator.style.top = \`\${top + rect.height}px\`;
                dropIndicator.dataset.position = 'after';
            }
            dropIndicator.style.left = \`\${target.getBoundingClientRect().left + window.scrollX}px\`;
            dropIndicator.style.width = \`\${rect.width}px\`;
            dropIndicator.style.display = 'block';
        }

        document.addEventListener('drop', (e) => {
            e.preventDefault();
            e.stopPropagation();
            
            currentDragTarget?.classList.remove('editor-drag-over');
            dropIndicator.style.display = 'none';

            const htmlToDrop = e.dataTransfer.getData('text/html');
            if (!htmlToDrop) return;
            
            const tempDiv = document.createElement('div');
            tempDiv.innerHTML = htmlToDrop.trim();
            const newElement = tempDiv.firstChild;
            
            if (!newElement) return;
            
            // Assign new ID before inserting
            assignUniqueIds(tempDiv);
            
            // Find drop target again
            let target = currentDragTarget;
            
            if (target && target !== document.body && target !== document.documentElement) {
                const position = dropIndicator.dataset.position;
                if (position === 'before') {
                    target.parentNode.insertBefore(newElement, target);
                } else {
                    target.parentNode.insertBefore(newElement, target.nextSibling);
                }
            } else {
                // Simple drop: append to body
                document.body.appendChild(newElement);
            }
            
            notifyContentChanged();
        });
        
        function notifyContentChanged() {
            // Give the DOM a tick to update
            setTimeout(() => {
                const cleanHtml = getCleanHtml();
                window.parent.postMessage({
                    type: 'contentChanged',
                    iframeId: IFRAME_ID,
                    newHtml: cleanHtml
                }, '*');
            }, 50);
        }
        
        function getCleanHtml() {
            // Clone the document to avoid modifying the live one
            const cleanDoc = document.cloneNode(true);
            
            // Remove all editor-injected elements
            cleanDoc.getElementById('editor-script')?.remove();
            cleanDoc.getElementById('custom-script')?.remove();
            cleanDoc.getElementById('custom-styles')?.remove();
            cleanDoc.getElementById('editor-styles')?.remove();
            cleanDoc.getElementById('editor-drop-indicator')?.remove();
            
            // Remove all editor-added classes and attributes
            cleanDoc.querySelectorAll('.editor-selected').forEach(el => el.classList.remove('editor-selected'));
            cleanDoc.querySelectorAll('.editor-drag-over').forEach(el => el.classList.remove('editor-drag-over'));
            
            // Important: We only want the outerHTML of the <html> element
            return cleanDoc.documentElement.outerHTML;
        }

        // --- Parent Message Listeners ---
        window.addEventListener('message', (e) => {
            if (!IFRAME_ID || e.data.iframeId !== IFRAME_ID) return;

            switch(e.data.type) {
                case 'selectElement':
                    selectElement(e.data.id);
                    break;
                    
                case 'updateElementStyle':
                    if (lastSelected) {
                        lastSelected.className = e.data.classes;
                        notifyContentChanged();
                    }
                    break;
                    
                case 'updateElementText':
                    if (lastSelected) {
                        lastSelected.textContent = e.data.textContent;
                        notifyContentChanged();
                    }
                    break;
                
                case 'updateElementAttributes':
                    if (lastSelected) {
                        // Clear existing attributes (except data-editor-id and class)
                        const preserved = {
                            'data-editor-id': lastSelected.dataset.editorId,
                            'class': lastSelected.className
                        };
                        while(lastSelected.attributes.length > 0) {
                            lastSelected.removeAttribute(lastSelected.attributes[0].name);
                        }
                        // Add back preserved
                        Object.keys(preserved).forEach(key => {
                            if (preserved[key]) {
                                lastSelected.setAttribute(key, preserved[key]);
                            }
                        });
                        // Add new attributes
                        e.data.attributes.forEach(attr => {
                            if (attr.name && attr.name !== 'class' && attr.name !== 'data-editor-id') {
                                lastSelected.setAttribute(attr.name, attr.value);
                            }
                        });
                        notifyContentChanged();
                    }
                    break;
            }
        });
    `;
}


/**
 * Handles messages received from the iframe.
 */
function handleIframeMessage(e) {
    const data = e.data;

    // Ensure message is from the currently active iframe
    if (data.iframeId !== currentPageName) {
        // console.warn('Stale iframe message received.');
        return;
    }

    switch (data.type) {
        case 'elementSelected':
            console.log('Element selected:', data);
            selectedElement = {
                id: data.id,
                tagName: data.tagName,
                classes: data.classes,
                textContent: data.textContent,
                attributes: data.attributes
            };
            showInspector(selectedElement);
            // We don't need to message back, the iframe highlights itself
            break;
            
        case 'contentChanged':
            console.log('Iframe content changed, updating data...');
            // The HTML from the iframe is already "clean"
            currentPageData.html = data.newHtml;
            updateCodeEditors(currentPageData); // Update editor to match
            
            // Auto-save (debounced)
            debounceSave();
            break;
    }
}

// --- Auto-save ---
let saveTimer = null;
function debounceSave() {
    if (saveTimer) clearTimeout(saveTimer);
    saveTimer = setTimeout(async () => {
        console.log('Auto-saving page...');
        try {
            await Database.savePage(currentPageName, currentPageData);
            console.log('Auto-save complete.');
        } catch (error) {
            console.error('Auto-save failed:', error);
        }
    }, 1000); // Save 1 second after the last change
}


// --- Responsive Controls ---

function handleResponsiveControls(e) {
    const btn = e.target.closest('button');
    if (btn) {
        const size = btn.dataset.size;
        if (!size) return;

        // Update button active state
        responsiveToolbar.querySelectorAll('button').forEach(b => b.classList.remove('active-view'));
        btn.classList.add('active-view');

        // Apply styles to the iframe
        canvasIframe.style.transition = 'width 0.3s ease-in-out, height 0.3s ease-in-out';
        switch (size) {
            case 'desktop':
                canvasIframe.style.width = '100%';
                canvasIframe.style.maxWidth = '100%';
                canvasIframe.style.height = '100%';
                break;
            case 'tablet':
                canvasIframe.style.width = '768px';
                canvasIframe.style.maxWidth = '100%';
                canvasIframe.style.height = '1024px';
                break;
            case 'mobile':
                canvasIframe.style.width = '390px';
                canvasIframe.style.maxWidth = '100%';
                canvasIframe.style.height = '844px';
                break;
        }
    }
}

// --- Code Editors ---

function handleCodeTabClick(e) {
    if (e.target.classList.contains('code-tab')) {
        const tab = e.target.dataset.tab;
        
        // Update tab active state
        document.querySelectorAll('.code-tab').forEach(t => t.classList.remove('active-tab'));
        e.target.classList.add('active-tab');

        // Update editor active state
        document.querySelectorAll('.code-editor').forEach(ed => ed.classList.remove('active-editor'));
        document.getElementById(`code-editor-${tab}`).classList.add('active-editor');
    }
}

function updateCodeEditors(pageData) {
    codeEditorHtml.value = pageData.html || '';
    codeEditorCss.value = pageData.css || '';
    codeEditorJs.value = pageData.js || '';
}

async function saveCodeFromEditors() {
    console.log('Saving code...');
    window.App.showLoader('Saving & Refreshing...');
    
    currentPageData.html = codeEditorHtml.value;
    currentPageData.css = codeEditorCss.value;
    currentPageData.js = codeEditorJs.value;

    try {
        await Database.savePage(currentPageName, currentPageData);
        updateCanvas(currentPageData);
        console.log('Code saved and canvas updated.');
    } catch (error) {
        console.error('Error saving code:', error);
    } finally {
        window.App.hideLoader();
    }
}

// --- Inspector (Right Panel) ---

const TEXT_EDIT_TAGS = ['H1', 'H2', 'H3', 'H4', 'H5', 'H6', 'P', 'SPAN', 'A', 'BUTTON', 'LI', 'LABEL'];
const ATTR_EDIT_TAGS = ['IMG', 'A', 'VIDEO', 'AUDIO', 'IFRAME', 'SCRIPT', 'LINK'];
const DEFAULT_ATTRS = {
    'IMG': 'src',
    'A': 'href',
    'VIDEO': 'src',
};
const IGNORED_ATTRS = ['style', 'class', 'data-editor-id'];

/**
 * **IMPROVED:** Shows the inspector populated with the selected element's data.
 * Now includes text and attribute editing panes.
 * @param {object | null} element - The selected element object, or null to hide.
 */
function showInspector(element) {
    if (!element) {
        inspectorContent.style.display = 'none';
        inspectorPlaceholder.style.display = 'flex';
        selectedElement = null;
    } else {
        inspectorPlaceholder.style.display = 'none';
        inspectorContent.style.display = 'block';
        
        inspectorElementTag.textContent = `<${element.tagName.toLowerCase()}>`;
        inspectorElementClasses.textContent = element.classes ? element.classes.split(' ').join(' ') : '[no classes]';
        
        // --- Populate Style Tab ---
        tailwindClassesInput.value = element.classes || '';
        
        // Show/hide text editor
        if (TEXT_EDIT_TAGS.includes(element.tagName)) {
            textContentInput.value = element.textContent.trim();
            textEditorGroup.style.display = 'block';
        } else {
            textEditorGroup.style.display = 'none';
        }
        
        // --- Populate Settings (Attributes) Tab ---
        attributesList.innerHTML = '';
        if (element.attributes) {
            element.attributes.forEach(attr => {
                if (!IGNORED_ATTRS.includes(attr.name)) {
                    addAttributeInput(attr.name, attr.value);
                }
            });
        }
        // Add a default attribute field if it's a common tag (e.g., <img>)
        if (DEFAULT_ATTRS[element.tagName] && !element.attributes.find(a => a.name === DEFAULT_ATTRS[element.tagName])) {
             addAttributeInput(DEFAULT_ATTRS[element.tagName], '');
        }
    }
}

function addAttributeInput(key = '', value = '') {
    const item = document.createElement('div');
    item.className = 'attribute-item';
    item.innerHTML = `
        <input type="text" class="form-input attr-key" value="${key}" placeholder="name">
        <input type="text" class="form-input attr-value" value="${value}" placeholder="value">
        <button class="remove-attr-btn">&times;</button>
    `;
    item.querySelector('.remove-attr-btn').addEventListener('click', () => item.remove());
    attributesList.appendChild(item);
}


function handleInspectorTabClick(e) {
    if (e.target.classList.contains('inspector-tab')) {
        const tab = e.target.dataset.tab;
        
        // Update tab active state
        document.querySelectorAll('.inspector-tab').forEach(t => t.classList.remove('active-tab'));
        e.target.classList.add('active-tab');

        // Update pane active state
        document.querySelectorAll('.inspector-pane').forEach(p => p.classList.remove('active-pane'));
        document.getElementById(`inspector-pane-${tab}`).classList.add('active-pane');
    }
}

/**
 * Applies the classes from the Tailwind input to the selected element.
 */
function applyTailwindClasses() {
    if (!selectedElement) return;
    
    const newClasses = tailwindClassesInput.value;
    selectedElement.classes = newClasses; // Update local state
    
    // Update inspector UI
    inspectorElementClasses.textContent = newClasses.split(' ').join(' ');

    // Send message to iframe to update the actual element
    canvasIframe.contentWindow.postMessage({
        type: 'updateElementStyle',
        iframeId: currentPageName,
        id: selectedElement.id,
        classes: newClasses
    }, '*');
}

/**
 * **NEW:** Applies text content to the selected element.
 */
function applyTextContent() {
    if (!selectedElement) return;
    
    const newText = textContentInput.value;
    selectedElement.textContent = newText; // Update local state
    
    canvasIframe.contentWindow.postMessage({
        type: 'updateElementText',
        iframeId: currentPageName,
        id: selectedElement.id,
        textContent: newText
    }, '*');
}

/**
 * **NEW:** Applies attributes to the selected element.
 */
function applyAttributes() {
    if (!selectedElement) return;
    
    const attributes = [];
    attributesList.querySelectorAll('.attribute-item').forEach(item => {
        const key = item.querySelector('.attr-key').value.trim();
        const value = item.querySelector('.attr-value').value.trim();
        if (key) {
            attributes.push({ name: key, value: value });
        }
    });
    
    selectedElement.attributes = attributes; // Update local state
    
    canvasIframe.contentWindow.postMessage({
        type: 'updateElementAttributes',
        iframeId: currentPageName,
        id: selectedElement.id,
        attributes: attributes
    }, '*');
}