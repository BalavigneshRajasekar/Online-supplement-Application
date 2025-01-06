/* eslint-disable no-unused-vars */
import React from "react";
import Nav from "./Nav";
import Offers from "./Offers";
import AllProducts from "./AllProducts";
import Footer from "./Footer";
import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import Cart from "./Cart";

function Home() {
  const product = useSelector((state) => state.products.products);
  console.log("home" + product);

  return (
    <div style={{ position: "relative" }} className="mt-5">
      <Offers></Offers>
      <AllProducts></AllProducts>
      <Footer></Footer>
    </div>
  );
}

export default Home;
