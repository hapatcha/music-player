// Java Servlet/JSP Music Player JavaScript
class MusicPlayer {
    constructor() {
        this.songs = [];
        this.artists = [];
        this.currentSongIndex = 0;
        this.isPlaying = false;
        this.currentArtist = null;
        
        this.initializeElements();
        this.bindEvents();
        this.loadData();
    }
    
    initializeElements() {
        // Audio elements
        this.audioPlayer = document.getElementById('songPlayer');
        this.progressBar = document.getElementById('progress');
        this.currentTimeEl = document.getElementById('currentTime');
        this.durationEl = document.getElementById('duration');
        
        // Control buttons
        this.playPauseBtn = document.getElementById('playPauseBtn');
        this.prevBtn = document.getElementById('prevBtn');
        this.nextBtn = document.getElementById('nextBtn');
        this.homeBtn = document.getElementById('homeBtn');
        
        // Display elements
        this.songArt = document.getElementById('songArt');
        this.songNameEl = document.getElementById('songName');
        this.artistNameEl = document.getElementById('artistName');
        this.artistArt = document.getElementById('artistArt');
        this.currentArtistNameEl = document.getElementById('currentArtistName');
        this.artistDescriptionEl = document.getElementById('artistDescription');
        
        // List elements
        this.playlist = document.getElementById('playlist');
        this.artistList = document.getElementById('artistList');
        
        // Search
        this.searchBar = document.getElementById('searchBar');
        
        // Loading modal
        this.loadingModal = document.getElementById('loadingModal');
    }
    
    bindEvents() {
        // Control events
        this.playPauseBtn.addEventListener('click', () => this.togglePlayPause());
        this.prevBtn.addEventListener('click', () => this.playPreviousSong());
        this.nextBtn.addEventListener('click', () => this.playNextSong());
        this.homeBtn.addEventListener('click', () => this.resetToAllSongs());
        
        // Audio events
        this.audioPlayer.addEventListener('timeupdate', () => this.updateProgress());
        this.audioPlayer.addEventListener('loadedmetadata', () => this.updateDuration());
        this.audioPlayer.addEventListener('ended', () => this.playNextSong());
        
        // Progress bar
        this.progressBar.addEventListener('input', (e) => this.seekTo(e.target.value));
        
        // Search
        this.searchBar.addEventListener('input', (e) => this.handleSearch(e.target.value));
    }
    
    async loadData() {
        this.showLoading(true);
        try {
            // Load songs and artists in parallel
            const [songsResponse, artistsResponse] = await Promise.all([
                fetch('api/songs'),
                fetch('api/artists')
            ]);
            
            if (!songsResponse.ok || !artistsResponse.ok) {
                throw new Error('Failed to load data');
            }
            
            this.songs = await songsResponse.json();
            this.artists = await artistsResponse.json();
            
            this.renderArtists();
            this.renderPlaylist(this.songs);
            this.playSong(0);
            
        } catch (error) {
            console.error('Error loading data:', error);
            this.showError('Failed to load music library');
        } finally {
            this.showLoading(false);
        }
    }
    
    renderArtists() {
        this.artistList.innerHTML = '';
        this.artists.forEach(artist => {
            const li = document.createElement('li');
            li.innerHTML = `<img src="${artist.img}" alt="${artist.name}" title="${artist.name}">`;
            li.addEventListener('click', () => this.filterByArtist(artist.name));
            this.artistList.appendChild(li);
        });
    }
    
    renderPlaylist(songsToRender) {
        this.playlist.innerHTML = '';
        songsToRender.forEach((song, displayIndex) => {
            const originalIndex = this.songs.indexOf(song);
            const songItem = document.createElement('div');
            songItem.className = 'song-item';
            songItem.innerHTML = `
                <h3>${displayIndex + 1} ${song.name}</h3>
                <p>${song.artist}</p>
            `;
            songItem.addEventListener('click', () => this.playSong(originalIndex));
            this.playlist.appendChild(songItem);
        });
    }
    
    async playSong(index) {
        if (index < 0 || index >= this.songs.length) return;
        
        this.currentSongIndex = index;
        const song = this.songs[index];
        
        // Update audio source
        this.audioPlayer.src = song.songPath;
        
        // Update UI
        this.updateSongDisplay(song);
        await this.updateArtistDisplay(song.artist);
        
        // Play the song
        try {
            await this.audioPlayer.play();
            this.isPlaying = true;
            this.updatePlayButton();
            this.songArt.classList.add('playing');
        } catch (error) {
            console.error('Error playing song:', error);
            this.showError('Failed to play song');
        }
    }
    
    updateSongDisplay(song) {
        this.songNameEl.textContent = song.name;
        this.artistNameEl.textContent = song.artist;
        
        if (song.img) {
            this.songArt.style.backgroundImage = `url(${song.img})`;
        } else {
            this.songArt.style.backgroundImage = 'url(default-album.jpg)';
        }
    }
    
    async updateArtistDisplay(artistName) {
        try {
            const response = await fetch(`api/artist?name=${encodeURIComponent(artistName)}`);
            if (response.ok) {
                const artist = await response.json();
                this.currentArtist = artist;
                this.currentArtistNameEl.textContent = artist.name;
                this.artistDescriptionEl.textContent = artist.description;
                
                if (artist.img) {
                    this.artistArt.style.backgroundImage = `url(${artist.img})`;
                } else {
                    this.artistArt.style.backgroundImage = 'url(default-artist.jpg)';
                }
            }
        } catch (error) {
            console.error('Error loading artist:', error);
        }
    }
    
