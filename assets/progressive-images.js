function loadProgressiveImage(container) {
  const preview = container.querySelector(".progressive-image-preview");
  const image = container.querySelector(".progressive-image");

  let imageLoaded = !!image.complete;
  if (imageLoaded) {
    image.classList.add("progressive-image-loaded");
    return;
  }

  // Load both
  image.onload = function() {
    imageLoaded = true;
    image.classList.add("progressive-image-loaded");
    delete image.onload;
  };

  window.setTimeout(function() {
    if (imageLoaded) return;
    preview.classList.add("progressive-image-preview-show");
  }, 50);
}

document.addEventListener("DOMContentLoaded", function() {
  document
    .querySelectorAll(".progressive-image-container")
    .forEach(loadProgressiveImage);
});
