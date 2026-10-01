package com.maamounify.service;

import com.maamounify.model.Song;
import com.maamounify.model.Artist;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

public class MusicService {
    private static MusicService instance;
    private List<Song> songs;
    private List<Artist> artists;
    
    private MusicService() {
        initializeData();
    }
    
    public static MusicService getInstance() {
        if (instance == null) {
            instance = new MusicService();
        }
        return instance;
    }
    
    private void initializeData() {
        // Initialize Artists
        artists = new ArrayList<>();
        artists.add(new Artist("El Castro", "elcastro.jpg", ""));
        artists.add(new Artist("XIIVI", "xiivi.jpg", ""));
        artists.add(new Artist("ALA", "ala.jpg", 
            "If there is any gap between North African rap and US-influenced trap and hip-hop culture, " +
            "Tunisia's A.L.A « Ala Ferchichi (Arabic: علاء فرشيشي) » straddles it with ease. Taking a familiar " +
            "flow and spitting Arabic-language rhymes-with a sprinkling of English—his sound has truly " +
            "international appeal. As a member of the Zomra collective, a group of peers dedicated to " +
            "promoting Tunisian rap"));
        artists.add(new Artist("Ktybon", "ktybon.jpg", ""));
        artists.add(new Artist("Emp1re", "emp1re.jpg", ""));
        
        // Initialize Songs
        songs = new ArrayList<>();
        songs.add(new Song("9k32", "XIIVI", "9k32.png", "songs/9k32.mp3"));
        songs.add(new Song("555", "Kiev,XIIVI", "555.webp", "songs/555 (feat. XIIVI).mp3"));
        songs.add(new Song("Terro Flow", "Omara,20fyee,XIIVI", "tf.webp", "songs/Terro Flow.mp3"));
        songs.add(new Song("سحار", "El Castro", "", "songs/El Castro  - Intro  سحار.mp3"));
        songs.add(new Song("Back To Black", "El Castro", "", "songs/El Castro - Back To Black  مرمة (Original Version).mp3"));
        songs.add(new Song("lil baby", "El Castro", "", "songs/El Castro - lil baby.mp3"));
        songs.add(new Song("Man7ebch", "El Castro", "", "songs/El Castro - Man7ebch.mp3"));
        songs.add(new Song("Rimi", "El Castro", "", "songs/El Castro - Rimi ريمي (Audio).mp3"));
        songs.add(new Song("AADHEBI", "ALA", "adhebi.jpg", "songs/A.L.A - AADHEBI (Official Music Video).mp3"));
        songs.add(new Song("NJOUMI", "ALA", "njoumi.jpg", "songs/A.L.A - NJOUMI ( NEW TRACK OUT SOON ).mp3"));
        songs.add(new Song("INLU", "ALA", "ala stou.jpg", "songs/A.L.A Feat Stou - INLU (Official Music Video).mp3"));
        songs.add(new Song("AARAP", "Emp1re", "aarap.jpg", "songs/EMP1RE - AARAP (Official Music Video).mp3"));
        songs.add(new Song("BLA BLA BLA", "Emp1re", "BLA BLA BLA.jpg", "songs/EMP1RE - BLA BLA BLA (Official Music Video).mp3"));
        songs.add(new Song("HITCHCOCK", "Emp1re", "HITCHCOCK.jpg", "songs/EMP1RE - HITCHCOCK.mp3"));
        songs.add(new Song("NES TESTANA", "Emp1re", "NES TESTANA.jpg", "songs/EMP1RE - NES TESTANA.mp3"));
        songs.add(new Song("TAWA BDIT", "Emp1re", "TAWA BDIT.jpg", "songs/EMP1RE - TAWA BDIT.mp3"));
        songs.add(new Song("eb7ath 3ani", "Ktybon", "eb7ath 3ani.jpg", "songs/KATYBON - eb7ath 3ani.mp3"));
        songs.add(new Song("INFRARED", "Ktybon", "INFRARED.jpg", "songs/KTYB - INFRARED.mp3"));
        songs.add(new Song("SNIN DEYMA", "Ktybon", "SNIN DEYMA.jpg", "songs/KTYB - SNIN DEYMA (Clean Version).mp3"));
    }
    
    public List<Song> getAllSongs() {
        return new ArrayList<>(songs);
    }
    
    public List<Artist> getAllArtists() {
        return new ArrayList<>(artists);
    }
    
    public Song getSong(int index) {
        if (index >= 0 && index < songs.size()) {
            return songs.get(index);
        }
        return null;
    }
    
    public Artist getArtistByName(String artistName) {
        return artists.stream()
                .filter(artist -> artistName.contains(artist.getName()))
                .findFirst()
                .orElse(artists.get(0));
    }
    
    public List<Song> searchSongs(String query) {
        String lowerQuery = query.toLowerCase();
        return songs.stream()
                .filter(song -> song.getName().toLowerCase().contains(lowerQuery) || 
                               song.getArtist().toLowerCase().contains(lowerQuery))
                .collect(Collectors.toList());
    }
    
    public List<Song> getSongsByArtist(String artistName) {
        return songs.stream()
                .filter(song -> song.getArtist().contains(artistName))
                .collect(Collectors.toList());
    }
    
    public int getSongCount() {
        return songs.size();
    }
}
