import { createSlice } from "@reduxjs/toolkit";

const inputLocationSearchSlice = createSlice({
  name: "inputLocationSearch",
  initialState: { input: "" },
  reducers: {
    update(state, action) {
      state.input = action.payload;
    },
  },
});

export const inputLocationSearchAction = inputLocationSearchSlice.actions;

export default inputLocationSearchSlice;
