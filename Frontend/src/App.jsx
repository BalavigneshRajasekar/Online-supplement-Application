/* eslint-disable no-unused-vars */
import { useState } from "react";
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
function App() {
  const [count, setCount] = useState(0);

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
            </Routes>
          </BrowserRouter>
        </ProductHandler>
      </Provider>
    </>
  );
}

export default App;
