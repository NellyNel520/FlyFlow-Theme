(() => {
  function initRelatedCarousel(section) {
    const trackWrap = section.querySelector('[data-rp-carousel]');
    const track = section.querySelector('.rp-premium__track');
    const prevBtn = section.querySelector('[data-rp-prev]');
    const nextBtn = section.querySelector('[data-rp-next]');
    if (!trackWrap || !track || !prevBtn || !nextBtn) {
      return;
    }

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const behavior = reducedMotion ? 'auto' : 'smooth';

    function scrollPage(direction) {
      const amount = trackWrap.clientWidth;
      trackWrap.scrollBy({ left: direction * amount, behavior });
    }

    prevBtn.addEventListener('click', () => scrollPage(-1));
    nextBtn.addEventListener('click', () => scrollPage(1));

    trackWrap.addEventListener('keydown', (event) => {
      if (event.key === 'ArrowRight') {
        event.preventDefault();
        scrollPage(1);
      } else if (event.key === 'ArrowLeft') {
        event.preventDefault();
        scrollPage(-1);
      }
    });
  }

  document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.rp-premium').forEach(initRelatedCarousel);
  });
})();
