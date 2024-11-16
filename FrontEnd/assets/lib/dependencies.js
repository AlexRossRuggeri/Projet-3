// Ici nous jouons avec les imports pour soit utiliser un faux service soit un service utilisant une infrastrucre externe
import * as authService from "./auth/adapters/apiAuthProvider.js";
import * as projectService from "./projects/adapters/apiProjectDatasource.js";

const categoryService = {
  async fetchAllCategories() {
    const response = await fetch("http://localhost:5678/api/categories");
    return response.json();

    // return [
    //   { id: "object", name: "Objets" },
    //   { id: "appartement", name: "Appartements" },
    //   { id: "hotel_restaurant", name: "Hotels & restaurants" },
    // ];
  },
};

export { authService, projectService, categoryService };
