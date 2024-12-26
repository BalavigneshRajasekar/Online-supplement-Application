/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { createContext, useEffect, useState } from "react";

export const Product = createContext();

// Sample Provider component

const ProductHandler = ({ children }) => {
  const [products, setProducts] = useState([]);

  // Fetching products from a fake API

  useEffect(() => {}, []);

  return (
    <Product.Provider value={{ products, setProducts }}>
      {children}
    </Product.Provider>
  );
};

export default ProductHandler;
