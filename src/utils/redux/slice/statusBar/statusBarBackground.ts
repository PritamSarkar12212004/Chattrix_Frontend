import { createSlice } from "@reduxjs/toolkit";
const statusBarContentSlice = createSlice({
  name: "background",
  initialState: "black",
  reducers: {
    statusBarBgSlicedAddrer: (state, action) => {
      return (state = action.payload);
    },
  },
});
export const { statusBarBgSlicedAddrer } = statusBarContentSlice.actions;
export default statusBarContentSlice.reducer;
