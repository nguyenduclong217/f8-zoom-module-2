import { router } from "../../routerr";
import { videoPage1 } from "../../Services/auth.service";
import { loadYoutubeApi } from "./youtubeApi/loadYoutubeApi";
import { createPlayer, loadVideo3 } from "./youtubeApi/youtubePlayer";
export const videoPage = (id) => ({
  async init() {
    const container = document.querySelector(".content");
    container.innerHTML = this.template();
    this.id = id;
    await this.loadQuickPicks();
  },

  template() {
    return `
    <div class ="relative ml-35 w-[87%] mt-12 flex justify-between ">
    <div class ="w-[63%]">
    <div id="page-left" class=" flex flex-col items-center sticky top-20">
    </div></div>
    <div id="page-right" class="w-[35%]"></div>
    </div>
    
    `;
  },

  async loadQuickPicks() {
    const data = await videoPage1(this.id);
    console.log(data);
    const totalSeconds = data.related.reduce(
      (sum, track) => sum + track.duration,
      0
    );
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    let totalTime = "";

    if (hours > 0) {
      totalTime = `${hours} giờ ${minutes} phút`;
    } else {
      totalTime = `${minutes} phút`;
    }

    const pageLeft = document.querySelector("#page-left");
    pageLeft.innerHTML = `
      <div id="video-container"></div>
      <div class="mt-6 w-[100%]">
      <div>
      <h1>${data.title}</h1>
      <p>Không rõ</p>
      </div>

      <div class="w-[100%]">
      <div class="flex items-center gap-5 ml-4 justify-center">
      <button class="w-10 h-10 hover:bg-white/20 rounded-full"><i class="fa-solid fa-ellipsis-vertical" onclick="menu.hidden^=1"></i></button>
          <ul
    id="menu"
    class="absolute bottom-12 w-[140px]
          rounded-xl bg-neutral-800
          shadow-xl border border-neutral-700
          overflow-hidden" hidden
  >
    <li class="px-2 py-1 cursor-pointer
              hover:bg-neutral-700
              transition-colors duration-200 text-[13px]  text-white">
              Thêm vào PlayList 
    </li>

    <li class="px-2 py-1 cursor-pointer
              hover:bg-neutral-700
              transition-colors duration-200 text-[13px]  text-white">
              Chia sẻ
    </li>

    <li class="px-2 py-1 cursor-pointer
              hover:bg-neutral-700
              transition-colors duration-200 text-[13px] text-white">
              Chi tiết bài hát
    </li>
  </ul>
        <button  class="w-10 h-10 hover:bg-white/20 rounded-full"><i class="fa-solid fa-shuffle"></i></button>
     
       <button id="next-left" class="w-10 h-10 hover:bg-white/20 rounded-full"><i class="fa-solid fa-backward-step"></i></button>
        <button id="playBtn" class="w-10 h-10 hover:bg-white/20 rounded-full flex justify-center items-center">
        <i class="fa-solid fa-pause text-3xl"></i>    
        </button >
        <button id ="next-right" class="w-10 h-10 hover:bg-white/20 rounded-full"><i class="fa-solid fa-forward-step"></i></button>          
         <button id="volume" class="w-10 h-10 hover:bg-white/20 rounded-full"><i class="fa-solid fa-volume-high"></i></button>
        <button id="loop" class="w-10 h-10 hover:bg-white/20 rounded-full"><i class="fa-solid fa-repeat"></i></button>
      </div>
      </div>
       <div class="flex-1 w-[100%] mt-3">
        <div id="progressBar" class="w-full h-2 bg-gray-700 rounded cursor-pointer relative select-none">
          <div id="progressFill" class="h-2 bg-green-500 rounded w-0"></div>
        </div
      </div>
    </div>
    <div class ="w-full p-2">
    <div class="flex items-center h-12 px-4 w-full justify-between">
      <div>
      <span id="current-time">0:00</span>
       <span id="duration">0:00</span>
      </div>

      </div>
    </div>
      `;
    //Page-right

    if (window.YT && window.YT.Player) {
      createPlayer("video-container", data.videoId);
    }
    this.renderTask(data);
  },
  playVideo(videoId) {
    loadVideo3(videoId);
  },

  renderTask(tasks) {
    const pageRight = document.querySelector("#page-right");
    if (!pageRight) return;
    const playList = tasks.related;
    console.log(playList);
    function calculateTime(seconds) {
      const minutes = Math.floor(seconds / 60);
      const secs = seconds % 60;
      return `${minutes}:${secs.toString().padStart(2, "0")}`;
    }
    sessionStorage.setItem("allowAutoPlay", "true");
    pageRight.innerHTML = playList
      .map(
        (task, index) => `
         <div data-navigo 
    data-video-id="${task.videoId}"
    class="group flex items-center gap-4 px-4 py-3 rounded-lg hover:bg-white/5 transition"
  >
  
    <span class="w-6 text-sm text-white/60 text-center">${index + 1}</span>
  
    <div class="relative w-[50px] h-[50px] shrink-0 rounded-md overflow-hidden">
      <img
        src="${task.thumbnails[0]}"
        alt="img"
        class="w-full h-full object-cover"
      />
  
      <div
        class="absolute inset-0 flex items-center justify-center bg-black/50
               opacity-0 group-hover:opacity-100 transition"
      >
        <i class="fa-regular fa-circle-play text-white text-xl"></i>
      </div>
    </div>
  
  
    <div class="flex-1 min-w-0">
      <p class="text-sm font-medium text-white truncate">
        ${task.title}
      </p>
      <span class="text-xs text-white/50 truncate">
        Khong ro
      </span>
    </div>
    <span class="text-xs text-white/40">${calculateTime(task.duration)}</span>
  </div>
  
      `
      )
      .join("");
    router.updatePageLinks();
    pageRight.addEventListener("click", (e) => {
      const item = e.target.closest("[data-video-id]");
      if (!item) return;

      e.preventDefault();

      const videoId = item.dataset.videoId;
      this.playVideo(videoId);
    });
  },
  // playVideo(){

  // }
});
