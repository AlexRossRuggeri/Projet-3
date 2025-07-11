const API_CATEGORY_URL = 'http://localhost:5678/api/categories';

async function fetchCategoriesFromApi() {
  const response = await fetch(API_CATEGORY_URL);
  if (!response.ok) {
    throw new Error(`Failure to fetch categories from API: ${response.status}`);
  }
  return await response.json();
}

export { fetchCategoriesFromApi };
