import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import AntDesign from "@expo/vector-icons/AntDesign";
import { useNavigation } from "expo-router";

const AuthPageNavigation = () => {
  const navigation = useNavigation();
  return (
    <View className="w-full flex items-start justify-center">
      <TouchableOpacity activeOpacity={0.8} onPress={() => navigation.goBack()}>
        <AntDesign name="arrowleft" size={24} color="black" />
      </TouchableOpacity>
    </View>
  );
};

export default AuthPageNavigation;
