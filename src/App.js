import React, { useState, useEffect, useRef } from 'react';
import './App.css';

const artists = [
  {
    name: "El Castro",
    img: "elcastro.jpg",
    description: ""
  },
  {
    name: "XIIVI",
    img: "xiivi.jpg",
    description: ""
  },
  {
    name: "ALA",
    img: "ala.jpg",
    description: "If there is any gap between North African rap and US-influenced trap and hip-hop culture, Tunisia's A.L.A « Ala Ferchichi (Arabic: علاء فرشيشي) » straddles it with ease. Taking a familiar flow and spitting Arabic-language rhymes-with a sprinkling of English—his sound has truly international appeal. As a member of the Zomra collective, a group of peers dedicated to promoting Tunisian rap"
  },
  {
    name: "Ktybon",
    img: "ktybon.jpg",
    description: ""
  },
  {
    name: "Emp1re",
    img: "emp1re.jpg",
    description: ""
  }
];

const songs = [
  {
    name: "9k32",
    artist: "XIIVI",
    img: "9k32.png",
    song: "songs/9k32.mp3"
  },
  {
    name: "555",
    artist: "Kiev,XIIVI",
    img: "555.webp",
    song: "songs/555 (feat. XIIVI).mp3"
  },
  {
    name: "Terro Flow",
    artist: "Omara,20fyee,XIIVI",
    img: "tf.webp",
    song: "songs/Terro Flow.mp3"
  },
  {
    name: "سحار",
    artist: "El Castro",
    img: "",
    song: "songs/El Castro  - Intro  سحار.mp3"
  },
  {
    name: "Back To Black",
    artist: "El Castro",
    img: "",
    song: "songs/El Castro - Back To Black  مرمة (Original Version).mp3"
  },
  {
    name: "lil baby",
    artist: "El Castro",
    img: "",
    song: "songs/El Castro - lil baby.mp3"
  },
  {
    name: "Man7ebch",
    artist: "El Castro",
    img: "",
    song: "songs/El Castro - Man7ebch.mp3"
  },
  {
    name: "Rimi",
    artist: "El Castro",
    img: "",
    song: "songs/El Castro - Rimi ريمي (Audio).mp3"
  },
  {
    name: "AADHEBI",
    artist: "ALA",
    img: "adhebi.jpg",
    song: "songs/A.L.A - AADHEBI (Official Music Video).mp3"
  },
  {
    name: "NJOUMI",
    artist: "ALA",
    img: "njoumi.jpg",
    song: "songs/A.L.A - NJOUMI ( NEW TRACK OUT SOON ).mp3"
  },
  {
    name: "INLU",
    artist: "ALA",
    img: "ala stou.jpg",
    song: "songs/A.L.A Feat Stou - INLU (Official Music Video).mp3"
  },
  {
    name: "AARAP",
    artist: "Emp1re",
    img: "aarap.jpg",
    song: "songs/EMP1RE - AARAP (Official Music Video).mp3"
  },
  {
    name: "BLA BLA BLA",
    artist: "Emp1re",
    img: "BLA BLA BLA.jpg",
    song: "songs/EMP1RE - BLA BLA BLA (Official Music Video).mp3"
  },
  {
    name: "HITCHCOCK",
    artist: "Emp1re",
    img: "HITCHCOCK.jpg",
    song: "songs/EMP1RE - HITCHCOCK.mp3"
  },
  {
    name: "NES TESTANA",
    artist: "Emp1re",
    img: "NES TESTANA.jpg",
    song: "songs/EMP1RE - NES TESTANA.mp3"
  },
  {
    name: "TAWA BDIT",
    artist: "Emp1re",
    img: "TAWA BDIT.jpg",
    song: "songs/EMP1RE - TAWA BDIT.mp3"
  },
  {
    name: "eb7ath 3ani",
    artist: "Ktybon",
    img: "eb7ath 3ani.jpg",
    song: "songs/KATYBON - eb7ath 3ani.mp3"
  },
  {
    name: "INFRARED",
    artist: "Ktybon",
    img: "INFRARED.jpg",
    song: "songs/KTYB - INFRARED.mp3"
  },
  {
    name: "SNIN DEYMA",
    artist: "Ktybon",
    img: "SNIN DEYMA.jpg",
    song: "songs/KTYB - SNIN DEYMA (Clean Version).mp3"
  }
];

