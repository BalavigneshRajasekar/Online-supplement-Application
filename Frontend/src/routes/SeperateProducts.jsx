/* eslint-disable no-unused-vars */
import axios from "axios";
import { Button } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { HiArrowLeft, HiHome } from "react-icons/hi";
import { Card, Breadcrumb } from "flowbite-react";
import { Rate } from "antd";
import { Grid2 } from "@mui/material";
import { Select } from "antd";

function SeperateProducts() {
  const [seperateProduct, setSeperateProduct] = useState([]);
  const [quantity, setQuantity] = useState("");
  const navigate = useNavigate();
  const params = useParams();

  // Function goes here
  useEffect(() => {
    console.log(params.name);

    getParticularProducts();
  }, [params.name]);

  const getParticularProducts = async () => {
    try {
      let response = await axios.get(
        `https://supplement-application.onrender.com/api/p1/products/type/${params.name}`
      );
      console.log(response.data);
      setSeperateProduct(response.data);
    } catch (e) {
      console.error("Error fetching products:", e);
    }
  };
  const handleChange = (event) => {
    console.log(event);
    setQuantity(event);
  };

  return (
    <>
      <div className="mt-10">
        <Button
          color="dark"
          onClick={() => {
            navigate("/");
          }}
        >
          <HiArrowLeft className="mr-2 h-5 w-5" />
          Back
        </Button>
        <Breadcrumb aria-label="Default breadcrumb example" className="mt-10">
          <Breadcrumb.Item href="/" icon={HiHome}>
            Home
          </Breadcrumb.Item>

          <Breadcrumb.Item>{params.name}</Breadcrumb.Item>
        </Breadcrumb>

        {seperateProduct.length > 0 ? (
          <Grid2
            container
            spacing={2}
            sx={{
              justifyContent: "space-around",
              marginLeft: { xs: 2, md: 3 },
            }}
          >
            {/* Products List */}
            {seperateProduct.map((prod, index) => (
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
      </div>
    </>
  );
}

export default SeperateProducts;
