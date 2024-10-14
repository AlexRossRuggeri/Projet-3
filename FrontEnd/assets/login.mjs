// let form = document.querySelector("form");
// let baliseEmail = document.getElementById("email");
// let balisePassword = document.getElementById("password");

// function verifierChamps(balise) {
//   if (balise.value === " ") {
//     balise.classList.add("Error");
//   } else {
//     balise.classList.remove("Error");
//   }
// }

// function verifierEmail(baliseEmail) {
//   let emailRegExp = new RegExp("[a-z0-9._-]+@[a-z._-]+\\.[a-z._-]+");
//   if (emailRegExp.test(baliseEmail.value)) {
//     console.log("OK");
//     balise.classList.remove("Error");
//   } else {
//     balise.classList.add("Error");
//     console.log("KO");
//   }
// }

// form.addEventListener("submit", (event) => {
//   event.preventDefault();
//   verifierChamps(baliseEmail, balisePassword);
// });

//Code à garder//

import { authService } from "./lib/dependencies.js";

const validEmail = "alexandre.rossruggeri@gmail.com";
const validPassword = "password123";

const form = document.querySelector("form");
const errorMessage = document.getElementById("errorMessage");

form.addEventListener("submit", async function (event) {
  errorMessage.textContent = "Email ou mot de passe incorrect";
  event.preventDefault();

  const email = document.querySelector("form input#email").value;
  const password = document.querySelector("form input#password").value;

  try {
    await authService.login(email, password);
    window.location.href = "./index.html";
  } catch (error) {
    errorMessage.textContent = error.message;
  }
});
