/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { createContext, useEffect, useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setCart, setDeliveryDetails } from "../store/slice";
import { toast } from "react-toastify";
import { message } from "antd";
import { useNavigate } from "react-router-dom";

export const Product = createContext();

// Sample Provider component

const ProductHandler = ({ children }) => {
  const [imgUrl, setImageUrl] = useState(null);
  const [role, setRole] = useState("User");
  const [products, setProducts] = useState([]);
  const [filterProducts, setFilterProducts] = useState([]);
  const [singleProduct, setSingleProduct] = useState(null);
  const [toggle, setToggle] = useState(false);
  const [quantities, setQuantities] = useState();
  const [totalPrice, setTotalPrice] = useState();
  const [paymentDetails, setPaymentDetails] = useState(null);
  const [editProducts, setEditProducts] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    getAllProducts();
    const cartData = JSON.parse(localStorage.getItem("cart"));
    setRole(localStorage.getItem("role"));
    dispatch(setCart(cartData));
    console.log("this executed");
  }, []);

  // UseState to add default quantities for products rerender whenever Products value changed
  useEffect(() => {
    if (products.length > 0) {
      let one = products.reduce((acc, item) => ({ ...acc, [item._id]: 1 }), {});
      setQuantities(one);
    }
  }, [products]);

  const getAllProducts = async () => {
    try {
      const response = await axios.get(
        "https://supplement-application.onrender.com/api/p1/products"
      );

      setProducts(response.data);
      setFilterProducts(response.data);
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

  const getDeliveryDetails = async (navigate) => {
    try {
      const response = await axios.get(
        "https://supplement-application.onrender.com/api/v1/shipping/details",
        {
          headers: {
            Authorization: localStorage.getItem("logToken"),
          },
        }
      );
      console.log(response.data);
      localStorage.setItem("Shipping", JSON.stringify(response.data.data));
      dispatch(setDeliveryDetails(response.data.data));
    } catch (e) {
      toast.error(e.response.data.message);
      navigate("/login");
    }
  };
  const addDeliveryDetails = async (values) => {
    const loading = toast.loading("Updating delivery details...");
    try {
      const response = await axios.post(
        "https://supplement-application.onrender.com/api/v1/Shipping/details",
        values,
        {
          headers: {
            Authorization: localStorage.getItem("logToken"),
          },
        }
      );

      localStorage.setItem("Shipping", JSON.stringify(response.data.data));
      dispatch(setDeliveryDetails(response.data.data));
      toast.update(loading, {
        render: response.data.message,
        type: "success",
        isLoading: false,
        autoClose: 3000,
        progress: undefined,
        draggable: true,
        closeButton: true,
      });
    } catch (e) {
      console.error("Error fetching delivery details:", e);
    }
  };

  return (
    <Product.Provider
      value={{
        products,
        setProducts,
        getAllProducts,
        singleProduct,
        getSingleProductsById,
        setSingleProduct,
        quantities,
        setQuantities,
        plusQuantity,
        minusQuantity,
        totalPrice,
        setTotalPrice,
        toggle,
        setToggle,
        filterProducts,
        setFilterProducts,
        getDeliveryDetails,
        addDeliveryDetails,
        setPaymentDetails,
        paymentDetails,
        imgUrl,
        setImageUrl,
        role,
        setRole,
        editProducts,
        setEditProducts,
      }}
    >
      {children}
    </Product.Provider>
  );
};

export default ProductHandler;
