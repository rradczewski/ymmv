document.addEventListener('DOMContentLoaded', function() {
  document.querySelectorAll('.post-content h2[id], .post-content h3[id]').forEach(function(headline) {
    const content = headline.innerHTML;
    const anchor = document.createElement('a');
    anchor.href = '#'+headline.id;
    anchor.innerHTML = content;
    while(headline.firstChild) headline.firstChild.remove();
    headline.appendChild(anchor);
  });
});
