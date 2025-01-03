/* eslint-disable no-unused-vars */
import React from "react";
import Nav from "./Nav";
import Offers from "./Offers";
import AllProducts from "./AllProducts";
import Footer from "./Footer";
import { useSelector } from "react-redux";

function Home() {
  const product = useSelector((state) => state.products.products);
  console.log("home" + product);

  return (
    <div>
      <Offers></Offers>
      <AllProducts></AllProducts>
      <Footer></Footer>
    </div>
  );
}

export default Home;
