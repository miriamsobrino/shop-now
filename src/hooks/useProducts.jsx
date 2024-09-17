import { useState, useEffect, useContext } from 'react';
import { AppContext } from '../context/AppContext';
import { getProducts } from '../services/getProducts';

export const useProducts = (defaultLimit = 10) => {
  const [products, setProducts] = useState([]);
  const [limit, setLimit] = useState(defaultLimit);
  const [loadMore, setLoadMore] = useState(true);
  const { loading, category, setLoading } = useContext(AppContext);

  const fetchProducts = async (newLimit, category) => {
    try {
      setLoading(true);
      const data = await getProducts(newLimit, category);

      if (category) {
        setLoadMore(false);
      } else if (data.length < newLimit || newLimit >= 20) {
        setLoadMore(false);
      } else {
        setLoadMore(true);
      }

      setProducts(data);
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts(limit, category);
  }, [limit, category]);

  const loadMoreProducts = () => {
    setLimit((prevLimit) => prevLimit + 5);
  };

  return { products, loadMore, loading, category, loadMoreProducts };
};
