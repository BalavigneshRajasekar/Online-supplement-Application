/* eslint-disable no-unused-vars */
import React from "react";
import { Button, Result, Typography } from "antd";
import { useNavigate } from "react-router-dom";

function PaymentError() {
  const navigate = useNavigate();
  return (
    <div className="mt-10">
      <Result
        status="error"
        title="Payment Failed"
        subTitle="Please check and modify the following information before resubmitting."
        extra={[
          <Button key="buy" onClick={() => navigate("/payment")}>
            Try Again
          </Button>,
        ]}
      ></Result>
    </div>
  );
}

export default PaymentError;
