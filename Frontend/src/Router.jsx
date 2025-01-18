/* eslint-disable no-unused-vars */
import { useContext, useEffect, useState } from "react";
import "./App.css";
import ProductHandler, { Product } from "./context/Products";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Login from "./Authentication/Login";
import Register from "./Authentication/Register";
import ForgotPassword from "./Authentication/ForgotPassword";
import SeperateProducts from "./routes/SeperateProducts";
import Nav from "./components/Nav";
import SingleViewProducts from "./routes/SingleViewProducts";
import { Provider } from "react-redux";
import store from "./store/store";
import { ToastContainer } from "react-toastify";
import Checkout from "./components/Checkout";
import axios from "axios";
import Payment from "./components/Payment";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import PaymentSuccess from "./components/PaymentSuccess";
import PaymentError from "./components/PaymentError";
import MyOrders from "./components/MyOrders";
import Profile from "./components/Profile";
import FooterMenu from "./components/FooterMenu";
import Dashboard from "./Admin/Dashboard";

function Router() {
  const [stripeAPI, setStripeAPI] = useState(null);
  const { role, setRole } = useContext(Product);

  useEffect(() => {
    getStripeAPI();
  }, []);
  useEffect(() => {
    setRole(localStorage.getItem("role"));
    console.log("role", role);
  }, [role]);

  const getStripeAPI = async () => {
    try {
      const response = await axios.get(
        "https://supplement-application.onrender.com/api/v1/stripe/apiKey"
      );
      setStripeAPI(response.data);
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <div>
      <BrowserRouter>
        {role == "User" && <Nav></Nav>}

        {/* General Routes for both */}
        <Routes>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/register" element={<Register />}></Route>
          <Route path="/forgotPassword" element={<ForgotPassword />}></Route>
        </Routes>

        {/* User Routes */}
        {role == "User" && (
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/product/:name" element={<SeperateProducts />}></Route>
            <Route
              path="/products/:id"
              element={<SingleViewProducts />}
            ></Route>
            <Route path="/Checkout" element={<Checkout />}></Route>

            {stripeAPI && (
              <Route
                path="/payment"
                element={
                  <Elements stripe={loadStripe(stripeAPI)}>
                    <Payment />
                  </Elements>
                }
              ></Route>
            )}
            <Route path="/payment/success" element={<PaymentSuccess />}></Route>
            <Route path="/payment/error" element={<PaymentError />}></Route>
            <Route path="/MyOrders" element={<MyOrders />}></Route>
            <Route path="/profile" element={<Profile />}></Route>
          </Routes>
        )}

        {/* Admin Routes */}
        {role == "Admin" && (
          <Routes>
            <Route path="/" element={<Dashboard />}></Route>
          </Routes>
        )}
        {role == "User" && <FooterMenu />}
      </BrowserRouter>
    </div>
  );
}

export default Router;
