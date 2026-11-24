// ---------- Grab the elements we need ----------
const gallery = document.getElementById("gallery");
const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightbox-img");
const closeBtn = document.getElementById("lightbox-close");

// ---------- Open: copy the clicked photo into the dialog ----------
function openLightbox(thumb) {
  lightboxImg.src = thumb.src;
  lightboxImg.alt = thumb.alt;
  lightbox.showModal(); // opens as a modal: backdrop + focus trap
}

// ---------- Close ----------
function closeLightbox() {
  lightbox.close(); // focus returns to the thumbnail automatically
}

// ---------- Events ----------
// Event delegation: one listener on the gallery covers every image
gallery.addEventListener("click", (event) => {
  const item = event.target.closest(".gallery__item");
  if (!item) return; // click was on empty space, ignore it
  openLightbox(item.querySelector("img"));
});

closeBtn.addEventListener("click", closeLightbox);

// Clicking the dark area closes it. The dialog fills the screen, so
// event.target is the dialog itself only when the empty area is clicked.
lightbox.addEventListener("click", (event) => {
  if (event.target === lightbox) closeLightbox();
});
