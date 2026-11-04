const hazardInformation = {
    earthquakes: {
        title: "Earthquakes",
        category: "GEOLOGICAL HAZARD",
        introduction: "Understand ground shaking and why its effects vary.",
        definition: "An earthquake happens when energy is suddenly released inside the Earth. This energy travels as seismic waves and shakes the ground.",
        process: "Movement along a fault can be held back by friction. When the rocks suddenly slip, stored energy is released.",
        steps: [
            "Stress builds along a fault",
            "Rocks suddenly slip",
            "Seismic waves shake the ground"
        ],
        factors: "The earthquake's size, distance from the rupture, local ground conditions and building construction influence its effects.",
        effects: "Shaking can damage buildings, roads and water pipes. It can also trigger landslides or cause some water-saturated sediments to lose strength.",
        note: "Scientists cannot reliably predict the exact time, location and magnitude of a future earthquake.",
        sourceName: "USGS — The Science of Earthquakes",
        sourceUrl: "https://www.usgs.gov/programs/earthquake-hazards/science-earthquakes"
    },

    landslides: {
        title: "Landslides",
        category: "GEOLOGICAL HAZARD",
        introduction: "Explore how soil, rock and debris move down slopes.",
        definition: "A landslide is the movement of rock, soil or debris down a slope under gravity. Some move slowly, while others move quickly.",
        process: "A slope can become unstable when the forces pulling material downhill become greater than the forces holding it in place.",
        steps: [
            "A slope becomes less stable",
            "Material starts to move",
            "Soil or rock travels downhill"
        ],
        factors: "Rainfall, earthquake shaking, erosion, slope steepness and changes caused by construction can influence slope stability.",
        effects: "Landslides can damage homes, block roads and bury land. Some block rivers, creating additional flooding hazards.",
        note: "Landslides have different causes and speeds. A simple map or photograph cannot show whether a particular slope is stable.",
        sourceName: "USGS — What is a landslide and what causes one?",
        sourceUrl: "https://www.usgs.gov/faqs/what-a-landslide-and-what-causes-one"
    },

    subsidence: {
        title: "Ground Subsidence & Sinkholes",
        category: "GEOLOGICAL HAZARD",
        introduction: "Learn why the ground may settle, sink or collapse.",
        definition: "Subsidence is the lowering of the ground surface. A sinkhole is a depression or opening that can form when material beneath the surface dissolves or moves away.",
        process: "One way a sinkhole forms is when water dissolves underground rock. The ground above may gradually settle or collapse into the space.",
        steps: [
            "Underground support changes",
            "The surface loses support",
            "Ground settles or collapses"
        ],
        factors: "Rock type, underground water, soil conditions, groundwater removal and changes to drainage can influence ground movement.",
        effects: "Ground movement can damage building foundations, roads and buried pipes. The effects may develop gradually or appear suddenly.",
        note: "Subsidence and sinkholes are related, but they are not identical. Not all subsidence creates an open hole.",
        sourceName: "USGS — Sinkholes",
        sourceUrl: "https://www.usgs.gov/water-science-school/science/sinkholes"
    },

    tsunamis: {
        title: "Tsunamis",
        category: "COASTAL HAZARD",
        introduction: "Understand waves caused by sudden displacement of water.",
        definition: "A tsunami is a series of waves produced by a large, sudden displacement of water. Many are caused by earthquakes beneath the ocean.",
        process: "When the seabed suddenly moves, it can displace the water above it. Waves spread across the ocean and may grow higher near shore.",
        steps: [
            "A large volume of water moves",
            "Waves spread across the ocean",
            "Waves reach shallow coastal water"
        ],
        factors: "The source of the waves, seabed shape, coastal shape and land elevation affect how a tsunami reaches the shore.",
        effects: "Tsunamis can flood coastal land, damage buildings, move debris and erode shorelines.",
        note: "A tsunami consists of multiple waves. The first wave is not always the largest.",
        sourceName: "NOAA — Tsunami Frequently Asked Questions",
        sourceUrl: "https://www.tsunami.gov/?page=tsunamiFAQ"
    },

    flooding: {
        title: "Flooding & Related Risks",
        category: "HYDROLOGICAL HAZARD",
        introduction: "Explore how water can cover normally dry land.",
        definition: "Flooding happens when water covers land that is normally dry. It can occur around rivers, along coasts or where rainfall overwhelms drainage.",
        process: "For example, heavy rainfall can create more runoff than rivers and drains can carry. Water then spreads onto nearby land.",
        steps: [
            "Water builds up",
            "River or drainage capacity is exceeded",
            "Normally dry land becomes flooded"
        ],
        factors: "Rainfall, ground saturation, land elevation, river levels and drainage conditions affect where flooding occurs.",
        effects: "Flooding can damage buildings and crops, interrupt transport and affect water supplies.",
        note: "Flooding is a hydrological hazard. It is included here because water and ground processes can interact.",
        sourceName: "USGS — Our Water, Our Lives: Floods",
        sourceUrl: "https://www.usgs.gov/water-science-school/our-water-our-lives-floods"
    }
};

