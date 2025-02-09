/* eslint-disable no-unused-vars */
import axios from "axios";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setMyOrders } from "../store/slice";
import { Button, Card, Divider, Empty, List, message, Steps, Tag } from "antd";
import { LiaRupeeSignSolid } from "react-icons/lia";
import { Badge } from "flowbite-react";
import { IoMdHome } from "react-icons/io";
import { FaCreditCard } from "react-icons/fa";
import { FaCheckCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { IoIosTime } from "react-icons/io";
import { FaShippingFast } from "react-icons/fa";
import { TiTick } from "react-icons/ti";
import { MdDeliveryDining } from "react-icons/md";
import { FaRocketchat } from "react-icons/fa";

const deliveryStatus = [
  "New Order",
  "Confirmed",
  "Shipped",
  "Out For Delivery",
  "Delivered",
];
function MyOrders() {
  const { myOrders } = useSelector((state) => state.products);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    getMyOrders();
  }, []);

  // Async function which going to get all user orders in server
  const getMyOrders = async () => {
    try {
      const response = await axios.get(
        "https://supplement-application.onrender.com/api/O1/get/myOrders",
        {
          headers: {
            Authorization: localStorage.getItem("logToken"), // Use the logged-in user's token for authentication.
          },
        }
      );
      console.log(response.data);
      dispatch(setMyOrders(response.data.data));
    } catch (e) {
      message.error(e.response.data.message);
      navigate("/login"); // Log the error to the console for debugging purposes.
    }
  };
  return (
    <div className="mt-5">
      <Divider>My orders</Divider>
      <Button onClick={() => navigate("/")}>Go back</Button>
      {myOrders.length > 0 ? (
        <div className="w-100 p-3">
          {myOrders.map((orders, i) => (
            <Card key={i} className="shadow-md bg-slate-50 mt-3">
              <Tag color="gold-inverse">
                {new Date(orders.createdAt).toDateString()}
              </Tag>
              <div className="bg-green-600 p-3 mt-3 text-slate-800 rounded-md">
                <b className="block">Order ID : #DkUs_12{i + 1}</b>
                <b className="block">Payment ID :{orders.paymentData.id}</b>
              </div>

              <div>
                <List
                  className="demo-loadmore-list"
                  itemLayout="horizontal"
                  dataSource={orders.products}
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
                  <Steps
                    responsive
                    current={deliveryStatus.findIndex(
                      //For Dynamic Update of Order status
                      (data) =>
                        data.toLowerCase() == orders.orderStatus.toLowerCase()
                    )}
                    items={[
                      {
                        title: "Processing",
                        icon: <IoIosTime className="inline-block" />,
                      },
                      {
                        title: "Confirmed",
                        icon: <FaRocketchat className="inline-block" />,
                      },
                      {
                        title: "Shipped",
                        subTitle:`${orders.paymentData.shipping.carrier ?orders.paymentData.shipping.carrier:""}`,
                        description:`${orders.paymentData.shipping.tracking_number ?orders.paymentData.shipping.tracking_number:""}`,
                        icon: <FaShippingFast className="inline-block" />,
                      },
                      {
                        title: "Out For Delivery",
                        icon: <MdDeliveryDining className="inline-block " />,
                      },
                      {
                        title: "Delivered",
                        icon: <TiTick className="inline-block " />,
                      },
                    ]}
                  ></Steps>
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
