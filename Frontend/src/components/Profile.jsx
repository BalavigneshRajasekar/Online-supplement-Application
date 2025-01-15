/* eslint-disable no-unused-vars */
import React, { useContext, useEffect, useState } from "react";
import { Upload, Avatar, Button, message } from "antd";
import { UploadOutlined, UserOutlined } from "@ant-design/icons";
import { Product } from "../context/Products";
import { MdDeleteForever } from "react-icons/md";
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
        localStorage.setItem("profilePic", reader.result);
        setImageUrl(reader.result);
        console.log("1");
      };
      //Set read data as orginFileObj to display the profile
      reader.readAsDataURL(info.file.originFileObj);
      message.success("Image uploaded successfully");
    } else if (info.file.status === "error") {
      message.error("Failed to upload image");
    }
  };
  // Function to upload image to server
  const uploadToServer = (info) => {
    setTimeout(() => {
      info.onSuccess("ok");
    }, 0);
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
          {/* Display user information here */}
          <p>Name: John Doe</p>
          <p>Email: johndoe@example.com</p>
          <p>Phone: 1234567890</p>
          <p>Address: 123 Main St, Anytown, USA</p>
          {/* Update user information here */}
        </div>
      </div>
    </div>
  );
}

export default Profile;
