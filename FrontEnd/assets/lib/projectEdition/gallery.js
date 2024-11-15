let gallery;

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

    const projectId = project.id;

    projectElement
      .querySelector(".remove-project")
      .addEventListener("click", async (event) => {
        event.preventDefault();
        await deleteProjectFromAPI(project.id);

        projects.splice(index, 1);
        populateGallery(projects);
      });
  });
}

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

export { projectEditionGalleryUI };
