// Reveal-on-scroll + active-port nav highlighting.
// Content is fully visible by default (see style.css) -- this script only
// ADDS animated behavior on top, so if it fails to run the page still works.
(function () {
  var prefersReduced = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  /* ---- reveal on scroll ---- */
  var targets = document.querySelectorAll(".reveal");
  if (!prefersReduced && "IntersectionObserver" in window && targets.length) {
    var revealObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("in-view");
            revealObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );

    targets.forEach(function (el, i) {
      el.classList.add("pre-animate");
      el.style.transitionDelay = (i % 6) * 0.04 + "s";
      revealObserver.observe(el);
    });
  }

  /* ---- active nav port, lit up as its section is in view ---- */
  var navLinks = document.querySelectorAll("[data-nav]");
  var sections = Array.prototype.map.call(navLinks, function (link) {
    var id = link.getAttribute("href").replace("#", "");
    return document.getElementById(id);
  }).filter(Boolean);

  if ("IntersectionObserver" in window && sections.length) {
    var navObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          var id = entry.target.id;
          var link = document.querySelector('[data-nav][href="#' + id + '"]');
          if (!link) return;
          if (entry.isIntersecting) {
            navLinks.forEach(function (l) { l.classList.remove("active"); });
            link.classList.add("active");
          }
        });
      },
      { threshold: 0, rootMargin: "-96px 0px -55% 0px" }
    );
    sections.forEach(function (s) { navObserver.observe(s); });
  }
})();
