import { router } from "../../routerr";
import { listItemsQuick } from "../../Services/auth.service";

export const playList1 = (mood) => ({
  init: async function () {
    window.scrollTo({ top: 0 });
    const container = document.querySelector(".content");
    container.innerHTML = this.template();
    this.slug = mood;
    this.loadQuickPicks();
  },
  template() {
    return `<div class ="relative ml-35 w-[87%] mt-16 flex justify-between ">
    <div class ="w-[45%]">
    <div id="page-left" class=" flex flex-col items-center sticky top-20">
    </div></div>
    <div id="page-right" class="w-[52%]"></div>
    </div>`;
  },
  async listItems() {
    const data = await listItemsQuick();
    console.log(data);
  },
  async loadQuickPicks() {
    const data = await listItemsQuick(this.slug);
    console.log(data);
    const totalSeconds = data.tracks.reduce(
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
    <p class="text-sm text-white/60  leading-tight text-center">
      ${data.description}
    </p>

    <p class="text-sm text-white/60 text-center">
      ${data.songCount} bài hát - ${totalTime}
    </p>

    <p class="text-sm text-white/70  text-center">
      Các nghệ sĩ:
      <span class="text-white font-medium">
        ${data.artists[0]}
      </span>
    </p>
  </div>
    `;
    //Page-right
    this.renderTask(data);
  },

  renderTask(tasks) {
    const pageRight = document.querySelector("#page-right");
    if (!pageRight) return;
    const playList = tasks.tracks;
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
       <a
  href="/songs/details/${task.id}" data-navigo
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
      ${task.artists[0]}
    </span>
  </div>
  <span class="text-xs text-white/40">${calculateTime(task.duration)}</span>
</a>

    `
      )
      .join("");
    router.updatePageLinks();
  },
});
