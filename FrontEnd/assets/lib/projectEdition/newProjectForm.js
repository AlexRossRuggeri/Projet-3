function newProjectFormUI(categories) {
  const form = document.createElement("form");

  form.id = "new_project_form";
  form.classList.add("formulaire-ajout");

  form.innerHTML = `
    <input type="file" id="file" name="file" />
    <label for="Titre">Titre</label>
    <input type="text" name="Titre" /><br />
    <label for="Catégorie">Catégorie</label>
  `;

  const categorySelect = document.createElement("select");
  categorySelect.id = "options";
  categorySelect.name = "options";

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
