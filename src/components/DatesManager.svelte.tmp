<script>
  let events = [
    {
      id: 1,
      name: 'Poly Speed Dating - June',
      date: '2026-06-03',
      location: 'Trashtelier, Berlin',
      time: '19:00',
      max_participants: 40,
      registered: 28,
      status: 'open',
      application_deadline: '2026-05-22',
      approval_date: '2026-05-24'
    },
    {
      id: 2,
      name: 'Blind Duck Dating',
      date: '2026-06-17',
      location: 'LoveLite Bar, Berlin',
      time: '20:00',
      max_participants: 30,
      registered: 15,
      status: 'open',
      application_deadline: '2026-06-05',
      approval_date: '2026-06-07'
    },
    {
      id: 3,
      name: 'PolyFest Community Meetup',
      date: '2026-07-12',
      location: 'Kreuzberg, Berlin',
      time: '14:00',
      max_participants: 100,
      registered: 45,
      status: 'planning',
      application_deadline: '2026-06-30',
      approval_date: '2026-07-01'
    }
  ];

  let showForm = false;
  let editingId = null;

  let formData = {
    name: '',
    date: '',
    location: '',
    time: '',
    max_participants: '',
    application_deadline: '',
    approval_date: ''
  };

  function resetForm() {
    formData = {
      name: '',
      date: '',
      location: '',
      time: '',
      max_participants: '',
      application_deadline: '',
      approval_date: ''
    };
    editingId = null;
  }

  function openForm(event = null) {
    if (event) {
      editingId = event.id;
      formData = { ...event };
    } else {
      resetForm();
    }
    showForm = true;
  }

  function closeForm() {
    showForm = false;
    resetForm();
  }

  function submitForm() {
    if (!formData.name || !formData.date) {
      alert('Please fill in required fields');
      return;
    }

    if (editingId) {
      const idx = events.findIndex((e) => e.id === editingId);
      if (idx >= 0) {
        events[idx] = { ...events[idx], ...formData };
        events = events; // trigger reactivity
      }
    } else {
      events = [
        ...events,
        {
          ...formData,
          id: Math.max(...events.map((e) => e.id), 0) + 1,
          registered: 0,
          status: 'planning'
        }
      ];
    }

    closeForm();
  }

  function deleteEvent(id) {
    if (confirm('Are you sure you want to delete this event?')) {
      events = events.filter((e) => e.id !== id);
    }
  }

  function getStatusColor(status) {
    return status === 'open' ? '#27ae60' : status === 'closed' ? '#e74c3c' : '#f39c12';
  }

  function getProgressPercent(registered, max) {
    return Math.round((registered / max) * 100);
  }
</script>

