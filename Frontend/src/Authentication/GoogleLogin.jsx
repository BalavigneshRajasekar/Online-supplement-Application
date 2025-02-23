/* eslint-disable no-unused-vars */
import React, { useContext } from "react";
import { auth, googleProvider, signInWithPopup } from "../firebaseConfig";
import axios from "axios";
import { Product } from "../context/Products";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";


function GoogleLogin() {
  const { setRole } = useContext(Product);
  const navigate = useNavigate();

  //Handle Google LOgin
  const handleLogin = async () => {
    const id = toast.loading("Google Login...");
    try {
      //Using firebase's signInWithPopup method to authenticate the user and generate Google jwt
      const result = await signInWithPopup(auth, googleProvider);
      const token = await result.user.getIdToken();

      //Send the token to Backend to validate and create our jwt
      const response = await axios.post(
        "https://supplement-application.onrender.com/api/googleLogin/login",
        {
          idToken: token,
        }
      );
      localStorage.setItem("logToken", response.data.token);
      localStorage.setItem("name", response.data.name);
      localStorage.setItem("email", response.data.email);
      localStorage.setItem("profilePic", response.data.image);
      localStorage.setItem("role", response.data.role);
      setRole(response.data.role);
      navigate("/");
      toast.update(id, {
        render: "Login Successful",
        type: "success",
        isLoading: false,
        autoClose: 3000,
        progress: undefined,
        draggable: true,
        closeButton: true,
      });
    } catch (e) {
      console.log(e);
      toast.update(id, {
        render: e.data.message,
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
    <div style={{ width: "100%" }}>
      <button
        onClick={handleLogin}
        role="button"
        className="border px-10 py-2 w-100 rounded-md active:scale-95 transition-all"
      >
        <img
          src="./glogin.png"
          alt="google image"
          style={{
            width: "40px",
            display: "inline-block",
            marginRight: "20px",
          }}
        ></img>
        Login with Google
      </button>
    </div>
  );
}

export default GoogleLogin;
