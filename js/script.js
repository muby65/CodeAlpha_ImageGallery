// ---------- Elements ----------
const gallery = document.getElementById("gallery");
const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightbox-img");
const closeBtn = document.getElementById("lightbox-close");
const prevBtn = document.getElementById("lightbox-prev");
const nextBtn = document.getElementById("lightbox-next");
const counter = document.getElementById("lightbox-counter");

// ---------- State: which photo is showing ----------
let currentIndex = 0;

// Only the photos currently shown (filters will hide some later)
function getVisibleItems() {
  return [...gallery.querySelectorAll(".gallery__item:not([hidden])")];
}

// ---------- Show the photo at a given position ----------
function showImage(index) {
  const items = getVisibleItems();

  // Wrap around: after the last comes the first, and the reverse
  currentIndex = (index + items.length) % items.length;

  const thumb = items[currentIndex].querySelector("img");
  lightboxImg.src = thumb.src;
  lightboxImg.alt = thumb.alt;
  counter.textContent = `${currentIndex + 1} of ${items.length}`;
}

// ---------- Open and close ----------
function openLightbox(item) {
  showImage(getVisibleItems().indexOf(item));
  lightbox.showModal();
}

function closeLightbox() {
  lightbox.close();
}

const showNext = () => showImage(currentIndex + 1);
const showPrev = () => showImage(currentIndex - 1);

// ---------- Events ----------
gallery.addEventListener("click", (event) => {
  const item = event.target.closest(".gallery__item");
  if (!item) return;
  openLightbox(item);
});

closeBtn.addEventListener("click", closeLightbox);
nextBtn.addEventListener("click", showNext);
prevBtn.addEventListener("click", showPrev);

// Clicking the dark area closes it
lightbox.addEventListener("click", (event) => {
  if (event.target === lightbox) closeLightbox();
});

// Arrow keys browse (Escape is already handled by <dialog>)
lightbox.addEventListener("keydown", (event) => {
  if (event.key === "ArrowRight") showNext();
  if (event.key === "ArrowLeft") showPrev();
});
