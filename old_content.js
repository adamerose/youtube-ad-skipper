/*
This original code was for muting the video until the skip button countdown finished.
But it turned out you can click the button programmatically and it will skip the ad
without needing to even wait for the countdown 🤷‍♂️

Keeping this code though incase that gets patched.
*/

document.addEventListener('readystatechange', event => {

    let mutedByExtension = false;
  
    setInterval(()=>{
      // const x1 = document.querySelector('.ytp-ad-skip-button-container');
      // const x2 = document.querySelector('.countdown-next-to-thumbnail');
      // const x3 = document.querySelector('.ytp-ad-skip-ad-slot');
      // const x4 = document.querySelector('.ytp-ad-player-overlay');
      // const x5 = document.querySelector('.video-ads');
  
      const adModule = document.querySelector('.ytp-ad-module');
      const muteButton = document.querySelector('.ytp-mute-button');
      const videoElement = document.querySelector('video');
      const skipAdButton = document.querySelector('.ytp-ad-skip-button');
  
      console.log({
        adModule,
        muteButton,
        videoElement,
        skipAdButton,
        mutedByExtension
      })
  
  
      // Check if the video is muted
      if (!videoElement.muted & adModule) {
        // Mute the video if it's not already muted
        muteButton.click()
        console.log('Detected ad and video was unmuted; muting now...');
        mutedByExtension = true;
      }
  
      
      if (skipAdButton) {
        if (mutedByExtension & videoElement.muted) {
          // Unmute the video if it was muted by the extension
          muteButton.click()
          console.log('Detected skipAdButton and video was muted by extension; unmuting now...');
        }
        console.log('Detected skipAdButton, clicking it now...');
        skipAdButton.click()
        mutedByExtension = false;
      }
  
  
    }, 1000);
    
  });