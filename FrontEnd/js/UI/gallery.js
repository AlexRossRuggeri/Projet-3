import { fetchAllProjects } from '../services/projectService';

function displayProjects(projects) {
  const gallery = document.querySelector('.gallery');
  gallery.innerHTML = '';

  projects.forEach((project) => {
    const figure = document.createElement('figure');
    figure.innerHTML = `
      <img src="${project.imageUrl}" alt="${project.title}">
      <figcaption>${project.title}</figcaption>
    `;
    gallery.appendChild(figure);
  });
}

async function refreshMainGallery() {
  const projects = await fetchAllProjects();
  displayProjects(projects);
}

export { displayProjects, refreshMainGallery };
