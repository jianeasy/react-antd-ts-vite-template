import { createSlice } from "@reduxjs/toolkit";

const countSlice = createSlice({
  name: "count",
  initialState: {
    count: 0,
  },
  reducers: {
    increase(state, action) {
      state.count++;
    },
    decrease(state, action) {
      state.count--;
    },
  },
});

export const { increase, decrease } = countSlice.actions;
export default countSlice.reducer;
