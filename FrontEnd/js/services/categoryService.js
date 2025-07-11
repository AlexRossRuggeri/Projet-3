import { fetchCategoriesFromApi } from '../api/categoryApi';

async function fetchAllCategories() {
  return await fetchCategoriesFromApi();
}

export { fetchAllCategories };
