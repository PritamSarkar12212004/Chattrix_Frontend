import { createSlice } from "@reduxjs/toolkit";
const buttonLoaderSlice = createSlice({
  name: "buttonLoader",
  initialState: false,
  reducers: {
    setLoader: (state, action) => {
      return (state = action.payload);
    },
  },
});
export const { setLoader } = buttonLoaderSlice.actions;
export default buttonLoaderSlice.reducer;
