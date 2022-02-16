//Definindo as variáveis

let audio = document.querySelector("#audio");
let album = document.querySelector("#album");
let musicName = document.querySelector("#musicName");
let artist = document.querySelector("#artist");
let range = document.querySelector("#range");
let currentTime = document.querySelector("#currentTime");
let maxTime = document.querySelector("#maxTime");
let backward = document.querySelector("#backward");
let play = document.querySelector("#play");
let pause = document.querySelector("#pause");
let forward = document.querySelector("#forward");

// Array que conterá as músicas como objetos
let musicArray = [];
//Qual o indice do Array - Onde irá começar a musica
let musicTime = 0;

//Função para criar o objeto e incluí-lo no Array
let createMusic = (name, artist, album, src) => {
  let obj = {
    audioSrc: audio,
    musicName: name,
    artistName: artist,
    albumName: album,
    srcName: src,
  };
  musicArray.push(obj);
};

createMusic(
  "Male Fantasy",
  "Billie Eilish",
  "./assets/artist/Billie_Ielish.jpeg",
  "./assets/music/Male_Fantasy.mp3"
);
createMusic(
  "Lost Friend",
  "FINNEAS",
  "./assets/artist/Finneas.jpg",
  "./assets/music/Lost_Friend.mp3"
);
createMusic(
  "Adore You",
  "Harry Styles",
  "./assets/artist/Harry_Styles.png",
  "./assets/music/Adore_You.mp3"
);

//Função para renderizar a música

let renderMusic = (musicObj) => {
  audio.src = musicObj.srcName;
  album.src = musicObj.albumName;
  musicName.innerHTML = musicObj.musicName;
  artist.innerHTML = musicObj.artistName;
  range.max = audio.duration;
  range.value = 0;
};

onload = () => renderMusic(musicArray[0]);

// Função para os botões

backward.onclick = () => {
  if (musicTime == 0) musicTime = musicArray.length - 1;
  else musicTime--;
  renderMusic(musicArray[musicTime]);
  play.onclick();
  play.style.display = "none";
  pause.style.display = "inicial";
};

forward.onclick = () => {
  if (musicTime == musicArray.length - 1) musicTime = 0;
  else musicTime++;
  renderMusic(musicArray[musicTime]);
  play.onclick();
  play.style.display = "none";
  pause.style.display = "inicial";
};

play.onclick = () => {
  audio.play();
  play.style.display = "none";
  pause.style.display = "initial";
};

pause.onclick = () => {
  audio.pause();
  play.style.display = "initial";
  pause.style.display = "none";
};

//Função para o range

audio.ontimeupdate = () => {
  range.max = audio.duration;
  range.value = audio.currentTime;
  currentTime.innerHTML = `${Math.floor(range.value / 60)}:${Math.floor(
    range.value % 60
  )}`;
  maxTime.innerHTML = `${Math.floor(range.max / 60)}:${Math.floor(
    range.max % 60
  )}`;
  if (Math.floor(range.max) == Math.floor(range.value)) {
    return forward.onclick();
  }
};

range.onchange = () => {
  audio.currentTime = range.value;
};
