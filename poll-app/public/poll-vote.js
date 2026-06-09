// Vote Page State
let pollData = null;
let selectedChoice = null;
let voterToken = null;

// DOM Elements
const loadingState = document.getElementById('loadingState');
const errorState = document.getElementById('errorState');
const pollView = document.getElementById('pollView');
const successState = document.getElementById('successState');
const voteForm = document.getElementById('voteForm');

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

function renderPoll() {
  document.getElementById('pollTitle').textContent = pollData.title;
  document.getElementById('pollDescription').textContent = pollData.description || '(No description)';
  document.getElementById('pollDuration').textContent = pollData.duration;

  // Render date options
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

    const option = document.createElement('div');
    option.className = 'vote-option';
    option.innerHTML = `
      <input type="radio" name="choice" id="${dateKey}" value="${dateKey}">
      <label class="vote-option-label" for="${dateKey}">
        <div class="vote-option-date">
          <div class="vote-option-time">${formatted}</div>
          <div class="vote-option-info">${dateKey.replace('date', 'Option ')}</div>
        </div>
      </label>
    `;
    container.appendChild(option);

    document.getElementById(dateKey).addEventListener('change', (e) => {
      selectedChoice = e.target.value;
    });
  });

  // Add "can't make it" option
  const noneOption = document.createElement('div');
  noneOption.className = 'vote-option cannot-make';
  noneOption.innerHTML = `
    <input type="radio" name="choice" id="none" value="none">
    <label class="vote-option-label" for="none">
      <div class="vote-option-date">
        <div class="vote-option-time">❌ I Can't Make It</div>
        <div class="vote-option-info">Can't attend this month</div>
      </div>
    </label>
  `;
  container.appendChild(noneOption);

  document.getElementById('none').addEventListener('change', (e) => {
    selectedChoice = e.target.value;
  });

  // Render responses
  updateResponses();
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

  if (!selectedChoice) {
    alert('Please select a date option');
    return;
  }

  const voterName = document.getElementById('voterName').value.trim();
  if (!voterName) {
    alert('Please enter your name');
    return;
  }

  const { token } = getUrlParams();

  try {
    const response = await fetch(`/api/vote/${token}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        voter_name: voterName,
        choice: selectedChoice,
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

    const result = await response.json();

    // Update poll data with new counts
    pollData.counts = result.counts;
    pollData.votes_preview = result.votes_preview;

    // Show success state
    showSuccess();
  } catch (error) {
    console.error('Error submitting vote:', error);
    alert('Failed to submit vote: ' + error.message);
  }
}

function showSuccess() {
  pollView.classList.add('hidden');
  successState.classList.remove('hidden');

  // Show final counts
  const finalCountsDiv = document.getElementById('finalCounts');
  const counts = pollData.counts;

  const countsList = [
    { label: 'Option 1', count: counts.date1, date: pollData.date1 },
    { label: 'Option 2', count: counts.date2, date: pollData.date2 },
    { label: 'Option 3', count: counts.date3, date: pollData.date3 },
    { label: "Can't make it", count: counts.none, date: null }
  ];

  finalCountsDiv.innerHTML = `
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
