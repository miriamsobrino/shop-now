export const getProducts = async (limit, category) => {
  try {
    let url = `https://fakestoreapi.com/products?limit=${limit}`;
    if (category) {
      url = `https://fakestoreapi.com/products/category/${category}`;
    }

    const response = await fetch(url);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching products:', error);
  }
};
