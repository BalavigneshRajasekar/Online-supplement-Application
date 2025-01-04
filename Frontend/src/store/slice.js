/* eslint-disable no-unused-vars */
import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
const productSlice = createSlice({
  name: "products",
  initialState: {
    cart: [],
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
  },
});

export const { addCart, handleQuantity } = productSlice.actions;

export default productSlice.reducer;
