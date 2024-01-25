const headerEle = document.querySelector("header");
const navEle = document.querySelector("nav");

// NOTE: nav sticky ////////////////////////////////
function stickyNav(entries: IntersectionObserverEntry[]) {
  const entry = entries[0];

  if (!entry.isIntersecting) {
    navEle?.classList.add("fixed");
    navEle?.classList.add("top-0");
    navEle?.classList.add("bg-white/80");
    navEle?.classList.remove("bg-white");
  } else {
    navEle?.classList.remove("fixed");
    navEle?.classList.remove("top-0");
    navEle?.classList.add("bg-white");
    navEle?.classList.remove("bg-white/80");
  }
}

const scrollHeight = headerEle?.getBoundingClientRect().height || 100;

const navObserverOption: IntersectionObserverInit = {
  root: null,
  rootMargin: `${scrollHeight * 4}px`,
  threshold: 0.0,
};

const headerObserver = new IntersectionObserver(stickyNav, navObserverOption);

if (headerEle) {
  headerObserver.observe(headerEle);
}

// NOTE: section animate ////////////////////////////////

const sectionEles = document.querySelectorAll("section");

sectionEles.forEach((section) => section.classList.add("transition-all"));
sectionEles.forEach((section) => section.classList.add("duration-1000"));
sectionEles.forEach((section) => section.classList.add("translate-y-96"));
sectionEles.forEach((section) => section.classList.add("opacity-0"));

function sectionAnimate(
  entries: IntersectionObserverEntry[],
  observer: IntersectionObserver
) {
  entries.forEach((i) => {
    if (i.isIntersecting) {
      requestAnimationFrame(() => {
        i.target.classList.remove("opacity-0");
        i.target.classList.remove("translate-y-96");
        i.target.classList.add("opacity-100");
      });
    }
  });

  const entry = entries[0];

  if (entry.isIntersecting) {
    entry.target.classList.remove("opacity-0");
    entry.target.classList.remove("translate-y-96");
    entry.target.classList.add("opacity-100");
    observer.unobserve(entry.target);
  }
}

const sectionObserverOption: IntersectionObserverInit = {
  root: null,
  threshold: 0.5,
};

const sectionObservers = new IntersectionObserver(
  sectionAnimate,
  navObserverOption
);

if (sectionEles) {
  sectionEles.forEach((sectionEle) => sectionObservers.observe(sectionEle));
}
