const art = [{
  name:"El Castro",
  img:"image/elcastro.jpg",
  description:""
},{
  name:"XIIVI",
  img:"image/xiivi.jpg",
  description:""
},{
  name:"ALA",
  img:"image/ala.jpg",
  description:"If there is any gap between North African rap and US-influenced trap and hip-hop culture, Tunisia's  A.L.A « Ala Ferchichi (Arabic: علاء فرشيشي) » straddles it with ease. Taking a familiar flow and spitting Arabic-language rhymes-with a sprinkling of English—his sound has truly international appeal. As a member of the Zomra collective, a group of peers dedicated to promoting Tunisian rap"
},{
  name:"Ktybon",
  img:"image/ktybon.jpg",
  description:""
},{
  name:"Emp1re",
  img:"image/emp1re.jpg",
  description:""
}];
const songs = [{
  name:"9k32",
  artist:"XIIVI",
  img:"image/9k32.png",
  song: "songs/9k32.mp3"
}, {
  name:"555",
  artist:"Kiev,XIIVI",
  img:"image/555.webp",
  song: "songs/555 (feat. XIIVI).mp3"
},{
  name:"Terro Flow",
  artist:"Omara,20fyee,XIIVI",
  img:"image/tf.webp",
  song: "songs/Terro Flow.mp3"
},{
  name:"سحار",
  artist:"El Castro",
  img:"",
  song: "songs/El Castro  - Intro  سحار.mp3"
},{
  name:"Back To Black",
  artist:"El Castro",
  img:"",
  song: "songs/El Castro - Back To Black  مرمة (Original Version).mp3"
},{
  name:"lil baby",
  artist:"El Castro",
  img:"",
  song: "songs/El Castro - lil baby.mp3"
},{
  name:"Man7ebch",
  artist:"El Castro",
  img:"",
  song: "songs/El Castro - Man7ebch.mp3"
},{
  name:"Rimi",
  artist:"El Castro",
  img:"",
  song: "songs/El Castro - Rimi ريمي (Audio).mp3"
},{
  name:"AADHEBI",
  artist:"ALA",
  img:"image/adhebi.jpg",
  song: "songs/A.L.A - AADHEBI (Official Music Video).mp3"
},{
  name:"NJOUMI",
  artist:"ALA",
  img:"image/njoumi.jpg",
  song: "songs/A.L.A - NJOUMI ( NEW TRACK OUT SOON ).mp3"
},{
  name:"INLU",
  artist:"ALA",
  img:"image/ala stou.jpg",
  song: "songs/A.L.A Feat Stou - INLU (Official Music Video).mp3"
},{
  name:"AARAP",
  artist:"Emp1re",
  img:"image/aarap.jpg",
  song: "songs/EMP1RE - AARAP (Official Music Video).mp3"
},{
  name:"BLA BLA BLA",
  artist:"Emp1re",
  img:"image/BLA BLA BLA.jpg",
  song: "songs/EMP1RE - BLA BLA BLA (Official Music Video).mp3"
},{
  name:"HITCHCOCK",
  artist:"Emp1re",
  img:"image/HITCHCOCK.jpg",
  song: "songs/EMP1RE - HITCHCOCK.mp3"
},{
  name:"NES TESTANA",
  artist:"Emp1re",
  img:"image/NES TESTANA.jpg",
  song: "songs/EMP1RE - NES TESTANA.mp3"
},{
  name:"TAWA BDIT",
  artist:"Emp1re",
  img:"image/TAWA BDIT.jpg",
  song: "songs/EMP1RE - TAWA BDIT.mp3"
},{
  name:"eb7ath 3ani",
  artist:"Ktybon",
  img:"image/eb7ath_3ani.jpg",
  song: "songs/KATYBON - eb7ath 3ani.mp3"
},{
  name:"INFRARED",
  artist:"Ktybon",
  img:"image/INFRARED.jpg",
  song: "songs/KTYB - INFRARED.mp3"
},{
  name:"SNIN DEYMA",
  artist:"Ktybon",
  img:"image/SNIN_DEYMA.jpg",
  song: "songs/KTYB - SNIN DEYMA (Clean Version).mp3"
}
  ];
const songPlayer = document.getElementById("songPlayer");
const songName = document.getElementById("songName");
const artist = document.getElementById("artist");
const songImg = document.getElementById("songImg");
const progress = document.getElementById("progress");
const cntrIcon = document.getElementById("cntrIcon");
const artwork = document.getElementById("artwork");
const artst = document.getElementById("artst");
const description = document.getElementById("description");
const ar = art[0];
const sn = songs[0].artist;
i=0;
let currentSongIndex = 0;

