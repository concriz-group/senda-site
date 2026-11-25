// Browser script for the nav component, published as its own hashed file.
// The page arrives collapsible (nav--enhanced) so nothing moves when this runs;
// it only makes the toggle open and close the menu.
(function (enhance) {
  if (typeof module === 'object' && module.exports) module.exports = enhance;
  else document.querySelectorAll('[data-nav]').forEach(enhance);
})(function enhance(nav) {
  var toggle = nav.querySelector('.nav__toggle');
  var list = nav.querySelector('.nav__list');
  if (!toggle || !list) return;

  function setOpen(open) {
    nav.classList.toggle('nav--open', open);
    toggle.setAttribute('aria-expanded', String(open));
  }

  toggle.addEventListener('click', function () {
    setOpen(toggle.getAttribute('aria-expanded') !== 'true');
  });

  nav.addEventListener('keydown', function (event) {
    if (event.key === 'Escape' && nav.classList.contains('nav--open')) {
      setOpen(false);
      toggle.focus();
    }
  });

  list.addEventListener('click', function (event) {
    if (event.target && event.target.closest && event.target.closest('a')) setOpen(false);
  });
});
