/* eslint-disable no-unused-vars */
import { Box } from "@mui/material";
import { Avatar } from "antd";
import React from "react";
import { FaRegUserCircle } from "react-icons/fa";
import { IoMail } from "react-icons/io5";

function NewCustomers() {
  return (
    <div
      className="flex gap-5 border p-3 mt-3 rounded-md"
      style={{ width: "fit-Content" }}
    >
      <Avatar></Avatar>
      <h3 className="font-monospace">
        {" "}
        <FaRegUserCircle className="inline-block mr-3 text-gray-300" />
        Vicky
      </h3>
      <h3 className="font-monospace">
        <IoMail className="inline-block mr-3 text-gray-300" /> Vicky@gmail.com
      </h3>
    </div>
  );
}

export default NewCustomers;
