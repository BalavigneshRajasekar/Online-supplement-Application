/* eslint-disable no-unused-vars */
import React, { useContext, useEffect } from "react";
import { Button, Card, Result } from "antd";
import { Product } from "../context/Products";
function PaymentSuccess() {
  const { paymentDetails, setPaymentDetails } = useContext(Product);
  useEffect(() => {}, []);
  return (
    <div className="mt-10">
      <Card loading={!paymentDetails}>
        <Result
          status="success"
          title="Payment SuccessFull !!!"
          subTitle={`Payment ID : ${paymentDetails.id} , Paid Rupees : ${paymentDetails.amount}`}
          extra={[
            <Button type="primary" key="console">
              View Details
            </Button>,
            <Button key="buy">Home</Button>,
          ]}
        />
      </Card>
    </div>
  );
}

export default PaymentSuccess;
