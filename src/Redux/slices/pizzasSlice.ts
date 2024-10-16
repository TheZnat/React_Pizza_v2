import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { RootState } from "../store";

// Тип для аргументов запроса пицц
interface FetchPizzasArgs {
  category: string;
  sortBy: string;
  order: string;
  search: string;
}

// Тип для описания пиццы
type Pizza = {
  id: string;
  title: string;
  price: number;
  imageUrl: string;
  sizes: number[];
  types: number[];
};

// Тип состояния слайса
interface PizzaSliceState {
  items: Pizza[];
  status: "loading" | "success" | "error";
}

// Начальное состояние
const initialState: PizzaSliceState = {
  items: [],
  status: "loading",
};

// Асинхронное действие для получения пицц
export const fetchPizzas = createAsyncThunk<Pizza[], FetchPizzasArgs>(
  "pizzas/fetchPizzasStatus",
  async ({ category, sortBy, order, search }) => {
    const { data } = await axios.get<Pizza[]>(
      `https://65bb9d1052189914b5bca563.mockapi.io/items?${category}&sortBy=${sortBy}&order=${order}${search}`
    );
    return data;
  }
);

// Слайс для работы с пиццами
const pizzasSlice = createSlice({
  name: "pizzas",
  initialState,
  reducers: {
    // Явная типизация action для setItems
    setItems(state, action: PayloadAction<Pizza[]>) {
      state.items = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPizzas.pending, (state) => {
        state.status = "loading";
        state.items = [];
      })
      .addCase(
        fetchPizzas.fulfilled,
        (state, action: PayloadAction<Pizza[]>) => {
          state.items = action.payload;
          state.status = "success";
        }
      )
      .addCase(fetchPizzas.rejected, (state) => {
        state.status = "error";
        state.items = [];
      });
  },
});

// Селектор для получения данных пицц
export const selectPizzaData = (state: RootState) => state.pizzasSlice;

// Экспорт экшенов
export const { setItems } = pizzasSlice.actions;

// Экспорт редьюсера
export default pizzasSlice.reducer;
