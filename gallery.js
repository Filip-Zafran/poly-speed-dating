// =======================
// PolyFest Gallery (32 photos) + Masonry + Lightbox
// =======================

document.addEventListener("DOMContentLoaded", () => {
  const grid = document.getElementById("pf-gallery");
  if (!grid) return;

  const IMAGE_COUNT = 32;
  const IMAGE_PATH = "images/gallery/photo"; // becomes photo1.jpg etc.
  const IMAGE_EXT = ".jpg";

  // 1) Inject figures
  for (let i = 1; i <= IMAGE_COUNT; i++) {
    const fig = document.createElement("figure");
    fig.className = "pf-gallery-item";

    const img = document.createElement("img");
    img.src = `${IMAGE_PATH}${i}${IMAGE_EXT}`;
    img.alt = `PolyFest photo ${i}`;
    img.loading = "lazy";

    fig.appendChild(img);
    grid.appendChild(fig);
  }

  const imgs = grid.querySelectorAll(".pf-gallery-item img");

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

  imgs.forEach(img => {
    if (img.complete) {
      resizeItem(img);
    } else {
      img.addEventListener("load", () => resizeItem(img));
    }
  });

  window.addEventListener("resize", () => {
    imgs.forEach(img => resizeItem(img));
  });

  // 3) Lightbox
  const lightbox = document.getElementById("pf-lightbox");
  const lightboxImg = document.getElementById("pf-lightbox-img");
  const lightboxClose = document.getElementById("pf-lightbox-close");

  grid.addEventListener("click", (e) => {
    const img = e.target.closest("img");
    if (!img) return;

    lightboxImg.src = img.src;
    lightboxImg.alt = img.alt || "Gallery image";
    lightbox.classList.add("open");
  });

  function closeLightbox() {
    lightbox.classList.remove("open");
    lightboxImg.src = "";
  }

  lightboxClose?.addEventListener("click", closeLightbox);
  lightbox?.addEventListener("click", (e) => {
    if (e.target === lightbox || e.target === lightboxImg) closeLightbox();
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeLightbox();
  });
});
