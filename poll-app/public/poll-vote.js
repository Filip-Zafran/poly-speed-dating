// Vote Page State
let pollData = null;
let selectedChoices = []; // Array of selected dates (can be multiple)
let voterToken = null;
let timerInterval = null;

// DOM Elements
const loadingState = document.getElementById('loadingState');
const errorState = document.getElementById('errorState');
const pollView = document.getElementById('pollView');
const successState = document.getElementById('successState');
const voteForm = document.getElementById('voteForm');
const timerDisplay = document.getElementById('timerDisplay');

// Initialize
document.addEventListener('DOMContentLoaded', () => {
  // Generate voter token for this device
  voterToken = localStorage.getItem('voterToken');
  if (!voterToken) {
    voterToken = generateRandomToken();
    localStorage.setItem('voterToken', voterToken);
  }

  loadPoll();
  voteForm.addEventListener('submit', handleVoteSubmit);
});

function generateRandomToken() {
  return 'voter_' + Math.random().toString(36).substr(2, 9) + '_' + Date.now();
}

function getUrlParams() {
  const params = new URLSearchParams(window.location.search);
  return {
    token: params.get('token')
  };
}

async function loadPoll() {
  const { token } = getUrlParams();

  if (!token) {
    showError();
    return;
  }

  try {
    const response = await fetch(`/api/vote/${token}`);

    if (!response.ok) {
      throw new Error('Poll not found');
    }

    pollData = await response.json();
    renderPoll();
    pollView.classList.remove('hidden');
  } catch (error) {
    console.error('Error loading poll:', error);
    showError();
  }

  loadingState.classList.add('hidden');
}

function showError() {
  errorState.classList.remove('hidden');
  loadingState.classList.add('hidden');
  pollView.classList.add('hidden');
}

