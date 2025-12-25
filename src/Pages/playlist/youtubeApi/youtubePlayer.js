// tao va dieu kien player

let player = null;

export function createPlayer(elId, videoId) {
  player = new YT.Player(elId, {
    videoId,
    events: {
      onReady: () => console.log("Player ready"),
      onStateChange: onStateChange,
    },
  });
}
export function loadVideo3(videoId) {
  player?.loadVideoById(videoId);
  player?.playVideo();
}
export function play() {
  player?.playVideo();
}

export function pause() {
  player?.pauseVideo();
}

export function loadVideo(id) {
  player?.loadVideoById(id);
}

function onStateChange(e) {
  console.log("State:", e.data);
}
