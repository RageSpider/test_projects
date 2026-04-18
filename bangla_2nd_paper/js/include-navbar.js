// js/include-navbar.js
document.addEventListener("DOMContentLoaded", () => {
    fetch('/components/navbar.html')
        .then(response => {
            if (!response.ok) throw new Error('Failed to load navbar');
            return response.text();
        })
        .then(data => {
            document.getElementById('navbar-placeholder').innerHTML = data;
            // Dispatch event to initialize navbar scripts
            document.dispatchEvent(new Event('navbarLoaded'));
        })
        .catch(error => {
            console.error('Error loading navbar:', error);
            document.getElementById('navbar-placeholder').innerHTML = '<p style="text-align:center; padding: 20px; color: red;">Failed to load navigation. Are you running a local server?</p>';
        });
});