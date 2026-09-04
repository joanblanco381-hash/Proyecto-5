/* ==========================================================================
   INTERACTIVIDAD Y NAVEGABILIDAD DEL PORTAFOLIO
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  
  // 1. Resaltar el enlace del menú según la sección visible (Scrollspy)
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-links a');

  const highlightNavOnScroll = () => {
    const scrollY = window.scrollY;

    sections.forEach((current) => {
      const sectionHeight = current.offsetHeight;
      const sectionTop = current.offsetTop - 100; // Offset para compensar la altura del header
      const sectionId = current.getAttribute('id');

      if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
        navLinks.forEach((link) => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active');
          }
        });
      }
    });
  };

  window.addEventListener('scroll', highlightNavOnScroll);

  // 2. Animación de entrada al hacer scroll (Reveal on Scroll)
  const observerOptions = {
    root: null,
    threshold: 0.15, // Se activa cuando el 15% del elemento es visible
  };

  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        observer.unobserve(entry.target); // Animación ejecutada una sola vez
      }
    });
  }, observerOptions);

  // Aplicar el observador a las tarjetas de proyectos y habilidades
  const animatedElements = document.querySelectorAll('.project-card, .skill-card, .about-content');
  animatedElements.forEach((el) => {
    el.classList.add('fade-in-element');
    revealObserver.observe(el);
  });
});