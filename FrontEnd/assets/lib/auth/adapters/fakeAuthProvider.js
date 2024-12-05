const fakeValidEmail = "alexandre.rossruggeri@gmail.com";
const fakeValidPassword = "password123";

// Simulates a login process by checking the provided credentials //
//(email and password) against predefined fake valid credentials //
//(fakeValidEmail and fakeValidPassword) //

async function login(email, password) {
  if (email === fakeValidEmail && password === fakeValidPassword) {
    localStorage.setItem("logged", true);
    return Promise.resolve();
  } else {
    return Promise.reject("Invalid email or password!");
  }
}

//Simulates a logout process by marking the user as not logged in//

async function logout() {
  localStorage.setItem("logged", false);
  return Promise.resolve();
}

// Checks whether the user is currently loggin in//

function isLogged() {
  return localStorage.getItem("logged") === "true";
}

export { login, logout, isLogged };
