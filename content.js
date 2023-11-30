/*
This original code was for muting the video until the skip button countdown finished.
But it turned out you can click the button programmatically and it will skip the ad
without needing to even wait for the countdown 🤷‍♂️

Keeping this code though incase that gets patched.
*/

// Track whether the video was muted by this extension
let mutedByExtension = false;
const DEBUG = false;

document.addEventListener("readystatechange", (event) => {
  setInterval(() => {
    if (DEBUG) {
      const x1 = document.querySelector(".ytp-ad-skip-button-container");
      const x2 = document.querySelector(".countdown-next-to-thumbnail");
      const x3 = document.querySelector(".ytp-ad-skip-ad-slot");
      const x4 = document.querySelector(".ytp-ad-player-overlay");
      const x5 = document.querySelector(".video-ads");
      const x6 = document.querySelector(".ytp-ad-module");
      console.log({ x1, x2, x3, x4, x5, x6 });
    }

    // Use these to determine extension flow
    const muteButton = document.querySelector(".ytp-mute-button");
    const videoElement = document.querySelector("video");
    const adElement = document.querySelector(".ytp-ad-player-overlay");
    const skipButton = document.querySelector(".ytp-ad-skip-button-container");

    // This includes the inline ad on the homepage and search results page
    document.querySelector("ytd-ad-slot-renderer")?.remove();

    DEBUG &&
      console.log({
        adModule,
        muteButton,
        videoElement,
        skipButton,
        mutedByExtension,
      });

    // No ad is playing
    if (!adElement) {
      if (mutedByExtension) {
        // videoElement.muted should usually be true if mutedByExtension is true, unless the user unmuted during the ad
        if (videoElement.muted) {
          muteButton.click();
          console.log("Detected no ad audio. Unmuting now...");
        }
        mutedByExtension = false;
      }
      return;
    }

    // Always try to skip the ad if the button is available
    if (skipButton) {
      console.log("Detected ytp-ad-skip-button. Clicking to skip now...");
      skipButton.click();
    }

    // Ad is playing
    if (adElement) {
      // Mute the video if it's not already muted
      if (!videoElement.muted) {
        console.log("Detected ad and video was unmuted. Muting now...");
        muteButton.click();
        mutedByExtension = true;
      }

      // Try skipping the video. Does this work??
      if (videoElement.duration > videoElement.currentTime) {
        console.log("Skipping to end of ad...");
        videoElement.currentTime = videoElement.duration;
      }
    }
  }, 100);
});
