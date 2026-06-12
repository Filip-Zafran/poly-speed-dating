<script>
  import { onMount } from 'svelte';

  let adminToken = '';
  let polls = [];
  let loading = true;
  let showForm = false;

  let formData = {
    title: '',
    description: '',
    date1: '',
    date2: '',
    date3: '',
    expected: '',
    openAccess: false,
    timerMinutes: '',
    inviteEmails: ''
  };

  let formSubmitting = false;
  let formError = '';
  let formSuccess = '';

  onMount(async () => {
    adminToken = new URLSearchParams(window.location.search).get('admin') || '';
    await loadPolls();
  });

  async function loadPolls() {
    try {
      const response = await fetch('/api/polls');
      if (response.ok) {
        polls = await response.json();
      }
    } catch (e) {
      console.error('Error loading polls:', e);
    } finally {
      loading = false;
    }
  }

  async function submitForm() {
    if (!formData.title || !formData.date1 || !formData.date2 || !formData.date3) {
      formError = 'Title and all three dates are required';
      return;
    }

    formSubmitting = true;
    formError = '';
    formSuccess = '';

    try {
      const inviteEmails = formData.inviteEmails
        .split('\n')
        .map((e) => e.trim())
        .filter((e) => e.length > 0);

      const response = await fetch('/api/polls', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: formData.title,
          description: formData.description || undefined,
          date1: formData.date1,
          date2: formData.date2,
          date3: formData.date3,
          expected: formData.expected ? parseInt(formData.expected) : undefined,
          open_access: formData.openAccess,
          timer_minutes: formData.timerMinutes ? parseInt(formData.timerMinutes) : 0,
          invite_emails: inviteEmails
        })
      });

      if (!response.ok) {
        const error = await response.json();
        formError = error.error || 'Failed to create poll';
        formSubmitting = false;
        return;
      }

      const result = await response.json();
      formSuccess = `Poll created! Vote URL: /poll-vote?token=${result.id}`;

      // Reset form
      formData = {
        title: '',
        description: '',
        date1: '',
        date2: '',
        date3: '',
        expected: '',
        openAccess: false,
        timerMinutes: '',
        inviteEmails: ''
      };

      // Reload polls
      await loadPolls();
      formSubmitting = false;
      showForm = false;
    } catch (e) {
      const msg = e instanceof Error ? e.message : String(e);
      formError = 'Error creating poll: ' + msg;
      formSubmitting = false;
    }
  }

  function getDateLabel(dateStr) {
    if (!dateStr) return 'TBD';
    try {
      const date = new Date(dateStr);
      return date.toLocaleDateString('en-US', {
        weekday: 'short',
        month: 'short',
        day: 'numeric'
      });
    } catch {
      return dateStr;
    }
  }

  function copyToClipboard(text) {
    navigator.clipboard.writeText(window.location.origin + text);
    alert('Copied to clipboard!');
  }
</script>

