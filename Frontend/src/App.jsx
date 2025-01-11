/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import "./App.css";
import ProductHandler from "./context/Products";
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
function App() {
  const [stripeAPI, setStripeAPI] = useState(null);

  useEffect(() => {
    getStripeAPI();
  }, []);

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
    <>
      <Provider store={store}>
        <ProductHandler>
          <BrowserRouter>
            <Nav></Nav>
            <Routes>
              <Route path="/login" element={<Login />}></Route>
              <Route path="/register" element={<Register />}></Route>
              <Route
                path="/forgotPassword"
                element={<ForgotPassword />}
              ></Route>
              <Route path="/" element={<Home />} />
              <Route
                path="/product/:name"
                element={<SeperateProducts />}
              ></Route>
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
            </Routes>
          </BrowserRouter>
        </ProductHandler>
      </Provider>
      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </>
  );
}

export default App;
