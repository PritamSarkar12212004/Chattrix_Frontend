import { createSlice } from "@reduxjs/toolkit";

const NavigateInfoSlice = createSlice({
  name: "NavigateInfo",
  initialState: {
    navigateInfo: null,
  },
  reducers: {
    setNavigateInfo: (state, action) => {
      state.navigateInfo = action.payload;
    },
  },
});
export const { setNavigateInfo } = NavigateInfoSlice.actions;
export default NavigateInfoSlice.reducer;
