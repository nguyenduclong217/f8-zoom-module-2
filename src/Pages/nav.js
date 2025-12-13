export const Nav = () => {
  return `
  <div>
  <aside id="desktop-sidebar" class ="pt-4 w-22 h-full bg-[#030303] text-white fixed left-0 z-20" >
  <nav class ="flex flex-col items-center">
  <a href="#" data-navigo class="flex flex-col items-center justify-center gap-1 p-3 hover:bg-white/10 rounded-xl transition group sidebar-active">
  <i class="fa-regular fa-house text-2xl"></i>
  <span class="text-[11px] text-gray-300 group-hover:text-white">Trang chủ</span>
  </a>
  <a href="#" data-navigo class="flex flex-col items-center justify-center gap-1 p-3 hover:bg-white/10 rounded-xl transition group sidebar-active">
  <i class="fa-regular fa-compass text-2xl"></i>
  <span class="text-[11px] text-gray-300 group-hover:text-white">Khám phá</span>
  </a>
  <a href="#" data-navigo class="flex flex-col items-center justify-center gap-1 p-3 hover:bg-white/10 rounded-xl transition group sidebar-active">
  <i class="fa-regular fa-bookmark text-2xl"></i>
  <span class="text-[11px] text-gray-300 group-hover:text-white">Thư viện</span>
  </a>
  </a>
  <a href="#" data-navigo class="flex flex-col items-center justify-center gap-1 p-3 hover:bg-white/10 rounded-xl transition group sidebar-active hidden">
  <i class="fa-regular fa-bookmark text-2xl "></i>
  <span class="text-[11px] text-gray-300 group-hover:text-white">Thư viện</span>
  </a>
  <div id="sidebar_login">
  <hr class="my-3 w-full border-white/20 ">
  <a href="#" data-navigo class="flex flex-col items-center justify-center gap-1 p-3 hover:bg-white/10 rounded-xl transition group sidebar-active">
  <i class="fa-regular fa-user text-2xl "></i>
  <span class="text-[11px] text-gray-300 group-hover:text-white">Đăng nhập</span>
  </a>
  </div>
  </nav>
  </aside>
  <aside id="sidebar" class=" hidden fixed  inset-0 left-0 w-50 h-full bg-black/95 backdrop-blur-xl text-white transform transition-transform duration-300 z-101 border-r border-white/10 pt-1">
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
  <a href="#" data-navigo class="sidebar-item">
  <i class="fa-regular fa-house text-xl"></i>
  <span>Trang chủ</span>
  </a>
  <a href="#" data-navigo class="sidebar-item">
  <i class="fa-regular fa-compass text-xl"></i>
  <span>Khám phá</span>
  </a>
  <a href="#" data-navigo class="sidebar-item">
  <i class="fa-regular fa-bookmark text-xl"></i>
  <span>Thư viện</span>
  </a>
  <a href="#" data-navigo class="sidebar-item">
  <i class="fa-solid fa-crown text-xl"></i>
  <span>Nâng cấp</span>
  </a>
  <div id="slide-sidebar-login" class="px-2">
  <hr class="border-white/20">
  <a href="#" class="act-btn w-full mt-4 px-2 flex justify-center bg-[#1d1d1d]">Đăng nhập</a>
  <p class="mt-2 text-[12px] text-white/60 leading-4">
  Đăng nhập để tạo và chia sẻ danh sách phát, nhận nội dung đề xuất dành riêng cho bạn.
  </p>
  </div>
  </nav>
  </aside>
  </div>
  `;
};
