import { router } from "../routerr";
import { infoUser } from "../Services/auth.service";

export const Header = () => ({
  init() {
    const headerEl = document.querySelector("#header");
    if (!headerEl) {
      return;
    }
    router.updatePageLinks();
    headerEl.innerHTML = this.template();
    this.btnMenu();
    this.getData();

    // this.listBtn();
  },
  template() {
    return `
  <header>
        <nav>
          <div class="text-white flex items-center justify-between px-4 h-15">
            <div class="flex items-center gap-4">
              <button id="sidebar-btn" class="act-btn cursor-pointer">
                <i class="fa-solid fa-bars text-xl"></i>
              </button>
              <a href="#" class="flex items-center gap-2"
                ><img
                  src="./public/images/logo (2).png"
                  alt="logo"
                  class="w-8 h-8 object-contain" data-navigo
                />
                <span class="text-xl font-semibold tracking-tight">Music</span>
              </a>
            </div>
            <div class="flex w-[76%] justify-between items-center">
              <div
                class="p-2 w-[300px] flex items-center gap-2 rounded-md bg-[#292929]/80"
              >
                <i
                  class="fa-solid fa-magnifying-glass w-5 h-4 text-gray-300"
                ></i>
                <input
                  type="search"
                  placeholder="Tìm bài hát, đĩa nhạc, nghệ sĩ....."
                  class="w-full outline-none"
                />
              </div>
              <!-- list item -->
              <div class="flex items-center gap-2">
                <button
                  class="p-3 text-sm text-white hover:cursor-pointer hover:bg-white/20 font-medium rounded-full transition"
                >
                  <i class="fa-brands fa-chromecast text-2xl text-gray-300"></i>
                </button>
                <button
                  class="p-3 text-sm text-white hover:cursor-pointer hover:bg-white/20 font-medium rounded-full transition"
                >
                  <i class="fa-solid fa-ellipsis-vertical text-xl"></i>
                </button>
                <div id="navbar-user" class="flex">
                  <a href="/login" data-navigo class="login">
                    <button class="primary-btn">Đăng nhập</button>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </nav>
      </header>
      <aside id="sidebar" class="fixed  inset-0 left-0 w-50 h-full bg-black/95 backdrop-blur-xl text-white transform transition-transform duration-300 -translate-x-full ease-out z-101 border-r border-white/10 pt-1">
  <div class="flex gap-5 items-center pl-6 py-3  ">
  <button id="close-sidebar" class="act-btn flex hover:bg-white/10">
  <i class="fa-solid fa-xmark text-[19px]"></i>
  </button>
  <div class="flex items-center gap-2">
  <img src="./public/images/logo (2).png" alt="logo" class="w-[35px]">
  <span class="text-xl font-semibold tracking-tight">Music</span>
  </div>
  </div>
  <nav class="flex flex-col p-3 select-none">
  <a href="/" data-navigo class="sidebar-item">
  <i class="fa-regular fa-house text-xl"></i>
  <span>Trang chủ</span>
  </a>
  <a href="/explore" data-navigo class="sidebar-item">
  <i class="fa-regular fa-compass text-xl"></i>
  <span>Khám phá</span>
  </a>
  <a href="/library" data-navigo class="sidebar-item">
  <i class="fa-regular fa-bookmark text-xl"></i>
  <span>Thư viện</span>
  </a>
  <a href="#" data-navigo class="sidebar-item">
  <i class="fa-solid fa-crown text-xl"></i>
  <span>Nâng cấp</span>
  </a>
  <div id="slide-sidebar-login" class="px-2">
  <hr class="border-white/20">
  <a href="/login" class=" act-btn w-full mt-4 px-2 flex justify-center bg-[#1d1d1d]">Đăng nhập</a>
  <p class="mt-2 text-[12px] text-white/60 leading-4">
  Đăng nhập để tạo và chia sẻ danh sách phát, nhận nội dung đề xuất dành riêng cho bạn.
  </p>
  </div>
  </nav>
  </aside>
  <div id="overlay" class="hidden bg-black/80 fixed inset-0 z-10"></div>
  `;
  },

  btnMenu() {
    const menu = document.querySelector("#sidebar");
    const overlay = document.querySelector("#overlay");
    if (!menu) return;
    const btns = menu.querySelectorAll("a");
    const open = () => {
      menu.classList.remove("-translate-x-full");
      overlay.classList.remove("hidden");
    };

    const close = () => {
      menu.classList.add("-translate-x-full");
      overlay.classList.add("hidden");
    };
    btns.forEach((btn) => {
      btn.addEventListener("click", close);
    });
    document.querySelector("#sidebar-btn")?.addEventListener("click", open);
    document.querySelector("#close-sidebar")?.addEventListener("click", close);
    overlay?.addEventListener("click", close);
  },

  setActiveByPath(path) {
    document.querySelectorAll(".sidebar-item").forEach((el) => {
      el.classList.toggle("active", el.getAttribute("href") === path);
    });
  },

  async getData() {
    const btnLogin = document.querySelector(".login");
    const btnLogin2 = document.querySelector("#slide-sidebar-login");
    const box = document.querySelector("#navbar-user");

    const data = await infoUser();
    if (!data) return;

    btnLogin.classList.add("hidden");
    btnLogin2.classList.add("hidden");

    // Avatar
    const avatar = document.createElement("span");
    avatar.className =
      "rounded-full bg-white/80 w-10 h-10 text-center p-2 cursor-pointer";
    avatar.textContent = data.name.charAt(0).toUpperCase();

    // dropdown
    const dropdown = document.createElement("div");
    dropdown.className =
      "absolute w-[200px] bg-gray-800 rounded-[10px] shadow-lg right-[20px] top-13 text-[14px] hidden";
    dropdown.innerHTML = `
    <button id="update" class=" p-2  w-full rounded-t-[10px] hover:bg-white/20 transition"><a href="/profile" data-navigo>Thông tin tài khoản</a></button>
    <button id="changePassword" class=" p-2  w-full hover:bg-white/20 transition"><a href="/change-password" data-navigo>Cập nhật tài khoản</a></button>
    <button id="logout" class ="logout p-2 text-red-500 w-full rounded-b-[10px] hover:bg-white/20 transition"><a href="/">Đăng xuất</a></button>
    `;
    avatar.addEventListener("click", () => {
      dropdown.classList.toggle("hidden");
    });
    document.addEventListener("click", (e) => {
      if (
        !dropdown.classList.contains("hidden") &&
        !dropdown.contains(e.target) &&
        e.target !== avatar
      ) {
        dropdown.classList.add("hidden");
      }
    });
    box.appendChild(dropdown);
    box.appendChild(avatar);
    const btnLogout = document.querySelector("#logout");
    btnLogout.addEventListener("click", () => {
      localStorage.removeItem("access_token");
      localStorage.removeItem("refresh_token");
      // window.location.href = "/";
    });
  },
});
