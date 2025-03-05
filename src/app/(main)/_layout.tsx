import { View, Text } from "react-native";
import React, { useEffect } from "react";
import {
  disconnectSocketIo,
  connectSocketIo,
} from "../../utils/socket.io/SocketIo";
import { Stack } from "expo-router";
import useSatusBarUp from "@/src/hook/workerHooks/statusbar/useSatusBarUp";

const _layout = () => {
  const { StatusBarUpFun } = useSatusBarUp();

  const connectIo = () => {
    // connectSocketIo();
  };
  useEffect(() => {
    StatusBarUpFun({ bg: "#3C3D37", content: "light-content" });
    connectIo();
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
