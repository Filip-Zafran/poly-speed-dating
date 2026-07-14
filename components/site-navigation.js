// Site Navigation Component
document.addEventListener('DOMContentLoaded', function() {
  // Set current year in footer
  const yearElements = document.querySelectorAll('#year');
  yearElements.forEach(el => {
    el.textContent = new Date().getFullYear();
  });

  // Highlight current page in navigation
  const currentPath = window.location.pathname.split('/').pop() || 'index.html';
  const navLinks = document.querySelectorAll('.nav-link');

  navLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPath) {
      link.classList.add('active');
    }
  });
});
