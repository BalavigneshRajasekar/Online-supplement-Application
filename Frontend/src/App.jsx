/* eslint-disable no-unused-vars */
import { useState } from "react";
import "./App.css";
import ProductHandler from "./context/Products";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <ProductHandler>
        <BrowserRouter>
          <Routes>
            <Route
              path="/"
              element={<h1 className="text-red-500">Supplement Application</h1>}
            />
            <Route path="dashboard" element={<h1>Dashboard</h1>} />
          </Routes>
        </BrowserRouter>
      </ProductHandler>
    </>
  );
}

export default App;
