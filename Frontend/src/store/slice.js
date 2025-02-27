/* eslint-disable no-unused-vars */
import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
const productSlice = createSlice({
  name: "products",
  initialState: {
    cart: [],
    deliveryDetails: null,
    myOrders: [],
  },
  reducers: {
    setCart: (state, action) => {
      if (action.payload) {
        state.cart = action.payload;
      } else {
        state.cart = [];
      }
    },
    addCart: (state, action) => {
      let index = state.cart.findIndex((item) => item.id == action.payload.id);
      if (index >= 0) {
        state.cart[index].quantity += action.payload.quantity;
      } else {
        state.cart.push(action.payload);
      }
      localStorage.setItem("cart", JSON.stringify(state.cart));
    },
    deleteCart: (state, action) => {
      console.log(action.payload);

      let data = state.cart.filter((item) => item.id !== action.payload);
      state.cart = data;
      localStorage.setItem("cart", JSON.stringify(state.cart));
    },

    setDeliveryDetails: (state, action) => {
      console.log(action.payload);

      state.deliveryDetails = action.payload;
    },
    setMyOrders: (state, action) => {
      state.myOrders = action.payload.reverse();
    },
  },
});

export const {
  addCart,
  handleQuantity,
  deleteCart,
  setDeliveryDetails,
  setCart,
  setMyOrders,
} = productSlice.actions;

export default productSlice.reducer;
