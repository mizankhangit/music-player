const image = document.querySelector("img");
const title = document.querySelector("#title");
const artist = document.querySelector("#artist");

const progressContainer = document.querySelector("#progress-container");
const progress = document.querySelector("#progress");

const currentTimeEl = document.querySelector("#current-time");
const durationEl = document.querySelector("#duration");

const music = document.querySelector("audio");
const prevBtn = document.querySelector("#prev");
const playBtn = document.querySelector("#play");
const nextBtn = document.querySelector("#next");

const songs = [
  {
    name: "jacinto-1",
    displayName: "Electric Chill Machine",
    artist: "Jacinto Design",
  },
  {
    name: "jacinto-2",
    displayName: "Seven Nation Army (Remix)",
    artist: "Jacinto Design",
  },
  {
    name: "jacinto-3",
    displayName: "Goodnightt, Disco Queen",
    artist: "Jacinto Design",
  },
  {
    name: "jacinto-4",
    displayName: "Electric Chill Machine",
    artist: "Jacinto Design",
  },
];

let isPlaying = false;

function playSong() {
  isPlaying = true;
  playBtn.classList.replace("fa-play", "fa-pause");
  playBtn.setAttribute("title", "Pause");
  music.play();
}

function pauseSong() {
  isPlaying = false;
  playBtn.classList.replace("fa-pause", "fa-play");
  playBtn.setAttribute("title", "Play");
  music.pause();
}

playBtn.addEventListener("click", () => (isPlaying ? pauseSong() : playSong()));

function loadSong(song) {
  title.textContent = song.displayName;
  artist.textContent = song.artist;
  music.src = `music/${song.name}.mp3`;
  image.src = `img/${song.name}.jpg`;
}

let songIndex = 0;

function prevSong() {
  songIndex--;
  if (songIndex < 0) {
    songIndex = songs.length - 1;
  }
  loadSong(songs[songIndex]);
  playSong();
}

function nextSong() {
  songIndex++;
  if (songIndex > songs.length - 1) {
    songIndex = 0;
  }
  loadSong(songs[songIndex]);
  playSong();
}

function updateProgressBar(e) {
  if (isPlaying) {
    const { duration, currentTime } = e.srcElement;
    const progressPercent = (currentTime / duration) * 100;
    progress.style.width = `${progressPercent}%`;

    // total time
    const mnts = Math.floor(duration / 60);
    let secs = Math.floor(duration % 60);
    if (secs < 10) {
      secs = `0${secs}`;
    }
    if (secs) {
      durationEl.textContent = `${mnts}:${secs}`;
    }

    // current time
    const currmnts = Math.floor(currentTime / 60);
    let currsecs = Math.floor(currentTime % 60);
    if (currsecs < 10) {
      currsecs = `0${currsecs}`;
    }
    if (currsecs) {
      currentTimeEl.textContent = `${currmnts}:${currsecs}`;
    }
  }
}

function setProgressBar(e) {
  const width = this.clientWidth;
  const clickX = e.offsetX;
  const { duration } = music;
  music.currentTime = (clickX / width) * duration;
}

prevBtn.addEventListener("click", prevSong);
nextBtn.addEventListener("click", nextSong);
music.addEventListener("ended", nextSong);
music.addEventListener("timeupdate", updateProgressBar);
progressContainer.addEventListener("click", setProgressBar);
