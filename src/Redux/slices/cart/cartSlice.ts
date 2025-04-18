import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { calcTotalPrice } from "../../../utils/calcilationPrice";
import { CartSliceState } from "./type";

const initialState: CartSliceState = {
  totalPrice:
    calcTotalPrice(JSON.parse(localStorage.getItem("cart") ?? "[]")) || 0,
  items: localStorage.getItem("cart")
    ? JSON.parse(localStorage.getItem("cart") || "{}")
    : [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItems(state, action) {
      const findItem = state.items.find((obj) => obj.id === action.payload.id);
      if (findItem) {
        findItem.count++;
      } else {
        state.items.push({
          ...action.payload,
          count: 1,
        });
      }
      state.totalPrice = state.items.reduce((sum, obj) => {
        return obj.price * obj.count + sum;
      }, 0);
    },
    minusItem(state, action: PayloadAction<string>) {
      const findItem = state.items.find((obj) => obj.id === action.payload);
      if (findItem) {
        findItem.count--;
      }
    },

    removeItems(state, action: PayloadAction<string>) {
      state.items = state.items.filter((obj) => obj.id !== action.payload);
      localStorage.setItem("cart", JSON.stringify(state.items));
      state.totalPrice = calcTotalPrice(state.items);
    },
    clearItems(state) {
      state.items = [];
      localStorage.clear();
      state.totalPrice = 0;
    },
  },
});

export const { addItems, removeItems, clearItems, minusItem } =
  cartSlice.actions;
export default cartSlice.reducer;
