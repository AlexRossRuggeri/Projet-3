import { loginRequest } from '../api/authApi.js';

const AUTH_KEY = 'auth';

async function login(email, password) {
  const { token, userId } = await loginRequest(email, password);

  if (token && userId) {
    localStorage.setItem(AUTH_KEY, JSON.stringify({ token, userId }));
  } else {
    throw new Error('Login failed');
  }
}

async function logout() {
  localStorage.removeItem(AUTH_KEY);
  return Promise.resolve();
}

function isLogged() {
  if (!localStorage.getItem(AUTH_KEY)) {
    return false;
  }
  let auth = {};
  try {
    auth = JSON.parse(localStorage.getItem(AUTH_KEY));
  } catch (e) {
    return false;
  }
  return auth.token && auth.userId;
}

function getAuthToken() {
  if (!isLogged()) {
    return false;
  }
  const auth = JSON.parse(localStorage.getItem(AUTH_KEY));
  return auth ? auth.token : null;
}

export { login, logout, isLogged, getAuthToken };
