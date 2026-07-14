// =======================
// PolyFest Gallery (loop) + Masonry + Lightbox + Keyboard + Swipe
// =======================

document.addEventListener("DOMContentLoaded", () => {
  const grid = document.getElementById("pf-gallery");
  if (!grid) return;

  const IMAGE_COUNT = 32;
  const IMAGE_PATH = "images/gallery/photo";
  const IMAGE_EXT = ".jpg";

  let currentIndex = 0;
  let images = [];

  // 1) Inject figures
  for (let i = 1; i <= IMAGE_COUNT; i++) {
    const fig = document.createElement("figure");
    fig.className = "pf-gallery-item";

    const img = document.createElement("img");
    img.src = `${IMAGE_PATH}${i}${IMAGE_EXT}`;
    img.alt = `PolyFest photo ${i}`;
    img.loading = "lazy";
    img.dataset.index = i - 1;

    fig.appendChild(img);
    grid.appendChild(fig);
  }

  images = Array.from(grid.querySelectorAll(".pf-gallery-item img"));

  // 2) Masonry sizing
  function resizeItem(img) {
    const item = img.closest(".pf-gallery-item");
    if (!item) return;

    const rowHeight = parseInt(getComputedStyle(grid).getPropertyValue("grid-auto-rows"));
    const rowGap = parseInt(getComputedStyle(grid).getPropertyValue("gap"));

    const height = img.getBoundingClientRect().height;
    const span = Math.ceil((height + rowGap) / (rowHeight + rowGap));

    item.style.gridRowEnd = `span ${span}`;
  }

  images.forEach(img => {
    if (img.complete) resizeItem(img);
    else img.addEventListener("load", () => resizeItem(img));
  });

  window.addEventListener("resize", () => {
    images.forEach(img => resizeItem(img));
  });

  // 3) Lightbox
  const lightbox = document.getElementById("pf-lightbox");
  const lightboxImg = document.getElementById("pf-lightbox-img");
  const lightboxClose = document.getElementById("pf-lightbox-close");

  function openLightbox(index) {
    currentIndex = index;
    const img = images[currentIndex];
    if (!img) return;

    lightboxImg.src = img.src;
    lightboxImg.alt = img.alt || "Gallery image";
    lightbox.classList.add("open");
    document.body.style.overflow = "hidden";
  }

  function closeLightbox() {
    lightbox.classList.remove("open");
    lightboxImg.src = "";
    document.body.style.overflow = "";
  }

  function nextImage() {
    currentIndex = (currentIndex + 1) % images.length;
    openLightbox(currentIndex);
  }

  function prevImage() {
    currentIndex = (currentIndex - 1 + images.length) % images.length;
    openLightbox(currentIndex);
  }

  // Click on grid opens lightbox
  grid.addEventListener("click", (e) => {
    const img = e.target.closest("img");
    if (!img) return;
    openLightbox(Number(img.dataset.index));
  });

  // Close button
  lightboxClose?.addEventListener("click", closeLightbox);

  // Click outside image closes
  lightbox?.addEventListener("click", (e) => {
    if (e.target === lightbox) closeLightbox();
  });

  // Keyboard navigation
  document.addEventListener("keydown", (e) => {
    if (!lightbox.classList.contains("open")) return;

    if (e.key === "Escape") closeLightbox();
    if (e.key === "ArrowRight") nextImage();
    if (e.key === "ArrowLeft") prevImage();
  });

  // 4) Mobile swipe support
  let touchStartX = 0;
  let touchEndX = 0;

  lightboxImg.addEventListener("touchstart", (e) => {
    touchStartX = e.changedTouches[0].screenX;
  });

  lightboxImg.addEventListener("touchend", (e) => {
    touchEndX = e.changedTouches[0].screenX;
    const diff = touchStartX - touchEndX;

    if (Math.abs(diff) > 45) {
      if (diff > 0) nextImage();  // swipe left → next
      else prevImage();           // swipe right → prev
    }
  });

  // Optional: tap image to go next on mobile
  lightboxImg.addEventListener("click", (e) => {
    // allow click zoom-out feel on desktop by NOT forcing next there
    if (window.innerWidth <= 700) nextImage();
  });
});
