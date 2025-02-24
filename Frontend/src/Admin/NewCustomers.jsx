/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { Box } from "@mui/material";
import { Avatar } from "antd";
import React from "react";
import { FaRegUserCircle } from "react-icons/fa";
import { IoMail } from "react-icons/io5";

// eslint-disable-next-line react/prop-types
function NewCustomers({ customer }) {
  return (
    <div
      className="flex gap-5 justify-items-start  mt-3 rounded-md bg-gradient-to-b from-slate-700 to-slate-800 p-2 w-100 "
      style={{ width: "fit-Content" }}
    >
      <Avatar src={customer.image} alt="image"></Avatar>
      <h3 className="font-monospace text-start text-white">
        <FaRegUserCircle className="inline-block mr-3 text-gray-300 " />
        {customer.username}
      </h3>
      <h3 className="font-monospace text-end text-white">
        <IoMail className="inline-block mr-3 text-gray-300" /> {customer.email}
      </h3>
    </div>
  );
}

export default NewCustomers;
