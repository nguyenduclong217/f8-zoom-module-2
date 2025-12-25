// import Navigo from "navigo";
import "./assets/style.css";
import defaultLayout from "./layout/defaultLayout";
import { Header } from "./Components/header";
import { Nav } from "./Components/nav";
import { startRouter } from "./routerr";
import { playMusic } from "./Pages/playlist/musicPlay";
// import { playMusic } from "./Pages/playlist/playMusic2";

export const nav = Nav();
export const header = Header();
export const footer = playMusic();
// document.querySelector("#app").innerHTML = defaultLayout();
const app = document.querySelector("#app");
app.innerHTML = defaultLayout();
header.init();
nav.init();
footer.init();
startRouter();
