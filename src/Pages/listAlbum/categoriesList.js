// import { listQuick, musicVnApi, playlists } from "../../Services/auth.service";

import { router } from "../../routerr";
import { listCategoriesApi } from "../../Services/auth.service";
// import { router } from "../../routerr";

export const categoriesList = (mood) => ({
  init: async function () {
    this.slug = mood;

    const container = document.querySelector(".content");
    container.innerHTML = this.template();
    this.getData();
    await this.loadQuickPicks();
  },

  template() {
    return `
    <div class="relative ml-35 w-[87%] mt-16">
    <h1 id ="title" class="text-[2.5rem] text-white font-bold mb-4"> </h1>
     <div class ="moods flex items-center gap-3 scroll scroll-smooth"></div>
     <div class = "info mt-20"></div>
    <div id="body"></div>
    `;
  },

  async loadQuickPicks() {
    const data = await listCategoriesApi(this.slug);
    const h1 = document.querySelector("#title");
    h1.textContent = `${data.name}`;
    console.log("Quick picks:", data);
  },

  async getData() {
    const data = await listCategoriesApi(this.slug);
    const listItem = data.subcategories;
    // console.log(lis);
    if (!listItem) return;
    this.renderTask(listItem);
  },
  renderTask(tasks) {
    const taskList = document.querySelector("#body");
    taskList.innerHTML = tasks
      .map(
        (task) => `
      <section class="quick-pic mt-20">
     <div class="flex items-center justify-between">
     <h2 class="title-1 text-[2rem] text-white font-bold mb-4">${task.name}</h2>
    <div class="flex items-center justify-end gap-1">
    <div>
    <button class="bg-white/10 hover:bg-white/20 text-white w-8 h-8 rounded-full"><i class="fa-solid fa-chevron-left text-xs flex items-center justify-center"></i></button>
    </div>
    <div>
    <button class="bg-white/10 hover:bg-white/20 text-white w-8 h-8 rounded-full"><i class="fa-solid fa-chevron-right text-xs"></i></button>
    </div>
    </div>
     </div>
     <div class="balladAcoustic flex gap-3">
     ${task.playlists.map(
       (el) => `
        <a href="/playlists/details/${el.slug}" data-navigo class="group w-[220px] rounded-xl overflow-hidden bg-white/5 hover:bg-white/10 transition">
  
  <!-- IMAGE -->
  <div class="relative w-full h-[140px] overflow-hidden">
    <img
      src="${el.thumbnails[0]}"
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
        class="w-10 h-10 flex items-center justify-center
               rounded-full bg-white/20 hover:bg-white/30
               text-white text-lg"
      >
        <i class="fa-regular fa-circle-play"></i>
      </span>
    </div>
  </div>

  <!-- TEXT -->
  <div class="p-3">
    <p class="text-sm text-white font-medium line-clamp-2">
      ${el.description}
    </p>
    <span class="block mt-1 text-xs text-white/50">
      Không có tác giả
    </span>
  </div>

</a>
`
     )}
</div>
     
    </section>
         

        `
      )
      .join("");
    router.updatePageLinks();
  },
});
