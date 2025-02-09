/* eslint-disable no-unused-vars */
import { Box } from "@mui/material";
import { Button, Form, Input, List, message, Modal, Tag } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { LiaRupeeSignSolid } from "react-icons/lia";
import { useNavigate, useParams } from "react-router";
import { IoPersonCircle } from "react-icons/io5";
import { IoCall } from "react-icons/io5";
import { FaMapPin } from "react-icons/fa";
import { IoArrowBackCircle } from "react-icons/io5";
import { TbTruckDelivery } from "react-icons/tb";
import { MdDeliveryDining } from "react-icons/md";
import { TiTickOutline } from "react-icons/ti";
import { toast } from "react-toastify";


const orderStatus =[
      "New Order",
      "Confirmed",
      "Shipped",
      "Out For Delivery",
      "Delivered",]
function SingleViewOrder() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [singleOrder, setSingleOrder] = useState(null);
  const [model,setModel]=useState(false)
  useEffect(() => {
    // fetch order details with id
    getOrderByID();

  }, []);
  const getOrderByID = async () => {
    // fetch order details with id from API
    console.log("products");
    
   
    try {
      let response = await axios.get(
        `https://supplement-application.onrender.com/api/O1/get/orders/${id}`,
        {
          headers: {
            Authorization: localStorage.getItem("logToken"),
          },
        }
      );
      console.log(response.data);
      setSingleOrder(response.data.data);
     
    } catch (error) {
      if (error.response.data.message == "Invalid token") {
        message.error("Timeout");
       return navigate("/login"); // Redirect to login page if token is expired.
      }
     
    }
  };

  const changeOrderStatus =async()=>{
    let loading = toast.loading("Wait for a moment...")
    //Find current status and update to next one 
    let index= orderStatus.findIndex((value)=>value === singleOrder.orderStatus)   
    console.log(index+1);
   
     
    try{
    
      const updatedOrder = await axios.put(
        `https://supplement-application.onrender.com/api/O1/change/status/${id}`,
        {status: orderStatus[index+1]},
        {
          headers: {
            Authorization: localStorage.getItem("logToken"),
          }
        }

        
      );
      toast.update(loading, {
        render: updatedOrder.data.message,
        type: "success",
        
        isLoading: false,
        autoClose: 3000,
        progress:undefined
      });
   
       getOrderByID()
 

    }catch(e){
      toast.update(loading, {
        render: e.response.data.message,
        type: "error",
        autoClose: 3000,
        isLoading: false,
        progress:undefined

      })
    
      console.log(e);
      
    }

  }
  

  //Endpoint to add courier details
  const addCourierData=async(values)=>{
    
     try{
      const response = await axios.put(`http://localhost:3000/api/O1/update/courier/${id}`,values)
      changeOrderStatus()
      setModel(false)
     }catch(e){
console.log(e);
     setModel(false)

     }
        
        
      

  }

  return (
    <>
      {singleOrder ? (
        <Box sx={{ marginTop: 1 }}>
          <div className="d-flex justify-between">
          <button onClick={() => navigate("/orders")}>
            <IoArrowBackCircle
              style={{ fontSize: "50px" }}
              className="active:scale-50 transition-all"
            />
          </button>
          <Tag color="cyan-inverse" style={{height:"fit-content", fontSize:"15px", padding:"5px"}}><input type="radio" checked>
          </input>   {singleOrder.orderStatus}</Tag>
          </div>
          <div className="p-3 d-flex flex-wrap gap-7 spanStyle" style={{width:"600px" ,backgroundColor:""}}>
            <h5>
              <Tag color="green-inverse" className="">
                Date:
              </Tag>
              <span>{new Date(singleOrder.createdAt).toDateString()}</span>
            </h5>
            <h5>
              <Tag color="gold-inverse">Order Id:</Tag>
              <span>#{singleOrder._id}</span>
            </h5>
            <h5>
            <Tag color="red-inverse">Payment Method: </Tag>
            <span> {singleOrder.paymentData.payment_method_types[0]}</span>
            </h5>
            <h5>
            <Tag color="green-inverse">Payment ID:</Tag>
            <span>#{singleOrder.paymentData.id}</span>
             
            </h5>
          </div>
          <div className="p-5 shadow-md border rounded-3xl mt-2">
            <List
              className="demo-loadmore-list"
              itemLayout="horizontal"
              dataSource={singleOrder.products}
              renderItem={(item, index) => (
                <List.Item key={index} >
                  <List.Item.Meta
                    avatar={<img src={item.image} style={{ width: "70px" }} />}
                    title={<a>{item.name}</a>}
                    description={
                      <p>
                        <b>Price:</b>
                        <LiaRupeeSignSolid
                          style={{ display: "inline-block" }}
                        />
                        {item.price} <b >Quantity:</b>{" "}
                        {item.quantity}
                      </p>
                    }
                  />
                  <b>
                    subtotal :
                    <LiaRupeeSignSolid style={{ display: "inline-block" }} />
                    {item.quantity * item.price}
                  </b>
                </List.Item>
              )}
            />
          </div>
          <div className="d-flex flex-column flex-md-row gap-4 p-3 justify-around">
            <div className="p-3   ">
              <h2 className="">
                <img src="/fast-delivery.png" style={{ width: "70px" }}></img>
                <span>Delivery Details</span>
              </h2>
              <h3 className="m-1">
                <IoPersonCircle className="inline" />
                {singleOrder.paymentData.shipping.name}
              </h3>
              <h5 className="m-1">
                <IoCall className="inline" />
                {singleOrder.paymentData.shipping.phone}
              </h5>

              <p className="m-1">
                <FaMapPin className="inline" />
                {singleOrder.paymentData.shipping.address.line1}
              </p>
              <h5 className="m-1">
                {singleOrder.paymentData.shipping.address.state}
              </h5>
              <h5 className="m-1">
                {singleOrder.paymentData.shipping.address.country}
              </h5>
              <h5 className="m-1">
                {singleOrder.paymentData.shipping.address.city}
              </h5>
              <h5 className="m-1">
                {singleOrder.paymentData.shipping.address.postal_code}
              </h5>
            </div>
            <div className="d-flex flex-md-column justify-center  gap-5">
              <h5>
                <Tag color="green-inverse" className="">
                  Payment Received
                </Tag>
                <span>
                  : <LiaRupeeSignSolid className="inline" />
                  {singleOrder.paymentData.amount}
                </span>
              </h5>
              
              {singleOrder.orderStatus==orderStatus[0] &&
              <button disabled={singleOrder.orderStatus=="Delivered"} className="border p-3 rounded-md  bg-black text-white active:scale-95" onClick={()=>changeOrderStatus()}>
                Confirm Order
              </button>}
              {singleOrder.orderStatus==orderStatus[1] &&
              <button disabled={singleOrder.orderStatus=="Delivered"} className="border p-3 rounded-md  bg-orange-700 text-white active:scale-95" onClick={()=>setModel(true)}>
                <TbTruckDelivery className="inline me-2" size={"30px"}/>
               Confirm Shipping
              </button>}
              {singleOrder.orderStatus==orderStatus[2] &&
              <button disabled={singleOrder.orderStatus=="Delivered"} className="border p-3 rounded-md  bg-yellow-300 text-white active:scale-95" onClick={()=>changeOrderStatus()}>
                <MdDeliveryDining className="inline me-2" size={"30px"} />
                Order Out For Delivery
              </button>}
              {singleOrder.orderStatus==orderStatus[3] &&
              <button disabled={singleOrder.orderStatus=="Delivered"} className="border p-3 rounded-md  bg-green-600 text-white active:scale-95" onClick={()=>changeOrderStatus()}>
                <TiTickOutline className="inline me-2" size={"30px"}/>
                Order Delivered
              </button>}
            </div>
          </div>
        </Box>
      ) : (
        "loadingProducts..."
      )}
      <Modal  onCancel={()=>setModel(false)} open={model} footer={null}>
      <Form onFinish={addCourierData} >
      <label>Courier</label>
        <Form.Item
        name="courier"
        rules={[{
          required: true,
          message: "Please input your courier name!",
        }]}
        >
          
          <Input type="text" />
        </Form.Item>
        <label aria-required>Tracking Id</label>
        <Form.Item
        name="trackingId"
        rules={[{
          required: true,
          message: "Please enter tracking Id!",
        }]}
        >
           
          <Input type="text" />
          
        </Form.Item>
        <Button type="primary" htmlType="submit" className="mt-3">Submit</Button>
      </Form>
      </Modal>
    </>
  );
}

export default SingleViewOrder;
