//This function creates the form to add new projects

//creates the user interface (UI) elements for the form that users will fill out to add new projects.
function newProjectFormUI(categories) {
  //Form element that holds the fields that users will fill out
  const form = document.createElement("form");

  //gives the form an id
  form.id = "new_project_form";

  //gives the form a class
  form.classList.add("formulaire-ajout");

  form.innerHTML = `
  <label for="file" class="img-area">
    <div class="container">
      <i class="fa-regular fa-image"></i>
      <span class="custom-file-label">+ Ajouter Photo</span>
      <img id="preview" src="#" alt="Preview"/>
    </div>
      <p>Formats acceptés : jpg, png (taille maximale : 4 Mo)</p>
  </label>
    <input type="file" id="file" name="image" />
  <label for="Title">Titre</label>
    <input type="text" name="title" /><br />
  <label for="Catégorie">Catégorie</label>
  `;

  const categorySelect = document.createElement("select");
  categorySelect.id = "options";
  categorySelect.name = "category";

  categories.forEach((category) => {
    const option = document.createElement("option");
    option.value = category.id;
    option.textContent = category.name;

    categorySelect.appendChild(option);
  });

  form.appendChild(categorySelect);

  const submitButton = document.createElement("button");
  submitButton.classList.add("formulaire-ajout-button");
  submitButton.type = "submit";
  submitButton.setAttribute("form", form.id);
  submitButton.textContent = "Valider";

  return {
    title: "Ajout photo",
    form,
    submitButton,
  };
}

export { newProjectFormUI };
