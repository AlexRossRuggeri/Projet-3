//This module creates the form to add new projects

//creates the user interface (UI) elements for the form that users will fill out to add new projects.
function newProjectFormUI(categories) {
  //Form element that holds the fields that users will fill out
  const form = document.createElement("form");

  //gives the form an id
  form.id = "new_project_form";

  //gives the form a class
  form.classList.add("formulaire-ajout");

  form.innerHTML = `
    <div class="img-area">
      <label for="file">
        <i class="fa-regular fa-image"></i>
        <div class="custom-file-label">
          <span class="content-file-label">+ Ajouter Photo</span>
        </div>
        <img id="preview" src="#" alt="Preview" />
        <p>Formats acceptés : jpg, png (taille maximale : 4 Mo)</p>
      </label>
        <input
          type="file"
          id="file"
          name="image"
          accept="image/jpeg, image/png"
        />
    </div>
      <label for="title">Titre</label>
        <input type="text" id="title" name="title" required />
      <label for="category">Catégorie</label>
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

const imagePreview = () => {
  document.getElementById("file").addEventListener("change", function (event) {
    const preview = document.getElementById("preview");
    const file = event.target.files[0];
    const imgArea = document.querySelector(".img-area");

    if (file && (file.type === "image/jpeg" || file.type === "image/png")) {
      const reader = new FileReader();
      reader.onload = function (e) {
        preview.src = e.target.result;
        preview.style.display = "block";
        imgArea.classList.add("hidden");
      };
      reader.readAsDataURL(file);
    } else {
      preview.src = "";
      preview.style.display = "none";
      imgArea.classList.remove("hidden");
      alert("Veuillez sélectionner une image au format JPG ou PNG.");
    }
  });
};

export { newProjectFormUI, imagePreview };
