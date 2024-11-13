async function fetchAllProjects() {
  const response = await fetch("http://localhost:5678/api/works");

  if (response.status != "200") {
    return false;
  }
  const jsonreturn = response.json();
  console.log(jsonreturn);
  return jsonreturn;
}

// 1/ Trouver où est-ce qu'on doit mettre le token dans une requête
// 2/ Récupérer ce token + le userId à ajouter dans le body de la requête

async function addProject(newProjectPayload) {
  const response = await fetch("http://localhost:5678/api/works", {
    method: "POST",
    // Set the data as the request body
    body: newProjectPayload,
  });
  console.log(await response.json());
}

export { fetchAllProjects, addProject };
