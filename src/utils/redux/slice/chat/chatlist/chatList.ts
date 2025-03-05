import Storage from "@/src/utils/mmkv/Storage";
import { createSlice } from "@reduxjs/toolkit";
import chatToken from "../../../../../constant/chat/ChatToken";
const chstListSlice = createSlice({
  name: "chatList",
  initialState: Storage.getString(chatToken.chatList)
    ? JSON.parse(Storage.getString(chatToken.chatList))
    : [],
  reducers: {
    setChatList: (state, action) => {
      return [...state, ...action.payload]; // Correctly merges old and new data
    },
  },
});
export const { setChatList } = chstListSlice.actions;
export default chstListSlice.reducer;
