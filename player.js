// Dummy music list (samakan dengan scripts.js nanti)
const musicData = [
  { title: "オレンジ - Orange", artist: "SPYAIR", src: "music/orange.mp3", img: "images/spyair-orange.png" },
  { title: "Kizuna No Kiseki", artist: "MAN WITH A MISSION & milet", src: "music/kizuna_no_kiseki.mp3", img: "images/man_with_mission-kizuna_no_kiseki.png" },
  { title: "ぎゅっと。- Gyutto", artist: "Mosawo", src: "music/gyutto.mp3", img: "images/mosawo-gyutto.png" },
  { title: "Akuma No Ko", artist: "Ai Higuchi", src: "music/akuma_no_ko.mp3", img: "images/ai_higuchi-akuman_no_ko.png" },
  { title: "風のとおり道", artist: "Tayori", src: "music/little_birt.mp3", img: "images/tayori.png" }
];

// ambil index dari query string (default 0)
const urlParams = new URLSearchParams(window.location.search);
let currentIndex = parseInt(urlParams.get("id")) || 0;

const cover = document.getElementById("cover");
const title = document.getElementById("title");
const artist = document.getElementById("artist");
const progress = document.getElementById("progress");
const currentTime = document.getElementById("currentTime");
const durationTime = document.getElementById("duration");
const playBtn = document.getElementById("playBtn");

const audio = new Audio();

function loadTrack(index) {
  const music = musicData[index];
  audio.src = music.src;
  cover.src = music.img;
  title.textContent = music.title;
  artist.textContent = music.artist;
  audio.load();
}

function togglePlay() {
  if (audio.paused) {
    audio.play();
    playBtn.textContent = "⏸️";
  } else {
    audio.pause();
    playBtn.textContent = "▶️";
  }
}

function updateProgress() {
  progress.max = Math.floor(audio.duration);
  progress.value = Math.floor(audio.currentTime);
  currentTime.textContent = formatTime(audio.currentTime);
  durationTime.textContent = formatTime(audio.duration);
}

function formatTime(sec) {
  const min = Math.floor(sec / 60);
  const s = Math.floor(sec % 60);
  return `${min}:${s < 10 ? "0" : ""}${s}`;
}

function setProgress() {
  audio.currentTime = progress.value;
}

function nextTrack() {
  currentIndex = Math.floor(Math.random() * musicData.length);
  loadTrack(currentIndex);
  audio.play();
  playBtn.textContent = "⏸️";
}

function prevTrack() {
  currentIndex = currentIndex > 0 ? currentIndex - 1 : musicData.length - 1;
  loadTrack(currentIndex);
  audio.play();
  playBtn.textContent = "⏸️";
}

// Event listeners
audio.addEventListener("timeupdate", updateProgress);
audio.addEventListener("ended", nextTrack);
progress.addEventListener("input", setProgress);

// Init
loadTrack(currentIndex);
