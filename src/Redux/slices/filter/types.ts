export type TSort = {
  name: string;
  sortProperty: "rating" | "price" | "title" | "-rating" | "-price" | "-title";
};

export interface FilterSliceState {
  searchValue: string;
  categoriesId: number;
  sort: TSort;
}
