import { changePasswordApi } from "../../Services/auth.service";

export const changePassword = () => ({
  init() {
    const container = document.querySelector(".content");
    container.innerHTML = this.template();
    this.chanceForm();
  },
  template() {
    return `
    <div
        class=" bg-cover bg-center w-full h-screen flex justify-center items-center"
        style="background-image: url('images/81fbc741-caf6-49b9-b198-f5f80def8b9c.png')">
        <form id="chance-form" class ="auth-form p-9 w-[400px] rounded-xl bg-white/10 backdrop-blur-xl shadow-xl border border-white/20">
        <h2 class="mb-2 text-white text-2xl text-center">Đổi mật khẩu</h2>
        <div>
        <label class="block text-sm text-white mb-1">Mật khẩu hiện tại</label>
        <input type="password" id="password-old" placeholder="Tên đăng nhập " class="w-full px-4 py-2 rounded bg-white/70 focus:bg-white focus:outline-amber-300 text-gray-800">
        </div>
        <div class="mt-5">
        <label class="block text-sm text-white mb-1">Mật khẩu mới</label>
        <input type="password" id="password-new" placeholder="Email của bạn" class="w-full px-4 py-2 rounded bg-white/70 focus:bg-white focus:outline-amber-300 text-gray-800">
        </div>
        <div class="mt-5">
        <label class="block text-sm text-white mb-1">Xác nhận mật khẩu mới</label>
        <input type="password" id="confirmPassword" placeholder="Email của bạn" class="w-full px-4 py-2 rounded bg-white/70 focus:bg-white focus:outline-amber-300 text-gray-800">
        </div>
        <button type="submit" class="block w-full mt-8 px-4 py-2 bg-black/80 text-white rounded-md hover:bg-red-400 transition cursor-pointer">Cập nhật</button>
        </div>
        </form>
    `;
  },
  async chanceForm() {
    const form = document.querySelector("#chance-form");
    form.addEventListener("submit", async (e) => {
      e.preventDefault();
      const oldPasswordInp = document.querySelector("#password-old");
      const passwordInp = document.querySelector("#password-new");
      const confirmPasswordInp = document.querySelector("#confirmPassword");

      const oldPassword = oldPasswordInp.value.trim();
      const password = passwordInp.value.trim();
      const confirmPassword = confirmPasswordInp.value.trim();
      // flag
      let hasError = false;

      const errorMessages = {
        "password-old": "Vui lòng nhập mật khẩu hiện tại",
        "password-new": "Vui lòng nhập mật khẩu mới",
        confirmPassword: "Vui lòng xác nhận mật khẩu",
      };

      if (!oldPassword) {
        this.showError(oldPasswordInp, "Vui lòng nhập mật khẩu hiện tại");
        hasError = true;
      }
      if (!password) {
        this.showError(passwordInp, "Vui lòng nhập lại mật khẩu mới");
        hasError = true;
      }
      if (!confirmPassword) {
        this.showError(confirmPasswordInp, "Vui lòng nhập lại mật khẩu");
        hasError = true;
      }
      if (password !== confirmPassword) {
        this.showError(confirmPasswordInp, "Mật khẩu không chính xác");
        hasError = true;
      }
      [oldPasswordInp, passwordInp, confirmPasswordInp].forEach((input) => {
        input.addEventListener("input", () => {
          if (input.value.trim().length > 0) {
            this.clearError(input);
            hasError = false;
          } else {
            this.showError(input, errorMessages[input.id]);
            hasError = true;
          }
        });
      });
      if (!hasError) {
        try {
          await changePasswordApi(oldPassword, password, confirmPassword);
          alert("Đổi mật khẩu thành công");
          window.location.href = "/";
        } catch (err) {
          console.log(err.message);
          alert("Đổi mật khẩu thất bại, kiểm tra lại mật khẩu");
        }
      }
    });
  },

  // Loi de trong input
  showError(inputEl, message) {
    if (!inputEl) return;

    const parent = inputEl.parentElement;
    if (!parent) return;
    let error = parent.querySelector(".error");
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
  // Xóa lỗi
  clearError(inputEl) {
    const error = inputEl.parentElement.querySelector(".error");
    if (error) error.remove();
  },
});
