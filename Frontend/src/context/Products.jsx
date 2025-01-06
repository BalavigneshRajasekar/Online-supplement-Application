/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { createContext, useEffect, useState } from "react";
import axios from "axios";

export const Product = createContext();

// Sample Provider component

const ProductHandler = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [singleProduct, setSingleProduct] = useState(null);
  const [quantities, setQuantities] = useState();
  const [totalPrice, setTotalPrice] = useState();
  useEffect(() => {
    getAllProducts();
  }, []);
  useEffect(() => {
    console.log("before");
    console.log(quantities);

    if (products.length > 0) {
      let one = products.reduce((acc, item) => ({ ...acc, [item._id]: 0 }), {});
      setQuantities(one);
    }
  }, [products]);
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
  const getSingleProductsById = async (id) => {
    try {
      const response = await axios.get(
        `https://supplement-application.onrender.com/api/p1/products/${id}`
      );
      setSingleProduct(response.data);
    } catch (e) {
      console.log("Error fetching single products:", e);
    }
  };

  const plusQuantity = (prod) => {
    if (quantities[prod._id] >= prod.quantity) {
      alert("thats the quantity we have");
    } else {
      setQuantities((prev) => ({ ...prev, [prod._id]: prev[prod._id] + 1 }));
    }
  };
  const minusQuantity = (prod) => {
    if (quantities[prod._id] >= 1) {
      setQuantities((prev) => ({ ...prev, [prod._id]: prev[prod._id] - 1 }));
    }
  };
  return (
    <Product.Provider
      value={{
        products,
        setProducts,
        singleProduct,
        getSingleProductsById,
        setSingleProduct,
        quantities,
        setQuantities,
        plusQuantity,
        minusQuantity,
        totalPrice,
        setTotalPrice,
      }}
    >
      {children}
    </Product.Provider>
  );
};

export default ProductHandler;
