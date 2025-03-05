import { View, Text, TextInput, ScrollView } from "react-native";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setNavigateInfo } from "@/src/utils/redux/slice/page/NavigateInfo";
import ChatsWraper from "@/src/wraper/ChatsWraper";
import ChatHeader from "@/src/components/main/header/ChatHeader";

const ChatPage = () => {
  const dispatch = useDispatch();
  const navigateInfo = useSelector(
    (state: any) => state.NavigateInfo.navigateInfo
  );
  console.log(navigateInfo);
  useEffect(() => {
    return () => {
      dispatch(setNavigateInfo(null));
    };
  });
  return (
    <ChatsWraper>
      <View className="w-full h-full bg-[#181C14]">
        <ChatHeader navigateInfo={navigateInfo} />
        <ScrollView>
          <View className="w-full items-center h-full justify-between ">
            <View className="w-full h-[80%] bg-white"></View>
            <View className="w-full h-[20%] bg-white"></View>
          </View>
        </ScrollView>
      </View>
    </ChatsWraper>
  );
};

export default ChatPage;
