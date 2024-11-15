import { getAuthToken } from "../../auth/adapters/apiAuthProvider.js";

async function fetchAllProjects() {
  const response = await fetch("http://localhost:5678/api/works");

  if (response.status != "200") {
    return false;
  }
  const jsonreturn = response.json();
  return jsonreturn;
}

async function addProject(newProjectPayload) {
  const token = getAuthToken();
  console.log(token);
  console.log(newProjectPayload);

  if (!token) {
    throw new Error("No authorization token found");
  }
  const response = await fetch("http://localhost:5678/api/works", {
    method: "POST",
    headers: {
      "accept": "application/json",
      "Authorization": `Bearer ${token}`,
    },
    body: newProjectPayload,
  });
  console.log(await response.json());
}

async function deleteProjectFromAPI(projectId) {
  const token = getAuthToken();

  if (!token) {
    throw new Error("No authorization token found");
  }
  const response = await fetch(`http://localhost:5678/api/works/${projectId}`, {
    method: "DELETE",
  });
  console.log(await response.json());
}

export { fetchAllProjects, addProject, deleteProjectFromAPI };
