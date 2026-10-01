package com.maamounify.servlet;

import com.maamounify.model.Song;
import com.maamounify.model.Artist;
import com.maamounify.service.MusicService;
import com.google.gson.Gson;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.List;

@WebServlet("/api/*")
public class MusicPlayerServlet extends HttpServlet {
    private MusicService musicService;
    private Gson gson;
    
    @Override
    public void init() throws ServletException {
        musicService = MusicService.getInstance();
        gson = new Gson();
    }
    
    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) 
            throws ServletException, IOException {
        
        String pathInfo = request.getPathInfo();
        response.setContentType("application/json");
        response.setCharacterEncoding("UTF-8");
        
        try {
            switch (pathInfo) {
                case "/songs":
                    handleGetSongs(request, response);
                    break;
                case "/artists":
                    handleGetArtists(request, response);
                    break;
                case "/search":
                    handleSearch(request, response);
                    break;
                case "/song":
                    handleGetSong(request, response);
                    break;
                case "/artist":
                    handleGetArtist(request, response);
                    break;
                default:
                    response.sendError(HttpServletResponse.SC_NOT_FOUND);
                    break;
            }
        } catch (Exception e) {
            response.sendError(HttpServletResponse.SC_INTERNAL_SERVER_ERROR, e.getMessage());
        }
    }
    
    private void handleGetSongs(HttpServletRequest request, HttpServletResponse response) 
            throws IOException {
        
        String artist = request.getParameter("artist");
        List<Song> songs;
        
        if (artist != null && !artist.trim().isEmpty()) {
            songs = musicService.getSongsByArtist(artist);
        } else {
            songs = musicService.getAllSongs();
        }
        
        String json = gson.toJson(songs);
        response.getWriter().write(json);
    }
    
    private void handleGetArtists(HttpServletRequest request, HttpServletResponse response) 
            throws IOException {
        
        List<Artist> artists = musicService.getAllArtists();
        String json = gson.toJson(artists);
        response.getWriter().write(json);
    }
    
    private void handleSearch(HttpServletRequest request, HttpServletResponse response) 
            throws IOException {
        
        String query = request.getParameter("q");
        if (query == null || query.trim().isEmpty()) {
            response.sendError(HttpServletResponse.SC_BAD_REQUEST, "Query parameter 'q' is required");
            return;
        }
        
        List<Song> results = musicService.searchSongs(query);
        String json = gson.toJson(results);
        response.getWriter().write(json);
    }
    
    private void handleGetSong(HttpServletRequest request, HttpServletResponse response) 
            throws IOException {
        
        String indexParam = request.getParameter("index");
        if (indexParam == null || indexParam.trim().isEmpty()) {
            response.sendError(HttpServletResponse.SC_BAD_REQUEST, "Index parameter is required");
            return;
        }
        
        try {
            int index = Integer.parseInt(indexParam);
            Song song = musicService.getSong(index);
            
            if (song == null) {
                response.sendError(HttpServletResponse.SC_NOT_FOUND, "Song not found");
                return;
            }
            
            String json = gson.toJson(song);
            response.getWriter().write(json);
            
        } catch (NumberFormatException e) {
            response.sendError(HttpServletResponse.SC_BAD_REQUEST, "Invalid index format");
        }
    }
    
    private void handleGetArtist(HttpServletRequest request, HttpServletResponse response) 
            throws IOException {
        
        String artistName = request.getParameter("name");
        if (artistName == null || artistName.trim().isEmpty()) {
            response.sendError(HttpServletResponse.SC_BAD_REQUEST, "Artist name parameter is required");
            return;
        }
        
        Artist artist = musicService.getArtistByName(artistName);
        String json = gson.toJson(artist);
        response.getWriter().write(json);
    }
}
