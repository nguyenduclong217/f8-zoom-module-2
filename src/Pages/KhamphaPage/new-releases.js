import { router } from "../../routerr";
import { newReleases, newVideos } from "../../Services/auth.service";
// import { router } from "../routerr";
export const new_releases = () => ({
  init: async function () {
    window.scrollTo({ top: 0 });
    const container = document.querySelector(".content");
    container.innerHTML = this.template();
    await Promise.all([this.getData(), this.getData2()]);
  },
  template() {
    return `
    <div class ="relative mt-16 ml-35 w-[87%]">
    
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
    const data = await newReleases();
    console.log(data);
    this.renderTask(data.items);
  },
  renderTask(tasks) {
    const taskListEl = document.querySelector(".newAlbum");
    taskListEl.innerHTML = tasks
      .map(
        (task) =>
          `
        <a href="/albums/details/${task.id}" data-navigo class="group hover:bg-white/10 rounded-lg mt-0 transition cursor-pointer flex shrink-0 w-[230px]  ">
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
        <a href="#" data-navigo class="group hover:bg-white/10 rounded-lg mt-0 transition cursor-pointer flex shrink-0 w-[230px]  ">
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
});
