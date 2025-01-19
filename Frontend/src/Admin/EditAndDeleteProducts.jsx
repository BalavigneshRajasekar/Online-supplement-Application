/* eslint-disable no-unused-vars */
import React, { useContext, useEffect, useState } from "react";
import { Product } from "../context/Products";
import { LiaRupeeSignSolid } from "react-icons/lia";
import { FaCloudUploadAlt } from "react-icons/fa";
import {
  Card,
  Modal,
  Button,
  Form,
  Input,
  Select,
  Upload,
  DatePicker,
} from "antd";
import { Chip, Grid2, IconButton } from "@mui/material";
import { CiEdit } from "react-icons/ci";
import TextArea from "antd/es/input/TextArea";
import dayjs from "dayjs";
import { toast } from "react-toastify";
import { AiFillDelete } from "react-icons/ai";
import axios from "axios";

function EditAndDeleteProducts() {
  const [media, setMedia] = useState([]);
  const { products, editProducts, setEditProducts, getAllProducts } =
    useContext(Product);
  useEffect(() => {
    console.log(products);
  }, []);

  //Set product image to media state
  const handleChange = (file) => {
    setMedia(file.fileList);
  };
  //get editing product and open edit form
  const edit = (product) => {
    // Navigate to edit product page
    console.log(product);
    setEditProducts(product);
  };

  // Merge Form data and Images and Dates
  const handleUpload = (value) => {
    console.log(value);
    console.log(dayjs(value.expirationDate).format("MM/DD/YYYY"));

    if (media.length == 0) {
      toast.error("Please select the Product picture");
      return;
    } else {
      //Add form values to form data
      let formData = new FormData();
      for (const key in value) {
        formData.append(key, value[key]);
      }
      // Add image to form data
      media.forEach((file) => {
        formData.append("image", file.originFileObj);
      });

      // Send form data to server
      updateEditChange(formData);
    }
  };

  const updateEditChange = async (formData) => {
    const load = toast.loading("Updating product...");
    try {
      const response = await axios.put(
        `https://supplement-application.onrender.com/api/admin/update/${editProducts._id}`,
        formData,
        {
          headers: {
            Authorization: localStorage.getItem("logToken"),
          },
        }
      );
      toast.update(load, {
        render: response.data.message,
        status: "success",
        isLoading: false,
        autoClose: 3000,
        progress: undefined,
        closeButton: true,
      });
      getAllProducts();
      setEditProducts(null);
    } catch (e) {
      toast.update(load, {
        render: e.response.data.message,
        status: "error",
        isLoading: false,
        autoClose: 3000,
        progress: undefined,
        closeButton: true,
      });
    }
  };

  //Delete products
  const deleteProduct = async (prod) => {
    const load = toast.loading("Delete Product...");
    try {
      const response = await axios.delete(
        `https://supplement-application.onrender.com/api/admin/delete/${prod._id}`,
        {
          headers: {
            Authorization: localStorage.getItem("logToken"),
          },
        }
      );
      getAllProducts();
      toast.update(load, {
        render: response.data.message,
        status: "success",
        isLoading: false,
        autoClose: 3000,
        progress: undefined,
        closeButton: true,
      });
    } catch (e) {
      toast.update(load, {
        render: e.response.data.message,
        status: "error",
        isLoading: false,
        autoClose: 3000,
        progress: undefined,
        closeButton: true,
      });
    }
  };
  return (
    <div>
      <Card loading={!products.length > 0} className="mt-3">
        <Grid2
          container
          spacing={2}
          sx={{
            justifyContent: "space-around",
            marginLeft: { xs: 2, md: 3 },
          }}
        >
          {/* Products List */}

          {products.map((prod, index) => (
            <Grid2
              key={index}
              size={{ xs: 12, md: 3 }}
              sx={{ justifyContent: "space-around", alignContent: "center" }}
            >
              <Card className="min-h-full cardStyle">
                <div className="flex items-center justify-between">
                  <IconButton color="success" onClick={() => edit(prod)}>
                    <CiEdit />
                  </IconButton>
                  <IconButton color="error" onClick={() => deleteProduct(prod)}>
                    <AiFillDelete />
                  </IconButton>
                </div>
                <img
                  src={prod.image[0]}
                  width={"200px"}
                  className="hover:scale-105 transition-all"
                ></img>
                <a>
                  <h5 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white text-red-700">
                    {prod.name}
                  </h5>
                </a>
                <Chip
                  label={prod.quantity > 0 ? "In-stock" : "Out of Stock"}
                  color={prod.quantity > 0 ? "success" : "failure"}
                  sx={{ width: "fit-content", marginTop: "10px" }}
                ></Chip>

                <div className="flex items-center justify-between mt-3">
                  <span className="text-lg font-bold text-gray-900 dark:text-white">
                    <LiaRupeeSignSolid style={{ display: "inline-block" }} />{" "}
                    {prod.price}
                    <span className="ml-2 text-decoration-line-through text-red-700">
                      {prod.price + 500}
                    </span>
                  </span>
                </div>
              </Card>
            </Grid2>
          ))}
        </Grid2>
      </Card>
      {/* Edit Form Model */}
      <Modal
        destroyOnClose
        open={editProducts}
        onCancel={() => setEditProducts(null)}
        onOk={() => setEditProducts(null)}
      >
        {/* Edit Product Form */}
        <Form
          className="form"
          onFinish={handleUpload}
          initialValues={{
            name: editProducts && editProducts.name,
            description: editProducts && editProducts.description,
            price: editProducts && editProducts.price,
            quantity: editProducts && editProducts.quantity,
            expirationDate: editProducts && dayjs(editProducts.expirationDate),
            category: editProducts && editProducts.category,
            supplementType: editProducts && editProducts.supplementType,
          }}
        >
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
      </Modal>
    </div>
  );
}

export default EditAndDeleteProducts;
