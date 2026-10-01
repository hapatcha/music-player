package com.maamounify.model;

public class Song {
    private String name;
    private String artist;
    private String img;
    private String songPath;
    
    public Song() {}
    
    public Song(String name, String artist, String img, String songPath) {
        this.name = name;
        this.artist = artist;
        this.img = img;
        this.songPath = songPath;
    }
    
    public String getName() {
        return name;
    }
    
    public void setName(String name) {
        this.name = name;
    }
    
    public String getArtist() {
        return artist;
    }
    
    public void setArtist(String artist) {
        this.artist = artist;
    }
    
    public String getImg() {
        return img;
    }
    
    public void setImg(String img) {
        this.img = img;
    }
    
    public String getSongPath() {
        return songPath;
    }
    
    public void setSongPath(String songPath) {
        this.songPath = songPath;
    }
    
    @Override
    public String toString() {
        return "Song{name='" + name + "', artist='" + artist + "'}";
    }
}
