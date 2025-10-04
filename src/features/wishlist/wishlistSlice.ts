import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import type { WishlistItem } from "../../dataType/DataType";

export type WishlistState = {
  items: WishlistItem[];
};

const initialState: WishlistState = {
  items: [],
};

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState,
  reducers: {
    addToWishlist: (state, action: PayloadAction<WishlistItem>) => {
      const existingItem = state.items.find((i) => i.id === action.payload.id);

      if (existingItem) {
        // ✅ If item exists, increase quantity
        existingItem.quantity += action.payload.quantity;
      } else {
        // ✅ If new item, push it
        state.items.push({
          ...action.payload,
          quantity: action.payload.quantity || 1,
        });
      }
    },
    removeFromWishlist: (state, action: PayloadAction<number>) => {
      state.items = state.items.filter((i) => i.id !== action.payload);
    },
    decreaseQuantity: (state, action: PayloadAction<number>) => {
      const item = state.items.find((i) => i.id === action.payload);
      if (item) {
        if (item.quantity > 1) {
          item.quantity -= 1; // ✅ reduce quantity
        } else {
          state.items = state.items.filter((i) => i.id !== action.payload); // remove if zero
        }
      }
    },
    clearWishlist: (state) => {
      state.items = [];
    },
  },
});

export const {
  addToWishlist,
  removeFromWishlist,
  decreaseQuantity,
  clearWishlist,
} = wishlistSlice.actions;

export default wishlistSlice.reducer;
