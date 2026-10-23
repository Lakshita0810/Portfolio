console.log("JavaScript connected");
const themeButton = document.getElementById("themeToggle");

themeButton.addEventListener("click", function () {

    document.body.classList.toggle("dark-mode");

    if (document.body.classList.contains("dark-mode")) {
        themeButton.textContent = "Switch to Light Mode";
    } else {
        themeButton.textContent = "Switch to Dark Mode";
    }

});
const cityInput = document.getElementById("cityInput");
const weatherButton = document.getElementById("weatherButton");
const weatherResult = document.getElementById("weatherResult");
async function getWeather() {

    const city = cityInput.value.trim();

    if (!city) {
        weatherResult.textContent = "Please enter a city.";
        return;
    }

    weatherResult.textContent = "Loading weather...";

    const apiKey = "afd3e5aef172dc4719af0985e183248c";

    const url =
  `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    try {

        const response = await fetch(url);

        if (!response.ok) {
            throw new Error(`HTTP ${response.status}`);
        }

        const data = await response.json();

        weatherResult.innerHTML = `
            <h3>${data.name}</h3>
            <p>Temperature: ${data.main.temp}°C</p>
            <p>Condition: ${data.weather[0].description}</p>
        `;

    } catch (error) {

        weatherResult.textContent =
            "Unable to fetch weather. Please try again.";

        console.error(error);
    }
}

if (weatherButton) {
    weatherButton.addEventListener("click", getWeather);
}

// Replace githubUrl values here if a repository address changes.
const projects = [
    {
        title: "Python Programs Collection",
        description: "A collection of Python programs demonstrating factorial calculation, Fibonacci series generation, and structure-to-dictionary conversion.",
        technologies: ["Python", "Cursor AI", "Git", "GitHub"],
        githubUrl: "https://github.com/Lakshita0810/Python-Program-Collection",
        liveUrl: ""
    },
    {
        title: "Messy Python Code Improvement",
        description: "A Python program improved using AI assistance to make the code more readable, organized, and maintainable.",
        technologies: ["Python", "Cursor AI"],
        githubUrl: "https://github.com/Lakshita0810/Messy-Pyhton-Code-Improvement",
        liveUrl: ""
    },
    {
        title: "Bug Fixing Using Cursor AI",
        description: "A programming project in which errors in an incorrect or buggy program were identified, analyzed, and corrected using Cursor AI.",
        technologies: ["Python", "Cursor AI"],
        githubUrl: "https://github.com/Lakshita0810/Session8",
        liveUrl: ""
    },
    {
        title: "Interactive Quiz Application",
        description: "An interactive quiz application that allows users to answer questions and interact with a quiz interface.",
        technologies: ["HTML", "CSS", "JavaScript"],
        githubUrl: "https://github.com/Lakshita0810/Quiz",
        liveUrl: ""
    },
    {
        title: "Book Reading List Application",
        description: "A reading list application for organizing and tracking books.",
        technologies: ["HTML", "CSS", "JavaScript"],
        githubUrl: "https://github.com/Lakshita0810/Reading-List",
        liveUrl: ""
    }
];

const projectSearch = document.getElementById("projectSearch");
const clearProjectSearch = document.getElementById("clearProjectSearch");
const projectList = document.getElementById("projectList");
const projectEmpty = document.getElementById("projectEmpty");
const filterButtons = document.querySelectorAll(".filter-btn");

let activeFilter = "all";

function projectMatches(project, query, filter) {
    const q = query.trim().toLowerCase();
    const haystack = [
        project.title,
        project.technologies.join(" ")
    ].join(" ").toLowerCase();

    if (q && !haystack.includes(q)) {
        return false;
    }

    const techs = project.technologies.map(function (tech) {
        return tech.toLowerCase();
    });

    if (filter === "python") {
        return techs.includes("python");
    }
    if (filter === "javascript") {
        return techs.includes("javascript");
    }
    if (filter === "html-css") {
        return techs.includes("html") || techs.includes("css");
    }
    if (filter === "cursor-ai") {
        return techs.includes("cursor ai");
    }
    return true;
}

function renderProjects() {
    if (!projectList || !projectEmpty) {
        return;
    }

    const query = projectSearch ? projectSearch.value : "";
    const matches = projects.filter(function (project) {
        return projectMatches(project, query, activeFilter);
    });

    projectList.innerHTML = "";
    projectEmpty.hidden = matches.length > 0;

    matches.forEach(function (project) {
        const item = document.createElement("li");
        const link = document.createElement("a");
        link.href = project.githubUrl;
        link.target = "_blank";
        link.rel = "noopener noreferrer";
        link.textContent = project.title;
        item.appendChild(link);
        projectList.appendChild(item);
    });
}

if (projectSearch) {
    projectSearch.addEventListener("input", renderProjects);
}

if (clearProjectSearch) {
    clearProjectSearch.addEventListener("click", function () {
        if (projectSearch) {
            projectSearch.value = "";
            projectSearch.focus();
        }
        renderProjects();
    });
}

filterButtons.forEach(function (button) {
    button.addEventListener("click", function () {
        activeFilter = button.getAttribute("data-filter") || "all";
        filterButtons.forEach(function (other) {
            const isActive = other === button;
            other.classList.toggle("is-active", isActive);
            other.setAttribute("aria-pressed", isActive ? "true" : "false");
        });
        renderProjects();
    });
});

renderProjects();