/* eslint-disable no-unused-vars */
import { Box } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { FaTruckMoving } from "react-icons/fa";
import { MdOutlineShoppingCart } from "react-icons/md";
import { FaRupeeSign } from "react-icons/fa";
import { Product } from "../context/Products";
import { useNavigate } from "react-router";
import { Card } from "antd";
import NewCustomers from "./NewCustomers";
import axios from "axios";

function DashboardData() {
  const { orders, getAllOrders } = useContext(Product);
  const [newCustomers, setNewCustomers] = useState([]);
  const totalRevenue = orders?.reduce(
    (acc, value) => acc + value.paymentData.amount,
    0
  );
  const shippedOrders = orders?.filter(
    (value) => value.orderStatus == "Shipped"
  );
  const newOrders = orders?.filter((value) => value.orderStatus == "New Order");
  const pending = orders?.filter(
    (value) =>
      value.orderStatus !== "Shipped" && value.orderStatus !== "New Order"
  );
  const navigate = useNavigate();
  useEffect(() => {
    getAllOrders(navigate);
    getNewCustomers();
  }, []);
  const getNewCustomers = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3000/api/o1/get/customers"
      );
      setNewCustomers(response.data.NewCustomer);
      console.log(response);
    } catch (e) {
      console.error("Error fetching new customers", e);
    }
  };
  return (
    <Box>
      <div className="p-7">
        <h4>Total Revenue</h4>

        {orders.length == 0 ? (
          <img src="./load.gif" style={{ width: "250px" }}></img>
        ) : (
          <h2 className="font-bold">
            <FaRupeeSign className="inline-block" />
            {totalRevenue && parseInt(totalRevenue).toLocaleString("en-IN")}
          </h2>
        )}
      </div>
      <div className="flex flex-col justify-evenly gap-5 p-3 flex-md-row ">
        {/* Shipped Orders */}

        <Card
          className="border w-100 rounded-2xl div1 "
          loading={orders.length == 0}
          style={{ height: "fit-content" }}
        >
          <h3 className="font-bold   text-white">Shipped orders</h3>
          <div className="flex justify-between ">
            <FaTruckMoving
              className=" text-gray-300 opacity-30  mt-3 -rotate-12"
              size={"100px"}
            />
            <span className="homeText px-7 ">
              {shippedOrders && shippedOrders.length}
            </span>
          </div>
        </Card>

        {/* Pending orders */}
        <Card
          className="border w-100 rounded-2xl div2"
          loading={orders.length == 0}
        >
          <h3 className="font-bold  text-white  ">Pending orders</h3>
          <div className="flex justify-between ">
            <MdOutlineShoppingCart
              className="-rotate-12 text-gray-300 opacity-30  mt-3"
              size={"100px"}
            />
            <span className="homeText px-7">{pending && pending.length}</span>
          </div>
        </Card>
        {/* New orders */}
        <Card
          className="border w-100 rounded-2xl div3"
          loading={orders.length == 0}
        >
          <h3 className="font-bold  text-white">New orders</h3>
          <div className="flex justify-end">
            <span className="homeText px-7">
              {newOrders && newOrders.length}
            </span>
          </div>
        </Card>
      </div>
      <div className="px-4 py-3 border w-fit m-3 rounded-lg shadow-inner">
        <h3>
          <input type="radio" checked style={{ color: "green" }}></input> New
          Customers
        </h3>
        {newCustomers.length > 0 ? (
          <div className="max-h-80 overflow-auto">
            {newCustomers.map((customer, i) => (
              <NewCustomers key={i} customer={customer} />
            ))}
          </div>
        ) : (
          <p>loading...</p>
        )}
      </div>
    </Box>
  );
}

export default DashboardData;