const hazardOverview = document.getElementById("hazardOverview");
const hazardDetails = document.getElementById("hazardDetails");

const pageTitle = document.getElementById("pageTitle");
const pageCategory = document.getElementById("pageCategory");
const pageDescription = document.getElementById("pageDescription");
const breadcrumbText = document.getElementById("breadcrumbText");

const hazardDefinition = document.getElementById("hazardDefinition");
const hazardProcess = document.getElementById("hazardProcess");
const hazardFactors = document.getElementById("hazardFactors");
const hazardEffects = document.getElementById("hazardEffects");
const hazardNote = document.getElementById("hazardNote");

const processOne = document.getElementById("processOne");
const processTwo = document.getElementById("processTwo");
const processThree = document.getElementById("processThree");

const hazardSource = document.getElementById("hazardSource");
const hazardMenuLinks = document.querySelectorAll(".hazard-menu-link");

const hazardSearch = document.getElementById("hazardSearch");
const hazardItems = document.querySelectorAll(".hazard-item");
const searchCount = document.getElementById("searchCount");
const noResults = document.getElementById("noResults");
const clearSearch = document.getElementById("clearSearch");

function showOverview() {
    hazardOverview.hidden = false;
    hazardDetails.hidden = true;

    pageTitle.textContent = "Understand the Risks";
    pageCategory.textContent = "READY MYANMAR";

    pageDescription.textContent =
        "Start with the science. Learn what different hazards mean, how they interact, and why their effects vary.";

    breadcrumbText.textContent = "Understand the Risks";

    document.title = "Understand the Risks | Ready Myanmar";
}

function showHazard(hazardKey) {
    const hazard = hazardInformation[hazardKey];

    hazardOverview.hidden = true;
    hazardDetails.hidden = false;

    pageTitle.textContent = hazard.title;
    pageCategory.textContent = hazard.category;
    pageDescription.textContent = hazard.introduction;
    breadcrumbText.textContent = hazard.title;

    hazardDefinition.textContent = hazard.definition;
    hazardProcess.textContent = hazard.process;
    hazardFactors.textContent = hazard.factors;
    hazardEffects.textContent = hazard.effects;
    hazardNote.textContent = hazard.note;

    processOne.textContent = hazard.steps[0];
    processTwo.textContent = hazard.steps[1];
    processThree.textContent = hazard.steps[2];

    hazardSource.textContent = hazard.sourceName;
    hazardSource.href = hazard.sourceUrl;

    for (let i = 0; i < hazardMenuLinks.length; i++) {
        const link = hazardMenuLinks[i];

        if (link.getAttribute("href") === "#" + hazardKey) {
            link.classList.add("active");
            link.setAttribute("aria-current", "location");
        } else {
            link.classList.remove("active");
            link.removeAttribute("aria-current");
        }
    }

    document.title = hazard.title + " | Ready Myanmar";
}

function updateRiskPage(moveFocus) {
    const hazardKey = window.location.hash.substring(1);

    if (Object.prototype.hasOwnProperty.call(hazardInformation, hazardKey)) {
        showHazard(hazardKey);
    } else {
        showOverview();
    }

    if (hazardKey === "understanding-risk") {
        document.getElementById("understanding-risk").scrollIntoView();
    } else if (moveFocus) {
        pageTitle.focus({ preventScroll: true });
        window.scrollTo(0, 0);
    }
}

function filterHazards() {
    const searchText = hazardSearch.value.trim().toLowerCase();
    let visibleCount = 0;

    for (let i = 0; i < hazardItems.length; i++) {
        const keywords = hazardItems[i].dataset.keywords;
        const matchesSearch = keywords.includes(searchText);

        hazardItems[i].hidden = !matchesSearch;

        if (matchesSearch) {
            visibleCount = visibleCount + 1;
        }
    }

    if (visibleCount === 1) {
        searchCount.textContent = "Showing 1 hazard";
    } else {
        searchCount.textContent = "Showing " + visibleCount + " hazards";
    }

    noResults.hidden = visibleCount !== 0;
}

hazardSearch.addEventListener("input", filterHazards);

clearSearch.addEventListener("click", function () {
    hazardSearch.value = "";
    filterHazards();
    hazardSearch.focus();
});

window.addEventListener("hashchange", function () {
    updateRiskPage(true);
});

filterHazards();
updateRiskPage(false);