<div class="container">
  <div class="header">
    <div>
      <h1>Event Management</h1>
      <p>Manage event dates, deadlines, and details</p>
    </div>
    <button class="btn-primary" on:click={() => openForm()}>+ Add Event</button>
  </div>

  {#if showForm}
    <div class="form-card">
      <div class="form-header">
        <h2>{editingId ? 'Edit Event' : 'Create New Event'}</h2>
        <button class="btn-close" on:click={closeForm}>✕</button>
      </div>

      <form on:submit|preventDefault={submitForm} class="event-form">
        <div class="form-row">
          <div class="form-group">
            <label for="name">Event Name *</label>
            <input
              id="name"
              type="text"
              bind:value={formData.name}
              placeholder="e.g., Poly Speed Dating - June"
              required
            />
          </div>

          <div class="form-group">
            <label for="location">Location *</label>
            <input
              id="location"
              type="text"
              bind:value={formData.location}
              placeholder="e.g., Trashtelier, Berlin"
              required
            />
          </div>
        </div>

        <div class="form-row">
          <div class="form-group">
            <label for="date">Event Date *</label>
            <input
              id="date"
              type="date"
              bind:value={formData.date}
              required
            />
          </div>

          <div class="form-group">
            <label for="time">Event Time</label>
            <input
              id="time"
              type="time"
              bind:value={formData.time}
            />
          </div>

          <div class="form-group">
            <label for="max_participants">Max Participants</label>
            <input
              id="max_participants"
              type="number"
              bind:value={formData.max_participants}
              placeholder="e.g., 40"
            />
          </div>
        </div>

        <div class="form-row">
          <div class="form-group">
            <label for="application_deadline">Application Deadline</label>
            <input
              id="application_deadline"
              type="date"
              bind:value={formData.application_deadline}
            />
          </div>

          <div class="form-group">
            <label for="approval_date">Approval Date</label>
            <input
              id="approval_date"
              type="date"
              bind:value={formData.approval_date}
            />
          </div>
        </div>

        <div class="form-actions">
          <button type="button" class="btn-secondary" on:click={closeForm}>Cancel</button>
          <button type="submit" class="btn-primary">
            {editingId ? 'Update Event' : 'Create Event'}
          </button>
        </div>
      </form>
    </div>
  {/if}

  <div class="events-grid">
    {#each events as event (event.id)}
      <div class="event-card">
        <div class="event-header">
          <h3>{event.name}</h3>
          <span
            class="status-badge"
            style="background: {getStatusColor(event.status)}"
          >
            {event.status.toUpperCase()}
          </span>
        </div>

        <div class="event-details">
          <p>
            <strong>📅 Date:</strong> {new Date(event.date).toLocaleDateString('en-US', {
              weekday: 'long',
              month: 'short',
              day: 'numeric'
            })}
            {#if event.time}
              at {event.time}
            {/if}
          </p>
          <p><strong>📍 Location:</strong> {event.location}</p>
          <p><strong>👥 Participants:</strong> {event.registered}/{event.max_participants}</p>

          {#if event.max_participants}
            <div class="progress-bar">
              <div
                class="progress-fill"
                style="width: {getProgressPercent(event.registered, event.max_participants)}%"
              ></div>
            </div>
          {/if}

          {#if event.application_deadline}
            <p class="deadline">
              <strong>📌 Application Deadline:</strong> {new Date(
                event.application_deadline
              ).toLocaleDateString()}
            </p>
          {/if}

          {#if event.approval_date}
            <p class="deadline">
              <strong>✅ Approval Date:</strong> {new Date(event.approval_date).toLocaleDateString()}
            </p>
          {/if}
        </div>

        <div class="card-actions">
          <button class="btn-secondary" on:click={() => openForm(event)}>Edit</button>
          <button class="btn-danger" on:click={() => deleteEvent(event.id)}>Delete</button>
        </div>
      </div>
    {/each}
  </div>
</div>

<style>
  .container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 2rem 1rem;
  }

  .header {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    margin-bottom: 3rem;
  }

  .header h1 {
    font-size: 2.5rem;
    color: var(--psd-primary, #340c46);
    margin: 0 0 0.5rem 0;
  }

  .header p {
    color: #666;
    margin: 0;
  }

  .btn-primary,
  .btn-secondary,
  .btn-danger {
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

  .btn-primary:hover {
    background: var(--psd-primary-dark, #1a0623);
  }

  .btn-secondary {
    background: #f0f0f0;
    color: #333;
    border: 1px solid #ddd;
  }

  .btn-secondary:hover {
    background: #e0e0e0;
  }

  .btn-danger {
    background: #e74c3c;
    color: white;
    font-size: 0.9rem;
    padding: 0.5rem 1rem;
  }

  .btn-danger:hover {
    background: #c0392b;
  }

  .btn-close {
    background: none;
    border: none;
    font-size: 1.5rem;
    cursor: pointer;
    color: #999;
  }

  .btn-close:hover {
    color: #333;
  }

  .form-card {
    background: white;
    border-radius: 12px;
    padding: 2rem;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
    margin-bottom: 3rem;
  }

  .form-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1.5rem;
  }

  .form-header h2 {
    color: var(--psd-primary, #340c46);
    margin: 0;
  }

  .event-form {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
  }

  .form-row {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 1rem;
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

  .form-group input {
    padding: 0.75rem;
    border: 1px solid #ddd;
    border-radius: 6px;
    font-size: 1rem;
    font-family: inherit;
  }

  .form-group input:focus {
    outline: none;
    border-color: var(--psd-primary, #340c46);
    box-shadow: 0 0 0 3px rgba(52, 12, 70, 0.1);
  }

  .form-actions {
    display: flex;
    gap: 1rem;
    justify-content: flex-end;
  }

  .events-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
    gap: 2rem;
  }

  .event-card {
    background: white;
    border-radius: 12px;
    padding: 1.5rem;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  .event-header {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    gap: 1rem;
  }

  .event-header h3 {
    margin: 0;
    color: var(--psd-primary, #340c46);
    flex: 1;
  }

  .status-badge {
    display: inline-block;
    padding: 0.4rem 0.8rem;
    border-radius: 20px;
    color: white;
    font-size: 0.8rem;
    font-weight: 600;
    white-space: nowrap;
  }

  .event-details {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }

  .event-details p {
    margin: 0;
    color: #555;
    font-size: 0.9rem;
    line-height: 1.5;
  }

  .deadline {
    color: #666;
    font-size: 0.85rem;
  }

  .progress-bar {
    width: 100%;
    height: 8px;
    background: #f0f0f0;
    border-radius: 4px;
    overflow: hidden;
    margin: 0.5rem 0;
  }

  .progress-fill {
    height: 100%;
    background: linear-gradient(90deg, var(--psd-primary, #340c46), var(--psd-accent, #0066cc));
    transition: width 0.3s ease;
  }

  .card-actions {
    display: flex;
    gap: 0.5rem;
    justify-content: flex-end;
    padding-top: 0.5rem;
    border-top: 1px solid #f0f0f0;
  }

  .card-actions .btn-secondary,
  .card-actions .btn-danger {
    padding: 0.5rem 1rem;
    font-size: 0.9rem;
  }

  @media (max-width: 768px) {
    .header {
      flex-direction: column;
      gap: 1rem;
    }

    .events-grid {
      grid-template-columns: 1fr;
    }

    .form-row {
      grid-template-columns: 1fr;
    }
  }
</style>
