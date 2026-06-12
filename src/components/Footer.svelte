<script lang="ts">
  const currentYear = new Date().getFullYear();
</script>

<footer>
  <div class="footer-content">
    <div class="footer-section">
      <h3>PSD</h3>
      <p>Dating event coordination made simple.</p>
    </div>
    <div class="footer-section">
      <h3>Links</h3>
      <ul>
        <li><a href="/privacy">Privacy</a></li>
        <li><a href="/imprint">Imprint</a></li>
        <li><a href="/contact">Contact</a></li>
      </ul>
    </div>
  </div>
  <div class="footer-bottom">
    <p>&copy; {currentYear} PSD. All rights reserved.</p>
  </div>
</footer>

<style>
  footer {
    background-color: var(--psd-fg);
    color: var(--psd-bg);
    margin-top: 2rem;
    padding: var(--psd-space-2xl) var(--psd-space-md);
  }

  .footer-content {
    max-width: 1200px;
    margin: 0 auto;
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: var(--psd-space-2xl);
    margin-bottom: var(--psd-space-2xl);
  }

  .footer-section h3 {
    margin-top: 0;
    margin-bottom: var(--psd-space-md);
    font-size: var(--psd-font-size-lg);
  }

  .footer-section p {
    margin: 0;
    color: rgba(240, 240, 240, 0.8);
  }

  .footer-section ul {
    list-style: none;
    padding: 0;
    margin: 0;
  }

  .footer-section li {
    margin-bottom: var(--psd-space-sm);
  }

  .footer-section a {
    color: var(--psd-bg);
    text-decoration: none;
    transition: opacity 0.2s;
  }

  .footer-section a:hover {
    opacity: 0.8;
  }

  .footer-bottom {
    max-width: 1200px;
    margin: 0 auto;
    padding-top: var(--psd-space-lg);
    border-top: 1px solid rgba(240, 240, 240, 0.2);
    text-align: center;
    font-size: var(--psd-font-size-sm);
    color: rgba(240, 240, 240, 0.6);
  }

  .footer-bottom p {
    margin: 0;
  }
</style>
