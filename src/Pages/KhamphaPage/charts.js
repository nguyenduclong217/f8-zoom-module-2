export const charts = () => ({
  init: async function () {
    const container = document.querySelector(".content");
    container.innerHTML = this.template();
    // await Promise.all([this.getData(), this.getData2(), this.getData3()]);
    this.boxList();
  },
  template() {
    return `
    <div class ="relative mt-16 ml-35 w-[87%]">
    <h1 class="text-[2rem] text-white font-bold mb-4">Bảng xếp hạng</h1>
    <div class="relative inline-block text-left">
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
     <div class="list-task"></div>
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

    menu.addEventListener("click", (e) => {
      if (!e.target.dataset.value) return;
      const value = e.target.dataset.value;
      console.log(value);
      menu.classList.add("hidden");
    });
  },
});
