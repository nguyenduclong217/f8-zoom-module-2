import { listQuick, musicVnApi, playlists } from "../../Services/auth.service";

export const MoodPage = (mood) => ({
  init: async function () {
    this.mood = mood;
    this.slug = mood;

    const container = document.querySelector(".content");
    container.innerHTML = this.template();
    this.getData();
    this.getData2();
    // this.getData3();

    await this.loadQuickPicks();
  },

  template() {
    return `
    <div class="relative ml-35 w-[87%] mt-16">
     <div class ="moods flex items-center gap-3 scroll scroll-smooth"></div>
     <div class = "info mt-20"></div>

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

      <section class="quick-pic mt-20">
     <div class="flex items-center justify-between">
     <h2 class="text-[2rem] text-white font-bold mb-4">Featured</h2>
    <div class="flex items-center justify-end gap-1">
    <div>
    <button class="bg-white/10 hover:bg-white/20 text-white w-8 h-8 rounded-full"><i class="fa-solid fa-chevron-left text-xs flex items-center justify-center"></i></button>
    </div>
    <div>
    <button class="bg-white/10 hover:bg-white/20 text-white w-8 h-8 rounded-full"><i class="fa-solid fa-chevron-right text-xs"></i></button>
    </div>
    </div>
     </div>
     <div class="Featured"></div>
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
     <div class=""></div>
    </section>
    </div>
    `;
  },
  async getData() {
    const data = await musicVnApi();
    console.log(data);
    this.renderTask(data.items);
  },
  renderTask(tasks) {
    const taskListEl = document.querySelector(".moods");
    const infoList = document.querySelector(".info");
    if (!taskListEl) return;
    taskListEl.innerHTML = tasks
      .map(
        (task) =>
          `
        <a href="/moods/${task.slug}" data-navigo class="flex justify-center items-center px-3 py-2 rounded-lg text-sm cursor-pointer bg-white/10 hover:bg-white/20 text-white" > ${task.name}</a>
      `
      )
      .join("");
    if (!infoList) return;
    // LÀM SAU chưa ACTIVE
    infoList.innerHTML = `
    <h1 class="text-white text-[2.5rem] font-semibold">${this.mood}</h1>
    <p class="text-white mt-5">Curated playlists for Năng Lượng</p>
    `;
  },

  async getData2() {
    console.log("slug =", this.slug);
    const data = await listQuick(this.slug);
    console.log(data);
    this.renderTask2(data);
  },
  renderTask2(tasks) {
    const postListEl = document.querySelector(".list-task");
    if (!postListEl) return;
    postListEl.innerHTML = tasks
      .map(
        (task) => `
        <a href="#" data-navigo class="group w-[30%] hover:bg-white/10 rounded-lg mt-0 transition cursor-pointer flex shrink-0">
        <div class="p-2 flex items-center gap-3">
        <div class="relative overflow-hidden">
        <img src="${
          task.thumbnails?.[0]
        }" alt="img" class="w-[48px] h-[48px] rounded-sm">
        <div class="overlay absolute inset-0 flex bg-black/50 justify-center opacity-0 group-hover:opacity-100 transition">
        <span class="play text-[1.3rem] text-white/60 flex items-center"><i class="fa-regular fa-circle-play"></i></span>
      </div>
  
        </div>
  
        <div>
        <p class="text-sm text-white font-semibold">${task.title}</p>
        <div>
        <span class="text-sm text-white/40">${task.artists?.join(", ")} -</span>
        <span  class="text-sm text-white/40">${task.popularity} lượt nghe</span>
        </div>
        </div>
        </div>
        </a>
     `
      )
      .join("");
  },

  // async getData3() {
  //   const data = await todayHitApi();
  //   this.renderTask3(data);
  // },
  // renderTask3(tasks) {
  //   const taskListEl = document.querySelector(".Featured");
  //   if (!taskListEl) return;
  //   taskListEl.innerHTML = tasks
  //     .map(
  //       (task) =>
  //         `
  //       <a href="#" data-navigo class="group hover:bg-white/10 rounded-lg mt-0 transition cursor-pointer flex shrink-0 w-[230px]  ">
  //       <div class="p-1">
  //       <div class="relative overflow-hidden rounded-[12px] w-[220px] h-[220px]">
  //       <img src="${task.thumbnails}" alt="img" class=" w-full h-full object-cover">
  //       <div class="overlay absolute inset-0 flex bg-black/50 justify-center opacity-0 group-hover:opacity-100 transition">
  //       <span class="play text-[1.3rem] text-white/60 flex items-center"><i class="fa-regular fa-circle-play"></i></span>
  //     </div>

  //       </div>

  //       <div class="mt-2">
  //       <h3 class="text-sm text-white font-semibold">${task.title}</h3>
  //       <p class="text-sm text-white/40">${task.artists} </p>
  //       </div>
  //       </div>
  //       </a>
  //       `
  //     )
  //     .join("");
  // },
  // async getData4() {
  //   const data = await todayHitApi();
  //   this.renderTask3(data);
  // },
  // renderTask4(tasks) {
  //   const taskListEl = document.querySelector(".More picks");
  //   if (!taskListEl) return;
  //   taskListEl.innerHTML = tasks
  //     .map(
  //       (task) =>
  //         `
  //       <a href="#" data-navigo class="group hover:bg-white/10 rounded-lg mt-0 transition cursor-pointer flex shrink-0 w-[230px]  ">
  //       <div class="p-1">
  //       <div class="relative overflow-hidden rounded-[12px] w-[220px] h-[220px]">
  //       <img src="${task.thumbnails}" alt="img" class=" w-full h-full object-cover">
  //       <div class="overlay absolute inset-0 flex bg-black/50 justify-center opacity-0 group-hover:opacity-100 transition">
  //       <span class="play text-[1.3rem] text-white/60 flex items-center"><i class="fa-regular fa-circle-play"></i></span>
  //     </div>

  //       </div>

  //       <div class="mt-2">
  //       <h3 class="text-sm text-white font-semibold">${task.title}</h3>
  //       <p class="text-sm text-white/40">${task.artists} </p>
  //       </div>
  //       </div>
  //       </a>
  //       `
  //     )
  //     .join("");
  // },
  async loadQuickPicks() {
    const data = await listQuick({ mood: this.mood });
    // console.log("Quick picks:", data);
  },
});
