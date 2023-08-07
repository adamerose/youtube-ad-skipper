document.addEventListener('readystatechange', event => {
  setInterval(()=>{
    const skipAdButton = document.querySelector('.ytp-ad-skip-button');

    if (skipAdButton) {
      skipAdButton.click()
      console.log("Ad Skipped!");
    }
  }, 200);
});