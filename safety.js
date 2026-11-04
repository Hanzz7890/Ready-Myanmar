const safetyGuides = {
    earthquakes: {
        name: "Earthquakes",
        before: [
            "Secure tall furniture and place heavy objects on lower shelves.",
            "Practise dropping, covering your head and neck, and holding on.",
            "Discuss household communication and any assistance people may need."
        ],
        during: [
            "Indoors, stay inside. Drop to your hands and knees, take cover under a sturdy table if nearby, and hold on until shaking stops.",
            "If no shelter is nearby, protect your head and neck with your arms. Keep away from windows.",
            "Outdoors, stay outside and move to an open area away from buildings, trees and power lines."
        ],
        after: [
            "Expect aftershocks and protect yourself again if shaking starts.",
            "Stay away from damaged buildings and fallen power lines.",
            "Near the coast, respond immediately to tsunami warnings or natural signs once you can move safely."
        ],
        support: "If you cannot drop, stay seated and protect your head and neck. If using a wheelchair, lock its wheels.",
        avoid: "Do not run outside during shaking or use lifts. A doorway does not provide reliable protection from falling objects.",
        sources: [
            ["CDC — During an earthquake", "https://www.cdc.gov/earthquakes/safety/stay-safe-during-an-earthquake.html"],
            ["CDC — After an earthquake", "https://www.cdc.gov/earthquakes/safety/stay-safe-after-an-earthquake.html"]
        ]
    },
    landslides: {
        name: "Landslides",
        before: [
            "Learn whether nearby slopes have a history of landslides.",
            "Discuss evacuation options and arrange support for people who may need help.",
            "Seek professional advice about new ground cracks, leaning structures or unusual slope movement."
        ],
        during: [
            "Move out of the landslide path immediately if you can do so safely.",
            "Keep away from moving debris and unstable slopes.",
            "Alert nearby people and emergency services from a safe location."
        ],
        after: [
            "Stay away until the area has been assessed and authorities allow access.",
            "Remain alert for further ground movement.",
            "Report damaged utilities. Leave clearing unstable debris to trained workers."
        ],
        support: "Plan transport and assistance early. Help others only when you can do so without entering the landslide path.",
        avoid: "Do not approach moving debris to photograph it or try to clear unstable debris yourself.",
        sources: [
            ["NZ Civil Defence — Landslides", "https://getready.govt.nz/emergency/landslides"]
        ]
    },
    subsidence: {
        name: "Subsidence & Sinkholes",
        before: [
            "Seek qualified advice about unexplained ground depressions or new building cracks.",
            "Report suspected leaking water pipes or drains to the responsible service.",
            "Discuss how your household would leave an unsafe area."
        ],
        during: [
            "Move away from a new hole, collapsing ground or affected structure.",
            "Keep people and pets away without approaching the edge.",
            "Contact local emergency services if people or buildings are threatened."
        ],
        after: [
            "Wait for qualified specialists to assess the ground.",
            "Report damaged utility lines to the relevant provider.",
            "Follow professional advice before returning or attempting repairs."
        ],
        support: "Arrange help for people who need assistance leaving the area. Keep everyone away from unstable ground.",
        avoid: "Do not enter a sinkhole, stand at its edge or attempt to fill it yourself.",
        sources: [
            ["British Geological Survey — Sinkholes", "https://www.bgs.ac.uk/geology-projects/sinkholes-research/"]
        ]
    },
    tsunamis: {
        name: "Tsunamis",
        before: [
            "Learn local coastal evacuation routes and safe destinations.",
            "Practise reaching higher ground or inland areas with your household.",
            "Recognise natural signs: strong or long shaking, unusual sea-level changes, or a loud ocean roar."
        ],
        during: [
            "During earthquake shaking, protect yourself first. Once safe to move, leave the coastal hazard area.",
            "If you notice natural tsunami signs, move immediately to higher ground or inland. Do not wait for an official warning.",
            "Follow local evacuation directions and stay away from the shore."
        ],
        after: [
            "Remain outside the hazard area until officials say it is safe to return.",
            "Remember that more waves may arrive and the first may not be the largest.",
            "Avoid damaged buildings, flooded areas and broken utility lines."
        ],
        support: "Arrange accessible routes and assistance in advance. Practise with people who may need support.",
        avoid: "Do not go to the beach to watch waves or return because the water appears calm.",
        sources: [
            ["NOAA — During a tsunami", "https://www.weather.gov/safety/tsunami-during"],
            ["NOAA — After a tsunami", "https://www.weather.gov/safety/tsunami-after"]
        ]
    },
    flooding: {
        name: "Flooding",
        before: [
            "Learn local evacuation routes and warning signals.",
            "Prepare essential supplies and protect important documents from water.",
            "Plan transport, communication and support for everyone in the household."
        ],
        during: [
            "Follow evacuation instructions and use designated routes.",
            "Do not walk or drive through floodwater or across flooded roads.",
            "Keep away from fallen power lines and follow official updates."
        ],
        after: [
            "Follow local instructions about returning home.",
            "Follow official advice about safe drinking water and food.",
            "Keep children away from contaminated floodwater and damaged areas."
        ],
        support: "Arrange transport and assistance early. Include medicines and accessibility needs in your plan.",
        avoid: "Do not cross flooded roads or touch electrical equipment while standing in water.",
        sources: [
            ["CDC — Preparing for floods", "https://www.cdc.gov/floods/safety/index.html"]
        ]
    }
};

let selectedHazard = "earthquakes";
let selectedPhase = "before";

const hazardButtons = document.querySelectorAll(".hazard-button");
const phaseButtons = document.querySelectorAll(".phase-button");

