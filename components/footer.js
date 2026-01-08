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
          flex-wrap: wrap;
        }

        .footer-link {
          color: var(--poly-white);
          text-decoration: none;
          font-weight: 500;
        }

        .footer-link:hover {
          text-decoration: underline;
        }

        .copyright {
          font-size: 0.85rem;
          opacity: 0.85;
        }
      </style>

      <div class="container">
        <div class="footer-links">
          <a
            href="images/PSD-CoC.pdf"
            class="footer-link"
            target="_blank"
            rel="noopener"
          >
            📄 Code of Conduct
          </a>

          <a href="privacy.html" class="footer-link">Privacy</a>
<a href="imprint.html" class="footer-link">Imprint</a>

        </div>

        <div class="copyright">
          © PSD / Powered by Ficho (fž) <span id="year"></span>
        </div>
      </div>
    `;

    this.shadowRoot.getElementById('year').textContent =
      new Date().getFullYear();
  }
}

customElements.define('custom-footer', CustomFooter);
