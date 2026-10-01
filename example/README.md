# MAAMOUNify - Java Servlet/JSP Music Player

A professional music player web application built with Java Servlets, JSP, and modern web technologies.

## 🎵 Features

- **Modern UI/UX** - Beautiful dark theme with gradient animations
- **Full Playback Controls** - Play, pause, next, previous, seek
- **Search Functionality** - Real-time search of songs and artists
- **Artist Filtering** - Filter songs by artist
- **Responsive Design** - Works on all screen sizes
- **Keyboard Shortcuts** - Space to play/pause, arrows for navigation
- **Touch Gestures** - Swipe for next/previous on mobile
- **REST API** - JSON API for music data
- **Professional Architecture** - MVC pattern with proper separation

## 🏗️ Architecture

### Backend (Java EE)
- **Servlets** - RESTful API endpoints
- **JSP** - Server-side templating
- **MVC Pattern** - Model-View-Controller architecture
- **Service Layer** - Business logic separation
- **Singleton Pattern** - Music service management

### Frontend
- **Vanilla JavaScript** - Modern ES6+ features
- **CSS3** - Grid layout, animations, glassmorphism
- **HTML5 Audio API** - Native audio playback
- **Responsive Design** - Mobile-first approach

## 📁 Project Structure

```
example/
├── pom.xml                           # Maven configuration
├── src/
│   └── main/
│       ├── java/
│       │   └── com/maamounify/
│       │       ├── model/           # Data models
│       │       │   ├── Song.java
│       │       │   └── Artist.java
│       │       ├── service/         # Business logic
│       │       │   └── MusicService.java
│       │       ├── servlet/         # API controllers
│       │       │   └── MusicPlayerServlet.java
│       │       ├── filter/          # Filters
│       │       │   └── CORSFilter.java
│       │       └── listener/        # Application listeners
│       │           └── MusicPlayerInitializer.java
│       └── webapp/
│           ├── WEB-INF/
│           │   └── web.xml          # Deployment descriptor
│           ├── index.jsp            # Main page
│           ├── css/
│           │   └── style.css        # Stylesheets
│           └── js/
│               └── music-player.js  # Frontend logic
└── README.md
```

## 🚀 Quick Start

### Prerequisites
- Java 11 or higher
- Maven 3.6 or higher
- Tomcat 9.0 or higher (or any Java EE container)

### Installation

1. **Clone/Download the project**
2. **Navigate to the project directory**
   ```bash
   cd example
   ```

3. **Build the project**
   ```bash
   mvn clean install
   ```

4. **Deploy to Tomcat**
   - Copy `target/music-player.war` to Tomcat's `webapps` directory
   - Or use Maven Tomcat plugin:
     ```bash
     mvn tomcat7:run
     ```

5. **Access the application**
   - Open http://localhost:8080/music-player

### Development Mode

For development with hot reload:
```bash
mvn tomcat7:run-war-exploded
```

## 🎮 Controls

### Mouse/Touch
- Click song to play
- Click artist image to filter
- Use control buttons for playback
- Drag progress bar to seek

### Keyboard Shortcuts
- `Space` - Play/Pause
- `→` - Next song
- `←` - Previous song
- `↑` - Volume up
- `↓` - Volume down

### Touch Gestures (Mobile)
- Swipe right - Next song
- Swipe left - Previous song

## 🔧 Configuration

### Adding New Songs

Edit `MusicService.java` and add to the `initializeData()` method:

```java
songs.add(new Song(
    "Song Name",
    "Artist Name", 
    "album-art.jpg",
    "songs/song-file.mp3"
));
```

### Adding New Artists

Edit `MusicService.java` and add to the `initializeData()` method:

```java
artists.add(new Artist(
    "Artist Name",
    "artist-photo.jpg", 
    "Artist biography..."
));
```

### Customizing Paths

Update `web.xml` context parameters:

```xml
<context-param>
    <param-name>musicLibraryPath</param-name>
    <param-value>/WEB-INF/music</param-value>
</context-param>
```

## 🌐 API Endpoints

### Songs
- `GET /api/songs` - Get all songs
- `GET /api/songs?artist={name}` - Get songs by artist
- `GET /api/song?index={id}` - Get specific song

### Artists
- `GET /api/artists` - Get all artists
- `GET /api/artist?name={name}` - Get specific artist

### Search
- `GET /api/search?q={query}` - Search songs

## 📱 Responsive Breakpoints

- **Desktop**: >1024px - Full layout
- **Tablet**: 768px-1024px - Compact layout
- **Mobile**: <768px - Single column layout

## 🔒 Security Features

- CORS filtering for API endpoints
- Input validation and sanitization
- Secure session configuration
- XSS protection headers

## 🎨 UI Features

- Glassmorphism effects
- Gradient animations
- Smooth transitions
- Loading states
- Error handling
- Progress indicators

## 🔄 Build & Deploy

### Production Build
```bash
mvn clean package
```

### Run Tests
```bash
mvn test
```

### Generate Documentation
```bash
mvn javadoc:javadoc
```

## 🐛 Troubleshooting

### Common Issues

1. **404 Errors**
   - Check Tomcat deployment
   - Verify WAR file name in URL

2. **Audio Not Playing**
   - Check audio file paths
   - Verify browser audio support

3. **CORS Issues**
   - Check CORS filter configuration
   - Verify API endpoint URLs

4. **Maven Build Errors**
   - Check Java version (requires Java 11+)
   - Verify Maven version (3.6+)

## 📊 Technologies Used

### Backend
- **Java 11** - Programming language
- **Servlet API 4.0** - Web framework
- **JSP 2.3** - Templating engine
- **JSTL 1.2** - Tag library
- **Gson 2.9.0** - JSON processing
- **Maven** - Build tool

### Frontend
- **HTML5** - Markup
- **CSS3** - Styling
- **JavaScript ES6+** - Client-side logic
- **Font Awesome 6.4** - Icons

### Server
- **Apache Tomcat 9.0** - Application server
- **Maven Tomcat Plugin** - Development server

## 📄 License

This project is for educational purposes. Feel free to modify and distribute.

## 🤝 Contributing

1. Fork the project
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

---

**MAAMOUNify** - Professional Java Web Music Player 🎵
