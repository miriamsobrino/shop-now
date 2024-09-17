import { CartIcon } from '../assets/icons/CartIcon.jsx';
import { CloseIcon } from '../assets/icons/CloseIcon.jsx';
import { useState, useContext } from 'react';
import { AppContext } from '../context/AppContext.jsx';

export function Header() {
  const [openCart, setOpenCart] = useState(false);
  const { productsCart, addProductToCart, removeProductFromCart } =
    useContext(AppContext);

  const showCart = () => {
    setOpenCart(!openCart);
  };

  const closeCart = () => {
    setOpenCart(false);
  };
  const totalPrice = productsCart.reduce(
    (total, product) => total + product.price * product.quantity,
    0
  );
  return (
    <header className='sticky bg-background w-full top-0 justify-between px-6 md:px-20 py-4 lg:px-52 xl:px-64 z-20 flex mx-auto '>
      <h1 className='text-3xl font-bold'>
        <a href='/shop-now/'>ShopNow</a>
      </h1>
      <CartIcon className=' cursor-pointer' onClick={() => showCart()} />
      {productsCart.length > 0 && (
        <button
          className=' absolute bg-red-500 rounded-full h-6 w-6 right-2 md:right-16 lg:right-48 xl:right-60 top-2 flex items-center justify-center'
          onClick={() => showCart()}
        >
          <span className='text-white text-sm font-bold '>
            {productsCart.reduce(
              (total, product) => total + product.quantity,
              0
            )}
          </span>
        </button>
      )}
      {openCart && (
        <section className='absolute :w-full h-screen lg:w-96 bg-white right-0 top-14 shadow-lg flex flex-col '>
          <CloseIcon
            className='icon icon-tabler icons-tabler-outline icon-tabler-x absolute right-2 top-2 cursor-pointer'
            onClick={() => closeCart()}
          />
          <h2 className='text-xl font-bold p-6'>Your Cart</h2>
          {productsCart.length === 0 ? (
            <p className='p-6'>Your cart is empty.</p>
          ) : (
            <div className='flex flex-col h-full  '>
              <ul className=' flex-grow overflow-y-scroll mb-28'>
                {productsCart.map((product) => (
                  <li
                    key={product.id}
                    className='flex justify-start items-center mb-4 border-b p-4'
                  >
                    <img
                      src={product.image}
                      alt={product.title}
                      className='w-16 h-16 object-contain aspect-square'
                    />
                    <div className='ml-4'>
                      <h3 className='text-sm font-medium line-clamp-1'>
                        {product.title}
                      </h3>
                      <div className='flex gap-2'>
                        <p className='text-sm'>${product.price.toFixed(2)}</p>
                        <div className='flex items-center gap-1'>
                          <button
                            className='  bg-red-500 rounded-full h-4 w-4  flex items-center justify-center '
                            onClick={() => removeProductFromCart(product.id)}
                          >
                            <span className='text-white text-sm '>-</span>
                          </button>
                          <span className=' text-sm '>{product.quantity}</span>
                          <button
                            className='  bg-red-500 rounded-full h-4 w-4 right-60 top-2 flex items-center justify-center'
                            onClick={() => addProductToCart(product)}
                          >
                            <span className='text-white text-base '>+</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
              <div className='p-6 bg-background shadow-lg sticky bottom-0'>
                <h3 className='text-lg font-bold'>
                  Total: ${totalPrice.toFixed(2)}
                </h3>
              </div>
            </div>
          )}
        </section>
      )}
    </header>
  );
}
