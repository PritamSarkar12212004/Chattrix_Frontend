import { View, Text, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import ChatpageNavigation from "@/src/components/main/navigation/ChatpageNavigation";
import ShowChat from "@/src/components/main/chatlister/ShowChat";
import ChatPlaceHolder from "@/src/components/main/chatPlaceHolder/ChatPlaceHolder";
import { userContext } from "@/src/utils/context/ContextApi";
import useSingleUserDataFetch from "@/src/hooks/chat/dataFetch/useSingleUserDataFetch";

const ChatPage = () => {
  const { chatListTemp, setChatListTemp } = userContext();
  // call hook
  const { dataFetch } = useSingleUserDataFetch();
  const [userData, setUserData] = useState(null);
  const SynceData = async () => {
    const number = await chatListTemp.phoneNumbers[0].number;
    dataFetch(number, setUserData);
  };

  useEffect(() => {
    SynceData();
    return () => {
      setUserData(null);
      setChatListTemp(null);
    };
  }, []);
  return (
    <SafeAreaView className="bg-[#2CB1A9]">
      <View className="w-full  h-full relative">
        <ChatpageNavigation userData={userData} />
        <ScrollView className="w-full  bg-[#2CB1A9]">
          <View className="w-full flex-1">
            <ShowChat />
          </View>
        </ScrollView>
        <View className="w-full absolute bottom-0  ">
          <ChatPlaceHolder userData={userData} />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default ChatPage;
