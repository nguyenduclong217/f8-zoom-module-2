// cac nut chuc nang
import { loadVideo, loadVideo3 } from "./youtubePlayer";
import { playerStore } from "./playerStore";

export function playIndex(index) {
  playerStore.currentIndex = index;
  loadVideo(playerStore.playList[index].videoId);
}

export function nextSong() {
  const { playList } = playerStore;
  if (!playList || !playList.length) return;

  playerStore.currentIndex++;
  if (playerStore.currentIndex >= playList.length) {
    playerStore.currentIndex = 0; // quay về đầu
  }

  const nextVideo = playList[playerStore.currentIndex];
  loadVideo3(nextVideo.videoId);
}

export function prevSong() {
  const { playList } = playerStore;
  if (!playList || !playList.length) return;

  playerStore.currentIndex--;
  if (playerStore.currentIndex < 0) {
    playerStore.currentIndex = playList.length - 1; // quay về cuối
  }

  const prevVideo = playList[playerStore.currentIndex];
  loadVideo3(prevVideo.videoId);
}
