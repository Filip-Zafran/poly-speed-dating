<script>
  let currentUser = {
    name: 'You',
    interests: ['hiking', 'bouldering', 'yoga', 'museums', 'cafes'],
    matchType: 'Romantic'
  };

  let matches = [
    {
      id: 1,
      name: 'Alex',
      matchType: 'Romantic Match',
      instagram: '@alex_adventure',
      interests: ['hiking', 'bouldering', 'museums', 'cafes', 'galleries'],
      sharedInterests: ['hiking', 'bouldering', 'museums', 'cafes'],
      suggestedEvents: [
        { name: 'Hiking Trip - Berlin', date: '2026-06-15' },
        { name: 'Museum Night', date: '2026-06-22' }
      ]
    },
    {
      id: 2,
      name: 'Jordan',
      matchType: 'Romantic Match',
      instagram: '@jordan_yoga',
      interests: ['yoga', 'meditation', 'cafes', 'art'],
      sharedInterests: ['yoga', 'cafes'],
      suggestedEvents: [
        { name: 'Yoga Session', date: '2026-06-18' },
        { name: 'Cafe Meetup', date: '2026-06-25' }
      ]
    },
    {
      id: 3,
      name: 'Casey',
      matchType: 'Friend Match',
      instagram: '@casey_outdoors',
      interests: ['hiking', 'camping', 'mountains', 'outdoor cooking'],
      sharedInterests: ['hiking'],
      suggestedEvents: [
        { name: 'Outdoor Cooking Workshop', date: '2026-07-01' }
      ]
    }
  ];

  let expandedMatchId = null;
  let selectedView = 'matches'; // 'matches' or 'interests'

  function toggleMatchExpansion(id) {
    expandedMatchId = expandedMatchId === id ? null : id;
  }

  function getSharedCount(match) {
    return match.sharedInterests.length;
  }

  function getCommonPercentage(match) {
    return Math.round(
      (match.sharedInterests.length / Math.max(match.interests.length, currentUser.interests.length)) *
        100
    );
  }

  function getInterestColor(index) {
    const colors = [
      '#FF6B6B',
      '#4ECDC4',
      '#45B7D1',
      '#FFA07A',
      '#98D8C8',
      '#F7DC6F',
      '#BB8FCE',
      '#85C1E2'
    ];
    return colors[index % colors.length];
  }
</script>

