/* eslint-disable no-unused-vars */
import { Box, Divider } from "@mui/material";
import { Button, Form, Input, Select } from "antd";
import TextArea from "antd/es/input/TextArea";
import React, { useContext, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Avatar, List, Skeleton } from "antd";
import { LiaRupeeSignSolid } from "react-icons/lia";
import { useNavigate } from "react-router-dom";
import { Product } from "../context/Products";
import { toast } from "react-toastify";
import { setDeliveryDetails } from "../store/slice";
const data = [
  { value: "India", label: "India" },
  { value: "united States", label: "United States" },
];
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
    console.log(deliveryDetails);
  }, []);

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
            <Input className="border" placeholder="Enter Name" />
          </Form.Item>
          <Form.Item
            name="Email"
            rules={[
              { required: true, message: "Plz enter Email", type: "email" },
            ]}
          >
            <Input placeholder="john.doe@example.com" className="border" />
          </Form.Item>
          <Form.Item
            name="Address"
            rules={[{ required: true, message: "Plz enter Address" }]}
          >
            <TextArea
              placeholder="123 Main St"
              size="large"
              className="border"
            />
          </Form.Item>
          <Form.Item
            name="City"
            rules={[{ required: true, message: "Plz enter City" }]}
          >
            <Input placeholder="New York" className="border" />
          </Form.Item>
          <Form.Item
            name="State"
            rules={[{ required: true, message: "Plz enter State" }]}
          >
            <Input placeholder="NY" className="border" />
          </Form.Item>
          <Form.Item
            name="Country"
            rules={[{ required: true, message: "Plz select country" }]}
          >
            <Select
              options={data}
              size="large"
              defaultValue="Select Country"
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
