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

  localStorage.setItem("auth", JSON.stringify({ token, userId }));
}

async function logout() {
  localStorage.removeItem("auth");
  return Promise.resolve();
}

function isLogged() {
  return !!localStorage.getItem("auth");
}

export { login, logout, isLogged };
