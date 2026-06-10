<script>
  let currentStep = 1;
  let formData = {
    nameOrNickname: '',
    email: '',
    ageRange: '',
    stayInBerlin: '',
    genderIdentity: '',
    genderSecondary: '',
    interests: [],
    aboutYourself: '',
    whyInterested: '',
    wasReferred: 'No',
    referredByName: '',
    referredByEmail: '',
    applicationType: '',
    participatedBefore: '',
    appliedBefore: '',
    codeOfConduct: false,
    remarks: ''
  };

  let errors = {};
  let showReferralFields = false;
  let showGenderSecondary = false;
  let showLowBudget = false;
  let showVip = false;

  const stepLabels = ['My info', 'About me', 'Final check'];

  function updateFormData(field, value) {
    formData[field] = value;
    delete errors[field];

    if (field === 'wasReferred') {
      showReferralFields = value === 'Yes';
    }
    if (field === 'genderIdentity') {
      showGenderSecondary = ['Non-binary', 'Agender', 'Bigender'].includes(value);
    }
    if (field === 'applicationType') {
      showLowBudget = value.includes('Low Budget');
      showVip = value.includes('VIP');
    }
  }

  function nextStep() {
    if (validateStep(currentStep)) {
      currentStep++;
    }
  }

  function prevStep() {
    currentStep--;
  }

  function validateStep(step) {
    // Basic validation for now
    return true;
  }

  function submitForm() {
    // Form submission logic
    console.log('Form submitted:', formData);
  }

  const progressPercent = (currentStep / 3) * 100;
</script>

