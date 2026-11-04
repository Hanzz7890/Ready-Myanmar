const regionInformation = {
    yangon: {
        name: "Yangon",
        mapId: "MM06",
        introduction: "Yangon is a coastal region in southern Myanmar, with urban areas, waterways and low-lying land.",
        hazards: [
            ["Flooding", "flooding", "bi-cloud-rain-heavy"]
        ],
        example: "The IFRC report on Myanmar's 2023 floods describes affected communities in Taik Kyi, Hlegu and Hmawbi townships.",
        source: "https://www.themimu.info/sites/themimu.info/files/documents/Report_DREF_Final_Report_-_Myanmar_Flood_2023_IFRC.pdf"
    },

    bago: {
        name: "Bago",
        mapId: "MM02",
        introduction: "Bago lies north of Yangon. Local conditions differ between river plains, towns and hill areas.",
        hazards: [
            ["Flooding", "flooding", "bi-cloud-rain-heavy"],
            ["Earthquakes", "earthquakes", "bi-activity"]
        ],
        example: "MIMU's regional profile records impacts from the 2024 floods and the March 2025 earthquake.",
        source: "https://www.themimu.info/states_regions/bago"
    },

    ayeyarwady: {
        name: "Ayeyarwady",
        mapId: "MM07",
        introduction: "Ayeyarwady includes the delta region, river channels, agricultural land and low-lying coastal areas.",
        hazards: [
            ["Flooding", "flooding", "bi-cloud-rain-heavy"]
        ],
        example: "MIMU describes exposure to flooding and storm surges. The region was severely affected by Cyclone Nargis in 2008.",
        source: "https://www.themimu.info/states_regions/ayeyarwady"
    },

    mon: {
        name: "Mon",
        mapId: "MM15",
        introduction: "Mon State is in southeastern Myanmar and has a coastline along the Andaman Sea.",
        hazards: [
            ["Flooding", "flooding", "bi-cloud-rain-heavy"],
            ["Earthquakes", "earthquakes", "bi-activity"]
        ],
        example: "MIMU's profile reports impacts from Typhoon Yagi-related flooding in 2024 and the March 2025 earthquake.",
        source: "https://www.themimu.info/states_regions/mon"
    },

    tanintharyi: {
        name: "Tanintharyi",
        mapId: "MM05",
        introduction: "Tanintharyi is in southern Myanmar. This project includes examples from its flood-affected and landslide-affected communities.",
        hazards: [
            ["Flooding", "flooding", "bi-cloud-rain-heavy"],
            ["Landslides", "landslides", "bi-triangle"]
        ],
        example: "MIMU's 2026 flood collection includes maps of flood-affected villages and landslide areas in the region.",
        source: "https://themimu.info/emergencies/floods-2026"
    }
};

const regionSelect = document.getElementById("regionSelect");
const regionName = document.getElementById("regionName");
const regionIntroduction = document.getElementById("regionIntroduction");
const regionExample = document.getElementById("regionExample");
const regionSource = document.getElementById("regionSource");
const regionHazards = document.getElementById("regionHazards");

const mapObject = document.getElementById("myanmarMap");
const mapStatus = document.getElementById("mapStatus");

let mapDocument = null;

function showRegion() {
    const region = regionInformation[regionSelect.value];

    regionName.textContent = region.name;
    regionIntroduction.textContent = region.introduction;
    regionExample.textContent = region.example;
    regionSource.href = region.source;

    regionSource.setAttribute(
        "aria-label",
        "Read the source for " + region.name
    );

    regionHazards.replaceChildren();

    for (let i = 0; i < region.hazards.length; i++) {
        const link = document.createElement("a");
        const icon = document.createElement("i");
        const label = document.createElement("span");

        link.href = "UnderstandTR.html#" + region.hazards[i][1];

        icon.className = "bi " + region.hazards[i][2];
        icon.setAttribute("aria-hidden", "true");

        label.textContent = region.hazards[i][0];

        link.appendChild(icon);
        link.appendChild(label);
        regionHazards.appendChild(link);
    }

    if (mapDocument) {
        const keys = Object.keys(regionInformation);

        for (let i = 0; i < keys.length; i++) {
            const key = keys[i];
            const shape = mapDocument.getElementById(
                regionInformation[key].mapId
            );

            if (shape) {
                const active = key === regionSelect.value;

                shape.classList.toggle("selected-region", active);
                shape.setAttribute("aria-pressed", String(active));
            }
        }
    }
}

