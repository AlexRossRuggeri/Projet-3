import { fetchAllProjects } from './services/projectService';
import { displayProjects } from './UI/gallery';
import { initFilters } from './UI/filters';
import { isLogged } from './services/authService.js';
import { bindLogoutLink } from './UI/auth.js';
import { openModal, closeModal } from './utils/modal.js';
import { showProjectEditingModal } from './UI/modalController.js';

function enableEditModeWhenLogged() {
  document.body.classList.toggle('edit-mode', isLogged());
}

async function initApp() {
  try {
    const projects = await fetchAllProjects();
    displayProjects(projects);
    await initFilters(projects);

    enableEditModeWhenLogged();
    bindLogoutLink();

    const editLink = document.querySelector('#edit-link');
    if (editLink) {
      editLink.addEventListener('click', (e) => {
        e.preventDefault();
        showProjectEditingModal();
      });
    }
  } catch (error) {
    console.error('Error during App initialisation', error);
  }
}

document.addEventListener('DOMContentLoaded', initApp);
