export const getCategories = async () => {
  try {
    const response = await fetch(
      'https://fakestoreapi.com/products/categories'
    );
    const data = response.json();
    return data;
  } catch (error) {
    console.error('Error fetching categories:', error);
  }
};
