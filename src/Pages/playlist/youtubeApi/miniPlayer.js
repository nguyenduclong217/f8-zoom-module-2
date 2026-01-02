// const mini_video = [
//   "fixed",
//   "bottom-5",
//   "right-5",
//   "w-[320px]",
//   "h-[180px]",
//   "z-50",
// ];

// const large_video = ["relative", "w-full", "h-[500px]"];

// export function showMiniPlayer(type = "mini") {
//   const mp = document.querySelector("#mini-player");
//   if (!mp) return;

//   mp.classList.remove("hidden");
//   mp.classList.remove(...mini_video, ...large_video);

//   if (type === "large") {
//     mp.classList.add(...large_video);
//   } else {
//     mp.classList.add(...mini_video);
//   }
// }

export function hideMiniPlayer() {
  const mp = document.querySelector("#mini-player");
  if (!mp) return;
  mp.classList.add("hidden");
}

export function mountPlayerToMini() {
  const mini = document.querySelector("#mini-player");
  const root = document.querySelector("#player-root");

  if (!mini || !root) return;

  mini.appendChild(root);
}
