/* eslint-disable no-unused-vars */
import axios from "axios";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setMyOrders } from "../store/slice";
import { Button, Card, Divider, Empty, List, Tag } from "antd";
import { LiaRupeeSignSolid } from "react-icons/lia";
import { Badge } from "flowbite-react";
import { IoMdHome } from "react-icons/io";
import { FaCreditCard } from "react-icons/fa";
import { FaCheckCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

function MyOrders() {
  const { myOrders } = useSelector((state) => state.products);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    getMyOrders();
  }, []);

  const getMyOrders = async () => {
    try {
      const response = await axios.get(
        "https://supplement-application.onrender.com/api/v1/get/myOrders",
        {
          headers: {
            Authorization: localStorage.getItem("logToken"), // Use the logged-in user's token for authentication.
          },
        }
      );
      console.log(response.data);
      dispatch(setMyOrders(response.data.data));
    } catch (e) {
      console.error("Error fetching orders", e); // Log the error to the console for debugging purposes.
    }
  };
  return (
    <div className="mt-5">
      <Divider>My orders</Divider>
      <Button>Go back</Button>
      {myOrders.length > 0 ? (
        <div className="w-100 p-3">
          {myOrders.map((orders, i) => (
            <Card key={i} className="bg-slate-200 mt-3">
              <div className="bg-green-600 p-3 text-slate-800">
                <b className="block">Order ID : #DkUs_12{i + 1}</b>
                <b className="block">Payment ID :{orders.paymentData.id}</b>
              </div>

              <div>
                <List
                  className="demo-loadmore-list"
                  itemLayout="horizontal"
                  dataSource={orders.cart}
                  renderItem={(item, index) => (
                    <List.Item key={index} className="">
                      <List.Item.Meta
                        avatar={
                          <img src={item.image} style={{ width: "50px" }} />
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
                        <LiaRupeeSignSolid
                          style={{ display: "inline-block" }}
                        />
                        {item.quantity * item.price}
                      </b>
                    </List.Item>
                  )}
                />
              </div>
              <div>
                <Divider>Shipping Info</Divider>
                <div>
                  <Badge color="dark" size="sm" className="p-2">
                    <IoMdHome className="inline-block mr-2" />
                    {orders.paymentData.shipping.address.line1},
                    {orders.paymentData.shipping.address.city},
                    {orders.paymentData.shipping.address.state},
                  </Badge>
                </div>
                <Divider>Payment Info</Divider>
                <div>
                  <b className="mr-2 block">
                    Payment Method:{" "}
                    <FaCreditCard className="inline-block mr-2 ml-2" />
                    {orders.paymentData.payment_method_types[0]}{" "}
                  </b>

                  <b className="mr-2 block mt-2">
                    Payment Status:{" "}
                    <Tag
                      color="success"
                      icon={<FaCheckCircle className="inline-block mr-2" />}
                    >
                      {orders.paymentData.status}
                    </Tag>
                  </b>
                  <b className="block mt-2">
                    Amount Paid : <LiaRupeeSignSolid className="inline-block" />{" "}
                    {orders.paymentData.amount}
                  </b>
                </div>
                <Divider>Order Status</Divider>
               <div>
                
               </div>
              </div>
            </Card>
          ))}
        </div>
      ) : (
        <Empty description="No Orders"></Empty>
      )}
    </div>
  );
}

export default MyOrders;
