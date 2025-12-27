import { router } from "../routerr";
import { pageSearch } from "../Services/auth.service";

export const search = () => ({
  _query: {
    limit: 7,
    pageNow: 1,
  },

  init() {
    const container = document.querySelector(".content");
    if (!container) return;
    container.innerHTML = this.template();
    this.paginate();
  },

  async update() {
    const params = new URLSearchParams(window.location.search);
    this._query.pageNow = parseInt(params.get("page")) || 1;
    const keyword = params.get("q");
    const limit = this._query.limit;
    const page = (this._query.pageNow - 1) * limit;
    if (!keyword) return;

    const data = await pageSearch(keyword, limit, page);
    console.log(data);
    const pageNumber = Math.ceil(data.total / limit);
    console.log(pageNumber);
    this.renderPaginate(pageNumber);
    const h1 = document.querySelector("h1");
    const list = document.querySelector("#list");

    h1.textContent = `Kết quả cho "${keyword}"`;

    if (!data?.results?.length) {
      list.innerHTML = `<p class="text-gray-400">Không tìm thấy kết quả</p>`;
      return;
    }

    list.innerHTML = data.results
      .map(
        (item) => `
      <a href="/songs/details/${item.id}" data-navigo class="py-3 border-b border-white/10 flex items-center gap-3">
        <img src="${item.thumbnails[0]}" alt="${item.title}" class="w-12 h-12 object-cover rounded"/>
        <div>
          <p class="font-medium text-white">${item.title}</p>
          <p class="text-sm text-gray-400">${item.popularity} lượt nghe</p>
        </div>
      </a>
    `
      )
      .join("");
    router.updatePageLinks();
  },

  template() {
    return `
      <div class="relative ml-35 w-[87%] mt-16">
        <h1 class="text-[42px] text-white font-bold mb-4"></h1>
        <div id="list"></div>

        <div class="paginate">
        </div>
      </div>
    `;
  },

  renderPaginate(pageNumber) {
    const paginate = document.querySelector(".paginate");
    paginate.innerHTML = "";
    if (!paginate) return;
    for (let page = 1; page <= pageNumber; page++) {
      const active = this._query.pageNow === page ? "bg-green-600" : "";
      paginate.innerHTML += `<button class="border border-gray-500 px-3 py-2 ${active}">${page}</button>`;
    }
  },

  // page() {
  //   const page = 1;
  //   const limit = 8;
  // },
  paginate() {
    const paginate = document.querySelector(".paginate");
    console.log(paginate);
    if (!paginate) return;

    paginate.addEventListener("click", (e) => {
      const page = +e.target.innerText;
      this._query.pageNow = page;
      window.scroll({
        top: 0,
        behavior: "smooth",
      });
      const params = new URLSearchParams(window.location.search);
      params.set("page", this._query.pageNow);
      window.history.replaceState(null, "", `?${params.toString()}`);
      this.update();
    });
  },
});

export const searchPage = search();
