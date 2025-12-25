import { router } from "../../routerr";
import {
  categoriesApi,
  linesApi,
  newReleases,
  newVideos,
} from "../../Services/auth.service";

export const moods_and_genres = () => ({
  init: async function () {
    const container = document.querySelector(".content");
    container.innerHTML = this.template();
    await Promise.all([this.getData(), this.getData2(), this.getData3()]);
  },
  template() {
    return `
    <div class ="relative mt-16 ml-35 w-[87%]">
    
    <h1 class="text-[2.5rem] text-white font-bold mb-4">Tâm trạng và thể loại</h1>

    <section class="mt-20">
    <div class="flex items-center justify-between">
     <h1 class="text-[2rem] text-white font-bold mb-4">Dành cho bạn</h1>
    <div class="flex items-center justify-end gap-1">
    <div>
    <button class="bg-white/10 hover:bg-white/20 text-white w-8 h-8 rounded-full"><i class="fa-solid fa-chevron-left text-xs flex items-center justify-center"></i></button>
    </div>
    <div>
    <button class="bg-white/10 hover:bg-white/20 text-white w-8 h-8 rounded-full"><i class="fa-solid fa-chevron-right text-xs"></i></button>
    </div>
    </div>
     </div>
      <div class="newAlbum inline-grid grid-rows-4 grid-flow-col gap-y-2 gap-x-10
            overflow-x-auto scrollbar-hide pb-6"> </div>
    </section>


     <section class="my-20">
        <div class="flex items-center justify-between">
         <h1 class="text-[2rem] text-white font-bold mb-4">Tâm trạng và khoảng khắc</h1>
        <div class="flex items-center justify-end gap-1">
        <div>
        <button class="bg-white/10 hover:bg-white/20 text-white w-8 h-8 rounded-full"><i class="fa-solid fa-chevron-left text-xs flex items-center justify-center"></i></button>
        </div>
        <div>
        <button class="bg-white/10 hover:bg-white/20 text-white w-8 h-8 rounded-full"><i class="fa-solid fa-chevron-right text-xs"></i></button>
        </div>
        </div>
         </div>
          <div class="newVideo grid-rows-4 grid-flow-col
            gap-x-10 gap-y-3 inline-grid
            overflow-x-auto scrollbar-hide pb-6"> </div>
        </section>

     <section class="my-20">
        <div class="flex items-center justify-between">
         <h1 class="text-[2rem] text-white font-bold mb-4">Dòng nhạc</h1>
        <div class="flex items-center justify-end gap-1">
        <div>
        <button class="bg-white/10 hover:bg-white/20 text-white w-8 h-8 rounded-full"><i class="fa-solid fa-chevron-left text-xs flex items-center justify-center"></i></button>
        </div>
        <div>
        <button class="bg-white/10 hover:bg-white/20 text-white w-8 h-8 rounded-full"><i class="fa-solid fa-chevron-right text-xs"></i></button>
        </div>
        </div>
         </div>
          <div class="flowMusic
            grid grid-rows-4 grid-flow-col
            gap-x-10 gap-y-3
            overflow-x-auto scrollbar-hide pb-6"> </div>
        </section>
    </div>
    `;
  },
  async getData() {
    const data = await categoriesApi();
    const items = data.items.filter((item) => item.type === "genre");
    console.log(items);
    this.renderTask(items);
  },
  renderTask(items) {
    const taskListEl = document.querySelector(".newAlbum");
    taskListEl.innerHTML = items
      .map(
        (item) => `
      <a href="/categories/${item.slug}" data-navigo
         class="px-3 py-2 rounded-lg bg-white/10 hover:bg-white/20 
               text-white text-sm cursor-pointer w-[230px] text-center">
        ${item.name}
      </a>
    `
      )
      .join("");
    router.updatePageLinks();
  },
  async getData2() {
    const data = await categoriesApi();
    const items = data.items.filter((item) => item.type === "mood");
    console.log(items);
    this.renderTask2(items);
  },
  renderTask2(items) {
    const taskListEl = document.querySelector(".newVideo");
    taskListEl.innerHTML = items
      .map(
        (item) => `
      <a href="/categories/${item.slug}" data-navigo
         class="px-3 py-2 rounded-lg bg-white/10 hover:bg-white/20 
               text-white text-sm cursor-pointer w-[230px] text-center">
        ${item.name}
      </a>
    `
      )
      .join("");
    router.updatePageLinks();
  },
  // moods
  async getData3() {
    const data = await linesApi();
    const listItems = data.items;
    // const columns = chuckArray(listItems, 4);
    this.renderTask3(listItems);
  },
  renderTask3(items) {
    const el = document.querySelector(".flowMusic");
    if (!el) return;

    el.innerHTML = items
      .map(
        (item) => `
      <a href="/lines/${item.slug}" data-navigo
         class="px-3 py-2 rounded-lg bg-white/10 hover:bg-white/20 
               text-white text-sm cursor-pointer w-[230px] text-center">
        ${item.name}
      </a>
    `
      )
      .join("");
    router.updatePageLinks();
  },
});
