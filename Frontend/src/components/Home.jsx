/* eslint-disable no-unused-vars */
import React, { useContext, useEffect } from "react";
import Offers from "./Offers";
import AllProducts from "./AllProducts";
import { useDispatch, useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import Cart from "./Cart";
import { Product } from "../context/Products";
import FooterMenu from "./FooterMenu";
import { setCart } from "../store/slice";

function Home() {
  return (
    <div style={{ position: "relative" }} className="mt-5">
      <Offers></Offers>
      <AllProducts></AllProducts>
      <FooterMenu></FooterMenu>
    </div>
  );
}

export default Home;
