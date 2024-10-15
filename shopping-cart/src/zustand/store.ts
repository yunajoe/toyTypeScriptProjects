import { create } from "zustand";
import { combine } from "zustand/middleware";
import { Product } from "../type.";
import cart from "../utils";
import { CalculateCartActions, CartVisibleActions } from "./action";

// state type
interface CartCalCulateState {
  itemArr: Product[];
  totalCountItems: number;
  subtotal: number;
  taxes: number;
  total: number;
}

interface CartVisibleState {
  isCartVisible: boolean;
}

//  state
const cartVisibleState: CartVisibleState = {
  isCartVisible: false,
};

const cartCalCulateState: CartCalCulateState = {
  itemArr: cart.itemsArr,
  totalCountItems: cart.getTotalItemCount,
  subtotal: 0,
  taxes: 0,
  total: 0,
};

// actions
export const useCartStore = create<CartCalCulateState & CalculateCartActions>(
  combine(cartCalCulateState, (set) => ({
    actions: {
      handleaddItems: (item) => {
        cart.addItemToCart(item);
        cart.calculateItemPrice();
        set({
          itemArr: cart.itemsArr,
          totalCountItems: cart.getTotalItemCount,
          total: cart.totalPrice,
          subtotal: cart.totalSubPrice,
          taxes: cart.totalTax,
        });
      },
    },
  }))
);
export const useStore = create<CartVisibleState & CartVisibleActions>(
  combine(cartVisibleState, (set) => ({
    actions: {
      handlecart: () =>
        set((state) => ({ isCartVisible: !state.isCartVisible })),
    },
  }))
);
