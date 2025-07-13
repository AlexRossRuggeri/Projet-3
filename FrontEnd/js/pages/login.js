import { login as authLogin } from '../services/authService.js';

const form = document.querySelector('form');
const errorMessage = document.getElementById('errorMessage');

form.addEventListener('submit', async function (event) {
  event.preventDefault();
  errorMessage.textContent = ' ';

  const email = document.querySelector('form input#email').value;
  const password = document.querySelector('form input#password').value;

  console.log(email, password);

  try {
    await authLogin(email, password);
    window.location.href = '../index.html';
  } catch (error) {
    errorMessage.textContent = error.message;
  }
});
