import { authService } from "./lib/dependencies.js";

const validEmail = "alexandre.rossruggeri@gmail.com";
const validPassword = "password123";

const form = document.querySelector("form");
const errorMessage = document.getElementById("errorMessage");

form.addEventListener("submit", async function (event) {
  event.preventDefault();

  errorMessage.textContent = " ";

  const email = document.querySelector("form input#email").value;
  const password = document.querySelector("form input#password").value;

  try {
    await authService.login(email, password);
    window.location.href = "./index.html";
  } catch (error) {
    errorMessage.textContent =
      error.message || "Email ou mot de passe incorrect";
  }
});
