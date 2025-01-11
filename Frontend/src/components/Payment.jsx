/* eslint-disable no-unused-vars */
import React, { useContext, useEffect } from "react";
import { useSelector } from "react-redux";
import { Product } from "../context/Products";
import {
  CardCvcElement,
  CardExpiryElement,
  CardNumberElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { Button } from "antd";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

function Payment() {
  const { cart, deliveryDetails } = useSelector((state) => state.products);
  const navigate = useNavigate();
  const element = useElements();
  const stripe = useStripe();
  const { totalPrice } = useContext(Product);
  const paymentData = {
    amount: totalPrice,
    shipping: {
      name: deliveryDetails.Name,
      address: {
        city: deliveryDetails.City,
        postal_code: deliveryDetails.Pincode,
        country: deliveryDetails.Country,
        state: deliveryDetails.State,
      },
      phone: deliveryDetails.Phone,
    },
  };
  useEffect(() => {
    console.log("");
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:3000/api/v1/payment",
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
          toast.success("Payment Successful", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
          navigate("/");
        } else {
          toast.error("Payment Failed", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        }
      }
    } catch (e) {
      console.error("Error:", e);
    }
  };
  return (
    <div className="w-100 mt-10">
      {/* <div className="modal">
        <form className="form">
          <div className="separator">
            <hr className="line" />
            <p>or pay using credit card</p>
            <hr className="line" />
          </div>
          <div className="credit-card-info--form">
            <div className="input_container">
              <label htmlFor="password_field" className="input_label">
                Card holder full name
              </label>
              <input
                id="password_field"
                className="input_field"
                type="text"
                name="input-name"
                title="Inpit title"
                placeholder="Enter your full name"
              />
            </div>
            <div className="input_container">
              <label htmlFor="password_field" className="input_label">
                Card Number
              </label>
              <CardNumberElement
                id="password_field"
                className="input_field"
                type="number"
                name="input-name"
                title="Inpit title"
                placeholder="0000 0000 0000 0000"
              />
            </div>
            <div className="input_container">
              <label htmlFor="password_field" className="input_label">
                Expiry Date / CVV
              </label>
              <div className="split">
                <CardExpiryElement
                  id="password_field"
                  className="input_field"
                  type="text"
                  name="input-name"
                  title="Expiry Date"
                  placeholder="01/23"
                />
                <CardCvcElement
                  id="password_field"
                  className="input_field"
                  type="number"
                  name="cvv"
                  title="CVV"
                  placeholder="CVV"
                />
              </div>
            </div>
          </div>
          <button className="purchase--btn">Checkout</button>
        </form>
      </div> */}
      <h1>Card details</h1>
      <div className="p-5">
        <form onSubmit={handleSubmit}>
          <CardNumberElement
            className="form-control"
            options={{ style: { base: { fontSize: "16px" } } }}
          ></CardNumberElement>
          <CardExpiryElement
            className="form-control"
            options={{ style: { base: { fontSize: "16px" } } }}
          ></CardExpiryElement>
          <CardCvcElement
            className="form-control"
            options={{ style: { base: { fontSize: "16px" } } }}
          ></CardCvcElement>
          <Button type="primary" htmlType="submit">
            Submit Payment
          </Button>
        </form>
      </div>
    </div>
  );
}

export default Payment;
