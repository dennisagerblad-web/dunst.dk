const pispisSessionKey = "dunst-pispis-login";

function hasPispisLogin() {
  return sessionStorage.getItem(pispisSessionKey) === "yes";
}

function createPispisLogin(onLogin) {
  const form = document.createElement("form");
  form.className = "activist-entry";
  const field = document.createElement("input");
  field.type = "password";
  field.placeholder = "pispis";
  field.required = true;
  field.autocomplete = "off";
  field.setAttribute("aria-label", "Adgangskode til pispis");
  const submit = document.createElement("button");
  submit.type = "submit";
  submit.textContent = "Login";
  form.append(field, submit);

  field.addEventListener("input", () => field.setCustomValidity(""));
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    if (field.value !== "pispis") {
      field.setCustomValidity("Forkert adgangskode. Prøv igen.");
      field.reportValidity();
      return;
    }
    form.reset();
    sessionStorage.setItem(pispisSessionKey, "yes");
    onLogin();
  });
  return form;
}
