// Manages ALL data: IndexedDB, Global/Project assets, and state

// Exportable DB instances so other modules can use them
export let globalDb;
export let projectDb;

const DB_VERSION = 1;
const GLOBAL_DB_NAME = 'BuilderGlobalDB';
const PROJECT_DB_NAME = 'BuilderProjectDB'; // We'll later make this dynamic per-project
const CURRENT_PAGE_KEY = 'builderCurrentPage';

/**
 * Initializes both Global and Project databases.
 */
export async function init() {
    console.log('Database Module: Initializing...');
    try {
        // Open the Global DB
        globalDb = await openDb(GLOBAL_DB_NAME, DB_VERSION, (db) => {
            // This runs if the DB is new or version changes
            if (!db.objectStoreNames.contains('globalAssets')) {
                const store = db.createObjectStore('globalAssets', { keyPath: 'id', autoIncrement: true });
                store.createIndex('name', 'name', { unique: false });
                store.createIndex('type', 'type', { unique: false }); // 'image', 'font', 'video'
            }
            if (!db.objectStoreNames.contains('globalComponents')) {
                db.createObjectStore('globalComponents', { keyPath: 'id', autoIncrement: true });
            }
        });
        console.log('GlobalDB Ready.');

        // Open the (current) Project DB
        projectDb = await openDb(PROJECT_DB_NAME, DB_VERSION, (db) => {
            // This runs if the DB is new or version changes
            if (!db.objectStoreNames.contains('projectAssets')) {
                const store = db.createObjectStore('projectAssets', { keyPath: 'id', autoIncrement: true });
                store.createIndex('name', 'name', { unique: false });
                store.createIndex('type', 'type', { unique: false });
            }
            if (!db.objectStoreNames.contains('pages')) {
                // Store page-specific data (HTML, CSS, JS)
                db.createObjectStore('pages', { keyPath: 'name' }); // 'index.html', 'about.html'
            }
        });
        console.log('ProjectDB Ready.');

        console.log('Database Module: Initialization Complete.');

    } catch (error) {
        console.error('Error initializing databases:', error);
    }
}

/**
 * A Promise-based wrapper for opening an IndexedDB.
 * @param {string} dbName The name of the database.
 * @param {number} version The database version.
 * @param {function} onUpgrade A callback function to run onupgradeneeded.
 * @returns {Promise<IDBDatabase>}
 */
function openDb(dbName, version, onUpgrade) {
    return new Promise((resolve, reject) => {
        const request = indexedDB.open(dbName, version);

        request.onerror = (event) => {
            reject(`IndexedDB error: ${event.target.errorCode}`);
        };

        request.onsuccess = (event) => {
            resolve(event.target.result);
        };

        request.onupgradeneeded = (event) => {
            const db = event.target.result;
            onUpgrade(db);
        };
    });
}

// --- Asset Management Functions ---

/**
 * Adds an asset (File object) to the specified database.
 * @param {'global' | 'project'} dbType
 * @param {File} file
 */
export async function addAsset(dbType, file) {
    const db = (dbType === 'global') ? globalDb : projectDb;
    const storeName = (dbType === 'global') ? 'globalAssets' : 'projectAssets';

    if (!db) return console.error(`Database ${dbType} is not initialized.`);

    // Read the file as a blob/arrayBuffer to store it
    const fileData = await file.arrayBuffer();
    const assetRecord = {
        name: file.name,
        type: file.type.split('/')[0] || 'file', // 'image', 'video', 'font'
        mimeType: file.type,
        size: file.size,
        lastModified: file.lastModified,
        data: fileData // Storing the actual file data
    };

    return new Promise((resolve, reject) => {
        const transaction = db.transaction([storeName], 'readwrite');
        const store = transaction.objectStore(storeName);
        const request = store.add(assetRecord);

        request.onsuccess = () => resolve(request.result);
        request.onerror = (event) => reject(`Error adding asset: ${event.target.error}`);
    });
}

/**
 * Retrieves all assets of a specific type from a database.
 * @param {'global' | 'project'} dbType
 * @param {string} [type] - Optional: 'image', 'font', etc.
 * @returns {Promise<Array<object>>}
 */
export async function getAssets(dbType, type) {
    const db = (dbType === 'global') ? globalDb : projectDb;
    const storeName = (dbType === 'Gglobal') ? 'globalAssets' : 'projectAssets';

    if (!db) {
        console.error(`Database ${dbType} is not initialized.`);
        return [];
    }

    return new Promise((resolve, reject) => {
        const transaction = db.transaction([storeName], 'readonly');
        const store = transaction.objectStore(storeName);
        let request;

        if (type) {
            // If type is specified, use the 'type' index
            const index = store.index('type');
            request = index.getAll(type);
        } else {
            // Otherwise, get all records
            request = store.getAll();
        }

        request.onsuccess = () => resolve(request.result);
        request.onerror = (event) => reject(`Error getting assets: ${event.target.error}`);
    });
}

