import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import AntDesign from "@expo/vector-icons/AntDesign";
import { useRouter } from "expo-router";
const SearchBar = () => {
  const router = useRouter();
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={() => router.push("/(functions)/GlobleSearch")}
      className="w-full h-16 bg-[#FFFFFF] rounded-3xl flex-row items-center  my-5 flex justify-between px-7"
    >
      <Text className="text-lg font-semibold text-zinc-400">Search here.</Text>
      <AntDesign name="search1" size={30} color="gray" />
    </TouchableOpacity>
  );
};

export default SearchBar;
