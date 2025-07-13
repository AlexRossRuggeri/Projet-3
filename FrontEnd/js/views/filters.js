import { displayProjects } from './gallery.js';
import { fetchAllCategories } from '../services/categoryService.js';

export async function initFilters(projects) {
  const filterMenu = document.querySelector('.filter-menu');
  filterMenu.innerHTML = '';

  try {
    const categories = await fetchAllCategories();

    const allButton = document.createElement('button');
    allButton.classList.add('filter-button');
    allButton.id = '';
    allButton.textContent = 'Tous';
    filterMenu.appendChild(allButton);

    categories.forEach((category) => {
      const button = document.createElement('button');
      button.classList.add('filter-button');
      button.setAttribute('role', 'button');
      button.id = category.id;
      button.textContent = category.name;
      filterMenu.appendChild(button);
    });

    document
      .querySelectorAll('.filter-button')
      .forEach(function (boutonFiltre) {
        boutonFiltre.addEventListener('click', function (event) {
          const clickedbutton = event.target;
          const projetsFiltres = projects.filter(function (project) {
            return (
              clickedbutton.textContent === 'Tous' ||
              project.categoryId == clickedbutton.id
            );
          });

          document.querySelector('.gallery').innerHTML = '';
          displayProjects(projetsFiltres);
        });
      });
  } catch (error) {
    console.error('Error fetching categories:', error);
  }
}
