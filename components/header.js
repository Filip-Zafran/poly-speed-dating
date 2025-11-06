class CustomHeader extends HTMLElement {
  connectedCallback() {
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.innerHTML = `
      <style>
        :host {
          display: block;
          width: 100%;
          position: sticky;
          top: 0;
          z-index: 50;
          background: var(--poly-white);
          box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }
        .container {
          max-width: 1100px;
          margin: 0 auto;
          padding: 1rem 2rem;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .logo {
          height: 40px;
          display: block;
        }
        .nav-links {
          display: flex;
          gap: 1.5rem;
        }
        .nav-link {
          color: var(--text);
          text-decoration: none;
          font-weight: 600;
          transition: color 0.2s;
        }
        .nav-link:hover {
          color: var(--poly-magenta);
        }
        .active {
          color: var(--poly-blue);
        }
      </style>
      <div class="container">
        <a href="/" class="logo">
          <img src="/images/logo.svg" alt="PSD Logo" height="40" onerror="this.onerror=null; this.src='http://static.photos/education/240x120'">
        </a>
        <nav class="nav-links">
          <a href="/" class="nav-link">Home</a>
          <a href="/apply.html" class="nav-link">Apply</a>
          <a href="/merch.html" class="nav-link">Poly Merch</a>
          <a href="/polyfest.html" class="nav-link active">Poly Fest</a>
<a href="/qna.html" class="nav-link">Q&A</a>
          <a href="/contact.html" class="nav-link">Contact</a>
        </nav>
      </div>
    `;
  }
}
customElements.define('custom-header', CustomHeader);