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
    <a href="/" class="logo">PSD</a>
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
    background-color: var(--psd-primary);
    border-bottom: 2px solid var(--psd-primary-dark);
    position: sticky;
    top: 0;
    z-index: 100;
  }

  .header-content {
    display: flex;
    justify-content: space-between;
    align-items: center;
    max-width: 1200px;
    margin: 0 auto;
    padding: var(--psd-space-md);
  }

  .logo {
    font-size: var(--psd-font-size-2xl);
    font-weight: var(--psd-font-weight-bold);
    color: var(--psd-fg);
    text-decoration: none;
  }

  .nav-desktop {
    display: flex;
    gap: var(--psd-space-lg);
    align-items: center;
  }

  .nav-desktop a {
    color: var(--psd-fg);
    text-decoration: none;
    font-weight: var(--psd-font-weight-medium);
    transition: opacity 0.2s;
  }

  .nav-desktop a:hover {
    opacity: 0.8;
  }

  .menu-toggle {
    display: none;
    background: none;
    border: none;
    font-size: var(--psd-font-size-xl);
    cursor: pointer;
    color: var(--psd-fg);
  }

  .nav-mobile {
    display: none;
    flex-direction: column;
    gap: var(--psd-space-sm);
    padding: var(--psd-space-md);
    background-color: var(--psd-primary-light);
  }

  .nav-mobile a {
    color: var(--psd-fg);
    text-decoration: none;
    padding: var(--psd-space-sm);
    display: block;
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
