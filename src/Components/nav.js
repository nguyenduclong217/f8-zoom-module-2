// import router from "../routerr";

import { router } from "../routerr";

export const Nav = () => ({
  init() {
    const body = document.querySelector(".side-bar");
    body.innerHTML = this.template();
    router.updatePageLinks();
    this.hadData();
    this.active();
  },
  template() {
    return `
  <aside id="desktop-sidebar" class ="pt-4 w-22 h-full bg-[#030303] text-white fixed left-0 z-20" >
  <nav class ="list1 flex flex-col items-center">
  <a href="/" data-navigo class=" sidebar-link flex flex-col items-center justify-center gap-1 p-3 hover:bg-white/10 rounded-xl transition group">
  <i class="fa-regular fa-house text-2xl"></i>
  <span class="text-[11px] text-gray-300 group-hover:text-white">Trang chủ</span>
  </a>
  <a href="/explore" data-navigo class="sidebar-link flex flex-col items-center justify-center gap-1 p-3 hover:bg-white/10 rounded-xl transition group ">
  <i class="fa-regular fa-compass text-2xl"></i>
  <span class="text-[11px] text-gray-300 group-hover:text-white">Khám phá</span>
  </a>
  <a href="/library" data-navigo class="sidebar-link flex flex-col items-center justify-center gap-1 p-3 hover:bg-white/10 rounded-xl transition group ">
  <i class="fa-regular fa-bookmark text-2xl"></i>
  <span class="text-[11px] text-gray-300 group-hover:text-white">Thư viện</span>
  </a>
  <div id="sidebar_login">
  <div class="btnTask">
  <hr class="my-3 w-full border-white/20 ">
  <a href="/login" data-navigo class="flex flex-col items-center justify-center gap-1 p-3 hover:bg-white/10 rounded-xl transition group sidebar-active">
  <i class="fa-regular fa-user text-2xl "></i>
  <span class="text-[11px] text-gray-300 group-hover:text-white">Đăng nhập</span>
  </a></div>
  </div>
  </nav>
  </aside>
  `;
  },
  setActiveByPath(path) {
    document.querySelectorAll(".sidebar-link").forEach((el) => {
      el.classList.toggle("active", el.getAttribute("href") === path);
    });
  },

  hadData() {
    const token = localStorage.getItem("access_token");
    const login = document.querySelector(".btnTask");
    const box = document.querySelector("#sidebar_login");
    if (token) {
      login.classList.add("hidden");
      box.innerHTML = `
      <a href="#" data-navigo class="sidebar-link flex flex-col items-center justify-center gap-1 p-3 hover:bg-white/10 rounded-xl transition group sidebar-active">
  <i class="fa-solid fa-crown text-xl"></i>
  <span class="text-[11px] text-gray-300 group-hover:text-white">Nâng cấp</span>
  </a>
      `;
    }
    router.updatePageLinks();
  },

  active() {
    const btnActive = document.querySelectorAll("a");
    btnActive.forEach((el) =>
      el.addEventListener("click", () => {
        window.scroll({
          top: 0,
          behavior: "smooth",
        });
      })
    );
  },
});
