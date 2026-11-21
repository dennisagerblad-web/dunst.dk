function createPispisLogin(openArchive) {
  const word = "pispis";
  const form = document.createElement("form");
  form.className = "activist-entry";

  const fieldWrap = document.createElement("div");
  fieldWrap.className = "pispis-field";
  const field = document.createElement("input");
  field.type = "text";
  field.maxLength = word.length;
  field.autocomplete = "off";
  field.autocapitalize = "none";
  field.spellcheck = false;
  field.setAttribute("aria-label", "Adgangskode til pispis");
  field.setAttribute("aria-describedby", "pispis-field-instructions");

  const hint = document.createElement("span");
  hint.className = "pispis-hint";
  hint.setAttribute("aria-hidden", "true");
  const typed = document.createElement("span");
  typed.className = "pispis-hint-typed";
  const remaining = document.createElement("span");
  remaining.textContent = word;
  hint.append(typed, remaining);
  fieldWrap.append(field, hint);

  const instructions = document.createElement("span");
  instructions.id = "pispis-field-instructions";
  instructions.className = "visually-hidden";
  instructions.textContent = "Skriv pispis og tryk på Login.";
  const status = document.createElement("span");
  status.className = "visually-hidden";
  status.setAttribute("role", "status");

  const submit = document.createElement("button");
  submit.type = "submit";
  submit.textContent = "Login";
  form.append(fieldWrap, submit, instructions, status);

  let errorFlash;
  let submitFlash;
  function showError() {
    field.setAttribute("aria-invalid", "true");
    status.textContent = "Forkert adgangskode. Prøv igen.";
    errorFlash?.cancel();
    errorFlash = field.animate(
      [{ backgroundColor: "#ff3838" }, { backgroundColor: "#fff" }],
      { duration: 380, easing: "ease-out" },
    );
  }

  field.addEventListener("input", () => {
    const validPrefix = word.startsWith(field.value);
    typed.textContent = validPrefix ? field.value : "";
    remaining.textContent = validPrefix ? word.slice(field.value.length) : "";
    if (validPrefix) {
      errorFlash?.cancel();
      field.removeAttribute("aria-invalid");
      status.textContent = "";
    } else showError();
  });

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    if (field.value !== word) {
      showError();
      submitFlash?.cancel();
      submitFlash = form.animate(
        [{ backgroundColor: "#ff3838" }, { backgroundColor: "#fff" }],
        { duration: 1100, easing: "ease-out" },
      );
      field.focus();
      return;
    }
    form.reset();
    typed.textContent = "";
    remaining.textContent = word;
    openArchive();
  });
  return form;
}
