const img = document.querySelector("#img");
const playPause = document.querySelector("#playpause");
const playPauseBtn = document.querySelector("#playpause-btn");
const audio = document.querySelector("#audio");
const title = document.querySelector("#title");
const prevBtn = document.querySelector("#prevbtn");
const nextBtn = document.querySelector("#nextbtn");
const progress = document.querySelector("#progress");
const progressBar = document.querySelector(".progress-bar");
const currTime = document.querySelector(".current-time");
const totalDuration = document.querySelector(".duration-time");
const volume = document.querySelector("#volume");
const layer = document.querySelector(".layer");
const volBar = document.querySelector(".bar");
const progressLine = document.querySelector(".progress-line");
const volumeRange = document.querySelector(".volumerange");
const repeatBtn = document.querySelector("#repeat");
const likeBtn = document.querySelector("#like");
const likeIcon = document.querySelector("#likeicon");
const songListBtn = document.querySelector("#list");
const songList = document.querySelector("#songs-list");
const listCloseBtn = document.querySelector("#listclose");
// songs array

const songs = [
  {
    path: 'music1.mp3',
    displayName: 'Let It Happsen',
    artist: 'Tame Impala',
    cover: "https://m.media-amazon.com/images/M/MV5BZTc4OTQ1ZWItMDY1Yi00OTI5LTgyZjEtMjBkNmE5OTI3Zjg1XkEyXkFqcGdeQXVyNTA1NDY3NzY@._V1_.jpg",
  },
  {
    path: 'music3.mp3',
    displayName: 'You\'re Somebody Else',
    artist: 'flora cash',
    cover: "https://64.media.tumblr.com/2e2bbdbaf40cef131f634c6157afa725/8ea2f2d331f1c550-81/s1280x1920/b3625476438423b25970aa590b9ed77fa63b4aab.jpg",
  },
  {
    path: 'music2.mp3',
    displayName: 'Bedroom - in my head',
    artist: 'Boring Life',
    cover: "https://images.genius.com/ef77c05d4ce7455f463daff83261e1a8.1000x1000x1.jpg",
  },
];

// deafult song index 

let songIndex = 0;

// song default state

let isPlaying = false;

// song pause function

function playSong(){
  isPlaying = true;
  playPauseBtn.classList.replace("fa-play","fa-pause");
  audio.play();
}

// song play function

function pauseSong(){
  isPlaying = false;
  playPauseBtn.classList.replace("fa-pause","fa-play");
  audio.pause();
}

// loading songs

function loadSong(song){
    img.src = song.cover;
    title.textContent = song.displayName;
    audio.src = song.path;
};

// previous song 

function prevSong(){
  songIndex--;
  if(songIndex < 0){
    songIndex = songs.length - 1;
  }
  loadSong(songs[songIndex]);
  playSong();
}

// next song

function nextSong(){
  songIndex++;
  if(songIndex > songs.length-1){
    songIndex = 0;
  }
  loadSong(songs[songIndex]);
  playSong();
}

// progress bar function
console.log(audio.duration);

function updateProgress(e){
  if (isPlaying) {
    const { duration, currentTime } = e.target;
    // Update progress bar width
    const progressPercent = (currentTime / duration) * 100;
    progress.value = progressPercent;
    progressLine.style.width = `${progressPercent}%`;
    if(progressPercent==100){
      return nextSong();
    }
    // Calculate display for duration
    const durationMinutes = Math.floor(duration / 60);
    let durationSeconds = Math.floor(duration % 60);
    if (durationSeconds < 10) {
      durationSeconds = `0${durationSeconds}`;
    }
    // Delay switching duration Element to avoid NaN
    if (durationSeconds) {
      totalDuration.textContent = `${durationMinutes}:${durationSeconds}`;
    }
    // Calculate display for currentTime
    let currentMinutes = Math.floor(currentTime / 60);
    let currentSeconds = Math.floor(currentTime % 60);
    if (currentSeconds < 10) {
      currentSeconds = `0${currentSeconds}`;
    }
    currTime.textContent = `${currentMinutes}:${currentSeconds}`;
  }
}

function progressSlide(e){
  const { value } = e.target;
  const progressTime = Math.ceil((audio.duration / 100) * value);
  audio.currentTime = progressTime;
  console.log(progressTime);
    if(!isPlaying) {
      progressLine.style.width = `${value}%`;    
   }
}

