import { CartAddIcon } from '../assets/icons/CartAddIcon';
import { useContext } from 'react';
import { useProducts } from '../hooks/useProducts';
import { AppContext } from '../context/AppContext';
import './Loader.css';

export function Products() {
  const { products, loading, loadMoreProducts, loadMore, addProductToCart } =
    useContext(AppContext);

  return (
    <div className='flex flex-col justify-center my-10 mx-auto w-full md:w-[80%] lg:max-w-[70%]'>
      <section className='grid grid-cols-1 md:grid-cols-3  lg:grid-cols-5 gap-10 place-items-center  mb-8 '>
        {products.map((product) => (
          <article
            key={product.id}
            className='flex flex-col justify-start items-center gap-4 border-2 bg-white border-gray-100 rounded-md w-56 h-[340px] relative  p-4 text-center shadow-md hover:scale-105 transition-all duration-200'
          >
            <img
              src={product.image}
              className='w-40 h-40 object-contain '
              alt={product.title}
            />
            <h2 className='line-clamp-2  h-10 text-sm  '>{product.title}</h2>

            <span className='font-bold text-xl'>
              ${product.price.toFixed(2)}
            </span>
            <div className='w-full absolute -bottom-1  '>
              <button
                className='flex gap-2 items-center bg-red-500 w-full justify-center py-2 rounded-sm text-white hover:bg-red-400'
                onClick={() => addProductToCart(product)}
              >
                Add to Cart <CartAddIcon width={14} />
              </button>
            </div>
          </article>
        ))}
      </section>
      {loadMore && !loading && (
        <button
          onClick={loadMoreProducts}
          className='mx-auto p-2 bg-gray-400 text-white rounded hover:bg-gray-300 text-sm '
        >
          Load More Products
        </button>
      )}
      {loading && (
        <div className='w-full min-h-[100px] flex justify-center items-center'>
          <span className='loader'></span>
        </div>
      )}
    </div>
  );
}