function App() {
  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredSongs, setFilteredSongs] = useState(songs);
  const [selectedArtist, setSelectedArtist] = useState(null);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [currentArtist, setCurrentArtist] = useState(artists[0]);
  
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

    if (audio) {
      audio.addEventListener('timeupdate', updateTime);
      audio.addEventListener('loadedmetadata', updateDuration);
      
      return () => {
        audio.removeEventListener('timeupdate', updateTime);
        audio.removeEventListener('loadedmetadata', updateDuration);
      };
    }
  }, [currentSongIndex]);

  useEffect(() => {
    if (searchQuery) {
      const filtered = songs.filter(song => 
        song.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        song.artist.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredSongs(filtered);
    } else {
      setFilteredSongs(selectedArtist ? 
        songs.filter(song => song.artist.includes(selectedArtist)) : 
        songs
      );
    }
  }, [searchQuery, selectedArtist]);

  const getArtistInfo = (artistName) => {
    return artists.find(artist => artistName.includes(artist.name)) || artists[0];
  };

  useEffect(() => {
    const artist = getArtistInfo(currentSong.artist);
    setCurrentArtist(artist);
  }, [currentSongIndex]);

  const playSong = (index) => {
    setCurrentSongIndex(index);
    setIsPlaying(true);
    setTimeout(() => {
      if (audioRef.current) {
        audioRef.current.play();
      }
    }, 100);
  };

  const togglePlayPause = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else {
      audio.play();
      setIsPlaying(true);
    }
  };

  const nextSong = () => {
    const nextIndex = (currentSongIndex + 1) % songs.length;
    playSong(nextIndex);
  };

  const previousSong = () => {
    const prevIndex = currentSongIndex === 0 ? songs.length - 1 : currentSongIndex - 1;
    playSong(prevIndex);
  };

  const handleProgressChange = (e) => {
    const audio = audioRef.current;
    if (audio) {
      audio.currentTime = e.target.value;
      setProgress(e.target.value);
    }
  };

  const filterByArtist = (artistName) => {
    setSelectedArtist(artistName);
    setSearchQuery('');
    const filtered = songs.filter(song => song.artist.includes(artistName));
    setFilteredSongs(filtered);
  };

  const resetFilter = () => {
    setSelectedArtist(null);
    setSearchQuery('');
    setFilteredSongs(songs);
  };

  const formatTime = (time) => {
    if (!time || isNaN(time)) return '0:00';
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className="container">
      <header>
        <h1>MAAMOUNify</h1>
        <div className="pp">
          <button className="home-btn" onClick={resetFilter}>
            <i className="fas fa-home"></i>
          </button>
          <input
            type="text"
            placeholder="Search songs or artists..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="search-bar"
          />
        </div>
      </header>

      <nav>
        <ul>
          {artists.map((artist) => (
            <li key={artist.name} onClick={() => filterByArtist(artist.name)}>
              <img src={artist.img} alt={artist.name} />
            </li>
          ))}
        </ul>
      </nav>

      <main>
        <div className="playlist">
          {filteredSongs.map((song, index) => {
            const originalIndex = songs.indexOf(song);
            return (
              <div
                key={originalIndex}
                className="song-item"
                onClick={() => playSong(originalIndex)}
              >
                <h3>{filteredSongs.indexOf(song) + 1} {song.name}</h3>
                <p>{song.artist}</p>
              </div>
            );
          })}
        </div>
      </main>

      <aside>
        <div className="aside-content">
          <div className="current-music">
            <div className="song-art" style={{ backgroundImage: `url(${currentSong.img})` }}></div>
            <h2>{currentSong.name}</h2>
            <p>{currentSong.artist}</p>
          </div>
          <div className="artist-info">
            <div className="artist-art" style={{ backgroundImage: `url(${currentArtist.img})` }}></div>
            <h1>{currentArtist.name}</h1>
            <p>{currentArtist.description}</p>
          </div>
        </div>
      </aside>

      <footer>
        <div className="player-controls">
          <audio
            ref={audioRef}
            src={currentSong.song}
            onEnded={nextSong}
          />
          
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
                background: `linear-gradient(to right, #fff 0%, #fff ${(progress / duration) * 100}%, #919191 ${(progress / duration) * 100}%, white 100%)`
              }}
            />
            <span className="time">{formatTime(duration)}</span>
          </div>

          <div className="control-buttons">
            <button className="control-btn" onClick={previousSong}>
              <i className="fas fa-backward"></i>
            </button>
            <button className="control-btn play-btn" onClick={togglePlayPause}>
              <i className={`fas ${isPlaying ? 'fa-pause' : 'fa-play'}`}></i>
            </button>
            <button className="control-btn" onClick={nextSong}>
              <i className="fas fa-forward"></i>
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
