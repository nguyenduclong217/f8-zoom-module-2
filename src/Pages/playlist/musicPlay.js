// import { musicPlay1 } from "./musicPlay1";

export const playMusic = () => ({
  init() {
    window.scrollTo({ top: 0 });
    const container = document.querySelector("#playBar");
    if (!container.innerHTML) {
      container.innerHTML = this.template();
    }
    this.audio = document.querySelector("#audio");
    this.play();
  },

  template() {
    return `
    <div class="flex-1">
        <div id="progressBar" class="w-full h-2 bg-gray-700 rounded cursor-pointer relative select-none">
          <div id="progressFill" class="h-2 bg-green-500 rounded w-0"></div>
        </div>
      </div>
    </div>
    <div class ="w-full p-2">
    <div class="flex items-center h-12 px-4 w-full justify-between">

      <!-- LEFT -->
      <div class="flex items-center gap-2 ">
        <button id="next-left" class="w-10 h-10 hover:bg-white/20 rounded-full"><i class="fa-solid fa-backward-step"></i></button>
        <button id="playBtn" class="w-10 h-10 hover:bg-white/20 rounded-full flex justify-center items-center">
        <i class="fa-solid fa-pause text-3xl"></i>    
        </button >
        <button id ="next-right" class="w-10 h-10 hover:bg-white/20 rounded-full"><i class="fa-solid fa-forward-step"></i></button>
        <div class="flex justify-between text-xs mt-1 text-gray-400">
          <span id="currentTime">0:00</span> /
          <span id="duration">0:00</span>
        </div>
      </div>

      <!-- CENTER -->
      <div class="flex items-center gap-3 justify-center min-w-0">
        <img id="songImg" src="" class="w-9 h-9 rounded object-cover" />
        <div class="min-w-0 text-center">
          <div  id="songTitle" class="text-sm truncate"></div>
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
      <div id="progressVolume" class=" h-2 bg-gray-700 rounded cursor-pointer relative select-none w-[80px]">
        <div id="progressFillVolume" class="h-2 bg-green-500 rounded w-0 flex item-center relative"> <span
      id="dot"
      class="absolute top-1/2 -translate-y-1/2
            w-4 h-4 bg-amber-100 rounded-full"
    ></span></div>
      </div>
      <button id="volume" class="w-10 h-10 hover:bg-white/20 rounded-full"><i class="fa-solid fa-volume-high"></i></button>
      </div>
        <button id="loop" class="w-10 h-10 hover:bg-white/20 rounded-full"><i class="fa-solid fa-repeat"></i></button>
        <button id="random" class="w-10 h-10 hover:bg-white/20 rounded-full"><i class="fa-solid fa-shuffle"></i></button>
      </div>

    </div></div>
    `;
  },

  play() {
    let playlist = [];
    let currentIndex = -1;
    const audio = this.audio;
    const imgEl = document.querySelector("#songImg");
    const titleEl = document.querySelector("#songTitle");
    const btnAct = document.querySelector("#playBtn");
    const progressFill = document.querySelector("#progressFill");
    const currentTime = document.querySelector("#currentTime");
    const durationTime = document.querySelector("#duration");
    const progressBar = document.getElementById("progressBar");
    const volume = document.querySelector("#volume");
    const btnLoop = document.querySelector("#loop");
    const btnLeft = document.querySelector("#next-left");
    const btnRight = document.querySelector("#next-right");
    const btnRandom = document.querySelector("#random");

    let currentSongId = null;
    document.addEventListener("play-music", (e) => {
      const { audioUrl, img, title, songId, index, playlist: list } = e.detail;

      if (currentSongId === songId) return;
      playlist = list || playlist;
      currentIndex = index;
      currentSongId = songId;
      audio.src = audioUrl;
      imgEl.src = img;
      titleEl.textContent = title;

      document.querySelectorAll(".song-item").forEach((el, i) => {
        el.classList.toggle("active", i === index);
      });
      document.querySelector("#playBar").classList.remove("hidden");
      document.querySelector("#playBarVideo").classList.add("hidden");
      audio.play().catch(() => {
        console.log("Browser chặn autoplay, cần user gesture");
      });
    });
    function playByIndex(index) {
      if (!playlist.length) return;
      if (index < 0 || index >= playlist.length) return;

      const song = playlist[index];

      document.dispatchEvent(
        new CustomEvent("play-music", {
          detail: {
            songId: song.id,
            audioUrl: song.audioUrl,
            img: song.thumbnails[0],
            title: song.title,
            index,
            playlist,
          },
        })
      );

      // cập nhật active
      document.querySelectorAll(".song-item").forEach((el, i) => {
        el.classList.toggle("active", i === index);
      });
    }

    btnAct.addEventListener("click", () => {
      if (!audio.src) return;
      if (audio.paused) {
        audio.play();
      } else {
        audio.pause();
      }
    });

    audio.addEventListener("play", () => {
      btnAct.innerHTML = `<i class="fa-solid fa-pause text-3xl"></i>`;
    });

    audio.addEventListener("pause", () => {
      btnAct.innerHTML = `<i class="fa-solid fa-play text-[20px]"></i>`;
    });
    // Gioi han cho thanh keo
    let isDragging = false;

    const getPercent = (e, bar) => {
      const rect = bar.getBoundingClientRect();
      let x = e.clientX - rect.left;
      x = Math.max(0, Math.min(x, rect.width)); // chan ngoai bien
      return x / rect.width;
    };

    // Tg khi chua keo
    audio.addEventListener("timeupdate", () => {
      if (isDragging || !audio.duration) return;

      const percent = (audio.currentTime / audio.duration) * 100;
      progressFill.style.width = percent + "%";
      currentTime.textContent = formatTime(audio.currentTime);
    });

    // BẮT ĐẦU KÉO
    progressBar.addEventListener("mousedown", (e) => {
      isDragging = true;
      audio.pause();
      const percent = getPercent(e, progressBar);

      progressFill.style.width = percent * 100 + "%";
      currentTime.textContent = formatTime(percent * audio.duration);
    });

    // KHI Kéo'
    document.addEventListener("mousemove", (e) => {
      e.preventDefault();
      if (!isDragging) return;
      const percent = getPercent(e, progressBar);
      const time = percent * audio.duration;

      audio.currentTime = time;

      progressFill.style.width = percent * 100 + "%";
      currentTime.textContent = formatTime(percent * audio.duration);
    });

    // Dung keo
    document.addEventListener("mouseup", (e) => {
      if (!isDragging) return;
      audio.play();
      isDragging = false;
      const percent = getPercent(e, progressBar);
      audio.currentTime = percent * audio.duration;

      progressFill.style.width = percent * 100 + "%";
      currentTime.textContent = formatTime(percent * audio.duration);
    });

    // hien thi thoi gian thuc
    audio.addEventListener("loadedmetadata", () => {
      durationTime.textContent = formatTime(audio.duration);
    });

    // thoi gian thuc
    function formatTime(seconds) {
      const m = Math.floor(seconds / 60);
      const s = Math.floor(seconds % 60);
      return `${m}:${s < 10 ? "0" : ""}${s} `;
    }

    // Chuyen bai
    btnRight.addEventListener("click", () => {
      if (currentIndex < playlist.length - 1) {
        playByIndex(currentIndex + 1);
      } else {
        playByIndex(0);
      }
    });

    btnLeft.addEventListener("click", () => {
      if (currentIndex > 0) {
        playByIndex(currentIndex - 1);
      }
    });
    btnRandom.addEventListener("click", () => {
      if (!playlist.length) return;

      const randomIndex = Math.floor(Math.random() * playlist.length);
      playByIndex(randomIndex);
    });

    audio.addEventListener("ended", () => {
      if (currentIndex < playlist.length - 1) {
        playByIndex(currentIndex + 1);
      } else {
        playByIndex(0);
      }
    });

    // xu li thanh keo volume
    const progressVolume = document.querySelector("#progressVolume");
    const barVolume = document.querySelector("#progressFillVolume");
    const span = document.querySelector("#dot");

    let isDrag = false;
    let lastVolume = 1;
    audio.volume = 1;
    audio.muted = false;
    barVolume.style.width = "100%";
    span.style.left = "98%";
    function setVolumeBtEvent(e) {
      const rest = progressVolume.getBoundingClientRect();
      let vol = (e.clientX - rest.left) / rest.width;
      vol = Math.max(0, Math.min(1, vol));
      audio.volume = vol;
      barVolume.style.width = vol * 100 + "%";
      span.style.left = vol * 95 + "%";

      if (vol === 0) {
        audio.muted = true;
        volume.innerHTML = `<i class="fa-solid fa-volume-xmark"></i>`;
      } else {
        audio.muted = false;
        lastVolume = vol;
        volume.innerHTML = `<i class="fa-solid fa-volume-high"></i>`;
      }
    }
    // click
    progressVolume.addEventListener("mousedown", (e) => {
      isDrag = true;
      setVolumeBtEvent(e);
    });
    // keo
    document.addEventListener("mousemove", (e) => {
      if (!isDrag) return;
      setVolumeBtEvent(e);
    });
    document.addEventListener("mouseup", (e) => {
      isDrag = false;
    });
    volume.addEventListener("click", () => {
      if (!audio.muted && audio.volume > 0) {
        lastVolume = audio.volume;
        audio.muted = true;
        barVolume.style.width = "0%";
        span.style.left = "0%";
        volume.innerHTML = `<i class="fa-solid fa-volume-xmark"></i>`;
      } else {
        audio.muted = false;
        audio.volume = lastVolume || 1;
        barVolume.style.width = audio.volume * 100 + "%";
        span.style.left = audio.volume * 98 + "%";
        volume.innerHTML = `<i class="fa-solid fa-volume-high"></i>`;
      }
    });

    btnLoop.addEventListener("click", () => {
      audio.loop = !audio.loop;
      btnLoop.classList.toggle("text-white");

      console.log("1");
    });
  },
});
