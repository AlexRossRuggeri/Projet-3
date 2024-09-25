const projects = [
  {
    title: "Abajour Tahina",
    imageUrl: "assets/images/abajour-tahina.png",
  },
  {
    title: "Appartement Paris V",
    imageUrl: "assets/images/appartement-paris-v.png",
  },
  {
    title: "Restaurant Sushisen - Londres",
    imageUrl: "assets/images/restaurant-sushisen-londres.png",
  },
  {
    title: "Villa “La Balisiere” - Port Louis",
    imageUrl: "assets/images/la-balisiere.png",
  },
  {
    title: "Structures Thermopolis",
    imageUrl: "assets/images/structures-thermopolis.png",
  },
  {
    title: "Appartement Paris X",
    imageUrl: "assets/images/appartement-paris-x.png",
  },
  {
    title: "Pavillon “Le coteau” - Cassis",
    imageUrl: "assets/images/le-coteau-cassis.png",
  },
  {
    title: "Villa Ferneze - Isola d’Elba",
    imageUrl: "assets/images/villa-ferneze.png",
  },
];

// const numerosLoto = [12, 54, 98, 58, 20];

// numerosLoto.forEach((num) => {
//   console.log(num);
// });

function displayProjects(projects) {
  projects.forEach((projects) => {
    const figure = document.createElement("figure");
    const img = document.createElement("img");
    const caption = document.createElement("figcaption");

    img.src = projects.imageUrl;
    img.alt = projects.title;
    caption.textContent = projects.title;

    figure.appendChild(img, caption);

    document.querySelector(".gallery").appendChild(figure);
  });
}

// Execution
displayProjects(projects);
