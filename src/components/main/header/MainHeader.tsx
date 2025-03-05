import { View, Text, Image, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useNavigation } from "expo-router";
import EmailAddModal from "../modal/EmailAddModal";
const MainHeader = () => {
  const userData = useSelector((state: any) => state.localStorge);
  const [isVisible, setIsVisible] = useState(false);
  return (
    <View className="w-full flex bg-[#3C3D37] px-3 flex-row items-center justify-between py-2">
      <EmailAddModal isVisible={isVisible} setIsVisible={setIsVisible} />
      <View className="flex-row items-center justify-center gap-3">
        <Image
          source={{ uri: userData.userImage }}
          className="w-12 h-12 rounded-full"
        />
        <Text className="text-white font-bold text-lg">
          {userData.userName}
        </Text>
      </View>
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => setIsVisible(!isVisible)}
        className="flex"
      >
        <Ionicons name="add-circle" size={35} color="#F97300" />
      </TouchableOpacity>
    </View>
  );
};

export default MainHeader;
