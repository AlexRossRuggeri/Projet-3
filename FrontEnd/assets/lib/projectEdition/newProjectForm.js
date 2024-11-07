function newProjectFormUI(categories) {
  const form = document.createElement("form");

  form.id = "new_project_form";
  form.classList.add("formulaire-ajout");

  form.innerHTML = `
    <i class="fa-regular fa-image"></i>
    <input type="file" id="file" name="file" />
    <label for="Titre">Titre</label>
    <input type="text" name="titre" /><br />
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

function AddProject() {
  const formulaireAjout = document.querySelector(".formulaire-ajout");
  formulaireAjout.addEventListener("submit", function (event) {
    event.preventDefault();
    // Création de l'objet du nouvel projet
    const newProject = {
      imageUrl: parseInt(event.target.querySelector("[name=file]").value),
      title: event.target.querySelector("name=titre").value,
      category: event.target.querySelector("name=option").value,
    };
    // Création de la charge utile au format JSON
    const chargeUtile = JSON.stringify(newProject);

    //Appel de la fonction fetch avec toutes les informations nécessaires
    fetch("FrontEnd/assets/lib/dependencies.js", {
      method: "POST",
      header: { "Content-type": "application/json" },
      body: chargeUtile,
    });
  });
}

export { newProjectFormUI, AddProject };
