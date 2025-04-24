import { create } from "zustand";

export interface shoppingCartState {
  cart: any[];
  emptyCart: () => void;
  addToCart: (product: any) => void;
  removeFromCartById: (id: string) => void;
}

const useShoppingCartStore = create<shoppingCartState>()((set) => ({
  cart: [],
  emptyCart: () => set({ cart: [] }),
  addToCart: (product) =>
    set((state) => ({
      cart: [...state.cart, product],
    })),
  removeFromCartById: (id) =>
    set((state) => ({
      cart: state.cart.filter((product) => product._id !== id),
    })),
}));

export default useShoppingCartStore;
