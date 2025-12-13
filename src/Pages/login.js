import { registerAPi } from "../Services/auth.service";
import { loginAPi } from "../Services/auth.service";
export const Login = (container) => ({
  init() {
    this.render();
    this.bindEvents();
    this.registerEvens();
    this.login();
    this.showError();
    this.clearError();
  },

  render() {
    container.innerHTML = this.template();
  },

  template() {
    return ` <div
        class=" bg-cover bg-center w-full h-screen flex justify-center items-center"
        style="background-image: url('images/81fbc741-caf6-49b9-b198-f5f80def8b9c.png')">
        <form id="login-form" class =" auth-form p-9 w-[400px] rounded-xl bg-white/10 backdrop-blur-xl shadow-xl border border-white/20">
        <h2 class="mb-2 text-white text-2xl text-center">Đăng nhập</h2>
        <div>
        <label class="block text-sm text-white mb-1">Email</label>
        <input type="Email" id="email-login" placeholder="Email của bạn " class="w-full px-4 py-2 rounded bg-white/70 focus:bg-white focus:outline-amber-300 text-gray-800">
        </div>
        <div class="mt-5">
        <label class="block text-sm text-white mb-1">Password</label>
        <input type="Password" id="password-login" placeholder="Nhập mật khẩu" class="w-full px-4 py-2 rounded bg-white/70 focus:bg-white focus:outline-amber-300 text-gray-800">
        </div>
        <button type="submit" class="block w-full mt-8 px-4 py-2 bg-black/80 text-white rounded-md hover:bg-red-400 transition cursor-pointer">Đăng nhập</button>
        <div class="mt-10 flex items-center justify-center gap-1">
        <span class="text-gray-500 text-sm">Bạn chưa có tài khoản</span>
        <button id ="to-register" data-action="toggle" type="button" class="text-sm text-white hover:text-red-400 underline font-semibold cursor-pointer"> Đăng kí</button>
        </div>
        </form>
        <form id="register-form" class ="hidden auth-form p-9 w-[400px] rounded-xl bg-white/10 backdrop-blur-xl shadow-xl border border-white/20">
        <h2 class="mb-2 text-white text-2xl text-center">Đăng kí</h2>
        <div>
        <label class="block text-sm text-white mb-1">Email</label>
        <input type="Email" id="email-register" placeholder="Email của bạn " class="w-full px-4 py-2 rounded bg-white/70 focus:bg-white focus:outline-amber-300 text-gray-800">
        </div>
        <div class="mt-5">
        <label class="block text-sm text-white mb-1">Tên hiển thị</label>
        <input type="text" id="name-user" placeholder="Nhập tên hiển thị của bạn" class="w-full px-4 py-2 rounded bg-white/70 focus:bg-white focus:outline-amber-300 text-gray-800">
        </div>
        <div class="mt-5">
        <label class="block text-sm text-white mb-1">Password</label>
        <input type="Password" id="password-register" placeholder="Mật khẩu" class="w-full px-4 py-2 rounded bg-white/70 focus:bg-white focus:outline-amber-300 text-gray-800">
        </div>
        <div class="mt-5">
        <label class="block text-sm text-white mb-1">Nhập lại mật khẩu </label>
        <input type="Password" id="confirmPassword-register" placeholder="Nhập lại mật khẩu " class="w-full px-4 py-2 rounded bg-white/70 focus:bg-white focus:outline-amber-300 text-gray-800">
        </div>
        <button type="submit" class="block w-full mt-8 px-4 py-2 bg-black/80 text-white rounded-md hover:bg-red-400 transition cursor-pointer">Đăng kí</button>
        <div class="mt-10 flex items-center justify-center gap-1">
        <span class="text-gray-500 text-sm">Bạn đã có tài khoản?</span>
        <button id="to-login" data-action="toggle" type="button" class="text-sm text-white hover:text-red-400 underline font-semibold cursor-pointer"> Đăng nhập</button>
        </div>
        </form>
        </div>`;
  },
  bindEvents() {
    container.addEventListener("click", (e) => {
      if (e.target.dataset.action === "toggle") {
        this.toggleForm();
      }
    });
  },

  toggleForm() {
    container.querySelector("#login-form").classList.toggle("hidden");
    container.querySelector("#register-form").classList.toggle("hidden");
  },

  // LOGIN
  login() {
    container.addEventListener("submit", async (e) => {
      if (e.target.id != "login-form") return;
      e.preventDefault();
      // Khoi tao
      const emailInp = document.querySelector("#email-login");
      const passwordInp = document.querySelector("#password-login");
      // Lay gia tri
      const email = emailInp.value.trim();
      const password = passwordInp.value.trim();
      const formData = { email, password };

      // Khoi tao Loi
      let hasError = false;
      if (!email) {
        this.showError(emailInp, "Email không được bỏ trống");
        hasError = true;
      }

      if (!password) {
        this.showError(passwordInp, "Password không được bỏ trống");
        hasError = true;
      }
      [emailInp, passwordInp].forEach((input) => {
        input.addEventListener("input", () => {
          if (input.value.trim().length > 0) {
            this.clearError(input);
            hasError = false;
          } else {
            this.showError(input, "Không được để trống");
            hasError = true;
          }
        });
      });
      if (!hasError) {
        try {
          const token = await loginAPi(formData);
          if (token) {
            localStorage.setItem("access_token", token.access_token);
            localStorage.setItem("refresh_token", token.refresh_token);
          }
          alert("Đăng nhập thành công!");
        } catch (err) {
          alert("Đăng nhập thất bại!");
        }
      }
    });
  },
  // REGISTER
  registerEvens() {
    container.addEventListener("submit", async (e) => {
      if (e.target.id != "register-form") return;
      e.preventDefault();
      // Khoi tao
      const nameInp = document.querySelector("#name-user");
      const emailInp = document.querySelector("#email-register");
      const passwordInp = document.querySelector("#password-register");
      const confirmPasswordInp = document.querySelector(
        "#confirmPassword-register"
      );

      // Lay gia tri
      const name = nameInp.value.trim();
      const email = emailInp.value.trim();
      const password = passwordInp.value.trim();
      const confirmPassword = confirmPasswordInp.value.trim();
      const formData = {
        name,
        email,
        password,
        confirmPassword,
      };
      let hasError = false;

      // khoi tao Loi
      if (!name) {
        this.showError(nameInp, "Tên không được bỏ trống");
        hasError = true;
      }
      if (!email) {
        this.showError(emailInp, "Email không được bỏ trống");
        hasError = true;
      }

      if (!password) {
        this.showError(passwordInp, "Password không được bỏ trống");
        hasError = true;
      }

      if (!confirmPassword) {
        this.showError(
          confirmPasswordInp,
          "ConfirmPassword không được bỏ trống"
        );
        hasError = true;
      }

      if (password.length < 6) {
        this.showError(passwordInp, "Tối thiểu 6 kí tự");
        hasError = true;
      }

      if (password !== confirmPassword) {
        this.showError(confirmPasswordInp, "Vui lòng nhập lại mật khẩu");
        hasError = true;
      }

      [nameInp, emailInp, passwordInp, confirmPasswordInp].forEach((input) => {
        input.addEventListener("input", () => {
          if (input.value.trim().length > 0) {
            this.clearError(input);
            hasError = false;
          } else {
            this.showError(input, "Không được để trống");
            hasError = true;
          }
        });
      });

      if (!hasError) {
        try {
          const token = await registerAPi(formData);
          localStorage.setItem("access_token", token.access_token);
          localStorage.setItem("refresh_token", token.refresh_token);
          localStorage.setItem("access_token", JSON.stringify(token.user));
          alert("Đăng ký thành công!");
        } catch (err) {
          alert("Đăng ký thất bại!");
        }
      }
    });
  },

  // Loi de trong input
  showError(inputEl, message) {
    let error = inputEl.parentElement.querySelector(".error");
    if (!error) {
      error = document.createElement("span");
      error.innerHTML = `
      <i class ="fa-solid fa-circle-exclamation text-red-600 text-[0.9rem] mt-[3px]"></i>
      <p class ="text-red-600 text-[0.8rem]">${message}</p>
      `;
      error.className = "error flex mt-2 item-center gap-1";
      inputEl.parentElement.appendChild(error);
    }
  },

  clearError(inputEl) {
    const error = inputEl.parentElement.querySelector(".error");
    if (error) error.remove();
  },
});
