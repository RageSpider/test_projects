// --- State Management ---
let state = {
    data: [],
    categories: [],
    activeCategory: 'All',
    searchQuery: '',
    isGridView: true,
    favorites: JSON.parse(localStorage.getItem('awesome_favs')) || []
};

// --- DOM Elements ---
const DOM = {
    container: document.getElementById('websitesContainer'),
    categoryList: document.getElementById('categoryList'),
    searchInput: document.getElementById('searchInput'),
    clearSearch: document.getElementById('clearSearch'),
    currentCatTitle: document.getElementById('currentCategoryTitle'),
    statsText: document.getElementById('statsText'),
    loader: document.getElementById('loader'),
    emptyState: document.getElementById('emptyState'),
    resetBtn: document.getElementById('resetFilters'),
    
    // Toggles
    viewToggle: document.getElementById('viewToggle'),
    themeToggle: document.getElementById('themeToggle'),
    mobileBtn: document.getElementById('mobileMenuBtn'),
    sidebar: document.getElementById('sidebar'),
    closeSidebar: document.getElementById('closeSidebar'),
    
    // Badges
    badgeAll: document.querySelector('.badge-all'),
    badgeFav: document.querySelector('.badge-fav')
};

// --- Icons mapping for categories ---
const getIconForCategory = (cat) => {
    const c = cat.toLowerCase();
    if (c.includes('tool') || c.includes('diy')) return 'fa-tools';
    if (c.includes('design') || c.includes('visual') || c.includes('art')) return 'fa-palette';
    if (c.includes('music') || c.includes('audio')) return 'fa-music';
    if (c.includes('code') || c.includes('dev') || c.includes('program')) return 'fa-code';
    if (c.includes('business') || c.includes('economy') || c.includes('startup')) return 'fa-briefcase';
    if (c.includes('privacy') || c.includes('security')) return 'fa-shield-halved';
    if (c.includes('game')) return 'fa-gamepad';
    if (c.includes('health')) return 'fa-heart-pulse';
    if (c.includes('travel')) return 'fa-plane';
    if (c.includes('science') || c.includes('physics') || c.includes('math')) return 'fa-flask';
    if (c.includes('book') || c.includes('read') || c.includes('text')) return 'fa-book';
    if (c.includes('job') || c.includes('career')) return 'fa-user-tie';
    if (c.includes('media') || c.includes('social')) return 'fa-hashtag';
    return 'fa-folder';
};

// --- Initialization ---
async function init() {
    initTheme();
    setupEventListeners();
    
    try {
        // Fetch JSON data
        const response = await fetch('list.json');
        const jsonData = await response.json();
        
        state.data = jsonData.sites;
        state.categories = jsonData.categories;
        
        DOM.loader.classList.add('hidden');
        DOM.container.classList.remove('hidden');
        
        renderSidebar();
        updateUI();
    } catch (error) {
        console.error("Failed to load list.json:", error);
        DOM.loader.innerHTML = `<p style="color:#ef4444">Error loading data. Ensure you are running a local server (e.g., Live Server).</p>`;
    }
}

// --- Render Logic ---
function updateUI() {
    let filtered = state.data;

    // Apply Search
    if (state.searchQuery) {
        const q = state.searchQuery.toLowerCase();
        filtered = filtered.filter(s => 
            s.name.toLowerCase().includes(q) || 
            s.description.toLowerCase().includes(q) ||
            s.category.toLowerCase().includes(q)
        );
    }

    // Apply Category
    if (state.activeCategory === 'Favorites') {
        filtered = filtered.filter(s => state.favorites.includes(s.id));
    } else if (state.activeCategory !== 'All') {
        filtered = filtered.filter(s => s.category === state.activeCategory);
    }

    // Update Text & Badges
    DOM.currentCatTitle.textContent = state.activeCategory === 'All' ? 'All Websites' : state.activeCategory;
    DOM.statsText.textContent = `Showing ${filtered.length} resources`;
    DOM.badgeAll.textContent = state.data.length;
    DOM.badgeFav.textContent = state.favorites.length;

    // Active Sidebar state
    document.querySelectorAll('.category-btn').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.category === state.activeCategory);
    });

    // Render Cards
    if (filtered.length === 0) {
        DOM.container.classList.add('hidden');
        DOM.emptyState.classList.remove('hidden');
    } else {
        DOM.emptyState.classList.add('hidden');
        DOM.container.classList.remove('hidden');
        renderCards(filtered);
    }
}

function renderSidebar() {
    const html = state.categories.map(cat => {
        const count = state.data.filter(s => s.category === cat).length;
        const icon = getIconForCategory(cat);
        return `
            <li>
                <button class="category-btn" data-category="${cat}">
                    <i class="fa-solid ${icon}"></i> ${cat}
                    <span class="count">${count}</span>
                </button>
            </li>
        `;
    }).join('');
    
    DOM.categoryList.innerHTML = html;

    // Attach events to new buttons
    document.querySelectorAll('.category-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            state.activeCategory = e.currentTarget.dataset.category;
            // Mobile close
            if(window.innerWidth <= 1024) DOM.sidebar.classList.remove('open');
            updateUI();
        });
    });
}

