<script>
  import { onMount } from 'svelte';

  let applicants = [];
  let filteredApplicants = [];
  let loading = true;
  let searchQuery = '';
  let selectedStatuses = {
    applied: true,
    approved: true,
    rejected: false,
    waitlist: true
  };
  let selectedGenders = {
    men: true,
    women: true,
    nonbinary: true,
    agender: true,
    other: true
  };

  // Mock data - in production would come from API
  const mockApplicants = [
    {
      id: 1,
      name: 'Alex Johnson',
      email: 'alex@example.com',
      gender: 'men',
      age_range: '26–35',
      status: 'approved',
      interested_in: ['All'],
      about: 'Passionate about polyamory and community building',
      applied_at: '2026-05-15'
    },
    {
      id: 2,
      name: 'Jordan Smith',
      email: 'jordan@example.com',
      gender: 'women',
      age_range: '22–30',
      status: 'applied',
      interested_in: ['Men', 'Non-binary people'],
      about: 'Looking to meet new people and expand my network',
      applied_at: '2026-05-20'
    },
    {
      id: 3,
      name: 'Casey Rivera',
      email: 'casey@example.com',
      gender: 'nonbinary',
      age_range: '18–25',
      status: 'applied',
      interested_in: ['All'],
      about: 'New to poly dating, excited to learn',
      applied_at: '2026-05-22'
    },
    {
      id: 4,
      name: 'Morgan Lee',
      email: 'morgan@example.com',
      gender: 'other',
      age_range: '32–40',
      status: 'approved',
      interested_in: ['Women', 'Non-binary people'],
      about: 'Experienced in polyamory, enjoy facilitating connections',
      applied_at: '2026-05-10'
    }
  ];

  onMount(() => {
    applicants = mockApplicants;
    filterApplicants();
    loading = false;
  });

  function filterApplicants() {
    filteredApplicants = applicants.filter((applicant) => {
      const matchesSearch =
        applicant.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        applicant.email.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesStatus = selectedStatuses[applicant.status];
      const matchesGender = selectedGenders[applicant.gender];

      return matchesSearch && matchesStatus && matchesGender;
    });
  }

  function updateSearch() {
    filterApplicants();
  }

  function toggleStatus(status) {
    selectedStatuses[status] = !selectedStatuses[status];
    filterApplicants();
  }

  function toggleGender(gender) {
    selectedGenders[gender] = !selectedGenders[gender];
    filterApplicants();
  }

  function getGenderColor(gender) {
    const colors = {
      men: '#0066cc',
      women: '#cc3333',
      nonbinary: '#ffcc00',
      agender: '#666',
      other: '#9b59b6'
    };
    return colors[gender] || '#999';
  }

  function getStatusBadgeColor(status) {
    const colors = {
      approved: '#27ae60',
      rejected: '#e74c3c',
      applied: '#3498db',
      waitlist: '#f39c12'
    };
    return colors[status] || '#999';
  }

  function getGenderLabel(gender) {
    const labels = {
      men: 'Men',
      women: 'Women',
      nonbinary: 'Non-binary',
      agender: 'Agender',
      other: 'Other'
    };
    return labels[gender] || gender;
  }

  function exportCSV() {
    const headers = ['Name', 'Email', 'Gender', 'Age', 'Status', 'Applied'];
    const rows = filteredApplicants.map((a) => [
      a.name,
      a.email,
      getGenderLabel(a.gender),
      a.age_range,
      a.status.toUpperCase(),
      a.applied_at
    ]);

    const csvContent = [headers, ...rows]
      .map((row) => row.map((cell) => `"${cell}"`).join(','))
      .join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'applicants.csv';
    a.click();
  }

  $: if (applicants.length > 0) {
    filterApplicants();
  }

  const stats = {
    total: applicants.length,
    approved: applicants.filter((a) => a.status === 'approved').length,
    applied: applicants.filter((a) => a.status === 'applied').length,
    rejected: applicants.filter((a) => a.status === 'rejected').length
  };
</script>

