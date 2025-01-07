/* eslint-disable react/no-unescaped-entities */
/* eslint-disable no-unused-vars */
import { Button, Form, Input } from "antd";
import axios from "axios";
import React, { useState } from "react";
import { toast } from "react-toastify";

function ForgotPassword() {
  const [code, setCode] = useState(false);
  console.log(code);

  const onFinish = async (values) => {
    const id = toast.loading("wait for a moment...");
    try {
      const response = await axios.post(
        "https://supplement-application.onrender.com/api/reset/resetCode",
        values
      );
      toast.update(id, {
        render: response.data.message,
        type: "success",
        isLoading: false,
        autoClose: 5000,
        progress: undefined,
        draggable: true,
        closeButton: true,
      });
      localStorage.setItem("resetCode", response.data.data);
      setCode(true);
    } catch (err) {
      setCode(false);
      toast.update(id, {
        render: err.response.data.message,
        type: "error",
        isLoading: false,
        autoClose: 5000,
        progress: undefined,
        draggable: true,
        closeButton: true,
      });
    }
  };

  const handleCode = async (e) => {
    let resetCode = e.target.value;
    if (resetCode.length >= 5) {
      const id = toast.loading("wait for a moment...");
      try {
        const response = await axios.post(
          "https://supplement-application.onrender.com/api/resetPassword/password",
          { code: resetCode },
          {
            headers: {
              Authorization: localStorage.getItem("resetCode"),
            },
          }
        );
        toast.update(id, {
          render: response.data.message,
          type: "success",
          isLoading: false,
          autoClose: 3000,
          progress: undefined,
          draggable: true,
          closeButton: true,
        });
        setCode(false);
      } catch (err) {
        toast.update(id, {
          render: err.response.data.message,
          type: "error",
          isLoading: false,
          autoClose: 3000,
          progress: undefined,
          draggable: true,
          closeButton: true,
        });
        setCode(true);
      }
    }
  };
  return (
    <div className="center-div">
      <div className="form-container">
        <div className="logo-container">
          {code ? "Check mail for Reset code" : "Forgot Password"}
        </div>
        {code ? (
          <div>
            <input
              placeholder="Enter reset Code"
              className="w-100 p-3 border-1 rounded-1 border-green-800"
              onChange={handleCode}
            ></input>
          </div>
        ) : (
          <>
            <Form className="form" onFinish={onFinish}>
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <Form.Item
                  name="userMail"
                  rules={[
                    {
                      required: true,
                      message: "Please enter your email",
                      type: "email",
                    },
                  ]}
                >
                  <Input placeholder="Enter your email"></Input>
                </Form.Item>
              </div>

              <Button
                className="form-submit-btn"
                htmlType="submit"
                type="primary"
                color="green"
              >
                Send Email
              </Button>
            </Form>

            <p className="signup-link">
              Don't have an account?
              <a href="#" className="signup-link link">
                {" "}
                Sign up now
              </a>
            </p>
          </>
        )}
      </div>
    </div>
  );
}

export default ForgotPassword;
