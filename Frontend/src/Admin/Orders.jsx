/* eslint-disable no-unused-vars */
import { Box, Typography } from "@mui/material";
import { Tag } from "antd";
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { FaRupeeSign } from "react-icons/fa";
import { Product } from "../context/Products";
import { useNavigate } from "react-router";
import { SyncOutlined } from "@ant-design/icons";

function Orders() {
  const { orders, getAllOrders } = useContext(Product);
  const navigate = useNavigate();
  useEffect(() => {
    // Fetching orders data from API
    getAllOrders(navigate);
  }, []);
  const viewOrders = (id) => {
    navigate(`/SingleViewOrder/${id}`);
  };
  return (
    <Box
      sx={{
        py: 4,
        display: "flex",
        flexDirection: "column",

        textAlign: "center",
      }}
    >
      <Typography variant="h1" className="ordersHeader">
        Total orders :{orders.length}
      </Typography>
      <Box>
        <table className="table  overflow-auto">
          <thead className="">
            <tr className="text-lg">
              <th>Order ID</th>
              <th>Customer Name</th>
              <th>Order Date</th>
              <th>Total Amount</th>
              <th>Payment Status</th>
              <th>Order Status</th>
              <th>Action</th>
            </tr>
          </thead>
          {orders.length > 0 ? (
            <tbody className="">
              {orders.map((order, i) => (
                <tr className="tableRow" key={i}>
                  <td>{order._id}</td>
                  <td>{order.paymentData.shipping.name}</td>
                  <td>{new Date(order.createdAt).toDateString()}</td>
                  <td>
                    <Tag
                      className="p-2"
                      color="green-inverse"
                      icon={<FaRupeeSign className="inline-block" />}
                    >
                      {order.paymentData.amount}
                    </Tag>
                  </td>
                  <td>
                    <Tag className="p-2" color="green-inverse">
                      {order.paymentData.status}
                    </Tag>
                  </td>
                  <td>
                    <Tag
                      className="p-2"
                      color="orange-inverse"
                      icon={<SyncOutlined spin />}
                    >
                      {order.orderStatus}
                    </Tag>
                  </td>
                  <td className="cursor-pointer">
                    <button
                      onClick={() => viewOrders(order._id)}
                      className="bg-sky-600 p-2 hover:bg-sky-700 active:scale-90 transition-all rounded-md"
                    >
                      View Order
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          ) : (
            <>Loading orders...</>
          )}
        </table>
      </Box>
    </Box>
  );
}

export default Orders;
