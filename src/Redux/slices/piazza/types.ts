// Тип для аргументов запроса пицц
export interface FetchPizzasArgs {
  category: string;
  sortBy: string;
  order: string;
  search: string;
}

// Тип для описания пиццы
export type Pizza = {
  id: string;
  title: string;
  price: number;
  imageUrl: string;
  sizes: number[];
  types: number[];
};

export enum Status {
  LOADING = "loading",
  SUCCESS = "success",
  ERROR = "error",
}

// Тип состояния слайса
export interface PizzaSliceState {
  items: Pizza[];
  status: Status;
}
