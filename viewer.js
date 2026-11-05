const viewer = document.getElementById('image-viewer');
const viewerImage = document.getElementById('viewer-image');
const viewerTitle = document.getElementById('viewer-title');
const viewerStatus = document.getElementById('viewer-status');
const viewerClose = document.getElementById('viewer-close');
let viewerOpener = null;

viewerImage.addEventListener('load', () => {
  viewerStatus.hidden = true;
});
viewerImage.addEventListener('error', () => {
  if (!viewer.open) return;
  viewerStatus.textContent = 'The screenshot could not load. Close this preview and try again.';
  viewerStatus.hidden = false;
});

document.querySelector('.gallery').addEventListener('click', event => {
  const link = event.target.closest('a');
  if (!link || !link.querySelector('img')) return;
  event.preventDefault();
  const thumbnail = link.querySelector('img');
  viewerOpener = link;
  viewerTitle.textContent = thumbnail.alt || 'Screenshot preview';
  viewerStatus.textContent = 'Loading screenshot…';
  viewerStatus.hidden = false;
  viewerImage.alt = thumbnail.alt;
  viewerImage.src = link.href;
  viewer.showModal();
});

viewerClose.addEventListener('click', () => viewer.close());
// Native <dialog> handles Escape and keeps keyboard focus inside the popup.
viewer.addEventListener('click', event => {
  if (event.target === viewer) viewer.close();
});
viewer.addEventListener('close', () => {
  viewerImage.removeAttribute('src');
  viewerImage.alt = '';
  viewerStatus.hidden = true;
  viewerOpener?.focus({preventScroll: true});
  viewerOpener = null;
});
