import AuthTokenName from "@/src/constant/auth/authTokenName/AuthTokenName";
import Storage from "@/src/utils/mmkv/Storage";
import { createSlice } from "@reduxjs/toolkit";

const localdata = Storage.getString(AuthTokenName.userInfo);

const localStorgeSlice = createSlice({
  name: "info",
  initialState: localdata ? JSON.parse(localdata) : null,
  reducers: {
    localStorageIdChange: (state, action) => {
      return (state = action.payload);
    },
  },
});
export const { localStorageIdChange } = localStorgeSlice.actions;
export default localStorgeSlice.reducer;
