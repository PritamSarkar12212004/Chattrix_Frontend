import { configureStore } from "@reduxjs/toolkit";
import statusBarBackground from "../slice/statusBar/statusBarBackground";
import statusBarContent from "../slice/statusBar/statusBarContent";
import localStorge from "../slice/localStorge/localStorge";
import buttonloader from "../slice/loader/buttonloader";
import chatList from "../slice/chat/chatlist/chatList";
import NavigateInfo from "../slice/page/NavigateInfo";

const store = configureStore({
  reducer: {
    statusBarBackground: statusBarBackground,
    statusBarContent: statusBarContent,
    localStorge: localStorge,
    buttonloader: buttonloader,
    chatList: chatList,
    NavigateInfo: NavigateInfo,
  },
});
export default store;
