import {
  authService,
  categoryService,
  projectService,
} from "./lib/dependencies.js";
import { bindModalOpeneners } from "./lib/modal.js";

function enableEditModeWhenLogged() {
  document.body.classList.toggle("edit-mode", authService.isLogged());
}

function displayProjects(projects) {
  projects.forEach((projects) => {
    const figure = document.createElement("figure");
    const img = document.createElement("img");
    const caption = document.createElement("figcaption");

    img.src = projects.imageUrl;
    img.alt = projects.title;
    caption.textContent = projects.title;

    figure.appendChild(img);
    figure.appendChild(caption);

    document.querySelector(".gallery").appendChild(figure);
  });
}

//Gestion des Boutons
document.querySelectorAll(".filter-button").forEach(function (boutonFiltre) {
  boutonFiltre.addEventListener("click", function (event) {
    const clickedbutton = event.target;
    const projetsFiltres = projects.filter(function (project) {
      return (
        clickedbutton.textContent === "Tous" ||
        project.category === clickedbutton.textContent
      );
    });

    document.querySelector(".gallery").innerHTML = "";
    displayProjects(projetsFiltres);
  });
});

document.querySelector(".logout-link").addEventListener("click", async () => {
  try {
    await authService.logout();
    alert("You have successfully logged out.");
    window.location.href = "index.html";
  } catch (error) {
    console.error("Logout failed:", error);
  }
});

// Execution
const projects = await projectService.fetchAllProjects();
displayProjects(projects);
enableEditModeWhenLogged();
bindModalOpeneners();
