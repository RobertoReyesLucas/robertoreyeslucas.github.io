(function () {
  var root = document.documentElement;
  var btn = document.querySelector('.theme-toggle');
  var media = window.matchMedia('(prefers-color-scheme: dark)');

  function current() {
    return root.getAttribute('data-theme') || (media.matches ? 'dark' : 'light');
  }
  function label() {
    btn.setAttribute('aria-label', current() === 'dark' ? 'Switch to light theme' : 'Switch to dark theme');
  }
  btn.addEventListener('click', function () {
    var next = current() === 'dark' ? 'light' : 'dark';
    root.setAttribute('data-theme', next);
    try { localStorage.setItem('theme', next); } catch (e) {}
    label();
  });
  if (media.addEventListener) media.addEventListener('change', label);
  label();

  var year = document.getElementById('year');
  if (year) year.textContent = new Date().getFullYear();

  var carousel = document.querySelector('.carousel');
  var controls = document.querySelector('.carousel-controls');
  if (carousel && controls) {
    var btns = controls.querySelectorAll('.carousel-btn');
    var update = function () {
      var max = carousel.scrollWidth - carousel.clientWidth;
      controls.hidden = max <= 4;
      btns[0].disabled = carousel.scrollLeft <= 4;
      btns[1].disabled = carousel.scrollLeft >= max - 4;
    };
    btns.forEach(function (b) {
      b.addEventListener('click', function () {
        var card = carousel.querySelector('.post-card');
        var step = card ? card.offsetWidth + 16 : carousel.clientWidth;
        carousel.scrollBy({ left: step * Number(b.dataset.dir), behavior: 'smooth' });
      });
    });
    carousel.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    update();
  }

  var items = document.querySelectorAll('.section, .card');
  if ('IntersectionObserver' in window && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    root.classList.add('js-reveal');
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add('is-visible'); io.unobserve(e.target); }
      });
    }, { rootMargin: '0px 0px -8% 0px' });
    items.forEach(function (el) { io.observe(el); });
  }
})();
