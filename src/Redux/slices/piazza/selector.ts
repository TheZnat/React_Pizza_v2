import { RootState } from "../../store";

// Селектор для получения данных пицц
export const selectPizzaData = (state: RootState) => state.pizzasSlice;