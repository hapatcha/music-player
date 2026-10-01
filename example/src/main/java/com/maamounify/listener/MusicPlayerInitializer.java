package com.maamounify.listener;

import com.maamounify.service.MusicService;
import javax.servlet.ServletContextEvent;
import javax.servlet.ServletContextListener;
import javax.servlet.annotation.WebListener;

@WebListener
public class MusicPlayerInitializer implements ServletContextListener {
    
    @Override
    public void contextInitialized(ServletContextEvent sce) {
        // Initialize the MusicService singleton when the application starts
        MusicService musicService = MusicService.getInstance();
        
        // Log initialization
        System.out.println("MAAMOUNify Music Player initialized successfully");
        System.out.println("Loaded " + musicService.getSongCount() + " songs");
        System.out.println("Loaded " + musicService.getAllArtists().size() + " artists");
    }
    
    @Override
    public void contextDestroyed(ServletContextEvent sce) {
        // Cleanup if needed
        System.out.println("MAAMOUNify Music Player shutting down");
    }
}
