<script lang="ts">
  import { onMount } from 'svelte';

  let isMenuOpen = false;

  function toggleMenu() {
    isMenuOpen = !isMenuOpen;
  }

  onMount(() => {
    const closeMenu = () => {
      isMenuOpen = false;
    };

    document.addEventListener('click', closeMenu);
    return () => document.removeEventListener('click', closeMenu);
  });
</script>

<header class="header">
  <div class="container">
    <div class="header-content">
      <a href="/" class="logo">
        <span>🦆</span> Poly Speed Dating
      </a>
      <nav class="nav">
        <a href="/">Home</a>
        <a href="/calendar">Calendar</a>
        <a href="/apply">Apply</a>
        <a href="/poll">Polls</a>
        <a href="/contact">Contact</a>
      </nav>
    </div>
  </div>
</header>

<style>
  .header {
    background: linear-gradient(
      90deg,
      var(--psd-blue) 0%,
      var(--psd-secondary) 50%,
      var(--psd-purple) 100%
    );
    color: var(--psd-text-inverse);
    padding: var(--psd-spacing-6) 0;
    box-shadow: var(--psd-shadow-md);
  }

  .container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 var(--psd-spacing-6);
  }

  .header-content {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .logo {
    font-size: var(--psd-text-2xl);
    font-weight: var(--psd-font-weight-bold);
    color: var(--psd-text-inverse);
    text-decoration: none;
    display: flex;
    align-items: center;
    gap: var(--psd-spacing-2);
  }

  .logo:hover {
    color: var(--psd-accent);
  }

  .nav {
    display: flex;
    gap: var(--psd-spacing-6);
  }

  .nav a {
    color: var(--psd-text-inverse);
    font-weight: var(--psd-font-weight-medium);
    transition: color var(--psd-transition-base);
  }

  .nav a:hover {
    color: var(--psd-accent);
  }

  @media (max-width: 768px) {
    .header-content {
      flex-direction: column;
      gap: var(--psd-spacing-4);
    }

    .nav {
      flex-direction: column;
      gap: var(--psd-spacing-3);
      text-align: center;
    }
  }
</style>
