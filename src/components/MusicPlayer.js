import React, { useState, useEffect, useRef } from 'react';
import './MusicPlayer.css';

const MusicPlayer = ({ songs, currentSongIndex, isPlaying, onPlayPause, onNext, onPrevious, onSongSelect }) => {
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const [isShuffled, setIsShuffled] = useState(false);
  const [repeatMode, setRepeatMode] = useState('none'); // none, one, all
  const audioRef = useRef(null);

  const currentSong = songs[currentSongIndex];

  useEffect(() => {
    const audio = audioRef.current;
    
    const updateTime = () => {
      if (audio) {
        setProgress(audio.currentTime);
      }
    };

    const updateDuration = () => {
      if (audio) {
        setDuration(audio.duration);
      }
    };

    const handleEnded = () => {
      if (repeatMode === 'one') {
        audio.currentTime = 0;
        audio.play();
      } else if (repeatMode === 'all' || isShuffled) {
        onNext();
      } else if (currentSongIndex < songs.length - 1) {
        onNext();
      } else {
        onPlayPause(); // Stop at the end
      }
    };

    if (audio) {
      audio.addEventListener('timeupdate', updateTime);
      audio.addEventListener('loadedmetadata', updateDuration);
      audio.addEventListener('ended', handleEnded);
      
      return () => {
        audio.removeEventListener('timeupdate', updateTime);
        audio.removeEventListener('loadedmetadata', updateDuration);
        audio.removeEventListener('ended', handleEnded);
      };
    }
  }, [currentSongIndex, repeatMode, isShuffled, onNext, onPlayPause, currentSongIndex, songs.length]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = isMuted ? 0 : volume;
    }
  }, [volume, isMuted]);

  const handleProgressChange = (e) => {
    const audio = audioRef.current;
    if (audio) {
      audio.currentTime = e.target.value;
      setProgress(e.target.value);
    }
  };

  const handleVolumeChange = (e) => {
    const newVolume = e.target.value;
    setVolume(newVolume);
    setIsMuted(false);
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  const toggleShuffle = () => {
    setIsShuffled(!isShuffled);
  };

  const toggleRepeat = () => {
    const modes = ['none', 'one', 'all'];
    const currentIndex = modes.indexOf(repeatMode);
    setRepeatMode(modes[(currentIndex + 1) % modes.length]);
  };

  const formatTime = (time) => {
    if (!time || isNaN(time)) return '0:00';
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const getRepeatIcon = () => {
    switch (repeatMode) {
      case 'one':
        return 'fa-repeat-1';
      case 'all':
        return 'fa-repeat';
      default:
        return 'fa-repeat';
    }
  };

  return (
    <div className="music-player">
      <audio
        ref={audioRef}
        src={currentSong?.song}
        onPlay={() => onPlayPause(true)}
        onPause={() => onPlayPause(false)}
      />
      
      <div className="player-info">
        <div className="song-art" style={{ backgroundImage: `url(${currentSong?.img})` }}></div>
        <div className="song-details">
          <h3>{currentSong?.name}</h3>
          <p>{currentSong?.artist}</p>
        </div>
      </div>

      <div className="player-controls-main">
        <div className="progress-container">
          <span className="time">{formatTime(progress)}</span>
          <input
            type="range"
            min="0"
            max={duration || 0}
            value={progress}
            onChange={handleProgressChange}
            className="progress-bar"
            style={{
              background: `linear-gradient(to right, #4ecdc4 0%, #4ecdc4 ${(progress / duration) * 100}%, #333 ${(progress / duration) * 100}%, #333 100%)`
            }}
          />
          <span className="time">{formatTime(duration)}</span>
        </div>

        <div className="control-buttons">
          <button 
            className={`control-btn ${isShuffled ? 'active' : ''}`}
            onClick={toggleShuffle}
            title="Shuffle"
          >
            <i className="fas fa-shuffle"></i>
          </button>
          
          <button className="control-btn" onClick={onPrevious}>
            <i className="fas fa-backward"></i>
          </button>
          
          <button className="control-btn play-btn" onClick={() => onPlayPause(!isPlaying)}>
            <i className={`fas ${isPlaying ? 'fa-pause' : 'fa-play'}`}></i>
          </button>
          
          <button className="control-btn" onClick={onNext}>
            <i className="fas fa-forward"></i>
          </button>
          
          <button 
            className={`control-btn ${repeatMode !== 'none' ? 'active' : ''}`}
            onClick={toggleRepeat}
            title="Repeat"
          >
            <i className={`fas ${getRepeatIcon()}`}></i>
          </button>
        </div>
      </div>

      <div className="volume-controls">
        <button className="volume-btn" onClick={toggleMute}>
          <i className={`fas ${isMuted || volume === 0 ? 'fa-volume-mute' : volume < 0.5 ? 'fa-volume-down' : 'fa-volume-up'}`}></i>
        </button>
        <input
          type="range"
          min="0"
          max="1"
          step="0.01"
          value={isMuted ? 0 : volume}
          onChange={handleVolumeChange}
          className="volume-bar"
          style={{
            background: `linear-gradient(to right, #4ecdc4 0%, #4ecdc4 ${(isMuted ? 0 : volume) * 100}%, #333 ${(isMuted ? 0 : volume) * 100}%, #333 100%)`
          }}
        />
      </div>
    </div>
  );
};

export default MusicPlayer;