<div class="apply-shell">
  <header class="apply-hero">
    <h1>Polyamorous Speed Dating Event</h1>
    <div class="apply-hero-meta">
      <span class="apply-pill">Hosted by: Duck Dating Apps</span>
      <span class="apply-pill">Slug: PSD Berlin 2026</span>
    </div>
  </header>

  <div class="apply-body">
    <section class="apply-intro-card">
      <h2>Welcome</h2>
      <p>
        The main goal is that people have the opportunity to meet new people and interact with them in a safe space.
      </p>
      <p>
        The event is designed as a diverse dating space that focuses on polyamorous relationship frameworks while making room for participants' gender identities and orientation preferences.
      </p>

      <div class="apply-event-grid">
        <div class="apply-event-item">
          <strong>When</strong>
          Wed, 3 Jun 2026 · 19:00–22:00
        </div>
        <div class="apply-event-item">
          <strong>Application deadline</strong>
          22 May 2026
        </div>
        <div class="apply-event-item">
          <strong>Where</strong>
          Trashtelier · 12435 Berlin
        </div>
        <div class="apply-event-item">
          <strong>Participation fee</strong>
          9 EUR / 18 EUR · drinks included
        </div>
      </div>

      <div class="apply-warning">
        <div class="apply-warning-title">Important</div>
        <p>
          <b>
            Applying does <u>NOT</u> guarantee attendance. This form is an application,
            not a final RSVP. We review applications carefully to create a balanced event.
          </b>
        </p>
      </div>
    </section>

    <div class="apply-progress-wrap">
      <div class="apply-progress-top">
        <div class="apply-step-text">Step {currentStep}/3</div>
        <div class="apply-step-label">{stepLabels[currentStep - 1]}</div>
      </div>
      <div class="apply-progress" aria-hidden="true">
        <div class="apply-progress-bar" style="width: {progressPercent}%"></div>
      </div>
    </div>

    <div class="apply-card">
      <form on:submit|preventDefault={submitForm} novalidate>
        {#if currentStep === 1}
          <section class="apply-step is-active">
            <h2>My info</h2>
            <p class="apply-step-intro">
              Tell us a little about yourself so we can better understand who is applying.
            </p>

            <div class="apply-grid">
              <div class="apply-field">
                <label for="nameOrNickname">Name or NickName <span class="apply-required">*</span></label>
                <input
                  class="apply-input"
                  type="text"
                  id="nameOrNickname"
                  value={formData.nameOrNickname}
                  on:change={(e) => updateFormData('nameOrNickname', e.target.value)}
                  maxlength="120"
                  required
                />
              </div>

              <div class="apply-field">
                <label for="email">Email <span class="apply-required">*</span></label>
                <input
                  class="apply-input"
                  type="email"
                  id="email"
                  value={formData.email}
                  on:change={(e) => updateFormData('email', e.target.value)}
                  maxlength="160"
                  required
                />
              </div>

              <div class="apply-field">
                <label for="ageRange">Tell us Roughly Your Age Range <span class="apply-required">*</span></label>
                <select
                  class="apply-select"
                  id="ageRange"
                  value={formData.ageRange}
                  on:change={(e) => updateFormData('ageRange', e.target.value)}
                  required
                >
                  <option value="">Please choose</option>
                  <option>18–25</option>
                  <option>22–30</option>
                  <option>26–35</option>
                  <option>32–40</option>
                  <option>36–45</option>
                  <option>42–50</option>
                  <option>46–55</option>
                  <option>52–60</option>
                  <option>60+</option>
                </select>
              </div>

              <div class="apply-field">
                <span class="apply-legend">Will Stay In Berlin Next 6 Months <span class="apply-required">*</span></span>
                <div class="apply-radio-group">
                  <label class="apply-choice">
                    <input
                      type="radio"
                      name="stay_in_berlin"
                      value="Yes"
                      checked={formData.stayInBerlin === 'Yes'}
                      on:change={(e) => updateFormData('stayInBerlin', e.target.value)}
                    />
                    <span class="apply-choice-text"><strong>Yes</strong></span>
                  </label>
                  <label class="apply-choice">
                    <input
                      type="radio"
                      name="stay_in_berlin"
                      value="No"
                      checked={formData.stayInBerlin === 'No'}
                      on:change={(e) => updateFormData('stayInBerlin', e.target.value)}
                    />
                    <span class="apply-choice-text"><strong>No</strong></span>
                  </label>
                  <label class="apply-choice">
                    <input
                      type="radio"
                      name="stay_in_berlin"
                      value="Not sure yet"
                      checked={formData.stayInBerlin === 'Not sure yet'}
                      on:change={(e) => updateFormData('stayInBerlin', e.target.value)}
                    />
                    <span class="apply-choice-text"><strong>Not sure yet</strong></span>
                  </label>
                </div>
              </div>

              <div class="apply-field">
                <label for="genderIdentity">I identify as <span class="apply-required">*</span></label>
                <select
                  class="apply-select"
                  id="genderIdentity"
                  value={formData.genderIdentity}
                  on:change={(e) => updateFormData('genderIdentity', e.target.value)}
                  required
                >
                  <option value="">Please choose</option>
                  <option value="Man">Man</option>
                  <option value="Woman">Woman</option>
                  <option value="Non-binary">Non-binary</option>
                  <option value="Agender">Agender</option>
                  <option value="Bigender">Bigender</option>
                </select>
              </div>

              {#if showGenderSecondary}
                <div class="apply-field">
                  <span class="apply-legend">Additional identity detail</span>
                  <div class="apply-radio-group apply-switch-group">
                    <label class="apply-choice apply-switch">
                      <input
                        type="radio"
                        name="genderSecondary"
                        value="Cis"
                        checked={formData.genderSecondary === 'Cis'}
                        on:change={(e) => updateFormData('genderSecondary', e.target.value)}
                      />
                      <span class="apply-choice-text"><strong>Cis</strong></span>
                    </label>
                    <label class="apply-choice apply-switch">
                      <input
                        type="radio"
                        name="genderSecondary"
                        value="Trans"
                        checked={formData.genderSecondary === 'Trans'}
                        on:change={(e) => updateFormData('genderSecondary', e.target.value)}
                      />
                      <span class="apply-choice-text"><strong>Trans</strong></span>
                    </label>
                  </div>
                </div>
              {/if}
            </div>
          </section>
        {:else if currentStep === 2}
          <section class="apply-step is-active">
            <h2>About me</h2>
            <p class="apply-step-intro">
              This helps us curate the event thoughtfully and understand your interest.
            </p>

            <div class="apply-grid">
              <div class="apply-field apply-grid-1">
                <label for="aboutYourself">Tell us a bit about yourself. <span class="apply-required">*</span></label>
                <textarea
                  class="apply-textarea"
                  id="aboutYourself"
                  value={formData.aboutYourself}
                  on:change={(e) => updateFormData('aboutYourself', e.target.value)}
                  required
                ></textarea>
              </div>

              <div class="apply-field apply-grid-1">
                <label for="whyInterested">Why are you interested in this event? <span class="apply-required">*</span></label>
                <textarea
                  class="apply-textarea"
                  id="whyInterested"
                  value={formData.whyInterested}
                  on:change={(e) => updateFormData('whyInterested', e.target.value)}
                  required
                ></textarea>
              </div>

              <div class="apply-field apply-grid-1">
                <span class="apply-legend">Were you referred by someone?</span>
                <div class="apply-radio-group apply-switch-group">
                  <label class="apply-choice apply-switch">
                    <input
                      type="radio"
                      name="was_referred"
                      value="No"
                      checked={formData.wasReferred === 'No'}
                      on:change={(e) => updateFormData('wasReferred', e.target.value)}
                    />
                    <span class="apply-choice-text"><strong>No</strong></span>
                  </label>
                  <label class="apply-choice apply-switch">
                    <input
                      type="radio"
                      name="was_referred"
                      value="Yes"
                      checked={formData.wasReferred === 'Yes'}
                      on:change={(e) => updateFormData('wasReferred', e.target.value)}
                    />
                    <span class="apply-choice-text"><strong>Yes</strong></span>
                  </label>
                </div>
              </div>

              {#if showReferralFields}
                <div class="apply-grid apply-grid-1">
                  <div class="apply-field">
                    <label for="referredByName">Referred By Name</label>
                    <input
                      class="apply-input"
                      type="text"
                      id="referredByName"
                      value={formData.referredByName}
                      on:change={(e) => updateFormData('referredByName', e.target.value)}
                      maxlength="120"
                    />
                  </div>
                  <div class="apply-field">
                    <label for="referredByEmail">Referred By Email</label>
                    <input
                      class="apply-input"
                      type="email"
                      id="referredByEmail"
                      value={formData.referredByEmail}
                      on:change={(e) => updateFormData('referredByEmail', e.target.value)}
                      maxlength="160"
                    />
                  </div>
                </div>
              {/if}

              <div class="apply-box apply-grid-1">
                <h3>I want to apply for</h3>
                <div class="apply-radio-group">
                  <label class="apply-choice">
                    <input
                      type="radio"
                      name="application_type"
                      value="Normal price (18 EUR)"
                      on:change={(e) => updateFormData('applicationType', e.target.value)}
                    />
                    <span class="apply-choice-text">
                      <strong>Normal price (18 EUR)</strong>
                      <small>Standard ticket price.</small>
                    </span>
                  </label>
                  <label class="apply-choice">
                    <input
                      type="radio"
                      name="application_type"
                      value="Low Budget / requires volunteering (9 EUR)"
                      on:change={(e) => updateFormData('applicationType', e.target.value)}
                    />
                    <span class="apply-choice-text">
                      <strong>Low Budget / requires volunteering (9 EUR)</strong>
                      <small>For people who need a lower price point and can help on the day of the event by volunteering.</small>
                    </span>
                  </label>
                  <label class="apply-choice">
                    <input
                      type="radio"
                      name="application_type"
                      value="VIP support (25 EUR)"
                      on:change={(e) => updateFormData('applicationType', e.target.value)}
                    />
                    <span class="apply-choice-text">
                      <strong>VIP (25 EUR) — voluntary support</strong>
                      <small>Support the project if you have a bit extra. No extra perks.</small>
                    </span>
                  </label>
                </div>
              </div>
            </div>
          </section>
        {:else if currentStep === 3}
          <section class="apply-step is-active">
            <h2>Final check</h2>
            <p class="apply-step-intro">
              Final consent, a few practical questions, and a last review before sending.
            </p>

            <div class="apply-grid">
              <div class="apply-field apply-grid-1">
                <span class="apply-legend">
                  Have you already participated in this particular Poly Speed Dating before?
                  <span class="apply-required">*</span>
                </span>
                <div class="apply-radio-group">
                  <label class="apply-choice">
                    <input
                      type="radio"
                      name="participated_before"
                      value="Yes"
                      on:change={(e) => updateFormData('participatedBefore', e.target.value)}
                    />
                    <span class="apply-choice-text"><strong>Yes</strong></span>
                  </label>
                  <label class="apply-choice">
                    <input
                      type="radio"
                      name="participated_before"
                      value="No"
                      on:change={(e) => updateFormData('participatedBefore', e.target.value)}
                    />
                    <span class="apply-choice-text"><strong>No</strong></span>
                  </label>
                </div>
              </div>

              <div class="apply-field apply-grid-1">
                <span class="apply-legend">
                  Read and accept the Code of Conduct <span class="apply-required">*</span>
                </span>
                <label class="apply-choice">
                  <input
                    type="checkbox"
                    id="codeOfConduct"
                    name="code_of_conduct"
                    value="Yes"
                    on:change={(e) => updateFormData('codeOfConduct', e.target.checked)}
                  />
                  <span class="apply-choice-text">
                    <strong>I have read and accept the Code of Conduct.</strong>
                    <small>Please read it before submitting.</small>
                  </span>
                </label>
              </div>

              <div class="apply-field apply-grid-1">
                <label for="remarks">Remarks - anything else you would like us to know?</label>
                <textarea
                  class="apply-textarea"
                  id="remarks"
                  value={formData.remarks}
                  on:change={(e) => updateFormData('remarks', e.target.value)}
                ></textarea>
              </div>
            </div>
          </section>
        {/if}

        <div class="apply-actions">
          <button
            type="button"
            on:click={prevStep}
            class="btn btn-ghost apply-btn"
            class:is-hidden={currentStep === 1}
          >
            Previous
          </button>

          <div class="apply-actions-right">
            <button
              type="button"
              on:click={nextStep}
              class="btn btn-apply apply-btn"
              class:is-hidden={currentStep === 3}
            >
              Next
            </button>
            <button
              type="submit"
              class="btn btn-apply apply-btn"
              class:is-hidden={currentStep !== 3}
            >
              Submit application
            </button>
          </div>
        </div>
      </form>
    </div>
  </div>
</div>

<style>
  :global(.apply-shell) {
    background: rgba(255, 255, 255, 0.95);
    border: 1px solid rgba(52, 12, 70, 0.08);
    border-radius: 28px;
    box-shadow: 0 18px 50px rgba(52, 12, 70, 0.12);
    overflow: hidden;
  }

  :global(.apply-hero) {
    background: linear-gradient(135deg, var(--psd-primary), var(--psd-accent));
    color: #fff;
    padding: 2rem 1.25rem 1.6rem;
    text-align: center;
  }

  :global(.apply-hero h1) {
    margin: 0 0 0.45rem;
    font-size: clamp(2rem, 4vw, 3rem);
    line-height: 1.08;
  }

  :global(.apply-hero-meta) {
    margin-top: 1rem;
    display: inline-flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 0.5rem;
  }

  :global(.apply-pill) {
    display: inline-flex;
    align-items: center;
    gap: 0.4rem;
    background: rgba(255, 255, 255, 0.14);
    border: 1px solid rgba(255, 255, 255, 0.2);
    color: #fff;
    border-radius: 999px;
    padding: 0.55rem 0.9rem;
    font-weight: 700;
    font-size: 0.95rem;
  }

  :global(.apply-body) {
    padding: 1.25rem;
  }

  :global(.apply-intro-card) {
    background: #fff9f2;
    border: 1px solid rgba(252, 191, 0, 0.35);
    border-radius: 24px;
    padding: 1.25rem;
    box-shadow: 0 8px 22px rgba(0, 0, 0, 0.05);
    margin-bottom: 1.25rem;
  }

  :global(.apply-intro-card h2) {
    margin: 0 0 0.6rem;
    color: var(--psd-primary);
    font-size: 1.6rem;
  }

  :global(.apply-intro-card p) {
    margin: 0.7rem 0;
    color: #413752;
  }

  :global(.apply-event-grid) {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 0.9rem;
    margin-top: 1rem;
  }

  :global(.apply-event-item) {
    background: #fff;
    border: 1px solid rgba(52, 12, 70, 0.1);
    border-radius: 18px;
    padding: 0.9rem 1rem;
  }

  :global(.apply-event-item strong) {
    display: block;
    margin-bottom: 0.2rem;
    color: var(--psd-primary);
  }

  :global(.apply-warning) {
    margin-top: 1rem;
    background: linear-gradient(90deg, #fff0f2, #fff7dc);
    border: 2px solid var(--psd-accent);
    border-radius: 20px;
    padding: 1rem 1.1rem;
    box-shadow: 0 10px 24px rgba(229, 0, 81, 0.08);
  }

  :global(.apply-warning-title) {
    font-size: 1.1rem;
    font-weight: 900;
    color: var(--psd-accent);
    margin-bottom: 0.35rem;
    text-transform: uppercase;
    letter-spacing: 0.03em;
  }

  :global(.apply-warning p) {
    margin: 0;
    font-weight: 800;
    color: #5b2340;
    line-height: 1.45;
  }

  :global(.apply-progress-wrap) {
    margin-bottom: 1.4rem;
  }

  :global(.apply-progress-top) {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 1rem;
    margin-bottom: 0.65rem;
    flex-wrap: wrap;
  }

  :global(.apply-step-text) {
    font-weight: 900;
    color: var(--psd-primary);
    font-size: 1rem;
  }

  :global(.apply-step-label) {
    color: #6b5a7b;
    font-weight: 700;
  }

  :global(.apply-progress) {
    width: 100%;
    height: 14px;
    border-radius: 999px;
    background: #efe8fb;
    overflow: hidden;
    box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.08);
  }

  :global(.apply-progress-bar) {
    height: 100%;
    border-radius: 999px;
    background: linear-gradient(90deg, var(--psd-accent), var(--psd-gold, #fcbf00));
    transition: width 0.25s ease;
  }

  :global(.apply-card) {
    background: #fff;
    border: 1px solid rgba(52, 12, 70, 0.1);
    border-radius: 24px;
    padding: 1.2rem;
    box-shadow: 0 10px 26px rgba(0, 0, 0, 0.05);
  }

  :global(.apply-step h2) {
    margin-top: 0;
    margin-bottom: 0.35rem;
    color: var(--psd-primary);
    font-size: 1.7rem;
  }

  :global(.apply-step-intro) {
    margin-top: 0;
    margin-bottom: 1.1rem;
    color: #5b5370;
  }

  :global(.apply-grid) {
    display: grid;
    gap: 1rem;
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  :global(.apply-grid-1) {
    grid-column: 1 / -1;
  }

  :global(.apply-field) {
    display: flex;
    flex-direction: column;
    gap: 0.35rem;
  }

  :global(.apply-field label),
  :global(.apply-legend) {
    font-weight: 800;
    color: #2b004d;
  }

  :global(.apply-required) {
    color: var(--psd-accent);
  }

  :global(.apply-input),
  :global(.apply-select),
  :global(.apply-textarea) {
    width: 100%;
    border: 1.5px solid #ddd6ee;
    background: #fcfbff;
    color: #333;
    border-radius: 16px;
    padding: 0.85rem 0.95rem;
    font: inherit;
    transition: border-color 0.15s ease, box-shadow 0.15s ease, background 0.15s ease;
  }

  :global(.apply-input:focus),
  :global(.apply-select:focus),
  :global(.apply-textarea:focus) {
    outline: none;
    border-color: var(--psd-accent);
    box-shadow: 0 0 0 4px rgba(0, 159, 227, 0.12);
    background: #fff;
  }

  :global(.apply-textarea) {
    min-height: 130px;
    resize: vertical;
  }

  :global(.apply-radio-group),
  :global(.apply-check-group) {
    display: grid;
    gap: 0.6rem;
    margin-top: 0.3rem;
  }

  :global(.apply-choice) {
    display: flex;
    align-items: flex-start;
    gap: 0.7rem;
    background: #fcfbff;
    border: 1.5px solid #e3daf3;
    border-radius: 16px;
    padding: 0.85rem 0.95rem;
    transition: border-color 0.15s ease, transform 0.12s ease, background 0.15s ease;
  }

  :global(.apply-choice:hover) {
    border-color: var(--psd-accent);
    transform: translateY(-1px);
    background: #fff;
  }

  :global(.apply-choice input) {
    margin-top: 0.2rem;
    accent-color: var(--psd-accent);
    width: 18px;
    height: 18px;
    flex: 0 0 auto;
  }

  :global(.apply-choice-text strong) {
    display: block;
    color: #2b004d;
    margin-bottom: 0.15rem;
  }

  :global(.apply-choice-text small) {
    color: #6d637d;
    line-height: 1.4;
  }

  :global(.apply-box) {
    margin-top: 1rem;
    background: #fff9f2;
    border: 1px solid rgba(252, 191, 0, 0.45);
    border-radius: 18px;
    padding: 1rem;
  }

  :global(.apply-box h3) {
    margin: 0 0 0.4rem;
    color: #4a2c00;
  }

  :global(.apply-box p) {
    margin: 0.25rem 0 0;
    color: #5b4c2a;
  }

  :global(.apply-actions) {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 1rem;
    margin-top: 1.2rem;
    flex-wrap: wrap;
  }

  :global(.apply-actions-right) {
    display: flex;
    gap: 0.75rem;
    flex-wrap: wrap;
  }

  :global(.is-hidden) {
    display: none !important;
  }

  :global(.apply-switch-group) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  :global(.apply-switch) {
    align-items: center;
    justify-content: center;
    text-align: center;
    min-height: 60px;
  }

  @media (max-width: 760px) {
    :global(.apply-grid),
    :global(.apply-event-grid) {
      grid-template-columns: 1fr;
    }

    :global(.apply-switch-group) {
      grid-template-columns: 1fr;
    }

    :global(.apply-body) {
      padding: 1rem;
    }

    :global(.apply-hero) {
      padding: 1.6rem 1rem 1.3rem;
    }

    :global(.apply-actions),
    :global(.apply-actions-right) {
      flex-direction: column;
      align-items: stretch;
    }
  }
</style>
