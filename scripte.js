const songs = [{
  name:"9k32",
  artist:"XIIVI",
  img:"9k32.png",
  song: "songs/9k32.mp3"
}, {
  name:"555",
  artist:"Kiev,XIIVI",
  img:"555.webp",
  song: "songs/555 (feat. XIIVI).mp3"
},{
  name:"Terro Flow",
  artist:"Omara,20fyee,XIIVI",
  img:"tf.webp",
  song: "songs/Terro Flow.mp3"
},
  ];
const songPlayer = document.getElementById("songPlayer");
const songName = document.getElementById("songName");
const artist = document.getElementById("artist");
const songImg = document.getElementById("songImg");
const progress = document.getElementById("progress");
const cntrIcon = document.getElementById("cntrIcon");
let currentSongIndex = 0;
function nextSong(){
  currentSongIndex = (currentSongIndex+1)%songs.length;
  playSong();
}
function previousSong(){
  currentSongIndex = (currentSongIndex-1)%songs.length;
  playSong();
}
function playSong(){
  songPlayer.src=songs[currentSongIndex].song;
  songImg.style.backgroundImage=`url(${songs[currentSongIndex].img}) `;
  songName.innerHTML = songs[currentSongIndex].name;
  artist.innerHTML = songs[currentSongIndex].artist;
  songPlayer.play();
}
function playPause(){
  if(songPlayer.paused){
    // songImg.style.animationName="anim";
    songPlayer.play();
    cntrIcon.classList.remove("fa-play");
    cntrIcon.classList.add("fa-pause");
  }else{
    songPlayer.pause();
    cntrIcon.classList.remove("fa-pause");
    cntrIcon.classList.add("fa-play");
  }
}
songPlayer.onloadedmetadata = function (){
  progress.max = songPlayer.duration;
  setInterval(()=>{
    progress.value = songPlayer.currentTime;

  },500);

}

progress.onchange = function (){
  songPlayer.currentTime = progress.value; 
}