import { View, Text, StatusBar } from "react-native";
import React from "react";
import { Stack } from "expo-router";

const _layout = () => {
  return (
    <>
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle="light-content"
      />
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="index" />
      </Stack>
    </>
  );
};

export default _layout;
