/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { createContext, useEffect, useState } from "react";
import axios from "axios";

export const Product = createContext();

// Sample Provider component

const ProductHandler = ({ children }) => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    getAllProducts();
  }, []);

  const getAllProducts = async () => {
    try {
      const response = await axios.get(
        "https://supplement-application.onrender.com/api/p1/products"
      );
      setProducts(response.data);
    } catch (e) {
      console.error("Error fetching products:", e);
    }
  };

  useEffect(() => {}, []);

  return (
    <Product.Provider value={{ products, setProducts }}>
      {children}
    </Product.Provider>
  );
};

export default ProductHandler;
