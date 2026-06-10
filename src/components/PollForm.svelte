<script lang="ts">
  let emailTags: string[] = [];
  let openAccess = true;

  interface FormData {
    title: string;
    description: string;
    duration: string;
    expected: number;
    timerMinutes: number;
    date1: string;
    date2: string;
    date3: string;
  }

  let formData: FormData = {
    title: '',
    description: 'Join us for an exciting event! We\'re looking for the best date that works for everyone.',
    duration: '',
    expected: 8,
    timerMinutes: 1440,
    date1: '',
    date2: '',
    date3: '',
  };

  function addEmailTag(email: string) {
    const trimmed = email.trim().toLowerCase();
    if (trimmed && !emailTags.includes(trimmed)) {
      emailTags = [...emailTags, trimmed];
    }
  }

  function removeEmailTag(email: string) {
    emailTags = emailTags.filter(e => e !== email);
  }

  async function handleSubmit(e: SubmitEvent) {
    e.preventDefault();

    const dates = [formData.date1, formData.date2, formData.date3];
    if (dates[0] >= dates[1] || dates[1] >= dates[2]) {
      alert('Dates must be in chronological order');
      return;
    }

    try {
      const response = await fetch('/api/polls', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: formData.title,
          description: formData.description,
          duration: formData.duration,
          expected: formData.expected,
          open_access: openAccess ? 1 : 0,
          date1: formData.date1 + ':00',
          date2: formData.date2 + ':00',
          date3: formData.date3 + ':00',
          timer_minutes: formData.timerMinutes,
          invite_emails: emailTags,
        }),
      });

      if (!response.ok) throw new Error('Failed to create poll');

      const result = await response.json();
      alert(`Poll created!\n\nVoting link:\n${result.vote_url}`);

      // Reset form
      formData = {
        title: '',
        description: 'Join us for an exciting event! We\'re looking for the best date that works for everyone.',
        duration: '',
        expected: 8,
        timerMinutes: 1440,
        date1: '',
        date2: '',
        date3: '',
      };
      emailTags = [];
    } catch (error) {
      alert(`Error: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }
</script>

<form on:submit={handleSubmit}>
  <div class="form-group">
    <label for="pollTitle">Poll Title *</label>
    <input type="text" id="pollTitle" bind:value={formData.title} placeholder="e.g., PSD June Meetup" required />
  </div>

  <div class="form-group">
    <label for="pollDescription">Description (optional)</label>
    <textarea id="pollDescription" bind:value={formData.description} placeholder="Add context about the event..." />
  </div>

  <div class="form-group">
    <label for="eventDuration">Event Duration *</label>
    <input type="text" id="eventDuration" bind:value={formData.duration} placeholder="e.g., 2 hours, 3 hours" required />
  </div>

  <div class="form-group">
    <label for="expectedParticipants">Expected Number of Participants *</label>
    <input type="number" id="expectedParticipants" bind:value={formData.expected} min="1" required />
  </div>

  <div class="form-group">
    <label for="timerMinutes">Countdown Timer (minutes, optional)</label>
    <input type="number" id="timerMinutes" bind:value={formData.timerMinutes} min="0" />
    <p class="text-muted">Set how long the poll stays open. Voters will see a countdown timer.</p>
  </div>

  <div class="form-group">
    <label>Date Options *</label>
    <p class="text-muted">Provide 3 suggested dates and times</p>

    <div style="margin-bottom: 1rem;">
      <label for="date1" style="font-size: 0.9rem;">Option 1</label>
      <input type="datetime-local" id="date1" bind:value={formData.date1} required />
    </div>

    <div style="margin-bottom: 1rem;">
      <label for="date2" style="font-size: 0.9rem;">Option 2</label>
      <input type="datetime-local" id="date2" bind:value={formData.date2} required />
    </div>

    <div style="margin-bottom: 1rem;">
      <label for="date3" style="font-size: 0.9rem;">Option 3</label>
      <input type="datetime-local" id="date3" bind:value={formData.date3} required />
    </div>
  </div>

  <div class="form-group">
    <label>
      <input type="checkbox" bind:checked={openAccess} />
      <span>Allow anyone with the link to vote</span>
    </label>
  </div>

  {#if !openAccess}
    <div class="form-group">
      <label for="inviteEmailInput">Invite Specific People</label>
      <input
        type="email"
        id="inviteEmailInput"
        placeholder="Email address..."
        on:keypress={(e) => {
          if (e.key === 'Enter') {
            e.preventDefault();
            addEmailTag(e.currentTarget.value);
            e.currentTarget.value = '';
          }
        }}
      />
      <div class="email-tags">
        {#each emailTags as email (email)}
          <div class="tag">
            <span>{email}</span>
            <button type="button" on:click={() => removeEmailTag(email)}>×</button>
          </div>
        {/each}
      </div>
    </div>
  {/if}

  <button type="submit" class="btn-submit">Create Poll</button>
</form>

<style>
  form {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
  }

  .form-group {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }

  label {
    font-weight: 600;
    font-size: 0.9rem;
  }

  input[type="text"],
  input[type="number"],
  input[type="email"],
  input[type="datetime-local"],
  textarea {
    padding: 0.75rem;
    border: 1px solid #ddd;
    border-radius: 8px;
    font-size: 1rem;
    font-family: inherit;
  }

  input[type="checkbox"] {
    margin-right: 0.5rem;
  }

  textarea {
    resize: vertical;
    min-height: 100px;
  }

  .text-muted {
    font-size: 0.85rem;
    color: #999;
    margin: 0;
  }

  .email-tags {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
    margin-top: 0.5rem;
  }

  .tag {
    background: #f0f0f0;
    padding: 0.5rem 1rem;
    border-radius: 8px;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    font-size: 0.9rem;
  }

  .tag button {
    background: none;
    border: none;
    cursor: pointer;
    font-size: 1.2rem;
    padding: 0;
    margin-left: 0.5rem;
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
    transform: translateY(-2px);
  }
</style>
