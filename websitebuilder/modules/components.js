// Manages draggable components: Atoms, Blocks, and User-Saved

import * as Database from './database.js';

let editor; // Will be set to the Editor module instance
let componentsListUI, atomsListUI, blocksListUI;

// --- Definitions ---

// Definitions for draggable "Atoms"
const atoms = [
    { name: 'Heading 1', html: '<h1 class="text-4xl font-bold">Heading 1</h1>' },
    { name: 'Paragraph', html: '<p class="text-base">This is a paragraph of text.</p>' },
    { name: 'Button', html: '<button class="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600">Click Me</button>' },
    { name: 'Image', html: '<img src="https://placehold.co/600x400/eee/ccc?text=Image" alt="placeholder" class="rounded-lg max-w-full">' },
    { name: 'Flex Div', html: '<div class="flex gap-4 p-4 border rounded-lg"><div>Child 1</div><div>Child 2</div></div>' }
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
 * Initializes the Components module.
 * @param {object} editorInstance - The main Editor module.
 */
export async function init(editorInstance) {
    console.log('Components Module: Initializing...');
    editor = editorInstance;
    
    // Find UI Elements
    atomsListUI = document.getElementById('atoms-list');
    blocksListUI = document.getElementById('blocks-list');
    componentsListUI = document.getElementById('components-list');

    // Populate static lists
    populateAtomsList();
    populateBlocksList();
    
    // Load and populate dynamic user components
    await loadUserComponents();
}

/**
 * Populates the "Atoms" list with draggable elements.
 */
function populateAtomsList() {
    atomsListUI.innerHTML = '';
    atoms.forEach(atom => {
        const el = createDraggableItem(atom.name, atom.html);
        atomsListUI.appendChild(el);
    });
}

/**
 * Populates the "Blocks" list with draggable elements.
 */
function populateBlocksList() {
    blocksListUI.innerHTML = '';
    blocks.forEach(block => {
        const el = createDraggableItem(block.name, block.html);
        blocksListUI.appendChild(el);
    });
}

/**
 * **NEW:** Fetches user components from DB and renders them.
 */
async function loadUserComponents() {
    componentsListUI.innerHTML = '';
    const components = await Database.getAllComponents();
    
    if (components.length === 0) {
        componentsListUI.innerHTML = '<p class="empty-list-item">No saved components.</p>';
        return;
    }

    components.forEach(comp => {
        const el = createDraggableItem(comp.name, comp.html, comp.id);
        componentsListUI.appendChild(el);
    });
}

/**
 * **NEW:** Creates a generic draggable item.
 * @param {string} name - The display name.
 * @param {string} html - The HTML to drag.
 * @param {number} [id] - The DB id (if it's a user component).
 */
function createDraggableItem(name, html, id = null) {
    const el = document.createElement('div');
    el.className = 'block-item';
    el.textContent = name;
    el.draggable = true;
    el.dataset.dragType = 'html';
    el.dataset.html = html;

    if (id) {
        // Add delete button for user components
        const deleteBtn = document.createElement('button');
        deleteBtn.className = 'delete-component-btn';
        deleteBtn.title = `Delete ${name}`;
        deleteBtn.innerHTML = '&times;';
        deleteBtn.dataset.id = id;
        deleteBtn.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            handleDeleteComponent(id, name);
        });
        el.appendChild(deleteBtn);
    }
    return el;
}

/**
 * **NEW:** Finishes the save component process (called by editor).
 * @param {string} html - The outerHTML of the selected element.
 */
export async function finishSaveComponent(html) {
    const name = prompt("Enter a name for this component:", "My Component");
    if (!name || !html) {
        return;
    }

    window.App.showLoader('Saving component...');
    try {
        // Clean the HTML before saving
        const cleanHtml = cleanComponentHtml(html);
        await Database.saveComponent(name, cleanHtml);
        await loadUserComponents();
    } catch (error) {
        console.error('Error saving component:', error);
    } finally {
        window.App.hideLoader();
    }
}

/**
 * **NEW:** Handles deleting a user component.
 * @param {number} id
 * @param {string} name
 */
async function handleDeleteComponent(id, name) {
    window.App.showConfirm({
        title: 'Delete Component',
        message: `Are you sure you want to delete "${name}"?`,
        onConfirm: async () => {
            window.App.showLoader('Deleting...');
            try {
                await Database.deleteComponent(id);
                await loadUserComponents();
            } catch (error) {
                console.error('Error deleting component:', error);
            } finally {
                window.App.hideLoader();
            }
        }
    });
}

/**
 * **NEW:** Cleans HTML for saving as a component.
 * Removes editor-specific IDs and classes.
 * @param {string} html
 */
function cleanComponentHtml(html) {
    const el = new DOMParser().parseFromString(html, 'text/html').body.firstChild;
    if (!el) return '';
    
    // Remove editor-specific attributes from parent and all children
    el.removeAttribute('data-editor-id');
    el.classList.remove('editor-selected');
    el.querySelectorAll('[data-editor-id]').forEach(child => {
        child.removeAttribute('data-editor-id');
        child.classList.remove('editor-selected');
    });
    
    return el.outerHTML;
}