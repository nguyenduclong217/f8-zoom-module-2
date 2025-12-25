import { list_moods, newAlbums, newVideos } from "../Services/auth.service";
import { router } from "../routerr";
export const khamPha = () => ({
  init: async function () {
    const container = document.querySelector(".content");
    container.innerHTML = this.template();
    await Promise.all([this.getData(), this.getData2(), this.getData3()]);
  },
  template() {
    return `
    <div class ="relative mt-16 ml-35 w-[87%]">
    <section class="flex mt-15 gap-9">
    <a href="/new-releases" data-navigo class="flex items-center gap-3 px-5 py-5 bg-white/10 rounded-xl text-md font-bold text-white hover:bg-white/20 transition cursor-pointer w-[30%]">
    <i class="fa-solid fa-compact-disc text-2xl"></i>
    <span>Bản phát hành mới </span>
    </a>

    <a href="/charts" data-navigo class="flex w-[30%] items-center gap-3 px-5 py-5 bg-white/10 rounded-xl text-md font-bold text-white hover:bg-white/20 transition cursor-pointer">
    <i class="fa-solid fa-chart-line text-2xl"></i>
    <span>Bảng xếp hạng </span>
    </a>

    <a href="/moods-and-genres" data-navigo class="flex items-center w-[33%] gap-3 px-5 py-5 bg-white/10 rounded-xl text-md font-bold text-white hover:bg-white/20 transition cursor-pointer">
    <i class="fa-regular fa-face-smile text-2xl"></i>
    <span>Tâm trạng và thể loại</span>
    </a>
    </section>

    <section class="mt-20">
    <div class="flex items-center justify-between">
     <h1 class="text-[2rem] text-white font-bold mb-4">Khám phá Albums mới</h1>
    <div class="flex items-center justify-end gap-1">
    <div>
    <button class="bg-white/10 hover:bg-white/20 text-white w-8 h-8 rounded-full"><i class="fa-solid fa-chevron-left text-xs flex items-center justify-center"></i></button>
    </div>
    <div>
    <button class="bg-white/10 hover:bg-white/20 text-white w-8 h-8 rounded-full"><i class="fa-solid fa-chevron-right text-xs"></i></button>
    </div>
    </div>
     </div>
      <div class="newAlbum flex gap-2 overflow-x-auto scrollbar-hide scroll-smooth p-4"> </div>
    </section>

    <section class="mt-20">
    <div class="flex items-center justify-between">
     <h1 class="text-[2rem] text-white font-bold mb-4">Tâm trạng và thể loại</h1>
    <div class="flex items-center justify-end gap-1">
    <div>
    <button class="bg-white/10 hover:bg-white/20 text-white w-8 h-8 rounded-full"><i class="fa-solid fa-chevron-left text-xs flex items-center justify-center"></i></button>
    </div>
    <div>
    <button class="bg-white/10 hover:bg-white/20 text-white w-8 h-8 rounded-full"><i class="fa-solid fa-chevron-right text-xs"></i></button>
    </div>
    </div>
     </div>
      <div class="list-moods flex gap-2 overflow-x-auto scrollbar-hide scroll-smooth p-4"> </div>
    </section>

     <section class="my-20">
        <div class="flex items-center justify-between">
         <h1 class="text-[2rem] text-white font-bold mb-4">Khám phá Albums mới</h1>
        <div class="flex items-center justify-end gap-1">
        <div>
        <button class="bg-white/10 hover:bg-white/20 text-white w-8 h-8 rounded-full"><i class="fa-solid fa-chevron-left text-xs flex items-center justify-center"></i></button>
        </div>
        <div>
        <button class="bg-white/10 hover:bg-white/20 text-white w-8 h-8 rounded-full"><i class="fa-solid fa-chevron-right text-xs"></i></button>
        </div>
        </div>
         </div>
          <div class="newVideo flex gap-2 overflow-x-auto scrollbar-hide scroll-smooth p-4"> </div>
        </section>
    </div>
    `;
  },
  async getData() {
    const data = await newAlbums();
    this.renderTask(data.items);
  },
  renderTask(tasks) {
    const taskListEl = document.querySelector(".newAlbum");
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
        <p class="text-sm text-white/40">${task.albumType} </p>
        </div>
        </div>
        </a>
        `
      )
      .join("");
    router.updatePageLinks();
  },
  async getData2() {
    const data = await newVideos();
    this.renderTask2(data.items);
  },
  renderTask2(tasks) {
    const taskListEl = document.querySelector(".newVideo");
    taskListEl.innerHTML = tasks
      .map((task) => {
        const viewK = Math.floor(task.views / 1000);
        return `
        <a href="/videos/details/${task.id}" data-navigo class="group hover:bg-white/10 rounded-lg mt-0 transition cursor-pointer flex shrink-0 w-[230px]  ">
        <div class="p-1">
        <div class="relative overflow-hidden rounded-[12px] w-[220px] h-[220px]">
        <img src="${task.thumb}" alt="img" class=" w-full h-full object-cover">
        <div class="overlay absolute inset-0 flex bg-black/50 justify-center opacity-0 group-hover:opacity-100 transition">
        <span class="play text-[1.3rem] text-white/60 flex items-center"><i class="fa-regular fa-circle-play"></i></span>
      </div>
  
        </div>
  
        <div class="mt-2">
        <h3 class="text-sm text-white font-semibold">${task.name}</h3>
        <p class="text-sm text-white/40">${viewK} N lượt xem</p>
        </div>
        </div>
        </a>
        `;
      })
      .join("");
    router.updatePageLinks();
  },
  // moods
  async getData3() {
    const data = await list_moods();

    const items = [
      ...data.categories.map((item) => ({ ...item, type: "category" })),
      ...data.lines.map((item) => ({ ...item, type: "line" })),
    ];
    // const items = data.categories;

    const columns = this.chuckArray(items, 4);
    this.renderMoods(columns);
  },
  chuckArray(arr, size) {
    const result = [];
    for (let i = 0; i < arr.length; i += size) {
      result.push(arr.slice(i, i + size));
    }
    return result;
  },

  renderMoods(columns) {
    const el = document.querySelector(".list-moods");
    if (!el) return;

    el.innerHTML = `
    <div class ="flex gap-6 overflow-x-auto py-4">
    ${columns
      .map(
        (col) =>
          `
        <div class="flex flex-col gap-3 min-w-[180px]">
        ${col.map((item) => this.renderItem(item)).join("")}
        </div>
        `
      )
      .join("")}
    </div>
    `;
    router.updatePageLinks();
    this.bindEvents();
  },
  renderItem(item) {
    if (item.type === "category") {
      return `
      <a href="/categories/${item.slug}" 
        data-id="${item.id}"
        data-type="category"
        class="px-3 py-2 rounded-lg bg-white/10 hover:bg-white/20 
               text-white text-sm cursor-pointer">
        ${item.name}
      </a>
    `;
    }

    return `
    <div 
      data-id="${item.id}"
      data-type="line"
      class="px-3 py-2 rounded-lg bg-white/10 hover:bg-white/20 
               text-white text-sm cursor-pointer">
      ${item.name}
    </div>
  `;
  },
  bindEvents() {
    document.querySelector(".list-moods").addEventListener("click", (e) => {
      const item = e.target.closest("[data-id]");
      if (!item) return;

      const id = item.dataset.id;
      const type = item.dataset.type;
    });
  },
});
