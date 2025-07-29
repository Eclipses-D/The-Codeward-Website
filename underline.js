
// This script adds a fade-in effect to elements with the class 'scroll-fade' when they come into view on scroll.
function revealOnScroll() {
    const elements = document.querySelectorAll('.scroll-fade');
    const triggerBottom = window.innerHeight * 0.95; //Activate when user is 95% down the page.
  
    elements.forEach(el => {
      const elementTop = el.getBoundingClientRect().top;
      const elementBottom = el.getBoundingClientRect().bottom;
  
      // Element is within visible scroll area.
      if (elementTop < triggerBottom && elementBottom > 0) {
        el.classList.add('visible');
      } else {
        el.classList.remove('visible'); // Reset when it goes out of view
      }
    });
  }
  
  // Add event listeners for scroll and load to trigger the reveal function.
  window.addEventListener('scroll', revealOnScroll);
  window.addEventListener('load', revealOnScroll);