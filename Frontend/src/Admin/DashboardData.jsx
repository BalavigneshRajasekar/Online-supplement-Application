/* eslint-disable no-unused-vars */
import { Box } from "@mui/material";
import React from "react";
import { FaTruckMoving } from "react-icons/fa";
import { MdOutlineShoppingCart } from "react-icons/md";
import { FaRupeeSign } from "react-icons/fa";

function DashboardData() {
  return (
    <Box>
      <div className="p-7">
        <h4>Total Revenue</h4>
        <h2 className="font-bold">
          <FaRupeeSign className="inline-block" />
          12,00000
        </h2>
      </div>
      <div className="flex flex-col justify-evenly gap-5 p-3 flex-md-row ">
        {/* Shipped Orders */}
        <div className="border w-100 rounded-2xl div1">
          <h3 className="font-bold ps-9 pt-7 text-white">Shipped orders</h3>
          <div className="flex justify-between ">
            <FaTruckMoving
              className=" text-gray-300 opacity-30 ms-2 mt-3 -rotate-12"
              size={"100px"}
            />
            <span className="homeText px-7">20</span>
          </div>
        </div>
        {/* Pending orders */}
        <div className="border w-100 rounded-2xl div2">
          <h3 className="font-bold ps-9 pt-7 text-white  ">Pending orders</h3>
          <div className="flex justify-between ">
            <MdOutlineShoppingCart
              className="-rotate-12 text-gray-300 opacity-30 ms-2 mt-3"
              size={"100px"}
            />
            <span className="homeText px-7">20</span>
          </div>
        </div>
        {/* New orders */}
        <div className="border w-100 rounded-2xl div3">
          <h3 className="font-bold ps-9 pt-7 text-white">New orders</h3>
          <div className="flex justify-end">
            <span className="homeText px-7">20</span>
          </div>
        </div>
      </div>
    </Box>
  );
}

export default DashboardData;
