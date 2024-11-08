// TODO: Quand ça sera à connecter avec l'API, faire la même chose que fakeLogin mais en faisant des appels http vers le serveur.

async function login(email, password) {
  const data = { email: email, password: password };

  const response = await fetch("http://localhost:5678/api/users/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  const { token, userId } = response.json();
  console.log(token, userId);
}

async function logout() {
  localStorage.setItem("logged", false);
  return Promise.resolve();
}

function isLogged() {
  return localStorage.getItem("logged") === "true";
}

export { login, logout, isLogged };

// Il faut enregistrer userID, token et la variable isLogged

// Quand je me déconnecte, je dois effacer tout ça
