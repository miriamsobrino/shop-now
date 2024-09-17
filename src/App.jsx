import { useState } from 'react';
import { Header } from './components/Header';
import { Products } from './components/Products';
import { Categories } from './components/Categories';
import './App.css';

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <Header />
      <Categories />
      <Products />
    </>
  );
}

export default App;
