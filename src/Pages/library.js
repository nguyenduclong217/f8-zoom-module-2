export const library = () => ({
  init() {
    const container = document.querySelector(".content");
    container.innerHTML = this.template();
  },
  template() {
    return ``;
  },
});
