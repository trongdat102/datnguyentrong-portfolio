// Smooth reveal on scroll + back to top + mobile menu
document.addEventListener('DOMContentLoaded', function() {
  const reveals = document.querySelectorAll('.reveal');
  const back = document.getElementById('backToTop');
  const menuToggle = document.querySelector('.menu-toggle');
  const nav = document.querySelector('.main-nav');

  // Reveal on scroll
  function revealOnScroll(){
    const vh = window.innerHeight;
    reveals.forEach(el => {
      const rect = el.getBoundingClientRect();
      if(rect.top <= vh - 80) el.classList.add('active');
    });
  }
  revealOnScroll();
  window.addEventListener('scroll', revealOnScroll);

  // Back to top show/hide
  window.addEventListener('scroll', () => {
    if(window.scrollY > 300) back.style.display = 'flex';
    else back.style.display = 'none';
  });
  back.addEventListener('click', () => window.scrollTo({top:0,behavior:'smooth'}));

  // Smooth scroll for internal links
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', function(e){
      const href = this.getAttribute('href');
      if(href.length > 1) {
        e.preventDefault();
        const target = document.querySelector(href);
        if(target) target.scrollIntoView({behavior:'smooth', block:'start'});
        // close mobile nav if open
        if(window.innerWidth <= 700 && nav.style.display === 'block'){
          nav.style.display = 'none';
          menuToggle.setAttribute('aria-expanded','false');
        }
      }
    });
  });

  // Mobile menu toggle
  if(menuToggle){
    menuToggle.addEventListener('click', () => {
      if(nav.style.display === 'block'){
        nav.style.display = 'none';
        menuToggle.setAttribute('aria-expanded','false');
      } else {
        nav.style.display = 'block';
        menuToggle.setAttribute('aria-expanded','true');
      }
    });
  }
});
