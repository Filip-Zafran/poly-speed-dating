<script>
  let activeContact = 'email';
  let activeVenue = 'lovelite';
  let activeTeam = 'ficho';

  const contactData = {
    email: {
      title: 'Email',
      body: 'Write us any time - we usually reply within a few days.',
      cta: 'mailto:polyspeeddating@gmail.com',
      ctaText: 'polyspeeddating@gmail.com'
    },
    'instagram-polyfest': {
      title: 'Instagram - PolyFest',
      body: 'Follow us for event updates, community vibes, and behind-the-scenes content.',
      cta: 'https://www.instagram.com/polyfest_berlin/',
      ctaText: '@polyfest_berlin'
    },
    'instagram-duck': {
      title: 'Instagram - Duck Dating',
      body: 'Check out our blind dating events and community updates.',
      cta: 'https://www.instagram.com/duck.dating.apps/',
      ctaText: '@duck.dating.apps'
    },
    telegram: {
      title: 'Telegram Group',
      body: 'Community chat coming soon.',
      cta: '#',
      ctaText: 'Coming soon'
    }
  };

  const venueData = {
    lovelite: {
      title: 'LoveLite Bar',
      body: 'Simplonstraße 38, 10245 Berlin',
      cta: 'https://lovelit-hauke.jimdofree.com',
      ctaText: 'Visit website'
    },
    trashtelier: {
      title: 'Trashtelier',
      body: 'Herkomerstraße 4, 12435 Berlin',
      cta: 'https://www.trashtelier.de/',
      ctaText: 'Visit website'
    }
  };

  const teamData = {
    ficho: {
      name: 'Ficho',
      role: 'Founder / Moderator',
      bio: 'Ficho (he/him) opened up four years ago with his primary partner and quickly became poly at heart. He is deeply passionate about creating spaces that celebrate connection, communication, and openness through events like Poly Speed Dating, KiezBurn, and Poly Fest.',
      img: '/images/presenters/ficho.jpg'
    },
    akela: {
      name: 'Akela',
      role: 'Founder / Developer / Moderator',
      bio: 'Akela (she/her) is the main developer and founder behind Poly Speed Dating software. She is a community facilitator passionate about authentic connection, consent culture, and helping people meet face-to-face in playful, pressure-free ways.',
      img: '/images/presenters/akela.png'
    },
    dro: {
      name: 'Dr.O',
      role: 'Founder / Moderator',
      bio: 'Dr.O brings valuable expertise and perspective to the team as a founder and moderator.',
      img: '/images/presenters/dro.jpg'
    },
    jay: {
      name: 'Jay M.',
      role: 'Moderator / Organiser',
      bio: 'Jay (he/him) is a community facilitator passionate about authentic connection, consent culture, and helping people meet face-to-face in playful, pressure-free ways.',
      img: '/images/presenters/jay.jpg'
    }
  };

  const contactItems = Object.entries(contactData).map(([key, value]) => ({ key, ...value }));
  const venueItems = Object.entries(venueData).map(([key, value]) => ({ key, ...value }));
  const teamItems = Object.entries(teamData).map(([key, value]) => ({ key, ...value }));

  $: currentContact = contactData[activeContact];
  $: currentVenue = venueData[activeVenue];
  $: currentTeam = teamData[activeTeam];
</script>

