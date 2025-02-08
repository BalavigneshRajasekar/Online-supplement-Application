/* eslint-disable no-unused-vars */
import React, { useContext, useRef, useState } from "react";
import { Box } from "@mui/material";
import { Button, Form, Input, Select, Upload } from "antd";
import { FaCloudUploadAlt } from "react-icons/fa";
import TextArea from "antd/es/input/TextArea";
import { toast } from "react-toastify";
import { DatePicker, Space } from "antd";
import axios from "axios";
import dayjs from "dayjs";
import { Product } from "../context/Products";

function AddProducts() {
  const [media, setMedia] = useState([]);
  const { getAllProducts } = useContext(Product);
  const form = useRef();

  const handleChange = (file) => {
    setMedia(file.fileList);
  };
  const handleUpload = (values) => {
    if (media.length == 0) {
      toast.error("Please select the Product picture");
      return;
    } else {
      //Add form values to form data
      let formData = new FormData();
      for (const key in values) {
        formData.append(key, values[key]);
      }
      // Add image to form data
      media.forEach((file) => {
        formData.append("image", file.originFileObj);
      });

      //Send form data to server
      sendProducts(formData);
    }
  };

  const sendProducts = async (formData) => {
    const load = toast.loading("Adding products...");
    try {
      const response = await axios.post(
        "https://supplement-application.onrender.com/api/admin/add",
        formData,
        {
          headers: {
            Authorization: localStorage.getItem("logToken"),
          },
        }
      );
      getAllProducts();
      setMedia([]);
      form.current.resetFields();
      toast.update(load, {
        render: response.data.message,
        type: "success",
        isLoading: false,
        autoClose: 3000,
        progress: undefined,
        draggable: true,
        closeButton: true,
      });
    } catch (e) {
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

  return (
    <>
      <h2 className="text-center font-mono p-5 bg-green-600 font-extrabold">
        Add New Products to store
      </h2>
      <Box
        sx={{ marginTop: "20px", display: "flex", justifyContent: "center",padding:"50px" }}
      >
        <Form className="form" onFinish={handleUpload} ref={form}>
          <Form.Item
            label="Product image"
            rules={[
              {
                required: true,
                message: "Plz select the Product picture",
              },
              {
                max: 2 * 1024 * 1024, // 2MB
                message: "File size should be less than or equal to 2MB",
              },
            ]}
          >
            <Upload
              fileList={media}
              beforeUpload={() => false}
              accept=".jpg,.png,.jpeg"
              onChange={handleChange}
            >
              <Button>
                <FaCloudUploadAlt className="text-4xl" />
              </Button>
            </Upload>
            <p>
              Only jpg, png, and jpeg images are allowed. Maximum file size is
              2MB.
            </p>
          </Form.Item>
          <Form.Item
            name="name"
            rules={[
              {
                required: true,
                message: "Please input the product name!",
              },
            ]}
          >
            <Input placeholder="Product Name" className="border"></Input>
          </Form.Item>
          <Form.Item
            name="price"
            rules={[
              {
                required: true,
                message: "Please input the product price!",
              },
            ]}
          >
            <Input placeholder="Price" className="border"></Input>
          </Form.Item>
          <Form.Item
            name="description"
            rules={[
              {
                required: true,
                message: "Please input the product description!",
              },
            ]}
          >
            <TextArea
              placeholder="Product description"
              className="border"
            ></TextArea>
          </Form.Item>
          <Form.Item
            name="quantity"
            rules={[
              {
                required: true,
                message: "Please input the product quantity!",
              },
            ]}
          >
            <Input placeholder="Product quantity" className="border"></Input>
          </Form.Item>
          <Form.Item
            name="expirationDate"
            label="Expiration Date"
            rules={[
              {
                required: true,
                message: "Please Select the Expiry Date!",
              },
            ]}
          >
            <DatePicker format={"MM/DD/YYYY"}></DatePicker>
          </Form.Item>
          <label>Select Category</label>
          <Form.Item
            name="category"
            rules={[
              {
                required: true,
                message: "Please Select the product category!",
              },
            ]}
          >
            <Select value="select">
              <Select.Option value="supplements">supplements</Select.Option>
              <Select.Option value="preworkout">preworkout</Select.Option>
              <Select.Option value="medicines">medicines</Select.Option>
            </Select>
          </Form.Item>
          <label>Select Supplement Type</label>
          <Form.Item
            name="supplementType"
            rules={[
              {
                required: true,
                message: "Please Select the supplementType !",
              },
            ]}
          >
            <Select value="select" className="w-100">
              <Select.Option value="protein">protein</Select.Option>
              <Select.Option value="MassGainer">MassGainer</Select.Option>
              <Select.Option value="Creatine">Creatine</Select.Option>
              <Select.Option value="MultiVitamins">MultiVitamins</Select.Option>
            </Select>
          </Form.Item>
          <Button htmlType="submit" variant="solid" type="primary">
            Add Products
          </Button>
        </Form>
      </Box>
    </>
  );
}

export default AddProducts;