<div class="dashboard">
  <div class="sidebar">
    <div class="sidebar-section">
      <h3>Search</h3>
      <input
        type="text"
        placeholder="Name or email..."
        bind:value={searchQuery}
        on:input={updateSearch}
        class="search-input"
      />
    </div>

    <div class="sidebar-section">
      <h3>Status</h3>
      <div class="filter-group">
        <label class="filter-checkbox">
          <input
            type="checkbox"
            checked={selectedStatuses.applied}
            on:change={() => toggleStatus('applied')}
          />
          <span>Applied ({applicants.filter((a) => a.status === 'applied').length})</span>
        </label>
        <label class="filter-checkbox">
          <input
            type="checkbox"
            checked={selectedStatuses.approved}
            on:change={() => toggleStatus('approved')}
          />
          <span>Approved ({applicants.filter((a) => a.status === 'approved').length})</span>
        </label>
        <label class="filter-checkbox">
          <input
            type="checkbox"
            checked={selectedStatuses.rejected}
            on:change={() => toggleStatus('rejected')}
          />
          <span>Rejected ({applicants.filter((a) => a.status === 'rejected').length})</span>
        </label>
        <label class="filter-checkbox">
          <input
            type="checkbox"
            checked={selectedStatuses.waitlist}
            on:change={() => toggleStatus('waitlist')}
          />
          <span>Waitlist ({applicants.filter((a) => a.status === 'waitlist').length})</span>
        </label>
      </div>
    </div>

    <div class="sidebar-section">
      <h3>Gender</h3>
      <div class="filter-group">
        <label class="filter-checkbox">
          <input
            type="checkbox"
            checked={selectedGenders.men}
            on:change={() => toggleGender('men')}
          />
          <span>Men</span>
        </label>
        <label class="filter-checkbox">
          <input
            type="checkbox"
            checked={selectedGenders.women}
            on:change={() => toggleGender('women')}
          />
          <span>Women</span>
        </label>
        <label class="filter-checkbox">
          <input
            type="checkbox"
            checked={selectedGenders.nonbinary}
            on:change={() => toggleGender('nonbinary')}
          />
          <span>Non-binary</span>
        </label>
        <label class="filter-checkbox">
          <input
            type="checkbox"
            checked={selectedGenders.agender}
            on:change={() => toggleGender('agender')}
          />
          <span>Agender</span>
        </label>
        <label class="filter-checkbox">
          <input
            type="checkbox"
            checked={selectedGenders.other}
            on:change={() => toggleGender('other')}
          />
          <span>Other</span>
        </label>
      </div>
    </div>
  </div>

  <div class="content">
    <div class="header">
      <div>
        <h1>Applicant Dashboard</h1>
        <p>Manage and review event applications</p>
      </div>
      <button class="export-btn" on:click={exportCSV}>📥 Export CSV</button>
    </div>

    <div class="stats-grid">
      <div class="stat-card">
        <div class="stat-number">{stats.total}</div>
        <div class="stat-label">Total Applicants</div>
      </div>
      <div class="stat-card">
        <div class="stat-number" style="color: #3498db">{stats.applied}</div>
        <div class="stat-label">Applied</div>
      </div>
      <div class="stat-card">
        <div class="stat-number" style="color: #27ae60">{stats.approved}</div>
        <div class="stat-label">Approved</div>
      </div>
      <div class="stat-card">
        <div class="stat-number" style="color: #e74c3c">{stats.rejected}</div>
        <div class="stat-label">Rejected</div>
      </div>
    </div>

    {#if loading}
      <div class="loading">Loading applicants...</div>
    {:else if filteredApplicants.length === 0}
      <div class="empty-state">
        <p>No applicants match your filters</p>
      </div>
    {:else}
      <div class="applicants-list">
        {#each filteredApplicants as applicant (applicant.id)}
          <div class="applicant-card" style="border-left-color: {getGenderColor(applicant.gender)}">
            <div class="applicant-header">
              <div class="applicant-info">
                <h3>{applicant.name}</h3>
                <p class="email">{applicant.email}</p>
                <p class="meta">{applicant.age_range} • {getGenderLabel(applicant.gender)}</p>
              </div>
              <div class="applicant-actions">
                <span
                  class="status-badge"
                  style="background: {getStatusBadgeColor(applicant.status)}"
                >
                  {applicant.status.toUpperCase()}
                </span>
              </div>
            </div>
            <div class="applicant-details">
              <p><strong>About:</strong> {applicant.about}</p>
              <p><strong>Interested in:</strong> {applicant.interested_in.join(', ')}</p>
              <p class="applied-date">Applied: {new Date(applicant.applied_at).toLocaleDateString()}</p>
            </div>
          </div>
        {/each}
      </div>
    {/if}
  </div>
</div>

<style>
  .dashboard {
    display: flex;
    min-height: 100vh;
    background: #f5f7fa;
  }

  .sidebar {
    width: 280px;
    background: white;
    border-right: 1px solid #e0e0e0;
    padding: 2rem 1.5rem;
    overflow-y: auto;
    max-height: 100vh;
    position: sticky;
    top: 0;
  }

  .sidebar-section {
    margin-bottom: 2rem;
  }

  .sidebar-section h3 {
    font-size: 0.85rem;
    text-transform: uppercase;
    color: #666;
    margin-bottom: 0.8rem;
    font-weight: 700;
    letter-spacing: 0.5px;
  }

  .search-input {
    width: 100%;
    padding: 0.75rem;
    border: 1px solid #ddd;
    border-radius: 6px;
    font-size: 0.9rem;
  }

  .search-input:focus {
    outline: none;
    border-color: var(--psd-primary, #340c46);
    box-shadow: 0 0 0 3px rgba(52, 12, 70, 0.1);
  }

  .filter-group {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }

  .filter-checkbox {
    display: flex;
    align-items: center;
    gap: 0.6rem;
    cursor: pointer;
    font-size: 0.9rem;
  }

  .filter-checkbox input {
    cursor: pointer;
    width: 18px;
    height: 18px;
    accent-color: var(--psd-primary, #340c46);
  }

  .content {
    flex: 1;
    padding: 2rem;
    overflow-y: auto;
  }

  .header {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    margin-bottom: 2rem;
  }

  .header h1 {
    font-size: 2rem;
    color: #1a1a1a;
    margin: 0 0 0.5rem 0;
  }

  .header p {
    color: #666;
    margin: 0;
  }

  .export-btn {
    padding: 0.75rem 1.5rem;
    background: #27ae60;
    color: white;
    border: none;
    border-radius: 6px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.2s;
  }

  .export-btn:hover {
    background: #229954;
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(39, 174, 96, 0.3);
  }

  .stats-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
    gap: 1.5rem;
    margin-bottom: 2rem;
  }

  .stat-card {
    background: white;
    border-radius: 12px;
    padding: 1.5rem;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
    text-align: center;
  }

  .stat-number {
    font-size: 2.5rem;
    font-weight: 700;
    color: var(--psd-primary, #340c46);
    margin-bottom: 0.5rem;
  }

  .stat-label {
    color: #666;
    font-size: 0.9rem;
  }

  .loading,
  .empty-state {
    background: white;
    border-radius: 12px;
    padding: 3rem;
    text-align: center;
    color: #999;
  }

  .applicants-list {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  .applicant-card {
    background: white;
    border-left: 4px solid;
    border-radius: 8px;
    padding: 1.5rem;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
    transition: all 0.2s;
  }

  .applicant-card:hover {
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.12);
  }

  .applicant-header {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    margin-bottom: 1rem;
  }

  .applicant-info h3 {
    margin: 0 0 0.25rem 0;
    color: #1a1a1a;
    font-size: 1.1rem;
  }

  .email {
    color: #0066cc;
    font-size: 0.9rem;
    margin: 0 0 0.25rem 0;
  }

  .meta {
    color: #666;
    font-size: 0.85rem;
    margin: 0;
  }

  .status-badge {
    display: inline-block;
    padding: 0.5rem 1rem;
    border-radius: 20px;
    color: white;
    font-weight: 600;
    font-size: 0.8rem;
    white-space: nowrap;
  }

  .applicant-details {
    color: #555;
    font-size: 0.9rem;
    line-height: 1.6;
  }

  .applicant-details p {
    margin: 0.5rem 0;
  }

  .applied-date {
    color: #999;
    font-size: 0.8rem;
    margin-top: 1rem !important;
  }

  @media (max-width: 768px) {
    .dashboard {
      flex-direction: column;
    }

    .sidebar {
      width: 100%;
      max-height: auto;
      padding: 1rem;
      border-right: none;
      border-bottom: 1px solid #e0e0e0;
    }

    .header {
      flex-direction: column;
      gap: 1rem;
    }

    .stats-grid {
      grid-template-columns: repeat(2, 1fr);
    }
  }
</style>