<main class="container">
  <h1>Contact PSD</h1>

  <!-- CONTACT US SECTION -->
  <section class="contact-us">
    <h2 class="pf-opening">Contact Us</h2>

    <div class="workshops-wrap">
      <aside class="workshops-sidebar">
        <h2>Channels</h2>

        {#each contactItems as item (item.key)}
          <div class="ws-item">
            <button
              class="ws-link"
              class:is-active={activeContact === item.key}
              on:click={() => (activeContact = item.key)}
            >
              <span class="ws-title">{item.title}</span>
              <span class="ws-meta-mini">
                {#if item.key === 'instagram-polyfest'}
                  @polyfest_berlin
                {:else if item.key === 'instagram-duck'}
                  @duck.dating.apps
                {:else if item.key === 'email'}
                  Best for questions
                {:else}
                  Coming soon
                {/if}
              </span>
            </button>
          </div>
        {/each}
      </aside>

      <section class="ws-detail">
        <div class="ws-detail-inner">
          <h3>{currentContact.title}</h3>
          <p>{currentContact.body}</p>

          {#if currentContact.cta !== '#'}
            <a
              class="pf-link-btn"
              href={currentContact.cta}
              target={currentContact.cta.startsWith('http') ? '_blank' : undefined}
              rel={currentContact.cta.startsWith('http') ? 'noopener noreferrer' : undefined}
            >
              {currentContact.ctaText}
            </a>
          {/if}
        </div>
      </section>
    </div>
  </section>

  <hr class="section-divider" />

  <!-- SUBSCRIBE SECTION -->
  <section class="subscribe-section">
    <h2 class="pf-opening">Stay in the Loop</h2>

    <div class="workshops-wrap">
      <aside class="workshops-sidebar">
        <h2>Mailing List</h2>
        <p class="ws-tip">No spam. Only events. Ever.</p>
      </aside>

      <section class="ws-detail">
        <div class="ws-detail-inner">
          <p>
            We are SUPER-DUPER careful with your data and only send updates
            about PSD events.
          </p>

          <form action="https://formspree.io/f/xnnoewka" method="POST">
            <div class="form-group">
              <label for="name">Name</label>
              <input id="name" name="name" type="text" required />
            </div>

            <div class="form-group">
              <label for="email">Email</label>
              <input id="email" name="email" type="email" required />
            </div>

            <fieldset class="form-group">
              <legend>Interests</legend>
              <label class="checkbox">
                <input type="checkbox" name="interests" value="IRL" checked />
                IRL Events
              </label>
              <label class="checkbox">
                <input type="checkbox" name="interests" value="Online" checked />
                Online Events
              </label>
            </fieldset>

            <label class="checkbox" style="margin-bottom:1rem;">
              <input type="checkbox" required />
              I agree to receive emails from PSD and can unsubscribe anytime.
            </label>

            <button type="submit" class="btn btn-primary">Subscribe</button>
          </form>
        </div>
      </section>
    </div>
  </section>

  <hr class="section-divider" />

  <!-- VENUES SECTION -->
  <section class="venues">
    <h2 class="pf-opening">Our Venues</h2>

    <div class="workshops-wrap">
      <aside class="workshops-sidebar">
        <h2>Locations</h2>

        {#each venueItems as item (item.key)}
          <div class="ws-item">
            <button
              class="ws-link"
              class:is-active={activeVenue === item.key}
              on:click={() => (activeVenue = item.key)}
            >
              <span class="ws-title">{item.title}</span>
              <span class="ws-meta-mini">
                {#if item.key === 'lovelite'}
                  10245 Berlin
                {:else}
                  12435 Berlin
                {/if}
              </span>
            </button>
          </div>
        {/each}
      </aside>

      <section class="ws-detail">
        <div class="ws-detail-inner">
          <h3>{currentVenue.title}</h3>
          <p>{currentVenue.body}</p>

          <a class="pf-link-btn" href={currentVenue.cta} target="_blank" rel="noopener noreferrer">
            {currentVenue.ctaText}
          </a>
        </div>
      </section>
    </div>
  </section>

  <hr class="section-divider" />

  <!-- TEAM SECTION -->
  <section class="team">
    <h2 class="pf-opening">Our Team</h2>

    <div class="workshops-wrap">
      <aside class="workshops-sidebar">
        <h2>Team</h2>

        {#each teamItems as item (item.key)}
          <div class="ws-item">
            <button
              class="ws-link"
              class:is-active={activeTeam === item.key}
              on:click={() => (activeTeam = item.key)}
            >
              <span class="ws-title">{item.name}</span>
              <span class="ws-meta-mini">{item.role.split('/')[0].trim()}</span>
            </button>
          </div>
        {/each}
      </aside>

      <section class="ws-detail">
        <div class="ws-detail-inner team-detail">
          <img
            src={currentTeam.img}
            alt={currentTeam.name}
            class="team-avatar-round"
            on:error={(e) => (e.target.src = '/images/presenters/placeholder.jpg')}
          />

          <h3>{currentTeam.name}</h3>
          <p class="team-role">{currentTeam.role}</p>

          <p>{currentTeam.bio}</p>
        </div>
      </section>
    </div>
  </section>
</main>

<style>
  :global(.pf-opening) {
    font-size: 2.5rem;
    margin-bottom: 2rem;
    color: var(--psd-primary, #340c46);
  }

  :global(.section-divider) {
    margin: 3rem 0;
    border: none;
    border-top: 1px solid #ddd;
  }

  :global(.pf-link-btn) {
    display: inline-block;
    margin-top: 1rem;
    padding: 0.75rem 1.5rem;
    background: var(--psd-primary, #340c46);
    color: white;
    text-decoration: none;
    border-radius: 8px;
    font-weight: 600;
    transition: background 0.2s;
  }

  :global(.pf-link-btn:hover) {
    background: var(--psd-primary-dark, #1a0623);
  }

  :global(.workshops-wrap) {
    display: grid;
    grid-template-columns: 250px 1fr;
    gap: 2rem;
    align-items: start;
  }

  :global(.workshops-sidebar) {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }

  :global(.workshops-sidebar h2) {
    font-size: 1.2rem;
    margin-bottom: 1rem;
    color: var(--psd-primary, #340c46);
  }

  :global(.workshops-sidebar .ws-tip) {
    font-size: 0.9rem;
    color: #666;
    font-style: italic;
  }

  :global(.ws-item) {
    margin-bottom: 0.5rem;
  }

  :global(.ws-link) {
    display: block;
    width: 100%;
    padding: 1rem;
    text-align: left;
    background: #f9f9f9;
    border: 2px solid #e0e0e0;
    border-radius: 8px;
    cursor: pointer;
    transition: all 0.2s;
    font-size: 1rem;
    font-weight: 500;
    color: #333;
  }

  :global(.ws-link:hover) {
    background: #f0f0f0;
    border-color: var(--psd-primary, #340c46);
  }

  :global(.ws-link.is-active) {
    background: var(--psd-primary, #340c46);
    color: white;
    border-color: var(--psd-primary, #340c46);
  }

  :global(.ws-title) {
    display: block;
    font-weight: 600;
    margin-bottom: 0.25rem;
  }

  :global(.ws-meta-mini) {
    display: block;
    font-size: 0.85rem;
    opacity: 0.8;
  }

  :global(.ws-detail-inner) {
    background: white;
    padding: 2rem;
    border-radius: 12px;
    border: 1px solid #e0e0e0;
  }

  :global(.ws-detail-inner h3) {
    margin-top: 0;
    font-size: 1.8rem;
    color: var(--psd-primary, #340c46);
  }

  :global(.ws-detail-inner p) {
    color: #666;
    line-height: 1.6;
    margin: 1rem 0;
  }

  :global(.team-detail) {
    text-align: center;
  }

  :global(.team-avatar-round) {
    width: 200px;
    height: 200px;
    border-radius: 50%;
    object-fit: cover;
    margin-bottom: 1rem;
    border: 3px solid var(--psd-primary, #340c46);
  }

  :global(.team-role) {
    color: var(--psd-primary, #340c46);
    font-weight: 600;
    font-size: 1.1rem;
    margin-bottom: 1.5rem;
  }

  :global(.form-group) {
    margin-bottom: 1.5rem;
  }

  :global(.form-group label) {
    display: block;
    margin-bottom: 0.5rem;
    font-weight: 600;
    color: #333;
  }

  :global(.form-group input),
  :global(.form-group textarea) {
    width: 100%;
    padding: 0.75rem;
    border: 1px solid #ddd;
    border-radius: 6px;
    font-family: inherit;
    font-size: 1rem;
  }

  :global(.form-group input:focus),
  :global(.form-group textarea:focus) {
    outline: none;
    border-color: var(--psd-primary, #340c46);
    box-shadow: 0 0 0 3px rgba(52, 12, 70, 0.1);
  }

  :global(.checkbox) {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    margin-bottom: 0.75rem;
    cursor: pointer;
  }

  :global(.checkbox input) {
    cursor: pointer;
  }

  :global(.btn) {
    padding: 0.75rem 1.5rem;
    border: none;
    border-radius: 6px;
    font-size: 1rem;
    font-weight: 600;
    cursor: pointer;
    transition: background 0.2s;
  }

  :global(.btn-primary) {
    background: var(--psd-primary, #340c46);
    color: white;
  }

  :global(.btn-primary:hover) {
    background: var(--psd-primary-dark, #1a0623);
  }

  @media (max-width: 768px) {
    :global(.workshops-wrap) {
      grid-template-columns: 1fr;
    }

    :global(.team-avatar-round) {
      width: 150px;
      height: 150px;
    }
  }
</style>
