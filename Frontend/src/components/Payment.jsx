/* eslint-disable no-unused-vars */
import React, { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Product } from "../context/Products";
import { FaCreditCard } from "react-icons/fa";
import { RiVisaLine } from "react-icons/ri";
import { Badge } from "flowbite-react";
import { FaCcMastercard } from "react-icons/fa6";

import {
  CardCvcElement,
  CardExpiryElement,
  CardNumberElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import axios from "axios";
import { toast } from "react-toastify";
import { Outlet, useNavigate } from "react-router-dom";
import { Box, Button, Divider, Grid2 } from "@mui/material";
import { deleteCart, setCart } from "../store/slice";
import { List, Modal } from "antd";
import { LiaRupeeSignSolid } from "react-icons/lia";

function Payment() {
  const { cart, deliveryDetails } = useSelector((state) => state.products);
  const [openPaymentModel, setOpenPaymentModel] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const element = useElements();
  const stripe = useStripe();
  const { totalPrice, getDeliveryDetails, setPaymentDetails, paymentDetails } =
    useContext(Product);

  console.log(deliveryDetails);

  // Payment data need to send server
  let paymentData = {
    amount: totalPrice,
    shipping: {
      name: JSON.parse(localStorage.getItem("Shipping")).Name,
      address: {
        city: JSON.parse(localStorage.getItem("Shipping")).City,
        line1: JSON.parse(localStorage.getItem("Shipping")).Address,
        postal_code: JSON.parse(localStorage.getItem("Shipping")).PinCode,
        country: JSON.parse(localStorage.getItem("Shipping")).Country,
        state: JSON.parse(localStorage.getItem("Shipping")).State,
      },
      phone: JSON.parse(localStorage.getItem("Shipping")).Phone,
    },
  };

  //User send to home when cart is empty
  useEffect(() => {
    if (cart.length == 0) {
      navigate("/");
    }
  }, [cart]);

  // Here we get the payment intent from server and validate the payment
  const handleSubmit = async (e) => {
    e.preventDefault();

    const loading = toast.loading("Payment Processing.....");

    try {
      console.log(paymentData);

      //This call will get the clientSecret from server
      const response = await axios.post(
        "https://supplement-application.onrender.com/api/v1/payment",
        paymentData,
        {
          headers: {
            Authorization: localStorage.getItem("logToken"),
          },
        }
      );

      //Here we validate payment with client secret
      const result = await stripe.confirmCardPayment(
        response.data.clientSecret,
        {
          payment_method: {
            card: element.getElement(CardNumberElement),

            billing_details: {
              name: JSON.parse(localStorage.getItem("Shipping")).Name,
              email: JSON.parse(localStorage.getItem("Shipping")).Email,
            },
          },
        }
      );

      if (result.error) {
        console.error("Payment failed:", result.error);
        toast.update(loading, {
          type: "error",
          isLoading: false,
          autoClose: 3000,
          progress: undefined,
          draggable: true,
          closeButton: true,
          render: result.error.message,
        });

        return;
      } else {
        if ((await result).paymentIntent.status === "succeeded") {
          setPaymentDetails(result.paymentIntent);

          //API to Update Orders in DB
          const orderResponse = await axios.post(
            "https://supplement-application.onrender.com/api/v1/payment/myOrders",
            { cart: cart, paymentData: result.paymentIntent },
            {
              headers: {
                Authorization: localStorage.getItem("logToken"),
              },
            }
          );

          toast.update(loading, {
            type: "success",
            isLoading: false,
            autoClose: 3000,
            progress: undefined,
            draggable: true,
            closeButton: true,
            render: "Payment successfully done",
          });

          navigate("success");
        } else {
          toast.update(loading, {
            type: "error",
            isLoading: false,
            autoClose: 3000,
            progress: undefined,
            draggable: true,
            closeButton: true,
            render: result.error.message,
          });
          navigate("error");
        }
      }
    } catch (e) {
      console.log(e);

      toast.update(loading, {
        type: "error",
        isLoading: false,
        autoClose: 3000,
        progress: undefined,
        draggable: true,
        closeButton: true,
        render: "Server Error",
      });
    }
  };
  const closeModal = () => {
    setOpenPaymentModel(false);
  };
  return (
    <div className="w-100 mt-10 d-md-flex justify-around align-items-center d-xs-flex-col gap-1 p-3">
      <Modal open={openPaymentModel} onCancel={closeModal} footer={null}>
        <Box
          className="p-5  bg-dark rounded-lg "
          sx={{ width: { xs: "100%", md: "100%" } }}
        >
          <form onSubmit={handleSubmit} className="w-100">
            <h2 className="flex gap-3 p-3">
              <RiVisaLine color="white" />
              <FaCcMastercard color="white" />
            </h2>
            <CardNumberElement className="form-control h-16"></CardNumberElement>
            <Grid2 container spacing={3} sx={{ marginTop: 5 }}>
              <Grid2 size={8}>
                <CardExpiryElement className="form-control h-16"></CardExpiryElement>
              </Grid2>
              <Grid2 size={4}>
                <CardCvcElement className="form-control h-16"></CardCvcElement>
              </Grid2>
            </Grid2>
            <Button
              type="submit"
              variant="contained"
              color="success"
              sx={{ width: "100%", marginTop: 5 }}
              startIcon={<LiaRupeeSignSolid />}
            >
              <span className="text-lg font-bold">
                {parseInt(totalPrice).toLocaleString("en-IN")}- Pay Now
              </span>
            </Button>
          </form>
        </Box>
      </Modal>

      <Box
        sx={{
          width: { xs: "100%", md: "100%" },
          maxHeight: "100vh",

          overflow: "auto",
          padding: "20px",
        }}
      >
        {cart.length > 0 && (
          <>
            <List
              className="demo-loadmore-list"
              itemLayout="horizontal"
              dataSource={cart}
              renderItem={(item, index) => (
                <List.Item
                  actions={[
                    <a
                      key="list-loadmore-edit"
                      onClick={() => dispatch(deleteCart(item.id))}
                    >
                      Delete
                    </a>,
                  ]}
                  key={index}
                >
                  <List.Item.Meta
                    avatar={<img src={item.image} style={{ width: "50px" }} />}
                    style={{ maxHeight: "200px", overflow: "auto" }}
                    title={
                      <a
                        onClick={() => navigate(`/products/${item.id}`)}
                        style={{ minHeight: "10px" }}
                      >
                        {item.name}
                      </a>
                    }
                    description={
                      <p>
                        <b>Price:</b>
                        <LiaRupeeSignSolid
                          style={{ display: "inline-block" }}
                        />
                        {parseInt(item.price).toLocaleString("en-IN")}{" "}
                        <b>Quantity:</b>
                        {item.quantity}
                      </p>
                    }
                  />
                  <b>
                    subtotal :
                    <LiaRupeeSignSolid style={{ display: "inline-block" }} />
                    {parseInt(item.quantity * item.price).toLocaleString(
                      "en-IN"
                    )}
                  </b>
                </List.Item>
              )}
            />
            <Divider>Summary</Divider>
            <div className="bg-dark p-3 rounded-md">
              <div className="flex justify-between ">
                <h3 className="text-slate-400">Price : </h3>
                <Badge color="success">
                  <LiaRupeeSignSolid className="inline-block" />
                  {parseInt(totalPrice).toLocaleString("en-IN")}
                </Badge>
              </div>
              <div className="flex justify-between mt-3">
                <h3 className="text-slate-400">Shipping Charge : </h3>
                <Badge color="success">
                  <LiaRupeeSignSolid className="inline-block" />
                  {0}
                </Badge>
              </div>
              <div className="flex justify-between mt-3">
                <h3 className="text-slate-400">GST % : </h3>
                <Badge color="success">
                  <LiaRupeeSignSolid className="inline-block" />
                  {0}
                </Badge>
              </div>
            </div>
            <Divider>...</Divider>
            <div className="flex justify-between mt-3 bg-dark rounded-md p-3">
              <h3 className="text-slate-400">Total : </h3>
              <Badge color="success">
                <LiaRupeeSignSolid className="inline-block" />
                {parseInt(totalPrice).toLocaleString("en-IN")}
              </Badge>
            </div>
          </>
        )}
      </Box>
      <Divider orientation="vertical" textAlign="center" flexItem>
        Select Payments
      </Divider>
      <Box
        sx={{
          width: {
            xs: "100%",
            md: "100%",
          },

          overflow: "auto",
          padding: "20px",
          textAlign: "center",
          display: "flex",
          justifyContent: { xs: "flex-start", md: "center" },
          alignItems: { xs: "flex-start", md: "center" },
          flexFlow: "column",
          gap: "10px",
        }}
      >
        <Button
          variant="contained"
          color="success"
          startIcon={<FaCreditCard />}
          size="large"
          sx={{ width: "100%" }}
          onClick={() => setOpenPaymentModel(true)}
        >
          Card
        </Button>
        <Button
          variant="contained"
          disabled
          color="error"
          sx={{ width: "100%" }}
        >
          Pay on delivery
        </Button>
      </Box>
    </div>
  );
}

export default Payment;
