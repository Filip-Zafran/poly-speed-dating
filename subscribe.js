// PolyFest subscribe form UX helper (Formspree)
document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("pf-subscribe-form");
  const statusEl = document.getElementById("pf-subscribe-status");
  if (!form || !statusEl) return;

  form.addEventListener("submit", () => {
    statusEl.textContent = "Sending...";
  });

  form.addEventListener("formspree:success", () => {
    statusEl.textContent = "Thanks — you’re on the list! 💜";
    form.reset();
  });

  form.addEventListener("formspree:error", () => {
    statusEl.textContent = "Oops, something went wrong. Try again?";
  });
});
