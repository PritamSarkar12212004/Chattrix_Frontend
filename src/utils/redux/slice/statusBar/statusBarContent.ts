import { createSlice } from "@reduxjs/toolkit";
const statusBarContentSlice = createSlice({
  name: "content",
  initialState: "light-content",
  reducers: {
    statusBarContentAdder: (state, action) => {
      return (state = action.payload);
    },
  },
});
export const { statusBarContentAdder } = statusBarContentSlice.actions;
export default statusBarContentSlice.reducer;
