import {
  fetchProjectsFromApi,
  deleteProjectFromApi,
  addProjectToApi,
} from '../api/projectApi.js';

async function fetchAllProjects() {
  try {
    return await fetchProjectsFromApi();
  } catch (error) {
    console.error('Failed to fetch projects:', error);
  }
}

async function deleteProject(projectId) {
  try {
    return await deleteProjectFromApi(projectId);
  } catch (error) {
    console.error(`Failed to delete project with ID ${projectId}:`, error);
  }
}

async function addProject(formData) {
  try {
    return await addProjectToApi(formData);
  } catch (error) {
    console.error('Failed to add project:', error);
  }
}

export { fetchAllProjects, deleteProject, addProject };
