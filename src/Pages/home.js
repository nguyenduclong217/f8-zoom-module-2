import { router } from "../routerr";
import {
  hintApi,
  infoUser,
  musicVnApi,
  reminderAlbumApi,
  todayHitApi,
} from "../Services/auth.service";

export const Home = () => ({
  init: async function () {
    window.scrollTo({ top: 0 });
    const container = document.querySelector(".content");
    container.innerHTML = this.template();
    await Promise.all([
      this.getData(),
      this.getData2(),
      this.getData3(),
      this.getData4(),
      this.getData5(),
      this.getData6(),
    ]);
  },

  template() {
    return `
    <div class="relative ml-35 w-[87%] mt-16">
    <div class="p-3">
    <section class="mt-2">
    <h2 id="nameUser" class="text-[42px] text-white font-bold mb-4"></h2>
    <div class="hint">
    <div class="flex items-center justify-end gap-1">
    <div>
    <button class="bg-white/10 hover:bg-white/20 text-white w-8 h-8 rounded-full"><i class="fa-solid fa-chevron-left text-xs flex items-center justify-center"></i></button>
    </div>
    <div>
    <button class="bg-white/10 hover:bg-white/20 text-white w-8 h-8 rounded-full"><i class="fa-solid fa-chevron-right text-xs"></i></button>
    </div>
    </div>
    <div class ="moods flex items-center gap-3 scroll scroll-smooth">
    </div>
    </div>
    </section>

    <section class="quick-pic mt-20">
     <div class="flex items-center justify-between">
     <h2 class="text-[2rem] text-white font-bold mb-4">Quick Picks</h2>
    <div class="flex items-center justify-end gap-1">
    <div>
    <button class="bg-white/10 hover:bg-white/20 text-white w-8 h-8 rounded-full"><i class="fa-solid fa-chevron-left text-xs flex items-center justify-center"></i></button>
    </div>
    <div>
    <button class="bg-white/10 hover:bg-white/20 text-white w-8 h-8 rounded-full"><i class="fa-solid fa-chevron-right text-xs"></i></button>
    </div>
    </div>
     </div>
     <div class="list-task"></div>
    </section>

    <section class="mt-20">
    <div class="flex items-center justify-between">
     <h1 class="text-[2rem] text-white font-bold mb-4">Album gợi ý cho bạn</h1>
    <div class="flex items-center justify-end gap-1">
    <div>
    <button class="bg-white/10 hover:bg-white/20 text-white w-8 h-8 rounded-full"><i class="fa-solid fa-chevron-left text-xs flex items-center justify-center"></i></button>
    </div>
    <div>
    <button class="bg-white/10 hover:bg-white/20 text-white w-8 h-8 rounded-full"><i class="fa-solid fa-chevron-right text-xs"></i></button>
    </div>
    </div>
     </div>
     <div class="list-albums flex items-center gap-2 overflow-x-auto scrollbar-hide scroll-smooth p-4">
     </div>
    </section>

    <section class ="mt-20">
     <div class="flex items-center justify-between">
     <h1 class="text-[2rem] text-white font-bold mb-4">Today's Hits</h1>
    <div class="flex items-center justify-end gap-1">
    <div>
    <button class="bg-white/10 hover:bg-white/20 text-white w-8 h-8 rounded-full"><i class="fa-solid fa-chevron-left text-xs flex items-center justify-center"></i></button>
    </div>
    <div>
    <button class="bg-white/10 hover:bg-white/20 text-white w-8 h-8 rounded-full"><i class="fa-solid fa-chevron-right text-xs"></i></button>
    </div>
    </div>
     </div>
     <div class=" flex gap-2 overflow-x-auto scrollbar-hide scroll-smooth p-4">
     </div>
    </section>

    <section class ="mt-20">
     <div class="flex items-center justify-between">
     <h1 class="text-[2rem] text-white font-bold mb-4">Nhạc Việt</h1>
    <div class="flex items-center justify-end gap-1">
    <div>
    <button class="bg-white/10 hover:bg-white/20 text-white w-8 h-8 rounded-full"><i class="fa-solid fa-chevron-left text-xs flex items-center justify-center"></i></button>
    </div>
    <div>
    <button class="bg-white/10 hover:bg-white/20 text-white w-8 h-8 rounded-full"><i class="fa-solid fa-chevron-right text-xs"></i></button>
    </div>
    </div>
     </div>
     <div class="musicVn flex gap-2 overflow-x-auto scrollbar-hide scroll-smooth p-4">
     </div>
    </section>
    </div>
    </div>
    
    
    `;
  },

  async getData() {
    const data = await hintApi();
    this.renderTask(data);
  },
  renderTask(tasks) {
    const postListEl = document.querySelector(".list-task");
    if (!postListEl) return;
    postListEl.innerHTML = tasks
      .map(
        (task) => `
      <a href="playlists/details/${task.slug}" data-navigo class="group w-[30%] hover:bg-white/10 rounded-lg mt-0 transition cursor-pointer flex shrink-0">
      <div class="p-2 flex items-center gap-3">
      <div class="relative overflow-hidden">
      <img src="${task.thumbnails}" alt="img" class="w-[48px] h-[48px] rounded-sm">
      <div class="overlay absolute inset-0 flex bg-black/50 justify-center opacity-0 group-hover:opacity-100 transition">
      <span class="play text-[1.3rem] text-white/60 flex items-center"><i class="fa-regular fa-circle-play"></i></span>
    </div>
      </div>

      <div>
      <p class="text-sm text-white font-semibold">${task.title}</p>
      <div>
      <span class="text-sm text-white/40">${task.artists} -</span>
      <span  class="text-sm text-white/40">${task.popularity} lượt nghe</span>
      </div>
      </div>
      </div>
      </a>
   `
      )
      .join("");
    router.updatePageLinks();
  },

  // Album gợi ý cho bạn
  async getData2() {
    const data = await reminderAlbumApi();
    this.renderTask2(data);
  },
  renderTask2(tasks) {
    const taskListEl = document.querySelector(".list-albums");
    if (!taskListEl) return;
    taskListEl.innerHTML = tasks
      .map(
        (task) =>
          `<a href="albums/details/${task.slug}" data-navigo class="group hover:bg-white/10 rounded-lg mt-0 transition cursor-pointer flex shrink-0">
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
  // Today's Hits
  async getData3() {
    const data = await todayHitApi();
    this.renderTask3(data);
  },
  renderTask3(tasks) {
    const taskListEl = document.querySelector(".today-albums");
    if (!taskListEl) return;
    taskListEl.innerHTML = tasks
      .map(
        (task) =>
          `
      <a href="playlists/details/${task.slug}" data-navigo class="group hover:bg-white/10 rounded-lg mt-0 transition cursor-pointer flex shrink-0 w-[230px]  ">
      <div class="p-1">
      <div class="relative overflow-hidden rounded-[12px] w-[220px] h-[220px]">
      <img src="${task.thumbnails}" alt="img" class=" w-full h-full object-cover">
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

  // musicVn
  async getData4() {
    const data = await hintApi();
    this.renderTask4(data);
  },
  renderTask4(tasks) {
    const taskListEl = document.querySelector(".musicVn");
    if (!taskListEl) return;
    taskListEl.innerHTML = tasks
      .map(
        (task) =>
          `
      <a href="playlists/details/${task.slug}" data-navigo class="group hover:bg-white/10 rounded-lg mt-0 transition cursor-pointer flex shrink-0 w-[230px]  ">
      <div class="p-1">
      <div class="relative overflow-hidden rounded-[12px] w-[220px] h-[220px]">
      <img src="${task.thumbnails}" alt="img" class=" w-full h-full object-cover">
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
  async getData5() {
    const data = await musicVnApi();
    this.renderTask5(data.items);
  },
  renderTask5(tasks) {
    const taskListEl = document.querySelector(".moods");
    if (!taskListEl) return;
    taskListEl.innerHTML = tasks
      .map(
        (task) =>
          `
     <a href="/moods/${task.slug}" data-navigo class="flex justify-center items-center px-3 py-2 rounded-lg text-sm cursor-pointer bg-white/10 hover:bg-white/20 text-white" > ${task.name}</a>
    `
      )
      .join("");
    router.updatePageLinks();
    this.active();
  },

  async getData6() {
    const nameUser = document.querySelector("#nameUser");
    if (!nameUser) return;

    const data = await infoUser();
    if (!data) {
      nameUser.textContent = "Khách";
      return;
    }

    const name = data.name;
    nameUser.textContent = `👋 Chào mừng ${name}`;
  },
  active() {
    document.addEventListener("click", (e) => {
      console.log("1");
      const link = e.target.closest("a[data-navigo]");
      if (!link) return;

      window.scroll({
        top: 0,
        behavior: "smooth",
      });
    });
    true;
  },
});
