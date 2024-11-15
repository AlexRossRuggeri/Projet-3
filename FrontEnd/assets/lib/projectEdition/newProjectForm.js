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
    <i class="fa-regular fa-image"></i>
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
  // submitButton.classList.add("");
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
