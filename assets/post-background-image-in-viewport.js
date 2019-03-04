function watchViewport() {
  const images = document.querySelectorAll(".post-background-image");

  function showImagesInViewport(e) {
    const viewpointHeight = window.innerHeight;
    images.forEach((image, i) => {
      const rect = image.getBoundingClientRect();
      const top = rect.top,
        bottom = rect.bottom;

      const imageTopVisible =
        top < viewpointHeight && top >= viewpointHeight * 0.15;
      const imageBottomVisible = bottom > 0 && bottom <= viewpointHeight * 0.85;

      if (imageTopVisible && imageBottomVisible) {
        image.classList.add("post-background-image-in-viewport");
      }
    });
  }

  window.addEventListener("scroll", showImagesInViewport);
  showImagesInViewport();
}

if (window.matchMedia("(any-hover: none)").matches) {
  document.addEventListener("DOMContentLoaded", watchViewport);
}