/**
 * Gets a single asset by its ID.
 * @param {'global' | 'project'} dbType
 * @param {number} id
 * @returns {Promise<object>}
 */
export async function getAssetById(dbType, id) {
    const db = (dbType === 'global') ? globalDb : projectDb;
    const storeName = (dbType ==='global') ? 'globalAssets' : 'projectAssets';

    if (!db) return console.error(`Database ${dbType} is not initialized.`);

    return new Promise((resolve, reject) => {
        const transaction = db.transaction([storeName], 'readonly');
        const store = transaction.objectStore(storeName);
        const request = store.get(id);

        request.onsuccess = () => resolve(request.result);
        request.onerror = (event) => reject(`Error getting asset by ID: ${event.target.error}`);
    });
}

/**
 * **NEW:** Creates a blob URL for an asset, ideal for <img> src.
 * This avoids loading the entire ArrayBuffer into memory multiple times.
 * @param {'global' | 'project'} dbType
 * @param {number} id
 * @returns {Promise<string|null>} A blob URL (e.g., "blob:http://...")
 */
export async function getAssetUrl(dbType, id) {
    try {
        const asset = await getAssetById(dbType, id);
        if (!asset || !asset.data) return null;

        const blob = new Blob([asset.data], { type: asset.mimeType });
        return URL.createObjectURL(blob);
    } catch (error) {
        console.error('Error creating asset URL:', error);
        return null;
    }
}


/**
 * Deletes an asset by its ID.
 * @param {'global' | 'project'} dbType
 * @param {number} id
 */
export async function deleteAsset(dbType, id) {
    const db = (dbType === 'global') ? globalDb : projectDb;
    const storeName = (dbType === 'global') ? 'globalAssets' : 'projectAssets';

    if (!db) return console.error(`Database ${dbType} is not initialized.`);

    return new Promise((resolve, reject) => {
        const transaction = db.transaction([storeName], 'readwrite');
        const store = transaction.objectStore(storeName);
        const request = store.delete(id);

        request.onsuccess = () => resolve();
        request.onerror = (event) => reject(`Error deleting asset: ${event.target.error}`);
    });
}

// --- Page Management Functions ---

/**
 * Saves page data (HTML, CSS, JS) to the 'pages' object store.
 * Uses 'put' to either insert or update the record.
 * @param {string} pageName - e.g., 'index.html'
 * @param {object} pageData - { html, css, js, settings }
 * @returns {Promise}
 */
export async function savePage(pageName, pageData) {
    if (!projectDb) return console.error('Project DB is not initialized.');

    return new Promise((resolve, reject) => {
        const transaction = projectDb.transaction(['pages'], 'readwrite');
        const store = transaction.objectStore('pages');
        // 'put' will add or update the record based on the key (pageName)
        const request = store.put({ name: pageName, ...pageData });

        request.onsuccess = () => resolve(request.result);
        request.onerror = (event) => reject(`Error saving page: ${event.target.error}`);
    });
}

/**
 * Retrieves a single page's data by its name.
 * @param {string} pageName - e.g., 'index.html'
 * @returns {Promise<object>}
 */
export async function getPage(pageName) {
    if (!projectDb) return console.error('Project DB is not initialized.');

    return new Promise((resolve, reject) => {
        const transaction = projectDb.transaction(['pages'], 'readonly');
        const store = transaction.objectStore('pages');
        const request = store.get(pageName);

        request.onsuccess = () => resolve(request.result);
        request.onerror = (event) => reject(`Error getting page: ${event.target.error}`);
    });
}

/**
 * Retrieves all pages from the project.
 * @returns {Promise<Array<object>>}
 */
export async function getAllPages() {
    if (!projectDb) {
        console.error('Project DB is not initialized.');
        return [];
    }

    return new Promise((resolve, reject) => {
        const transaction = projectDb.transaction(['pages'], 'readonly');
        const store = transaction.objectStore('pages');
        const request = store.getAll();

        request.onsuccess = () => resolve(request.result);
        request.onerror = (event) => reject(`Error getting all pages: ${event.target.error}`);
    });
}

/**
 * **NEW:** Deletes a page by its name.
 * @param {string} pageName - e.g., 'index.html'
 * @returns {Promise<void>}
 */
export async function deletePage(pageName) {
    if (!projectDb) return console.error('Project DB is not initialized.');

    return new Promise((resolve, reject) => {
        const transaction = projectDb.transaction(['pages'], 'readwrite');
        const store = transaction.objectStore('pages');
        const request = store.delete(pageName);

        request.onsuccess = () => resolve();
        request.onerror = (event) => reject(`Error deleting page: ${event.target.error}`);
    });
}


// --- Project State Management (using localStorage) ---

/**
 * Saves the name of the currently active page.
 * @param {string} pageName 
 */
export function setCurrentPage(pageName) {
    localStorage.setItem(CURRENT_PAGE_KEY, pageName);
}

/**
 * Loads the name of the last active page.
 * @returns {string | null}
 */
export function getCurrentPage() {
    return localStorage.getItem(CURRENT_PAGE_KEY);
}