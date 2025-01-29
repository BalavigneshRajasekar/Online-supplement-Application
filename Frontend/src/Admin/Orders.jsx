/* eslint-disable no-unused-vars */
import { Box, Typography } from "@mui/material";
import { Tag } from "antd";
import React, { useEffect } from "react";
import { FaRupeeSign } from "react-icons/fa";

function Orders() {
  useEffect(() => {
    
  }, []);
  return (
    <Box
      sx={{
        py: 4,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        textAlign: "center",
      }}
    >
      <Typography variant="h1">Total orders :30</Typography>
      <Box>
        <table className="table  w-100 table-striped overflow-auto">
          <thead className="">
            <tr>
              <th>Order ID</th>
              <th>Customer Name</th>
              <th>Order Date</th>
              <th>Total Amount</th>
              <th>Payment Status</th>
              <th>Order Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody className="table-row-group ">
            <tr>
              <td>123456</td>
              <td>John Doe</td>
              <td>2022-01-01</td>
              <td>
                <Tag
                  color="green-inverse"
                  icon={<FaRupeeSign className="inline-block" />}
                >
                  2000
                </Tag>
              </td>
              <td>
                <Tag color="green-inverse">Done</Tag>
              </td>
              <td>Shipped</td>
              <td className="cursor-pointer">View Order</td>
            </tr>
          </tbody>
        </table>
      </Box>
    </Box>
  );
}

export default Orders;
