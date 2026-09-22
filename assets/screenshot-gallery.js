(function () {
  function initScreenshotGallery() {
    var carousel = document.querySelector('[data-screenshot-carousel]');
    var lightbox = document.querySelector('[data-screenshot-lightbox]');
    if (!carousel || !lightbox) return;

    var thumbs = Array.prototype.slice.call(
      carousel.querySelectorAll('[data-screenshot-open]')
    );
    if (thumbs.length === 0) return;

    var lbImg = lightbox.querySelector('.lightbox__img');
    var lbCaption = lightbox.querySelector('.lightbox__caption');
    var btnClose = lightbox.querySelector('.lightbox__close');
    var btnLbPrev = lightbox.querySelector('.lightbox__prev');
    var btnLbNext = lightbox.querySelector('.lightbox__next');
    var btnCarPrev = document.querySelector('[data-carousel-prev]');
    var btnCarNext = document.querySelector('[data-carousel-next]');
    var activeIndex = 0;
    var lastFocus = null;

    function scrollCarousel(direction) {
      var first = carousel.querySelector('figure');
      if (!first) return;
      var step = first.offsetWidth + 20;
      carousel.scrollBy({ left: direction * step, behavior: 'smooth' });
    }

    function openLightbox(index) {
      activeIndex = index;
      lastFocus = document.activeElement;
      var btn = thumbs[activeIndex];
      lbImg.src = btn.getAttribute('data-full');
      lbImg.alt = btn.getAttribute('data-alt') || '';
      lbCaption.textContent = btn.getAttribute('data-caption') || '';
      lightbox.hidden = false;
      lightbox.classList.add('is-open');
      document.body.classList.add('lightbox-open');
      btnClose.focus();
    }

    function closeLightbox() {
      lightbox.classList.remove('is-open');
      lightbox.hidden = true;
      document.body.classList.remove('lightbox-open');
      lbImg.removeAttribute('src');
      if (lastFocus && lastFocus.focus) lastFocus.focus();
    }

    function stepLightbox(delta) {
      activeIndex = (activeIndex + delta + thumbs.length) % thumbs.length;
      openLightbox(activeIndex);
    }

    thumbs.forEach(function (btn, i) {
      btn.addEventListener('click', function () {
        openLightbox(i);
      });
    });

    if (btnCarPrev) btnCarPrev.addEventListener('click', function () { scrollCarousel(-1); });
    if (btnCarNext) btnCarNext.addEventListener('click', function () { scrollCarousel(1); });

    btnClose.addEventListener('click', closeLightbox);
    btnLbPrev.addEventListener('click', function () { stepLightbox(-1); });
    btnLbNext.addEventListener('click', function () { stepLightbox(1); });

    lightbox.addEventListener('click', function (e) {
      if (e.target === lightbox) closeLightbox();
    });

    document.addEventListener('keydown', function (e) {
      if (!lightbox.classList.contains('is-open')) return;
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowLeft') stepLightbox(-1);
      if (e.key === 'ArrowRight') stepLightbox(1);
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initScreenshotGallery);
  } else {
    initScreenshotGallery();
  }
})();
