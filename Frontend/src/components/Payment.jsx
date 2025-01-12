/* eslint-disable no-unused-vars */
import React, { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Product } from "../context/Products";
import {
  CardCvcElement,
  CardExpiryElement,
  CardNumberElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { Box, Grid2 } from "@mui/material";
import { setCart } from "../store/slice";

function Payment() {
  const { cart, deliveryDetails } = useSelector((state) => state.products);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const element = useElements();
  const stripe = useStripe();
  const { totalPrice } = useContext(Product);

  // Payment data need to send server
  const paymentData = {
    amount: totalPrice,
    shipping: {
      name: deliveryDetails.Name,
      address: {
        city: deliveryDetails.City,
        line1: deliveryDetails.Address,
        postal_code: deliveryDetails.Pincode,
        country: deliveryDetails.Country,
        state: deliveryDetails.State,
      },
      phone: deliveryDetails.Phone,
    },
  };
  useEffect(() => {}, []);

  // Here we get the payment intent from server and validate the payment
  const handleSubmit = async (e) => {
    e.preventDefault();

    const loading = toast.loading("Payment Processing.....");
    const btn = document.querySelector("btn");

    try {
      const response = await axios.post(
        "https://supplement-application.onrender.com/api/v1/payment",
        paymentData,
        {
          headers: {
            Authorization: localStorage.getItem("logToken"),
          },
        }
      );

      const result = await stripe.confirmCardPayment(
        response.data.clientSecret,
        {
          payment_method: {
            card: element.getElement(CardNumberElement),
            billing_details: {
              name: deliveryDetails.Name,
              email: deliveryDetails.Email,
            },
          },
        }
      );
      console.log(result);

      if (result.error) {
        console.error("Payment failed:", result.error);
        return;
      } else {
        if ((await result).paymentIntent.status === "succeeded") {
          localStorage.removeItem("cart"); // remove from localStorage
          dispatch(setCart(null)); // reset cart state
          toast.update(loading, {
            type: "success",
            isLoading: false,
            autoClose: 3000,
            progress: undefined,
            draggable: true,
            closeButton: true,
            render: "Payment successfully done",
          });
          navigate("/");
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
        render: e.response.data.message,
      });
    }
  };
  return (
    <div className="w-100 mt-10">
      <h1>Card details</h1>
      <Box
        className="p-5  bg-dark rounded-lg "
        sx={{ width: { xs: "100%", md: "50%" } }}
      >
        <form onSubmit={handleSubmit} className="w-100">
          <CardNumberElement className="form-control h-16"></CardNumberElement>
          <Grid2 container spacing={3} sx={{ marginTop: 5 }}>
            <Grid2 size={8}>
              <CardExpiryElement className="form-control h-16"></CardExpiryElement>
            </Grid2>
            <Grid2 size={4}>
              <CardCvcElement className="form-control h-16"></CardCvcElement>
            </Grid2>
          </Grid2>
          <button
            id="btn"
            type="submit"
            className="w-100 mt-3 bg-green-500 hover:bg-green-700 rounded-md text-white h-10 "
          >
            Pay Now -{" "}
            <span className="text-lg font-bold">Rs. {totalPrice}</span>
          </button>
        </form>
      </Box>
    </div>
  );
}

export default Payment;
