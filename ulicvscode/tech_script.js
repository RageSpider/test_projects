/* --- tech_script.js --- */
/* V6 (LocalStorage FS, Real Neofetch, Theme, Responsive) */

document.addEventListener('DOMContentLoaded', () => {

    const appGrid = document.querySelector('.app-grid');
    const clickableLinks = document.querySelectorAll('[data-target]');
    const contentPages = document.querySelectorAll('.content-page');
    const mainContentArea = document.getElementById('main-content-area');
    const editorTabsContainer = document.getElementById('editor-tabs');

    /* ------------------------------ */
    /* 1. Editor Tab Navigation */
    /* ------------------------------ */

    function openPageAsTab(targetId, tabName) {
        const existingTab = document.querySelector(`.editor-tab[data-target="${targetId}"]`);
        if (existingTab) {
            setActiveTab(existingTab);
            return;
        }

        const tab = document.createElement('div');
        tab.className = 'editor-tab';
        tab.dataset.target = targetId;
        
        const tabText = document.createElement('span');
        tabText.textContent = tabName;
        
        // NEW: Only add close button if not data-noclose
        if (tabName !== 'Welcome') { // Simple check, or use a data-attribute
            const closeBtn = document.createElement('span');
            closeBtn.className = 'editor-tab-close';
            closeBtn.innerHTML = '&times;';
            tab.appendChild(closeBtn);

            closeBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                closeTab(tab);
            });
        } else {
            tab.dataset.noclose = "true";
        }
        
        tab.prepend(tabText); // Prepend text so close button is last
        editorTabsContainer.appendChild(tab);

        tab.addEventListener('click', (e) => {
            // Don't activate if close button was clicked
            if (e.target.classList.contains('editor-tab-close')) return;
            setActiveTab(tab);
        });

        setActiveTab(tab);
    }

    function setActiveTab(tab) {
        if (!tab) return;

        const targetId = tab.dataset.target;

        document.querySelectorAll('.editor-tab').forEach(t => t.classList.remove('active'));
        contentPages.forEach(p => p.classList.remove('active'));
        
        // De-activate all links, except the explorer toggle
        clickableLinks.forEach(l => {
            if (l.id !== 'toggle-explorer') {
                l.classList.remove('active');
            }
        });

        tab.classList.add('active');
        const targetPage = document.getElementById(targetId);
        if (targetPage) {
            targetPage.classList.add('active');
        }

        // Find the corresponding link in the *activity bar*
        const targetLink = document.querySelector(`.activity-link[data-target="${targetId}"]`);
        if (targetLink) {
            targetLink.classList.add('active');
        }

        // NEW: Also activate corresponding link in the *sidebar*
        const sidebarLink = document.querySelector(`.sidebar-link[data-target="${targetId}"]`);
        if (sidebarLink) {
            sidebarLink.classList.add('active');
        }
        
        if (mainContentArea) {
            mainContentArea.scrollTop = 0;
        }
    }

    function closeTab(tab) {
        // NEW: Do not close tabs with data-noclose="true"
        if (tab.dataset.noclose === 'true') {
            return;
        }

        const wasActive = tab.classList.contains('active');
        const targetId = tab.dataset.target;
        let tabToActivate = null;

        if (wasActive) {
            tabToActivate = tab.previousElementSibling || tab.nextElementSibling;
        }

        tab.remove();
        const targetPage = document.getElementById(targetId);
        if (targetPage) {
            targetPage.classList.remove('active');
        }
        
        const targetLink = document.querySelector(`[data-target="${targetId}"]`);
        if (targetLink) {
            targetLink.classList.remove('active');
        }

        if (wasActive && tabToActivate) {
            setActiveTab(tabToActivate);
        } else if (wasActive && editorTabsContainer.childElementCount === 0) {
            contentPages.forEach(p => p.classList.remove('active'));
        }
    }

    clickableLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('data-target');
            const tabName = link.getAttribute('data-tab-name');
            if (targetId && tabName) {
                openPageAsTab(targetId, tabName);
            }
            
            // NEW: If on mobile, close explorer panel after clicking a file
            if (window.innerWidth <= 900 && link.classList.contains('sidebar-link')) {
                appGrid.classList.add('explorer-hidden');
            }
        });
    });
    
    // Set Welcome tab as active manually (it's already in HTML)
    setActiveTab(document.querySelector('.editor-tab[data-target="page-welcome"]'));


    /* ------------------------------ */
    /* 2. Hero Typing Effect */
    /* ------------------------------ */
    const typingElement = document.querySelector('.typing-effect');
    if (typingElement) {
        const words = ['We Are ULICT.', 'We Build Software.', 'We Design Systems.', 'We Solve Problems.'];
        let wordIndex = 0;
        let charIndex = 0;
        let isDeleting = false;

        function type() {
            const currentWord = words[wordIndex];
            if (isDeleting) {
                typingElement.textContent = currentWord.substring(0, charIndex - 1);
                charIndex--;
            } else {
                typingElement.textContent = currentWord.substring(0, charIndex + 1);
                charIndex++;
            }
            let typeSpeed = isDeleting ? 75 : 150;
            if (!isDeleting && charIndex === currentWord.length) {
                typeSpeed = 2000;
                isDeleting = true;
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                wordIndex = (wordIndex + 1) % words.length;
                typeSpeed = 500;
            }
            setTimeout(type, typeSpeed);
        }
        type();
    }


    /* ------------------------------ */
    /* 3. Explorer Toggle */
    /* ------------------------------ */
    const explorerToggleBtn = document.getElementById('toggle-explorer');
    if (appGrid && explorerToggleBtn) {
        explorerToggleBtn.addEventListener('click', (e) => {
            e.preventDefault();
            appGrid.classList.toggle('explorer-hidden');
        });
    }

    /* ------------------------------ */
    /* 4. Collapsible Folders */
    /* ------------------------------ */
    const folderToggles = document.querySelectorAll('[data-toggle="collapse"]');
    folderToggles.forEach(toggle => {
        toggle.addEventListener('click', (e) => {
            e.stopPropagation();
            const targetId = toggle.dataset.target;
            const targetMenu = document.getElementById(targetId);
            const parentLi = toggle.closest('li');

            if (targetMenu && parentLi) {
                parentLi.classList.toggle('open');
                parentLi.classList.toggle('closed');
                
                if (toggle.dataset.icon === 'folder-open') {
                    toggle.dataset.icon = 'folder';
                } else if (toggle.dataset.icon === 'folder') {
                    toggle.dataset.icon = 'folder-open';
                }
            }
        });
    });


    /* ------------------------------ */
    /* 5. Bottom Panel Logic */
    /* ------------------------------ */
    const bottomPanel = document.getElementById('bottom-panel');
    const panelTabBar = document.getElementById('panel-tab-bar');
    const panelToggleBtn = document.getElementById('panel-toggle-btn');
    const panelTabs = document.querySelectorAll('.panel-tab');
    const panelContents = document.querySelectorAll('.panel-content');

    function toggleBottomPanel() {
        bottomPanel.classList.toggle('collapsed');
    }

    if (panelTabBar) {
        panelTabBar.addEventListener('click', (e) => {
            if (e.target.id === 'panel-tab-bar' || e.target.classList.contains('panel-tabs')) {
                toggleBottomPanel();
            }
        });
    }
    if (panelToggleBtn) panelToggleBtn.addEventListener('click', toggleBottomPanel);

    function switchPanelTab(targetId) {
        panelContents.forEach(content => {
            content.classList.remove('active');
            if (content.id === targetId) {
                content.classList.add('active');
            }
        });
        panelTabs.forEach(tab => {
            tab.classList.remove('active');
            if (tab.dataset.target === targetId) {
                tab.classList.add('active');
            }
        });
    }

    panelTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            switchPanelTab(tab.dataset.target);
            if (bottomPanel.classList.contains('collapsed')) {
                toggleBottomPanel();
            }
        });
    });


    /* ------------------------------ */
    /* 6. Interactive Terminal (w/ LocalStorage) */
    /* ------------------------------ */
    const terminalOutput = document.getElementById('terminal-output');
    const terminalInput = document.getElementById('terminal-input');
    const terminalPrompt = document.getElementById('terminal-prompt');
    const FS_KEY = 'ulict_vfs_fs'; // LocalStorage Key

    // Default file system
    const defaultFileSystem = {
        '~': { type: 'dir', children: ['src', '.gitignore', 'package.json'] },
        '~/src': { type: 'dir', children: ['pages'] },
        '~/src/pages': { type: 'dir', children: ['about.md', 'domains.js', 'team.json', 'contact.css'] },
        '~/.gitignore': { type: 'file', contentId: null, staticContent: "node_modules/\n.env\n*.log" },
        '~/package.json': { type: 'file', contentId: 'content-package' },
        '~/src/pages/about.md': { type: 'file', contentId: 'content-about.md' },
        '~/src/pages/domains.js': { type: 'file', contentId: 'content-domains.js' },
        '~/src/pages/team.json': { type: 'file', contentId: 'content-team.json' },
        '~/src/pages/contact.css': { type: 'file', contentId: 'content-contact.css' }
    };

    let fileSystem = {};
    let currentDir = "~";
    let commandHistory = [];
    let historyIndex = -1;

    // NEW: Load/Save File System
    function saveFileSystem() {
        try {
            localStorage.setItem(FS_KEY, JSON.stringify(fileSystem));
        } catch (e) {
            console.error("Failed to save file system to localStorage", e);
        }
    }

    function loadFileSystem() {
        try {
            const savedFS = localStorage.getItem(FS_KEY);
            if (savedFS) {
                fileSystem = JSON.parse(savedFS);
            } else {
                // Deep copy default FS
                fileSystem = JSON.parse(JSON.stringify(defaultFileSystem));
            }
        } catch (e) {
            console.error("Failed to load file system, resetting.", e);
            fileSystem = JSON.parse(JSON.stringify(defaultFileSystem));
        }
    }

    // Load content from hidden DOM divs
    const fileContentFromDOM = {
        'content-about.md': document.getElementById('content-about.md')?.innerText,
        'content-domains.js': document.getElementById('content-domains.js')?.innerText,
        'content-team.json': document.getElementById('content-team.json')?.innerText,
        'content-contact.css': document.getElementById('content-contact.css')?.innerText,
        'content-package': document.getElementById('content-package')?.innerText
    };
    
    // Helper to resolve paths
    function resolvePath(path) {
        if (!path) return currentDir;
        if (path.startsWith('~/')) return path;
        if (path.startsWith('/')) return '~' + path;

        let parts = currentDir.split('/');
        const pathParts = path.split('/');

        for (const part of pathParts) {
            if (part === '.' || part === '') continue;
            if (part === '..') {
                if (parts.length > 1) {
                    parts.pop();
                }
            } else {
                parts.push(part);
            }
        }
        
        let newPath = parts.join('/');
        return newPath === '' ? '~' : newPath;
    }

    if (terminalInput) {
        terminalInput.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                const command = terminalInput.value.trim();
                if (command) {
                    printToTerminal(`<span class="prompt">${terminalPrompt.textContent}</span> <span class="command">${command}</span>`);
                    commandHistory.push(command);
                    historyIndex = commandHistory.length;
                    evalCommand(command);
                }
                terminalInput.value = '';
                terminalInput.focus();
            } else if (e.key === 'ArrowUp') {
                e.preventDefault();
                if (historyIndex > 0) {
                    historyIndex--;
                    terminalInput.value = commandHistory[historyIndex];
                    terminalInput.setSelectionRange(terminalInput.value.length, terminalInput.value.length);
                }
            } else if (e.key === 'ArrowDown') {
                e.preventDefault();
                if (historyIndex < commandHistory.length - 1) {
                    historyIndex++;
                    terminalInput.value = commandHistory[historyIndex];
                    terminalInput.setSelectionRange(terminalInput.value.length, terminalInput.value.length);
                } else if (historyIndex === commandHistory.length - 1) {
                    historyIndex++;
                    terminalInput.value = '';
                }
            }
        });
    }

    function printToTerminal(text) {
        terminalOutput.innerHTML += text + '\n';
        terminalOutput.scrollTop = terminalOutput.scrollHeight;
    }

    function evalCommand(command) {
        const args = command.split(' ');
        const cmd = args[0].toLowerCase();
        args.shift();
        const output = (text) => printToTerminal(`<span class="response">${text}</span>`);

        switch (cmd) {
            case 'help':
                output('Available commands:\n' +
                       '  help           - Show this message\n' +
                       '  clear          - Clear the terminal\n' +
                       '  ls [path]      - List files in current or specified directory\n' +
                       '  cd [dir]       - Change directory\n' +
                       '  cat [file]     - Display file contents\n' +
                       '  pwd            - Print working directory\n' +
                       '  touch [file]   - Create a new empty file\n' +
                       '  mkdir [dir]    - Create a new directory\n' +
                       '  rm [file/dir]  - Remove a file or directory\n' +
                       '  resetfs        - Reset file system to default\n' +
                       '  theme <l|d>    - Change theme to (l)ight or (d)ark\n' +
                       '  neofetch       - Show browser/system info\n' +
                       '  whoami         - Display the current user\n' +
                       '  date           - Display the current date and time\n' +
                       '  echo           - Print text to the terminal\n' +
                       '  socials        - View ULICT social links\n' +
                       '  git            - View git status (Fake)');
                break;
            case 'clear':
                terminalOutput.innerHTML = '';
                break;
            case 'date':
                output(new Date().toLocaleString());
                break;
            case 'echo':
                output(args.join(' '));
                break;
            case 'socials':
                output('Find us at:\n' +
                       '  - Facebook:  facebook.com/ULICT\n' +
                       '  - GitHub:    github.com/ULICT\n' +
                       '  - Website:   ulict.org');
                break;
            case 'whoami':
                output('guest');
                break;
            case 'pwd':
                output(currentDir);
                break;
            case 'ls':
                const lsPath = resolvePath(args[0]);
                const dirNode = fileSystem[lsPath];
                if (dirNode && dirNode.type === 'dir') {
                    output(dirNode.children.join('   '));
                } else {
                    output(`ls: cannot access '${args[0] || '.'}': No such file or directory`);
                }
                break;
            case 'cd':
                const dir = args[0];
                if (!dir) {
                    currentDir = '~';
                } else {
                    const newDir = resolvePath(dir);
                    const newDirNode = fileSystem[newDir];
                    
                    if (newDirNode && newDirNode.type === 'dir') {
                        currentDir = newDir;
                    } else if (newDirNode && newDirNode.type === 'file') {
                        output(`cd: not a directory: ${dir}`);
                    } else {
                        output(`cd: no such file or directory: ${dir}`);
                    }
                }
                terminalPrompt.textContent = `ULICT@web:${currentDir}$`;
                break;
            case 'cat':
                const file = args[0];
                if (!file) break;
                
                const filePath = resolvePath(file);
                const fileNode = fileSystem[filePath];

                if (fileNode && fileNode.type === 'file') {
                    let content = "File is empty.";
                    if (fileNode.contentId) {
                        content = fileContentFromDOM[fileNode.contentId] || "Error: Could not read file.";
                    } else if (fileNode.staticContent) {
                        content = fileNode.staticContent;
                    }
                    const safeContent = content.replace(/</g, '&lt;').replace(/>/g, '&gt;');
                    output(safeContent);
                } else if (fileNode && fileNode.type === 'dir') {
                    output(`cat: ${file}: Is a directory`);
                } else {
                    output(`cat: ${file}: No such file or directory`);
                }
                break;
            case 'mkdir': {
                const newDirName = args[0];
                if (!newDirName) {
                    output('mkdir: missing operand');
                    break;
                }
                const newPath = resolvePath(newDirName);
                if (fileSystem[newPath]) {
                    output(`mkdir: cannot create directory ‘${newDirName}’: File exists`);
                } else {
                    fileSystem[newPath] = { type: 'dir', children: [] };
                    fileSystem[currentDir].children.push(newDirName);
                    saveFileSystem(); // Save changes
                }
                break;
            }
            case 'touch': {
                const newFileName = args[0];
                if (!newFileName) {
                    output('touch: missing file operand');
                    break;
                }
                const newPath = resolvePath(newFileName);
                if (!fileSystem[newPath]) {
                    fileSystem[newPath] = { type: 'file', staticContent: "" };
                    fileSystem[currentDir].children.push(newFileName);
                    saveFileSystem(); // Save changes
                }
                break;
            }
            case 'rm': {
                const itemToRemove = args[0];
                if (!itemToRemove) {
                    output('rm: missing operand');
                    break;
                }
                const itemPath = resolvePath(itemToRemove);
                if (!fileSystem[itemPath]) {
                    output(`rm: cannot remove '${itemToRemove}': No such file or directory`);
                } else {
                    delete fileSystem[itemPath];
                    const parentChildren = fileSystem[currentDir].children;
                    const index = parentChildren.indexOf(itemToRemove);
                    if (index > -1) {
                        parentChildren.splice(index, 1);
                    }
                    saveFileSystem(); // Save changes
                }
                break;
            }
            // NEW: Reset file system
            case 'resetfs': {
                fileSystem = JSON.parse(JSON.stringify(defaultFileSystem));
                saveFileSystem();
                currentDir = '~';
                terminalPrompt.textContent = `ULICT@web:${currentDir}$`;
                output('File system has been reset to default.');
                break;
            }
            // NEW: Theme toggle
            case 'theme': {
                const theme = args[0];
                if (theme === 'light' || theme === 'l') {
                    document.body.classList.add('light-theme');
                    output('Theme set to light.');
                } else if (theme === 'dark' || theme === 'd') {
                    document.body.classList.remove('light-theme');
                    output('Theme set to dark.');
                } else {
                    output('Usage: theme <light | dark>');
                }
                break;
            }
            case 'git':
                if (args[0] === 'status') {
                    output('On branch main\nYour branch is up to date with \'origin/main\'.\n\nnothing to commit, working tree clean');
                } else {
                    output('Usage: git status');
                }
                break;
            // NEW: Updated neofetch
            case 'neofetch':
                const ua = navigator.userAgent;
                let os = "Unknown OS";
                if (ua.indexOf("Win") != -1) os = "Windows";
                if (ua.indexOf("Mac") != -1) os = "MacOS";
                if (ua.indexOf("Linux") != -1) os = "Linux";
                if (ua.indexOf("Android") != -1) os = "Android";
                if (ua.indexOf("like Mac") != -1) os = "iOS"; // For iPad/iPhone

                const cores = navigator.hardwareConcurrency ? `${navigator.hardwareConcurrency} Cores` : 'N/A';
                const mem = navigator.deviceMemory ? `~${navigator.deviceMemory}GB` : 'N/A';
                const res = `${window.screen.width}x${window.screen.height}`;
                
                output(
`                  iiiiiii
      ------------- <b>guest@ulict.web</b>
      iiiiiii       <b>OS:</b>       ${os} (via UserAgent)
   iiiiiiiiiiii     <b>Host:</b>     ${navigator.vendor}
   iiiiiiiiiiii     <b>Kernel:</b>   ${navigator.platform}
   iiiiiiiiiiii     <b>Uptime:</b>   (since page load)
   iiiiiiiiiiii     <b>Shell:</b>    web-bash v6.0
      iiiiiii       <b>Resolution:</b> ${res}
      iiiiiii       <b>CPU:</b>      Browser (${cores})
                  <b>Memory:</b>   ${mem}
                  <b>Language:</b> ${navigator.language}`
                );
                break;
            default:
                output(`bash: command not found: ${cmd}`);
        }
    }

    // Initial load
    loadFileSystem();
    
    /* ------------------------------ */
    /* 7. Live Clock in Status Bar */
    /* ------------------------------ */
    const timeElement = document.getElementById('current-time');
    function updateClock() {
        if (!timeElement) return;
        const now = new Date();
        const timeString = now.toLocaleTimeString([], { hour12: true });
        timeElement.textContent = timeString;
    }
    setInterval(updateClock, 1000);
    updateClock();

    /* ------------------------------ */
    /* 8. Resizable Panel & Debug Demo */
    /* ------------------------------ */
    const resizeHandle = document.getElementById('panel-resize-handle');
    
    if (resizeHandle) {
        resizeHandle.addEventListener('mousedown', (e) => {
            e.preventDefault();
            document.addEventListener('mousemove', handleMouseMove);
            document.addEventListener('mouseup', handleMouseUp);
        });

        function handleMouseMove(e) {
            const newHeight = window.innerHeight - e.clientY - document.querySelector('.status-bar').offsetHeight;
            const minHeight = 40; // Height of panel header
            const maxHeight = window.innerHeight * 0.8;

            if (newHeight > minHeight && newHeight < maxHeight) {
                bottomPanel.style.height = `${newHeight}px`;
            }
        }

        function handleMouseUp() {
            document.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseup', handleMouseUp);
        }
    }
    
    const startDebugBtn = document.getElementById('start-debugging-btn');
    const debugOutput = document.getElementById('debug-output');
    
    if (startDebugBtn && debugOutput) {
        startDebugBtn.addEventListener('click', () => {
            switchPanelTab('panel-debug');
            
            if (bottomPanel.classList.contains('collapsed')) {
                toggleBottomPanel();
            }
            
            debugOutput.innerHTML = 'Starting debug session...\n';
            setTimeout(() => { debugOutput.innerHTML += 'Debugger attached.\n'; }, 500);
            setTimeout(() => { debugOutput.innerHTML += 'Mapping ports...\n'; }, 1000);
            setTimeout(() => { debugOutput.innerHTML += 'Application running at http://localhost:3000\n'; }, 1500);
            setTimeout(() => { debugOutput.innerHTML += 'Debug session finished.\n'; }, 3000);
        });
    }

});