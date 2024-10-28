import { projectService } from "./dependencies.js";

let modal = null;

const focusableSelector = "button, a, input, textarea";
let focusables = [];

let previouslyFocusedElement = null;

const populateModal = function (projects) {
  const modalContent = modal.querySelector(".gallery-modal");
  modalContent.innerHTML = "";

  projects.forEach((project, index) => {
    const projectElement = document.createElement("div");
    projectElement.classList.add("project");

    projectElement.innerHTML = `
        <img src="${project.imageUrl}" alt="${project.title}">
         <button class="remove-project" aria-label="Remove project" data-index="${index}">
            <i class="fa-solid fa-trash-can"></i>
        </button>
      `;

    modalContent.appendChild(projectElement);
  });

  const removeButtons = modalContent.querySelectorAll(".remove-project");
  removeButtons.forEach((button) => {
    button.addEventListener("click", removeProject);
  });
};

const removeProject = function (event) {
  const index = event.target
    .closest(".remove-project")
    .getAttribute("data-index");
  projectService.removeProject(index);
  populateModal(projectService.fetchAllProjects());
};

const openModal = async function (event) {
  event.preventDefault();
  modal = document.querySelector(event.target.getAttribute("href"));
  focusables = Array.from(modal.querySelectorAll(focusableSelector));
  previouslyFocusedElement = document.querySelector(":focus");
  modal.style.display = null;
  focusables[0].focus();
  modal.classList.add("modal-open");
  modal.removeAttribute("aria-hidden");
  modal.setAttribute("aria-modal", "true");
  modal.addEventListener("click", closeModal);
  modal.querySelector(".js-modal-close").addEventListener("click", closeModal);
  modal
    .querySelector(".js-modal-stop")
    .addEventListener("click", stopPropagation);
};

const updateModalContent = function (contentHtml) {
  const modalWrapper = modal.querySelector(".modal-wrapper");
  modalWrapper.innerHTML = `
    <button class="js-modal-close">&times;</button>
    ${contentHtml}
  `;

  modalWrapper
    .querySelector(".js-modal-close")
    .addEventListener("click", closeModal);
};

const openModalWithDynamicContent = function (content) {
  openModal();
  updateModalContent(content);
};

const contentModal1 = `
   <h3 id="title-modal">Galerie photo</h3>
              <div class="gallery-modal"></div>
              <div class="add-button">
                <a href="#modal2" class="add-link js-modal"
                  >Ajouter une photo</a
                >
`;

// const contentModal2 = `
//               <h3 id="title-modal">Ajout Photo</h3>
//               <form
//                 action="/upload"
//                 method="post"
//                 enctype="multipart/form-data"
//                 class="formulaire-ajout"
//               >
//                 <input type="file" id="file" name="file" />
//                 <label for="Titre">Titre</label>
//                 <input type="text" name="Titre" /><br />
//                 <label for="Catégorie">Catégorie</label>
//                 <select id="options" name="options">
//                   <option value="option1">Option 1</option>
//                   <option value="option2">Option 2</option>
//                   <option value="option3">Option 3</option>
//                 </select>
//                 <div class="add-button">
//                   <button type="submit">Valider</button>
//                 </div>
//               </form>
// `;

document
  .querySelector("#openModalProjectEditing")
  .addEventListener("click", async function (event) {
    console.log("HELLOOOO");
    event.preventDefault();

    openModalWithDynamicContent(contentModal1);
    const projects = await projectService.fetchAllProjects();
    populateModal(projects);
  });

// document.querySelector("#modal2").addEventListener("click", function (event) {
//   event.preventDefault();
//   openModalWithDynamicContent(contentModal2);
// });

const closeModal = function (event) {
  if (modal === null) return;
  if (previouslyFocusedElement !== null) {
    previouslyFocusedElement.focus();
  }
  event.preventDefault();
  modal.classList.add("modal-closing");
  modal.setAttribute("aria-hidden", "true");
  modal.removeAttribute("aria-modal");
  modal.removeEventListener("click", closeModal);
  modal
    .querySelector(".js-modal-close")
    .removeEventListener("click", closeModal);
  modal
    .querySelector(".js-modal-stop")
    .removeEventListener("click", stopPropagation);

  modal.addEventListener("animationend", function onAnimationEnd(event) {
    if (event.animationName !== "fadeOut") return;

    modal.removeEventListener("animationend", onAnimationEnd);
    modal.classList.remove("modal-open", "modal-closing");
    modal = null;
  });
};

const stopPropagation = function (event) {
  event.stopPropagation();
};

const focusInModal = function (event) {
  event.preventDefault();
};

const bindModalOpeneners = function () {
  document.querySelectorAll(".js-modal").forEach((a) => {
    a.addEventListener("click", openModal);
  });
};

window.addEventListener("keydown", function (event) {
  if (modal === null) return;

  if (event.key === "Escape" || event.key === "Esc") {
    closeModal(event);
  }

  if (event.key === "Tab") {
    focusInModal(event);
    let index = focusables.findIndex(
      (f) => f === modal.querySelector(":focus")
    );
    if (event.shiftKey === true) {
      index--;
    } else {
      index++;
    }
    if (index >= focusables.length) {
      index = 0;
    }
    if (index < 0) {
      index = focusables.length - 1;
    }
    focusables[index].focus();
  }
});

export { bindModalOpeneners };
