import moment from "moment";
import "./assets/style.css";
import { Header } from "./Pages/header";
import { Nav } from "./Pages/nav";
import { Login } from "./Pages/login";
import config from "./config.json";

const app = document.querySelector("#app");

app.innerHTML = `
 ${Header()}
 <main class =" flex ">
 ${Nav()}
 <div class="content w-[100%] h-screen bg-[#1A1A1A]">
 </div>
 </div>
 </main>

`;

const content = document.querySelector(".content");
const loginPage = Login(content);
loginPage.init();
