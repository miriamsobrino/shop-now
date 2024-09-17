import { createContext, useState, useEffect } from 'react';
import { getCategories } from '../services/getCategories';
import { getProducts } from '../services/getProducts';
export const AppContext = createContext({});

export function AppContextProvider({ children }) {
  const [loading, setLoading] = useState(true);
  const [productsCart, setProductsCart] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [limit, setLimit] = useState(10);
  const [loadMore, setLoadMore] = useState(true);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoading(true);
        const data = await getCategories();
        setCategories(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching categories:', error);
        setLoading(false);
      }
    };
    fetchCategories();
  }, []);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const data = await getProducts(limit, selectedCategory);
        setProducts(data);
        if (data.length < limit) {
          setLoadMore(false);
        }
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, [limit, selectedCategory]);

  const loadMoreProducts = () => {
    setLimit((prevLimit) => prevLimit + 5);
  };

  useEffect(() => {
    const storedProducts = localStorage.getItem('productsCart');
    if (storedProducts) {
      setProductsCart(JSON.parse(storedProducts));
    }
    setLoading(false);
  }, []);

  const filterCategories = (category) => {
    setSelectedCategory((prevCategory) =>
      prevCategory === category ? null : category
    );
    setLimit(10);
    setLoadMore(true);
  };

  const addProductToCart = (product) => {
    setProductsCart((prevCart) => {
      const existingProduct = prevCart.find((item) => item.id === product.id);
      let updatedCart;
      if (existingProduct) {
        updatedCart = prevCart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        updatedCart = [...prevCart, { ...product, quantity: 1 }];
      }
      localStorage.setItem('productsCart', JSON.stringify(updatedCart));
      return updatedCart;
    });
  };

  const removeProductFromCart = (productId) => {
    setProductsCart((prevCart) => {
      const existingProduct = prevCart.find((item) => item.id === productId);
      let updatedCart;
      if (existingProduct.quantity === 1) {
        updatedCart = prevCart.filter((item) => item.id !== productId);
      } else {
        updatedCart = prevCart.map((item) =>
          item.id === productId
            ? { ...item, quantity: item.quantity - 1 }
            : item
        );
      }
      localStorage.setItem('productsCart', JSON.stringify(updatedCart));
      return updatedCart;
    });
  };
  return (
    <AppContext.Provider
      value={{
        loading,
        categories,
        productsCart,
        selectedCategory,
        filteredProducts,
        loadMore,
        products,
        loadMoreProducts,
        filterCategories,
        addProductToCart,
        removeProductFromCart,
        setLoading,
        setProductsCart,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}
