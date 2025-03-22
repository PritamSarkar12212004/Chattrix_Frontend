import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import { Stack } from "expo-router";

const _layout = () => {
  return (
    <GestureHandlerRootView style={styles.container}>
      <MainLayout />
    </GestureHandlerRootView>

  )
};

const MainLayout = () => {
  return <Stack screenOptions={{ headerShown: false }} />
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'grey',
  },
  contentContainer: {
    flex: 1,
    padding: 36,
    alignItems: 'center',
  },
});
export default _layout;
