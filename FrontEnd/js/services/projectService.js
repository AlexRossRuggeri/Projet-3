import {
  fetchProjectsFromApi,
  deleteProjectFromApi,
  addProjectToApi,
} from '../api/projectApi.js';

async function fetchAllProjects() {
  return await fetchProjectsFromApi();
}

async function deleteProject(projectId) {
  return await deleteProjectFromApi(projectId);
}

async function addProject(formData) {
  return await addProjectToApi(formData);
}

export { fetchAllProjects, deleteProject, addProject };
