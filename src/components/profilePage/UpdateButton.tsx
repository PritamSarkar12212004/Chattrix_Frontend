import { View, Text, TouchableOpacity, ActivityIndicator } from "react-native";
import React from "react";

const UpdateButton = ({ content, ActiveFunction, btnLoader }: any) => {
  return (
    <TouchableOpacity
      onPress={() => (btnLoader ? null : ActiveFunction())}
      activeOpacity={0.8}
      className={`w-full h-16     rounded-full  flex items-center justify-center   bg-blue-500`}
    >
      {btnLoader ? (
        <ActivityIndicator size="small" color="#fff" />
      ) : (
        <Text className="text-lg font-bold text-white">{content}</Text>
      )}
    </TouchableOpacity>
  );
};

export default UpdateButton;
