import { configureStore } from "@reduxjs/toolkit";
import statusBarBackground from "../slice/statusBar/statusBarBackground";
import statusBarContent from "../slice/statusBar/statusBarContent";

const store = configureStore({
  reducer: {
    statusBarBackground: statusBarBackground,
    statusBarContent: statusBarContent,
  },
});
export default store;
