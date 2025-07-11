import { openModal } from '../utils/modal';
import { initModalGalleryView } from './modalGalleryView';
import { initModalUploadView } from './modalUploadView';
import { fetchAllProjects } from '../services/projectService';
import { refreshMainGallery } from './gallery';

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
