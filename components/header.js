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
          background: linear-gradient(90deg, #00AEEF, #E50051, #2B004D);
          color: white;
          box-shadow: 0 2px 4px rgba(0,0,0,0.2);
        }

        .container {
          max-width: 1100px;
          margin: 0 auto;
          padding: 1rem 2rem;
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-wrap: wrap;
        }

        .logo img {
          height: 48px;
          display: block;
        }

        .nav-links {
          display: flex;
          gap: 1.5rem;
          flex-wrap: wrap;
        }

        .nav-link {
          position: relative;
          color: #FFF;
          text-decoration: none;
          font-weight: 700;
          padding-bottom: 4px;
          transition: color 0.2s ease;
        }

        .nav-link:hover {
          color: #FFCC00;
        }

        .nav-link.active::after {
          content: "";
          position: absolute;
          left: 0;
          bottom: 0;
          width: 100%;
          height: 3px;
          background-color: #E50051;
          border-radius: 2px;
        }

        @media (max-width: 640px) {
          .container {
            padding: 1rem;
            flex-direction: column;
            align-items: flex-start;
          }

          .nav-links {
            gap: 1rem;
            width: 100%;
          }

          .nav-link {
            font-size: 0.95rem;
          }
        }
      </style>

      <div class="container">
        <a href="index.html" class="logo">
          <img src="images/logo.png" alt="PSD Logo">
        </a>

        <nav class="nav-links">
          <a href="index.html" class="nav-link">Home</a>
          <a href="calendar.html" class="nav-link">Calendar</a>
          <a href="faq.html" class="nav-link">FAQ</a>

          <a href="merch.html" class="nav-link">
            Poly Merch <span id="cart-count"></span>
          </a>

          <a href="polyfest.html" class="nav-link">PolyFest</a>
          <a href="contact.html" class="nav-link">Contact</a>
        </nav>
      </div>
    `;

    // Active link highlighting
    const currentPath =
      window.location.pathname.split('/').pop() || 'index.html';

    const links = this.shadowRoot.querySelectorAll('.nav-link');

    links.forEach(link => {
      const href = link.getAttribute('href');
      if (href === currentPath) {
        link.classList.add('active');
      }
    });
  }
}

customElements.define('custom-header', CustomHeader);
