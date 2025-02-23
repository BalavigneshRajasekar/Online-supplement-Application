/* eslint-disable no-unused-vars */
import { Button, Chip, Divider, Grid2 } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { Badge } from "flowbite-react";
import { Card, message, Rate } from "antd";
import { Product } from "../context/Products";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addCart } from "../store/slice";
import { LiaRupeeSignSolid } from "react-icons/lia";
import ScrollAnimation from "react-animate-on-scroll";
import { IoArrowBackCircle } from "react-icons/io5";
import Search from "antd/es/transfer/search";
import { IoArrowForwardCircle } from "react-icons/io5";
function AllProducts() {
  const {
    products,
    quantities,
    plusQuantity,
    minusQuantity,
    filterProducts,
    setFilterProducts,
  } = useContext(Product);
  const cart = useSelector((state) => state.products.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Pagination data set
  const [currentPage, setCurrentPage] = useState(0);
  const productPerPage = 8;
  const pageNumber = Math.ceil(
    products && filterProducts.length / productPerPage
  );
  let start = currentPage * productPerPage;
  let end = start + productPerPage;

  const changePage = (n) => {
    setCurrentPage(n);
  };
  const forwardChange = () => {
    if (currentPage < pageNumber - 1) {
      setCurrentPage((prev) => prev + 1);
    }
  };
  const backwardChange = () => {
    if (currentPage > 0) {
      setCurrentPage((prev) => prev - 1);
    }
  };
  // Navigate to particular Products
  const navigateToProducts = (name) => {
    navigate(`/product/${name}`);
  };

  // Add to cart action
  const addProductToCart = (prod) => {
    if (localStorage.getItem("logToken")) {
      dispatch(
        addCart({
          id: prod._id,
          name: prod.name,
          price: prod.price,
          quantity: quantities[prod._id],
          image: prod.image[0],
        })
      );
    } else {
      message.warning("Please Login to add product to cart");
    }
  };
  // Search filter action
  const searchByName = (e) => {
    setFilterProducts(
      products.filter((product) =>
        product.name.toLowerCase().includes(e.target.value)
      )
    );
    console.log(filterProducts);
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
            <img src="protein.jpg" style={{ width: "40%" }}></img>
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
            <img src="onmass.jpg" style={{ width: "40%" }}></img>
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
            <img src="oncreatine.jpg" width={"40%"}></img>
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
      <Search
        prefixCls="p-2 "
        placeholder="Search Products"
        onChange={(e) => {
          searchByName(e);
        }}
      ></Search>
      <Card loading={!products.length > 0} className="mt-3 border-none">
        <Grid2
          container
          spacing={2}
          sx={{
            justifyContent: "space-around",
            marginLeft: { md: 3 },
          }}
        >
          {/* Products List */}

          {filterProducts.slice(start, end).map((prod, index) => (
            <Grid2
              key={index}
              size={{ xs: 12, md: 3 }}
              sx={{ justifyContent: "space-around", alignContent: "center" }}
            >
              <Card className=" min-h-full cardStyle shadow-inner">
                <img
                  src={prod.image[0]}
                  width={"120px"}
                  className="hover:scale-105 transition-all"
                ></img>
                <a onClick={() => navigate(`/products/${prod._id}`)}>
                  <h5 className="font-semibold tracking-tight text-gray-900 dark:text-white text-red-700">
                    {prod.name}
                  </h5>
                </a>
                <Chip
                  label={prod.quantity > 0 ? "In-stock" : "Out of Stock"}
                  color={prod.quantity > 0 ? "success" : "failure"}
                  sx={{ width: "fit-content", marginTop: "10px" }}
                ></Chip>
                <div className="d-flex gap-3 mt-3">
                  <Button
                    variant="contained"
                    sx={{ bgcolor: "orange" }}
                    onClick={() => minusQuantity(prod)}
                  >
                    -
                  </Button>
                  <span className="mt-2">
                    {quantities && quantities[prod._id]}
                  </span>
                  <Button
                    variant="contained"
                    sx={{ bgcolor: "orange" }}
                    onClick={() => plusQuantity(prod)}
                  >
                    +
                  </Button>
                </div>
                <Rate disabled value={"2"} className="mt-3"></Rate>

                <div className="d-flex items-center justify-between mt-3">
                  <span className="text-lg font-bold text-gray-900 dark:text-white">
                    <LiaRupeeSignSolid style={{ display: "inline-block" }} />{" "}
                    {parseInt(prod.price).toLocaleString("en-IN")}
                    <span className="ml-2 text-decoration-line-through text-red-700">
                      {prod.price + 500}
                    </span>
                  </span>

                  <a
                    onClick={() => addProductToCart(prod)}
                    className="rounded-lg bg-red-700 px-3 py-2.5 text-center text-sm font-medium text-white hover:bg-cyan-800 focus:outline-none focus:ring-4 focus:ring-cyan-300 dark:bg-cyan-600 dark:hover:bg-cyan-700 dark:focus:ring-cyan-800"
                  >
                    Add to cart
                  </a>
                </div>
              </Card>
            </Grid2>
          ))}
        </Grid2>
        <div className="d-flex justify-center mt-3 gap-4">
          <button style={{ fontSize: "30px" }} onClick={backwardChange}>
            <IoArrowBackCircle />
          </button>
          {[...Array(pageNumber).keys()].map((n) => (
            <button
              className={
                n == currentPage
                  ? "bg-red-500 border p-3 rounded-md transition-all"
                  : "border p-3 rounded-md transition-all"
              }
              key={n}
              onClick={() => changePage(n)}
            >
              {n}
            </button>
          ))}
          <button style={{ fontSize: "30px" }} onClick={forwardChange}>
            <IoArrowForwardCircle />
          </button>
        </div>
      </Card>
    </>
  );
}

export default AllProducts;
