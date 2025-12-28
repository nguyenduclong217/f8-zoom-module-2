import { router } from "../../routerr";
import {
  linesAlbum,
  linesSongs,
  linesVideo,
  reminderAlbumApi,
} from "../../Services/auth.service";

// import { listCategoriesApi } from "../../Services/auth.service";

export const linesList = (mood) => ({
  init: async function () {
    window.scrollTo({ top: 0 });
    this.slug = mood;
    const container = document.querySelector(".content");
    container.innerHTML = this.template();
    this.getData();
    this.getData2();
    this.getData3();
    this.getData4();
    await this.loadQuickPicks();
  },

  template() {
    return `
    <div class="relative ml-35 w-[87%] mt-12">

    <section  class="quick-pic mt-20">
    <div class="flex items-center justify-between">
     <h2 class="title-1 text-[2rem] text-white font-bold mb-4">Bài hát</h2>
    <div class="flex items-center justify-end gap-1">
    <div>
    <button class="bg-white/10 hover:bg-white/20 text-white w-8 h-8 rounded-full"><i class="fa-solid fa-chevron-left text-xs flex items-center justify-center"></i></button>
    </div>
    <div>
    <button class="bg-white/10 hover:bg-white/20 text-white w-8 h-8 rounded-full"><i class="fa-solid fa-chevron-right text-xs"></i></button>
    </div>
    </div>
     </div>
     <div class="listSongs listSongs inline-grid
         grid-flow-col grid-rows-4
         gap-x-3 gap-y-3
         overflow-x-auto scrollbar-hide"></div>
     </section>

    <section  class="quick-pic mt-20">
    <div class="flex items-center justify-between">
     <h2 class="title-1 text-[2rem] text-white font-bold mb-4">Danh sách phát nổi bật</h2>
    <div class="flex items-center justify-end gap-1">
    <div>
    <button class="bg-white/10 hover:bg-white/20 text-white w-8 h-8 rounded-full"><i class="fa-solid fa-chevron-left text-xs flex items-center justify-center"></i></button>
    </div>
    <div>
    <button class="bg-white/10 hover:bg-white/20 text-white w-8 h-8 rounded-full"><i class="fa-solid fa-chevron-right text-xs"></i></button>
    </div>
    </div>
     </div>
     <div class="linesAlbum flex gap-2 overflow-x-auto scrollbar-hide scroll-smooth p-4"></div>
     </section>

    <section  class="quick-pic mt-20">
    <div class="flex items-center justify-between">
     <h2 class="title-1 text-[2rem] text-white font-bold mb-4">Danh sách phát nổi bật</h2>
    <div class="flex items-center justify-end gap-1">
    <div>
    <button class="bg-white/10 hover:bg-white/20 text-white w-8 h-8 rounded-full"><i class="fa-solid fa-chevron-left text-xs flex items-center justify-center"></i></button>
    </div>
    <div>
    <button class="bg-white/10 hover:bg-white/20 text-white w-8 h-8 rounded-full"><i class="fa-solid fa-chevron-right text-xs"></i></button>
    </div>
    </div>
     </div>
     <div class="linesVideos flex gap-2 overflow-x-auto scrollbar-hide scroll-smooth p-4"></div>
     </section>

     <section  class="quick-pic mt-20">
    <div class="flex items-center justify-between">
     <h2 class="title-1 text-[2rem] text-white font-bold mb-4">Đĩa nhạc</h2>
    <div class="flex items-center justify-end gap-1">
    <div>
    <button class="bg-white/10 hover:bg-white/20 text-white w-8 h-8 rounded-full"><i class="fa-solid fa-chevron-left text-xs flex items-center justify-center"></i></button>
    </div>
    <div>
    <button class="bg-white/10 hover:bg-white/20 text-white w-8 h-8 rounded-full"><i class="fa-solid fa-chevron-right text-xs"></i></button>
    </div>
    </div>
     </div>
     <div class="dvd flex gap-2 overflow-x-auto scrollbar-hide scroll-smooth p-4"></div>
     </section>
    </div>

    </div>
    `;
  },

  async loadQuickPicks() {
    const data = await linesSongs(this.slug);
    console.log("Quick picks:", data);
  },

  async getData() {
    const data = await linesSongs(this.slug);
    const listItem = data.items;
    console.log(listItem);
    if (!listItem) return;
    this.renderTask(listItem);
  },
  renderTask(tasks) {
    const taskList = document.querySelector(".listSongs");
    taskList.innerHTML = tasks
      .map(
        (task) => `<a href="/songs/details/${task.id}" data-navigo
  class="group w-[230px] h-[56px]
         flex items-center gap-3
         px-2 rounded-md
         bg-white/5 hover:bg-white/10 transition"
>
  <!-- IMAGE -->
  <div class="relative w-[48px] h-[48px] shrink-0 rounded-md overflow-hidden">
    <img
      src="${task.thumb}"
      alt="img"
      class="w-full h-full object-cover"
    />

    <!-- OVERLAY -->
    <div
      class="absolute inset-0 flex items-center justify-center
             bg-black/50 opacity-0
             group-hover:opacity-100 transition"
    >
      <span
        class="w-7 h-7 flex items-center justify-center
               rounded-full text-black text-sm
               shadow translate-y-1 opacity-0
               group-hover:translate-y-0 group-hover:opacity-100
               transition-all duration-200"
      >
        <i class="fa-regular fa-circle-play"></i>
      </span>
    </div>
  </div>

  <!-- TEXT -->
  <div class="min-w-0 flex-1">
    <p class="text-sm text-white font-medium truncate">
      ${task.name}
    </p>
    <span class="block text-xs text-white/50 truncate">
      ${task.views} lượt xem · ${task.albumName}
    </span>
  </div>
</a>

        `
      )
      .join("");
    router.updatePageLinks();
  },

  async getData2() {
    const data = await linesAlbum(this.slug);
    const listItem = data.items;
    console.log(listItem);
    this.renderTask2(listItem);
  },
  renderTask2(tasks) {
    const taskListEl = document.querySelector(".linesAlbum");
    if (!taskListEl) return;
    taskListEl.innerHTML = tasks
      .map(
        (task) =>
          `
      <a href="/albums/details/${task.slug}" data-navigo class="group hover:bg-white/10 rounded-lg mt-0 transition cursor-pointer flex shrink-0 w-[230px]  ">
      <div class="p-1">
      <div class="relative overflow-hidden rounded-[12px] w-[220px] h-[220px]">
      <img src="${task.thumb}" alt="img" class=" w-full h-full object-cover">
      <div class="overlay absolute inset-0 flex bg-black/50 justify-center opacity-0 group-hover:opacity-100 transition">
      <span class="play text-[1.3rem] text-white/60 flex items-center"><i class="fa-regular fa-circle-play"></i></span>
    </div>

      </div>

      <div class="mt-2">
      <h3 class="text-sm text-white font-semibold">${task.name}</h3>
      <p class="text-sm text-white/40">Tác giả vô danh </p>
      </div>
      </div>
      </a>
      `
      )
      .join("");
    router.updatePageLinks();
  },
  async getData3() {
    const data = await linesVideo(this.slug);
    const listItem = data.items;
    console.log(listItem);
    this.renderTask3(listItem);
  },
  renderTask3(tasks) {
    const taskListEl = document.querySelector(".linesVideos");
    if (!taskListEl) return;
    taskListEl.innerHTML = tasks
      .map(
        (task) => `
      <a href="playlists/details/${task.slug}" data-navigo class="group hover:bg-white/10 rounded-lg mt-0 transition cursor-pointer flex shrink-0 w-[230px]  ">
      <div class="p-1">
      <div class="relative overflow-hidden rounded-[12px] w-[220px] h-[220px]">
      <img src="${task.thumb}" alt="img" class=" w-full h-full object-cover">
      <div class="overlay absolute inset-0 flex bg-black/50 justify-center opacity-0 group-hover:opacity-100 transition">
      <span class="play text-[1.3rem] text-white/60 flex items-center"><i class="fa-regular fa-circle-play"></i></span>
    </div>

      </div>

      <div class="mt-2">
      <h3 class="text-sm text-white font-semibold">${task.name}</h3>
      <p class="text-sm text-white/40">Tác giả vô danh </p>
      </div>
      </div>
      </a>
      `
      )
      .join("");
    router.updatePageLinks();
  },
  async getData4() {
    const data = await reminderAlbumApi();
    console.log(data);
    this.renderTask4(data);
  },
  renderTask4(tasks) {
    const taskListEl = document.querySelector(".dvd");
    if (!taskListEl) return;
    taskListEl.innerHTML = tasks
      .map(
        (task) =>
          `<a href="/albums/details/${task.slug}" data-navigo class="group hover:bg-white/10 rounded-lg mt-0 transition cursor-pointer flex shrink-0">
        <div class="p-1 items-center gap-1">
        <div class="relative overflow-hidden rounded-[12px]">
        <img src="${task.thumbnails}" alt="img" class="w-[220px] h-[220px]">
        <div class="overlay absolute inset-0 flex bg-black/50 justify-center opacity-0 group-hover:opacity-100 transition">
        <span class="play text-[1.3rem] text-white/60 flex items-center"><i class="fa-regular fa-circle-play"></i></span>
      </div>

        </div>

        <div class="mt-2">
        <h3 class="text-sm text-white font-semibold">${task.title}</h3>
        <p class="text-sm text-white/40">${task.artists} </p>
        </div>
        </div>
        </a>

      `
      )
      .join("");
    router.updatePageLinks();
  },
});
