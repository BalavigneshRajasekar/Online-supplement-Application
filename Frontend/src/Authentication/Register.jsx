/* eslint-disable react/no-unknown-property */
/* eslint-disable no-unused-vars */
import { Box } from "@mui/material";
import { Button, Form, Input } from "antd";
import { SiMailtrap } from "react-icons/si";
import { FaKey } from "react-icons/fa";
import React from "react";
import { useNavigate } from "react-router-dom";
import { FaHandSparkles } from "react-icons/fa";
import { FaUserTag } from "react-icons/fa";
import { GiPartyPopper } from "react-icons/gi";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";

function Register() {
  const navigate = useNavigate();
  const onFinish = async (values) => {
    const id = toast.loading("please wait ....");
    try {
      const response = await axios.post(
        "https://supplement-application.onrender.com/api/register/users",
        values
      );
      console.log(response);
      toast.update(id, {
        render: response.data.message,
        type: "success",
        isLoading: false,
        autoClose: 3000,
        progress: undefined,
        draggable: true,
        closeButton: true,
      });
      navigate("/login");
    } catch (e) {
      toast.update(id, {
        render: e.response.data.message,
        type: "error",
        isLoading: false,
        autoClose: 3000,
        progress: undefined,
        draggable: true,
        closeButton: true,
      });
    }
  };
  return (
    <div>
      <Box
        sx={{ display: "flex", justifyContent: "center", marginTop: "30px" }}
      >
        <Form className="form_container" onFinish={onFinish}>
          <div className="logo_container">
            <img src="logo.png"></img>
          </div>
          <div className="title_container">
            <p className="title">Welcome to DarkKnight Supplements</p>
            <span className="subtitle">
              Get started with our app, just create an account and enjoy the
              experience.
            </span>
          </div>
          <br />
          <Form.Item
            style={{ width: "100%" }}
            name="username"
            rules={[
              {
                required: true,
                message: "Please input your Name!",
              },
            ]}
          >
            <Input placeholder="Enter User Name" prefix={<FaUserTag />} />
          </Form.Item>
          <Form.Item
            style={{ width: "100%" }}
            name="email"
            rules={[
              {
                required: true,
                message: "Please input your Email!",
                type: "email",
              },
            ]}
          >
            <Input placeholder="Enter Email" prefix={<SiMailtrap />} />
          </Form.Item>

          <Form.Item
            style={{ width: "100%" }}
            name="password"
            rules={[
              {
                required: true,
                message: "Please input your password",
              },
              {
                required: true,
                min: 6,
                message: "Password must be 6 character",
              },
            ]}
          >
            <Input.Password
              placeholder="Enter Password"
              showCount
              visibilityToggle
              prefix={<FaKey />}
            />
          </Form.Item>
          <Button
            type="primary"
            block
            className="sign-in_btn"
            htmlType="submit"
            iconPosition="start"
            icon={<GiPartyPopper />}
          >
            Register
          </Button>

          <div className="separator">
            <hr className="line" />
            <span>Or</span>
            <hr className="line" />
          </div>
          <Button
            size="large"
            block
            style={{ backgroundColor: "black", color: "white" }}
            title="Sign In"
            className="sign-in_ggl"
            onClick={() => navigate("/Login")}
            iconPosition="start"
            icon={<FaHandSparkles />}
          >
            Already have an account
          </Button>

          <p className="note">Terms of use &amp; Conditions</p>
        </Form>
      </Box>
    </div>
  );
}

export default Register;
