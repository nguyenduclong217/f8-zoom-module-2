// import Navigo from "navigo";
import "./assets/style.css";
import defaultLayout from "./layout/defaultLayout";
import { Header } from "./Components/header";
import { Nav } from "./Components/nav";

import { startRouter } from "./routerr";

export const nav = Nav();
export const header = Header();
document.querySelector("#app").innerHTML = defaultLayout();
// Header().init();
header.init();
nav.init();
startRouter(nav);
