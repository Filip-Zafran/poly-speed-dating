class CustomFooter extends HTMLElement {
  connectedCallback() {
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.innerHTML = `
      <style>
        :host {
          display: block;
          width: 100%;
          background: var(--poly-purple);
          color: var(--poly-white);
          padding: 2rem 0;
          margin-top: 4rem;
        }
        .container {
          max-width: 1100px;
          margin: 0 auto;
          padding: 0 2rem;
          text-align: center;
        }
        .footer-links {
          display: flex;
          justify-content: center;
          gap: 1.5rem;
          margin-bottom: 1rem;
        }
        .footer-link {
          color: var(--poly-white);
          text-decoration: none;
        }
        .footer-link:hover {
          text-decoration: underline;
        }
      </style>
      <div class="container">
        <div class="footer-links">
          <a href="#" class="footer-link">Code of Conduct</a>
          <a href="#" class="footer-link">Privacy</a>
          <a href="#" class="footer-link">Imprint</a>
        </div>
        <div class="copyright">© PSD / Powered by Ficho (fž) <span id="year"></span></div>
      </div>
    `;
    this.shadowRoot.getElementById('year').textContent = new Date().getFullYear();
  }
}
customElements.define('custom-footer', CustomFooter);