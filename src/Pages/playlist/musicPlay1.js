import { listAlbumPlay, listItemsQuick } from "../../Services/auth.service";

export const musicPlay1 = (id) => ({
  init: async function () {
    const container = document.querySelector(".content");
    container.innerHTML = this.template();
    this.id = id;
    this.loadQuickPicks();
    this.playMusic();
  },
  template() {
    return `<div class ="relative ml-35 w-[87%] mt-16 flex justify-between ">
    <div class ="w-[45%]">
    <div id="page-left" class=" flex flex-col items-center sticky top-20">
    </div></div>
    <div id="page-right" class="w-[52%]"></div>
    </div>
    <div class="playBar fixed bottom-0 left-0 w-full h-20 z-50 bg-white/40 hidden"></div>
    `;
  },
  async loadQuickPicks() {
    const data = await listAlbumPlay(this.id);
    console.log(data);
    const video = data.album.tracks;
    console.log(video);
    const totalSeconds = video.reduce((sum, track) => sum + track.duration, 0);
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
    <div class="w-80 h-80 rounded-xl overflow-hidden shrink-0 shadow-lg ">
    <img
      src="${data.thumbnails[0]}"
      alt="img"
      class="w-full h-full object-cover text-center"
    />
  </div>

  <div class="flex flex-col gap-2 text-white">
    <h1 class="text-2xl font-bold leading-tight text-center">
      ${data.title}
    </h1>
    <p class="text-sm text-white/60 text-center">
      Thời lượng - ${totalTime}
    </p>

  </div>
    `;
    //Page-right
    this.renderTask(video);
  },

  renderTask(tasks) {
    const pageRight = document.querySelector("#page-right");
    if (!pageRight) return;
    const playList = tasks;
    console.log(playList);
    function calculateTime(seconds) {
      const minutes = Math.floor(seconds / 60);
      const secs = seconds % 60;
      return `${minutes}:${secs.toString().padStart(2, "0")}`;
    }
    pageRight.innerHTML = playList
      .map(
        (task, index) => `
       <div
  class="song-item group flex items-center gap-4 px-4 py-3 rounded-lg hover:bg-white/5 transition cursor-pointer" data-id="${
    task.audioUrl
  }"
  data-img = "${task.thumbnails[0]}"
  data-title="${task.title}"
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
    Không có nghệ sĩ
    </span>
  </div>
  <span class="text-xs text-white/40">${calculateTime(task.duration)}</span>
</div>
    `
      )
      .join("");
    const bar = document.querySelector(".playBar");
    pageRight.addEventListener("click", (e) => {
      const songItem = e.target.closest(".song-item");
      if (!songItem) return;
      bar.classList.remove("hidden");
      const audioUrl = songItem.dataset.id;
      const img = songItem.dataset.img;
      const title = songItem.dataset.title;

      console.log(audioUrl, img, title);

      this.playMusic({ audioUrl, img, title });
    });
  },

  playMusic(items) {
    const bar = document.querySelector(".playBar");
    if (!bar) return;
    if (!items) return;
    console.log;
    bar.innerHTML = `

  <!-- 3 BLOCKS -->
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
      <button class="w-10 h-10 hover:bg-white/20 rounded-full"><i class="fa-solid fa-backward-step"></i></button>
      <button id="playBtn" class="w-10 h-10 hover:bg-white/20 rounded-full flex justify-center items-center">
       <i class="fa-solid fa-pause text-3xl"></i>    
      </button>
      <button class="w-10 h-10 hover:bg-white/20 rounded-full"><i class="fa-solid fa-forward-step"></i></button>
      <div class="flex justify-between text-xs mt-1 text-gray-400">
        <span id="currentTime">0:00</span> /
        <span id="duration">0:00</span>
      </div>
    </div>

    <!-- CENTER -->
    <div class="flex items-center gap-3 justify-center min-w-0">
      <img src="${items.img}" class="w-9 h-9 rounded object-cover" />
      <div class="min-w-0 text-center">
        <div class="text-sm truncate">${items.title}</div>
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
      <button  class="w-10 h-10 hover:bg-white/20 rounded-full"><i class="fa-solid fa-shuffle"></i></button>
    </div>

  </div></div>
  <audio id="audio" src=""></audio>

      `;
    const audio = document.querySelector("audio");
    const btnAct = document.querySelector("#playBtn");
    const progressFill = document.querySelector("#progressFill");
    const currentTime = document.querySelector("#currentTime");
    const durationTime = document.querySelector("#duration");
    const progressBar = document.getElementById("progressBar");
    const volume = document.querySelector("#volume");
    const btnLoop = document.querySelector("#loop");

    if (!audio) return;
    audio.src = items.audioUrl;
    audio.play();
    btnAct.addEventListener("click", () => {
      if (audio.paused) {
        audio.play();
        console.log("1");
        btnAct.innerHTML = `
        <i class="fa-solid fa-pause text-3xl"></i>`;
      } else {
        audio.pause();
        btnAct.innerHTML = `
        <i class="fa-solid fa-play text-[20px] "></i>`;
      }
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

    // xu li thanh keo volume
    const progressVolume = document.querySelector("#progressVolume");
    const barVolume = document.querySelector("#progressFillVolume");
    const span = document.querySelector("#dot");

    let isDrag = false;
    let lastVolume = 1;
    audio.volume = 1;
    audio.muted = false;
    barVolume.style.width = "100%";
    dot.style.left = "98%";
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
        dot.style.left = "0%";
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
