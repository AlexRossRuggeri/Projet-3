//Logs in the user and stores their credentials//

async function login(email, password) {
  const data = { email: email, password: password };

  const response = await fetch("http://localhost:5678/api/users/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  const { token, userId } = await response.json();

  if (token && userId) {
    localStorage.setItem("auth", JSON.stringify({ token, userId }));
  } else {
    throw new Error("Login failed");
  }
}

//Logs out the user by clearing the stored credentials//

async function logout() {
  localStorage.removeItem("auth");
  return Promise.resolve();
}

//Checks if the user is currently logged in//

function isLogged() {
  if (!localStorage.getItem("auth")) {
    return false;
  }
  let auth = {};
  try {
    auth = JSON.parse(localStorage.getItem("auth"));
  } catch (e) {
    return false;
  }
  return auth.token && auth.userId;
}

//Retrieves the stored authentication token for use in the API calls//

function getAuthToken() {
  if (!isLogged()) {
    return false;
  }
  const auth = JSON.parse(localStorage.getItem("auth"));
  return auth ? auth.token : null;
}

//Exports the functions//

export { login, logout, isLogged, getAuthToken };
