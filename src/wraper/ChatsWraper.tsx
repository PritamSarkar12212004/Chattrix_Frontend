import { View, Text, StatusBar } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";

const ChatsWraper = ({ children }: any) => {
  return (
    <SafeAreaView className="bg-[#181C14]">
      <View className="w-full flex items-center justify-between px-3"></View>
      {children}
    </SafeAreaView>
  );
};

export default ChatsWraper;