function formatTimeRemaining(milliseconds) {
  if (milliseconds <= 0) return 'Poll closed';

  const seconds = Math.floor(milliseconds / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (days > 0) return `${days}d ${hours % 24}h remaining`;
  if (hours > 0) return `${hours}h ${minutes % 60}m remaining`;
  if (minutes > 0) return `${minutes}m ${seconds % 60}s remaining`;
  return `${seconds}s remaining`;
}

function updateTimerDisplay() {
  if (!pollData.timer_end) {
    timerDisplay.innerHTML = '';
    return;
  }

  const endTime = new Date(pollData.timer_end).getTime();
  const now = Date.now();
  const remaining = endTime - now;

  if (remaining <= 0) {
    timerDisplay.innerHTML = '<span style="color: var(--danger); font-weight: 600;">⏳ Poll closed</span>';
    if (timerInterval) clearInterval(timerInterval);
    return;
  }

  timerDisplay.innerHTML = `<span style="color: var(--text-light);">⏳ ${formatTimeRemaining(remaining)}</span>`;
}

function renderPoll() {
  document.getElementById('pollTitle').textContent = pollData.title;
  document.getElementById('pollDescription').textContent = pollData.description || '(No description)';
  document.getElementById('pollDuration').textContent = pollData.duration;

  updateTimerDisplay();

  if (pollData.timer_end) {
    if (timerInterval) clearInterval(timerInterval);
    timerInterval = setInterval(updateTimerDisplay, 1000);
  }

  // Render date options as cards (checkboxes for dates, radio for "can't make it")
  const container = document.getElementById('dateOptionsContainer');
  container.innerHTML = '';

  ['date1', 'date2', 'date3'].forEach(dateKey => {
    const dateStr = pollData[dateKey];
    const dateObj = new Date(dateStr);
    const formatter = new Intl.DateTimeFormat('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
    const formatted = formatter.format(dateObj);

    const card = document.createElement('div');
    card.className = 'date-card';
    card.innerHTML = `
      <input type="checkbox" name="dates" id="${dateKey}" value="${dateKey}" style="display: none;">
      <label for="${dateKey}" class="date-card-label">
        <div class="date-card-time">${formatted}</div>
        <div class="date-card-option">${dateKey.replace('date', 'Option ')}</div>
      </label>
    `;
    container.appendChild(card);

    document.getElementById(dateKey).addEventListener('change', (e) => {
      if (e.target.checked) {
        // If a date is selected, deselect "can't make it"
        const noneCheckbox = document.getElementById('none');
        if (noneCheckbox) noneCheckbox.checked = false;
      }
      updateCardSelection();
    });
  });

  // Add "can't make it" option
  const noneCard = document.createElement('div');
  noneCard.className = 'date-card';
  noneCard.innerHTML = `
    <input type="checkbox" name="none" id="none" value="none" style="display: none;">
    <label for="none" class="date-card-label date-card-label-none">
      <div class="date-card-time">❌ I Can't Make It</div>
      <div class="date-card-option">Can't attend this month</div>
    </label>
  `;
  container.appendChild(noneCard);

  document.getElementById('none').addEventListener('change', (e) => {
    if (e.target.checked) {
      // If "can't make it" is selected, deselect all dates
      ['date1', 'date2', 'date3'].forEach(dateKey => {
        const checkbox = document.getElementById(dateKey);
        if (checkbox) checkbox.checked = false;
      });
    }
    updateCardSelection();
  });

  // Render responses
  updateResponses();
}

function updateCardSelection() {
  // Get all checked checkboxes (both dates and "can't make it")
  const checkedInputs = document.querySelectorAll('input[type="checkbox"]:checked');

  // Update visual selection
  document.querySelectorAll('.date-card-label').forEach(label => {
    label.classList.remove('selected');
  });

  checkedInputs.forEach(input => {
    const card = input.closest('.date-card');
    if (card) {
      card.querySelector('.date-card-label').classList.add('selected');
    }
  });

  // Update selectedChoices array
  selectedChoices = Array.from(checkedInputs).map(input => input.value);
}

function updateResponses() {
  const counts = pollData.counts;
  const dateKeys = ['date1', 'date2', 'date3'];

  // Create results summary for right panel
  const resultsContainer = document.getElementById('resultsContainer');
  let resultsHtml = '';

  dateKeys.forEach(dateKey => {
    const count = counts[dateKey];
    const pct = pollData.expected ? Math.min(100, (count / pollData.expected) * 100) : 0;
    const dateObj = new Date(pollData[dateKey]);
    const formatter = new Intl.DateTimeFormat('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
    const dateStr = formatter.format(dateObj);

    resultsHtml += `
      <div class="result-item">
        <div class="result-date">${dateStr}</div>
        <div class="result-bar">
          <div class="result-fill" style="width: ${pct}%;">
            ${pct > 10 ? `${count}` : ''}
          </div>
        </div>
        <div class="result-count"><strong>${count}</strong> out of ${pollData.expected} needed</div>
      </div>
    `;
  });

  // Add "can't make it" option
  resultsHtml += `
    <div class="result-item">
      <div class="result-date">❌ Can't make it</div>
      <div style="color: var(--text-light); font-size: 0.9rem;"><strong>${counts.none}</strong> response${counts.none !== 1 ? 's' : ''}</div>
    </div>
  `;

  resultsContainer.innerHTML = resultsHtml;

  // Responses grid
  const responsesGrid = document.getElementById('responsesGrid-full');
  if (!responsesGrid) return; // In case element doesn't exist yet

  if (pollData.votes_preview.length === 0) {
    document.getElementById('responsesGrid').innerHTML = '<p class="text-muted">No responses yet. Be the first to vote!</p>';
  } else {
    const responseCards = pollData.votes_preview
      .map(vote => {
        const choiceEmoji = vote.choice === 'none' ? '❌' : '✓';
        const choiceText = vote.choice === 'none' ? 'Out' : vote.choice.replace('date', 'Date');
        return `
          <div class="response-card">
            <div class="response-initials">${vote.initials}</div>
            <div class="response-choice">${choiceEmoji}</div>
          </div>
        `;
      })
      .join('');
    document.getElementById('responsesGrid').innerHTML = responseCards;
  }
}

function getBarColor(pct) {
  if (pct < 50) return '#fcbf00'; // gold
  if (pct < 80) return '#f97316'; // orange
  return '#22c55e'; // green
}

async function handleVoteSubmit(e) {
  e.preventDefault();

  if (selectedChoices.length === 0) {
    alert('Please select at least one option');
    return;
  }

  const voterName = document.getElementById('voterName').value.trim();
  if (!voterName) {
    alert('Please enter your name');
    return;
  }

  const { token } = getUrlParams();

  try {
    // If "can't make it" is selected, submit only that
    let choicesToSubmit = selectedChoices;
    if (selectedChoices.includes('none')) {
      choicesToSubmit = ['none'];
    }

    // Submit each choice as a separate vote
    let lastResult = null;
    for (const choice of choicesToSubmit) {
      const response = await fetch(`/api/vote/${token}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          voter_name: voterName,
          choice: choice,
          voter_token: voterToken
        })
      });

      if (response.status === 409) {
        alert('You have already voted from this device. Clear your browser data or use a different device to vote again.');
        return;
      }

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Failed to submit vote');
      }

      lastResult = await response.json();
    }

    // Update poll data with final counts
    pollData.counts = lastResult.counts;
    pollData.votes_preview = lastResult.votes_preview;

    // Show success state
    showSuccess();
  } catch (error) {
    console.error('Error submitting vote:', error);
    alert('Failed to submit vote: ' + error.message);
  }
}

function showSuccess() {
  if (timerInterval) clearInterval(timerInterval);
  pollView.classList.add('hidden');
  successState.classList.remove('hidden');

  // Show final counts
  const finalCountsDiv = document.getElementById('finalCounts');
  const counts = pollData.counts;

  // Show what was voted for
  let voteMessage = '';
  if (selectedChoices.includes('none')) {
    voteMessage = `<p style="margin-bottom: 1.5rem; font-size: 1rem; color: var(--text-light);">You voted that you <strong>can't make it</strong>.</p>`;
  } else {
    const votedDates = selectedChoices
      .map(choice => {
        if (choice === 'date1') return 'Option 1';
        if (choice === 'date2') return 'Option 2';
        if (choice === 'date3') return 'Option 3';
        return choice;
      })
      .join(', ');
    voteMessage = `<p style="margin-bottom: 1.5rem; font-size: 1rem; color: var(--text-light);">You voted for: <strong>${votedDates}</strong>.</p>`;
  }

  const countsList = [
    { label: 'Option 1', count: counts.date1, date: pollData.date1 },
    { label: 'Option 2', count: counts.date2, date: pollData.date2 },
    { label: 'Option 3', count: counts.date3, date: pollData.date3 },
    { label: "Can't make it", count: counts.none, date: null }
  ];

  finalCountsDiv.innerHTML = `
    ${voteMessage}
    <div style="background: #f9f5f1; padding: 1.5rem; border-radius: 16px;">
      ${countsList
        .map(item => {
          const dateObj = item.date ? new Date(item.date) : null;
          const dateStr = dateObj
            ? new Intl.DateTimeFormat('en-US', {
                weekday: 'short',
                month: 'short',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
              }).format(dateObj)
            : '';

          return `
            <div style="display: flex; justify-content: space-between; padding: 0.75rem 0; border-bottom: 1px solid var(--border-light);">
              <div>
                <div style="font-weight: 500;">${item.label}</div>
                ${dateStr ? `<div style="font-size: 0.85rem; color: var(--text-light);">${dateStr}</div>` : ''}
              </div>
              <div style="font-weight: 600; font-size: 1.1rem;">${item.count}</div>
            </div>
          `;
        })
        .join('')}
    </div>
  `;
}
