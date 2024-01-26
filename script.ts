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

//////// TODO: image loading
const imageList = document.querySelectorAll("img[data-og]");
let initLoad = true;
function imageLoading(
  entries: IntersectionObserverEntry[],
  observer: IntersectionObserver
) {
  if (initLoad) {
    entries.forEach((ent) => {
      const imgTg = ent.target as HTMLImageElement;
      if (ent.isIntersecting) {
        if (imgTg.dataset?.og) {
          imgTg.src = imgTg.dataset?.og;
          imgTg.addEventListener("load", function () {
            imgTg.classList.remove("blur-md");
            observer.unobserve(imgTg);
          });
          imgTg.addEventListener("error", function () {
            imgTg.src = "/public/images/0.jpeg";
          });
        }
      }
    });
    initLoad = false;
  }
  const entry = entries[0];
  if (entry.isIntersecting) {
    const imgEle = entry.target as HTMLImageElement;
    const showImg = imgEle.dataset.og;
    if (showImg) {
      imgEle.src = showImg;
      imgEle.addEventListener("load", function () {
        imgEle.classList.remove("blur-md");
        observer.unobserve(entry.target);
      });

      imgEle.addEventListener("error", function () {
        imgEle.src = "/public/images/0.jpeg";
        observer.unobserve(entry.target);
      });
    }
  }
}

const imgObserverOption: IntersectionObserverInit = {
  root: null,
  threshold: 0.3,
};
const imgObservers = new IntersectionObserver(imageLoading, imgObserverOption);
if (imageList) {
  imageList.forEach((ig) => imgObservers.observe(ig));
}

/// dialog
const dialogEle = document.querySelector("dialog");
const showBtn = document.querySelector("dialog + button");
const closeBtn = document.querySelector("dialog button");
console.log(showBtn, "fefe");

showBtn?.addEventListener("click", function () {
  console.log("??");
  dialogEle?.showModal();
});

closeBtn?.addEventListener("click", function () {
  dialogEle?.close();
});
