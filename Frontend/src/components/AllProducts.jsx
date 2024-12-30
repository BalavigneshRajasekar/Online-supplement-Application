/* eslint-disable no-unused-vars */
import { Button, Divider, Grid2 } from "@mui/material";
import React, { useContext, useEffect } from "react";
import { Card } from "flowbite-react";
import { Grid, Rate } from "antd";
import useConfig from "antd/es/config-provider/hooks/useConfig";
import { Product } from "../context/Products";
import { useNavigate } from "react-router-dom";

function AllProducts() {
  const { products } = useContext(Product);
  const navigate = useNavigate();

  useEffect(() => {
    console.log(products);
  });

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
              navigateToProducts("Protein");
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
              navigateToProducts("preworkout");
            }}
          >
            <img src="oncreatine.jpg" width={"50%"}></img>
            <span>Pre Workout</span>
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
                <a href="#">
                  <h5 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white text-red-700">
                    {prod.name}
                  </h5>
                </a>
                <div>
                  <Button>-</Button>0<Button>+</Button>
                </div>
                <Rate disabled value={"2"}></Rate>

                <div className="flex items-center justify-between">
                  <span className="text-3xl font-bold text-gray-900 dark:text-white">
                    {`Rs : ${prod.price}`}
                  </span>
                  <a
                    href="#"
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
