// load iframe

let isLoaded = false;

export function loadYoutubeApi() {
  if (isLoaded) return Promise.resolve();

  return new Promise((resolve) => {
    window.onYouTuBeIframeAPIReady = () => {
      isLoaded = true;
      resolve();
    };
  });
}
