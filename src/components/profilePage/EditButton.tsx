import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { useNavigation } from "expo-router";

const EditButton = () => {
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      onPress={() => navigation.navigate("ProfileEditPage")}
      activeOpacity={0.8}
      className="w-full bg-zinc-500/20 flex rounded-xl border-[2px] border-zinc-400 py-3 px-2 items-center justify-center"
    >
      <Text className="text-white text-lg font-semibold">EditButton</Text>
    </TouchableOpacity>
  );
};

export default EditButton;
