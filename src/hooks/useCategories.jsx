import { useState, useEffect } from 'react';
import { getCategories } from '../services/getCategories';

export const useCategories = () => {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await getCategories();
        setCategories(data);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };
    fetchCategories();
  }, []);

  const filterCategories = (category) => {
    if (selectedCategory === category) {
      setSelectedCategory(null);
      setFilteredProducts([]);
    } else {
      setSelectedCategory(category);
      setFilteredProducts((prevProducts) =>
        prevProducts.filter((product) => product.category === category)
      );
    }
  };
  return { categories, filterCategories, selectedCategory, filteredProducts };
};
