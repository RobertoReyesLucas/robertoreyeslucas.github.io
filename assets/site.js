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
