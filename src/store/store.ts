// src/store/store.ts
import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "../features/cart/CartSlice";

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    // add more reducers later (e.g., user, products, orders)
  },
});

// TypeScript helpers for dispatch & state
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
