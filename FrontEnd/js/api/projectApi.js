import { getAuthToken } from '../services/authService.js';

const API_WORKS_URL = 'http://localhost:5678/api/works';

async function fetchProjectsFromApi() {
  const response = await fetch(API_WORKS_URL);
  if (!response.ok) {
    throw new Error(`Failed to fetch projects from API: ${response.status}`);
  }
  return response.json();
}

async function deleteProjectFromApi(projectId) {
  const token = getAuthToken();
  if (!token) throw new Error('No authorization token found');

  const response = await fetch(`${API_WORKS_URL}/${projectId}`, {
    method: 'DELETE',
    headers: {
      'Accept': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error(`Failure to delete project from API: ${response.status}`);
  }

  return;
}

async function addProjectToApi(formData) {
  const token = getAuthToken();
  if (!token) throw new Error('No authorization token found');

  const response = await fetch(API_WORKS_URL, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: 'application/json',
    },
    body: formData,
  });

  if (!response.ok) {
    throw new Error(`Failed to add Project to API: ${response.status}`);
  }

  return await response.json();
}

export { fetchProjectsFromApi, deleteProjectFromApi, addProjectToApi };
