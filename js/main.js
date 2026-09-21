(function () {
  "use strict";

  // ---- Active nav link highlighting ----
  var navLinks = document.querySelectorAll(".nav-link");
  var sections = document.querySelectorAll(".section[id]");
  var navLinkMap = {};
  navLinks.forEach(function (link) {
    var href = link.getAttribute("href");
    if (href.charAt(0) === "#") {
      navLinkMap[href.slice(1)] = link;
    }
  });

  if ("IntersectionObserver" in window && sections.length) {
    var navObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          var link = navLinkMap[entry.target.id];
          if (!link) return;
          if (entry.isIntersecting) {
            navLinks.forEach(function (l) { l.classList.remove("active"); });
            link.classList.add("active");
          }
        });
      },
      { rootMargin: "-40% 0px -50% 0px", threshold: 0 }
    );
    sections.forEach(function (section) { navObserver.observe(section); });
  }

  // ---- Mobile nav toggle ----
  var toggle = document.getElementById("navToggle");
  var sidebar = document.getElementById("sidebar");
  var overlay = document.getElementById("navOverlay");

  function closeNav() {
    toggle.classList.remove("open");
    toggle.setAttribute("aria-expanded", "false");
    sidebar.classList.remove("open");
    overlay.classList.remove("open");
  }

  function toggleNav() {
    var isOpen = sidebar.classList.toggle("open");
    toggle.classList.toggle("open", isOpen);
    toggle.setAttribute("aria-expanded", String(isOpen));
    overlay.classList.toggle("open", isOpen);
  }

  if (toggle && sidebar && overlay) {
    toggle.addEventListener("click", toggleNav);
    overlay.addEventListener("click", closeNav);
    navLinks.forEach(function (link) {
      link.addEventListener("click", closeNav);
    });
  }
})();
