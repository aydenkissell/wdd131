const gallery = document.querySelector('.gallery');
const modal = document.querySelector('dialog');
const modalImage = modal.querySelector('img');
const closeButton = modal.querySelector('.close-viewer');

// Open modal
gallery.addEventListener('click', (e) => {
  if (e.target.tagName === 'IMG') {
    const smallSrc = e.target.src;
    const largeSrc = smallSrc.replace('-sm', '-full');

    modalImage.src = largeSrc;
    modalImage.alt = e.target.alt;

    modal.showModal();
  }
});

// Close modal with X button
closeButton.addEventListener('click', () => {
  modal.close();
});

// Close modal by clicking outside image
modal.addEventListener('click', (e) => {
  if (e.target === modal) {
    modal.close();
  }
});

// Close modal with Esc key
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && modal.open) {
    modal.close();
  }
});
