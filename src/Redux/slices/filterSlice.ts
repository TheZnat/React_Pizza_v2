import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

export type TSort = {
  name: string;
  sortProperty: "rating" | "price" | "title" | "-rating" | "-price" | "-title";
};

interface FilterSliceState {
  searchValue: string;
  categoriesId: number;
  sort: TSort;
}

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

export const selectSort = (state: RootState) => state.filterSlice.sort;
export const selectFilter = (state: RootState) => state.filterSlice;

export const { setCategoryId, setSort, setFilters, setSearchValue } =
  filterSlice.actions;

export default filterSlice.reducer;
