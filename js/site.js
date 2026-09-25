// Every build for the semester. The top nav bar and the Projects list on the
// home page are both built from this list, so adding a build is one new entry.
window.BUILDS = [
  {
    num: 1,
    title: "Build 1",
    subtitle: "Pre–Adam Smith and Adam Smith",
    href: "build-1.html"
  }
];

(function () {
  var page = window.location.pathname.split("/").pop() || "index.html";

  var nav = document.getElementById("site-nav");
  if (nav) {
    var links = [{ title: "Home", href: "index.html" }].concat(window.BUILDS);
    links.forEach(function (item) {
      var a = document.createElement("a");
      a.href = item.href;
      a.textContent = item.title;
      if (item.href === page) a.setAttribute("aria-current", "page");
      nav.appendChild(a);
    });
  }

  var list = document.getElementById("project-list");
  if (list) {
    window.BUILDS.forEach(function (b) {
      var a = document.createElement("a");
      a.className = "project-bar";
      a.href = b.href;
      a.innerHTML =
        '<span class="project-num"></span>' +
        '<span class="project-text"><h3></h3><p></p></span>' +
        '<span class="project-arrow" aria-hidden="true">→</span>';
      a.querySelector(".project-num").textContent = String(b.num).padStart(2, "0");
      a.querySelector("h3").textContent = b.title;
      a.querySelector("p").textContent = b.subtitle;
      list.appendChild(a);
    });

    var soon = document.createElement("div");
    soon.className = "project-bar soon";
    soon.innerHTML =
      '<span class="project-num">' + String(window.BUILDS.length + 1).padStart(2, "0") + "</span>" +
      '<span class="project-text"><h3>More coming soon</h3><p>New builds will be added throughout the semester.</p></span>';
    list.appendChild(soon);
  }
})();
