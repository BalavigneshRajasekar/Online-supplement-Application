/* eslint-disable react/no-unknown-property */
/* eslint-disable no-unused-vars */
import { Box } from "@mui/material";
import { Button, Form, Input } from "antd";
import { SiMailtrap } from "react-icons/si";
import { FaKey } from "react-icons/fa";
import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { ImConfused2 } from "react-icons/im";
import { MdSwitchAccount } from "react-icons/md";
import { FaArrowAltCircleRight } from "react-icons/fa";
import axios from "axios";
import { toast } from "react-toastify";
import { Product } from "../context/Products";
import GoogleLogin from "./GoogleLogin";

function Login() {
  const navigate = useNavigate();
  const { setRole } = useContext(Product);
  const onFinish = async (values) => {
    const id = toast.loading("logging In ....");
    try {
      const response = await axios.post(
        "https://supplement-application.onrender.com/api/login/users",
        values
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
      localStorage.setItem("logToken", response.data.token);
      localStorage.setItem("name", response.data.name);
      localStorage.setItem("email", response.data.email);
      localStorage.setItem("profilePic", response.data.image);
      localStorage.setItem("role", response.data.role);
      setRole(response.data.role);

      navigate("/");
    } catch (e) {
      console.log(e);

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
    <Box sx={{ display: "flex", justifyContent: "center", marginTop: "30px" }}>
      <Form className="form_container" onFinish={onFinish}>
        <div className="logo_container">
          <img src="logo.png"></img>
        </div>
        <div className="title_container">
          <p className="title">Login to your Account</p>
          <span className="subtitle">
            New products are waiting for you there, go and grab the offers and
            enjoy the day
          </span>
        </div>
        <br />

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
          iconPosition="end"
          icon={<FaArrowAltCircleRight />}
        >
          Sign-In
        </Button>

        <div class="separator">
          <hr class="line" />
          <span>Or</span>
          <hr class="line" />
        </div>

        <Button
          size="large"
          block
          style={{ backgroundColor: "black", color: "white" }}
          title="Sign In"
          className="sign-in_ggl"
          onClick={() => navigate("/register")}
          iconPosition="start"
          icon={<MdSwitchAccount />}
        >
          Register
        </Button>
        <Button
          block
          className="sign-in_apl"
          style={{ backgroundColor: "red", color: "white" }}
          iconPosition="start"
          icon={<ImConfused2 />}
          onClick={() => navigate("/forgotPassword")}
        >
          Forgot Password
        </Button>
        <p className="note">Terms of use &amp; Conditions</p>
        <GoogleLogin />
      </Form>
    </Box>
  );
}

export default Login;
