import { deleteProjectFromAPI } from "../projects/adapters/apiProjectDatasource.js";
import { displayProjects } from "../../functions.js";

let gallery;

// This function dynamically populates the gallery with project elements //
// It displays each project as a visual element (with an image and a remove button) //
// and sets up event listeners for removing projects //

function populateGallery(projects) {
  gallery.innerHTML = " ";

  projects.forEach((project, index) => {
    const projectElement = document.createElement("div");
    projectElement.classList.add("project");

    projectElement.innerHTML = `
            <img src="${project.imageUrl}" alt="${project.title}">
             <button class="remove-project" aria-label="Remove project" data-id="${project.id}">
                <i class="fa-solid fa-trash-can"></i>
            </button>
          `;

    gallery.appendChild(projectElement);

    projectElement
      .querySelector(".remove-project")
      .addEventListener("click", async (event) => {
        event.preventDefault();
        await deleteProjectFromAPI(project.id);

        projects.splice(index, 1);
        populateGallery(projects);
        displayProjects(projects);
      });
  });
}

// This function initializes and sets up the entire gallery user interface (UI) //
// It serves as the main entry point for displaying and interacting with the project //
// gallery within the modal window//

function projectEditionGalleryUI(projects) {
  gallery = document.createElement("div");
  gallery.classList.add("gallery-modal");

  populateGallery(projects);

  const addProjectButton = document.createElement("button");
  addProjectButton.classList.add("add-link");
  addProjectButton.textContent = "Ajouter une photo";

  return {
    title: "Galerie photo",
    gallery,
    addProjectButton,
  };
}

export { projectEditionGalleryUI, populateGallery };
