/* eslint-disable no-unused-vars */
import { Button, Divider, Grid2 } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { Card } from "flowbite-react";
import { Rate } from "antd";
import { Product } from "../context/Products";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addCart } from "../store/slice";
import { LiaRupeeSignSolid } from "react-icons/lia";

function AllProducts() {
  const { products } = useContext(Product);
  const cart = useSelector((state) => state.products.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  console.log(cart);

  useEffect(() => {
    console.log(products);
  }, []);

  const navigateToProducts = (name) => {
    navigate(`/product/${name}`);
  };
  return (
    <>
      <Grid2 className="mt-10 " container spacing={2}>
        <Grid2 size={{ xs: 6, md: 3 }}>
          <Button
            sx={{ width: { xs: "200px", md: "300px" } }}
            variant="text"
            color="error"
            style={{ fontWeight: "800" }}
            className="imgBtnAction flex flex-col gap-3"
            onClick={() => {
              navigateToProducts("protein");
            }}
          >
            <img src="protein.jpg" style={{ width: "50%" }}></img>
            <span>Protein</span>
          </Button>
        </Grid2>
        <Grid2 size={{ xs: 6, md: 3 }}>
          <Button
            sx={{ width: { xs: "200px", md: "300px" } }}
            variant="text"
            color="error"
            style={{ fontWeight: "800" }}
            className="imgBtnAction flex flex-col gap-3"
            onClick={() => {
              navigateToProducts("MassGainer");
            }}
          >
            <img src="onmass.jpg" style={{ width: "50%" }}></img>
            <span>Mass Gainer</span>
          </Button>
        </Grid2>
        <Grid2 size={{ xs: 6, md: 3 }}>
          <Button
            sx={{ width: { xs: "200px", md: "300px" } }}
            variant="text"
            color="error"
            style={{ fontWeight: "800" }}
            className="imgBtnAction flex flex-col gap-3"
            onClick={() => {
              navigateToProducts("Creatine");
            }}
          >
            <img src="oncreatine.jpg" width={"50%"}></img>
            <span>Creatine</span>
          </Button>
        </Grid2>
        <Grid2 size={{ xs: 6, md: 3 }}>
          <Button
            sx={{ width: { xs: "200px", md: "300px" } }}
            variant="text"
            color="error"
            style={{ fontWeight: "800" }}
            className="imgBtnAction flex flex-col gap-3"
            onClick={() => {
              navigateToProducts("MultiVitamins");
            }}
          >
            <img src="multivitamins.jpg" width={"50%"}></img>
            <span>Multivitamins</span>
          </Button>
        </Grid2>
      </Grid2>
      <Divider style={{ fontSize: "30px" }}>All Products</Divider>
      {products.length > 0 ? (
        <Grid2
          container
          spacing={2}
          sx={{ justifyContent: "space-around", marginLeft: { xs: 2, md: 3 } }}
        >
          {/* Products List */}
          {products.map((prod, index) => (
            <Grid2
              key={index}
              size={{ xs: 12, md: 3 }}
              sx={{ justifyContent: "space-around", alignContent: "center" }}
            >
              <Card className="max-w-sm cardStyle">
                <img src={prod.image[0]} width={"200px"}></img>
                <a onClick={() => navigate(`/products/${prod._id}`)}>
                  <h5 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white text-red-700">
                    {prod.name}
                  </h5>
                </a>
                <div className="d-flex gap-3 mt-2">
                  <Button variant="contained" sx={{ bgcolor: "orange" }}>
                    -
                  </Button>
                  <span className="mt-2">{0}</span>
                  <Button variant="contained" sx={{ bgcolor: "orange" }}>
                    +
                  </Button>
                </div>
                <Rate disabled value={"2"}></Rate>

                <div className="flex items-center justify-between">
                  <span className="text-3xl font-bold text-gray-900 dark:text-white">
                    <LiaRupeeSignSolid style={{ display: "inline-block" }} />{" "}
                    {prod.price}
                  </span>
                  <a
                    onClick={() =>
                      dispatch(
                        addCart({
                          id: prod._id,
                          name: prod.name,
                          price: prod.price,
                          img: prod.image[0],
                          quantity: 1,
                        })
                      )
                    }
                    className="rounded-lg bg-red-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-cyan-800 focus:outline-none focus:ring-4 focus:ring-cyan-300 dark:bg-cyan-600 dark:hover:bg-cyan-700 dark:focus:ring-cyan-800"
                  >
                    Add to cart
                  </a>
                </div>
              </Card>
            </Grid2>
          ))}
        </Grid2>
      ) : (
        <h1>Loading Products...</h1>
      )}
    </>
  );
}
// className = "flex flex-wrap gap-4 justify-around m-4";
export default AllProducts;
