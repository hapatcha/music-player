# MAAMOUNify - React Music Player

A modern, feature-rich music player built with React 18, featuring a sleek dark theme and smooth animations.

## Features

- 🎵 **Modern UI/UX** - Beautiful dark theme with gradient animations
- 🎼 **Full Playback Controls** - Play, pause, next, previous, seek
- 🔊 **Volume Control** - Adjustable volume with mute functionality
- 🔀 **Shuffle Mode** - Random playback order
- 🔁 **Repeat Modes** - No repeat, repeat one, repeat all
- 🔍 **Search Functionality** - Search songs and artists
- 👥 **Artist Filtering** - Filter songs by artist
- ⏱️ **Time Display** - Current time and duration
- 📱 **Responsive Design** - Works on all screen sizes
- 🎨 **Smooth Animations** - Hover effects and transitions

## Quick Start

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm start
```

3. Open http://localhost:3000 in your browser

## Project Structure

```
music-player/
├── public/
│   └── index.html
├── src/
│   ├── components/
│   │   ├── MusicPlayer.js
│   │   └── MusicPlayer.css
│   ├── App.js
│   ├── App.css
│   └── index.js
├── songs/          # Music files
├── *.jpg/*.png/*.webp  # Album art and artist images
└── package.json
```

## Technologies Used

- **React 18** - Modern hooks and functional components
- **CSS3** - Flexbox, Grid, animations, and backdrop filters
- **Font Awesome** - Icons for controls
- **HTML5 Audio API** - Native audio playback

## Key Improvements from Original

- **React Architecture** - Component-based structure with hooks
- **Modern CSS** - Grid layout, animations, glassmorphism effects
- **Enhanced Controls** - Volume, shuffle, repeat functionality
- **Better State Management** - React hooks for state
- **Responsive Design** - Mobile-friendly layout
- **Performance** - Optimized re-renders and event handling
- **Accessibility** - Semantic HTML and ARIA support

## Customization

### Adding New Songs

Update the `songs` array in `src/App.js`:

```javascript
{
  name: "Song Name",
  artist: "Artist Name",
  img: "album-art.jpg",
  song: "songs/song-file.mp3"
}
```

### Adding New Artists

Update the `artists` array in `src/App.js`:

```javascript
{
  name: "Artist Name",
  img: "artist-photo.jpg",
  description: "Artist bio..."
}
```

### Theme Customization

Modify colors in `src/App.css`:

```css
:root {
  --primary-color: #4ecdc4;
  --secondary-color: #45b7d1;
  --background: #0a0a0a;
  --surface: rgba(30, 30, 30, 0.8);
}
```

## Build for Production

```bash
npm run build
```

This creates an optimized build in the `build` folder ready for deployment.
