import { Header } from "../Components/header";
import { Nav } from "../Components/nav";

export default function defaultLayout() {
  return `
  <div id="header" class="sticky top-0 left-0 z-100 w-full bg-black">
  ${Header()}
  </div>
 <main class ="flex">
 <div class="side-bar"></div>
 <div class="content w-[100%] min-h-screen bg-[#1A1A1A]">
 </div>

 <div id="player-root" style="display:none">
    <div id="yt-player"></div>
  </div>
  <div id="mini-player"></div>
 </main>
 <div id="global-loading" class ="hidden fixed inset-0 z-[9999] bg-black/60 flex items-center justify-center">
 <div class ="w-12 h-12 border-4 border-white/30 border-t-white rounded-full animate-spin "></div>
 </div>
 <footer class="relative">
    <audio id="audio"></audio>
    <div id="playBar" class="fixed bottom-0 left-0 w-full h-20 z-50 bg-white/40 hidden"></div>
    <div id="playBarVideo" class="fixed bottom-0 left-0 w-full h-20 z-50 bg-white/40 hidden"></div>
  </footer>
    `;
}

export function renderLoading() {
  document.querySelector("#global-loading")?.classList.remove("hidden");
}

export function hideLoading() {
  document.querySelector("#global-loading")?.classList.add("hidden");
}
