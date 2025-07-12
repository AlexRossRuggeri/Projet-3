const API_LOGIN_URL = 'http://localhost:5678/api/users/login';

async function loginRequest(email, password) {
  const data = { email: email, password: password };

  const response = await fetch(API_LOGIN_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error('Incorrect email or password');
  }

  return response.json();
}

export { loginRequest };
