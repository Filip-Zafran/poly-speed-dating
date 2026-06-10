<script lang="ts">
  import { onMount } from 'svelte';

  interface PollData {
    title: string;
    description?: string;
    duration: string;
    date1: string;
    date2: string;
    date3: string;
    expected: number;
    timer_end?: string;
    counts: Record<string, number>;
    votes_preview: Array<{ initials: string; choice: string }>;
  }

  let pollData: PollData | null = null;
  let selectedChoices: string[] = [];
  let voterToken: string = '';
  let loading = true;
  let error: string | null = null;
  let timerText = '';
  let voterName = '';
  let submitted = false;

  function getUrlParams() {
    const params = new URLSearchParams(window.location.search);
    return { token: params.get('token') };
  }

  function generateVoterToken() {
    let token = localStorage.getItem('voterToken');
    if (!token) {
      token = 'voter_' + Math.random().toString(36).substr(2, 9) + '_' + Date.now();
      localStorage.setItem('voterToken', token);
    }
    return token;
  }

  function formatTimeRemaining(milliseconds: number) {
    if (milliseconds <= 0) return 'Poll closed';
    const seconds = Math.floor(milliseconds / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (days > 0) return `${days}d ${hours % 24}h ${minutes % 60}m remaining`;
    if (hours > 0) return `${hours}h ${minutes % 60}m remaining`;
    if (minutes > 0) return `${minutes}m ${seconds % 60}s remaining`;
    return `${seconds}s remaining`;
  }

  function updateTimer() {
    if (!pollData?.timer_end) {
      timerText = '';
      return;
    }

    const endTime = new Date(pollData.timer_end).getTime();
    const remaining = endTime - Date.now();
    timerText = formatTimeRemaining(remaining);
  }

  async function loadPoll() {
    const { token } = getUrlParams();
    if (!token) {
      error = 'No poll specified';
      loading = false;
      return;
    }

    try {
      const response = await fetch(`/api/vote/${token}`);
      if (!response.ok) throw new Error('Poll not found');

      pollData = await response.json();
      updateTimer();

      if (pollData.timer_end) {
        setInterval(updateTimer, 1000);
      }
    } catch (e) {
      error = 'Failed to load poll';
    } finally {
      loading = false;
    }
  }

  function toggleChoice(choice: string) {
    if (choice === 'none') {
      selectedChoices = selectedChoices.includes('none') ? [] : ['none'];
    } else {
      if (selectedChoices.includes('none')) {
        selectedChoices = selectedChoices.filter(c => c !== 'none');
      }
      if (selectedChoices.includes(choice)) {
        selectedChoices = selectedChoices.filter(c => c !== choice);
      } else {
        selectedChoices = [...selectedChoices, choice];
      }
    }
  }

  async function handleVoteSubmit(e: SubmitEvent) {
    e.preventDefault();

    if (selectedChoices.length === 0) {
      alert('Please select at least one option');
      return;
    }

    if (!voterName.trim()) {
      alert('Please enter your name');
      return;
    }

    const { token } = getUrlParams();

    try {
      let choicesToSubmit = selectedChoices;
      if (selectedChoices.includes('none')) {
        choicesToSubmit = ['none'];
      }

      for (const choice of choicesToSubmit) {
        const response = await fetch(`/api/vote/${token}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            voter_name: voterName,
            choice,
            voter_token: voterToken,
          }),
        });

        if (response.status === 409) {
          alert('You have already voted from this device');
          return;
        }

        if (!response.ok) {
          const err = await response.json();
          throw new Error(err.error || 'Failed to submit vote');
        }

        const result = await response.json();
        if (pollData) {
          pollData.counts = result.counts;
          pollData.votes_preview = result.votes_preview;
        }
      }

      submitted = true;
    } catch (e) {
      alert(`Error: ${e instanceof Error ? e.message : 'Unknown error'}`);
    }
  }

  onMount(() => {
    voterToken = generateVoterToken();
    loadPoll();
  });
</script>

<div class="container">
  {#if loading}
    <p>Loading poll...</p>
  {:else if error}
    <div class="error">{error}</div>
  {:else if submitted}
    <div class="success">
      <h2>✅ Thank You!</h2>
      <p>Your vote has been recorded</p>
      <button on:click={() => window.location.reload()}>Vote Again</button>
    </div>
  {:else if pollData}
    <div class="poll-header">
      <h2>{pollData.title}</h2>
      <p>{pollData.description || '(No description)'}</p>
      <div class="poll-meta">
        <span>⏱️ {pollData.duration}</span>
        {#if timerText}
          <span>{timerText}</span>
        {/if}
      </div>
    </div>

    <div class="poll-content">
      <form on:submit={handleVoteSubmit}>
        <h3>Select your availability</h3>

        <div class="date-options">
          {#each ['date1', 'date2', 'date3'] as dateKey, i}
            <div class="date-card" class:selected={selectedChoices.includes(dateKey)}>
              <label>
                <input
                  type="checkbox"
                  value={dateKey}
                  checked={selectedChoices.includes(dateKey)}
                  on:change={() => toggleChoice(dateKey)}
                />
                <div class="date-label">
                  <div class="date-time">
                    {new Date(pollData[dateKey as keyof PollData]).toLocaleString('en-US', {
                      weekday: 'short',
                      month: 'short',
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </div>
                  <div class="date-option">Option {i + 1}</div>
                </div>
              </label>
            </div>
          {/each}

          <div class="date-card" class:selected={selectedChoices.includes('none')}>
            <label>
              <input
                type="checkbox"
                value="none"
                checked={selectedChoices.includes('none')}
                on:change={() => toggleChoice('none')}
              />
              <div class="date-label date-label-none">
                <div class="date-time">❌ I Can't Make It</div>
                <div class="date-option">Can't attend</div>
              </div>
            </label>
          </div>
        </div>

        <div class="form-group">
          <label for="voterName">Your Name *</label>
          <input type="text" id="voterName" bind:value={voterName} placeholder="Enter your name" required />
        </div>

        <button type="submit" class="btn-submit">Submit Vote</button>
      </form>

      <div class="results">
        <h3>Vote Summary</h3>
        {#each ['date1', 'date2', 'date3'] as dateKey}
          <div class="result-item">
            <div class="result-label">
              {new Date(pollData[dateKey as keyof PollData]).toLocaleString('en-US', {
                weekday: 'short',
                month: 'short',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
              })}
            </div>
            <div class="result-bar">
              <div
                class="result-fill"
                style="width: {Math.min(100, (pollData.counts[dateKey] / pollData.expected) * 100)}%"
              >
                {#if pollData.counts[dateKey] > 0}
                  {pollData.counts[dateKey]}
                {/if}
              </div>
            </div>
            <div class="result-count">{pollData.counts[dateKey]} / {pollData.expected}</div>
          </div>
        {/each}

        <div class="result-item">
          <div class="result-label">❌ Can't make it</div>
          <div class="result-count">{pollData.counts.none}</div>
        </div>
      </div>
    </div>
  {/if}
</div>

<style>
  .container {
    max-width: 900px;
    margin: 0 auto;
    padding: 2rem 1.5rem;
  }

  .error {
    background: #fee;
    color: #c33;
    padding: 1rem;
    border-radius: 8px;
  }

  .success {
    text-align: center;
    padding: 2rem;
  }

  .poll-header {
    margin-bottom: 2rem;
  }

  .poll-header h2 {
    margin: 0 0 0.5rem 0;
  }

  .poll-meta {
    display: flex;
    gap: 2rem;
    color: #666;
    font-size: 0.9rem;
  }

  .poll-content {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 2rem;
  }

  form {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
  }

  form h3 {
    margin: 0 0 1rem 0;
  }

  .date-options {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  .date-card {
    border: 2px solid #ddd;
    border-radius: 12px;
    padding: 1rem;
    cursor: pointer;
    transition: all 0.2s;
  }

  .date-card.selected {
    border-color: #009fe3;
    background: #f0f8ff;
  }

  .date-card label {
    display: flex;
    cursor: pointer;
    gap: 1rem;
  }

  .date-card input[type="checkbox"] {
    margin-top: 0.25rem;
  }

  .date-label {
    flex: 1;
  }

  .date-time {
    font-weight: 600;
    color: #333;
  }

  .date-option {
    font-size: 0.85rem;
    color: #999;
  }

  .form-group {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }

  .form-group label {
    font-weight: 600;
  }

  .form-group input {
    padding: 0.75rem;
    border: 1px solid #ddd;
    border-radius: 8px;
    font-size: 1rem;
  }

  .btn-submit {
    background: #fcbf00;
    color: #000;
    padding: 1rem;
    border: none;
    border-radius: 8px;
    font-size: 1rem;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.2s;
  }

  .btn-submit:hover {
    background: #f5b000;
  }

  .results {
    background: #f9f5f1;
    padding: 1.5rem;
    border-radius: 12px;
  }

  .results h3 {
    margin: 0 0 1rem 0;
  }

  .result-item {
    margin-bottom: 1rem;
    padding-bottom: 1rem;
    border-bottom: 1px solid #ddd;
  }

  .result-item:last-child {
    border-bottom: none;
  }

  .result-label {
    font-size: 0.9rem;
    margin-bottom: 0.5rem;
  }

  .result-bar {
    height: 24px;
    background: #ddd;
    border-radius: 4px;
    overflow: hidden;
    margin-bottom: 0.25rem;
  }

  .result-fill {
    height: 100%;
    background: #009fe3;
    color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 0.75rem;
    font-weight: 600;
  }

  .result-count {
    font-size: 0.85rem;
    color: #666;
  }

  @media (max-width: 768px) {
    .poll-content {
      grid-template-columns: 1fr;
    }
  }
</style>