function addActions(list, actions) {
    list.replaceChildren();

    for (let i = 0; i < actions.length; i++) {
        const item = document.createElement("li");
        item.textContent = actions[i];
        list.appendChild(item);
    }
}

function showGuide() {
    const guide = safetyGuides[selectedHazard];

    document.getElementById("guideLabel").textContent =
        guide.name.toUpperCase() + " SAFETY GUIDE";

    document.getElementById("guideTitle").textContent =
        selectedPhase.charAt(0).toUpperCase() +
        selectedPhase.slice(1) + ": " + guide.name;

    addActions(document.getElementById("guideActions"), guide[selectedPhase]);

    document.getElementById("guideSupport").textContent = guide.support;
    document.getElementById("guideAvoid").textContent = guide.avoid;

    const sources = document.getElementById("guideSources");
    sources.replaceChildren();

    for (let i = 0; i < guide.sources.length; i++) {
        const item = document.createElement("li");
        const link = document.createElement("a");

        link.textContent = guide.sources[i][0];
        link.href = guide.sources[i][1];

        item.appendChild(link);
        sources.appendChild(item);
    }

    for (let i = 0; i < hazardButtons.length; i++) {
        const active = hazardButtons[i].dataset.hazard === selectedHazard;
        hazardButtons[i].classList.toggle("active", active);
        hazardButtons[i].setAttribute("aria-pressed", String(active));
    }

    for (let i = 0; i < phaseButtons.length; i++) {
        const active = phaseButtons[i].dataset.phase === selectedPhase;
        phaseButtons[i].classList.toggle("active", active);
        phaseButtons[i].setAttribute("aria-pressed", String(active));
    }

    const printContent = document.getElementById("printGuideContent");
    const phases = ["before", "during", "after"];

    printContent.replaceChildren();

    for (let i = 0; i < phases.length; i++) {
        const phase = phases[i];
        const heading = document.createElement("h3");
        const list = document.createElement("ol");

        heading.textContent = phase.charAt(0).toUpperCase() + phase.slice(1);
        addActions(list, guide[phase]);

        printContent.appendChild(heading);
        printContent.appendChild(list);
    }
}

function readGuideHash() {
    const key = window.location.hash.substring(1);

    if (Object.prototype.hasOwnProperty.call(safetyGuides, key)) {
        selectedHazard = key;
    }

    selectedPhase = "before";
    showGuide();
}

for (let i = 0; i < hazardButtons.length; i++) {
    hazardButtons[i].addEventListener("click", function () {
        selectedHazard = hazardButtons[i].dataset.hazard;
        selectedPhase = "before";
        window.location.hash = selectedHazard;
        showGuide();
    });
}

for (let i = 0; i < phaseButtons.length; i++) {
    phaseButtons[i].addEventListener("click", function () {
        selectedPhase = phaseButtons[i].dataset.phase;
        showGuide();
    });
}

document.getElementById("printGuide").addEventListener("click", function () {
    window.print();
});

window.addEventListener("hashchange", readGuideHash);
readGuideHash();

const loginForm = document.getElementById("loginForm");
const signupForm = document.getElementById("signupForm");
const loginPassword = document.getElementById("loginPassword");
const signupPassword = document.getElementById("signupPassword");
const confirmPassword = document.getElementById("confirmPassword");
const signupName = document.getElementById("signupName");
const loginMessage = document.getElementById("loginMessage");
const signupMessage = document.getElementById("signupMessage");
const showLoginPassword = document.getElementById("showLoginPassword");
const showSignupPassword = document.getElementById("showSignupPassword");

function checkSignup() {
    signupName.setCustomValidity(
        signupName.value.trim().length < 2 ?
        "Please enter at least two characters for your name." : ""
    );

    signupPassword.setCustomValidity(
        signupPassword.value.length < 8 ?
        "Please use at least 8 characters." : ""
    );

    confirmPassword.setCustomValidity(
        signupPassword.value !== confirmPassword.value ?
        "Your passwords do not match." : ""
    );
}

function resetLogin() {
    loginForm.reset();
    loginPassword.type = "password";
    loginPassword.setCustomValidity("");
}

function resetSignup() {
    signupForm.reset();
    signupPassword.type = "password";
    confirmPassword.type = "password";
    signupName.setCustomValidity("");
    signupPassword.setCustomValidity("");
    confirmPassword.setCustomValidity("");
}

loginForm.addEventListener("input", function () {
    loginPassword.setCustomValidity("");
    loginMessage.textContent = "";
});

signupForm.addEventListener("input", function () {
    checkSignup();
    signupMessage.textContent = "";
});

loginForm.addEventListener("submit", function (event) {
    event.preventDefault();

    loginPassword.setCustomValidity(
        loginPassword.value.length < 8 ?
        "Please use at least 8 characters." : ""
    );

    if (loginForm.reportValidity()) {
        resetLogin();
        loginMessage.textContent =
            "Your entries passed the checks. This demo has not logged you in.";
    }
});

signupForm.addEventListener("submit", function (event) {
    event.preventDefault();
    checkSignup();

    if (signupForm.reportValidity()) {
        resetSignup();
        signupMessage.textContent =
            "Your entries passed the checks. No account was created or saved.";
    }
});

showLoginPassword.addEventListener("change", function () {
    loginPassword.type = showLoginPassword.checked ? "text" : "password";
});

showSignupPassword.addEventListener("change", function () {
    const type = showSignupPassword.checked ? "text" : "password";
    signupPassword.type = type;
    confirmPassword.type = type;
});

document.getElementById("loginModal").addEventListener("hidden.bs.modal", function () {
    resetLogin();
    loginMessage.textContent = "";
});

document.getElementById("signupModal").addEventListener("hidden.bs.modal", function () {
    resetSignup();
    signupMessage.textContent = "";
});