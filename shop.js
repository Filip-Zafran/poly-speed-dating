// ============================
// PSD Shop / Cart Script
// ============================

(() => {
  const CART_KEY = 'psd_cart_v1';

  // ---------- Cart storage ----------
  const loadCart = () => {
    try { return JSON.parse(localStorage.getItem(CART_KEY)) || []; }
    catch { return []; }
  };
  const saveCart = (cart) => localStorage.setItem(CART_KEY, JSON.stringify(cart));
  const cartTotal = (cart) => cart.reduce((sum, i) => sum + i.price * i.qty, 0);
  const formatEur = (n) => (Math.round(n * 100) / 100).toFixed(2);

  // ---------- UI helpers ----------
  function flashAdded(name) {
    const t = document.createElement('div');
    t.textContent = `Added: ${name}`;
    t.style.cssText = `
      position:fixed; right:16px; bottom:16px;
      background:#2B004D; color:#fff; padding:10px 16px;
      border-radius:10px; z-index:9999; font-weight:600;
      box-shadow:0 6px 20px rgba(0,0,0,.25);
    `;
    document.body.appendChild(t);
    setTimeout(() => t.remove(), 1500);
  }

  function updateCartCount() {
    const el = document.getElementById('cart-count');
    if (!el) return;
    const totalQty = loadCart().reduce((s, i) => s + i.qty, 0);
    el.textContent = totalQty > 0 ? `(${totalQty})` : '';
  }

  // ---------- Cart operations ----------
  function addItem({ sku, name, price }) {
    const cart = loadCart();
    const existing = cart.find(i => i.sku === sku);
    if (existing) existing.qty += 1;
    else cart.push({ sku, name, price: Number(price || 0), qty: 1 });
    saveCart(cart);
    flashAdded(name);
    updateCartCount();
  }

  function updateQty(sku, qty) {
    const cart = loadCart();
    const item = cart.find(i => i.sku === sku);
    if (item) item.qty = Math.max(1, Number(qty) || 1);
    saveCart(cart);
    renderCartTable();
  }

  function removeItem(sku) {
    const cart = loadCart().filter(i => i.sku !== sku);
    saveCart(cart);
    renderCartTable();
  }

  function clearCart() {
    saveCart([]);
    renderCartTable();
    updateCartCount();
  }

  // ---------- Cart table (order.html) ----------
  function renderCartTable() {
    const table = document.getElementById('cart-table');
    const empty = document.getElementById('cart-empty');
    const body  = document.getElementById('cart-body');
    const totalEl = document.getElementById('cart-total');
    const jsonEl  = document.getElementById('cart-json');

    if (!table || !body) return; // not on order.html

    const cart = loadCart();

    if (cart.length === 0) {
      table.style.display = 'none';
      if (empty) empty.style.display = 'block';
      if (jsonEl) jsonEl.value = '[]';
      return;
    }

    table.style.display = '';
    if (empty) empty.style.display = 'none';

    body.innerHTML = cart.map(item => `
      <tr>
        <td>${item.name}</td>
        <td align="right">${formatEUR(item.price)}</td>
        <td align="center">
          <input type="number" min="1" value="${item.qty}" data-qty="${item.sku}" style="width:64px">
        </td>
        <td align="right">${formatEUR(item.price * item.qty)}</td>
        <td align="center"><button class="linklike" data-remove="${item.sku}">✕</button></td>
      </tr>
    `).join('');

    if (totalEl) totalEl.textContent = formatEUR(cartTotal(cart));
    if (jsonEl) {
      jsonEl.value = JSON.stringify({
        items: cart,
        total: cartTotal(cart),
        currency: 'EUR',
        created_at: new Date().toISOString()
      });
    }

    // Optional: render a clear cart button if you add an element with id="clear-cart"
    const clearBtn = document.getElementById('clear-cart');
    if (clearBtn) clearBtn.onclick = clearCart;
  }

  // ---------- Event delegation (buttons, qty, remove) ----------
  document.addEventListener('click', (e) => {
    // Add to cart
    const btn = e.target.closest('.add-to-cart');
    if (btn) {
      const sku   = btn.dataset.sku;
      const name  = btn.dataset.name;
      const price = btn.dataset.price;
      addItem({ sku, name, price });
      return;
    }

    // Remove item
    const remove = e.target.getAttribute('data-remove');
    if (remove) {
      removeItem(remove);
      return;
    }
  });

  document.addEventListener('input', (e) => {
    const sku = e.target.getAttribute('data-qty');
    if (sku) updateQty(sku, e.target.value);
  });

  // ---------- Lightbox (click to enlarge merch images) ----------
  function initLightbox() {
    const overlay = document.createElement('div');
    overlay.className = 'lightbox-overlay';
    overlay.innerHTML = '<img src="" alt="Expanded view">';
    document.body.appendChild(overlay);

    const overlayImg = overlay.querySelector('img');

    document.body.addEventListener('click', (e) => {
      const img = e.target.closest('.merch-item img');
      if (!img) return;
      overlayImg.src = img.src;
      overlay.classList.add('active');
    });

    const close = () => overlay.classList.remove('active');
    overlay.addEventListener('click', close);
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') close();
    });
  }

  // ---------- Init on load ----------
  document.addEventListener('DOMContentLoaded', () => {
    renderCartTable();
    updateCartCount();
    initLightbox();
  });
})();
