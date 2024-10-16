import { Product } from "../type.";

export interface CartVisibleActions {
  actions: {
    handlecart: () => void;
  };
}

export interface CalculateCartActions {
  actions: {
    handleaddItems: (item: Product) => void;

    handleclearItems: () => void;
  };
}
