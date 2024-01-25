const headerEle = document.querySelector("header");
const navEle = document.querySelector("nav");

// NOTE: nav sticky ////////////////////////////////
function stickyNav(entries: IntersectionObserverEntry[]) {
  const entry = entries[0];

  console.log(entry);
  if (!entry.isIntersecting) {
    navEle?.classList.add("fixed");
    navEle?.classList.add("top-0");
    navEle?.classList.add("bg-white/60");
    navEle?.classList.remove("bg-gray-200");
  } else {
    navEle?.classList.remove("fixed");
    navEle?.classList.remove("top-0");
    navEle?.classList.add("bg-gray-200");
    navEle?.classList.remove("bg-white/60");
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
