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

  const item = items[currentIndex];
  const thumb = item.querySelector("img");

  lightboxImg.src = item.dataset.full; // the big version, loaded only now
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

// ---------- Category filters ----------
const filterBar = document.querySelector(".filters");
const filterButtons = filterBar.querySelectorAll(".filter-btn");
const galleryItems = gallery.querySelectorAll(".gallery__item");
const filterStatus = document.getElementById("filter-status");

function applyFilter(category) {
  let shown = 0;

  // Show matching photos, hide the rest
  galleryItems.forEach((item) => {
    const matches = category === "all" || item.dataset.category === category;
    item.hidden = !matches;
    if (matches) shown++;
  });

  // Update which button looks (and announces itself as) selected
  filterButtons.forEach((btn) => {
    const isActive = btn.dataset.filter === category;
    btn.classList.toggle("active", isActive);
    btn.setAttribute("aria-pressed", isActive);
  });

  filterStatus.textContent = `Showing ${shown} of ${galleryItems.length} photos`;
}

// Event delegation again: one listener for all four buttons
filterBar.addEventListener("click", (event) => {
  const btn = event.target.closest(".filter-btn");
  if (!btn) return;
  applyFilter(btn.dataset.filter);
});

// ---------- Touch swipe in the lightbox ----------
let touchStartX = 0;

lightbox.addEventListener(
  "touchstart",
  (event) => {
    touchStartX = event.changedTouches[0].clientX; // where the finger landed
  },
  { passive: true }
);

lightbox.addEventListener("touchend", (event) => {
  const distance = event.changedTouches[0].clientX - touchStartX;

  if (Math.abs(distance) < 50) return; // too short: it was a tap, not a swipe

  if (distance < 0) showNext(); // finger moved left, so show the next photo
  else showPrev(); // finger moved right, so show the previous photo
});
