import { setModalContent } from '../utils/modal';
import { addProject } from '../services/projectService';
import { fetchAllCategories } from '../services/categoryService';

async function initModalUploadView({ onBack, onUploadSuccess }) {
  const title = 'Ajout photo';

  const form = document.createElement('form');
  form.classList.add('formulaire-ajout');

  const imgArea = document.createElement('div');
  imgArea.classList.add('img-area');
  imgArea.classList.add('js-modal-stop');
  imgArea.innerHTML = `
    <i class="fa-solid fa-image"></i>
    <label for="file" class="custom-file-label">
    <div class="content-file-label">+ Ajouter une photo</div>
    </label>
    <p> Formats acceptés : jpg, png (taille maximale : 4 Mo)</p>
    <img class="preview" style="display: none;" />
  `;

  const fileInput = document.createElement('input');
  fileInput.type = 'file';
  fileInput.accept = 'image/jpeg, image/png';
  fileInput.id = 'file';

  const titleLabel = document.createElement('label');
  titleLabel.setAttribute('for', 'title');
  titleLabel.textContent = 'Titre';
  const titleInput = document.createElement('input');
  titleInput.type = 'text';
  titleInput.name = 'title';

  const categoryLabel = document.createElement('label');
  categoryLabel.textContent = 'Catégorie';
  const categorySelect = document.createElement('select');
  categorySelect.name = 'category';

  const submitButton = document.createElement('button');
  submitButton.textContent = 'Valider';
  submitButton.type = 'submit';
  submitButton.classList.add('formulaire-ajout-button');

  form.appendChild(imgArea);
  form.appendChild(fileInput);
  form.appendChild(titleLabel);
  form.appendChild(titleInput);
  form.appendChild(categoryLabel);
  form.appendChild(categorySelect);
  form.appendChild(submitButton);

  const preview = imgArea.querySelector('.preview');
  fileInput.addEventListener('change', () => {
    const file = fileInput.files[0];
    if (file) {
      const url = URL.createObjectURL(file);
      preview.src = url;
      preview.style.display = 'block';
      imgArea.classList.add('hidden');
    }
  });

  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    const file = fileInput.files[0];
    const title = titleInput.value;
    const category = categorySelect.value;

    if (!file || !title || !category) {
      throw new Error('Tous les champs sont requis.');
    }

    const formData = new FormData();
    formData.append('image', file);
    formData.append('title', title);
    formData.append('category', category);

    try {
      await addProject(formData);
      form.reset();
      preview.src = '';
      preview.style.display = 'none';
      imgArea.classList.remove('hidden');

      if (typeof onUploadSuccess === 'function') {
        onUploadSuccess();
      }
    } catch (error) {
      console.error("Erreur lors de l'ajout du projet :", error);
      alert("Une erreur s'est produite lors de l'ajout du projet.");
    }
  });

  fetchAllCategories()
    .then((categories) => {
      categories.forEach((category) => {
        const option = document.createElement('option');
        option.value = category.id;
        option.textContent = category.name;
        categorySelect.appendChild(option);
      });
    })
    .catch((error) => {
      console.error('Erreur lors de la récupération des catégories :', error);
    });

  const returnButton = document.createElement('button');
  returnButton.classList.add('js-modal-return', 'show');
  returnButton.innerHTML = `<i class="fa-solid fa-arrow-left"></i>`;
  returnButton.addEventListener('click', onBack);

  setModalContent({
    title,
    content: form,
    actions: returnButton,
  });
}

export { initModalUploadView };
