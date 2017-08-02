function loadProgressiveImage(container) {
  const preview = container.querySelector('.progressive-image-preview');
  const image = container.querySelector('.progressive-image');


  let imageLoaded = false;
  // Load both
  image.onload = function() {
    imageLoaded = true;
    image.classList.add('progressive-image-loaded');
  }
  image.src = image.dataset.src;

  preview.onload = function() {
    if(imageLoaded)
      return;
    preview.classList.add('progressive-image-preview-loaded');
  }
  preview.src = preview.dataset.src;

}

document.addEventListener('DOMContentLoaded', function() {
  document.querySelectorAll('.progressive-image-container').forEach(loadProgressiveImage);
});
