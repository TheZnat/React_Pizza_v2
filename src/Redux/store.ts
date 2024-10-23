import { configureStore } from "@reduxjs/toolkit";
import filterSlice from "./slices/filter/filterSlice";
import cartSlice from "./slices/cart/cartSlice";
import pizzasSlice from "./slices/piazza/pizzasSlice";

export const store = configureStore({
  reducer: {
    filterSlice,
    cartSlice,
    pizzasSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
