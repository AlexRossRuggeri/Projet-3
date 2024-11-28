function displayProjects(projects) {
  const galleryContainer = document.querySelector(".gallery");

  galleryContainer.innerHTML = " ";

  projects.forEach((projects) => {
    const figure = document.createElement("figure");
    const img = document.createElement("img");
    const caption = document.createElement("figcaption");

    img.src = projects.imageUrl;
    img.alt = projects.title;
    caption.textContent = projects.title;

    figure.appendChild(img);
    figure.appendChild(caption);

    galleryContainer.appendChild(figure);
  });
}

async function fetchFilterCategories(projects) {
  try {
    const response = await fetch("http://localhost:5678/api/categories");
    if (!response.ok) {
      throw new Error("Failed to fetch categories");
    }

    const categories = await response.json();

    const filterMenu = document.querySelector(".filter-menu");

    // Add a "Tous" button first
    const allButton = document.createElement("button");
    allButton.classList.add("filter-button");
    allButton.id = "";
    allButton.textContent = "Tous";
    filterMenu.appendChild(allButton);

    // Dynamically add buttons for each category
    categories.forEach((category) => {
      const button = document.createElement("button");
      button.classList.add("filter-button");
      button.id = category.id;
      button.textContent = category.name;
      filterMenu.appendChild(button);
    });

    // Optional: Add event listeners to the buttons
    document
      .querySelectorAll(".filter-button")
      .forEach(function (boutonFiltre) {
        boutonFiltre.addEventListener("click", function (event) {
          console.log(`Filter by category ID: ${boutonFiltre.id}`);
          const clickedbutton = event.target;
          const projetsFiltres = projects.filter(function (project) {
            return (
              clickedbutton.textContent === "Tous" ||
              project.categoryId == clickedbutton.id
            );
          });

          document.querySelector(".gallery").innerHTML = "";
          displayProjects(projetsFiltres);
        });
      });
  } catch (error) {
    console.error("Error fetching categories:", error);
  }
}

// Export the function on page load
export { fetchFilterCategories, displayProjects };
