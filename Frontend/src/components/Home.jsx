/* eslint-disable no-unused-vars */
import React, { useContext } from "react";
import Offers from "./Offers";
import AllProducts from "./AllProducts";
import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import Cart from "./Cart";
import { Product } from "../context/Products";
import FooterMenu from "./FooterMenu";

function Home() {
  const { setToggle } = useContext(Product);
  const product = useSelector((state) => state.products.products);
  console.log("home" + product);

  return (
    <div style={{ position: "relative" }} className="mt-5">
      <Offers></Offers>
      <AllProducts></AllProducts>
      <FooterMenu></FooterMenu>
    </div>
  );
}

export default Home;
