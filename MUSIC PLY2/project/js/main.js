import { handleLogin, handleRegister, toggleForms } from './auth.js';
import { initializePlayer } from './player.js';

// Make auth functions available globally
window.handleLogin = handleLogin;
window.handleRegister = handleRegister;

// Initialize all event listeners
function initializeApp() {
    // Form toggle links
    document.querySelectorAll('[data-form]').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            toggleForms(e.target.dataset.form);
        });
    });

    // Initialize music player
    initializePlayer();

    // Show initial login form
    toggleForms('login');
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', initializeApp);