    togglePlayPause() {
        if (this.isPlaying) {
            this.audioPlayer.pause();
            this.isPlaying = false;
            this.songArt.classList.remove('playing');
        } else {
            this.audioPlayer.play();
            this.isPlaying = true;
            this.songArt.classList.add('playing');
        }
        this.updatePlayButton();
    }
    
    updatePlayButton() {
        const icon = this.playPauseBtn.querySelector('i');
        if (this.isPlaying) {
            icon.className = 'fas fa-pause';
        } else {
            icon.className = 'fas fa-play';
        }
    }
    
    playNextSong() {
        const nextIndex = (this.currentSongIndex + 1) % this.songs.length;
        this.playSong(nextIndex);
    }
    
    playPreviousSong() {
        const prevIndex = this.currentSongIndex === 0 ? 
            this.songs.length - 1 : this.currentSongIndex - 1;
        this.playSong(prevIndex);
    }
    
    updateProgress() {
        const progress = (this.audioPlayer.currentTime / this.audioPlayer.duration) * 100;
        this.progressBar.value = progress;
        this.currentTimeEl.textContent = this.formatTime(this.audioPlayer.currentTime);
        
        // Update progress bar background
        this.progressBar.style.background = `linear-gradient(to right, #4ecdc4 0%, #4ecdc4 ${progress}%, #333 ${progress}%, #333 100%)`;
    }
    
    updateDuration() {
        this.durationEl.textContent = this.formatTime(this.audioPlayer.duration);
        this.progressBar.max = 100;
    }
    
    seekTo(value) {
        const time = (value / 100) * this.audioPlayer.duration;
        this.audioPlayer.currentTime = time;
    }
    
    formatTime(seconds) {
        if (!seconds || isNaN(seconds)) return '0:00';
        const minutes = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return `${minutes}:${secs.toString().padStart(2, '0')}`;
    }
    
    async handleSearch(query) {
        if (!query.trim()) {
            this.renderPlaylist(this.songs);
            return;
        }
        
        try {
            const response = await fetch(`api/search?q=${encodeURIComponent(query)}`);
            if (response.ok) {
                const results = await response.json();
                this.renderPlaylist(results);
            }
        } catch (error) {
            console.error('Error searching:', error);
        }
    }
    
    async filterByArtist(artistName) {
        try {
            const response = await fetch(`api/songs?artist=${encodeURIComponent(artistName)}`);
            if (response.ok) {
                const songs = await response.json();
                this.renderPlaylist(songs);
                
                // Update search bar to show filter
                this.searchBar.value = `Artist: ${artistName}`;
            }
        } catch (error) {
            console.error('Error filtering by artist:', error);
        }
    }
    
    resetToAllSongs() {
        this.searchBar.value = '';
        this.renderPlaylist(this.songs);
    }
    
    showLoading(show) {
        if (show) {
            this.loadingModal.classList.add('active');
        } else {
            this.loadingModal.classList.remove('active');
        }
    }
    
    showError(message) {
        // Create a temporary error message
        const errorDiv = document.createElement('div');
        errorDiv.className = 'jsp-error';
        errorDiv.textContent = message;
        errorDiv.style.position = 'fixed';
        errorDiv.style.top = '20px';
        errorDiv.style.right = '20px';
        errorDiv.style.zIndex = '1001';
        errorDiv.style.maxWidth = '300px';
        
        document.body.appendChild(errorDiv);
        
        // Remove after 3 seconds
        setTimeout(() => {
            if (errorDiv.parentNode) {
                errorDiv.parentNode.removeChild(errorDiv);
            }
        }, 3000);
    }
}

// Initialize the music player when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.musicPlayer = new MusicPlayer();
    
    // Add keyboard shortcuts
    document.addEventListener('keydown', (e) => {
        switch(e.code) {
            case 'Space':
                e.preventDefault();
                window.musicPlayer.togglePlayPause();
                break;
            case 'ArrowRight':
                window.musicPlayer.playNextSong();
                break;
            case 'ArrowLeft':
                window.musicPlayer.playPreviousSong();
                break;
            case 'ArrowUp':
                e.preventDefault();
                window.musicPlayer.audioPlayer.volume = Math.min(1, window.musicPlayer.audioPlayer.volume + 0.1);
                break;
            case 'ArrowDown':
                e.preventDefault();
                window.musicPlayer.audioPlayer.volume = Math.max(0, window.musicPlayer.audioPlayer.volume - 0.1);
                break;
        }
    });
    
    // Add touch gestures for mobile
    let touchStartX = 0;
    let touchStartY = 0;
    
    document.addEventListener('touchstart', (e) => {
        touchStartX = e.touches[0].clientX;
        touchStartY = e.touches[0].clientY;
    });
    
    document.addEventListener('touchend', (e) => {
        const touchEndX = e.changedTouches[0].clientX;
        const touchEndY = e.changedTouches[0].clientY;
        const deltaX = touchEndX - touchStartX;
        const deltaY = touchEndY - touchStartY;
        
        // Horizontal swipe - next/previous song
        if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > 50) {
            if (deltaX > 0) {
                window.musicPlayer.playNextSong();
            } else {
                window.musicPlayer.playPreviousSong();
            }
        }
    });
});
