import * as apiAuthProvider from "./auth/adapters/apiAuthProvider.js";

const authService = apiAuthProvider;

const projectService = {
  async fetchAllProjects() {
    const response = await fetch("http://localhost:5678/api/works");

    if (response.status != "200") {
      return false;
    }
    const jsonreturn = response.json();
    console.log(jsonreturn);
    return jsonreturn;

    return [
      {
        title: "Abajour Tahina",
        imageUrl: "assets/images/abajour-tahina.png",
        category: "Objets",
      },
      {
        title: "Appartement Paris V",
        imageUrl: "assets/images/appartement-paris-v.png",
        category: "Appartements",
      },
      {
        title: "Restaurant Sushisen - Londres",
        imageUrl: "assets/images/restaurant-sushisen-londres.png",
        category: "Hotels & restaurants",
      },
      {
        title: "Villa “La Balisiere” - Port Louis",
        imageUrl: "assets/images/la-balisiere.png",
        category: "Hotels & restaurants",
      },
      {
        title: "Structures Thermopolis",
        imageUrl: "assets/images/structures-thermopolis.png",
        category: "Objets",
      },
      {
        title: "Appartement Paris X",
        imageUrl: "assets/images/appartement-paris-x.png",
        category: "Appartements",
      },
      {
        title: "Pavillon “Le coteau” - Cassis",
        imageUrl: "assets/images/le-coteau-cassis.png",
        category: "Hotels & restaurants",
      },
      {
        title: "Villa Ferneze - Isola d'Elba",
        imageUrl: "assets/images/villa-ferneze.png",
        category: "Hotels & restaurants",
      },
      {
        title: "Appartement Paris XVIII",
        imageUrl: "assets/images/appartement-paris-xviii.png",
        category: "Appartements",
      },
      {
        title: 'Bar "Lullaby" - Paris',
        imageUrl: "assets/images/bar-lullaby-paris.png",
        category: "Hotels & restaurants",
      },
      {
        title: "Hotel First Arte - New Delhi",
        imageUrl: "assets/images/hotel-first-arte-new-delhi.png",
        category: "Hotels & restaurants",
      },
    ];
  },
};

const categoryService = {
  async fetchAllCategories() {
    const response = await fetch("http://localhost:5678/api/categories");

    return response.json();

    return [
      { id: "object", name: "Objets" },
      { id: "appartement", name: "Appartements" },
      { id: "hotel_restaurant", name: "Hotels & restaurants" },
    ];
  },
};

export { authService, projectService, categoryService };
