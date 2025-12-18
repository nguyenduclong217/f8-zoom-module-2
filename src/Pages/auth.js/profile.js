import { infoUser, updateInfoUser } from "../../Services/auth.service";

export const profile = () => ({
  async init() {
    const container = document.querySelector(".content");
    container.innerHTML = this.template();
    await this.getData();
    this.handleUpdate();
    // this.infoForm();
  },
  template() {
    return `
    <div
        class=" bg-cover bg-center w-full h-screen flex justify-center items-center"
        style="background-image: url('images/81fbc741-caf6-49b9-b198-f5f80def8b9c.png')">
        <form id="info-form" class =" auth-form p-9 w-[400px] rounded-xl bg-white/10 backdrop-blur-xl shadow-xl border border-white/20">
        <h2 class="mb-2 text-white text-2xl text-center">Cập nhật thông tin</h2>
        <div>
        <label class="block text-sm text-white mb-1">Tên hiển thị</label>
        <input type="text" id="name" placeholder="Tên đăng nhập " class="w-full px-4 py-2 rounded bg-white/70 focus:bg-white focus:outline-amber-300 text-gray-800">
        </div>
        <div class="mt-5">
        <label class="block text-sm text-white mb-1">Email</label>
        <input type="email" id="email-profile" placeholder="Email của bạn" class="w-full px-4 py-2 rounded bg-white/70 focus:bg-white focus:outline-amber-300 text-gray-800">
        </div>
        <button type="submit" class="block w-full mt-8 px-4 py-2 bg-black/80 text-white rounded-md hover:bg-red-400 transition cursor-pointer">Cập nhật</button>
        </form>
    `;
  },

  async getData() {
    const nameUser = document.querySelector("#name");
    const emailUser = document.querySelector("#email-profile");
    const data = await infoUser();
    if (!data) return;
    nameUser.value = data.name;
    emailUser.value = data.email;
  },

  handleUpdate() {
    const form = document.querySelector("#info-form");
    form.addEventListener("submit", async (e) => {
      e.preventDefault();
      const nameInp = document.querySelector("#name");
      const emailInp = document.querySelector("#email-profile");
      // Lay gia tri
      const name = nameInp.value.trim();
      const email = emailInp.value.trim();
      const formData = { name, email };
      let hasError = false;
      if (!name) {
        this.showError(nameInp, "Tên không được bỏ trống");
        hasError = true;
      }
      if (!email) {
        this.showError(emailInp, "Email không được bỏ trống");
        hasError = true;
      }
      [nameInp, emailInp].forEach((input) => {
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
          await updateInfoUser(name, email); // PATCH dữ liệu lên server
          alert("Cập nhật thành công!");
          window.location.href = "/";

          // Lấy lại dữ liệu mới nhất sau khi PATCH
          const newData = await infoUser();
          if (newData) {
            document.querySelector("#name").value = newData.name;
            document.querySelector("#email-profile").value = newData.email;
            const avatar = document.querySelector("#navbar-user span");
            if (avatar)
              avatar.textContent = newData.name.charAt(0).toUpperCase();
          }
        } catch (err) {
          alert("Cập nhật thất bại!");
        }
      }
    });
  },

  // KHỏi tạo lỗi
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
