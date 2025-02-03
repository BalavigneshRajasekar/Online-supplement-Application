/* eslint-disable no-unused-vars */
import { Box } from "@mui/material";
import { Button, List, Tag } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { LiaRupeeSignSolid } from "react-icons/lia";
import { useNavigate, useParams } from "react-router";
import { IoPersonCircle } from "react-icons/io5";
import { IoCall } from "react-icons/io5";
import { FaMapPin } from "react-icons/fa";
import { IoArrowBackCircle } from "react-icons/io5";

function SingleViewOrder() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [singleOrder, setSingleOrder] = useState(null);
  useEffect(() => {
    // fetch order details with id
    getOrderByID();
  }, []);
  const getOrderByID = async () => {
    // fetch order details with id from API
    try {
      let response = await axios.get(
        `https://supplement-application.onrender.com/api/O1/get/orders/${id}`,
        {
          headers: {
            Authorization: localStorage.getItem("logToken"),
          },
        }
      );
      console.log(response.data);
      setSingleOrder(response.data.data);
    } catch (e) {
      console.log("Error fetching order details", e);
    }
  };
  return (
    <>
      {singleOrder ? (
        <Box sx={{ marginTop: 5 }}>
          <button onClick={() => navigate("/orders")}>
            <IoArrowBackCircle
              style={{ fontSize: "50px" }}
              className="active:scale-50 transition-all"
            />
          </button>
          <div className="p-3 d-flex flex-col gap-2 spanStyle">
            <h5>
              <Tag color="green-inverse" className="">
                Date:
              </Tag>
              <span>{new Date(singleOrder.createdAt).toDateString()}</span>
            </h5>
            <h5>
              <Tag color="gold-inverse">Order Id:</Tag>
              <span>{singleOrder._id}</span>
            </h5>
            <h5>
              <Tag color="green-inverse">Payment ID:</Tag>
              <span>{singleOrder.paymentData.id}</span>
            </h5>
            <h5>
              <Tag color="red-inverse">Payment Method: </Tag>
              <span> {singleOrder.paymentData.payment_method_types[0]}</span>
            </h5>
          </div>
          <div>
            <List
              className="demo-loadmore-list"
              itemLayout="horizontal"
              dataSource={singleOrder.products}
              renderItem={(item, index) => (
                <List.Item key={index} style={{ marginRight: "100px" }}>
                  <List.Item.Meta
                    avatar={<img src={item.image} style={{ width: "100px" }} />}
                    title={<a>{item.name}</a>}
                    description={
                      <p>
                        <b>Price:</b>
                        <LiaRupeeSignSolid
                          style={{ display: "inline-block" }}
                        />
                        {item.price} <b className="ml-5">Quantity:</b>{" "}
                        {item.quantity}
                      </p>
                    }
                  />
                  <b>
                    subtotal :
                    <LiaRupeeSignSolid style={{ display: "inline-block" }} />
                    {item.quantity * item.price}
                  </b>
                </List.Item>
              )}
            />
          </div>
          <div className="d-flex flex-column flex-md-row gap-4 p-3 justify-around">
            <div className="p-3 border shadow-md  ">
              <h2 className="">
                <img src="/fast-delivery.png" style={{ width: "70px" }}></img>
                <span>Delivery Details</span>
              </h2>
              <h3 className="m-1">
                <IoPersonCircle className="inline" />
                {singleOrder.paymentData.shipping.name}
              </h3>
              <h5 className="m-1">
                <IoCall className="inline" />
                {singleOrder.paymentData.shipping.phone}
              </h5>

              <p className="m-1">
                <FaMapPin className="inline" />
                {singleOrder.paymentData.shipping.address.line1}
              </p>
              <h5 className="m-1">
                {singleOrder.paymentData.shipping.address.state}
              </h5>
              <h5 className="m-1">
                {singleOrder.paymentData.shipping.address.country}
              </h5>
              <h5 className="m-1">
                {singleOrder.paymentData.shipping.address.city}
              </h5>
              <h5 className="m-1">
                {singleOrder.paymentData.shipping.address.postal_code}
              </h5>
            </div>
            <div className="d-flex flex-md-column justify-center  gap-5">
              <h5>
                <Tag color="green-inverse" className="">
                  Payment Received
                </Tag>
                <span>
                  : <LiaRupeeSignSolid className="inline" />
                  {singleOrder.paymentData.amount}
                </span>
              </h5>
              <button className="border p-3 rounded-md  bg-black text-white active:scale-95">
                Confirm Order
              </button>
            </div>
          </div>
        </Box>
      ) : (
        "loadingProducts..."
      )}
    </>
  );
}

export default SingleViewOrder;