<div class="connectors-container">
  <div class="header">
    <h1>Match Connectors</h1>
    <p>Discover shared interests and suggested events with your matches</p>
  </div>

  <div class="view-toggle">
    <button
      class="toggle-btn"
      class:active={selectedView === 'matches'}
      on:click={() => (selectedView = 'matches')}
    >
      👥 Matches ({matches.length})
    </button>
    <button
      class="toggle-btn"
      class:active={selectedView === 'interests'}
      on:click={() => (selectedView = 'interests')}
    >
      ❤️ Your Interests
    </button>
  </div>

  {#if selectedView === 'interests'}
    <div class="interests-card">
      <h2>Your Interests</h2>
      <div class="interests-grid">
        {#each currentUser.interests as interest, index}
          <div class="interest-tag" style="background: {getInterestColor(index)}">
            {interest}
          </div>
        {/each}
      </div>
      <p class="interests-note">These interests help us find better matches for you</p>
    </div>
  {:else}
    <div class="matches-list">
      {#each matches as match (match.id)}
        <div class="match-card">
          <div class="match-header">
            <div class="match-info">
              <h3>{match.name}</h3>
              <p class="match-type">{match.matchType}</p>
              {#if match.instagram}
                <p class="instagram">{match.instagram}</p>
              {/if}
            </div>
            <div class="match-stats">
              <div class="compatibility">
                <div class="percentage">{getCommonPercentage(match)}%</div>
                <div class="label">Compatible</div>
              </div>
            </div>
          </div>

          <div class="shared-interests">
            <h4>Shared Interests ({getSharedCount(match)})</h4>
            <div class="interests-display">
              {#each match.sharedInterests as interest, index}
                <span class="shared-tag" style="background: {getInterestColor(index)}">
                  ✓ {interest}
                </span>
              {/each}
            </div>
          </div>

          <button
            class="expand-btn"
            on:click={() => toggleMatchExpansion(match.id)}
          >
            {expandedMatchId === match.id ? '▼' : '▶'} More Details
          </button>

          {#if expandedMatchId === match.id}
            <div class="match-details">
              <div class="details-section">
                <h4>Their Interests</h4>
                <div class="interests-display">
                  {#each match.interests as interest, index}
                    <span
                      class="interest-tag"
                      style="background: {getInterestColor(index)}"
                    >
                      {interest}
                    </span>
                  {/each}
                </div>
              </div>

              <div class="details-section">
                <h4>Suggested Events</h4>
                {#if match.suggestedEvents.length > 0}
                  <ul class="events-list">
                    {#each match.suggestedEvents as event}
                      <li>
                        <strong>{event.name}</strong>
                        <span class="event-date">
                          📅 {new Date(event.date).toLocaleDateString()}
                        </span>
                      </li>
                    {/each}
                  </ul>
                {:else}
                  <p class="no-events">No suggested events at this time</p>
                {/if}
              </div>

              <div class="details-section">
                <h4>Interest Analysis</h4>
                <div class="analysis">
                  <p>
                    <strong>Shared Interests:</strong> {match.sharedInterests.length} out of {Math.max(
                      match.interests.length,
                      currentUser.interests.length
                    )}
                  </p>
                  <p>
                    <strong>Your unique interests:</strong> {currentUser.interests
                      .filter((i) => !match.sharedInterests.includes(i))
                      .join(', ')}
                  </p>
                  <p>
                    <strong>Their unique interests:</strong> {match.interests
                      .filter((i) => !match.sharedInterests.includes(i))
                      .join(', ')}
                  </p>
                </div>
              </div>

              <button class="action-btn">💬 Send Message</button>
            </div>
          {/if}
        </div>
      {/each}
    </div>
  {/if}
</div>

<style>
  .connectors-container {
    max-width: 900px;
    margin: 0 auto;
    padding: 2rem 1rem;
  }

  .header {
    margin-bottom: 3rem;
  }

  .header h1 {
    font-size: 2.5rem;
    color: var(--psd-primary, #340c46);
    margin: 0 0 0.5rem 0;
  }

  .header p {
    color: #666;
    font-size: 1.1rem;
    margin: 0;
  }

  .view-toggle {
    display: flex;
    gap: 1rem;
    margin-bottom: 2rem;
  }

  .toggle-btn {
    padding: 0.75rem 1.5rem;
    border: 2px solid #ddd;
    background: white;
    border-radius: 8px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.2s;
  }

  .toggle-btn.active {
    background: var(--psd-primary, #340c46);
    color: white;
    border-color: var(--psd-primary, #340c46);
  }

  .toggle-btn:hover:not(.active) {
    border-color: var(--psd-primary, #340c46);
  }

  .interests-card {
    background: white;
    border-radius: 12px;
    padding: 2rem;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  }

  .interests-card h2 {
    color: var(--psd-primary, #340c46);
    margin-top: 0;
  }

  .interests-grid {
    display: flex;
    flex-wrap: wrap;
    gap: 1rem;
    margin: 1.5rem 0;
  }

  .interest-tag,
  .shared-tag {
    display: inline-block;
    padding: 0.6rem 1.2rem;
    border-radius: 20px;
    color: white;
    font-weight: 600;
    font-size: 0.9rem;
  }

  .interests-note {
    color: #999;
    font-style: italic;
    margin: 1rem 0 0 0;
  }

  .matches-list {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
  }

  .match-card {
    background: white;
    border-radius: 12px;
    padding: 1.5rem;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
    transition: all 0.2s;
  }

  .match-card:hover {
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.12);
  }

  .match-header {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    margin-bottom: 1rem;
  }

  .match-info h3 {
    margin: 0 0 0.25rem 0;
    color: #1a1a1a;
    font-size: 1.3rem;
  }

  .match-type {
    color: var(--psd-primary, #340c46);
    font-weight: 600;
    font-size: 0.95rem;
    margin: 0 0 0.25rem 0;
  }

  .instagram {
    color: #0066cc;
    font-size: 0.9rem;
    margin: 0;
  }

  .compatibility {
    text-align: center;
    padding: 1rem;
    background: #f9f9f9;
    border-radius: 8px;
  }

  .percentage {
    font-size: 2rem;
    font-weight: 700;
    color: var(--psd-primary, #340c46);
  }

  .label {
    color: #666;
    font-size: 0.9rem;
  }

  .shared-interests {
    margin: 1.5rem 0;
  }

  .shared-interests h4 {
    margin: 0 0 0.75rem 0;
    color: #333;
  }

  .interests-display {
    display: flex;
    flex-wrap: wrap;
    gap: 0.6rem;
  }

  .expand-btn {
    width: 100%;
    padding: 0.75rem;
    border: 1px solid #ddd;
    background: #f9f9f9;
    border-radius: 6px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.2s;
    margin: 1rem 0;
  }

  .expand-btn:hover {
    background: #f0f0f0;
    border-color: var(--psd-primary, #340c46);
  }

  .match-details {
    margin-top: 1.5rem;
    padding-top: 1.5rem;
    border-top: 2px solid #f0f0f0;
  }

  .details-section {
    margin-bottom: 1.5rem;
  }

  .details-section h4 {
    margin: 0 0 0.75rem 0;
    color: #333;
  }

  .events-list {
    list-style: none;
    padding: 0;
    margin: 0;
  }

  .events-list li {
    padding: 0.75rem;
    background: #f9f9f9;
    border-radius: 6px;
    margin-bottom: 0.5rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .event-date {
    color: #999;
    font-size: 0.9rem;
  }

  .no-events {
    color: #999;
    font-style: italic;
  }

  .analysis {
    background: #f9f9f9;
    padding: 1rem;
    border-radius: 6px;
  }

  .analysis p {
    margin: 0.5rem 0;
    color: #555;
    font-size: 0.9rem;
    line-height: 1.5;
  }

  .action-btn {
    width: 100%;
    padding: 0.75rem 1.5rem;
    background: var(--psd-primary, #340c46);
    color: white;
    border: none;
    border-radius: 8px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.2s;
  }

  .action-btn:hover {
    background: var(--psd-primary-dark, #1a0623);
  }

  @media (max-width: 768px) {
    .match-header {
      flex-direction: column;
      gap: 1rem;
    }

    .compatibility {
      width: 100%;
    }

    .view-toggle {
      flex-direction: column;
    }

    .toggle-btn {
      width: 100%;
    }
  }
</style>
