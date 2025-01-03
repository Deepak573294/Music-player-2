// Authentication module
export function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

export function handleLogin(event) {
    event.preventDefault();
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;

    if (!validateEmail(email)) {
        alert('Please enter a valid email address');
        return false;
    }

    if (password.length < 6) {
        alert('Password must be at least 6 characters long');
        return false;
    }

    // Show music player
    toggleForms('player');
    return false;
}

export function handleRegister(event) {
    event.preventDefault();
    const name = document.getElementById('registerName').value;
    const email = document.getElementById('registerEmail').value;
    const password = document.getElementById('registerPassword').value;

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

    alert('Registration successful! Please login.');
    toggleForms('login');
    return false;
}

export function toggleForms(show) {
    const loginForm = document.getElementById('loginForm');
    const registerForm = document.getElementById('registerForm');
    const musicPlayer = document.getElementById('musicPlayer');

    if (!loginForm || !registerForm || !musicPlayer) {
        console.error('Required elements not found');
        return;
    }

    loginForm.classList.add('d-none');
    registerForm.classList.add('d-none');
    musicPlayer.classList.add('d-none');

    switch (show) {
        case 'login':
            loginForm.classList.remove('d-none');
            break;
        case 'register':
            registerForm.classList.remove('d-none');
            break;
        case 'player':
            musicPlayer.classList.remove('d-none');
            break;
    }
}