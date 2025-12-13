export const Header = () => {
  return `
  <header class="sticky top-0 left-0 z-100 w-full bg-black">
        <nav>
          <div class="text-white flex items-center justify-between px-4 h-15">
            <div class="flex items-center gap-4">
              <button id="sidebar-btn" class="act-btn">
                <i class="fa-solid fa-bars text-xl"></i>
              </button>
              <a href="#" class="flex items-center gap-2"
                ><img
                  src="./public/images/logo (2).png"
                  alt="logo"
                  class="w-8 h-8 object-contain"
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
                  <a href="#" data-navigo>
                    <button class="primary-btn">Đăng nhập</button>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </nav>
      </header>
  `;
};
