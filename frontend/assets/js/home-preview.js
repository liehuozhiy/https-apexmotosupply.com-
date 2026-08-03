(function () {
  const hero = document.querySelector("[data-concept-hero]");
  const video = document.querySelector("[data-concept-hero-video]");
  const replayButton = document.querySelector("[data-concept-replay]");
  const header = document.querySelector(".concept-header");

  if (!hero || !video || !replayButton) return;

  function setReplaying(isReplaying) {
    hero.classList.toggle("is-replaying", isReplaying);
    if (header) header.classList.toggle("is-video-replaying", isReplaying);
    replayButton.setAttribute("aria-hidden", String(isReplaying));
  }

  async function playFromStart(withSound) {
    video.currentTime = 0;
    video.muted = !withSound;
    video.volume = 1;
    setReplaying(true);

    try {
      await video.play();
    } catch (error) {
      setReplaying(false);
    }
  }

  video.addEventListener("ended", function () {
    video.currentTime = 0;
    video.muted = true;
    setReplaying(false);
  });

  replayButton.addEventListener("click", function () {
    playFromStart(true);
  });

  if (video.paused) setReplaying(false);
})();
