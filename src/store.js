import { configureStore } from "@reduxjs/toolkit";
import marketingReducer from "./features/marketingSlice";
import analyticsReducer from "./features/analyticsSlice";
import uiReducer from "./features/uiSlice";

export const store = configureStore({
  reducer: {
    marketing: marketingReducer,
    analytics: analyticsReducer,
    ui: uiReducer
  }
});
