import { createSlice } from "@reduxjs/toolkit";

const initialState = {
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
    setSort(state, action) {
      state.sort = action.payload;
    },

    setFilters(state, action) {
      state.sort = action.payload.sort;
      state.categoriesId = Number(action.payload.categoriesId);
    },
  },
});

export const { setCategoryId, setSort, setFilters } = filterSlice.actions;

export default filterSlice.reducer;
