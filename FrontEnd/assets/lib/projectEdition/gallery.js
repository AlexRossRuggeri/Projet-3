let gallery;
let addProjectButton;

function populateGallery(projects) {
  projects.forEach((project, index) => {
    const projectElement = document.createElement("div");
    projectElement.classList.add("project");

    projectElement.innerHTML = `
            <img src="${project.imageUrl}" alt="${project.title}">
             <button class="remove-project" aria-label="Remove project" data-index="${index}">
                <i class="fa-solid fa-trash-can"></i>
            </button>
          `;

    gallery.appendChild(projectElement);
  });
}

function initProjectEditionGallery(projects) {
  gallery = document.createElement("div");
  gallery.classList.add("gallery-modal");

  populateGallery(projects);

  addProjectButton = document.createElement("button");
  addProjectButton.classList.add("add-link");
  addProjectButton.textContent = "Ajouter une photo";

  return {
    title: "Galerie photo",
    gallery,
    addProjectButton,
  };
}

export { initProjectEditionGallery };
