document.addEventListener("DOMContentLoaded", function () {
  let currentStep = 1;
  const totalSteps = 3;

  const QUIZ_PASS_PERCENT = 80;

  const psdQuizQuestions = [
    {
      question: "What does consent mean at PSD?",
      answers: [
        "A yes at the beginning means yes forever",
        "Consent should be enthusiastic and can change at any time",
        "Consent is only needed for physical contact",
        "Consent is assumed during flirting"
      ],
      correctAnswer: "Consent should be enthusiastic and can change at any time",
      explanation: "Consent can be withdrawn at any time and should always be enthusiastic."
    },
    {
      question: "Can participants exchange personal contact details during the event?",
      answers: [
        "Yes, anytime",
        "Only during breaks",
        "No, organizers handle follow-ups after mutual matches",
        "Only after the 1-on-1 rounds"
      ],
      correctAnswer: "No, organizers handle follow-ups after mutual matches",
      explanation: "The event avoids pressure and awkwardness around contact sharing."
    },
    {
      question: "How should participants treat pronouns and identities?",
      answers: [
        "Only use binary pronouns",
        "Use each participant’s chosen name and pronouns",
        "Avoid pronouns completely",
        "Only ask organizers"
      ],
      correctAnswer: "Use each participant’s chosen name and pronouns",
      explanation: "Respect and inclusivity are core values of PSD."
    },
    {
      question: "What should extroverted participants try to do?",
      answers: [
        "Lead every conversation",
        "Speak louder so everyone hears them",
        "Give space to quieter people",
        "Talk during silence"
      ],
      correctAnswer: "Give space to quieter people",
      explanation: "Balanced conversations help everyone feel included."
    },
    {
      question: "What are introverted participants encouraged to do?",
      answers: [
        "Avoid talking",
        "Only listen",
        "Speak up and show themselves",
        "Skip the 1-on-1s"
      ],
      correctAnswer: "Speak up and show themselves",
      explanation: "The event encourages balanced participation from everyone. We know it can be tough, but people need to see you."
    },
    {
      question: "What should you do if you witness inappropriate behavior?",
      answers: [
        "Ignore it",
        "Post about it later",
        "Inform the organizers immediately",
        "Handle it alone"
      ],
      correctAnswer: "Inform the organizers immediately",
      explanation: "Organizers are there to maintain a safe environment. Even if you are unsure, let us know and we will see how to use the most appropriate steps to manage the situation. We have a LOT of experience ;)"
    },
    {
      question: "What should you do if you feel overwhelmed or uncomfortable?",
      answers: [
        "Leave immediately without saying anything",
        "Take a break and/or speak to organizers",
        "Force yourself to continue",
        "Drink more alcohol"
      ],
      correctAnswer: "Take a break and/or speak to organizers",
      explanation: "Participants are encouraged to prioritize comfort and safety."
    },
    {
      question: "What is the recommendation regarding perfumes and fragrances?",
      answers: [
        "Wear strong perfumes",
        "Avoid strong fragrances",
        "Only natural fragrances are allowed",
        "Perfume is encouraged"
      ],
      correctAnswer: "Avoid strong fragrances",
      explanation: "Some participants may have allergies or sensitivities."
    },
    {
      question: "Can couples participate together looking for a third person?",
      answers: [
        "Yes, always",
        "Only during mingling",
        "No, no unicorn hunting",
        "Only with organizer permission"
      ],
      correctAnswer: "No, no unicorn hunting",
      explanation: "The event is designed for individual participation."
    },
    {
      question: "Can participants select both romantic and social interest?",
      answers: [
        "No, only one",
        "Only organizers can choose both",
        "Yes, participants can choose both or only one",
        "Only after the event"
      ],
      correctAnswer: "Yes, participants can choose both or only one",
      explanation: "Yes, participants can choose both or only one. Or none. Participants can customize the type of connections they seek."
    },
    {
      question: "What is the recommendation regarding alcohol/drug consumption?",
      answers: [
        "Drink as much as possible",
        "Alcohol and drugs are required",
        "Keep alcohol consumption minimal. We have a strict no drug policy",
        "Only cocktails are allowed"
      ],
      correctAnswer: "Keep alcohol consumption minimal. We have a strict no drug policy",
      explanation: "Visibly intoxicated participants may be removed."
    },
    {
      question: "When are matches and contact sharing confirmed?",
      answers: [
        "Immediately during the event",
        "The next day at noon in the Software",
        "During the first break",
        "Only in person"
      ],
      correctAnswer: "The next day at noon in the Software",
      explanation: "Sometimes one needs to sleep on it. You can change your preferences anytime before noon next day. <span style='color: #d43c3c; font-weight: bold;'>So make sure you remember your password</span>"
    },
    {
      question: "What should participants NOT do in the matching software?",
      answers: [
        "Select multiple people",
        "Add their partners",
        "Choose social matches",
        "Revise selections later"
      ],
      correctAnswer: "Add their partners",
      explanation: "Participants should not add existing partners into the system, as it may reduce your chances to meet new people."
    }
  ];

  const form = document.getElementById("psdApplyForm");

  const steps = document.querySelectorAll(".apply-step");
  const nextBtn = document.getElementById("nextBtn");
  const prevBtn = document.getElementById("prevBtn");
  const submitBtn = document.getElementById("submitBtn");
  const stepText = document.getElementById("stepText");
  const progressBar = document.getElementById("progressBar");

  const genderPrimary = document.getElementById("genderPrimary");
  const genderSecondaryWrap = document.getElementById("genderSecondaryWrap");
  const genderIdentityHidden = document.getElementById("genderIdentityHidden");

  const interestAll = document.getElementById("interestAll");
  const interestMen = document.getElementById("interestMen");
  const interestWomen = document.getElementById("interestWomen");
  const interestMenDetailWrap = document.getElementById("interestMenDetailWrap");
  const interestWomenDetailWrap = document.getElementById("interestWomenDetailWrap");
  const interestedInHidden = document.getElementById("interestedInHidden");

  const referredWrap = document.getElementById("referredWrap");

  const lowBudgetWrap = document.getElementById("lowBudgetWrap");
  const vipWrap = document.getElementById("vipWrap");
  const volunteerShift1 = document.getElementById("volunteerShift1");
  const volunteerShift2 = document.getElementById("volunteerShift2");
  const lowBudgetReason = document.getElementById("lowBudgetReason");

  const quizScorePercent = document.getElementById("quizScorePercent");
  const quizCorrectCount = document.getElementById("quizCorrectCount");
  const quizTotalQuestions = document.getElementById("quizTotalQuestions");
  const quizPassed = document.getElementById("quizPassed");

  const startQuizBtn = document.getElementById("startQuizBtn");
  const quizStartScreen = document.getElementById("quizStartScreen");
  const quizWindow = document.getElementById("quizWindow");
  const quizResultScreen = document.getElementById("quizResultScreen");
  const quizProgressText = document.getElementById("quizProgressText");
  const quizProgressBar = document.getElementById("quizProgressBar");
  const quizQuestion = document.getElementById("quizQuestion");
  const quizAnswers = document.getElementById("quizAnswers");
  const quizExplanation = document.getElementById("quizExplanation");
  const quizNextBtn = document.getElementById("quizNextBtn");
  const quizBackBtn = document.getElementById("quizBackBtn");
  const redoQuizBtn = document.getElementById("redoQuizBtn");
  const continueAfterQuizBtn = document.getElementById("continueAfterQuizBtn");
  const quizScoreText = document.getElementById("quizScoreText");

  let quizCurrentIndex = 0;
  let quizCorrectAnswers = 0;
  let quizAnswered = false;
  let quizSelectedAnswer = "";

  function updateUI() {
    steps.forEach((step) => {
      const num = Number(step.dataset.step);
      step.classList.toggle("is-active", num === currentStep);
    });

    if (stepText) stepText.textContent = `Step ${currentStep}/${totalSteps}`;
    if (progressBar) progressBar.style.width = `${(currentStep / totalSteps) * 100}%`;
    if (prevBtn) prevBtn.classList.toggle("is-hidden", currentStep === 1);
    if (nextBtn) nextBtn.classList.toggle("is-hidden", currentStep === totalSteps);
    if (submitBtn) submitBtn.classList.toggle("is-hidden", currentStep !== totalSteps);
  }

  function getCheckedValue(name) {
    const checked = document.querySelector(`input[name="${name}"]:checked`);
    return checked ? checked.value.trim() : "";
  }

  function clearRadioGroup(name) {
    document.querySelectorAll(`input[name="${name}"]`).forEach((input) => {
      input.checked = false;
    });
  }

  function getCheckedValues(name) {
    const checked = [];
    document.querySelectorAll(`input[name="${name}"]:checked`).forEach((input) => {
      checked.push(input.value.trim());
    });
    return checked;
  }

  function updateGenderField() {
    if (!genderPrimary || !genderSecondaryWrap) return;

    const value = genderPrimary.value;
    const shouldShow = value === "Man" || value === "Woman";

    genderSecondaryWrap.classList.toggle("is-hidden", !shouldShow);

    if (!shouldShow) {
      clearRadioGroup("genderSecondary");
    }

    syncGenderHiddenField();
  }

  function syncGenderHiddenField() {
    if (!genderIdentityHidden || !genderPrimary) return;

    const primary = (genderPrimary.value || "").trim();
    const secondary = getCheckedValue("genderSecondary");

    if (!primary) {
      genderIdentityHidden.value = "";
      return;
    }

    if ((primary === "Man" || primary === "Woman") && secondary) {
      genderIdentityHidden.value = `${secondary} ${primary}`;
      return;
    }

    genderIdentityHidden.value = primary;
  }

  function updateInterestField(changedCheckbox = null) {
    if (changedCheckbox && changedCheckbox.id === "interestAll" && changedCheckbox.checked) {
      document.querySelectorAll(".interest-checkbox").forEach((cb) => {
        if (cb !== changedCheckbox) cb.checked = false;
      });
    }

    if (changedCheckbox && changedCheckbox.id !== "interestAll" && changedCheckbox.checked && interestAll) {
      interestAll.checked = false;
    }

    if (interestMenDetailWrap) {
      interestMenDetailWrap.classList.toggle("is-hidden", !(interestMen && interestMen.checked));
    }

    if (interestWomenDetailWrap) {
      interestWomenDetailWrap.classList.toggle("is-hidden", !(interestWomen && interestWomen.checked));
    }

    if (interestMen && !interestMen.checked) {
      clearRadioGroup("interestMenDetail");
    } else if (interestMen && interestMen.checked) {
      const menChecked = getCheckedValues("interestMenDetail").length;
      const firstMenDetail = document.querySelector('input[name="interestMenDetail"]');

      if (menChecked === 0 && firstMenDetail) {
        firstMenDetail.checked = true;
      }
    }

    if (interestWomen && !interestWomen.checked) {
      clearRadioGroup("interestWomenDetail");
    } else if (interestWomen && interestWomen.checked) {
      const womenChecked = getCheckedValues("interestWomenDetail").length;
      const firstWomenDetail = document.querySelector('input[name="interestWomenDetail"]');

      if (womenChecked === 0 && firstWomenDetail) {
        firstWomenDetail.checked = true;
      }
    }

    syncInterestHiddenField();
  }

  function syncInterestHiddenField() {
    if (!interestedInHidden) return;

    if (interestAll && interestAll.checked) {
      interestedInHidden.value = "All";
      return;
    }

    const selected = [];

    document.querySelectorAll(".interest-checkbox:checked").forEach((cb) => {
      if (cb.id === "interestAll") return;

      if (cb.id === "interestMen") {
        const menDetails = getCheckedValues("interestMenDetail");
        selected.push(...(menDetails.length > 0 ? menDetails : ["Men"]));
        return;
      }

      if (cb.id === "interestWomen") {
        const womenDetails = getCheckedValues("interestWomenDetail");
        selected.push(...(womenDetails.length > 0 ? womenDetails : ["Women"]));
        return;
      }

      selected.push((cb.value || "").trim());
    });

    interestedInHidden.value = selected.join(", ");
  }

  function updateReferralField() {
    const selected = document.querySelector('input[name="was_referred"]:checked');
    if (!selected || !referredWrap) return;

    const isYes = selected.value === "Yes";
    referredWrap.classList.toggle("is-hidden", !isYes);

    if (!isYes) {
      const name = document.getElementById("referredByName");
      const email = document.getElementById("referredByEmail");

      if (name) name.value = "";
      if (email) email.value = "";
    }
  }

  function updateApplicationTypeField() {
    const selected = getCheckedValue("application_type");

    if (lowBudgetWrap) {
      lowBudgetWrap.classList.toggle(
        "is-hidden",
        selected !== "Low Budget / requires volunteering (9 EUR)"
      );
    }

    if (vipWrap) {
      vipWrap.classList.toggle(
        "is-hidden",
        selected !== "VIP support (25 EUR)"
      );
    }

    if (selected !== "Low Budget / requires volunteering (9 EUR)") {
      if (volunteerShift1) volunteerShift1.value = "";
      if (volunteerShift2) volunteerShift2.value = "";
      if (lowBudgetReason) lowBudgetReason.value = "";
    }
  }

  function resetQuizHiddenFields() {
    if (quizScorePercent) quizScorePercent.value = "";
    if (quizCorrectCount) quizCorrectCount.value = "";
    if (quizTotalQuestions) quizTotalQuestions.value = String(psdQuizQuestions.length);
    if (quizPassed) quizPassed.value = "";
  }

  function startQuiz() {
    quizCurrentIndex = 0;
    quizCorrectAnswers = 0;
    quizAnswered = false;
    quizSelectedAnswer = "";

    resetQuizHiddenFields();

    if (quizStartScreen) quizStartScreen.classList.add("is-hidden");
    if (quizResultScreen) quizResultScreen.classList.add("is-hidden");
    if (quizWindow) quizWindow.classList.remove("is-hidden");

    renderQuizQuestion();
  }

  function renderQuizQuestion() {
    const currentQuestion = psdQuizQuestions[quizCurrentIndex];

    quizAnswered = false;
    quizSelectedAnswer = "";

    if (quizProgressText) {
      quizProgressText.textContent = `Question ${quizCurrentIndex + 1} / ${psdQuizQuestions.length}`;
    }

    if (quizProgressBar) {
      quizProgressBar.style.width = `${((quizCurrentIndex + 1) / psdQuizQuestions.length) * 100}%`;
    }

    if (quizQuestion) {
      quizQuestion.textContent = currentQuestion.question;
    }

    if (quizExplanation) {
      quizExplanation.textContent = "";
      quizExplanation.classList.add("is-hidden");
    }

    if (quizNextBtn) {
      quizNextBtn.textContent =
        quizCurrentIndex === psdQuizQuestions.length - 1 ? "Finish Quiz" : "Next Question";
      quizNextBtn.disabled = true;
    }

    if (quizBackBtn) {
      quizBackBtn.classList.toggle("is-hidden", quizCurrentIndex === 0);
    }

    if (!quizAnswers) return;

    quizAnswers.innerHTML = "";

    currentQuestion.answers.forEach((answer) => {
      const label = document.createElement("label");
      label.className = "apply-choice quiz-answer-choice";

      const input = document.createElement("input");
      input.type = "radio";
      input.name = "quiz_answer";
      input.value = answer;

      const span = document.createElement("span");
      span.className = "apply-choice-text";
      span.innerHTML = `<strong>${answer}</strong>`;

      label.appendChild(input);
      label.appendChild(span);

      input.addEventListener("change", function () {
        handleQuizAnswer(answer);
      });

      quizAnswers.appendChild(label);
    });
  }

  function handleQuizAnswer(answer) {
    if (quizAnswered) return;

    const currentQuestion = psdQuizQuestions[quizCurrentIndex];
    quizAnswered = true;
    quizSelectedAnswer = answer;

    const isCorrect = answer === currentQuestion.correctAnswer;

    if (isCorrect) {
      quizCorrectAnswers++;
    }

    document.querySelectorAll(".quiz-answer-choice").forEach((label) => {
      const input = label.querySelector("input");
      const value = input ? input.value : "";

      input.disabled = true;

      if (value === currentQuestion.correctAnswer) {
        label.style.borderColor = "#20a35b";
        label.style.background = "#eefcf3";
      }

      if (value === quizSelectedAnswer && value !== currentQuestion.correctAnswer) {
        label.style.borderColor = "#d43c3c";
        label.style.background = "#fff1f1";
      }
    });

    if (quizExplanation) {
      quizExplanation.innerHTML = currentQuestion.explanation;
      quizExplanation.classList.remove("is-hidden");
    }

    if (quizNextBtn) quizNextBtn.disabled = false;
  }

  function goToPreviousQuizQuestion() {
    if (quizCurrentIndex > 0) {
      quizCurrentIndex--;
      renderQuizQuestion();
    }
  }

  function goToNextQuizQuestion() {
    if (!quizAnswered) {
      alert("Please choose one answer before continuing.");
      return;
    }

    if (quizCurrentIndex < psdQuizQuestions.length - 1) {
      quizCurrentIndex++;
      renderQuizQuestion();
      return;
    }

    finishQuiz();
  }

  function finishQuiz() {
    const total = psdQuizQuestions.length;
    const percent = Math.round((quizCorrectAnswers / total) * 100);
    const passed = percent >= QUIZ_PASS_PERCENT;

    if (quizScorePercent) quizScorePercent.value = String(percent);
    if (quizCorrectCount) quizCorrectCount.value = String(quizCorrectAnswers);
    if (quizTotalQuestions) quizTotalQuestions.value = String(total);
    if (quizPassed) quizPassed.value = passed ? "Yes" : "No";

    if (quizWindow) quizWindow.classList.add("is-hidden");
    if (quizResultScreen) quizResultScreen.classList.remove("is-hidden");

    if (quizScoreText) {
      quizScoreText.innerHTML = `
        You answered <strong>${quizCorrectAnswers} / ${total}</strong> correctly.<br>
        Your score: <strong>${percent}%</strong>.<br>
        ${
          passed
            ? "Great, you passed the quiz and can continue with the application."
            : "Please redo the quiz. You need at least 80% to continue."
        }
      `;
    }

    if (continueAfterQuizBtn) {
      continueAfterQuizBtn.classList.toggle("is-hidden", !passed);
    }
  }

  function validateForm() {
    const requiredFields = {
      name_or_nickname: "Name or Nickname",
      email: "Email",
      age_range: "Age Range",
      about_yourself: "Tell us about yourself",
      why_interested: "Why are you interested",
      gender_identity: "Gender Identity",
      interested_in: "Interested In",
      code_of_conduct: "Code of Conduct acceptance"
    };

    const errors = [];

    for (const [fieldName, fieldLabel] of Object.entries(requiredFields)) {
      const field = form.querySelector(`[name="${fieldName}"]`);

      if (field && field.type === "checkbox" && !field.checked) {
        errors.push(`${fieldLabel} is required`);
      } else if (field && !field.value.trim()) {
        errors.push(`${fieldLabel} is required`);
      }
    }

    const selectedGender = genderPrimary ? genderPrimary.value : "";

    if ((selectedGender === "Man" || selectedGender === "Woman") && !getCheckedValue("genderSecondary")) {
      errors.push("Please select Cis or Trans for your gender identity");
    }

    const interestCheckboxes = form.querySelectorAll(".interest-checkbox:checked");

    if (interestCheckboxes.length === 0) {
      errors.push("Please select at least one interest option");
    }

    if (interestMen && interestMen.checked) {
      const menDetail = form.querySelector('input[name="interestMenDetail"]:checked');
      if (!menDetail) {
        errors.push("Please select Cis Men and/or Trans Men");
      }
    }

    if (interestWomen && interestWomen.checked) {
      const womenDetail = form.querySelector('input[name="interestWomenDetail"]:checked');
      if (!womenDetail) {
        errors.push("Please select Cis Women and/or Trans Women");
      }
    }

    if (!quizPassed || quizPassed.value !== "Yes") {
      errors.push("Please pass the Code of Conduct quiz");
    }

    return errors;
  }

  if (nextBtn) {
    nextBtn.addEventListener("click", function () {
      if (currentStep < totalSteps) {
        currentStep++;
        updateUI();
      }
    });
  }

  if (prevBtn) {
    prevBtn.addEventListener("click", function () {
      if (currentStep > 1) {
        currentStep--;
        updateUI();
      }
    });
  }

  if (genderPrimary) {
    genderPrimary.addEventListener("change", updateGenderField);
  }

  document.querySelectorAll('input[name="genderSecondary"]').forEach((input) => {
    input.addEventListener("change", syncGenderHiddenField);
  });

  document.querySelectorAll(".interest-checkbox").forEach((checkbox) => {
    checkbox.addEventListener("change", function () {
      updateInterestField(this);
    });
  });

  document.querySelectorAll('input[name="interestMenDetail"]').forEach((input) => {
    input.addEventListener("change", function () {
      const checkedCount = getCheckedValues("interestMenDetail").length;
      if (checkedCount === 0) this.checked = true;
      syncInterestHiddenField();
    });
  });

  document.querySelectorAll('input[name="interestWomenDetail"]').forEach((input) => {
    input.addEventListener("change", function () {
      const checkedCount = getCheckedValues("interestWomenDetail").length;
      if (checkedCount === 0) this.checked = true;
      syncInterestHiddenField();
    });
  });

  document.querySelectorAll('input[name="was_referred"]').forEach((input) => {
    input.addEventListener("change", updateReferralField);
  });

  document.querySelectorAll('input[name="application_type"]').forEach((input) => {
    input.addEventListener("change", updateApplicationTypeField);
  });

  if (startQuizBtn) startQuizBtn.addEventListener("click", startQuiz);
  if (quizNextBtn) quizNextBtn.addEventListener("click", goToNextQuizQuestion);
  if (quizBackBtn) quizBackBtn.addEventListener("click", goToPreviousQuizQuestion);
  if (redoQuizBtn) redoQuizBtn.addEventListener("click", startQuiz);

  if (continueAfterQuizBtn) {
    continueAfterQuizBtn.addEventListener("click", function () {
      if (quizResultScreen) quizResultScreen.classList.add("is-hidden");
      if (quizContainer) {
        const statusMsg = document.createElement("div");
        statusMsg.className = "apply-note";
        statusMsg.textContent = "✓ Quiz completed! You can now submit the application.";
        quizContainer.prepend(statusMsg);
      }
    });
  }

  if (form) {
    form.addEventListener("submit", async function (e) {
      e.preventDefault();

      syncGenderHiddenField();
      syncInterestHiddenField();

      const errors = validateForm();

      if (errors.length > 0) {
        alert("Please fill in all required fields:\n\n" + errors.join("\n"));
        return;
      }

      const formData = new FormData(form);

      try {
        const response = await fetch(window.PSD_APPS_SCRIPT_URL, {
          method: "POST",
          body: formData
        });

        if (!response.ok) {
          throw new Error("Request failed with status " + response.status);
        }

        alert("Application sent successfully!");
      } catch (error) {
        console.error("SUBMIT ERROR:", error);
        alert("Submit failed.");
      }
    });
  }

  updateUI();
  updateGenderField();
  updateInterestField();
  updateReferralField();
  updateApplicationTypeField();
  resetQuizHiddenFields();
});