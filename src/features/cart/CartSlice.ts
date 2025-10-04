import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import type { CartItems } from "../../dataType/DataType";

export interface CartState {
  items: CartItems[];
}

const initialState: CartState = {
  items: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    // Add or update quantity
    addToCart: (
      state,
      action: PayloadAction<
        Omit<
          CartItems,
          | "selectedSize"
          | "selectedColor"
          | "availableSizes"
          | "availableColors"
        > &
          Partial<
            Pick<
              CartItems,
              | "selectedSize"
              | "selectedColor"
              | "availableSizes"
              | "availableColors"
            >
          >
      >
    ) => {
      const {
        id,
        selectedSize = "S",
        selectedColor = "Black",
        availableSizes = ["S", "M", "L", "XL"], // ✅ default safe sizes
        availableColors = ["Black", "White"], // ✅ default safe colors
      } = action.payload;

      const itemIndex = state.items.findIndex(
        (i) =>
          i.id === id &&
          i.selectedSize === selectedSize &&
          i.selectedColor === selectedColor
      );

      if (itemIndex >= 0) {
        // ✅ Update quantity if same product, size & color already exist
        state.items[itemIndex].quantity += action.payload.quantity;
      } else {
        // ✅ Add new item with safe defaults
        state.items.push({
          ...action.payload,
          selectedSize,
          selectedColor,
          availableSizes,
          availableColors,
        });
      }
    },

    // Remove by numeric id + size + color
    removeFromCart: (
      state,
      action: PayloadAction<{
        id: number;
        selectedSize: string;
        selectedColor: string;
      }>
    ) => {
      state.items = state.items.filter(
        (i) =>
          !(
            i.id === action.payload.id &&
            i.selectedSize === action.payload.selectedSize &&
            i.selectedColor === action.payload.selectedColor
          )
      );
    },

    // Set quantity directly
    updateQuantity: (
      state,
      action: PayloadAction<{
        id: number;
        quantity: number;
        selectedSize: string;
        selectedColor: string;
      }>
    ) => {
      const itemIndex = state.items.findIndex(
        (i) =>
          i.id === action.payload.id &&
          i.selectedSize === action.payload.selectedSize &&
          i.selectedColor === action.payload.selectedColor
      );
      if (itemIndex >= 0) {
        state.items[itemIndex].quantity = action.payload.quantity;
      }
    },

    // Clear cart
    clearCart: (state) => {
      state.items = [];
    },
  },
});

export const { addToCart, removeFromCart, updateQuantity, clearCart } =
  cartSlice.actions;
export default cartSlice.reducer;
