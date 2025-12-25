import { router } from "../../routerr";
import { topSinger, topVideo } from "../../Services/auth.service";

export const charts = () => ({
  init: async function () {
    this.region = "GLOBAL";
    const container = document.querySelector(".content");
    container.innerHTML = this.template();
    // await Promise.all([this.getData(), this.getData2(), this.getData3()]);
    this.boxList();
    this.getData();
    this.getData2();
  },
  template() {
    return `
    <div class ="relative mt-16 ml-35 w-[87%]">
    <h1 class="text-[2rem] text-white font-bold mb-4">Bảng xếp hạng</h1>
    <div class="relative inline-block text-left dropdown">
  <button
    id="regionBtn"
    class="flex items-center justify-between gap-2 w-32 px-3 py-1.5
           bg-black text-white border border-white/20
           rounded-lg text-sm hover:bg-white/10"
  >
    <span id="regionText">Global</span>
    <i class="fa-solid fa-chevron-down text-xs opacity-70"></i>

  </button>
  <div
    id="regionMenu"
    class="absolute right-0 mt-1 w-32 bg-black border border-white/20
           rounded-lg shadow-lg hidden z-50"
  >
    <button
      data-value="global"
      class="block w-full text-left px-3 py-2 text-sm text-white
             hover:bg-white/10 rounded-t-lg"
    >
      Global
    </button>
    <button
      data-value="vietnam"
      class="block w-full text-left px-3 py-2 text-sm text-white
             hover:bg-white/10 rounded-b-lg"
    >
      Vietnam
    </button>
  </div>
</div>
    <section class="quick-pic mt-20">
     <div class="flex items-center justify-between">
     <h2 class="text-[2rem] text-white font-bold mb-4">Bảng xếp hạng video</h2>
    <div class="flex items-center justify-end gap-1">
    <div>
    <button class="bg-white/10 hover:bg-white/20 text-white w-8 h-8 rounded-full"><i class="fa-solid fa-chevron-left text-xs flex items-center justify-center"></i></button>
    </div>
    <div>
    <button class="bg-white/10 hover:bg-white/20 text-white w-8 h-8 rounded-full"><i class="fa-solid fa-chevron-right text-xs"></i></button>
    </div>
    </div>
     </div>
     <div class="topVideo flex"></div>
    </section>

    <section class="quick-pic mt-20">
     <div class="flex items-center justify-between">
     <h2 class="text-[2rem] text-white font-bold mb-4">Nghệ sĩ hàng đầu</h2>
    <div class="flex items-center justify-end gap-1">
    <div>
    <button class="bg-white/10 hover:bg-white/20 text-white w-8 h-8 rounded-full"><i class="fa-solid fa-chevron-left text-xs flex items-center justify-center"></i></button>
    </div>
    <div>
    <button class="bg-white/10 hover:bg-white/20 text-white w-8 h-8 rounded-full"><i class="fa-solid fa-chevron-right text-xs"></i></button>
    </div>
    </div>
     </div>
     <div class="topSinger"></div>
    </section>

    </div>
    `;
  },

  boxList() {
    const btn = document.querySelector("#regionBtn");
    const menu = document.querySelector("#regionMenu");
    const text = document.querySelector("#regionText");
    btn.addEventListener("click", () => {
      menu.classList.toggle("hidden");
    });

    menu.addEventListener("click", async (e) => {
      if (!e.target.dataset.value) return;
      const value = e.target.dataset.value;
      menu.classList.add("hidden");
      if (value === "global") {
        text.textContent = "Global";
        this.region = "GLOBAL";
      }
      if (value === "vietnam") {
        text.textContent = "Việt nam";
        this.region = "VN";
      }
      await this.getData();
    });

    document.addEventListener("click", (e) => {
      if (!e.target.closest(".dropdown")) {
        menu.classList.add("hidden");
      }
    });
  },

  async getData() {
    const data = await topVideo(this.region);
    const video = data.items;
    console.log(video);
    this.renderTask(video);
  },
  renderTask(tasks) {
    const postListEl = document.querySelector(".topVideo");
    if (!postListEl) return;
    postListEl.innerHTML = tasks
      .map(
        (task) => `
       <a href="/videos/details/${task._id}" data-navigo class="group flex flex-col gap-2 p-2 rounded-lg hover:bg-white/10 transition cursor-pointer w-60">
  
  <!-- Thumbnail -->
  <div class="relative w-full h-40 overflow-hidden rounded-lg">
    <img
      src="${task.thumb}"
      alt="img"
      class="w-full h-full object-cover"
    />

    <!-- Overlay play -->
    <div class="absolute inset-0 flex items-center justify-center 
                bg-black/50 opacity-0 group-hover:opacity-100 transition">
      <i class="fa-regular fa-circle-play text-white text-2xl"></i>
    </div>
  </div>

  <!-- Info -->
  <div class="flex flex-col gap-1">
    <p class="text-white text-sm font-semibold line-clamp-2">
      ${task.title}
    </p>
    <span class="text-white/50 text-xs">
      ${task.views} lượt xem
    </span>
  </div>

</a>`
      )
      .join("");
    router.updatePageLinks();
  },
  async getData2() {
    const data = await topSinger(this.region);
    const video = data.items;
    console.log(video);
    this.renderTask2(video);
  },
  renderTask2(tasks) {
    const postListEl = document.querySelector(".topSinger");
    if (!postListEl) return;
    postListEl.innerHTML = tasks
      .map(
        (task, index) =>
          `
       <div class="flex flex-col gap-2">
  
  <div class="flex items-center gap-3 py-2 border-b border-white/10 hover:bg-white/20 cursor-pointer transition">
    <!-- Rank -->
    <span class="w-6 text-right  text-sm ${
      index === 0
        ? "text-green-600"
        : index === 1
        ? "text-yellow-400"
        : index === 2
        ? "text-blue-400"
        : "text-white/40"
    }">
      ${index + 1}
    </span>

    <!-- Info -->
    <div class="flex flex-col">
      <h1 class="text-white text-sm font-medium">
        ${task.name}
      </h1>
      <p class="text-white/50 text-xs">
        ${task.totalViews} lượt xem
      </p>
    </div>
  </div>

</div>

        `
      )
      .join("");
  },
});
