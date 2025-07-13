import { openModal } from '../utils/modal.js';
import { initModalGalleryView } from '../views/modalGalleryView.js';
import { initModalUploadView } from '../views/modalUploadView.js';
import { refreshMainGallery } from '../views/gallery.js';
import { fetchAllProjects } from '../services/projectService.js';

let modalElement = null;

async function showProjectEditingModal() {
  modalElement = document.querySelector('#modalProjectEditing');
  openModal(modalElement);
  await showGalleryView();
}

async function showGalleryView() {
  const projects = await fetchAllProjects();
  initModalGalleryView(
    projects,
    () => showAddProjectView(),
    async (deletedId) => {
      await refreshMainGallery();
      const updatedProjects = await fetchAllProjects();
      initModalGalleryView(updatedProjects, showAddProjectView);
    },
  );
}

function showAddProjectView() {
  initModalUploadView({
    onBack: showGalleryView,
    onUploadSuccess: async () => {
      await refreshMainGallery();
    },
  });
}

export { showGalleryView, showProjectEditingModal, showAddProjectView };
