import { View, Text, TouchableOpacity, TextInput } from "react-native";
import React from "react";
import AntDesign from "@expo/vector-icons/AntDesign";
import { SafeAreaView } from "react-native-safe-area-context";

const GlobleSearch = () => {
  return (
    <SafeAreaView className="bg-[#C5D3FF] w-full h-full">
      <View className="w-full h-full  px-3 relative">
        <TextInput
          className="w-full pr-16 h-16 bg-[#FFFFFF] rounded-3xl flex-row items-center  my-5 flex px-7 placeholder:text-lg placeholder:font-semibold placeholder:text-zinc-400"
          placeholder="Search here."
        />
        <TouchableOpacity className="absolute right-7 top-9">
          <AntDesign name="search1" size={30} color="gray" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default GlobleSearch;
