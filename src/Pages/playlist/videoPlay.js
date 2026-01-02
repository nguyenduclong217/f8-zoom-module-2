import { playerStore } from "./youtubeApi/playerStore";
import { nextSong, prevSong } from "./youtubeApi/playlistController";
import {
  getCurrentState,
  getCurrentTime,
  getDuration,
  getVolume,
  isMute,
  pause,
  play,
  seekTo,
  setVolume,
  toggleMute,
} from "./youtubeApi/youtubePlayer";

export const playVideo = () => ({
  init() {
    const container = document.querySelector("#playBarVideo");
    console.log(container);
    container.innerHTML = this.template();
    this.play();
  },

  template() {
    return `
      <div class="flex-1">
          <div id="progressBar1" class="w-full h-2 bg-gray-700 rounded cursor-pointer relative select-none">
            <div id="progressFill1" class="h-2 bg-red-500 rounded w-0"></div>
          </div>
        </div>
      </div>
      <div class ="w-full p-2">
      <div class="flex items-center h-12 px-4 w-full justify-between">

        <!-- LEFT -->
        <div class="flex items-center gap-2 ">
          <button id="next-left1" class="w-10 h-10 hover:bg-white/20 rounded-full"><i class="fa-solid fa-backward-step"></i></button>
          <button id="play" class="w-10 h-10 hover:bg-white/20 rounded-full flex justify-center items-center">
          <i class="fa-solid fa-pause text-3xl"></i>    
          </button >
          <button id ="next-right1" class="w-10 h-10 hover:bg-white/20 rounded-full"><i class="fa-solid fa-forward-step"></i></button>
          <div class="flex justify-between text-xs mt-1 text-gray-400">
            <span id="currentTime1">0:00</span> /
            <span id="duration1">0:00</span>
          </div>
        </div>

        <!-- CENTER -->
        <div class="flex items-center gap-3 justify-center min-w-0">
          <img id="videoImg" src="" class="w-9 h-9 rounded object-cover" />
          <div class="min-w-0 text-center">
            <div  id="videoTitle" class="text-sm truncate"></div>
            <div class="text-xs text-white/70 truncate">Không rõ nghệ sĩ</div>
          </div>
          <div class="flex items-center gap-3 ml-4">
            <button class="w-10 h-10 hover:bg-white/20 rounded-full"><i class="fa-regular fa-message"></i></button>
            <button class="w-10 h-10 hover:bg-white/20 rounded-full"><i class="fa-regular fa-thumbs-up"></i></button>
            <div class ="navbar relative">
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
            </div>
          </div>
        </div>

        <!-- RIGHT -->
        <div class="flex items-center justify-end">
        <div class="flex justify-center items-center gap-2">
        <div id="progressVolume1" class=" h-2 bg-gray-700 rounded cursor-pointer relative select-none w-[80px]">
          <div id="progressFillVolume1" class="h-2 bg-green-500 rounded w-0 flex item-center relative"></div>
        </div>
        <button id="volume1" class="w-10 h-10 hover:bg-white/20 rounded-full"><i class="fa-solid fa-volume-high"></i></button>
        </div>
          <button id="loop" class="w-10 h-10 hover:bg-white/20 rounded-full"><i class="fa-solid fa-repeat"></i></button>
          <button  class="w-10 h-10 hover:bg-white/20 rounded-full"><i class="fa-solid fa-shuffle"></i></button>
        </div>

      </div></div>
      `;
  },

  play() {
    this.imgEl = document.querySelector("#videoImg");
    this.titleEl = document.querySelector("#videoTitle");
    const progressFill = document.querySelector("#progressFill1");
    const currentTime = document.querySelector("#currentTime1");
    const durationTime = document.querySelector("#duration1");
    const progressBar = document.getElementById("progressBar1");
    const volume = document.querySelector("#volume1");
    const btnLoop = document.querySelector("#loop");
    const btnLeft = document.querySelector("#next-left1");
    const btnRight = document.querySelector("#next-right1");

    let currentVideoId = null;
    document.addEventListener("play-video", (e) => {
      const { img, title, index, videoId, playList, id } = e.detail;
      // if (currentVideoId === videoId) return;
      playerStore.playList = playList;
      playerStore.currentIndex = index;
      currentVideoId = videoId;
      this.titleEl.textContent = title;
      this.imgEl.src = img;
      this.updateVideoInfoByIndex(index);
      document.querySelectorAll(".group").forEach((el, i) => {
        el.classList.toggle("active", i === index);
      });
      document.querySelector("#playBarVideo").classList.remove("hidden");
      document.querySelector("#playBar").classList.add("hidden");
    });

    const btnAct = document.querySelector("#play");
    if (btnAct) {
      btnAct.addEventListener("click", () => {
        document.dispatchEvent(new Event("player:toggle"));
      });
    }

    document.addEventListener("player:state", (e) => {
      const btnAct = document.querySelector("#play");
      if (!btnAct) return;

      if (e.detail === "playing") {
        btnAct.innerHTML = `<i class="fa-solid fa-pause text-3xl"></i>`;
      } else {
        btnAct.innerHTML = `<i class="fa-solid fa-play text-[20px]"></i>`;
      }
    });

    // volume
    volume.addEventListener("click", () => {
      toggleMute();
      if (isMute()) {
        volume.innerHTML = `<i class="fa-solid fa-volume-high"></i>`;
      } else {
        volume.innerHTML = ` <i class="fa-solid fa-volume-xmark"></i>`;
      }
    });

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

    btnRight.addEventListener("click", () => {
      nextSong();
      this.updateActiveSong();
      this.updateVideoInfoByIndex(playerStore.currentIndex);
    });

    btnLeft.addEventListener("click", () => {
      prevSong();
      this.updateActiveSong();
      this.updateVideoInfoByIndex(playerStore.currentIndex);
    });

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

    // Xu li thanh keo
    // ====== VOLUME YOUTUBE ======
    const progressVolume = document.querySelector("#progressVolume1");
    const barVolume = document.querySelector("#progressFillVolume1");
    const volumeBtn = document.querySelector("#volume1");

    let isDragVol = false;
    let lastVolume = getVolume(); // 0 - 100

    // init UI
    barVolume.style.width = lastVolume + "%";

    function setVolumeByEvent(e) {
      const rect = progressVolume.getBoundingClientRect();
      let percent = (e.clientX - rect.left) / rect.width;
      percent = Math.max(0, Math.min(1, percent));

      const vol = Math.round(percent * 100);

      setVolume(vol);
      barVolume.style.width = vol + "%";

      if (vol === 0) {
        volumeBtn.innerHTML = `<i class="fa-solid fa-volume-xmark"></i>`;
      } else {
        volumeBtn.innerHTML = `<i class="fa-solid fa-volume-high"></i>`;
        lastVolume = vol;
      }
    }

    // kéo volume
    progressVolume.addEventListener("mousedown", (e) => {
      isDragVol = true;
      setVolumeByEvent(e);
    });

    document.addEventListener("mousemove", (e) => {
      if (!isDragVol) return;
      setVolumeByEvent(e);
    });

    document.addEventListener("mouseup", () => {
      isDragVol = false;
    });

    // mute / unmute
    volumeBtn.addEventListener("click", () => {
      toggleMute();

      if (isMute()) {
        barVolume.style.width = "0%";
        volumeBtn.innerHTML = `<i class="fa-solid fa-volume-xmark"></i>`;
      } else {
        setVolume(lastVolume || 50);
        barVolume.style.width = (lastVolume || 50) + "%";
        volumeBtn.innerHTML = `<i class="fa-solid fa-volume-high"></i>`;
      }
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
  updateVideoInfoByIndex(index) {
    const video = playerStore.playList[index];
    if (!video) return;

    this.titleEl.textContent = video.title;
    this.imgEl.src = video.thumbnails[0];
  },
});
