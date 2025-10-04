import { configureStore } from "@reduxjs/toolkit";
import cartReducer, { type CartState } from "../features/cart/CartSlice";
import wishlistReducer, {
  type WishlistState,
} from "../features/wishlist/wishlistSlice";
import { loadState, saveState } from "../assets/hook/localstorage";

// Load and validate localStorage state
const preloadedCart: CartState = loadState<CartState>("cart") ?? { items: [] };
const preloadedWishlist: WishlistState = loadState<WishlistState>(
  "wishlist"
) ?? { items: [] };

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    wishlist: wishlistReducer,
  },
  preloadedState: {
    cart: preloadedCart,
    wishlist: preloadedWishlist,
  },
});

// Save updates to localStorage
store.subscribe(() => {
  saveState("cart", store.getState().cart);
  saveState("wishlist", store.getState().wishlist);
});

// Types
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