function renderCards(sites) {
    const html = sites.map(site => {
        const isFav = state.favorites.includes(site.id);
        
        // Extract domain for favicon
        let domain = '';
        try { domain = new URL(site.url).hostname; } catch(e) {}
        const favicon = domain ? `https://www.google.com/s2/favicons?domain=${domain}&sz=64` : '';

        // Badges
        const tagsHtml = site.tags.map(tag => {
            if (tag === 'Paid') return `<span class="tag tag-paid"><i class="fa-solid fa-dollar-sign"></i> Paid</span>`;
            if (tag === 'Student') return `<span class="tag tag-student"><i class="fa-solid fa-graduation-cap"></i> Student</span>`;
            if (tag === 'Down') return `<span class="tag tag-down"><i class="fa-solid fa-triangle-exclamation"></i> Down</span>`;
            return '';
        }).join('');

        return `
            <a href="${site.url}" target="_blank" rel="noopener noreferrer" class="site-card">
                <div class="card-header">
                    <div class="card-title-group">
                        <div class="favicon">
                            <img src="${favicon}" alt="" onerror="this.src='data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjOTRhM2I4IiBzdHJva2Utd2lkdGg9IjIiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCI+PGNpcmNsZSBjeD0iMTIiIGN5PSIxMiIgcj0iMTAiPjwvY2lyY2xlPjxsaW5lIHgxPSIyIiB5MT0iMTIiIHgyPSIyMiIgeTI9IjEyIj48L2xpbmU+PC9zdmc+'">
                        </div>
                        <div class="site-info">
                            <h3 class="site-name">${site.name}</h3>
                            <div class="site-url">${domain}</div>
                        </div>
                    </div>
                    <button class="fav-btn ${isFav ? 'active' : ''}" data-id="${site.id}" title="Toggle Favorite">
                        <i class="${isFav ? 'fa-solid' : 'fa-regular'} fa-heart"></i>
                    </button>
                </div>
                
                <p class="site-desc">${site.description}</p>
                
                <div class="card-footer">
                    <div class="card-tags">${tagsHtml}</div>
                    <i class="fa-solid fa-arrow-right arrow-icon"></i>
                </div>
            </a>
        `;
    }).join('');

    DOM.container.innerHTML = html;

    // Attach Favorite Events
    document.querySelectorAll('.fav-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault(); // Prevent opening link
            const id = e.currentTarget.dataset.id;
            toggleFavorite(id);
        });
    });
}

// --- Actions ---
function toggleFavorite(id) {
    const index = state.favorites.indexOf(id);
    if (index === -1) {
        state.favorites.push(id);
    } else {
        state.favorites.splice(index, 1);
    }
    localStorage.setItem('awesome_favs', JSON.stringify(state.favorites));
    updateUI();
}

function initTheme() {
    const saved = localStorage.getItem('awesome_theme');
    if (saved === 'dark' || (!saved && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
        document.documentElement.setAttribute('data-theme', 'dark');
        DOM.themeToggle.innerHTML = '<i class="fa-solid fa-sun"></i>';
    } else {
        document.documentElement.removeAttribute('data-theme');
        DOM.themeToggle.innerHTML = '<i class="fa-solid fa-moon"></i>';
    }
}

// --- Event Listeners ---
function setupEventListeners() {
    // Search
    DOM.searchInput.addEventListener('input', (e) => {
        state.searchQuery = e.target.value;
        DOM.clearSearch.classList.toggle('hidden', !state.searchQuery);
        updateUI();
    });

    DOM.clearSearch.addEventListener('click', () => {
        state.searchQuery = '';
        DOM.searchInput.value = '';
        DOM.clearSearch.classList.add('hidden');
        updateUI();
    });

    // View Toggle
    DOM.viewToggle.addEventListener('click', () => {
        state.isGridView = !state.isGridView;
        if(state.isGridView) {
            DOM.container.classList.remove('list-view');
            DOM.container.classList.add('grid-view');
            DOM.viewToggle.innerHTML = '<i class="fa-solid fa-list"></i>';
        } else {
            DOM.container.classList.remove('grid-view');
            DOM.container.classList.add('list-view');
            DOM.viewToggle.innerHTML = '<i class="fa-solid fa-table-cells-large"></i>';
        }
    });

    // Theme Toggle
    DOM.themeToggle.addEventListener('click', () => {
        const isDark = document.documentElement.hasAttribute('data-theme');
        if (isDark) {
            document.documentElement.removeAttribute('data-theme');
            localStorage.setItem('awesome_theme', 'light');
            DOM.themeToggle.innerHTML = '<i class="fa-solid fa-moon"></i>';
        } else {
            document.documentElement.setAttribute('data-theme', 'dark');
            localStorage.setItem('awesome_theme', 'dark');
            DOM.themeToggle.innerHTML = '<i class="fa-solid fa-sun"></i>';
        }
    });

    // Mobile Sidebar
    DOM.mobileBtn.addEventListener('click', () => DOM.sidebar.classList.add('open'));
    DOM.closeSidebar.addEventListener('click', () => DOM.sidebar.classList.remove('open'));

    // Reset
    DOM.resetBtn.addEventListener('click', () => {
        state.searchQuery = '';
        DOM.searchInput.value = '';
        state.activeCategory = 'All';
        DOM.clearSearch.classList.add('hidden');
        updateUI();
    });
}

// Boot
document.addEventListener('DOMContentLoaded', init);