// User Management
function toggleForms(show) {
    const loginForm = document.getElementById('loginForm');
    const registerForm = document.getElementById('registerForm');
    const musicPlayer = document.getElementById('musicPlayer');

    if (show === 'login') {
        loginForm.classList.remove('d-none');
        registerForm.classList.add('d-none');
        musicPlayer.classList.add('d-none');
    } else if (show === 'register') {
        loginForm.classList.add('d-none');
        registerForm.classList.remove('d-none');
        musicPlayer.classList.add('d-none');
    } else if (show === 'player') {
        loginForm.classList.add('d-none');
        registerForm.classList.add('d-none');
        musicPlayer.classList.remove('d-none');
    }
}

function handleLogin(event) {
    event.preventDefault();
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;

    // Basic validation
    if (!validateEmail(email)) {
        alert('Please enter a valid email address');
        return false;
    }

    if (password.length < 6) {
        alert('Password must be at least 6 characters long');
        return false;
    }

    // In a real application, you would make an API call here
    // For demo purposes, we'll just show the music player
    toggleForms('player');
    return false;
}

function handleRegister(event) {
    event.preventDefault();
    const name = document.getElementById('registerName').value;
    const email = document.getElementById('registerEmail').value;
    const password = document.getElementById('registerPassword').value;

    // Basic validation
    if (name.length < 2) {
        alert('Please enter your full name');
        return false;
    }

    if (!validateEmail(email)) {
        alert('Please enter a valid email address');
        return false;
    }

    if (password.length < 6) {
        alert('Password must be at least 6 characters long');
        return false;
    }

    // In a real application, you would make an API call here
    // For demo purposes, we'll just show the login form
    alert('Registration successful! Please login.');
    toggleForms('login');
    return false;
}

function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

// Music Player Controls
let isPlaying = false;

document.querySelector('.btn-play').addEventListener('click', function() {
    const icon = this.querySelector('i');
    if (isPlaying) {
        icon.classList.remove('fa-pause');
        icon.classList.add('fa-play');
    } else {
        icon.classList.remove('fa-play');
        icon.classList.add('fa-pause');
    }
    isPlaying = !isPlaying;
});

// Initialize the player
document.addEventListener('DOMContentLoaded', function() {
    // For demo purposes, we'll start with the login form
    toggleForms('login');
});