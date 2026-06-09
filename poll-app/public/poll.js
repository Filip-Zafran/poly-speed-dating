// Admin Panel State
let emailTags = [];

// Form Elements
const createPollForm = document.getElementById('createPollForm');
const openAccessCheckbox = document.getElementById('openAccess');
const emailsSection = document.getElementById('emailsSection');
const emailTagsContainer = document.getElementById('emailTagsContainer');
const inviteEmailInput = document.getElementById('inviteEmailInput');

// Tabs
const tabButtons = document.querySelectorAll('.tab-button');
const tabContents = document.querySelectorAll('.tab-content');

// Initialize
document.addEventListener('DOMContentLoaded', () => {
  loadPolls();

  createPollForm.addEventListener('submit', handleCreatePoll);
  openAccessCheckbox.addEventListener('change', handleOpenAccessToggle);

  // Tab switching
  tabButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      const tabName = e.target.dataset.tab;
      switchTab(tabName);
    });
  });

  // Email input
  inviteEmailInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addEmailTag(inviteEmailInput.value);
      inviteEmailInput.value = '';
    }
  });
});

function switchTab(tabName) {
  tabButtons.forEach(btn => btn.classList.remove('is-active'));
  tabContents.forEach(content => content.classList.remove('is-active'));

  const activeBtn = document.querySelector(`[data-tab="${tabName}"]`);
  const activeContent = document.getElementById(tabName);

  if (activeBtn) activeBtn.classList.add('is-active');
  if (activeContent) activeContent.classList.add('is-active');
}

function handleOpenAccessToggle() {
  if (openAccessCheckbox.checked) {
    emailsSection.classList.add('hidden');
    emailTags = [];
    updateEmailTagsDisplay();
  } else {
    emailsSection.classList.remove('hidden');
    inviteEmailInput.focus();
  }
}

function addEmailTag(email) {
  email = email.trim().toLowerCase();

  // Validate email format
  if (!email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
    alert('Please enter a valid email address');
    return;
  }

  // Check for duplicates
  if (emailTags.includes(email)) {
    alert('This email is already added');
    return;
  }

  emailTags.push(email);
  updateEmailTagsDisplay();
}

function removeEmailTag(email) {
  emailTags = emailTags.filter(e => e !== email);
  updateEmailTagsDisplay();
}

function updateEmailTagsDisplay() {
  // Remove existing tags (keep only the input)
  const existingTags = emailTagsContainer.querySelectorAll('.tag');
  existingTags.forEach(tag => tag.remove());

  // Add tags back
  emailTags.forEach(email => {
    const tag = document.createElement('div');
    tag.className = 'tag';
    tag.innerHTML = `
      <span>${email}</span>
      <span class="tag-remove" data-email="${email}">×</span>
    `;
    emailTagsContainer.insertBefore(tag, inviteEmailInput);

    tag.querySelector('.tag-remove').addEventListener('click', () => {
      removeEmailTag(email);
    });
  });
}

async function loadPolls() {
  const pollsList = document.getElementById('pollsList');
  pollsList.innerHTML = '<p>Loading polls...</p>';

  try {
    const response = await fetch('/api/polls');

    if (!response.ok) {
      throw new Error('Failed to load polls');
    }

    const polls = await response.json();

    if (polls.length === 0) {
      pollsList.innerHTML = `
        <div class="card" style="border: 2px dashed var(--border-light); background: transparent;">
          <p style="margin: 2rem 0;">No polls yet. <button class="btn btn-primary btn-small" onclick="document.querySelector('[data-tab=create-tab]').click()">Create one</button></p>
        </div>
      `;
      return;
    }

    const table = document.createElement('table');
    table.className = 'polls-table';
    table.innerHTML = `
      <thead>
        <tr>
          <th>Title</th>
          <th>Responses</th>
          <th>Created</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        ${polls
          .map(
            poll => `
          <tr>
            <td>${escapeHtml(poll.title)}</td>
            <td>
              <span class="badge badge-count">${poll.vote_count} / ${poll.expected}</span>
            </td>
            <td>${new Date(poll.created_at).toLocaleDateString()}</td>
            <td>
              <div class="polls-actions">
                <button class="btn btn-ghost btn-small" onclick="copyLink('${poll.id}')">📋 Copy Link</button>
                <button class="btn btn-primary btn-small" onclick="viewDetails('${poll.admin_token}')">👁️ View</button>
                <button class="btn btn-danger btn-small" onclick="deletePoll('${poll.id}')">🗑️ Delete</button>
              </div>
            </td>
          </tr>
        `
          )
          .join('')}
      </tbody>
    `;

    pollsList.innerHTML = '';
    pollsList.appendChild(table);
  } catch (error) {
    console.error('Error loading polls:', error);
    pollsList.innerHTML = `<div class="error-message">Failed to load polls: ${error.message}</div>`;
  }
}

function copyLink(pollId) {
  const link = `${window.location.origin}/poll-vote.html?token=${pollId}`;
  navigator.clipboard.writeText(link).then(() => {
    alert('Voting link copied to clipboard!');
  });
}

