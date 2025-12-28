import { router } from "../../routerr";
import { videoPage1 } from "../../Services/auth.service";
import { playerStore } from "./youtubeApi/playerStore";
import { nextSong, prevSong } from "./youtubeApi/playlistController";
import {
  createPlayer,
  getCurrentState,
  getCurrentTime,
  getDuration,
  isMute,
  loadVideo3,
  pause,
  play,
  seekTo,
  timeUpdate,
  toggleMute,
} from "./youtubeApi/youtubePlayer";
export const videoPage = (id) => ({
  async init() {
    window.scrollTo({ top: 0 });
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
    const playList = data.related;
    const playListVideos = [data, ...playList];
    console.log(playListVideos);
    playerStore.playList = playListVideos;
    const pageLeft = document.querySelector("#page-left");
    pageLeft.innerHTML = `
      <div id="video-container"></div>
      <div class="mt-4 w-[100%]">
      <div>
      <h1 id="title" class="text-center text-white font-semibold text-[1.7rem]"></h1>
      <p class="text-center text-white font-semibold" >Không rõ</p>
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
        <div>
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
      <div class="flex justify-between w-[100%] mb-7">
      <span id="current-time">0:00</span>
       <span id="duration">0:00</span>
      </div>
      </div>
    </div>
      `;
    this.updateVideoInfo();
    //Page-right
    // if (window.YT && window.YT.Player) {
    //   createPlayer(
    //     "video-container",
    //     playListVideos[playerStore.currentIndex].videoId
    //   );
    // }

    document.addEventListener("player-ready", () => {
      startProgress();
      setupPlayBtn();
      setupNextBtn();
      setupVolumeBtn();
    });

    function setupPlayBtn() {
      const playBtn = document.querySelector("#playBtn");
      playBtn.addEventListener("click", () => {
        const states = getCurrentState();
        if (states === YT.PlayerState.PLAYING) {
          pause();
          playBtn.innerHTML = `<i class="fa-solid fa-play text-[20px]"></i>`;
        } else {
          play();
          playBtn.innerHTML = `<i class="fa-solid fa-pause text-3xl"></i>`;
        }
      });
    }

    function setupVolumeBtn() {
      const btnVolume = document.querySelector("#volume");
      btnVolume.addEventListener("click", () => {
        toggleMute();
        if (isMute()) {
          btnVolume.innerHTML = `<i class="fa-solid fa-volume-xmark"></i>`;
        } else {
          btnVolume.innerHTML = `<i class="fa-solid fa-volume-high"></i>`;
        }
      });
    }

    function startProgress() {
      const currentTime = document.querySelector("#current-time");
      const durationTime = document.querySelector("#duration");
      const progressFill = document.querySelector("#progressFill");
      const progressBar = document.getElementById("progressBar");

      let isDragging = false;

      const getPercent = (e) => {
        const rect = progressBar.getBoundingClientRect();
        let x = e.clientX - rect.left;
        x = Math.max(0, Math.min(x, rect.width));
        return x / rect.width;
      };

      function updateProgress() {
        if (!isDragging) {
          const current = getCurrentTime();
          const duration = getDuration();
          const percent = duration ? (current / duration) * 100 : 0;
          progressFill.style.width = percent + "%";
          currentTime.textContent = formatTime(current);
          durationTime.textContent = formatTime(duration);
        }
        requestAnimationFrame(updateProgress);
      }
      updateProgress();

      progressBar.addEventListener("mousedown", (e) => {
        isDragging = true;
        pause();
        const percent = getPercent(e);
        const time = percent * getDuration();
        progressFill.style.width = percent * 100 + "%";
        currentTime.textContent = formatTime(time);
      });

      document.addEventListener("mousemove", (e) => {
        if (!isDragging) return;
        const percent = getPercent(e);
        const time = percent * getDuration();
        progressFill.style.width = percent * 100 + "%";
        currentTime.textContent = formatTime(time);
      });

      document.addEventListener("mouseup", (e) => {
        if (!isDragging) return;
        isDragging = false;
        const percent = getPercent(e);
        const time = percent * getDuration();
        seekTo(time);
        play();
        progressFill.style.width = percent * 100 + "%";
        currentTime.textContent = formatTime(time);
      });
    }
    const song = videoPage(id);
    function setupNextBtn() {
      const nextBtn = document.querySelector("#next-right");
      nextBtn.addEventListener("click", () => {
        console.log("1");
        nextSong();
        song.updateActiveSong();
        song.updateVideoInfo();
      });

      const prevBtn = document.querySelector("#next-left");
      prevBtn.addEventListener("click", () => {
        prevSong();
        song.updateActiveSong();
        song.updateVideoInfo();
      });
    }
    // Xac nhan co du lieu hay khong
    const video = playListVideos[playerStore.currentIndex];
    this.renderTask(playListVideos);
    if (video.videoId && window.YT && window.YT.Player) {
      createPlayer("video-container", video.videoId);
    } else {
      this.renderEmptyPlayer();
    }

    function formatTime(seconds) {
      const h = Math.floor(seconds / 3600);
      const m = Math.floor((seconds % 3600) / 60);
      const s = Math.floor(seconds % 60);
      if (h > 0) {
        return `${h}:${m.toString().padStart(2, "0")}:${s
          .toString()
          .padStart(2, "0")}`;
      }

      return `${m}:${s.toString().padStart(2, "0")}`;
    }
  },
  playVideo(videoId) {
    loadVideo3(videoId);
  },

  renderTask(tasks) {
    const pageRight = document.querySelector("#page-right");
    if (!pageRight) return;

    function formatTime(seconds) {
      const h = Math.floor(seconds / 3600);
      const m = Math.floor((seconds % 3600) / 60);
      const s = Math.floor(seconds % 60);
      if (h > 0) {
        return `${h}:${m.toString().padStart(2, "0")}:${s
          .toString()
          .padStart(2, "0")}`;
      }

      return `${m}:${s.toString().padStart(2, "0")}`;
    }
    sessionStorage.setItem("allowAutoPlay", "true");
    pageRight.innerHTML = tasks
      .map(
        (task, index) => `
         <div data-navigo 
    data-video-id="${task.videoId}" data-index="${index}"
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
    <span class="text-xs text-white/40">${formatTime(task.duration)}</span>
  </div>
  
      `
      )
      .join("");
    router.updatePageLinks();
    this.updateActiveSong();
    pageRight.addEventListener("click", (e) => {
      const item = e.target.closest("[data-video-id]");
      if (!item) return;

      e.preventDefault();

      const videoId = item.dataset.videoId;
      this.playVideo(videoId);
      document.querySelectorAll("#page-right [data-index]").forEach((el) => {
        el.classList.remove("bg-white/10");
      });
      item.classList.add("bg-white/10");
    });
  },
  updateActiveSong() {
    const items = document.querySelectorAll(".group");

    items.forEach((el) => {
      const index = Number(el.dataset.index);

      if (index === playerStore.currentIndex) {
        el.classList.add("bg-white/10");
      } else {
        el.classList.remove("bg-white/10");
      }
    });
  },
  updateVideoInfo() {
    const titleEl = document.querySelector("#title");
    if (!titleEl) return;
    titleEl.textContent = playerStore.playList[playerStore.currentIndex].title;
  },
  renderEmptyPlayer() {
    const container = document.querySelector("#video-container");
    if (!container) return;

    container.innerHTML = `
    <div class="w-full h-[360px] flex items-center justify-center text-white/60 bg-black/30 rounded-xl">
      <p>Bài hát này không có video 🎵</p>
    </div>
  `;
  },
});
