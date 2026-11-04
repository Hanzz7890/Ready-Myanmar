const preparationQuestions = [
    "How would everyone contact each other if your household became separated?",
    "Who in your household may need help with transport, communication or mobility?",
    "Where would your household meet if you could not return home?",
    "Which supplies should your household check or replace?",
    "Which official information sources can everyone in your household access?"
];

const prepareIdea = document.getElementById("prepareIdea");
const nextIdea = document.getElementById("nextIdea");

let questionNumber = 0;

nextIdea.addEventListener("click", function () {
    questionNumber = questionNumber + 1;

    if (questionNumber >= preparationQuestions.length) {
        questionNumber = 0;
    }

    prepareIdea.textContent = preparationQuestions[questionNumber];
});

const loginModal = document.getElementById("loginModal");
const signupModal = document.getElementById("signupModal");

const loginForm = document.getElementById("loginForm");
const signupForm = document.getElementById("signupForm");

const loginMessage = document.getElementById("loginMessage");
const signupMessage = document.getElementById("signupMessage");

const signupName = document.getElementById("signupName");
const signupPassword = document.getElementById("signupPassword");
const confirmPassword = document.getElementById("confirmPassword");
const loginPassword = document.getElementById("loginPassword");

const showLoginPassword = document.getElementById("showLoginPassword");
const showSignupPassword = document.getElementById("showSignupPassword");

function checkName() {
    if (signupName.value.trim().length < 2) {
        signupName.setCustomValidity(
            "Please enter at least two characters for your name."
        );
    } else {
        signupName.setCustomValidity("");
    }
}

function checkPasswords() {
    if (signupPassword.value !== confirmPassword.value) {
        confirmPassword.setCustomValidity(
            "Your passwords do not match."
        );
    } else {
        confirmPassword.setCustomValidity("");
    }
}

function resetLoginForm() {
    loginForm.reset();

    loginPassword.type = "password";
    loginPassword.setCustomValidity("");
}

function resetSignupForm() {
    signupForm.reset();

    signupPassword.type = "password";
    confirmPassword.type = "password";

    signupName.setCustomValidity("");
    signupPassword.setCustomValidity("");
    confirmPassword.setCustomValidity("");
}

signupName.addEventListener("input", checkName);
signupPassword.addEventListener("input", checkPasswords);
confirmPassword.addEventListener("input", checkPasswords);

loginForm.addEventListener("input", function () {
    loginMessage.textContent = "";
    loginPassword.setCustomValidity("");
});

signupForm.addEventListener("input", function () {
    signupMessage.textContent = "";
    signupPassword.setCustomValidity("");
});

loginForm.addEventListener("submit", function (event) {
    event.preventDefault();

    if (loginPassword.value.length < 8) {
        loginPassword.setCustomValidity(
            "Please use at least 8 characters."
        );
    } else {
        loginPassword.setCustomValidity("");
    }

    if (loginForm.reportValidity()) {
        resetLoginForm();

        loginMessage.textContent =
            "Your entries passed the checks. This demo has not logged you in.";
    }
});

signupForm.addEventListener("submit", function (event) {
    event.preventDefault();

    checkName();
    checkPasswords();

    if (signupPassword.value.length < 8) {
        signupPassword.setCustomValidity(
            "Please use at least 8 characters."
        );
    } else {
        signupPassword.setCustomValidity("");
    }

    if (signupForm.reportValidity()) {
        resetSignupForm();

        signupMessage.textContent =
            "Your entries passed the checks. No account was created or saved.";
    }
});

showLoginPassword.addEventListener("change", function () {
    if (showLoginPassword.checked) {
        loginPassword.type = "text";
    } else {
        loginPassword.type = "password";
    }
});

showSignupPassword.addEventListener("change", function () {
    if (showSignupPassword.checked) {
        signupPassword.type = "text";
        confirmPassword.type = "text";
    } else {
        signupPassword.type = "password";
        confirmPassword.type = "password";
    }
});

loginModal.addEventListener("hidden.bs.modal", function () {
    resetLoginForm();
    loginMessage.textContent = "";
});

signupModal.addEventListener("hidden.bs.modal", function () {
    resetSignupForm();
    signupMessage.textContent = "";
});