import { View, Text, StatusBar } from "react-native";
import React, { useEffect } from "react";
import useSatusBarUp from "@/src/hook/workerHooks/statusbar/useSatusBarUp";
import { Stack } from "expo-router";

const _layout = () => {
  const { StatusBarUpFun } = useSatusBarUp();
  useEffect(() => {
    StatusBarUpFun({ bg: "white", content: "dark-content" });
  }, []);
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
    </Stack>
  );
};

export default _layout;
