/* eslint-disable no-unused-vars */
import { useState } from "react";
import "./App.css";
import ProductHandler from "./context/Products";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Login from "./Authentication/Login";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <ProductHandler>
        <BrowserRouter>
          <Routes>
            <Route path="/login" element={<Login />}></Route>
            <Route path="/" element={<Home />} />
          </Routes>
        </BrowserRouter>
      </ProductHandler>
    </>
  );
}

export default App;
