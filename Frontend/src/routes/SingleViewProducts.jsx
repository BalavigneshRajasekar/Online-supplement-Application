/* eslint-disable no-unused-vars */
import { Box, Chip } from "@mui/material";
import {
  Card,
  Rate,
  Collapse,
  Divider,
  List,
  Avatar,
  Form,
  Input,
  message,
} from "antd";
import { Button } from "flowbite-react";
import React, { useContext, useEffect, useRef } from "react";
import { FaCartPlus } from "react-icons/fa6";
import { HiArrowLeft } from "react-icons/hi";
import { FaTruck, FaTruckMonster } from "react-icons/fa";
import { BsCashCoin } from "react-icons/bs";
import { IoIosTime } from "react-icons/io";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Product } from "../context/Products";
import { LiaRupeeSignSolid } from "react-icons/lia";
import { Badge } from "flowbite-react";
import { useDispatch } from "react-redux";
import { addCart } from "../store/slice";
import { toast } from "react-toastify";
import axios from "axios";
const { TextArea } = Input;
// FAQ Questions
const items = [
  {
    key: "1",
    label: "When did I get My product",
    children:
      "All over TamilNadu you get the product by 2-3 business days, outside Tamilnadu you get by 4-5 Business days ",
  },
  {
    key: "2",
    label: "Refund Policies",
    children:
      "In some case asking for refund the returning box should not opened after Qa checking you get the money back by 7 days",
  },
  {
    key: "3",
    label: "Quality Assured ",
    children:
      "The product is certified by FSSI ,once you get the product please check with the QR",
  },
];

function SingleViewProducts() {
  const { id } = useParams();
  const formRef = useRef();
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const {
    singleProduct,
    getSingleProductsById,
    setSingleProduct,
    quantities,
    plusQuantity,
    minusQuantity,
  } = useContext(Product);
  const navigate = useNavigate();

  useEffect(() => {
    if (singleProduct) {
      setLoading(false);
      console.log(singleProduct);
    } else {
      setLoading(true);
    }
  }, [singleProduct]);

  //Get data for single product  on unmount value set to null
  useEffect(() => {
    getSingleProductsById(id);

    return () => {
      setSingleProduct(null);
    };
  }, []);

  //Add product review action when user logged in
  const addReview = async (value) => {
    const load = toast.loading("Review adding");

    try {
      const response = await axios.post(
        `http://localhost:3000/api/p1/products/${id}/review`,
        value,
        {
          headers: {
            Authorization: localStorage.getItem("logToken"),
          },
        }
      );
      getSingleProductsById(id);
      formRef.current.resetFields();
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
      setLoading(false);
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

  const addProductToCart = (prod) => {
    if (localStorage.getItem("logToken")) {
      dispatch(
        addCart({
          id: prod._id,
          name: prod.name,
          price: prod.price,
          quantity: quantities[prod._id],
          image: prod.image[0],
        })
      );
    } else {
      message.warning("Please Login to add product to cart");
    }
  };
  return (
    <div className="mt-20">
      <Button color="dark" className="mt-4" onClick={() => navigate("/")}>
        <HiArrowLeft className="mr-2 h-5 w-5" />
        Back
      </Button>

      <Card className="w-100 mt-5" loading={loading}>
        {singleProduct && (
          <Box className="d-md-flex gap-5">
            <Box
              sx={{
                height: { sm: " 300px", md: "80vh" },
                width: { xs: "50%", md: "50%" },
              }}
            >
              <img src={singleProduct.image[0]} style={{ height: "50%" }}></img>
            </Box>
            <div>
              <h2>{singleProduct.name}</h2>
              <Rate count={5} disabled value={2} className="mt-3"></Rate>
              <span className="text-lg ml-3">{`(${singleProduct.reviews.length}reviews)`}</span>
              <h3 className="mt-3">{singleProduct.description}</h3>
              <Chip
                label={singleProduct.quantity > 0 ? "In-stock" : "Out of Stock"}
                color={singleProduct.quantity > 0 ? "success" : "failure"}
              ></Chip>
              <h3 className="font-bold mt-9 inline-block m;-3">
                <LiaRupeeSignSolid style={{ display: "inline-block" }} />
                {singleProduct.price}
              </h3>
              <span className="inline-block ml-3 text-decoration-line-through text-red-700">
                {singleProduct.price + 500}
              </span>

              <div className="d-flex gap-3 mt-5">
                <Button
                  color="warning"
                  onClick={() => minusQuantity(singleProduct)}
                >
                  -
                </Button>
                <span className="mt-2">{quantities[singleProduct._id]}</span>
                <Button
                  color="warning"
                  onClick={() => plusQuantity(singleProduct)}
                >
                  +
                </Button>
              </div>
              <div className="d-flex gap-16 mt-5">
                <div>
                  <FaTruck size={"40px"} />
                  <span style={{ fontSize: "20px" }}>Free delivery</span>
                </div>
                <div>
                  <BsCashCoin size={"40px"} />
                  <span style={{ fontSize: "20px" }}>COD Available</span>
                </div>

                <div>
                  <IoIosTime size={"40px"} />
                  <span style={{ fontSize: "20px" }}>4-5 Business days</span>
                </div>
              </div>
              <Button
                color="success"
                className="mt-5"
                onClick={() => addProductToCart(singleProduct)}
              >
                Add to cart <FaCartPlus className="ml-2 h-5 w-5" />
              </Button>
              <Collapse
                style={{ border: "1px solid green" }}
                className="mt-3"
                items={items}
                size="large"
                ghost
              ></Collapse>
            </div>
          </Box>
        )}
      </Card>

      <Card loading={loading}>
        {singleProduct && (
          <>
            <Divider>{singleProduct.reviews.length} Reviews</Divider>
            <Box>
              {singleProduct.reviews.length > 0 && (
                <List
                  size="large"
                  itemLayout="horizontal"
                  dataSource={singleProduct.reviews}
                  renderItem={(item, index) => (
                    <List.Item>
                      <List.Item.Meta
                        avatar={index + 1}
                        title={item.user.username}
                        description={item.comment}
                      />
                    </List.Item>
                  )}
                />
              )}
            </Box>
            {localStorage.getItem("logToken") ? (
              <Form onFinish={addReview} ref={formRef}>
                <Form.Item name="comment">
                  <TextArea placeholder="Add Review"></TextArea>
                </Form.Item>
                <Form.Item>
                  <Button type="submit">Add</Button>
                </Form.Item>
              </Form>
            ) : (
              <Badge color="failure" className="w-100 d-flex justify-center">
                <p> Login to add reviews</p>
              </Badge>
            )}
          </>
        )}
      </Card>
    </div>
  );
}

export default SingleViewProducts;