async function viewDetails(adminToken) {
  try {
    const response = await fetch(`/api/polls/${adminToken}/detail`);

    if (!response.ok) {
      throw new Error('Failed to load poll details');
    }

    const { poll, votes, counts } = await response.json();

    const voteLink = `${window.location.origin}/poll-vote.html?token=${poll.id}`;

    let detailsHtml = `
      <div class="modal-box">
        <h2>${escapeHtml(poll.title)}</h2>
        <p>${poll.description ? escapeHtml(poll.description) : '(No description)'}</p>

        <div class="poll-stat">
          <span class="poll-stat-label">Voting Link:</span>
          <span style="word-break: break-all; font-size: 0.85rem;">${voteLink}</span>
        </div>

        <div class="poll-stat">
          <span class="poll-stat-label">Duration:</span>
          <span>${poll.duration}</span>
        </div>

        <div class="poll-stat">
          <span class="poll-stat-label">Expected Participants:</span>
          <span>${poll.expected}</span>
        </div>

        <hr style="margin: 1.5rem 0; border: none; border-top: 1px solid var(--border-light);">

        <h3 style="margin-top: 1.5rem; margin-bottom: 1rem;">Vote Summary</h3>
        ${['date1', 'date2', 'date3'].map(dateKey => {
          const count = counts[dateKey];
          const percent = poll.expected ? Math.min(100, (count / poll.expected) * 100) : 0;
          const dateStr = new Date(poll[dateKey]).toLocaleString();
          return `
            <div class="poll-stat">
              <div>
                <div style="font-weight: 500;">${dateStr}</div>
                <div style="font-size: 0.85rem; color: var(--text-light); margin-top: 0.25rem;">${count} vote${count !== 1 ? 's' : ''}</div>
              </div>
              <div style="min-width: 60px; text-align: right; font-weight: 600;">${Math.round(percent)}%</div>
            </div>
          `;
        })}

        <div class="poll-stat">
          <span class="poll-stat-label">Can't make it:</span>
          <span>${counts.none}</span>
        </div>

        ${votes.length > 0
          ? `
          <hr style="margin: 1.5rem 0; border: none; border-top: 1px solid var(--border-light);">
          <h3 style="margin-bottom: 1rem;">Responses</h3>
          <div style="max-height: 300px; overflow-y: auto;">
            ${votes
              .map(
                vote => `
              <div style="padding: 0.75rem; background: #f9f5f1; border-radius: 8px; margin-bottom: 0.5rem; font-size: 0.9rem;">
                <strong>${escapeHtml(vote.voter_name)}</strong> chose <em>${vote.choice === 'none' ? "can't make it" : vote.choice}</em>
                ${vote.alt_date ? `<div style="color: var(--text-light); margin-top: 0.25rem;">Alternative: ${escapeHtml(vote.alt_date)}</div>` : ''}
              </div>
            `
              )
              .join('')}
          </div>
        `
          : ''}

        <div style="display: flex; gap: 1rem; margin-top: 2rem;">
          <button class="btn btn-ghost btn-block" onclick="closeModal()">Close</button>
        </div>
      </div>
    `;

    showModal(detailsHtml);
  } catch (error) {
    console.error('Error loading details:', error);
    alert('Failed to load poll details: ' + error.message);
  }
}

async function deletePoll(pollId) {
  if (!confirm('Are you sure you want to delete this poll? This action cannot be undone.')) {
    return;
  }

  try {
    const response = await fetch(`/api/polls/${pollId}`, {
      method: 'DELETE'
    });

    if (!response.ok) {
      throw new Error('Failed to delete poll');
    }

    alert('Poll deleted successfully');
    loadPolls();
  } catch (error) {
    console.error('Error deleting poll:', error);
    alert('Failed to delete poll: ' + error.message);
  }
}

async function handleCreatePoll(e) {
  e.preventDefault();

  const timerMinutes = parseInt(document.getElementById('timerMinutes').value) || 0;

  const pollData = {
    title: document.getElementById('pollTitle').value,
    description: document.getElementById('pollDescription').value,
    duration: document.getElementById('eventDuration').value,
    expected: parseInt(document.getElementById('expectedParticipants').value),
    open_access: openAccessCheckbox.checked ? 1 : 0,
    date1: document.getElementById('date1').value + ':00',
    date2: document.getElementById('date2').value + ':00',
    date3: document.getElementById('date3').value + ':00',
    timer_minutes: timerMinutes,
    invite_emails: emailTags
  };

  // Validate dates are in order
  if (pollData.date1 >= pollData.date2 || pollData.date2 >= pollData.date3) {
    alert('Dates must be in chronological order');
    return;
  }

  try {
    const response = await fetch('/api/polls', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(pollData)
    });

    if (!response.ok) {
      throw new Error('Failed to create poll');
    }

    const result = await response.json();

    // Reset form
    createPollForm.reset();
    emailTags = [];
    updateEmailTagsDisplay();

    // Show success message with copy link
    alert(`Poll created successfully!\n\nVoting link:\n${result.vote_url}`);

    // Reload polls list and switch to it
    loadPolls();
    switchTab('list-tab');
  } catch (error) {
    console.error('Error creating poll:', error);
    alert('Failed to create poll: ' + error.message);
  }
}

function showModal(html) {
  const modal = document.createElement('div');
  modal.className = 'modal-overlay is-open';
  modal.id = 'detailsModal';
  modal.innerHTML = html;
  document.body.appendChild(modal);

  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      closeModal();
    }
  });
}

function closeModal() {
  const modal = document.getElementById('detailsModal');
  if (modal) {
    modal.remove();
  }
}

function escapeHtml(text) {
  const map = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;'
  };
  return text.replace(/[&<>"']/g, m => map[m]);
}
