/* eslint-disable no-unused-vars */
import { Box } from "@mui/material";
import { Card } from "antd";
import { Button } from "flowbite-react";
import React from "react";
import { FaCartPlus } from "react-icons/fa6";

function SingleViewProducts() {
  return (
    <div>
      <Card className="w-100">
        <Box className="d-flex gap-5">
          <div style={{ height: "80vh", width: "30%" }}>
            <img src="/banner1.jpg" style={{ height: "100%" }}></img>
          </div>
          <div>
            <h3>Product Name</h3>
            <p>Product Description</p>
            <p>Price: $100</p>

            <Button color="success">
              Add to cart <FaCartPlus className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </Box>
      </Card>
    </div>
  );
}

export default SingleViewProducts;
