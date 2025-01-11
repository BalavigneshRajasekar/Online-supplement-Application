/* eslint-disable no-unused-vars */
import { Box, Divider } from "@mui/material";
import { Button, Form, Input, Select } from "antd";
import TextArea from "antd/es/input/TextArea";
import React, { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Avatar, List, Skeleton } from "antd";
import { LiaRupeeSignSolid } from "react-icons/lia";
import { useNavigate } from "react-router-dom";
import { Product } from "../context/Products";
import { toast } from "react-toastify";
import { setDeliveryDetails } from "../store/slice";
import axios from "axios";
let countries = null;
function Checkout() {
  const { cart, deliveryDetails } = useSelector((state) => state.products);
  const dispatch = useDispatch();
  const { totalPrice } = useContext(Product);
  const navigate = useNavigate();
  const onfinish = (value) => {
    dispatch(setDeliveryDetails(value));
    toast.success("Delivery details Added successfully");
  };
  useEffect(() => {
    console.log(cart);
    if (countries) {
      return;
    } else {
      getCountries(); // Fetch countries for dropdown
    }
    console.log(deliveryDetails);
  }, []);

  const getCountries = async () => {
    try {
      const response = await axios.get("https://api.countrylayer.com/v2/all", {
        params: {
          access_key: "3e38f13227f37777c078d16d6f2c2236",
        },
      });

      countries = response.data.map((key) => ({
        label: key.name,
        value: key.name,
      }));
      console.log(countries);
    } catch (e) {
      console.log(e);
    }
  };
  const processPayment = () => {
    // Payment gateway integration goes here
    if (deliveryDetails) {
      toast.success("Payment successful");
    } else {
      toast.warning("Please fill in the delivery details");
    }
  };
  return (
    <div className="mt-10 d-md-flex justify-around align-items-center d-xs-flex-col gap-1 p-3">
      <Box
        sx={{
          width: { xs: "100%", md: "40%" },
          height: { md: "100vh", xs: "" },
          backgroundColor: "#f5f5f5",
          borderRadius: "20px",

          marginTop: "30px",
        }}
      >
        <Form onFinish={onfinish} className="p-5">
          <h2 className="mb-5">Delivery details</h2>
          <Form.Item
            name="Name"
            rules={[{ required: true, message: "Plz enter name" }]}
          >
            <Input className="border" placeholder="Name" />
          </Form.Item>
          <Form.Item
            name="Email"
            rules={[
              { required: true, message: "Plz enter Email", type: "email" },
            ]}
          >
            <Input placeholder="Email" className="border" />
          </Form.Item>
          <Form.Item
            name="Address"
            rules={[{ required: true, message: "Plz enter Address" }]}
          >
            <TextArea placeholder="Address" size="large" className="border" />
          </Form.Item>
          <Form.Item
            name="City"
            rules={[{ required: true, message: "Plz enter City" }]}
          >
            <Input placeholder="City" className="border" />
          </Form.Item>
          <Form.Item
            name="State"
            rules={[{ required: true, message: "Plz enter State" }]}
          >
            <Input placeholder="State" className="border" />
          </Form.Item>
          <Form.Item
            name="Country"
            rules={[{ required: true, message: "Plz select country" }]}
          >
            <Select
              showSearch
              options={countries}
              size="large"
              defaultValue="Select Country"
              filterOption={(input, option) =>
                (option?.label ?? "")
                  .toLowerCase()
                  .includes(input.toLowerCase())
              }
            ></Select>
          </Form.Item>
          <Form.Item
            name="Pincode"
            rules={[{ required: true, message: "Plz enter Pincode" }]}
          >
            <Input placeholder="10001" type="number" className="border" />
          </Form.Item>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form>
      </Box>
      <Divider orientation="vertical" textAlign="center" flexItem>
        Checkout
      </Divider>
      <Box
        sx={{
          width: {
            xs: "100vw",
            md: "50%",
          },
          overflow: "auto",
          height: { md: "100vh", xs: "" },
        }}
      >
        {cart.length > 0 ? (
          <>
            <List
              className="demo-loadmore-list"
              itemLayout="horizontal"
              dataSource={cart}
              renderItem={(item, index) => (
                <List.Item key={index} style={{ marginRight: "100px" }}>
                  <Skeleton avatar title={false} loading={item.loading} active>
                    <List.Item.Meta
                      avatar={
                        <img src={item.image} style={{ width: "100px" }} />
                      }
                      title={
                        <a onClick={() => navigate(`/products/${item.id}`)}>
                          {item.name}
                        </a>
                      }
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
                  </Skeleton>
                </List.Item>
              )}
            />
            <Divider>Total Amount</Divider>
            <div className="flex justify-center mt-4">
              <button
                className="bg-green-600 hover:bg-green-700 text-white  border rounded-md p-2"
                onClick={() => processPayment()}
              >
                Proceed To pay - <LiaRupeeSignSolid className="inline-block" />
                {totalPrice}
              </button>
            </div>
          </>
        ) : (
          "No Items to show"
        )}
      </Box>
    </div>
  );
}

export default Checkout;