function volumeBar(){
  layer.classList.toggle('hide');
  setTimeout(()=>{
    if(layer.classList.contains("hide")){
      layer.classList.remove("hide");
    }
  }, 5000);
}

function setVolume(){
  audio.volume = volumeRange.value;
  const barWidth = (volumeRange.value/1)*100;
  volBar.style.width = `${barWidth}%`;
}

function repeat(){
  repeatBtn.classList.toggle('color');
  const repeatBtnState = repeatBtn.classList.contains("color");
  if(repeatBtnState){
    audio.loop = true;
    loadSong();
  }else{
    audio.loop = false;
    loadSong();
  }
  
}

function like(){
  likeBtn.classList.toggle('color');
  if(likeBtn.classList.contains("color")){
  likeIcon.classList.replace("far","fas");
}else{
  likeIcon.classList.replace("fas","far");
}}

function like() {
  if (likeBtn.classList.toggle('color')) {
    likeIcon.classList.replace('far', 'fas');
  } else {
    likeIcon.classList.replace('fas', 'far');
  }
}
let listloaded = false;
function musicList() {
  songList.classList.toggle("showlist");
  
  for (let i = 0; i < songs.length; i++) {
    if(listloaded)break;
    const songelement = document.createElement('li');
    const songcoverimage = document.createElement('img');
    songcoverimage.src = `${songs[i].cover}`;
    
    songelement.innerHTML = `${songs[i].displayName}`;
    
    songelement.className="songelement";
    songelement.addEventListener("click", function () {
      loadSong(songs[i]);
      playSong();
       songList.classList.remove("showlist");
    });
    songelement.appendChild(songcoverimage);
    songList.appendChild(songelement);

    
    
  }
  listloaded=true; 
   listCloseBtn.addEventListener("click",()=>{
    songList.classList.remove("showlist");
  })
}


playPause.addEventListener("click", () => (isPlaying ? pauseSong() : playSong())); 
prevBtn.addEventListener("click",prevSong);
nextBtn.addEventListener("click",nextSong);
audio.addEventListener("timeupdate", updateProgress);
progress.addEventListener("input", progressSlide);
volume.addEventListener("click", volumeBar);
volumeRange.addEventListener("input",setVolume);
repeatBtn.addEventListener("click", repeat);
likeBtn.addEventListener("click", like);
songListBtn.addEventListener("click",musicList);



// 	    var rgb = getAverageRGB(document.getElementById('img'));
//     document.body.style.backgroundColor = 'rgb('+rgb.r+','+rgb.g+','+rgb.b+')';

// function getAverageRGB(imgEl) {
    
//     var blockSize = 5, // only visit every 5 pixels
//         defaultRGB = {r:0,g:0,b:0}, // for non-supporting envs
//         canvas = document.createElement('canvas'),
//         context = canvas.getContext && canvas.getContext('2d'),
//         data, width, height,
//         i = -4,
//         length,
//         rgb = {r:0,g:0,b:0},
//         count = 0;
        
//     if (!context) {
//         return defaultRGB;
//     }
    
//     height = canvas.height = imgEl.naturalHeight || imgEl.offsetHeight || imgEl.height;
//     width = canvas.width = imgEl.naturalWidth || imgEl.offsetWidth || imgEl.width;
    
//     context.drawImage(imgEl, 0, 0);
    
//     try {
//         data = context.getImageData(0, 0, width, height);
//     } catch(e) {
//         /* security error, img on diff domain */alert('x');
//         return defaultRGB;
//     }
    
//     length = data.data.length;
    
//     while ( (i += blockSize * 4) < length ) {
//         ++count;
//         rgb.r += data.data[i];
//         rgb.g += data.data[i+1];
//         rgb.b += data.data[i+2];
//     }
    
//     // ~~ used to floor values
//     rgb.r = ~~(rgb.r/count);
//     rgb.g = ~~(rgb.g/count);
//     rgb.b = ~~(rgb.b/count);
    
//     return rgb;
    
// }
//      function setBodyBackgroundColor() {
//             var rgb = getAverageRGB(document.getElementById('img'));
//             document.body.style.backgroundColor = 'rgb(' + rgb.r + ',' + rgb.g + ',' + rgb.b + ')';
//         }

//         // Using DOMContentLoaded event
//         document.addEventListener("DOMContentLoaded", setBodyBackgroundColor);

//         // Using window.onload event
//         window.onload = setBodyBackgroundColor;
