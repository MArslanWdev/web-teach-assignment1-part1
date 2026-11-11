
// Get HTML elements manually using DOM traversal
const signupForm = document.querySelector("#signup-form");
const passwordInput = document.querySelector("#signup-password");
const togglePasswordButton = document.querySelector("#toggle-password");
const formMessage = document.querySelector("#form-message");


// Manually check form validity
function validateForm() {

    const inputs = signupForm.elements;

    for (let i = 0; i < inputs.length; i++) {

        const input = inputs[i];

        // Check required fields
        if (input.required && input.value === "") {
            formMessage.textContent = input.name + " is required.";
            input.focus();
            return false;
        }

        // Check email manually
        if (input.type === "email") {

            let atCount = 0;
            let dotCount = 0;
            let atPosition = -1;
            let dotPosition = -1;
            for (let j = 0; j < input.value.length; j++) {
                if (input.value[j] === "@") {
                    atCount++;
                    atPosition = j;
                }
                if (input.value[j] === ".") {
                    dotCount++;
                    dotPosition = j;
                }
            }

            if (
                atCount !== 1 ||
                dotCount < 1 ||
                atPosition < 1 ||
                dotPosition < atPosition + 2 ||
                dotPosition === input.value.length - 1
            ) {
                formMessage.textContent = "Please enter a valid email.";
                input.focus();
                return false;
            }
        }
        if (
            input.minLength > 0 &&
            input.value.length < input.minLength
        ) {
            formMessage.textContent =
                input.name + " must contain at least " +
                input.minLength + " characters.";

            input.focus();
            return false;
        }
    }

    return true;
}


// Form submission
signupForm.onsubmit = function (event) {

    event.preventDefault();

    formMessage.textContent = "";

    if (validateForm() === false) {
        return;
    }

    formMessage.textContent =
        "Your details are valid. Account creation is not connected yet.";
};


// Password visibility toggle
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