function selectRegion(key) {
    regionSelect.value = key;
    showRegion();

    if (window.location.hash !== "#" + key) {
        window.location.hash = key;
    }
}

function readRegionHash() {
    const key = window.location.hash.substring(1);

    if (Object.prototype.hasOwnProperty.call(regionInformation, key)) {
        regionSelect.value = key;
    }

    showRegion();
}

function setupMap() {
    try {
        const documentInsideMap = mapObject.contentDocument;

        if (!documentInsideMap) {
            mapStatus.textContent =
                "Use Live Server for the interactive map. The region selector still works.";
            return;
        }

        const svg = documentInsideMap.querySelector("svg");

        if (!svg) {
            mapStatus.textContent =
                "The SVG map could not be read. Use the region selector.";
            return;
        }

        if (mapDocument === documentInsideMap) {
            return;
        }

        mapDocument = documentInsideMap;

        const lowerCaseViewBox = svg.getAttribute("viewbox");

        if (!svg.getAttribute("viewBox") && lowerCaseViewBox) {
            svg.setAttribute("viewBox", lowerCaseViewBox);
        }

        if (!svg.getAttribute("viewBox")) {
            const width = parseFloat(svg.getAttribute("width"));
            const height = parseFloat(svg.getAttribute("height"));

            if (width > 0 && height > 0) {
                svg.setAttribute("viewBox", "0 0 " + width + " " + height);
            }
        }

        svg.setAttribute("width", "100%");
        svg.setAttribute("height", "100%");
        svg.setAttribute("preserveAspectRatio", "xMidYMid meet");

        const mapStyle = mapDocument.createElementNS(
            "http://www.w3.org/2000/svg",
            "style"
        );

        mapStyle.textContent = `
            path {
                fill: #D8E3E8 !important;
                stroke: #FFFFFF !important;
                stroke-width: 1;
            }

            .project-region,
            .project-region path {
                fill: #087F86 !important;
                cursor: pointer;
            }

            .project-region:hover,
            .project-region:hover path,
            .project-region:focus,
            .project-region:focus path,
            .selected-region,
            .selected-region path {
                fill: #20354B !important;
            }

            .project-region:focus {
                outline: 3px solid #B7791F;
            }
        `;

        svg.appendChild(mapStyle);

        const keys = Object.keys(regionInformation);
        let matchedRegions = 0;

        for (let i = 0; i < keys.length; i++) {
            const key = keys[i];
            const region = regionInformation[key];
            const shape = mapDocument.getElementById(region.mapId);

            if (shape) {
                matchedRegions = matchedRegions + 1;

                shape.classList.add("project-region");
                shape.setAttribute("tabindex", "0");
                shape.setAttribute("role", "button");
                shape.setAttribute("aria-label", "Explore " + region.name);

                shape.addEventListener("click", function (event) {
                    event.preventDefault();
                    selectRegion(key);
                });

                shape.addEventListener("keydown", function (event) {
                    if (event.key === "Enter" || event.key === " ") {
                        event.preventDefault();
                        selectRegion(key);
                    }
                });
            }
        }

        if (matchedRegions === keys.length) {
            mapStatus.textContent =
                "Select a teal region, or use Tab and Enter on the map.";
        } else {
            mapStatus.textContent =
                "Some SVG region IDs do not match. Use the dropdown to explore all five regions.";
        }

        showRegion();
    } catch (error) {
        mapStatus.textContent =
            "Use Live Server for the interactive SVG. The region selector still works.";
    }
}

regionSelect.addEventListener("change", function () {
    selectRegion(regionSelect.value);
});

mapObject.addEventListener("load", setupMap);

mapObject.addEventListener("error", function () {
    mapStatus.textContent =
        "Map unavailable. Check myanmar-regions.svg or use the region selector.";
});

window.addEventListener("hashchange", readRegionHash);
window.addEventListener("load", setupMap);

readRegionHash();

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