// Audio player state
let audio = new Audio();
let playlist = [];
let currentTrackIndex = 0;

export function initializePlayer() {
    setupFileInput();
    setupPlaylistModal();
    setupPlayerControls();
    setupVolumeControl();
    setupLogout();
}

function setupFileInput() {
    const fileInput = document.getElementById('fileInput');
    if (!fileInput) return;

    fileInput.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const fileURL = URL.createObjectURL(file);
        addToPlaylist({
            title: file.name.replace(/\.[^/.]+$/, ""),
            artist: 'Local File',
            url: fileURL,
            artwork: 'https://placehold.co/300x300'
        });
    });
}

function setupPlaylistModal() {
    const playlistBtn = document.getElementById('playlistBtn');
    if (!playlistBtn) return;

    playlistBtn.addEventListener('click', () => {
        const modal = new bootstrap.Modal(document.getElementById('playlistModal'));
        updatePlaylistUI();
        modal.show();
    });
}

function setupPlayerControls() {
    const playBtn = document.getElementById('playBtn');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const progressBar = document.querySelector('.progress-bar');
    const progress = document.querySelector('.progress');

    if (playBtn) {
        playBtn.addEventListener('click', togglePlay);
    }

    if (prevBtn) {
        prevBtn.addEventListener('click', playPrevious);
    }

    if (nextBtn) {
        nextBtn.addEventListener('click', playNext);
    }

    if (progress) {
        progress.addEventListener('click', (e) => {
            const rect = progress.getBoundingClientRect();
            const percent = (e.clientX - rect.left) / rect.width;
            audio.currentTime = percent * audio.duration;
        });
    }

    // Update progress bar
    audio.addEventListener('timeupdate', () => {
        if (progressBar) {
            const progress = (audio.currentTime / audio.duration) * 100;
            progressBar.style.width = `${progress}%`;
            updateTimeDisplay();
        }
    });

    // Handle track end
    audio.addEventListener('ended', playNext);
}

function setupVolumeControl() {
    const volumeSlider = document.getElementById('volumeSlider');
    const volumeBtn = document.getElementById('volumeBtn');

    if (volumeSlider) {
        volumeSlider.addEventListener('input', (e) => {
            const volume = e.target.value / 100;
            audio.volume = volume;
            updateVolumeIcon(volume);
        });
    }

    if (volumeBtn) {
        volumeBtn.addEventListener('click', toggleMute);
    }
}

function setupLogout() {
    const logoutBtn = document.getElementById('logoutBtn');
    if (!logoutBtn) return;

    logoutBtn.addEventListener('click', () => {
        audio.pause();
        playlist = [];
        currentTrackIndex = 0;
        import('./auth.js').then(auth => auth.toggleForms('login'));
    });
}

// Playlist Management
function addToPlaylist(track) {
    playlist.push(track);
    if (playlist.length === 1) {
        loadTrack(0);
    }
    updatePlaylistUI();
}

function updatePlaylistUI() {
    const playlistItems = document.getElementById('playlistItems');
    if (!playlistItems) return;

    playlistItems.innerHTML = playlist.map((track, index) => `
        <li class="list-group-item bg-dark text-light d-flex justify-content-between align-items-center ${index === currentTrackIndex ? 'active' : ''}"
            onclick="playTrack(${index})">
            ${track.title} - ${track.artist}
            <button class="btn btn-sm btn-danger" onclick="removeFromPlaylist(${index})">
                <i class="fas fa-trash"></i>
            </button>
        </li>
    `).join('');
}

// Playback Controls
function togglePlay() {
    if (audio.paused) {
        audio.play();
        updatePlayButton(true);
    } else {
        audio.pause();
        updatePlayButton(false);
    }
}

function playPrevious() {
    if (currentTrackIndex > 0) {
        loadTrack(currentTrackIndex - 1);
    }
}

function playNext() {
    if (currentTrackIndex < playlist.length - 1) {
        loadTrack(currentTrackIndex + 1);
    }
}

function loadTrack(index) {
    if (index < 0 || index >= playlist.length) return;

    currentTrackIndex = index;
    const track = playlist[index];
    
    audio.src = track.url;
    audio.load();
    audio.play();
    
    updateTrackInfo(track);
    updatePlayButton(true);
    updatePlaylistUI();
}

// UI Updates
function updateTrackInfo(track) {
    const albumArt = document.getElementById('albumArt');
    const songTitle = document.getElementById('songTitle');
    const artistName = document.getElementById('artistName');

    if (albumArt) albumArt.src = track.artwork;
    if (songTitle) songTitle.textContent = track.title;
    if (artistName) artistName.textContent = track.artist;
}

function updatePlayButton(isPlaying) {
    const playBtn = document.getElementById('playBtn');
    if (!playBtn) return;

    const icon = playBtn.querySelector('i');
    if (!icon) return;

    icon.className = isPlaying ? 'fas fa-pause' : 'fas fa-play';
}

function updateTimeDisplay() {
    const currentTime = document.querySelector('.current-time');
    const duration = document.querySelector('.duration');

    if (currentTime) {
        currentTime.textContent = formatTime(audio.currentTime);
    }
    if (duration) {
        duration.textContent = formatTime(audio.duration);
    }
}

// Volume Controls
function updateVolumeIcon(volume) {
    const volumeBtn = document.getElementById('volumeBtn');
    if (!volumeBtn) return;

    const icon = volumeBtn.querySelector('i');
    if (!icon) return;

    icon.className = volume === 0 ? 'fas fa-volume-mute' :
                    volume < 0.5 ? 'fas fa-volume-down' :
                    'fas fa-volume-up';
}

function toggleMute() {
    const volumeSlider = document.getElementById('volumeSlider');
    if (!volumeSlider) return;

    if (audio.volume > 0) {
        audio.volume = 0;
        volumeSlider.value = 0;
    } else {
        audio.volume = 1;
        volumeSlider.value = 100;
    }
    updateVolumeIcon(audio.volume);
}

// Utility Functions
function formatTime(seconds) {
    if (isNaN(seconds)) return '0:00';
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
}