import { View, Text, TouchableOpacity, Image } from "react-native";
import React, { useEffect, useState, memo } from "react";
import AntDesign from "@expo/vector-icons/AntDesign";
import { useNavigation } from "expo-router";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import useSingleUserDataFetch from "@/src/hooks/chat/dataFetch/useSingleUserDataFetch";
import useUserStatusCheker from "@/src/hooks/socket/userStatusCheker/useUserStatusCheker";
import useGetUserStatus from "@/src/hooks/socket/userStatusCheker/useGetUserStatus";

const ChatpageNavigation = ({ userData }: any) => {
  const navigation = useNavigation();
  const { dataFetch } = useSingleUserDataFetch();
  const { checkStatus, statusChekerOff } = useGetUserStatus()

  // call hooks
  const { userStatusCheker } = useUserStatusCheker()

  const [userStatus, setUserStatus] = useState(null);
  useEffect(() => {
    checkStatus(setUserStatus)
    return (() => {
      statusChekerOff()
    })
  }, [userStatus])
  useEffect(() => {
    if (userData) userStatusCheker(userData);
    dataFetch();
  }, [userData]);
  return (
    <View className="w-full flex-row items-start justify-between bg-[#2CB1A9] px-3 py-2">
      <View className="flex-row items-center gap-2 ">
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => navigation.goBack()}
        >
          <AntDesign name="arrowleft" size={30} color="white" />
        </TouchableOpacity>
        <TouchableOpacity className="flex-row items-center gap-2">
          <Image
            source={{
              uri: userData?.userProfilePic
                ? userData.userProfilePic
                : "https://i.pinimg.com/736x/d2/64/e3/d264e36c185da291cf7964ec3dfa37b8.jpg",
            }}
            className="h-12 w-12 rounded-xl"
          />
          <View className="flex  justify-center">
            <Text className="text-xl  leading-tight text-white font-semibold">
              {userData?.userName ? userData.userName : null}
            </Text>
            <Text className="text-sm leading-tight text-white">
              {userStatus ? userStatus : ""}
            </Text>
          </View>
        </TouchableOpacity>
      </View>
      <View className="flex items-center justify-center">
        <TouchableOpacity>
          <MaterialCommunityIcons
            name="dots-vertical"
            size={30}
            color="white"
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default memo(ChatpageNavigation);
