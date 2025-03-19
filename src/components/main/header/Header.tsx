import { View, Text, TouchableOpacity, Image } from "react-native";
import AntDesign from "@expo/vector-icons/AntDesign";
import React from "react";
import { useRouter } from "expo-router";
import { userContext } from "@/src/utils/context/ContextApi";

const Header = () => {
  const router = useRouter();
  const { userDataLocalTemp } = userContext();
  return (
    <View className="w-full flex-row flex items-center justify-between py-3 ">
      <View className="flex-row items-center justify-center gap-3">
        <TouchableOpacity
          className="h-14 w-14 rounded-xl bg-[#2CB1A9]"
          activeOpacity={0.8}
          onPress={() => router.push("/(functions)/ProfilePage")}
        >
          <Image
            source={{
              uri: userDataLocalTemp?.userProfilePic
                ? userDataLocalTemp.userProfilePic
                : "https://i.pinimg.com/736x/31/1a/c5/311ac56e9930683215073dbb92ebede6.jpg",
            }}
            className="w-full h-full rounded-xl"
          />
        </TouchableOpacity>
        <Text className="text-2xl font-extrabold">Chats</Text>
      </View>
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => router.push("/(functions)/SynceContact")}
      >
        <AntDesign name="plus" size={30} color="black" />
      </TouchableOpacity>
    </View>
  );
};

export default Header;
