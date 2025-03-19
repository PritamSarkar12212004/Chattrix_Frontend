import { View, Text, TextInput, TouchableOpacity } from "react-native";
import React from "react";
import AntDesign from "@expo/vector-icons/AntDesign";

const ContactSearch = ({ setSearchInput }: any) => {
  return (
    <View className="w-full relative h-14">
      <TextInput
        onChangeText={(text) => setSearchInput(text)}
        className="w-full h-14 pl-5 pr-16 bg-white/40 rounded-full placeholder:text-zinc-700 text-zinc-700  placeholder:font-bold font-bold placeholder:text-lg text-lg"
        placeholder="Search Contacts"
      />
      <TouchableOpacity className="absolute right-4 top-4">
        <AntDesign name="search1" size={24} color="white" />
      </TouchableOpacity>
    </View>
  );
};

export default ContactSearch;
