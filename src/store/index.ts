import { configureStore } from "@reduxjs/toolkit";
import CountReducer from "./slices/countSlice";

export const store = configureStore({
  reducer: {
    count: CountReducer,
  },
});
