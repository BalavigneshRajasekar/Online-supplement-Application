/* eslint-disable no-unused-vars */
import React, { useContext, useEffect } from "react";
import { Button, Card, Result } from "antd";
import { Product } from "../context/Products";
import { LiaRupeeSignSolid } from "react-icons/lia";
import { Navigate, useNavigate } from "react-router-dom";
function PaymentSuccess() {
  const { paymentDetails, setPaymentDetails } = useContext(Product);
  const navigate = useNavigate();
  useEffect(() => {}, []);
  return (
    <div className="mt-10">
      <Card loading={!paymentDetails}>
        <Result
          status="success"
          title="Payment SuccessFull !!!"
          subTitle={`Payment ID : ${paymentDetails.id} `}
          extra={[
            <h1 key="text">
              <LiaRupeeSignSolid className="inline-block" />
              {paymentDetails.amount}
            </h1>,
            <Button
              type="primary"
              key="console"
              className="mt-5"
              onClick={() => navigate("/MyOrders")}
            >
              My orders
            </Button>,
            <Button key="buy">Home</Button>,
          ]}
        />
      </Card>
    </div>
  );
}

export default PaymentSuccess;
