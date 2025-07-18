import { fetchAllProjects } from '../services/projectService.js';
import { displayProjects } from '../views/gallery.js';
import { initFilters } from '../views/filters.js';
import { isLogged } from '../services/authService.js';
import { bindLogoutLink } from '../views/auth.js';
import { showProjectEditingModal } from '../controllers/modalController.js';

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
