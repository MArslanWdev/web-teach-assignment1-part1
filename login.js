// Get the login form elements
const loginForm = document.querySelector("#login-form");
const emailInput = document.querySelector("#email");
const passwordInput = document.querySelector("#password");
const togglePasswordButton = document.querySelector("#toggle-password");
const formMessage = document.querySelector("#form-message");
function validateForm() {
  const inputs = loginForm.elements;

  for (let i = 0; i < inputs.length; i++) {
    const input = inputs[i];
    const value = input.value.trim();

    if (input.required && value === "") {
      formMessage.textContent = input.name + " is required.";
      input.focus();
      return false;
    }

    if (input.type === "email") {
      let atCount = 0;
      let dotCount = 0;
      let atPosition = -1;
      let dotPosition = -1;

      for (let j = 0; j < value.length; j++) {
        if (value[j] === "@") {
          atCount++;
          atPosition = j;
        }

        if (value[j] === ".") {
          dotCount++;
          dotPosition = j;
        }
      }

      if (
        atCount !== 1 ||
        dotCount < 1 ||
        atPosition < 1 ||
        dotPosition < atPosition + 2 ||
        dotPosition === value.length - 1
      ) {
        formMessage.textContent = "Please enter a valid email.";
        input.focus();
        return false;
      }
    }
  }

  return true;
}
loginForm.onsubmit = function (event) {
  event.preventDefault();
  formMessage.textContent = "";

  if (validateForm() === false) {
    return;
  }

  formMessage.textContent =
    "Your details are valid. Login is not connected yet.";
};

togglePasswordButton.onclick = function () {
  let passwordIsHidden = false;

  if (passwordInput.type === "password") {
    passwordIsHidden = true;
  }

  if (passwordIsHidden === true) {
    passwordInput.type = "text";
    togglePasswordButton.textContent = "Hide";
    togglePasswordButton.setAttribute("aria-label", "Hide password");
    togglePasswordButton.setAttribute("aria-pressed", "true");
  } else {
    passwordInput.type = "password";
    togglePasswordButton.textContent = "Show";
    togglePasswordButton.setAttribute("aria-label", "Show password");
    togglePasswordButton.setAttribute("aria-pressed", "false");
  }
};
