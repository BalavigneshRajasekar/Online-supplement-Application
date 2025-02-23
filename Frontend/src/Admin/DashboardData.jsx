/* eslint-disable no-unused-vars */
import { Box } from "@mui/material";
import React, { useContext, useEffect } from "react";
import { FaTruckMoving } from "react-icons/fa";
import { MdOutlineShoppingCart } from "react-icons/md";
import { FaRupeeSign } from "react-icons/fa";
import { Product } from "../context/Products";
import { useNavigate } from "react-router";
import { Card } from "antd";
import NewCustomers from "./NewCustomers";

function DashboardData() {
  const { orders, getAllOrders } = useContext(Product);
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
  }, []);
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
      <div className="px-4 py-3">
        <h2>New Customers</h2>
        <NewCustomers />
      </div>
    </Box>
  );
}

export default DashboardData;
