<script lang="ts">
  const currentYear = new Date().getFullYear();
</script>

<footer class="footer">
  <div class="container">
    <div class="footer-content">
      <div class="footer-section">
        <h4>Poly Speed Dating</h4>
        <p>Meaningful connections in a polyamorous, consent-first, friendly space.</p>
      </div>

      <div class="footer-section">
        <h4>Links</h4>
        <ul>
          <li><a href="/">Home</a></li>
          <li><a href="/apply">Apply</a></li>
          <li><a href="/calendar">Calendar</a></li>
          <li><a href="/contact">Contact</a></li>
        </ul>
      </div>

      <div class="footer-section">
        <h4>Follow Us</h4>
        <ul>
          <li><a href="https://instagram.com/polyfest_berlin" target="_blank">Instagram</a></li>
          <li><a href="https://telegram.me/polyspeeddatingberlin" target="_blank">Telegram</a></li>
          <li><a href="https://youtube.com/@DuckDatingApps" target="_blank">YouTube</a></li>
        </ul>
      </div>
    </div>

    <hr class="divider" />

    <div class="footer-bottom">
      <p>&copy; {currentYear} Poly Speed Dating. All rights reserved.</p>
      <p>Real conversations. Clear boundaries. Warm community vibe.</p>
    </div>
  </div>
</footer>

<style>
  .footer {
    background: var(--psd-bg-dark);
    color: var(--psd-text-inverse);
    padding: var(--psd-spacing-12) 0 var(--psd-spacing-8);
    margin-top: auto;
  }

  .container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 var(--psd-spacing-6);
  }

  .footer-content {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: var(--psd-spacing-8);
    margin-bottom: var(--psd-spacing-8);
  }

  .footer-section h4 {
    margin-top: 0;
    color: var(--psd-accent);
  }

  .footer-section p {
    color: var(--psd-text-light);
  }

  .footer-section ul {
    list-style: none;
    padding: 0;
    margin: 0;
  }

  .footer-section li {
    margin: var(--psd-spacing-2) 0;
  }

  .footer-section a {
    color: var(--psd-text-inverse);
    transition: color var(--psd-transition-base);
  }

  .footer-section a:hover {
    color: var(--psd-accent);
  }

  .divider {
    border: none;
    border-top: 1px solid rgba(255, 255, 255, 0.1);
    margin: var(--psd-spacing-8) 0;
  }

  .footer-bottom {
    text-align: center;
    color: var(--psd-text-light);
  }

  .footer-bottom p {
    margin: var(--psd-spacing-2) 0;
  }
</style>
