import { listAlbumPlay } from "../../Services/auth.service";

export const musicPlay1 = (id) => ({
  init: async function () {
    window.scrollTo({ top: 0 });
    const container = document.querySelector(".content");
    container.innerHTML = this.template();
    this.id = id;
    this.loadQuickPicks();
    // this.playMusic();
  },
  template() {
    return `<div class ="relative ml-35 w-[87%] mt-16 flex justify-between ">
      <div class ="w-[45%]">
      <div id="page-left" class=" flex flex-col items-center sticky top-20">
      </div></div>
      <div id="page-right" class="w-[52%]"></div>
      </div>
      `;
  },
  async loadQuickPicks() {
    const data = await listAlbumPlay(this.id);
    console.log(data);
    const tracks = data.album?.tracks || [];
    const related = data.related || [];

    // Nối hai mảng
    const items = [...tracks, ...related];
    this.renderTask(items);
    const allowAutoPlay = sessionStorage.getItem("allowAutoPlay");
    if (items.length > 0 && allowAutoPlay) {
      const firstSong = items[0];
      const firstEl = document.querySelector(".song-item");
      firstEl?.classList.add("active");
      const index = 0;
      document.dispatchEvent(
        new CustomEvent("play-music", {
          detail: {
            audioUrl: firstSong.audioUrl,
            img: firstSong.thumbnails[0],
            title: firstSong.title,
            songId: firstSong.id,
            autoPlay: true,
            index,
            playlist: items,
          },
        })
      );
    }

    const totalSeconds = items.reduce((sum, track) => sum + track.duration, 0);
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
    // this.renderTask(videos);
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
      task.id
    }"
    data-audio="${task.audioUrl}"
    data-img = "${task.thumbnails[0]}"
    data-title="${task.title}"
    data-index = ${index}
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

    document.addEventListener("click", async (e) => {
      const songEl = e.target.closest(".song-item");
      if (!songEl) return;
      document.querySelector(".song-item.active")?.classList.remove("active");

      songEl.classList.add("active");
      e.preventDefault();

      const audio = document.querySelector("#audio");

      try {
        await audio.play();
      } catch (err) {
        console.log("Autoplay bị chặn", err);
      }

      document.dispatchEvent(
        new CustomEvent("play-music", {
          detail: {
            songId: songEl.dataset.id,
            audioUrl: songEl.dataset.audio,
            img: songEl.dataset.img,
            title: songEl.dataset.title,
            index: +songEl.dataset.index,
            playlist: tasks,
          },
        })
      );
    });
  },
});
