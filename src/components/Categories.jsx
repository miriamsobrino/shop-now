import { useContext } from 'react';
import { AppContext } from '../context/AppContext';

export function Categories() {
  const { categories, filterCategories, selectedCategory } =
    useContext(AppContext);

  return (
    <section className='flex gap-2 p-2 lg:gap-4 lg:p-0 md:px-20 lg:max-w-[70%] mx-auto mt-4'>
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
