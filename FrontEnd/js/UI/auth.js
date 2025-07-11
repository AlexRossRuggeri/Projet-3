import { logout } from '../services/authService';

function bindLogoutLink(logoutlink = '.logout-link') {
  const link = document.querySelector(logoutlink);
  if (!link) return;
  link.addEventListener('click', async (event) => {
    event.preventDefault();
    try {
      await logout();
    } catch (error) {
      console.error('Logout failed:', error);
    } finally {
      window.location.href = 'index.html';
    }
  });
}

export { bindLogoutLink };
