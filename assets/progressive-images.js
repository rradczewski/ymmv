function loadProgressiveImage(container) {
  if (container.dataset.loadProgressiveImage) return;
  container.dataset.loadProgressiveImage = true;

  const preview = container.querySelector(".progressive-image-preview");
  const image = container.querySelector(".progressive-image");

  const onImageLoaded = function() {
    preview.classList.add("progressive-image-preview-remove");
    image.classList.add("progressive-image-loaded");
  };

  // Load both
  const listener = image.addEventListener(
    "load",
    function() {
      onImageLoaded();
    },
    { once: true }
  );

  preview.classList.add("progressive-image-preview-show");

  window.setTimeout(function() {
    if (image.complete) {
      onImageLoaded();
    }
  }, 100);
}

function loadAll(e) {
  document
    .querySelectorAll(".progressive-image-container")
    .forEach(loadProgressiveImage);
}

document.addEventListener("readystatechange", loadAll);
document.addEventListener("DOMContentLoaded", loadAll);
