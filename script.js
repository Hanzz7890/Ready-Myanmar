const slides = document.querySelectorAll(".slide");
const slideCount = document.getElementById("slide-count");
const nextButton = document.getElementById("next-slide");
const previousButton = document.getElementById("previous-slide");

let currentSlide = 0;

function showSlide() {
    for (let i = 0; i < slides.length; i++) {
        slides[i].hidden = true;
    }

    slides[currentSlide].hidden = false;
    slideCount.textContent = (currentSlide + 1) + " / " + slides.length;
}

if (slides.length > 0 && slideCount && nextButton && previousButton) {
    showSlide();

    nextButton.addEventListener("click", function () {
        currentSlide = currentSlide + 1;

        if (currentSlide >= slides.length) {
            currentSlide = 0;
        }

        showSlide();
    });

    previousButton.addEventListener("click", function () {
        currentSlide = currentSlide - 1;

        if (currentSlide < 0) {
            currentSlide = slides.length - 1;
        }

        showSlide();
    });
}

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