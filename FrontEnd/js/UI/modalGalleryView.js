import { deleteProject } from '../services/projectService';
import { setModalContent } from '../utils/modal';

function initModalGalleryView(projects, onAddClick, onProjectDeleted) {
  const title = 'Galerie Photo';

  const content = document.createElement('div');
  content.classList.add('gallery-modal');

  projects.forEach((project) => {
    const figure = document.createElement('figure');
    figure.classList.add('project');

    const img = document.createElement('img');
    img.src = project.imageUrl;
    img.alt = project.title;

    const deleteButton = document.createElement('button');
    deleteButton.type = 'button';
    deleteButton.classList.add('delete-project');
    deleteButton.innerHTML = `<i class="fa-solid fa-trash-can"></i>`;
    deleteButton.addEventListener('click', async (event) => {
      event.preventDefault();
      event.stopPropagation();
      try {
        await deleteProject(project.id);
        figure.remove();
        if (typeof onProjectDeleted === 'function') {
          onProjectDeleted(project.id);
        }
      } catch (error) {
        console.error('Failed to delete project:', error);
      }
    });

    figure.appendChild(img);
    figure.appendChild(deleteButton);
    content.appendChild(figure);
  });

  const actions = document.createElement('div');
  actions.classList.add('actions-modal');

  const addButton = document.createElement('button');
  addButton.classList.add('add-link');
  addButton.textContent = 'Ajouter une photo';
  addButton.addEventListener('click', () => {
    if (typeof onAddClick === 'function') {
      onAddClick();
    }
  });

  actions.appendChild(addButton);

  setModalContent({
    title,
    content,
    actions,
  });
}

export { initModalGalleryView };
