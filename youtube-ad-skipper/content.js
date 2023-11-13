/*
This original code was for muting the video until the skip button countdown finished.
But it turned out you can click the button programmatically and it will skip the ad
without needing to even wait for the countdown 🤷‍♂️

Keeping this code though incase that gets patched.
*/

// Track whether the video was muted by this extension
let mutedByExtension = false;

document.addEventListener("readystatechange", (event) => {
  setInterval(() => {
    // x1-x6 are just for reference / debug
    // These seem to only exist while an ad is playing
    const x1 = document.querySelector(".ytp-ad-skip-button-container");
    const x2 = document.querySelector(".countdown-next-to-thumbnail");
    const x3 = document.querySelector(".ytp-ad-skip-ad-slot");
    const x4 = document.querySelector(".ytp-ad-player-overlay");
    // These seem to always exist
    const x5 = document.querySelector(".video-ads");
    const x6 = document.querySelector(".ytp-ad-module");

    // Use these to determine extension flow
    const adElement = document.querySelector(".ytp-ad-player-overlay");
    const muteButton = document.querySelector(".ytp-mute-button");
    const videoElement = document.querySelector("video");
    const skipAdButton = document.querySelector(".ytp-ad-skip-button");

    // console.log({
    //   adModule,
    //   muteButton,
    //   videoElement,
    //   skipAdButton,
    //   mutedByExtension,
    // });

    // No ad is playing
    if (!adElement) {
      if (mutedByExtension) {
        // videoElement.muted should usually be true if mutedByExtension is true, unless the user unmuted during the ad
        if (videoElement.muted) {
          muteButton.click();
          console.log("Detected no ad and video was unmuted. Unmuting now...");
        }
        mutedByExtension = false;
      }
      return;
    }

    // Always try to skip the ad if the button is available
    if (skipAdButton) {
      console.log("Detected ytp-ad-skip-button. Clicking it now...");
      skipAdButton.click();
    }

    // Ad is playing
    if (adElement) {
      // Mute the video if it's not already muted
      if (!videoElement.muted) {
        console.log("Detected ad and video was unmuted. Muting now...");
        muteButton.click();
        mutedByExtension = true;
      }
    }
  }, 100);
});
