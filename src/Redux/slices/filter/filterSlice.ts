import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {TSort, FilterSliceState} from "./types";

const initialState: FilterSliceState = {
  searchValue: "",
  categoriesId: 0,
  sort: {
    name: "популярности",
    sortProperty: "rating",
  },
};

export const filterSlice = createSlice({
  name: "filters",
  initialState,
  reducers: {
    setCategoryId(state, action: PayloadAction<number>) {
      state.categoriesId = action.payload;
    },
    setSearchValue(state, action: PayloadAction<string>) {
      state.searchValue = action.payload;
    },
    setSort(state, action: PayloadAction<TSort>) {
      state.sort = action.payload;
    },
    setFilters(state, action: PayloadAction<FilterSliceState>) {
      const { searchValue, categoriesId, sort } = action.payload;
      state.searchValue = searchValue;
      state.categoriesId = Number(categoriesId);
      state.sort = sort;
    },
  },
});


export const { setCategoryId, setSort, setFilters, setSearchValue } =
  filterSlice.actions;

export default filterSlice.reducer;
