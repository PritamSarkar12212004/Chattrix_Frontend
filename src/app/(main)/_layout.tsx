import React, { useEffect } from "react";

import { Stack } from "expo-router";
import useSatusBarUp from "@/src/hook/workerHooks/statusbar/useSatusBarUp";
import Socket from "@/src/utils/socket.io/Socket";
import Storage from "@/src/utils/mmkv/Storage";
import AuthTokenName from "@/src/constant/auth/authTokenName/AuthTokenName";
const _layout = () => {
  const { StatusBarUpFun } = useSatusBarUp();

  const connectIo = () => {
    Socket.connect();
    Socket.emit(
      "register",
      JSON.parse(Storage.getString(AuthTokenName.socketId))
    );
  };
  useEffect(() => {
    StatusBarUpFun({ bg: "#3C3D37", content: "light-content" });
    connectIo();
    return () => {
      Socket.disconnect();
    };
  }, []);
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="ContactList" />
      <Stack.Screen name="ChatPage" />
    </Stack>
  );
};

export default _layout;
