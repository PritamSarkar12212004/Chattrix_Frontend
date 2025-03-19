import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { useNavigation } from "expo-router";

const PrimaryButton = ({ login, content,path }: any) => {
  const navigation = useNavigation();
  
  return (
    <TouchableOpacity
    onPress={()=>{
      navigation.navigate(path)
    }}
      activeOpacity={0.8}
      className={`w-full h-16     rounded-full  flex items-center justify-center border-[2px] `}
      style={{
        backgroundColor: login === "true" ? "#5F9C11" : "white",
        borderColor: login === "true" ? "#5F9C11" : "#5F9C11",
      }}
    >
      <Text
        className="text-lg font-bold text-white"
        style={{
          color: login === "true" ? "white" : "#5F9C11",
        }}
      >
        {content}
      </Text>
    </TouchableOpacity>
  );
};

export default PrimaryButton;
