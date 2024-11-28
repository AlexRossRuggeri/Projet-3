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
  showReturnModalButton,
} from "./lib/modal.js";
import { projectEditionGalleryUI } from "./lib/projectEdition/gallery.js";
import {
  newProjectFormUI,
  imagePreview,
} from "./lib/projectEdition/newProjectForm.js";

function enableEditModeWhenLogged() {
  document.body.classList.toggle("edit-mode", authService.isLogged());
}

function displayProjects(projects) {
  const galleryContainer = document.querySelector(".gallery");

  galleryContainer.innerHTML = " ";

  projects.forEach((projects) => {
    const figure = document.createElement("figure");
    const img = document.createElement("img");
    const caption = document.createElement("figcaption");

    img.src = projects.imageUrl;
    img.alt = projects.title;
    caption.textContent = projects.title;

    figure.appendChild(img);
    figure.appendChild(caption);

    galleryContainer.appendChild(figure);
  });
}

function displayModalProjectEdition() {
  openModal("#modalProjectEditing");

  const { title, gallery, addProjectButton } =
    projectEditionGalleryUI(projects);

  editTitleModal(title);
  editContentModal(gallery);
  editActionsModal(addProjectButton);

  // Opening the Second Modal with the AddProjectButton
  addProjectButton.addEventListener("click", displayModalNewProjectForm);
}

async function displayModalNewProjectForm() {
  clearModal();

  const { title, form, submitButton } = newProjectFormUI(
    await categoryService.fetchAllCategories()
  );

  editTitleModal(title);
  editContentModal(form);
  editActionsModal(submitButton);
  showReturnModalButton(onReturnButtonClicked);

  // Submitting the Form to add a new project
  // Take over form submission
  form.addEventListener("submit", (event) => {
    onNewProjectSubmitted(event, form);
  });
  imagePreview();
}

function onReturnButtonClicked() {
  displayModalProjectEdition();
}

async function onNewProjectSubmitted(event, form) {
  // 1 - Valider que le formulaire est bien valide
  // 2 - Lancer une méthode sur projectService permettant d'ajouter le projet sur le service externe (dans le futur: l'api, pour le moment, c'est fake)
  // 3 - Si ça s'est bien passé, trouver un moyen de revenir sur la première étape de la modale => liste des projets
  // 4 - Si ça s'est bien passé, trouver un moyen de mettre à jour la gallerie sur la page principale
  event.preventDefault();
  // Associate the FormData object with the form element
  const formData = new FormData(form);

  try {
    const result = await projectService.addProject(formData);
  } catch (e) {
    console.error(e);
  }
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

// Opening the First Modal with the edit-link
document
  .querySelector("#edit-link")
  .addEventListener("click", displayModalProjectEdition);

// Logout Button
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
