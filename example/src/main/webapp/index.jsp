<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>MAAMOUNify - Music Player</title>
    <link rel="stylesheet" href="css/style.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
</head>
<body>
    <div class="container">
        <header>
            <h1>MAAMOUNify</h1>
            <div class="pp">
                <button class="home-btn" id="homeBtn">
                    <i class="fas fa-home"></i>
                </button>
                <input type="text" id="searchBar" placeholder="Search songs or artists..." class="search-bar">
            </div>
        </header>

        <nav>
            <ul id="artistList">
                <!-- Artists will be loaded dynamically -->
            </ul>
        </nav>

        <main>
            <div class="playlist" id="playlist">
                <!-- Songs will be loaded dynamically -->
            </div>
        </main>

        <aside>
            <div class="aside-content">
                <div class="current-music">
                    <div class="song-art" id="songArt"></div>
                    <h2 id="songName"></h2>
                    <p id="artistName"></p>
                </div>
                <div class="artist-info">
                    <div class="artist-art" id="artistArt"></div>
                    <h1 id="currentArtistName"></h1>
                    <p id="artistDescription"></p>
                </div>
            </div>
        </aside>

        <footer>
            <div class="player-controls">
                <audio id="songPlayer"></audio>
                
                <div class="progress-container">
                    <span class="time" id="currentTime">0:00</span>
                    <input type="range" min="0" max="100" value="0" id="progress" class="progress-bar">
                    <span class="time" id="duration">0:00</span>
                </div>

                <div class="control-buttons">
                    <button class="control-btn" id="prevBtn">
                        <i class="fas fa-backward"></i>
                    </button>
                    <button class="control-btn play-btn" id="playPauseBtn">
                        <i class="fas fa-play"></i>
                    </button>
                    <button class="control-btn" id="nextBtn">
                        <i class="fas fa-forward"></i>
                    </button>
                </div>
            </div>
        </footer>
    </div>

    <!-- Loading Modal -->
    <div class="loading-modal" id="loadingModal">
        <div class="loading-content">
            <i class="fas fa-spinner fa-spin"></i>
            <p>Loading music...</p>
        </div>
    </div>

    <script src="js/music-player.js"></script>
</body>
</html>
