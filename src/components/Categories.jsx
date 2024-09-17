import { useContext } from 'react';
import { AppContext } from '../context/AppContext';

export function Categories() {
  const { categories, filterCategories, selectedCategory } =
    useContext(AppContext);

  return (
    <section className='flex gap-2 px-6  lg:gap-4 lg:px-52 md:px-20 lg:w-[100%] lg:mx-auto xl:px-0 xl:max-w-[70%] mx-auto mt-4'>
      {categories.map((category, index) => (
        <button
          key={index}
          className={`p-2 border-2 border-gray rounded-md text-sm transition-all duration-300 capitalize ${
            selectedCategory === category ? 'bg-gray-200' : ''
          }`}
          onClick={() => filterCategories(category)}
        >
          {category}
        </button>
      ))}
    </section>
  );
}