function nextSong(){
  currentSongIndex = (currentSongIndex+1)%songs.length;
  playSongs(currentSongIndex);
}
function previousSong(){
  currentSongIndex = (currentSongIndex-1)%songs.length;
  playSongs();
}
// function playSong(){
//   songPlayer.src=songs[currentSongIndex].song;
//   songImg.style.backgroundImage=`url(${songs[currentSongIndex].img}) `;
//   songName.innerHTML = songs[currentSongIndex].name;
//   artist.innerHTML = songs[currentSongIndex].artist;
//   artwork.style.backgroundImage=`url(${art[i].img})`;
//   songPlayer.play();
// }
function playSongs(currentSongIndex){
  songPlayer.src=songs[currentSongIndex].song;
  songImg.style.backgroundImage=`url(${songs[currentSongIndex].img}) `;
  songName.innerHTML = songs[currentSongIndex].name;
  artist.innerHTML = songs[currentSongIndex].artist;
  for (var i=0;i<art.length;i++){
    if (songs[currentSongIndex].artist.includes(art[i].name)){
      artwork.style.backgroundImage=`url(${art[i].img})`;
      artst.innerHTML=art[i].name;
      description.innerHTML=art[i].description;
      break;
    }
  }

  songPlayer.play();
  return currentSongIndex;
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
    var value = (progress.value-progress.min)/(progress.max-progress.min)*100
    progress.style.background = `linear-gradient(to right, #fff 0%, #fff ${value}%,#919191 ${value}%, white 100%)`
  
  setInterval(()=>{
    progress.value = songPlayer.currentTime;
  progress.style.background = `linear-gradient(to right, #fff 0%, #fff ${value}%,#919191 ${value}%, white 100%)`
  },500);

}

progress.onchange = function (){
  var value = (progress.value-progress.min)/(progress.max-progress.min)*100
  progress.style.background = `linear-gradient(to right, #fff 0%, #fff ${value}%,#919191 ${value}%, white 100%)`

  songPlayer.currentTime = progress.value; 
}
//play liste
const list = document.querySelectorAll("li");
const castro = function(){
  clear();
  j=0;
  for(i=0;i<songs.length;i++){
    if(songs[i].artist.includes("El Castro")){
      document.getElementById("playListe").innerHTML += `<div onclick="playSongs(${i})" class="a"><h3>${j+1} ${songs[i].name}</h3><p>${songs[i].artist}</p></div>`;
      j+=1;
    }
  }
}
const xiivi = function(){
  clear();
  j=0;
  for(i=0;i<songs.length;i++){
    if(songs[i].artist.includes("XIIVI")){
      document.getElementById("playListe").innerHTML += `<div onclick="playSongs(${i})" class="a"><h3>${j+1} ${songs[i].name}</h3><p>${songs[i].artist}</p></div>`;
      j+=1;
    }
  }
}
const ala = function(){
  clear();
  j=0;
  for(i=0;i<songs.length;i++){
    if(songs[i].artist.includes("ALA")){
      document.getElementById("playListe").innerHTML += `<div onclick="playSongs(${i})" class="a"><h3>${j+1} ${songs[i].name}</h3><p>${songs[i].artist}</p></div>`;
      j+=1;
    }
  }
}
const empire = function(){
  clear();
  j=0;
  for(i=0;i<songs.length;i++){
    if(songs[i].artist.includes("Emp1re")){
      document.getElementById("playListe").innerHTML += `<div onclick="playSongs(${i})" class="a"><h3>${j+1} ${songs[i].name}</h3><p>${songs[i].artist}</p></div>`;
      j+=1;
    }
  }
}
const ktybon = function(){
  clear();
  j=0;
  for(i=0;i<songs.length;i++){
    if(songs[i].artist.includes("Ktybon")){
      document.getElementById("playListe").innerHTML += `<div onclick="playSongs(${i})" class="a"><h3>${j+1} ${songs[i].name}</h3><p>${songs[i].artist}</p></div>`;
      j+=1;
    }
  }
}
list[0].addEventListener("click",castro);
list[3].addEventListener("click",xiivi);
list[1].addEventListener("click",ala);
list[2].addEventListener("click",empire);
list[4].addEventListener("click",ktybon);
//search for songs

const searchBar = document.getElementById("searchBar");
searchBar.addEventListener("keyup", function(event){
  const value = event.target.value.toLowerCase();
  const songsFiltered = songs.filter(function(song){
    return song.name.toLowerCase().includes(value) || song.artist.toLowerCase().includes(value);
  });
  document.getElementById("playListe").innerHTML = "";
  songsFiltered.forEach(function(song){
    document.getElementById("playListe").innerHTML += `<div onclick="playSongs(${songs.indexOf(song)})" class="a"><h3>${songs.indexOf(song)+1} ${song.name}</h3><p>${song.artist}</p></div>`;
  });
});
const house = document.querySelector(".fa-house");
searchBar.addEventListener("click", ()=>{
  house.style.marginRight="0";
  house.style.borderRadius="100%";
  house.style.background="#333";

})
function clear(){
  document.getElementById("playListe").innerHTML = "";
};
