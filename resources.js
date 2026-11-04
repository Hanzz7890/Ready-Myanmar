const resourceInformation = [
    {
        title: "The Science of Earthquakes",
        provider: "U.S. Geological Survey",
        description: "Learn about faults, seismic waves and how earthquakes happen.",
        category: "science",
        icon: "bi-activity",
        type: "Webpage",
        url: "https://www.usgs.gov/programs/earthquake-hazards/science-earthquakes"
    },
    {
        title: "What is a landslide?",
        provider: "U.S. Geological Survey",
        description: "An introduction to landslides and the factors that can cause them.",
        category: "science",
        icon: "bi-triangle",
        type: "Webpage",
        url: "https://www.usgs.gov/faqs/what-a-landslide-and-what-causes-one"
    },
    {
        title: "Sinkholes",
        provider: "U.S. Geological Survey",
        description: "Explore how underground processes can create depressions in the ground.",
        category: "science",
        icon: "bi-layers",
        type: "Webpage",
        url: "https://www.usgs.gov/water-science-school/science/sinkholes"
    },
    {
        title: "Safety During an Earthquake",
        provider: "CDC",
        description: "Guidance for different situations during earthquake shaking.",
        category: "safety",
        icon: "bi-shield-check",
        type: "Webpage",
        url: "https://www.cdc.gov/earthquakes/safety/stay-safe-during-an-earthquake.html"
    },
    {
        title: "Preparing for Floods",
        provider: "CDC",
        description: "Household planning, supplies and flood preparation information.",
        category: "safety",
        icon: "bi-cloud-rain-heavy",
        type: "Webpage",
        url: "https://www.cdc.gov/floods/safety/index.html"
    },
    {
        title: "During a Tsunami",
        provider: "NOAA National Weather Service",
        description: "Learn how to respond to official and natural tsunami warnings.",
        category: "safety",
        icon: "bi-water",
        type: "Webpage",
        url: "https://www.weather.gov/safety/tsunami-during"
    },
    {
        title: "Landslide Preparedness",
        provider: "New Zealand Civil Defence",
        description: "Information about preparing for, responding to and recovering from landslides.",
        category: "safety",
        icon: "bi-triangle",
        type: "Webpage",
        url: "https://getready.govt.nz/emergency/landslides"
    },
    {
        title: "Myanmar Maps and Regional Information",
        provider: "MIMU",
        description: "Explore maps, regional pages and information collections about Myanmar.",
        category: "maps",
        icon: "bi-map",
        type: "Website",
        url: "https://themimu.info/"
    },
    {
        title: "Emergency Supply Checklist",
        provider: "Ready.gov",
        description: "A printable checklist of supplies to consider for household preparation.",
        category: "planning",
        icon: "bi-file-earmark-pdf",
        type: "PDF",
        url: "https://www.ready.gov/sites/default/files/2022-04/ready_checklist.pdf"
    }
];

const resourceSearch = document.getElementById("resourceSearch");
const resourceCategory = document.getElementById("resourceCategory");
const resourceList = document.getElementById("resourceList");
const resourceCount = document.getElementById("resourceCount");
const resourceEmpty = document.getElementById("resourceEmpty");
const resetResources = document.getElementById("resetResources");

function showResources() {
    const searchText = resourceSearch.value.trim().toLowerCase();
    let visibleCount = 0;

    resourceList.replaceChildren();

    for (let i = 0; i < resourceInformation.length; i++) {
        const resource = resourceInformation[i];

        const searchableText = (
            resource.title + " " +
            resource.provider + " " +
            resource.description + " " +
            resource.type
        ).toLowerCase();

        const matchesSearch = searchableText.includes(searchText);

        const matchesCategory =
            resourceCategory.value === "all" ||
            resourceCategory.value === resource.category;

        if (matchesSearch && matchesCategory) {
            visibleCount = visibleCount + 1;

            const article = document.createElement("article");
            const iconBox = document.createElement("div");
            const icon = document.createElement("i");
            const content = document.createElement("div");
            const provider = document.createElement("span");
            const heading = document.createElement("h3");
            const description = document.createElement("p");
            const link = document.createElement("a");
            const arrow = document.createElement("i");
            const type = document.createElement("span");

            article.className = "resource-row";
            iconBox.className = "icon-box";
            content.className = "resource-content";

            icon.className = "bi " + resource.icon;
            icon.setAttribute("aria-hidden", "true");

            provider.className = "resource-provider";
            provider.textContent = resource.provider;

            heading.textContent = resource.title;
            description.textContent = resource.description;

            link.className = "text-link";
            link.href = resource.url;
            link.textContent = "Open resource";
            link.setAttribute("aria-label", "Open " + resource.title);

            arrow.className = "bi bi-arrow-up-right";
            arrow.setAttribute("aria-hidden", "true");

            type.className = "resource-type";
            type.textContent = resource.type;

            link.appendChild(arrow);
            iconBox.appendChild(icon);

            content.appendChild(provider);
            content.appendChild(heading);
            content.appendChild(description);
            content.appendChild(link);
            content.appendChild(type);

            article.appendChild(iconBox);
            article.appendChild(content);

            resourceList.appendChild(article);
        }
    }

    if (visibleCount === 1) {
        resourceCount.textContent = "1 resource found";
    } else {
        resourceCount.textContent = visibleCount + " resources found";
    }

    resourceEmpty.hidden = visibleCount !== 0;
    resourceList.hidden = visibleCount === 0;
}

resourceSearch.addEventListener("input", showResources);
resourceCategory.addEventListener("change", showResources);

resetResources.addEventListener("click", function () {
    resourceSearch.value = "";
    resourceCategory.value = "all";

    showResources();
    resourceSearch.focus();
});

showResources();

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