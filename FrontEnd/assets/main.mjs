import {
  authService,
  categoryService,
  projectService,
} from "./lib/dependencies.js";
import {
  openModal,
  closeModal,
  clearModal,
  editTitleModal,
  editContentModal,
  editActionsModal,
} from "./lib/modal.js";
import { projectEditionGalleryUI } from "./lib/projectEdition/gallery.js";
import { newProjectFormUI } from "./lib/projectEdition/newProjectForm.js";

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
        project.categoryId == clickedbutton.id
      );
    });

    document.querySelector(".gallery").innerHTML = "";
    displayProjects(projetsFiltres);
  });
});

document.querySelector("#edit-link").addEventListener("click", () => {
  openModal("#modalProjectEditing");

  const { title, gallery, addProjectButton } =
    projectEditionGalleryUI(projects);

  editTitleModal(title);
  editContentModal(gallery);
  editActionsModal(addProjectButton);

  addProjectButton.addEventListener("click", async () => {
    clearModal();

    const { title, form, submitButton } = newProjectFormUI(
      await categoryService.fetchAllCategories()
    );

    editTitleModal(title);
    editContentModal(form);
    editActionsModal(submitButton);

    form.addEventListener("submit", async (event) => {
      event.preventDefault();
      console.log(new FormData(form));
      // 1 - Valider que le formulaire est bien valide
      // 2 - Lancer une méthode sur projectService permettant d'ajouter le projet sur le service externe (dans le futur: l'api, pour le moment, c'est fake)
      // 3 - Si ça s'est bien passé, trouver un moyen de revenir sur la première étape de la modale => liste des projets
      // 4 - Si ça s'est bien passé, trouver un moyen de mettre à jour la gallerie sur la page principale
    });
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
