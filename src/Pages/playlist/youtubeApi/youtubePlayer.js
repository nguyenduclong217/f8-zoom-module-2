// tao va dieu kien player

let player = null;
let isReady = false;
let currentState = null;

export function createPlayer(elId, videoId) {
  player = new YT.Player(elId, {
    videoId,
    events: {
      onReady: () => {
        console.log("Player ready");
        isReady = true;
        document.dispatchEvent(new Event("player-ready"));
      },
      onStateChange: onStateChange,
    },
  });
}
export function loadVideo3(videoId) {
  if (!isReady || !player) return;
  player.loadVideoById(videoId);
  player.playVideo();
}
export function play() {
  player?.playVideo();
}

export function pause() {
  player?.pauseVideo();
}

export function changeVolume() {
  player?.setVolume();
}

// tat tieng
export function mute() {
  if (!isReady || !player) {
    player.mute();
  }
}

export function toggleMute() {
  if (!isReady || !player) return;

  if (player.isMuted()) {
    player.unMute();
  } else {
    player.mute();
  }
}

// Bat tieng
export function unMute() {
  if (!isReady || !player) {
    player.unMute();
  }
}

export function isMute() {
  if (!player) return;
  return player.isMuted();
}
// thoi gian chay video

export function getCurrentTime() {
  if (!player || !isReady) return 0;

  return player.getCurrentTime();
}

export function getDuration() {
  if (!player || !isReady) return 0;
  return player.getDuration();
}

export function timeUpdate() {
  if (!player || !isReady) return 0;
  if (!duration) return 0;
  // console.log(player.getDuration());
  return player.getCurrentTime() / player.getDuration();
}

// thoi gian chay
export function seekTo(time) {
  if (!player || !isReady) return;
  player.seekTo(time, true);
}
export function loadVideo(id) {
  player?.loadVideoById(id);
}

export function onStateChange(e) {
  currentState = e.data;
  if (e.data === YT.PlayerState.ENDED) nextSong();
  console.log("State:", e.data);
}

export function getCurrentState() {
  return currentState;
}
