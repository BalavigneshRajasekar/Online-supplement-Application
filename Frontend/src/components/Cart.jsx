/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { Box } from "@mui/material";
import { Avatar, Button, Divider, List, Skeleton } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { LiaRupeeSignSolid } from "react-icons/lia";
import { useContext } from "react";
import { Product } from "../context/Products";
import { deleteCart } from "../store/slice";

function Cart(props) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const cart = useSelector((state) => state.products.cart);
  const { totalPrice, setTotalPrice } = useContext(Product);
  const { toggle, setToggle } = props;

  useEffect(() => {
    console.log("cart");

    const subTotal = cart.reduce(
      (acc, curr) => acc + curr.price * curr.quantity,
      0
    );
    setTotalPrice(subTotal);
    console.log(subTotal);
  }, [cart]);

  const goToCheckout = () => {
    navigate("/checkout");
    setToggle(false);
  };
  return (
    <Box
      className={props.toggle ? "toggle" : "transitions"}
      sx={{
        width: { xs: "100%", md: "30%" },
        height: "90dvh",
        bgcolor: "whitesmoke",
        overflow: "auto",
        padding: "20px",
        border: "1px solid black",
        borderRadius: "10px",
      }}
    >
      <Divider>{cart.length} Cart Items</Divider>
      {cart.length > 0 ? (
        <>
          <List
            className="demo-loadmore-list"
            itemLayout="horizontal"
            dataSource={cart}
            renderItem={(item, index) => (
              <List.Item
                actions={[
                  <a
                    key="list-loadmore-edit"
                    onClick={() => dispatch(deleteCart(item.id))}
                  >
                    Delete
                  </a>,
                ]}
                key={index}
              >
                <Skeleton avatar title={false} loading={item.loading} active>
                  <List.Item.Meta
                    avatar={<img src={item.image} style={{ width: "50px" }} />}
                    title={
                      <a onClick={() => navigate(`/products/${item.id}`)}>
                        {item.name}
                      </a>
                    }
                    description={
                      <p>
                        <b>Price:</b>
                        <LiaRupeeSignSolid
                          style={{ display: "inline-block" }}
                        />
                        {item.price} <b>Quantity:</b>
                        {item.quantity}
                      </p>
                    }
                  />
                  <b>
                    subtotal :
                    <LiaRupeeSignSolid style={{ display: "inline-block" }} />
                    {item.quantity * item.price}
                  </b>
                </Skeleton>
              </List.Item>
            )}
          />
          <Divider>one last step</Divider>
          <div className="flex justify-content-around">
            <p>
              Total :<LiaRupeeSignSolid style={{ display: "inline-block" }} />
              {totalPrice}
            </p>
            <Button type="primary" onClick={goToCheckout}>
              Go to checkout
            </Button>
          </div>
        </>
      ) : (
        "No Items to show"
      )}
    </Box>
  );
}

export default Cart;
