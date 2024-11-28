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
import { fetchFilterCategories, displayProjects } from "./functions.js";

function enableEditModeWhenLogged() {
  document.body.classList.toggle("edit-mode", authService.isLogged());
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
fetchFilterCategories(projects);
displayProjects(projects);
enableEditModeWhenLogged();
