// Player service for audio management
import { formatTime } from '../utils/formatters.js';

class PlayerService {
    constructor() {
        this.audio = new Audio();
        this.playlist = [];
        this.currentTrackIndex = 0;
    }

    play() {
        return this.audio.play();
    }

    pause() {
        this.audio.pause();
    }

    setTrack(url) {
        this.audio.src = url;
        this.audio.load();
    }

    setVolume(value) {
        this.audio.volume = Math.max(0, Math.min(1, value));
    }

    getCurrentTime() {
        return formatTime(this.audio.currentTime);
    }

    getDuration() {
        return formatTime(this.audio.duration);
    }
}

export const playerService = new PlayerService();