<div class="poll-admin-container">
  <div class="admin-header">
    <h1>Poll Management</h1>
    <p>Create and manage scheduling polls for events</p>
  </div>

  {#if adminToken}
    <div class="admin-info">
      <p>✅ Admin mode active</p>
    </div>
  {/if}

  <div class="toolbar">
    <button
      class="btn-primary"
      on:click={() => (showForm = !showForm)}
    >
      {showForm ? 'Cancel' : '+ Create New Poll'}
    </button>
  </div>

  {#if showForm}
    <div class="form-card">
      <h2>Create New Poll</h2>

      <form on:submit|preventDefault={submitForm} class="poll-form">
        <div class="form-group">
          <label for="title">Poll Title *</label>
          <input
            id="title"
            type="text"
            bind:value={formData.title}
            placeholder="e.g., Poly Speed Dating - June Event"
            required
            disabled={formSubmitting}
          />
        </div>

        <div class="form-group">
          <label for="description">Description</label>
          <textarea
            id="description"
            bind:value={formData.description}
            placeholder="Optional description for the poll"
            disabled={formSubmitting}
            rows="3"
          ></textarea>
        </div>

        <div class="dates-grid">
          <div class="form-group">
            <label for="date1">Date Option 1 *</label>
            <input
              id="date1"
              type="date"
              bind:value={formData.date1}
              required
              disabled={formSubmitting}
            />
          </div>

          <div class="form-group">
            <label for="date2">Date Option 2 *</label>
            <input
              id="date2"
              type="date"
              bind:value={formData.date2}
              required
              disabled={formSubmitting}
            />
          </div>

          <div class="form-group">
            <label for="date3">Date Option 3 *</label>
            <input
              id="date3"
              type="date"
              bind:value={formData.date3}
              required
              disabled={formSubmitting}
            />
          </div>
        </div>

        <div class="dates-grid">
          <div class="form-group">
            <label for="expected">Expected Participants</label>
            <input
              id="expected"
              type="number"
              bind:value={formData.expected}
              placeholder="e.g., 20"
              disabled={formSubmitting}
            />
          </div>

          <div class="form-group">
            <label for="timerMinutes">Timer (minutes)</label>
            <input
              id="timerMinutes"
              type="number"
              bind:value={formData.timerMinutes}
              placeholder="e.g., 60"
              disabled={formSubmitting}
            />
          </div>
        </div>

        <div class="form-group checkbox">
          <label>
            <input
              type="checkbox"
              bind:checked={formData.openAccess}
              disabled={formSubmitting}
            />
            Open Access (anyone can vote)
          </label>
        </div>

        {#if !formData.openAccess}
          <div class="form-group">
            <label for="inviteEmails">Invite Emails (one per line)</label>
            <textarea
              id="inviteEmails"
              bind:value={formData.inviteEmails}
              placeholder="email1@example.com&#10;email2@example.com"
              disabled={formSubmitting}
              rows="4"
            ></textarea>
          </div>
        {/if}

        {#if formError}
          <div class="error-message">{formError}</div>
        {/if}

        {#if formSuccess}
          <div class="success-message">{formSuccess}</div>
        {/if}

        <button
          type="submit"
          class="btn-primary"
          disabled={formSubmitting}
        >
          {formSubmitting ? 'Creating...' : 'Create Poll'}
        </button>
      </form>
    </div>
  {/if}

  <div class="polls-section">
    <h2>Recent Polls</h2>

    {#if loading}
      <p class="loading">Loading polls...</p>
    {:else if polls.length === 0}
      <p class="empty-state">No polls yet. Create your first poll!</p>
    {:else}
      <div class="polls-grid">
        {#each polls as poll}
          <div class="poll-card">
            <h3>{poll.title}</h3>
            <div class="poll-meta">
              <p>📅 {getDateLabel(poll.date1)} | {getDateLabel(poll.date2)} | {getDateLabel(poll.date3)}</p>
              <p>🗳️ {poll.vote_count || 0} votes</p>
              {#if poll.expected}
                <p>👥 Expected: {poll.expected}</p>
              {/if}
            </div>

            <div class="poll-actions">
              <button
                class="btn-secondary"
                on:click={() => copyToClipboard(`/poll-vote?token=${poll.id}`)}
              >
                Copy Vote Link
              </button>
              {#if adminToken === poll.admin_token}
                <button class="btn-secondary">
                  View Results
                </button>
              {/if}
            </div>

            <div class="poll-dates">
              <small>Created: {new Date(poll.created_at).toLocaleDateString()}</small>
            </div>
          </div>
        {/each}
      </div>
    {/if}
  </div>
</div>

<style>
  .poll-admin-container {
    max-width: 1000px;
    margin: 0 auto;
    padding: 2rem 1rem;
  }

  .admin-header {
    margin-bottom: 3rem;
  }

  .admin-header h1 {
    color: var(--psd-primary, #340c46);
    margin: 0 0 0.5rem 0;
    font-size: 2.5rem;
  }

  .admin-header p {
    color: #666;
    font-size: 1.1rem;
    margin: 0;
  }

  .admin-info {
    background: #e8f5e9;
    border: 1px solid #81c784;
    color: #2e7d32;
    padding: 1rem;
    border-radius: 8px;
    margin-bottom: 2rem;
  }

  .toolbar {
    margin-bottom: 2rem;
  }

  .btn-primary,
  .btn-secondary {
    padding: 0.75rem 1.5rem;
    border: none;
    border-radius: 8px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.2s;
    font-size: 1rem;
  }

  .btn-primary {
    background: var(--psd-primary, #340c46);
    color: white;
  }

  .btn-primary:hover:not(:disabled) {
    background: var(--psd-primary-dark, #1a0623);
  }

  .btn-secondary {
    background: #f0f0f0;
    color: #333;
    border: 1px solid #ddd;
    font-size: 0.9rem;
    padding: 0.5rem 1rem;
  }

  .btn-secondary:hover:not(:disabled) {
    background: #e0e0e0;
  }

  .btn-primary:disabled,
  .btn-secondary:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }

  .form-card {
    background: white;
    border-radius: 12px;
    padding: 2rem;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
    margin-bottom: 3rem;
  }

  .form-card h2 {
    color: var(--psd-primary, #340c46);
    margin-top: 0;
  }

  .poll-form {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
  }

  .form-group {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }

  .form-group label {
    font-weight: 600;
    color: #333;
  }

  .form-group input,
  .form-group textarea {
    padding: 0.75rem;
    border: 1px solid #ddd;
    border-radius: 6px;
    font-size: 1rem;
    font-family: inherit;
  }

  .form-group input:focus,
  .form-group textarea:focus {
    outline: none;
    border-color: var(--psd-primary, #340c46);
    box-shadow: 0 0 0 3px rgba(52, 12, 70, 0.1);
  }

  .dates-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 1rem;
  }

  .form-group.checkbox {
    flex-direction: row;
    align-items: center;
  }

  .form-group.checkbox label {
    margin: 0;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    font-weight: 500;
  }

  .error-message {
    background: #fff1f1;
    border: 1px solid #f0b7b7;
    color: #8d1f1f;
    padding: 1rem;
    border-radius: 6px;
  }

  .success-message {
    background: #eefcf3;
    border: 1px solid #b7e5c7;
    color: #14663c;
    padding: 1rem;
    border-radius: 6px;
  }

  .polls-section {
    margin-top: 3rem;
  }

  .polls-section h2 {
    color: var(--psd-primary, #340c46);
    font-size: 1.8rem;
    margin-bottom: 1.5rem;
  }

  .loading,
  .empty-state {
    text-align: center;
    color: #999;
    padding: 2rem;
    background: #f9f9f9;
    border-radius: 8px;
  }

  .polls-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 1.5rem;
  }

  .poll-card {
    background: white;
    border: 1px solid #e0e0e0;
    border-radius: 12px;
    padding: 1.5rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  .poll-card h3 {
    color: var(--psd-primary, #340c46);
    margin: 0;
    font-size: 1.3rem;
  }

  .poll-meta {
    margin: 0;
    padding: 0;
  }

  .poll-meta p {
    margin: 0.25rem 0;
    color: #666;
    font-size: 0.95rem;
  }

  .poll-actions {
    display: flex;
    gap: 0.5rem;
    flex-wrap: wrap;
  }

  .poll-dates {
    border-top: 1px solid #f0f0f0;
    padding-top: 0.75rem;
  }

  .poll-dates small {
    color: #999;
  }
</style>
