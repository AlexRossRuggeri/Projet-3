import {
  authService,
  categoryService,
  projectService,
} from "./lib/dependencies.js";

if (authService.isLogged()) {
  document.querySelector("#test_logged").textContent = "Je suis loggé !";
} else {
  document.querySelector("#test_logged").textContent =
    "Je ne suis pas loggé :-(";
}

function displayProjects(projects) {
  projects.forEach((projects) => {
    const figure = document.createElement("figure");
    const img = document.createElement("img");
    const caption = document.createElement("figcaption");

    img.src = projects.imageUrl;
    img.alt = projects.title;
    caption.textContent = projects.title;

    figure.appendChild(img, caption);

    document.querySelector(".gallery").appendChild(figure);
  });
}

async function init() {
  displayProjects(await projectService.fetchAllProjects());
}

// Execution
init();
