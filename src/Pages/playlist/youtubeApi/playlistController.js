// cac nut chuc nang
import { loadVideo } from "./youtubePlayer";
import { playerStore } from "./playerStore";

export function playIndex(index) {
  playerStore.currentIndex = index;
  loadVideo(playerStore.playList[index].videoId);
}
