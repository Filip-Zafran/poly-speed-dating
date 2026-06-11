<script lang="ts">
  let isMenuOpen = $state(false);

  const navItems = [
    { label: 'Home', href: '/' },
    { label: 'Calendar', href: '/calendar' },
    { label: 'Identity', href: '/identity' },
    { label: 'Polyfest', href: '/polyfest' },
    { label: 'FAQ', href: '/faq' },
    { label: 'Merch', href: '/merch' },
    { label: 'Contact', href: '/contact' }
  ];
</script>

<header>
  <div class="header-content">
    <a href="/" class="logo">
      <img src="/images/PSD-logo.png" alt="PSD Logo" class="logo-img" />
    </a>
    <nav class="nav-desktop">
      {#each navItems as item}
        <a href={item.href}>{item.label}</a>
      {/each}
    </nav>
    <button
      class="menu-toggle"
      on:click={() => isMenuOpen = !isMenuOpen}
      aria-label="Toggle menu"
    >
      ☰
    </button>
  </div>

  {#if isMenuOpen}
    <nav class="nav-mobile">
      {#each navItems as item}
        <a href={item.href} on:click={() => isMenuOpen = false}>{item.label}</a>
      {/each}
    </nav>
  {/if}
</header>

<style>
  header {
    background: linear-gradient(135deg, #0066ff 0%, #6633cc 50%, #ff1493 100%);
    position: sticky;
    top: 0;
    z-index: 100;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  }

  .header-content {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    padding: 1rem 2rem;
  }

  .logo {
    text-decoration: none;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    height: 60px;
  }

  .logo-img {
    height: 60px;
    width: auto;
    object-fit: contain;
    transition: transform 0.2s ease;
  }

  .logo:hover .logo-img {
    transform: scale(1.05);
  }

  .nav-desktop {
    display: flex;
    gap: 2rem;
    align-items: center;
  }

  .nav-desktop a {
    color: white;
    text-decoration: none;
    font-weight: 600;
    font-size: 0.95rem;
    transition: opacity 0.2s ease;
    text-transform: capitalize;
  }

  .nav-desktop a:hover {
    opacity: 0.8;
    text-decoration: underline;
  }

  .menu-toggle {
    display: none;
    background: none;
    border: none;
    font-size: 1.5rem;
    cursor: pointer;
    color: white;
  }

  .nav-mobile {
    display: none;
    flex-direction: column;
    gap: 0.5rem;
    padding: 1rem 2rem;
    background: rgba(0, 0, 0, 0.1);
  }

  .nav-mobile a {
    color: white;
    text-decoration: none;
    padding: 0.75rem;
    display: block;
    font-weight: 500;
  }

  .nav-mobile a:hover {
    background: rgba(255, 255, 255, 0.1);
    border-radius: 4px;
  }

  @media (max-width: 768px) {
    .nav-desktop {
      display: none;
    }

    .menu-toggle {
      display: block;
    }

    .nav-mobile {
      display: flex;
    }
  }
</style>
