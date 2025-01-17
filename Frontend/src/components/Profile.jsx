/* eslint-disable no-unused-vars */
import React, { useContext, useEffect, useState } from "react";
import { Upload, Avatar, Button, message } from "antd";
import { UploadOutlined, UserOutlined } from "@ant-design/icons";
import { Product } from "../context/Products";
import { MdDeleteForever } from "react-icons/md";
import axios from "axios";
import { toast } from "react-toastify";
function Profile() {
  const { imgUrl, setImageUrl } = useContext(Product);

  useEffect(() => {
    const profilePic = localStorage.getItem("profilePic");
    setImageUrl(profilePic);
  }, []);

  const handleUploadChange = (info) => {
    if (info.file.status === "done") {
      const reader = new FileReader();
      // Convert file to base64 string for preview
      reader.onload = () => {
        setImageUrl(reader.result);
        console.log("1");
      };
      //Set read data as orginFileObj to display the profile
      reader.readAsDataURL(info.file.originFileObj);
    } else if (info.file.status === "error") {
      message.error("Failed to upload image");
    }
  };
  // Function to upload image to server
  const uploadToServer = async (info) => {
    const load = toast.loading("Uploading Profile Picture ...");
    try {
      const formData = new FormData();
      formData.append("media", info.file);
      const response = await axios.post(
        "https://supplement-application.onrender.com/api/p1/profile/add",
        formData,
        {
          headers: {
            Authorization: localStorage.getItem("logToken"),
          },
        }
      );
      info.onSuccess("ok");
      toast.update(load, {
        render: response.data.message,
        type: "success",
        isLoading: false,
        autoClose: 3000,
        progress: undefined,
        draggable: true,
        closeButton: true,
      });
      localStorage.setItem("profilePic", response.data.data);
      console.log(response.data);
    } catch (e) {
      console.error("Failed to upload image", e);
      toast.update(load, {
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

  const removeProfile = () => {
    localStorage.removeItem("profilePic");
    setImageUrl(null);
    message.success("Profile removed successfully");
  };
  return (
    <div>
      <div className="mt-5 flex justify-center flex-col align-items-center gap-10">
        <Avatar src={imgUrl} icon={!imgUrl && <UserOutlined />} size={128}>
          {" "}
        </Avatar>
        <div className="flex gap-3">
          <Button
            variant="solid"
            color="danger"
            onClick={removeProfile}
            icon={<MdDeleteForever />}
          >
            Remove Profile
          </Button>
          <Upload
            showUploadList={false}
            onChange={handleUploadChange}
            accept="image/*"
            customRequest={uploadToServer}
          >
            <Button variant="solid" color="default" icon={<UploadOutlined />}>
              Add profile
            </Button>
          </Upload>
        </div>
        <div>
          <h2>Profile Information</h2>

          <p>Name: {localStorage.getItem("name")}</p>
          <p>Email: {localStorage.getItem("email")}</p>
        </div>
      </div>
    </div>
  );
}

export default Profile;
