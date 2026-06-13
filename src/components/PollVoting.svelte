<script>
  import { onMount } from 'svelte';

  const API_BASE = import.meta.env.PUBLIC_DUCK_PLAYGROUND_API || 'http://localhost:3001';

  export let pollId = '';

  let poll = null;
  let loading = true;
  let error = '';
  let voterName = '';
  let selectedChoice = '';
  let altDate = '';
  let submitting = false;
  let voteSubmitted = false;

  onMount(async () => {
    if (!pollId) {
      error = 'No poll ID provided';
      loading = false;
      return;
    }

    try {
      const response = await fetch(`${API_BASE}/api/vote/${pollId}`);
      if (!response.ok) {
        error = 'Poll not found';
        loading = false;
        return;
      }

      poll = await response.json();
      loading = false;
    } catch (e) {
      error = 'Failed to load poll';
      console.error(e);
      loading = false;
    }
  });

  async function submitVote() {
    if (!voterName || !selectedChoice) {
      error = 'Please enter your name and select a date';
      return;
    }

    submitting = true;
    error = '';

    try {
      const response = await fetch(`/api/vote/${pollId}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          voter_name: voterName,
          choice: selectedChoice,
          alt_date: altDate || null,
          voter_token: `vote_${Date.now()}_${Math.random()}`
        })
      });

      if (!response.ok) {
        const data = await response.json();
        error = data.error || 'Failed to submit vote';
        submitting = false;
        return;
      }

      const result = await response.json();
      poll = { ...poll, ...result };
      voteSubmitted = true;
      submitting = false;
    } catch (e) {
      error = 'Failed to submit vote';
      console.error(e);
      submitting = false;
    }
  }

  function getDateLabel(dateStr) {
    if (!dateStr) return 'TBD';
    try {
      const date = new Date(dateStr);
      return date.toLocaleDateString('en-US', {
        weekday: 'short',
        month: 'short',
        day: 'numeric',
        year: 'numeric'
      });
    } catch {
      return dateStr;
    }
  }
</script>

<div class="poll-container">
  {#if loading}
    <div class="loading">
      <p>Loading poll...</p>
    </div>
  {:else if error}
    <div class="error-box">
      <h2>⚠️ Error</h2>
      <p>{error}</p>
    </div>
  {:else if poll}
    <div class="poll-content">
      <div class="poll-header">
        <h1>{poll.title}</h1>
        {#if poll.description}
          <p class="description">{poll.description}</p>
        {/if}
      </div>

      {#if poll.timer_end}
        <div class="timer-info">
          <p>⏱️ Timer ends: {new Date(poll.timer_end).toLocaleString()}</p>
        </div>
      {/if}

      {#if voteSubmitted}
        <div class="success-box">
          <h2>✅ Vote Submitted</h2>
          <p>Thank you for voting! Your response has been recorded.</p>
        </div>
      {:else}
        <form on:submit|preventDefault={submitVote} class="vote-form">
          <div class="form-section">
            <label for="voterName">Your Name *</label>
            <input
              id="voterName"
              type="text"
              bind:value={voterName}
              placeholder="Enter your name"
              required
              disabled={submitting}
            />
          </div>

          <div class="form-section">
            <label>Which date works best for you? *</label>
            <div class="date-options">
              {#each [
                { key: 'date1', date: poll.date1 },
                { key: 'date2', date: poll.date2 },
                { key: 'date3', date: poll.date3 },
                { key: 'none', date: 'None of these dates work' }
              ] as option}
                <label class="radio-option">
                  <input
                    type="radio"
                    bind:group={selectedChoice}
                    value={option.key}
                    disabled={submitting}
                  />
                  <span class="radio-label">{getDateLabel(option.date)}</span>
                </label>
              {/each}
            </div>
          </div>

          {#if selectedChoice === 'none'}
            <div class="form-section">
              <label for="altDate">Suggest an alternative date</label>
              <input
                id="altDate"
                type="date"
                bind:value={altDate}
                disabled={submitting}
              />
            </div>
          {/if}

          {#if error}
            <div class="error-message">{error}</div>
          {/if}

          <button
            type="submit"
            class="submit-btn"
            disabled={submitting || !voterName || !selectedChoice}
          >
            {submitting ? 'Submitting...' : 'Submit Vote'}
          </button>
        </form>
      {/if}

      <div class="results-section">
        <h2>Current Votes</h2>
        {#if poll.counts}
          <div class="vote-counts">
            <div class="count-item">
              <span class="label">{getDateLabel(poll.date1)}</span>
              <span class="count">{poll.counts.date1 || 0}</span>
            </div>
            <div class="count-item">
              <span class="label">{getDateLabel(poll.date2)}</span>
              <span class="count">{poll.counts.date2 || 0}</span>
            </div>
            <div class="count-item">
              <span class="label">{getDateLabel(poll.date3)}</span>
              <span class="count">{poll.counts.date3 || 0}</span>
            </div>
            <div class="count-item">
              <span class="label">None of these</span>
              <span class="count">{poll.counts.none || 0}</span>
            </div>
          </div>
        {/if}

        {#if poll.votes_preview && poll.votes_preview.length > 0}
          <div class="voters-list">
            <h3>Voters</h3>
            <ul>
              {#each poll.votes_preview as vote}
                <li>{vote.voter_name} - {getDateLabel(vote.choice_date)}</li>
              {/each}
            </ul>
          </div>
        {/if}
      </div>
    </div>
  {/if}
</div>

<style>
  .poll-container {
    max-width: 600px;
    margin: 0 auto;
    padding: 2rem 1rem;
  }

  .loading,
  .error-box,
  .success-box {
    background: white;
    border-radius: 12px;
    padding: 2rem;
    text-align: center;
  }

  .error-box {
    background: #fff1f1;
    border: 1px solid #f0b7b7;
    color: #8d1f1f;
  }

  .success-box {
    background: #eefcf3;
    border: 1px solid #b7e5c7;
    color: #14663c;
  }

  .poll-header {
    margin-bottom: 2rem;
  }

  .poll-header h1 {
    color: var(--psd-primary, #340c46);
    margin: 0 0 1rem 0;
    font-size: 2rem;
  }

  .description {
    color: #666;
    font-size: 1.1rem;
    line-height: 1.6;
    margin: 0;
  }

  .timer-info {
    background: #fff3cd;
    border: 1px solid #ffc107;
    border-radius: 8px;
    padding: 1rem;
    margin-bottom: 2rem;
    color: #856404;
  }

  .poll-content {
    background: white;
    border-radius: 12px;
    padding: 2rem;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  }

  .vote-form {
    margin-bottom: 3rem;
  }

  .form-section {
    margin-bottom: 2rem;
  }

  .form-section label {
    display: block;
    font-weight: 600;
    color: var(--psd-primary, #340c46);
    margin-bottom: 0.75rem;
  }

  .form-section input[type="text"],
  .form-section input[type="date"] {
    width: 100%;
    padding: 0.75rem;
    border: 1px solid #ddd;
    border-radius: 6px;
    font-size: 1rem;
    font-family: inherit;
  }

  .form-section input:focus {
    outline: none;
    border-color: var(--psd-primary, #340c46);
    box-shadow: 0 0 0 3px rgba(52, 12, 70, 0.1);
  }

  .date-options {
    display: grid;
    gap: 0.75rem;
  }

  .radio-option {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    padding: 1rem;
    background: #f9f9f9;
    border: 2px solid #e0e0e0;
    border-radius: 8px;
    cursor: pointer;
    transition: all 0.2s;
  }

  .radio-option:hover {
    background: #f0f0f0;
    border-color: var(--psd-primary, #340c46);
  }

  .radio-option input[type="radio"] {
    cursor: pointer;
    accent-color: var(--psd-primary, #340c46);
  }

  .radio-label {
    flex: 1;
    font-weight: 500;
  }

  .error-message {
    background: #fff1f1;
    border: 1px solid #f0b7b7;
    color: #8d1f1f;
    padding: 0.75rem;
    border-radius: 6px;
    margin-bottom: 1rem;
  }

  .submit-btn {
    width: 100%;
    padding: 0.875rem;
    background: var(--psd-primary, #340c46);
    color: white;
    border: none;
    border-radius: 8px;
    font-size: 1rem;
    font-weight: 600;
    cursor: pointer;
    transition: background 0.2s;
  }

  .submit-btn:hover:not(:disabled) {
    background: var(--psd-primary-dark, #1a0623);
  }

  .submit-btn:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }

  .results-section {
    border-top: 2px solid #f0f0f0;
    padding-top: 2rem;
  }

  .results-section h2 {
    font-size: 1.5rem;
    color: var(--psd-primary, #340c46);
    margin-top: 0;
  }

  .vote-counts {
    display: grid;
    gap: 0.75rem;
    margin-bottom: 2rem;
  }

  .count-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem;
    background: #f9f9f9;
    border-radius: 8px;
    border: 1px solid #e0e0e0;
  }

  .label {
    font-weight: 500;
    color: #333;
  }

  .count {
    font-size: 1.5rem;
    font-weight: 700;
    color: var(--psd-primary, #340c46);
  }

  .voters-list {
    margin-top: 2rem;
  }

  .voters-list h3 {
    font-size: 1.1rem;
    color: var(--psd-primary, #340c46);
    margin-bottom: 1rem;
  }

  .voters-list ul {
    list-style: none;
    padding: 0;
    margin: 0;
  }

  .voters-list li {
    padding: 0.75rem;
    background: #f9f9f9;
    border-bottom: 1px solid #e0e0e0;
    color: #666;
  }

  .voters-list li:last-child {
    border-bottom: none;
  }
</style>
