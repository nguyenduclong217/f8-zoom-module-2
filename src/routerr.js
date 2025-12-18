import Navigo from "navigo";
import { Home } from "./Pages/home";
import { Login } from "./Pages/login";
import { khamPha } from "./Pages/khampha";
import { header, nav } from "./main";
import { hideLoading, renderLoading } from "./layout/defaultLayout";
import { profile } from "./Pages/auth.js/profile";
import { changePassword } from "./Pages/auth.js/chance-password";
import { library } from "./Pages/library";
import { MoodPage } from "./Pages/moods/energize";
import { playList1 } from "./Pages/playlist/playlist1";
import { albumList1 } from "./Pages/listAlbum/albumhome1";
import { new_releases } from "./Pages/KhamphaPage/new-releases";
import { charts } from "./Pages/KhamphaPage/charts";
// import { albumList2 } from "./Pages/listAlbum/albumhome2";
// import { playList1 } from "./Pages/playlist/playlist1";

// import { energize } from "./Pages/moods/energize";

// export default function router() {
export const router = new Navigo("/");

router.hooks({
  before: (done) => {
    renderLoading();
    done();
  },
  after: ({ url }) => {
    nav.setActiveByPath(url.startsWith("/") ? url : `/${url}`);
    header.setActiveByPath(url.startsWith("/") ? url : `/${url}`);
  },
});
router
  .on("/", async () => {
    const home = Home();
    await home.init();
    hideLoading();
  })
  .on("/login", async () => {
    const login = Login();
    await login.init();
    hideLoading();
  })
  .on("/explore", async () => {
    const explore = khamPha();
    await explore.init();
    hideLoading();
  })
  .on("/profile", async () => {
    const profilePage = profile();
    await profilePage.init();
    hideLoading();
  })
  .on("/change-password", async () => {
    const changePasswordPage = changePassword();
    await changePasswordPage.init();
    hideLoading();
  })
  .on("/library", async () => {
    const token = localStorage.getItem("access_token");
    if (!token) {
      router.navigate("/login");
      alert("Vui lòng đăng nhập");
      return;
    }

    const libraryPage = library();
    await libraryPage.init();
    hideLoading();
  })
  .on("/moods/:slug", async ({ data }) => {
    const { slug } = data;
    const moodPage = MoodPage(slug);
    await moodPage.init();
    hideLoading();
  })
  .on("playlists/details/:slug", async ({ data }) => {
    const { slug } = data;
    const detailsPage = playList1(slug);
    await detailsPage.init();
    hideLoading();
  })
  .on("albums/details/:slug", async ({ data }) => {
    const { slug } = data;
    const albumPage1 = albumList1(slug);
    await albumPage1.init();
    hideLoading();
  })
  .on("/new-releases", async () => {
    const newPage = new_releases();
    await newPage.init();
    hideLoading();
  })
  .on("/charts", async () => {
    const chartsPage = charts();
    await chartsPage.init();
    hideLoading();
  });

export function startRouter() {
  router.updatePageLinks();
  router.resolve();
}
