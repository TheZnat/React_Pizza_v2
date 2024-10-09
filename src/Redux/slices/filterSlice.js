import { createSlice } from "@reduxjs/toolkit";

const initialState = {
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
    setCategoryId(state, action) {
      state.categoriesId = action.payload;
    },
    setSearchValue(state, action) {
      state.searchValue = action.payload;
    },
    setSort(state, action) {
      state.sort = action.payload;
    },

    setFilters(state, action) {
      state.sort = action.payload.sort;
      state.categoriesId = Number(action.payload.categoriesId);
    },
  },
});

export const selectSort = (state) => state.filterSlice.sort;
export const selectFilter = (state) => state.filterSlice;

export const { setCategoryId, setSort, setFilters, setSearchValue } =
  filterSlice.actions;

export default filterSlice.reducer;
