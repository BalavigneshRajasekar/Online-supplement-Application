/* eslint-disable no-unused-vars */
import React, { useContext, useEffect } from "react";
import { Button, Card, Result } from "antd";
import { Product } from "../context/Products";
import { LiaRupeeSignSolid } from "react-icons/lia";
import { Navigate, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setCart } from "../store/slice";
function PaymentSuccess() {
  const { paymentDetails, setPaymentDetails } = useContext(Product);
  const dispatch =useDispatch()
  const navigate = useNavigate();
  useEffect(() => {
      localStorage.removeItem("cart"); // remove from localStorage
      dispatch(setCart(null)); // reset cart state
    if(!paymentDetails){
          navigate('/')
    }
    // Playing success sound on successful payment
    const music = new Audio("/success.mp3");
    music.play();
  }, []);
  return (
    <div className="mt-10">
      <Card loading={!paymentDetails}>
        <Result
          status="success"
          title="Payment SuccessFull !!!"
          subTitle={`Payment ID : ${paymentDetails && paymentDetails.id} `}
          extra={[
            <h1 key="text">
              <LiaRupeeSignSolid className="inline-block" />
              {paymentDetails && paymentDetails.amount}
            </h1>,
            <Button
              type="primary"
              key="console"
              className="mt-5"
              onClick={() => navigate("/MyOrders")}
            >
              My orders
            </Button>,
            <Button key="buy" onClick={()=>navigate('/')}>Home</Button>,
          ]}
        />
      </Card>
    </div>
  );
}

export default PaymentSuccess;
