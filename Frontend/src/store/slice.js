/* eslint-disable no-unused-vars */
import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
const productSlice = createSlice({
  name: "products",
  initialState: {
    cart: [],
    deliveryDetails: null,
  },
  reducers: {
    addCart: (state, action) => {
      let index = state.cart.findIndex((item) => item.id == action.payload.id);
      if (index >= 0) {
        state.cart[index].quantity += action.payload.quantity;
      } else {
        state.cart.push(action.payload);
      }
    },
    deleteCart: (state, action) => {
      console.log(action.payload);

      let data = state.cart.filter((item) => item.id !== action.payload);
      state.cart = data;
    },

    setDeliveryDetails: (state, action) => {
      console.log(action.payload);

      state.deliveryDetails = action.payload;
    },
  },
});

export const { addCart, handleQuantity, deleteCart, setDeliveryDetails } =
  productSlice.actions;

export default productSlice.reducer;
