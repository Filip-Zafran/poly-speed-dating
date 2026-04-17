document.addEventListener("DOMContentLoaded", function () {
  let currentStep = 1;
  const totalSteps = 3;

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
    }

    if (interestWomen && !interestWomen.checked) {
      clearRadioGroup("interestWomenDetail");
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
        selected.push(getCheckedValue("interestMenDetail") || "Men");
        return;
      }

      if (cb.id === "interestWomen") {
        selected.push(getCheckedValue("interestWomenDetail") || "Women");
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
    input.addEventListener("change", syncInterestHiddenField);
  });

  document.querySelectorAll('input[name="interestWomenDetail"]').forEach((input) => {
    input.addEventListener("change", syncInterestHiddenField);
  });

  document.querySelectorAll('input[name="was_referred"]').forEach((input) => {
    input.addEventListener("change", updateReferralField);
  });

  document.querySelectorAll('input[name="application_type"]').forEach((input) => {
    input.addEventListener("change", updateApplicationTypeField);
  });

  updateUI();
  updateGenderField();
  updateInterestField();
  updateReferralField();
  updateApplicationTypeField();
});

const form = document.getElementById("psdApplyForm");

if (form) {
  form.addEventListener("submit", async function (e) {
    e.preventDefault();

    console.log("FORM SUBMIT STARTED");

    const formData = new FormData(form);

    // make sure hidden fields are up to date
    if (typeof syncGenderHiddenField === "function") {
      syncGenderHiddenField();
    }

    if (typeof syncInterestHiddenField === "function") {
      syncInterestHiddenField();
    }

    try {
      const response = await fetch(window.PSD_APPS_SCRIPT_URL, {
        method: "POST",
        body: formData
      });

      console.log("SUBMIT RESPONSE", response);

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