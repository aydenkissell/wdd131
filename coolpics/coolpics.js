// ======================================
// COOL PICS - JAVASCRIPT FUNCTIONALITY
// File: coolpic.js
// ======================================

console.log('JavaScript loaded!'); // Debug check

// ======================================
// MENU FUNCTIONALITY
// ======================================

// Get menu button and navigation elements
const menuButton = document.getElementById('menu');
const navigation = document.getElementById('navigation');

console.log('Menu button:', menuButton); // Debug
console.log('Navigation:', navigation); // Debug

// Toggle menu on button click
if (menuButton && navigation) {
  menuButton.addEventListener('click', function() {
    console.log('Menu button clicked!'); // Debug
    navigation.classList.toggle('hide');
    menuButton.classList.toggle('open');
  });
}

// Handle window resize - show menu on large screens
function handleResize() {
  const menu = document.getElementById('navigation');
  
  if (window.innerWidth > 768) {
    // On large screens, always show the menu
    menu.classList.remove('hide');
  } else {
    // On small screens, hide the menu by default
    menu.classList.add('hide');
  }
}

// Add resize event listener
window.addEventListener('resize', handleResize);

// Run on page load to set initial state
handleResize();

// ======================================
// IMAGE VIEWER (MODAL) FUNCTIONALITY
// ======================================

// Function to create viewer template
function viewerTemplate(pic, alt) {
  return `<button class="close-viewer">✕</button><img src="${pic}" alt="${alt}">`;
}

// Function to show modal viewer
function viewHandler(event) {
  console.log('Click detected on:', event.target); // Debug
  
  // Check if clicked element is an image in the gallery
  const clickedElement = event.target;
  
  if (clickedElement.tagName === 'IMG') {
    console.log('Image clicked!'); // Debug
    
    // Get the image source and alt text
    const imgSrc = clickedElement.src;
    const imgAlt = clickedElement.alt;
    
    console.log('Image src:', imgSrc); // Debug
    
    // Get or create viewer
    let viewer = document.getElementById('viewer');
    
    if (!viewer) {
      // Create viewer if it doesn't exist
      viewer = document.createElement('div');
      viewer.id = 'viewer';
      viewer.className = 'viewer';
      document.body.appendChild(viewer);
    }
    
    // Insert the viewer HTML
    viewer.innerHTML = viewerTemplate(imgSrc, imgAlt);
    viewer.classList.remove('hide');
    
    // Add event listeners for closing
    const closeButton = viewer.querySelector('.close-viewer');
    
    // Close on X button click
    closeButton.addEventListener('click', closeViewer);
    
    // Close when clicking outside the image
    viewer.addEventListener('click', function(e) {
      if (e.target === viewer || e.target.classList.contains('close-viewer')) {
        closeViewer();
      }
    });
    
    console.log('Modal should be visible now'); // Debug
  }
}

// Function to close the viewer
function closeViewer() {
  console.log('Closing viewer'); // Debug
  const viewer = document.getElementById('viewer');
  if (viewer) {
    viewer.classList.add('hide');
    viewer.innerHTML = '';
  }
}

// Add click listener to gallery
const gallery = document.querySelector('.gallery');
console.log('Gallery found:', gallery); // Debug

if (gallery) {
  gallery.addEventListener('click', viewHandler);
  console.log('Click listener added to gallery'); // Debug
}

// Close viewer with ESC key
document.addEventListener('keydown', function(event) {
  if (event.key === 'Escape') {
    console.log('ESC pressed'); // Debug
    closeViewer();
  }
});